var printPoint = 0;
var timerID;

$(function() {
    var serif = [
        "これは私の始まりの物語です。プロデューサーに出会って、もしかしたら……って、そう思ったときのお話。",
        "きっと手の届かない夢だと思っていた、そんな世界に踏み込んだ特別な一日のことでした。"
    ];

    function displayCaller() {
        displayMain(printPoint);
    }

    function displayMain(printPoint_call) {
        console.log(serif[printPoint_call]);
        temp = serif[printPoint_call].split("");
        $('#display').html("");
        i = 0;
        displayCore(temp[i]);
    }

    function displayCore(character) {
    if (i < temp.length) {
        $('#display').append(character);
        ++i;
        if (temp[i - 1] === "。") {
            timerID = setTimeout(displayCore, 650, temp[i]);
        } else if (temp[i - 1] === "、") {
            timerID = setTimeout(displayCore, 350, temp[i]);
        } else {
            timerID = setTimeout(displayCore, 200, temp[i]);
        }
    }
  }

  function displayNext() {
    if (printPoint < serif.length) {
      window.clearTimeout(timerID);
      $('#display').html(serif[printPoint]);
      ++printPoint;
      displayMain(printPoint);
    } else {
      window.clearTimeout(timerID);
      $('#display').html(serif[printPoint]);
    }
  }

  $('button').on('click', displayCaller);
  $('#display').on('click', displayNext);
});

/*
今のところ無理やり動かしている感じ
予定としてはその時表示する文章だけを引数に、setTimeoutで再帰的にコーディングして、内部でインクリメントし、引数のlengthを超えた段階でclearTimeoutして抜ける感じ

もしうまくいかないなら最悪の手段として、DateのメソッドからDate.now()を使ってDate.now()+X(ms)までループするなど。
もし処理が明らかにやばいならやめてください。

function doSomethingLoop(maxCount, i) {
  if (i <= maxCount) {
    doSomething();
    setTimeout(function(){doSomethingLoop(maxCount, ++i)}, 1000);
  }
}

doSomethingLoop(10, 0);

こんなサンプルを見つけた。(https://qiita.com/akyao/items/a718cc78436df68d7e15)
まあ要するに再帰。でもわかりにくい。読めない。

function loopSleep(_loopLimit,_interval, _mainFunc){
  var loopLimit = _loopLimit;
  var interval = _interval;
  var mainFunc = _mainFunc;
  var i = 0;
  var loopFunc = function () {
    var result = mainFunc(i);
    if (result === false) {
      // break機能
      return;
    }
    i = i + 1;
    if (i < loopLimit) {
      setTimeout(loopFunc, interval);
    }
  }
  loopFunc();
}

// 例（10回ループを、1000ミリ秒毎に実行します）
loopSleep(10, 1000, function(i){
  doSomething();
});

// 例（10回ループを、1000ミリ秒毎に実行します）
loopSleep(10, 1000, function(i){
  if (i == 7) {
    // breakと同等
    return false;
  } else if (i % 2 == 0) {
    // continueと同等
    return;
  }
  doSomething();
});

これ、割とわかりやすい。というかloopSleepほしい。頭使うの疲れたので細かいところは明日。頑張ろう……。

実装は不可能じゃないと思う。適切なアルゴリズムとコードさえ書ければきっと動く。絶対に作り上げましょう。
*/
