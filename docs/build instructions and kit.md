# Hardware:

|Name                                                                                                                               |Cost  |Quantity|
|-----------------------------------------------------------------------------------------------------------------------------------|----  |--------|
|Raspberry Pi 3b kit                                                                                                                |N/A   | 1      |
|[Thermal Waterproof Probe Sensor](https://www.amazon.co.uk/dp/B07KNQJ3D7?psc=1&ref=ppx_yo2ov_dt_b_product_details)                 |£7.14 | 5      |
|[H bridge motor controller](https://www.amazon.co.uk/JZK-Stepper-Stepping-Channel-H-Bridge/dp/B08M8R35MQ/ref=asc_df_B08M8R35MQ/)   |£7.49 | 1      |
|[Submersible water pump](https://www.amazon.co.uk/dp/B0971BGTTG?psc=1&ref=ppx_yo2ov_dt_b_product_details)                          |£15.99| 4      |
|[Water heat sink](https://www.amazon.co.uk/dp/B078MK5GG9?psc=1&ref=ppx_yo2ov_dt_b_product_details)                                 |£6.99 | 2      |
|Lego swimming pool                                                                                                                 |N/A   | 1      |


![IMG_20230320_103439_764](https://user-images.githubusercontent.com/99484954/226316866-9008f346-008a-4f28-8cb4-ee03ccb1b19c.jpg)
![IMG_20230315_103846_528](https://user-images.githubusercontent.com/99484954/226316971-d55efad8-be32-41f8-8474-9c25e23a30d1.jpg)
![IMG_20230315_103859_837](https://user-images.githubusercontent.com/99484954/226317004-e5064fe9-f72d-47cc-aa9b-ac1ab835709e.jpg)


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
- Install the python mysql connector
```
pip install mysql-connector 
```
- install php
```
sudo apt install php libapache2-mod-php php-mysql mariadb-server python
```

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
- The pimoroni micropython script can be installed from https://github.com/pimoroni/pimoroni-pico/releases/tag/v1.19.17 and then 
- This can be used to upload a script titled 'main.py' (has to be exactly) which will be run on startup
- 

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
m2.disable()
```

#https://opensource.com/article/20/5/usb-port-raspberry-pi-python
#https://stackoverflow.com/questions/72862216/how-to-use-read-data-from-computer-using-a-pi-pico-running-micropython





