$(function(){
    var BORDER={"PERFECT":14,"GOOD":12,"NORMAL":10};
    var COUNT=[20,50];
    var LESSON_EXP={"PERFECT":100,"GOOD":80,"NORMAL":70,"BAD":60};
    var produceHistory={
        "lessonLevel":{
            "Vocal":1,
            "Dance":2,
            "Visual":3,
        },
        "idolHistory":{
            "appealLevel":{
                "Vocal": 1,
                "Dance": 1,
                "Visual": 1
            },
            "appealEXP": {
                "Vocal": 0,
                "Dance": 0,
                "Visual": 0
            }
        }
    };
/*
    var DIFFICULT_ENUM{
        "normal":1,
        "hard":2
    }

    var GENRE_ENUM{
        "Vocal":4,
        "Dance":8,
        "Visual":16
    }
*/
    function lesson(scoringData){
        $("#lessonGuide").html("");
        $("#inLessonUI").css("display","block");
        var timer;
        if(scoringData[0]==="normal"){
            timer=550;
        }else{
            timer=600;
        }
        var successRate=80+produceHistory.lessonLevel[scoringData[1]];
        successRate+=levelBonus(scoringData[1]);
        lessonTry(timer,0,1,scoringData,successRate);
    }

    function lessonTry(timer,success,successiveSuccess,scoringData,successRate){
        var temp=1+(successiveSuccess-1)*3;
        var randCalc=Math.random()*100;
        if(randCalc<successRate-(temp*Math.log(temp))){
            ++success;
            ++successiveSuccess;
            timer-=(COUNT[0]+(successiveSuccess-1)*4);
        }else{
            successiveSuccess=1;
            timer-=(COUNT[0]+COUNT[1]);
        }
        if(timer<0){
            lessonEnd(success,scoringData);
        }else{
            displayLessonScore(timer,success);
            setTimeout(lessonTry,1000,timer,success,successiveSuccess,scoringData,successRate)
        }
    }

    function displayLessonScore(timer,success){
        var grade=checkGrade(success);
        console.log(grade);
        $(".grade").html("グレード:"+grade);
        $(".success").html("得点:"+success);
        $(".timer").html("残りカウント:"+timer);
    }

    function checkGrade(success){
        if(BORDER.PERFECT<=success){
            return "PERFECT"
        }else if(BORDER.GOOD<=success){
            return "GOOD"
        }else if(BORDER.NORMAL<=success){
            return "NORMAL"
        }else{
            return "BAD"
        }
    }

    function lessonEnd(success,scoringData){
        var grade=checkGrade(success);
        $(".timer").html("");
        $(".success").html("得点:"+success);
        $(".grade").html("<b>"+grade+"レッスン</b>");
        $(".alert").html("終了です");
        var tempScore=LESSON_EXP[grade];
        if(scoringData[0]=="hard"){
            tempScore*=2;
        }
        var upAppeal=addAppeal(tempScore,scoringData[1]);
        if(upAppeal[0]==0){
            $(".alert").append("<br>経験値が"+upAppeal[1]+"増えました。");
        }else{
            $(".alert").append("<br>経験値が"+upAppeal[1]+"増え、レベルが"+upAppeal[0]+"増えました。");
        }

    }


    function scoringDataToGanre(scoringData){
        if(scoringData%2===1){
            scoringData-=1;
        }else{
            scoringData-=2;
        }
        if(scoringData===4){
            var genre="Vocal";
        }else if(scoringData===8){
            var genre="Dance";
        }else{
            var genre="Visual";
        }
        return genre;
    }

    function levelBonus(genre){
        var addPoint=0;
        if(produceHistory.lessonLevel[genre]>=5){
            addPoint+=5;
        }
        if(produceHistory.lessonLevel[genre]>=10){
            addPoint+=2;
        }
        if(produceHistory.lessonLevel[genre]>=20){
            addPoint+=3;
        }
        return addPoint;
    }

    function addAppeal(tempScore,genre){
        var upAppeal=[0,tempScore];
        produceHistory.idolHistory.appealEXP[genre]+=tempScore;
        while(produceHistory.idolHistory.appealEXP[genre]>=100){
            produceHistory.idolHistory.appealEXP[genre]-=100;
            ++produceHistory.idolHistory.appealLevel;
            upAppeal[0]++;
            upAppeal[1]-=100;
        }
        console.log(upAppeal);
        return upAppeal;
    }

    $('#startLesson').on('click',function(){
        $(".lessonLevel").css('display','block');
        $("#startLesson").css('display','none');
        $("#lessonGuide").html("<div class=\"lessonLevel\"><br><div class=\"lessonLV\" data-difficult=\"normal\">レッスン</div><br><div class=\"lessonLV\" data-difficult=\"hard\">ハードレッスン</div></div>");
    });

    $('body').on('click','.lessonLV',function(){
        var difficult = $(this).data('difficult');
        $("#lessonGuide").html("<div id=\"lessonLabel\"><div class=\"lesson\"data-lesson=\'[\"" + difficult + "\",\"Vocal\"]\'>ぼーかるれっすん</div><div class=\"lesson\"data-lesson=\'[\"" + difficult + "\",\"Dance\"]\'>だんすれっすん</div><div class=\"lesson\"data-lesson=\'[\"" + difficult + "\",\"Visual\"]\'>びじゅあるれっすん</div></div>")
    });

    $('body').on('click',".lesson",function(){
        var hoge = $(this).data('lesson');
        lesson(hoge);
    });
})

/*
レッスンを行う時、以下生成
<div class="lessonLevel">
    <div class="lessonLV" data-difficult="normal">レッスン</div>
    <div class="lessonLV" data-difficult="hard">ハードレッスン</div>
</div>

上、"lessonLevel"を操作されると以下生成。仮対応としてdisplay:noneの状態ではじめて、あとでdisplay:block。
<div id="lessonLabel">
    <div class="lesson" data-lesson="Vocal">ぼーかるれっすん</div>
    <div class="lesson" data-lesson="Dance">だんすれっすん</div>
    <div class="lesson" data-lesson="Visual">びじゅあるれっすん</div>
</div>
*/
