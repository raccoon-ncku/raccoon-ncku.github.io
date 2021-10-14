function loadRemoteMDtoHtml(_url) {
    var demo = function(converter) {
        return [
            {
                type    : 'output',
                regex   : '<img src=(.*)\/>',
                replace : '<img class="img-fluid d-block mx-auto" src=$1>'
            }
        ];
    }

    var converter = new showdown.Converter({extensions: [demo]}),
        text = $.ajax({
            url: _url,
            async: false
        }).responseText
    converter.setOption('tables', true);
    converter.setOption('parseImgDimensions', true)
    let html = converter.makeHtml(text);
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
