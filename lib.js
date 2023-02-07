var slider = document.getElementById("myRange")
var flownum = document.getElementById("flow-rate-num")
var flowRate = 0;
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");

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