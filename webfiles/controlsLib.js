var slider = document.getElementById("myRange")
var flownum = document.getElementById("flow-rate-num")
var flowRate = 50;
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
updateFlow()

slider.oninput = function() {
    flowRate = this.value;
    console.log(flowRate)
    updateFlow();
  }
  
  plus.onclick = function(){
    //console.log(parseInt(flowRate));
    if(flowRate < 100){
      flowRate++;
      updateFlow();
    }
    
  }
  minus.onclick = function(){
    if(flowRate > 0){
      flowRate--;
      updateFlow();
    }
    
  }

  function updateFlow(){
    flownum.innerText = flowRate.toString();
    slider.value = flowRate;
  }

let sensors = {
  CPU: 0,
  GPU: 0,
  Water: 0
}

google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Temp', 80],
        
      ]);

      var data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Gauge', 80],
        
      ]);

      var options = {
        redFrom: 90, redTo: 100, redColor: '#D84727', greenColor: '#31AFD4', greenFrom: 0, greenTo: 75,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5,
        
      };

      var chart = new google.visualization.Gauge(document.getElementById('temp-chart'));
      var chart2 = new google.visualization.Gauge(document.getElementById('chart2'));

      chart.draw(data, options);
      chart2.draw(data, options);

      setInterval(function() {
	$.getJSON('api.php', {}).done((sensors) => {
		console.log(data);
	
	        data.setValue(0, 1, sensors.CPU);
        	chart.draw(data, options);
	        data2.setValue(0, 1, sensors.GPU);
        	chart2.draw(data2, options);
	});
      }, 5000);
    }

