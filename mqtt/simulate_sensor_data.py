import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import json
import time
import argparse
import threading

from random import *

client = mqtt.Client("test")
client.connect("localhost")

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
    client.publish("/sensor/accelerometer", json.dumps(data))

def publish_random_infrared():
    data = {
        'value': randint(0,1)
    }
    threading.Timer(5, publish_random_infrared).start()


parser = argparse.ArgumentParser(description='Publish random sensor data.')
parser.add_argument('-a', action="store_true", help='publish accelerometer data to the broker')
parser.add_argument('-ir', action="store_true", help='publish accelerometer data to the broker')
args = parser.parse_args()

if args.a:
    publish_random_accelerometer()
elif args.ir:
    publish_random_infrared()
