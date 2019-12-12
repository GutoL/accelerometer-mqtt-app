import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import json
import time
import argparse
import threading
import keyboard
from random import *

from pynput import keyboard

infrared_value = 0

def read_configuration():
	return json.loads(open('config.json').read())

config = read_configuration()
client = mqtt.Client()
client.connect(config["fog"]["hostname"], port=config["fog"]["port"])

def publish_random_accelerometer():
    data = {
        'Location': [-8.054278, -34.958876],
        'data': [{
            'timestamp': time.time(),
            'x': 1,
            'y': 1,
            'z': 2,
        }]
    }
    client.publish(config["topics"]["accelerometer"], json.dumps(data))

def publish_random_infrared(time=15):
    print("Publishing infrared data: ", infrared_value)
    data = {
        'value': infrared_value
    }
    client.publish(config["topics"]["infrared"], json.dumps(data))
    threading.Timer(time, publish_random_infrared, [time]).start()

parser = argparse.ArgumentParser(description='Publish random sensor data.')
parser.add_argument('-a', action="store_true", help='publish accelerometer data to the broker')
parser.add_argument('-ir', action="store", default=15, help='publish accelerometer data to the broker')
args = parser.parse_args()

def on_press(key):
    if key == keyboard.Key.space:
        global infrared_value
        infrared_value = 1 - infrared_value
        print(infrared_value)

if args.a:
    publish_random_accelerometer()
elif args.ir:
    listener = keyboard.Listener(
        on_press=on_press)
    listener.start()
    publish_random_infrared(time=int(args.ir))
