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
fall_detected_acc = False
fall_detected_ir = False

def is_fall_detected_on_accelerometer():
	if (not last_accelerometer_value):
		return False

	isFall = False
	for line in last_accelerometer_value['data']:
		timestamp = float(line['timestamp'])
		x = line['x']
		y = line['y']
		z = line['z']

		latitude = list(last_accelerometer_value['Location'])[0]
		longitude = list(last_accelerometer_value['Location'])[1]

		norm = math.sqrt( math.pow(x,2) + math.pow(y,2) + math.pow(z,2))

		if norm > 20:
			isFall = True

	return isFall

def is_fall_detected_on_infra_red(limit=10):
	return infrared_positive_count >= limit

def on_accelerometer_message(client, userdata, message):
	if fall_detected_acc == True:
		return

	print('Accelerometer sensor data received!')
	global last_accelerometer_value
	last_accelerometer_value = json.loads(message.payload)

def on_infrared_message(client, userdata, message):
	if fall_detected_acc == False or fall_detected_ir == True:
		return

	global last_infrared_value
	global infrared_positive_count
	experiment = json.loads(message.payload)
	last_infrared_value = experiment['value']
	print('Infrared sensor data received: ', last_infrared_value)
	if last_infrared_value == True:
		infrared_positive_count += 1
	else:
		infrared_positive_count = 0

def handle_data(config):
	tmp1 = 0
	tmp2 = False
	global fall_detected_acc
	global fall_detected_ir

	while True:
		if (tmp1 != last_accelerometer_value and is_fall_detected_on_accelerometer()):
			print('Fall detected by the accelerometer sensor')
			fall_detected_acc = True
			tmp1 = last_accelerometer_value

		fall_detected_ir = is_fall_detected_on_infra_red(config["occurrences"])
		if ((fall_detected_acc == True and fall_detected_ir == True) and tmp2 == False):
			print("Fall detected by the infra red sensor")
			print("Sending alert to external services...")
			tmp2 = True

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
handle_data(config)