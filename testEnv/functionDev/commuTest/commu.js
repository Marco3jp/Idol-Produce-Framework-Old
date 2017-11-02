$(function() {
    function communication(num){
        commuEndFlag=false;
        qFlag=false;
        nextMessage="NODATA";
        commuPoint=0;
        //nextMessage=NULL;
        if(num===1){
            messages=produceHistory.idolData[playingIdolNum].commu.first;
        }else if(num===2){
            messages=produceHistory.idolData[playingIdolNum].commu.meeting;
        }else if(num===3){
            var randomId=randomNum(produceHistory.idolData[playingIdolNum].commu.random.length);
            messages=produceHistory.idolData[playingIdolNum].commu.random[randomId];
        }
        console.log("とんだとんだかもめが(ry")
        toArray("main");
    }

    function toArray(printSection){
        nextMessage="NODATA";
        commuNameArray=[];
        commuTextArray=[];
        for (var i = 0; i < messages[printSection].length; i++) {
            if(messages[printSection][i]==='Q'){
                i++;
                nextMessage=messages[printSection][i];
                qFlag=true;
                /*
                このnextMessageに進むコードを書いてないので早く書いてくださいごめんなさい怒らないで
                */
            }else if(messages[printSection][i]==='END'){
                commuEndFlag=true;
            }else if(messages[printSection][i]==='NEXT'){
                ++i;
                nextMessage=messages[printSection][i];
            }else if(i%2===0){
                commuNameArray[i/2]=messages[printSection][i];
            }else if(i%2===1){
                commuTextArray[(i-1)/2]=messages[printSection][i];
            }
        }
        console.log("そして輝く")
        commuInitial();
    }
    //多分これで動くはず。
    //ちょっと[]の使い方が怪しいのでテスト環境作って試してもいいかもしれない

    function commuInitial() {
        $('#displayNameBorder').html('<div id="displayName"></div>');
        $('#displayBorder').html('<div id="displayText"></div>');
        textPoint = 0;
        endFlag = false;
        printFlag = false;
        textCutter();
    }

    function textCutter() {
        $('#displayText').html("");
        if(commuNameArray[textPoint]==="P"){
            var printName=produceHistory.producerName+"P";
            $('#displayName').html(printName);
        }else if(commuNameArray[textPoint]==="IDOL"){
            $('#displayName').html(produceHistory.idolHistory[playingIdolNum].idolName);
        }else{
            $('#displayName').html(commuNameArray[textPoint]);
        }
        characters = commuTextArray[textPoint].split("");
        printCharacter = 0;
        displayCore(characters);
    }

    function displayCore() {
        $('#displayText').append(characters[printCharacter]);
        if (printCharacter + 1 < characters.length) {
            ++printCharacter;
            if (characters[printCharacter - 1] === "。") {
                displayID = setTimeout(displayCore, 600);
            } else if (characters[printCharacter - 1] === "、") {
                displayID = setTimeout(displayCore, 300, characters[printCharacter]);
            } else {
                displayID = setTimeout(displayCore, 150, characters[printCharacter]);
            }
        } else {
            printFlag = true;
            if(commuEndFlag===true){
                $('#displayText').append("<br><br><div style='text-align:right;'>To Be Continue...</div>");
            }else if(qFlag===true){
                $('#displayText').append("<br><br><div style='text-align:right;'>Select Choice!</div>");
            }
        }
    }

    function displayQuestion(printSection){
        overOneFunctionValue=printSection;
        nextMessage="NODATA";
        qFlag=false;

        $("#displayNameBorder").html("");
        $("#displayBorder").html("");
        $("#displayNameBorder").css('display','none');
        $("#displayBorder").css('display','none');

        $('#choices').css('display','block');
        for (var i = 0; i < 5; i++) {
            var choiceClean= "#choice"+i;
            $(choiceClean).html("");
        }

        if(messages[printSection][0].length>5){
            var count=messages_length=5;
        }else{
            var count=messages[printSection][0].length;
        }
        for (var i = 0; i < count; i++) {
            var choicesIdMaker="#choice"+i;
            var choicesTextMaker= (i+1) + "：" + messages[printSection][0][i];
            //var choiceScriptMaker = "<script>$(function(){$(\"#choice"+ i +"\").on(\"click\",function(){selectChoice("+ i +");});})</script>"
            $(choicesIdMaker).append(choicesTextMaker);
            //$('body').append(choiceScriptMaker);
        }
    }

    function selectChoice(selectedChoice){
        $('#choices').css('display','none');
        $("#displayNameBorder").css('display','inline-block');
        $("#displayBorder").css('display','inline-block');
        nextMessage=messages[overOneFunctionValue][1][selectedChoice];
        commuPoint+=messages[overOneFunctionValue][2][selectedChoice];
        toArray(nextMessage);
    }


    //printFlagは表示完了の状態を表す//
    function displayNext() {
        window.clearTimeout(displayID);
        if (endFlag === true) {
            if(nextMessage!="NODATA" && qFlag===true){
                displayQuestion(nextMessage);
            }else if(nextMessage!="NODATA"){
                toArray(nextMessage);
            }else if(commuEndFlag===true){
                alert("本来はここでコミュの採点結果を表示します");
            }else{
                alert("ちょっとおかしいので要確認");
            }
        } else if (textPoint + 1 < commuTextArray.length) {
            //ここでコミュの終わりかチェック//
            if (printFlag === true) {
                printFlag = false;
                ++textPoint;
                textCutter();
            } else {
                printFlag = true;
                $('#displayText').html(commuTextArray[textPoint]);
            }
        }else{
            endFlag=true;
            if(printFlag===true){
                displayNext();
            }else{
                $('#displayText').html(commuTextArray[textPoint]);
                if(commuEndFlag===true){
                    $('#displayText').append("<br><br><div style='text-align:right;'>To Be Continue...</div>");
                }else if(qFlag===true){
                    $('#displayText').append("<br><br><div style='text-align:right;'>Select Choice!</div>");
                }
                printFlag = true;
            }
        }
    }

    function randomNum(max) {
        return Math.floor(Math.random() * max);
    }


    $('button[name="first"]').on('click', function() {
        communication(1);
    });
    $('button[name="meeting"]').on('click', function() {
        communication(2);
    });
    $('button[name="random"]').on('click', function() {
        communication(3);
    });
    $('#displayBorder').on('click', displayNext);

    $('#choice0').on('click', function(){
        selectChoice(0);
    });
    $('#choice1').on('click', function(){
        selectChoice(1);
    });
    $('#choice2').on('click', function(){
        selectChoice(2);
    });
    $('#choice3').on('click', function(){
        selectChoice(3);
    });
    $('#choice4').on('click', function(){
        selectChoice(4);
    });
});
