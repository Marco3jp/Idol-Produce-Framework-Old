  function modeChange(num) {
    if (num == 0) {
      document.getElementById("titleStart").style.display = "none";
      document.getElementById("unimplemented").style.display = "none";
      document.getElementById("inputProducerName").style.display = "none";
      document.getElementById("loadProduceHistory").style.display = "block";
    }else if(num==1){
      document.getElementById("titleStart").style.display = "none";
      document.getElementById("unimplemented").style.display = "none";
      document.getElementById("loadProduceHistory").style.display = "none";
      document.getElementById("inputProducerName").style.display = "block";
    }else if(num==100){
      document.getElementById("titleStart").style.display = "none";
      document.getElementById("loadProduceHistory").style.display = "none";
      document.getElementById("inputProducerName").style.display = "none";
      document.getElementById("unimplemented").style.display = "block";
    }else if(num==101){
      document.getElementById("unimplemented").style.display = "none";
      document.getElementById("loadProduceHistory").style.display = "none";
      document.getElementById("inputProducerName").style.display = "none";
      document.getElementById("titleStart").style.display = "block";
    }
  }
