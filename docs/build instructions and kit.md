# Hardware:

|Name                                                                                                                               |Cost  |Quantity|
|-----------------------------------------------------------------------------------------------------------------------------------|----  |--------|
|Raspberry Pi 3b kit                                                                                                                |N/A   | 1      |
|[Thermal Waterproof Probe Sensor](https://www.amazon.co.uk/dp/B07KNQJ3D7?psc=1&ref=ppx_yo2ov_dt_b_product_details)                 |£7.14 | 5      |
|[H bridge motor controller](https://www.amazon.co.uk/JZK-Stepper-Stepping-Channel-H-Bridge/dp/B08M8R35MQ/ref=asc_df_B08M8R35MQ/)   |£7.49 | 1      |
|[Submersible water pump](https://www.amazon.co.uk/dp/B0971BGTTG?psc=1&ref=ppx_yo2ov_dt_b_product_details)                          |£15.99| 4      |
|[Water heat sink](https://www.amazon.co.uk/dp/B078MK5GG9?psc=1&ref=ppx_yo2ov_dt_b_product_details)                                 |£6.99 | 2      |
|Lego swimming pool                                                                                                                 |N/A   | 1      |
|[Pico](https://www.amazon.co.uk/Pimoroni-Pico-Explorer-Base/dp/B08YZ7ZKCF/ref=sr_1_1?keywords=pico+explorer&qid=1679314195&sr=8-1) |£24.90| 1      |


# Build Guide:

## Setting up the raspberry pi

### Installing the operating system
- Download the Raspberry Pi OS Imaging tool from https://www.raspberrypi.com/software/
![image](https://user-images.githubusercontent.com/760604/220124480-a7dfc367-48ec-40e8-8bcb-132fd85c7eb8.png)
- Change the settings to do the following
  - Set the hostname to `hydroheat`
  - Enable SSH
  - Set the username and password. We used `hydroheat` as the username and `Hydr0` as the password for this guide. You will need to choose a different password for production.
  - Configure the wireless LAN to connect to your WiFi network
- Write the operating system to the SD card
![image](https://user-images.githubusercontent.com/760604/220125087-68009fcf-b937-47c1-baed-32317451664b.png)
- Insert the SD card to the raspberry pi, connect the mouse, keyboard and HDMI cable and then plug in the power supply

### Setting up the server
- Open a terminal and set the time using a command line `sudo date -s "20 Feb 2023 13:56"`
- Update software with:
```
sudo apt update
sudo apt upgrade
```
- Set the raspberry pi to boot into command line (for better server performance)
```
sudo raspi-config
```
Change System Options > Boot > Console


- Enable 1 wire interfacing:

Change Interface > 1 wire > yes


When you exit, the Raspberry pi will reboot

- Run the following code to enable the kernel module
```
sudo modprobe w1-gpio
sudo modprobe w1-therm
```

- (Login to any smoothwall)
- install apache
```
sudo apt install apache2
```
- change directory of apache pointer
```
sudo nano /etc/apache2/sites-available/000-default.conf
```
- then change "var/www/" to where the file is e.g. "home/hydroheat/www"
- reload site

```
sudo service apache2 reload
```
- change permissions
```
chmod 777 www
sudo nano /etc/apache2/sites-available/000-default.conf

<Location/>
Allow Override All
Require all granted
<Location>

sudo chown -R hydroheat:www-data www
```
- install php
```
sudo apt install php libapache2-mod-php
```

- As shown in the webfiles the php scripts are able to pull the temperature from the client pi and save these to a text file
- This text file is read from in order to update the website to have a live show of the current temperature when the client is running

### Setting up the client
- Using the manual listed in the github for the temperature sensor, set up and plug it in.
- The manual instructed how we set up our wires first to the Pi
  - The (in our case) blue wire was connected between the 3V3 power on the Pi to the positive rail of the breadboard
  - The green wire would be connected to the ground on the Pi and to the negative rail of the breadboard
  - The yellow wire would be connected to a horizontal area of the main breadboard
- Then the wires from the probe
  - Red is connected to the positive rail below the connection to the pi
  - Black is similarly connected to the negative rail
  - Yellow goes to the right of the pin on the main breadboard with a 4.7KOhm resistor between them and between the positive red wire and pin

![1679310101514](https://user-images.githubusercontent.com/99484954/226321406-028f1dbb-6145-4c02-82df-71afdcc41945.jpg)


- Create a bash script that reads the temp from the file created starting "28-.../w1_slave" and sends it to the server
```
#!/bin/bash
url='jonathan.broster.co.uk'

for i in 1 2 3 4 5 6 7 8 9 10 11 12
do
  value=`cat /sys/bus/w1/devices/28-.../w1_slave`
  temp=${value:69}
  curl -X POST $url -d "temperature=$temp"
  echo $temp >> /home/hydroheat/scripts/tempLog.txt
  sleep 5
done
```
- This will read the temperature every 5 seconds for a minute and send it to the server hosted on jonathan.broster.co.uk
- Then using a crontab we set the script to run every minute from startup
```
crontab -e
```
- This opens the crontab setup file and then we need to append the schedule
```
* * * * * /home/hydroheat/scripts/readTemp.sh
```

### Setting up the pico
- First the motor needs to be plugged into the motor pins where we have used pins 8 and 9
- The red wire goes into +1
- The black wire goes into -1

![1679309773993](https://user-images.githubusercontent.com/99484954/226320136-579a539c-d181-41f3-9ed3-c2f856e37cd3.jpg)

- Then by plugging the Pico into another machine it can be accessed using thonny
- The pimoroni micropython script can be installed from https://github.com/pimoroni/pimoroni-pico/releases/tag/v1.19.17 and then using thonny transferred onto the Pico
- Then upload a script titled 'main.py' (has to be exactly that name) which will be run on startup
- The script will turn on the motors as shown below for 500 seconds, the script will stop when the pico is unplugged or 500 seconds have passed

```
from motor import Motor
import time

m = Motor((8,9))

#motor, speed,(-1 to 1)
def MotorOn(m1, speed):
    m1.enable()
    m1.speed(speed)

MotorOn(m, 1)
time.sleep(500)
m.disable()
```
### The prototype
- Setting up the prototype or real product is quite simple with the motor going on one side of the water resevoir
- The temperature sensor on the other side
- The tubing for the water through the motor passes into the heat sink which is on top of the electronics (using thermal paste or a thermally conductive divider)
- Then passes out the heat sink and into the side of the pool with the temperature sensor
![IMG_20230315_103846_528](https://user-images.githubusercontent.com/99484954/226316971-d55efad8-be32-41f8-8474-9c25e23a30d1.jpg)

### Final overview
![IMG_20230315_103859_837](https://user-images.githubusercontent.com/99484954/226317004-e5064fe9-f72d-47cc-aa9b-ac1ab835709e.jpg)
- The final product should include:
  - A raspberry pi server set up and hosted on the internet
  - A raspberry pi client shown in the image with pins connected to a breadboard and powered by a battery pack
  - A breadboard which the raspberry pi pins and temperature sensor wires are both connected to
  - A pico connected to a motor (can be plugged into raspberry pi to start)
  - A reservoir of water which the motor is on one side and the temperature sensor on the other

#https://opensource.com/article/20/5/usb-port-raspberry-pi-python
#https://stackoverflow.com/questions/72862216/how-to-use-read-data-from-computer-using-a-pi-pico-running-micropython





