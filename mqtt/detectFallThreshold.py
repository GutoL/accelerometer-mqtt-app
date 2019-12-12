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
infrared_positive_count = 0

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
			if(norm > 20 and infrared_positive_count >= 10):
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
	global infrared_positive_count
	experiment = json.loads(message.payload)
	last_infrared_value = experiment['value']
	if last_infrared_value == True:
		infrared_positive_count += 1
	else:
		infrared_positive_count = 0

def handle_data():
	tmp1 = 0
	tmp2 = -1
	tmp3 = 0
	while True:
		# Evaluate fall detection when one of the two sensor data changed
		if (tmp1 != last_accelerometer_value or tmp2 != last_infrared_value or tmp3 != infrared_positive_count):
			tmp1 = last_accelerometer_value
			tmp2 = last_infrared_value
			evaluatedData(last_infrared_value, last_accelerometer_value)

def setup_subscriptions(config):
	client = mqtt.Client()
	client.message_callback_add(config["topics"]["accelerometer"], on_accelerometer_message)
	client.message_callback_add(config["topics"]["infrared"], on_infrared_message)

	client.connect(config["fog"]["hostname"], port=config["fog"]["port"])
	client.subscribe("/sensor/#")
	client.loop_start()

def read_configuration():
	return json.loads(open('config.json').read())

config = read_configuration()
setup_subscriptions(config)
print("Start to listening sensor data")
handle_data()