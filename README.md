# Sasya Field Monitor

Live dashboard for the Sasya LoRa field node. It runs entirely in the browser:

1. The field node (STM32 + SX1276) sends its sensor readings over LoRa every minute.
2. The receiver (ESP32 + SX1262 + SIM800L) publishes each reading as JSON over GSM to MQTT.
3. This page subscribes to the topic through the broker's secure WebSocket and shows the data.

- **Broker:** `wss://broker.hivemq.com:8884/mqtt`
- **Topics:** `sasya/field-node-4583/data` (retained JSON) and `sasya/field-node-4583/status` (`online` or `offline`)

You can change the broker, topic and login under **Connection settings** at the bottom of the page.

History is stored in the viewer's browser (localStorage). The page records data only while it is open; the broker keeps only the latest reading.
