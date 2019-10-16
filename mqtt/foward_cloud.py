import paho.mqtt.subscribe as subscribe
import paho.mqtt.publish as publish


fp = open('config.txt','r')

lines = fp.readlines()

topic = str(lines[1]).rstrip()

ip_broker = str(lines[3]).rstrip()
port_broker = str(lines[5]).rstrip()

ip_cloud = str(lines[7]).rstrip()
port_cloud = str(lines[9]).rstrip()



def on_message(client, userdata, message):

    data = str(message.payload.decode("utf-8"))

    try:
        print "Data received"
        publish.single(topic, data, hostname=ip_cloud)
        print "Message fowarded to cloud"
    except Exception as e:
        print(e)

    # print("message received " ,data)
    # print("message topic=",message.topic)
    # print("message qos=",message.qos)
    # print("message retain flag=",message.retain)

print "Subscribing to broker..."
subscribe.callback(on_message, topic, hostname=ip_broker)
