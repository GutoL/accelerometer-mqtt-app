#tutorial: https://www.hivemq.com/blog/mqtt-client-library-paho-python
# best tutorial: https://techtutorialsx.com/2017/04/23/python-subscribing-to-mqtt-topic/

import paho.mqtt.subscribe as subscribe
import paho.mqtt.publish as publish

import paho.mqtt.client as mqttClient
import time
import json
import datetime
import math
import numpy as np
import sys


def on_connect(client, userdata, flags, rc):

    if rc == 0:
        print("Connected to broker")

        global Connected                #Use global variable
        Connected = True                #Signal connection

    else:
        print("Connection failed")


def evaluatedData(data):

    try:
        
		isFall = False
        
        for line in data['data']:
            
            timestamp = float(line['timestamp'])
            x = line['x']
            y = line['y']
            z = line['z']
            
            latitude = list(data['Location'])[0]
            longitude = list(data['Location'])[1]
            
            norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))
            
			if(norm>20):
            	isFall = True
                
        if isFall:
            hour = datetime.datetime.fromtimestamp(timestamp/1000.0)
            print("Fall Detected! Latitude:",latitude,"longitude:",longitude,"Time:",hour.strftime("%d/%b/%Y %H:%M:%S"))
        

    except Exception as e:
        print("Error: " + str(e))

def on_message(client, userdata, message):
    
    print('Data received!')
    try:
        experiment = json.loads(message.payload)
        evaluatedData(experiment)

    except Exception as e:
        print("Error: " + str(e))
        #print(traceback.format_exc())

############################## main ######################################

fp = open('config.txt','r')

lines = fp.readlines()

topic = str(lines[1]).rstrip()

ip_broker = str(lines[3]).rstrip()
port_broker = str(lines[5]).rstrip()

ip_cloud = str(lines[7]).rstrip()
port_cloud = str(lines[9]).rstrip()

print("Subscribing to broker...")
subscribe.callback(on_message, topic, hostname=ip_broker)
