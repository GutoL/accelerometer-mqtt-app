import paho.mqtt.subscribe as subscribe

ip_broker = 'localhost'
port_broker = 1883
topic = 'experiment'

def on_message(client, userdata, message):

    data = str(message.payload.decode("utf-8"))

    print("message received " ,data)
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

print "Subscribing to broker..."
subscribe.callback(on_message, topic, hostname=ip_broker)