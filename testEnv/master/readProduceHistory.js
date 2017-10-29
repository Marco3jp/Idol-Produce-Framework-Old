$(function() {
  var reader=NULL;

  function onChange(event) {
    reader.readAsText(event.target.files[0]);
  }

  function onLoad(event) {
    produceHistory = JSON.parse(event.target.result);
    console.log(produceHistory);
    //↑using to debug//

    var produceHistoryDisplay = [
      "プロデューサー名：" + produceHistory.producerName,
      "プロデュース中のアイドル数：" + produceHistory.producingIdol,
      "引退したアイドルの数：" + produceHistory.retireIdol,
      "内部ステータス（Vo:Da:Vi）：" +
      produceHistory.lessonLevel.Vocal + ":" +
      produceHistory.lessonLevel.Dance + ":" +
      produceHistory.lessonLevel.Visual
    ]
    //表示の追加・削除などは↑の操作で済む//
    //リリース時は可読性・利便性を気にしないので↓の表示部分に入れる//

    $('.produceHistoryBorder').html("");
    for (var i = 0; i < produceHistoryDisplay.length; i++) {
      $('.produceHistoryBorder').append(produceHistoryDisplay[i]);
      $('.produceHistoryBorder').append("<br>");
    }
    $('.produceHistoryBorder').append('<button type="button" onclick="readIdolHistory(-1)">このデータでプレイする</button>');
  }

  reader = new FileReader();
  reader.onload = onLoad;

  $('input[type="file"]').on('change', onChange);
});
