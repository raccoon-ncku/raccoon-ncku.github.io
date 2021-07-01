function loadRemoteMDtoHtml(_url) {
    var converter = new showdown.Converter(),
        text = $.ajax({
            url: _url,
            async: false
        }).responseText,
        html = converter.makeHtml(text);
    document.write(html);
}

function loadLocalMDtoHtml(path) {
    var converter = new showdown.Converter(),
        text = loadFile(path),
        html = converter.makeHtml(text);
    document.write(html);
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}
