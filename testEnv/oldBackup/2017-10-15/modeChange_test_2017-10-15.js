//var unimplementedList=['titleStart','loadProduceHistory','inputProducerName','inputProductionName','idleSelect','yesOrNo','todaySchedule','selectLesson','selectCommu','communication','selectChoice','activitieWeek','remainingWeek','status','displayNumberOfFans','displayIdleRank','saveProduceHistry'];
var implementedMode=['titleStart','loadProduceHistory','inputProducerName']

function modeChange(num) {
  $(function(){
    $('#unimplemented').css('display','none');
    for(i=0;i<implementedMode.length;++i){
      if(i===num){
        $("#"+implementedMode[i]).css('display','block');
      }else{
        $("#"+implementedMode[i]).css('display','none');
      }
    }
  });
}
//$("."+modelist[N]).css('display','none');
function unimplementedShow(){
  for(i=0;i<implementedMode.length;++i){
    $("#"+implementedMode[i]).css('display','none');
  }
  $('#unimplemented').css('display','block');
}

function readProduceHistry(){

}
