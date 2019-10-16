#tutorial: https://www.hivemq.com/blog/mqtt-client-library-paho-python
# best tutorial: https://techtutorialsx.com/2017/04/23/python-subscribing-to-mqtt-topic/


import paho.mqtt.subscribe as subscribe
import paho.mqtt.publish as publish

import paho.mqtt.client as mqttClient
import time
import json
import datetime
import math


def on_connect(client, userdata, flags, rc):

    if rc == 0:

        print("Connected to broker")

        global Connected                #Use global variable
        Connected = True                #Signal connection

    else:

        print("Connection failed")



def on_message(client, userdata, message):

    try:
        #print "Message received: "  + message.payload
        experiment = json.loads(message.payload)
        #print "type: "+experiment["type"]

        content = "timestamp,x,y,z,norm\n"

        for line in experiment['data']:
            #print line['x']
            timestamp = line['timestamp']
            x = line['x']
            y = line['y']
            z = line['z']

            norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))

            content = content+ str(timestamp)+","+str(x)+","+str(y)+","+str(z)+","+str(norm)+"\n"

        observations = experiment['observation'].split(" ")
        observation = ""

        for x in observations:
            observation = observation+x.capitalize()

        fileName = "data/"+str(experiment['type'])+"/"+str(datetime.datetime.now())+"-"+str(experiment['type'])

        if(observation != ""):
            fileName = fileName+"-"+observation

        fileName = fileName+".csv"
        file = open(fileName,"w")
        file.write(content)
        file.close()
        print "done!"
    except Exception as e:
        print("Error: " + str(e))

############################## main 1 ######################################

fp = open('config.txt','r')

lines = fp.readlines()

topic = str(lines[1]).rstrip()

ip_broker = str(lines[3]).rstrip()
port_broker = str(lines[5]).rstrip()

ip_cloud = str(lines[7]).rstrip()
port_cloud = str(lines[9]).rstrip()

print topic
print ip_broker

print "Subscribing to broker..."
subscribe.callback(on_message, topic, hostname=ip_broker)

# client = mqttClient.Client("Python")               #create new instance
# client.on_connect= on_connect                      #attach function to callback
# client.on_message= on_message                      #attach function to callback
#
# client.connect(str(ip_broker), port=int(port_broker))         #connect to broker
#
# client.loop_start()        #start the loop
# time.sleep(0.1) #wait for connection
#
# client.subscribe(topic)
#
# try:
#     while True:
#         time.sleep(1)
#
# except KeyboardInterrupt:
#     print "exiting"
#     client.disconnect()
#     client.loop_stop()

############################## main 2 ######################################

#
# Connected = False   #global variable for the state of the connection
#
# broker_address= "m15.cloudmqtt.com"  #Broker address
# port = 16894                         #Broker port
# user = "bvmodozi"                    #Connection username
# password = "1jPErVdZYG0G"            #Connection password
# topic = "experiment"
#
# client = mqttClient.Client("Python")               #create new instance
# client.username_pw_set(user, password=password)    #set username and password
# client.on_connect= on_connect                      #attach function to callback
# client.on_message= on_message                      #attach function to callback
#
# client.connect(broker_address, port=port)          #connect to broker
#
# client.loop_start()        #start the loop
#
# while Connected != True:    #Wait for connection
#     time.sleep(0.1)
#
# client.subscribe(topic)
#
# try:
#     while True:
#         time.sleep(1)
#
# except KeyboardInterrupt:
#     print "exiting"
#     client.disconnect()
#     client.loop_stop()
