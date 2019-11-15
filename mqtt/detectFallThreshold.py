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


# from keras.models import load_model
# from keras import backend

#model = load_model('my_model.h5')
#print model.summary()

#print len(sys.argv)
if len(sys.argv) != 3:
    print("Please, provide the parameters to run this program")
    print("You need to provide two integers (0 -> false, 1 ->true):")
    print("The firt enables the program to write a CSV file with the data from broker")
    print("The second enables the program to call the model to classify the data")
    sys.exit(0)


elif int(sys.argv[1]) == 0 and int(sys.argv[2]) == 0 :
    print "At least one option must be 1!"
    sys.exit(0)

dataSize = 500

def on_connect(client, userdata, flags, rc):

    if rc == 0:
        print("Connected to broker")

        global Connected                #Use global variable
        Connected = True                #Signal connection

    else:
        print("Connection failed")

def generateDataSet(data):
    try:
        content = "timestamp,x,y,z,norm\n"

        for line in data['data']:
            timestamp = line['timestamp']
            x = line['x']
            y = line['y']
            z = line['z']

            norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))

            content = content+ str(timestamp)+","+str(x)+","+str(y)+","+str(z)+","+str(norm)+"\n"

        file = open("data/"+str(datetime.datetime.now())+str(data['type'])+".csv","w")
        file.write(content)
        file.close()
        print("done!")

    except Exception as e:
        print("Error: " + str(e))

def generateDataSet2(data):
    try:
        content = "x,y,z,norm\n"

        for line in data:
            #print line['x']
            x = line[0]
            y = line[1]
            z = line[2]

            norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))

            content = content+str(x)+","+str(y)+","+str(z)+","+str(norm)+"\n"

        #print content
        file = open("data/"+str(datetime.datetime.now())+".csv","w")
        file.write(content)
        file.close()
        print("done!")

    except Exception as e:
        print("Error: " + str(e))

def evaluatedData(data):

    try:
        content = []
        # timestamp = []
        
        isFall = False
        
        for line in data['data']:
            # timestamp.append(line['timestamp'])
            timestamp = float(line['timestamp'])
            x = line['x']
            y = line['y']
            z = line['z']
            
            latitude = list(data['Location'])[0]
            longitude = list(data['Location'])[1]
            
            content.append([float(x),float(y),float(z)])
            if int(sys.argv[2]) == 1:
                norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))
                if(norm>20):
                    isFall = True
                
        if isFall:
            hour = datetime.datetime.fromtimestamp(timestamp/1000.0)
            print("Fall Detected! Latitude:",latitude,"longitude:",longitude,"Time:",hour.strftime("%d/%b/%Y %H:%M:%S"))

        if len(content) < dataSize:
                content_temp = content
                diff = dataSize - len(content)

                x=0
                for point in content_temp:
                    if x > (diff-1):
                        break
                    content.append(point)
                    x = x+1
        else:
            content = content[:dataSize]

        if int(sys.argv[1]) == 1:
            generateDataSet2(content)

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

############################## main 1 ######################################

fp = open('config.txt','r')

lines = fp.readlines()

topic = str(lines[1]).rstrip()

ip_broker = str(lines[3]).rstrip()
port_broker = str(lines[5]).rstrip()

ip_cloud = str(lines[7]).rstrip()
port_cloud = str(lines[9]).rstrip()

print("Subscribing to broker...")
subscribe.callback(on_message, topic, hostname=ip_broker)

############################## main 2 ######################################


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
