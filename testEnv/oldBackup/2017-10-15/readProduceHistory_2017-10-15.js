$(function(){
    var reader;
    function onChange(event) {
        reader.readAsText(event.target.files[0]);
    }

    function onLoad(event) {
        var produceHistory=JSON.parse(event.target.result);
        console.log(produceHistory);
        var detailProduceHistory=[
          "プロデューサー名："+produceHistory[0].producerName,
          "プロデュース中のアイドル数："+produceHistory[0].producingIdol,
          "引退したアイドルの数："+produceHistory[0].retireIdol,
          "内部ステータス（Vo:Da:Vi）："+
            produceHistory[0].lessonLevel[0].Vocal+":"+
            produceHistory[0].lessonLevel[0].Dance+":"+
            produceHistory[0].lessonLevel[0].Visual
        ]
        $('.detailProduceHistoryBorder').html("");
        for (var i = 0; i < detailProduceHistory.length; i++) {
          $('.detailProduceHistoryBorder').append(detailProduceHistory[i]);
          $('.detailProduceHistoryBorder').append("<br>");
        }
    }

    reader = new FileReader();
    reader.onload = onLoad;

    $('input[type="file"]').on('change', onChange);
});

//ここでは指定ファイルをjsonとして扱えるようにするので、あとはmodeChange_test内のreadProduceHistry()がうまく分解して配列化してくれるって言ってた//
