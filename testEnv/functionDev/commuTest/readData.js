var messages;
var nextMessage;
var commuNameArray = [];
var commuTextArray = [];
var characters;
/*
    **Parent-child relationship**
     produceHistory.idolData[id.playingIdol].commu.*
        - messages (by communication())
            - nextMessage (by toArray())
            - commuNameArray (by toArray())
            - commuTextArray (by toArray())
                - characters (by textCutter())
*/

var overOneFunctionValue;

var playingIdolNum;
var commuPoint;
var textPoint;
var choiceId=0;
var displayID;

var printFlag;
var commuEndFlag;
var qFlag;
var endFlag;

var flag={"displayEnd": ,"printEnd": , "q": ,"commuEnd":,}
var id={"playingIdol","display":,}
/*
    ** Not Finished Change variable. I wrote plans below**
    *Flag -> flag.*
        endFlag -> flag.displayEnd
        printFlag -> flag.prinfEnd
        qFlag -> flag.question
        commuEndFlag -> flag.commuEnd

    *id -> id.*
    *Point -> id.*
    playingIdolNum -> id.playingIdol
        choiceId -> id.choice
        displayID -> id.display
        commuPoint -> id.commu
        textPoint -> id.text
        playingIdolNum -> id.playingIdol
*/

$(function() {
    var reader;
    playingIdolNum = 0;
    //Actually, playingIdolNum is defined when Player choose idol to produce
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
