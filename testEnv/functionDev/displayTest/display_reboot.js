var text;
var displayID;
var textPoint;
var characters;
var i;
var endFlag;
var printFlag;

$(function() {
    text = [
        "これは私の始まりの物語です。プロデューサーに出会って、もしかしたら……って、そう思ったときのお話。",
        "きっと手の届かない夢だと思っていた、そんな世界に踏み込んだ特別な一日のことでした。"
    ];

    function commuInitial() {
        $('#display').html("");
        textPoint = 0;
        endFlag = false;
        printFlag = false;
        textCutter();
    }

    function textCutter() {
        $('#display').html("");
        characters = text[textPoint].split("");
        i = 0;
        displayCore(characters);
    }

    function displayCore() {
        $('#display').append(characters[i]);
        if (i + 1 < characters.length) {
            ++i;
            if (characters[i - 1] === "。") {
                displayID = setTimeout(displayCore, 600);
            } else if (characters[i - 1] === "、") {
                displayID = setTimeout(displayCore, 300, characters[i]);
            } else {
                displayID = setTimeout(displayCore, 150, characters[i]);
            }
        } else {
            printFlag = true;
        }
    }

    function displayNext() {
        window.clearTimeout(displayID);
        if (endFlag === true) {
            alert("本来はここでコミュの採点結果を表示します");
        } else if (textPoint + 1 < text.length) {
            if (printFlag === true) {
                printFlag = false;
                ++textPoint;
                textCutter();
            } else {
                printFlag = true;
                $('#display').html(text[textPoint]);
            }
        } else {
            //最後のテキスト全部表示_追記：↑で表示フラグ管理した_追記：うまくいってねえぞステハゲif文の条件よく見ろ//
            $('#display').html(text[textPoint]);
            $('#display').append("<br><br><div style='text-align:right;'>Continue...</div>");
            endFlag = true;
        }
    }

    $('button').on('click', commuInitial);
    $('#display').on('click', displayNext);
});

/*
textCutterの引数とかちょいちょいわかりにくい。
グローバル変数にする必要がなさそうなものも無理やりやってる感じなのでやめてほしい

あと実際環境ではnameとtextが混在しているのでそのあたりを改善する必要はあるなあという感じがある
先に"Q"か"END"まで先読みして別の配列にわけておけば、nameの表示は単純だし、このコードそのまま流用しても問題ないと思うので要検討
*/
