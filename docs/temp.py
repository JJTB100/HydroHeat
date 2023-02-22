import os
import re
import glob

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

gpu = get_gpu_temp()
cpu = get_cpu_temp()
probe = get_probe_temp()
print("CPU temp: {:.1f}'C       GPU temp: {:.1f}'C      Probe temp: {:.1f}'C".format(cpu, gpu, probe))
