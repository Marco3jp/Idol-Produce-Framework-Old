function readIdolHistory(flag) {
  if (flag===-1) {
    idolNumber=0;
  }else{
    idolNumber=flag;
  }
  $(function(){
    $('#loadProduceHistoryUI').css('display','none');
    $('#loadIdolHistory').css('display','block');
    var idolHistoryDisplay=[
      "アイドル名："+produceHistory.idolHistory[idolNumber].idolName,
      "ファン人数："+produceHistory.idolHistory[idolNumber].numberOfFan,
      "内部ステータス（Vo:Da:Vi）："+
        produceHistory.idolHistory[idolNumber].appealLevel.Vocal+":"+
        produceHistory.idolHistory[idolNumber].appealLevel.Dance+":"+
        produceHistory.idolHistory[idolNumber].appealLevel.Visual
    ]
    //表示の追加・削除などは↑の操作で済む//
    //リリース時は可読性・利便性を気にしないので↓の表示部分に入れる//

    $('.idolHistoryBorder').html("");
    for (var i = 0; i < idolHistoryDisplay.length; i++) {
      $('.idolHistoryBorder').append(idolHistoryDisplay[i]);
      $('.idolHistoryBorder').append("<br>");
    }
    $('.idolHistoryBorder').append('<button type="button">このデータでプレイする</button>');

    var pageGuideDisplay=idolNumber+1 + "/" + produceHistory.producingIdol;
    $('#pageGuide').html("");
    $('#pageGuide').append(pageGuideDisplay);

  });
}

function readPrevIdol(){
  if(idolNumber-1>=0){
    readIdolHistory(idolNumber-1);
  }
}

function readNextIdol(){
  if(idolNumber+1<produceHistory.producingIdol){
    readIdolHistory(idolNumber+1);
  }
}
