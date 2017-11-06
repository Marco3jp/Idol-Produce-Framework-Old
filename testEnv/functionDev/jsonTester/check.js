$(function() {
    var reader;
    var produceHistory;

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
