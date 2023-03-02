<?php

$conn = new mysqli("localhost", "hydroheat", "Hydr0");
$conn->select_db("hydroheat");


$sql = "SELECT * FROM SensorReadings 
JOIN Sensors ON SensorReadings.SensorID = Sensors.SensorID

ORDER BY TIME DESC LIMIT 3";
$result = $conn->query($sql);

$readings = ['GPU'=>0,
'CPU'=>0,
'Water'=>0];

if($result) {
	//print_r($result->fetch_all($mode = MYSQLI_ASSOC));

	
} else {
//echo($conn->error);
}

print(json_encode($readings));

?>
