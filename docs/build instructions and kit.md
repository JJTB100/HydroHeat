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
- Using the manuaal listed in the github for the temperature sensor, set up anmd plug it in.
- Create a bash script that: Reads the temp from the file created starting "28-.../w1_slave" and sends it to the server
```
curl -X POST $url -d temp
```






