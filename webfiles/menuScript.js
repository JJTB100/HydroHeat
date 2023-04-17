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
      console.log(data);
      console.log(temperatures.temperature);
      chart.draw(data, options);
    });
  }, 5000);
}

const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry) =>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else{
      entry.target.classList.remove('show');
    }
  });
})
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(CdrawChart);

      function CdrawChart() {
        var Cdata = google.visualization.arrayToDataTable([
          ['Date', 'Avg. Temperature °C'],
          ['29/4',  20],
          ['30/4',  21],
          ['1/5',  18],
          ['2/5',  20],
          ['3/5', 22],
        ]);

        var Coptions = {
          title: 'Water Temperature Over Time',
          curveType: 'function',
          legend: { position: 'bottom' },
          height: 400,
          chartArea:{backgroundColor: "#221c35"},
          colors:['32afd4'],
          backgroundColor:'#221c35'
          
        };

        var Cchart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        Cchart.draw(Cdata, Coptions);
      }