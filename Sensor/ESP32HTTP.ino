#include <WiFi.h>
#include <HTTPClient.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// WiFi Credentials
String ssid = "Your_SSID";
String password = "Your_Initial_Password";

// BLE UUIDs
#define SERVICE_UUID        "12345678-1234-1234-1234-123456789012"
#define CHARACTERISTIC_UUID "87654321-4321-4321-4321-210987654321"

// Sensor Pin
const int sensorPin = 4;  // GPIO pin connected to the sensor

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
std::string newWifiPassword;

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        std::string value = pCharacteristic->getValue();
        if (value.length() > 0) {
            newWifiPassword = value;
            Serial.println("New WiFi password received: " + String(newWifiPassword.c_str()));
            password = newWifiPassword.c_str();
            connectToWiFi();
        }
    }
};

void connectToWiFi() {
    WiFi.begin(ssid.c_str(), password.c_str());
    Serial.println("Connecting to WiFi...");

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 10) {
        delay(1000);
        Serial.print(".");
        attempts++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to WiFi!");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("Failed to connect to WiFi.");
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(sensorPin, INPUT);

    // Initialize BLE
    BLEDevice::init("ESP32 WiFi Config");
    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService(SERVICE_UUID);
    pCharacteristic = pService->createCharacteristic(
                        CHARACTERISTIC_UUID,
                        BLECharacteristic::PROPERTY_READ |
                        BLECharacteristic::PROPERTY_WRITE
                      );
    pCharacteristic->setCallbacks(new MyCallbacks());
    pCharacteristic->setValue("Enter WiFi Password");
    pService->start();

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(false);
    pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
    Serial.println("Waiting for a client connection to update WiFi password...");

    // Connect to WiFi
    connectToWiFi();
}

void loop() {
    int sensorValue = digitalRead(sensorPin);
    if (sensorValue == HIGH) {
        // Sensor is triggered, send HTTP request
        if (WiFi.status() == WL_CONNECTED) {
            HTTPClient http;
            http.begin("http://your-server.com/api/sensor");  // Replace with your server URL
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"sensor\": \"triggered\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end();
        } else {
            Serial.println("WiFi not connected");
        }
        delay(1000);  // Add a delay to avoid sending too many requests
    }
}
