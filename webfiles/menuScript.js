const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
      
    }
  });

  

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
    minorTicks: 5, width: 800, height: 400 ,
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


