-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2023 at 01:28 PM
-- Server version: 10.5.15-MariaDB-0+deb11u1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hydroheat`
--

-- --------------------------------------------------------

--
-- Table structure for table `Locations`
--

CREATE TABLE `Locations` (
  `LocationID` int(10) NOT NULL,
  `Name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`LocationID`, `Name`) VALUES
(1, 'Server room'),
(2, 'Swimming pool');

-- --------------------------------------------------------

--
-- Table structure for table `SensorReadings`
--

CREATE TABLE `SensorReadings` (
  `SensorReadingID` int(11) NOT NULL,
  `SensorID` int(11) NOT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp(),
  `Reading` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Sensors`
--

CREATE TABLE `Sensors` (
  `SensorID` int(10) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `LocationID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Sensors`
--

INSERT INTO `Sensors` (`SensorID`, `Name`, `LocationID`) VALUES
(1, 'GPU', 1),
(2, 'CPU', 1),
(3, 'Water', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Locations`
--
ALTER TABLE `Locations`
  ADD PRIMARY KEY (`LocationID`);

--
-- Indexes for table `SensorReadings`
--
ALTER TABLE `SensorReadings`
  ADD PRIMARY KEY (`SensorReadingID`);

--
-- Indexes for table `Sensors`
--
ALTER TABLE `Sensors`
  ADD PRIMARY KEY (`SensorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Locations`
--
ALTER TABLE `Locations`
  MODIFY `LocationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `SensorReadings`
--
ALTER TABLE `SensorReadings`
  MODIFY `SensorReadingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Sensors`
--
ALTER TABLE `Sensors`
  MODIFY `SensorID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
