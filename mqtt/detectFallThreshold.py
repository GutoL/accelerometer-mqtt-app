#tutorial: https://www.hivemq.com/blog/mqtt-client-library-paho-python
# best tutorial: https://techtutorialsx.com/2017/04/23/python-subscribing-to-mqtt-topic/

import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt

import time
import json
import datetime
import math

last_accelerometer_value = 0
last_infrared_value = -1

def evaluatedData(infrared, accelerometer):
	if (not accelerometer):
		return False

	try:
		isFall = False
		for line in accelerometer['data']:

			timestamp = float(line['timestamp'])
			x = line['x']
			y = line['y']
			z = line['z']

			latitude = list(accelerometer['Location'])[0]
			longitude = list(accelerometer['Location'])[1]

			norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))

			if(norm>20 and infrared == True):
				isFall = True

		if isFall:
			hour = datetime.datetime.fromtimestamp(timestamp/1000.0)
			print("Fall Detected! Latitude:",latitude,"longitude:",longitude,"Time:",hour.strftime("%d/%b/%Y %H:%M:%S"))
		return isFall

	except Exception as e:
		print("Error: " + str(e))

def on_accelerometer_message(client, userdata, message):
		print('Accelerometer sensor data received!')
		global last_accelerometer_value
		last_accelerometer_value = json.loads(message.payload)
		print(last_accelerometer_value)



def on_infrared_message(client, userdata, message):
	print('Infrared sensor data received!')
	global last_infrared_value
	experiment = json.loads(message.payload)
	last_infrared_value = experiment['value']
	print(last_infrared_value)

def handle_data():
	tmp1 = 0
	tmp2 = -1
	while True:
		# Evaluate fall detection when one of the two sensor data changed
		if (tmp1 != last_accelerometer_value or tmp2 != last_infrared_value):
			tmp1 = last_accelerometer_value
			tmp2 = last_infrared_value
			evaluatedData(last_infrared_value, last_accelerometer_value)

def setup_subscriptions():
	client = mqtt.Client("test22")

	client.message_callback_add("/sensor/accelerometer", on_accelerometer_message)
	client.message_callback_add("/sensor/infrared", on_infrared_message)

	client.connect("localhost")
	client.subscribe("/sensor/#")
	client.loop_start()

setup_subscriptions()
handle_data()