$(function(){
  string = ["これは私の始まりの物語です。プロデューサーに出会って、もしかしたら……って、そう思ったときのお話。","きっと手の届かない夢だと思っていた、そんな世界に踏み込んだ特別な一日のことでした。"];
  printPoint=0;

  function display(){
    temp=string[printPoint].split("");
    console.log(temp);
    $('#display').html("");
    for (var i = 0; i < temp.length; i++) {
      $('#display').append(temp[i]);
      var time=Date.now();
      while(time+300>Date.now()){
      }
    }
    if(printPoint<string.length){
      ++printPoint;
      display();
    }
  }

  $('button').on('click',display);
});
/*
やはり悪魔的コード過ぎて実行しないほうがいいわこれ
無限ループでページフリーズして動いたときには処理完了しちゃってるわ
*/
