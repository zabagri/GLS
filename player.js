function getAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

var GLSData;
getAsync("https://cors-anywhere.herokuapp.com/https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867",
(data) => {
GLSData = data;
GLSData = GLSData.substring(GLSData.indexOf("(") + 1);
GLSData = GLSData.substring(0, GLSData.length - 1);
GLSData = JSON.parse(GLSData).data;
});
