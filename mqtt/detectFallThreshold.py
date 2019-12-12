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
alertMessage = ""

def is_fall_detected_on_accelerometer():
	global last_accelerometer_value
	if (not last_accelerometer_value):
		return False

	global alertMessage

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
			hour = datetime.datetime.fromtimestamp(timestamp/1000.0)
			alertMessage = "Latitude:",latitude,"longitude:",longitude,"Time:",hour.strftime("%d/%b/%Y %H:%M:%S")
			isFall = True

	last_accelerometer_value = None # cleaning the las message from accelerometer
	return isFall

def is_fall_detected_on_infra_red(limit=10):
	global infrared_positive_count

	if infrared_positive_count >= limit:
		infrared_positive_count = 0
		return True
	else:
		return False

	#return infrared_positive_count >= limit

def on_accelerometer_message(client, userdata, message):
	if fall_detected_acc == True:
		return

	print('Accelerometer sensor data received!')
	global last_accelerometer_value
	last_accelerometer_value = json.loads(message.payload)


count_false_positive_acc = 0
def on_infrared_message(client, userdata, message):
	global fall_detected_acc
	global count_false_positive_acc

	if fall_detected_acc == False:
		return

	# if fall_detected_acc == False or fall_detected_ir == True:
	# 	return

	global last_infrared_value
	global infrared_positive_count
	experiment = json.loads(message.payload)
	last_infrared_value = experiment['value']
	print('Infrared sensor data received: ', last_infrared_value)

	if last_infrared_value == True:
		infrared_positive_count += 1

	elif fall_detected_acc == True and last_infrared_value == False:
		count_false_positive_acc += 1
		if(count_false_positive_acc >= 6):
			fall_detected_acc = False
			count_false_positive_acc = 0
			infrared_positive_count = 0
			print("False positive from accelerometer...")


def handle_data(config):
	tmp1 = 0
	tmp2 = False
	global fall_detected_acc
	global fall_detected_ir
	global alertMessage

	while True:
		if (is_fall_detected_on_accelerometer() and fall_detected_acc == False):
			print('Fall detected by the accelerometer sensor')
			fall_detected_acc = True

		if (fall_detected_acc):
			fall_detected_ir = is_fall_detected_on_infra_red(config["occurrences"])

			if(fall_detected_ir):
				print("Fall detected by the infra red sensor")
				print("Sending alert to external services... Information about fall:",alertMessage)
				fall_detected_acc = False
				fall_detected_ir = False


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