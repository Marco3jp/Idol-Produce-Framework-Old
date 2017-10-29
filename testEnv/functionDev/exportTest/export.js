$(function(){

  var reader;
  function onChange(event) {
    reader.readAsText(event.target.files[0]);
  }

  function onLoad(event) {
    test=JSON.parse(event.target.result);
    console.log(test);
    //↑using to debug//
    displayData();
  }

  function displayData(){
    $('#testFrame').html("");
    $('#testFrame').append(test.maker);
    $('#testFrame').append("<br>");
    $('#testFrame').append(test.idol.numberOfIdol);
    $('#testFrame').append("<br>");
    for (var i = 0; i < test.idol.names.length; i++) {
      $('#testFrame').append(test.idol.names[i]);
      $('#testFrame').append("<br>");
    }
  }

  function addIdol() {
    ++test.idol.numberOfIdol;
    test.idol.names[test.idol.names.length]="変身！Goto先輩！！";
    displayData();
  }

  function exportJson(){
    test=JSON.stringify(test);
    //console.log(test);
    var exportData= new Blob([test]);
    //console.log(exportData);
    window.URL = window.URL || window.webkitURL;
    $('#testFrame').append('<a id="download" target="_blank" download="testData.json">ダウンロード</a>');
    $("#download").attr("href", window.URL.createObjectURL(exportData));
  }
  /*
  download="XXX"については、おそらくプレイ回数とかを参照してN回目でも重複せず(保存データに(1)とかつかないように)出力する予定です。
  後一応データの紛失に備えてlocalStrageにも保存させます(隠し機能として実装)。
  */

  reader = new FileReader();
  reader.onload = onLoad;

  $('input[type="file"]').on('change', onChange);
  $('button[name=addIdol]').on('click', addIdol);
  $('button[name=export]').on('click', exportJson);

});
