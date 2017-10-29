var displayID;
var textPoint;
var characters;
var endFlag;
var printFlag;
var playingIdolNum;
var messages;
var nextMessage;
var commuEndFlag;
var commuNameArray = [];
var commuTextArray = [];
var qFlag;
var choiceId=0;
var commuPoint;
var overOneFunctionValue;

$(function() {
    var reader;
    playingIdolNum = 0;
    //今回はテスト用コードなのでここは0になっていますが、実際の環境ではアイドル選択画面で選択した段階で値が変わります。

    function onChange(event) {
        reader.readAsText(event.target.files[0]);
    }

    function onLoad(event) {
        produceHistory = JSON.parse(event.target.result);
        console.log(produceHistory);
        //↑using to debug//
    }

    reader = new FileReader();
    reader.onload = onLoad;
    $('input[type="file"]').on('change', onChange);
});
