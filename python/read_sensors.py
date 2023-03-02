import os
import re
import glob
import mysql.connector
import time

DELAY_BETWEEN_READINGS = 5
# adapted from: https://www.cyberciti.biz/faq/linux-find-out-raspberry-pi-gpu-and-arm-cpu-temperature-command/

# get GPU temperature of a raspberry pi (in degrees C)
def get_gpu_temp():
  output = os.popen('vcgencmd measure_temp').read()
  temp = re.match(r'temp=(\d+\.\d+)', output).group(1)
  return float(temp)

def get_cpu_temp():
  f = open("/sys/class/thermal/thermal_zone0/temp")
  output = f.read()
  f.close()
  return int(output)/1000

def get_probe_temp():
  folders = glob.glob("/sys/bus/w1/devices/28*")
  f = open(folders[0] + "/w1_slave")
  output = f.read()
  f.close()
  temp = float(re.search(r't=(\d+)', output).group(1)) / 1000
  return temp

db_connection = mysql.connector.connect(
 host="localhost",
 user="hydroheat",
 password="Hydr0",
 database="hydroheat"
)

db = db_connection.cursor(dictionary=True)

# get sensors and remember IDS
db.execute("SELECT * FROM Sensors")
sensors = db.fetchall()
sensorIDS = {}
for s in sensors:
  sensorIDS[s["Name"]] = s["SensorID"]

print("Found sensors: ", sensorIDS)

while True:
  # get sensor values
  gpu = get_gpu_temp()
  cpu = get_cpu_temp()
  probe = get_probe_temp()


  print("CPU temp: {:.1f}'C 	GPU temp: {:.1f}'C	Probe temp: {:.1f}'C".format(cpu, gpu, probe))


  # store sensor values

  sql = """INSERT INTO SensorReadings 
	(SensorID, Time, Reading) 
  VALUES 
	(%s, NOW(), %s),
	(%s, NOW(), %s),
	(%s, NOW(), %s);
  """

  params = [sensorIDS["CPU"], cpu, 
	  sensorIDS["GPU"], gpu, 
          sensorIDS["Water"], probe]

  print("Running SQL: ", sql, "with params: ", params)

  db.execute(sql, params)
  db_connection.commit()

  # Waiting...
  time.sleep(DELAY_BETWEEN_READINGS)

