#Runs on Pico
from motor import Motor
import time

m = Motor((8,9))
m2 = Motor((10,11))


#motor, speed,(-1 to 1)
def MotorOn(m1, m2, speed):
    m1.enable()
    m1.speed(speed)
    m2.enable()
    m2.speed(-speed)


MotorOn(m, m2, 1)
time.sleep(500)
m.disable()
m2.disable()

#https://opensource.com/article/20/5/usb-port-raspberry-pi-python
#https://stackoverflow.com/questions/72862216/how-to-use-read-data-from-computer-using-a-pi-pico-running-micropython
