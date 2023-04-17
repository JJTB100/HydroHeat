from motor import Motor
import math
from pimoroni import Button
import time
import sys
import machine
from picographics import PicoGraphics, DISPLAY_PICO_EXPLORER
from machine import Pin

# set up screen buffer and ADC

display = PicoGraphics(display=DISPLAY_PICO_EXPLORER)
led = machine.Pin(25, machine.Pin.OUT)

m = Motor((8,9))


WHITE = display.create_pen(255, 255, 255)
BLACK = display.create_pen(0,0,0)
button_a = Button(12)
button_b = Button(13)
button_a = Button(12)
button_b = Button(13)
button_x = Button(14)
button_y = Button(15)



def clear():
    display.set_pen(BLACK)
    display.clear()
    display.set_pen(WHITE)
clear()
display.set_pen(display.create_pen(168, 225, 238))
display.text("Hydro", 25, 50, 200, 7)
display.set_pen(display.create_pen(216, 71, 39))
display.text("Heat", 45, 100, 200, 7)
def run():
    waterTemp = "22222"
    CPUTemp="100000"
    speedM=0.5
    data=""
    m.enable()
    finish = False
    i=0
    up = 0
    while (finish != True):
        i+=1
        led(1)
        data = input()
        led(0)
        waterTemp = data[12:17]
        CPUTemp = data[18:24]
        clear()
        display.set_pen(WHITE)
        
        if button_x.read():
            up += 0.1
        if button_y.read():
            up -= 0.1
        speedM = round((float(waterTemp)/100000),2) + up

        display.text("Water: "+str(waterTemp[0:2])+"."+str(waterTemp[2:5]), 10, 10, 240, 3)
        display.text("CPU: "+str(CPUTemp[0:2])+"."+str(CPUTemp[2:5]), 10, 50, 240, 3)
        display.text("Motor: "+str(speedM), 0, 90, 240, 3)
        display.text("A: Stop", 1, 150, 240, 2)
        display.text("B: Start", 1, 165, 240, 2)
        display.text("X: Increase Speed", 1, 180, 240, 2)
        display.text("Y: Decrease Speed", 1, 195, 240, 2)

        display.text("Data: "+str(i), 195, 195, 240, 1)
        m.speed(speedM)
        display.update()
        if button_a.read():
            clear()
            display.set_pen(display.create_pen(168, 225, 238))
            display.text("Hydro", 25, 50, 200, 7)
            display.set_pen(display.create_pen(216, 71, 39))
            display.text("Heat", 45, 100, 200, 7)
            finish = True
            display.update()
            m.disable()

            


run()
while True:
    if(button_b.read()):
        run()


    

