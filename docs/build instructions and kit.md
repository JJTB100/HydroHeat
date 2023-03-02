# Hardware:

|Name                                                                                                                               |Cost  |Quantity|
|-----------------------------------------------------------------------------------------------------------------------------------|----  |--------|
|Raspberry Pi 3b kit                                                                                                                |N/A   | 1      |
|[Thermal Waterproof Probe Sensor](https://www.amazon.co.uk/dp/B07KNQJ3D7?psc=1&ref=ppx_yo2ov_dt_b_product_details)                 |£7.14 | 5      |
|[H bridge motor controller](https://www.amazon.co.uk/JZK-Stepper-Stepping-Channel-H-Bridge/dp/B08M8R35MQ/ref=asc_df_B08M8R35MQ/)   |£7.49 | 1      |
|[Submersible water pump](https://www.amazon.co.uk/dp/B0971BGTTG?psc=1&ref=ppx_yo2ov_dt_b_product_details)                          |£15.99| 4      |
|[Water heat sink](https://www.amazon.co.uk/dp/B078MK5GG9?psc=1&ref=ppx_yo2ov_dt_b_product_details)                                 |£6.99 | 2      |
|Lego swimming pool                                                                                                                 |N/A   | 1      |


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
When you exit, the Raspberry pi will reboot

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
sudo ervice apache2 reload
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

- Set up the database
``` sudo mysql -u root ```

Then enter these SQL commands
``` CREATE DATABASE hydroheat;
CREATE USER 'hydroheat'@localhost IDENTIFIED BY 'Hydr0'; 
GRANT ALL PRIVILAGES ON *.* TO 'hydroheat'@localhost IDENTIFIED BY 'Hydr0';
```

You'll then need to set up the database. The tables and records you need are all stored [here](https://github.com/JJTB100/HydroHeat/blob/main/hydroheat.sql)

Note: for development we used [PhpMyAdmin](https://www.phpmyadmin.net/) to create the tables and export them. You can use this to import the tables or you can import them straight from the command line:

```mysql -u hydroheat -p hydroheat < hydroheat.sql```






