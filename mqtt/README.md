# Fall Detection

### Sensor data streaming simulation

You can send IR data by running the command below:

```
python simulate_sensor_data.py -ir <interval_in_seconds>
```

If you want to change the value any time just press the space key of your keyboard.

### General notes

The detectFall.py file can be used to sign the broker (broker configuration from config.txt) and collect data. Thus, the data is passed to the DL model to classify the event: fall or not

The file generateCSV.py can be used to sign to the broker (broker configuration from config.txt) and collect data to generate CSV files

The file foward_cloud.py can be used to sign the broker (broker configuration from config.txt, normally in fog), collect data and foward to the cloud

The file client_cloud.py can be used in the cloud to sign to the broker (hosted in the cloud) and collect the data
