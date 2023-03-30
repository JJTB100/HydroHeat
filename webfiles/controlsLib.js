var slider = document.getElementById("myRange");
var flownum = document.getElementById("flow-rate-num");
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


google.charts.load('current', {'packages':['gauge']});
  
google.charts.setOnLoadCallback(drawChart);

    
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temp', 22],
    ['CPU', 55]
  ]);

  var options = {
    redFrom: 90, redTo: 100, redColor: '#D84727', greenColor: '#31AFD4', greenFrom: 0, greenTo: 75,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5, width: 700, height: 300 ,
  };

  var chart = new google.visualization.Gauge(document.getElementById('temp-chart'));
  chart.draw(data, options);
  setInterval(function() {
    $.getJSON('temps.json', {}).done((temperatures) => {
      console.log(data);
      data.setValue(0, 1, Math.floor(temperatures.temperature / 1000));
      data.setValue(1, 1, Math.floor(temperatures.CPU / 1000));
      chart.draw(data, options);
    });
  }, 5000);
}


