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

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = GLSData.css;
document.getElementsByTagName("head")[0].appendChild(style);

var tiplates = GLSData.tiplates;
var steps = GLSData.structure.steps;
for(var i = 0; i< steps.length - 2; i++) {
    var sttip = document.createElement("div");
    sttip.classList.add("sttip");
    var tiplate = tiplates[steps[i].action.type];
    tiplate = [tiplate.slice(0, tiplate.lastIndexOf("Step ")), steps[i].action.stepOrdinal, tiplate.slice(tiplate.lastIndexOf("Step "))].join('');
    var content = steps[i].action.contents["#content"];
    var contentClasses = steps[i].action.classes.split(" ");
    var tooltip = document.createElement('div');
    tooltip.innerHTML = tiplate;
    tooltip.classList.add("tooltip");
    tooltip.getElementsByClassName("popover-title")[0].classList.add("tooltip-container");
    var contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    tooltip.getElementsByClassName("popover-content")[0].children[0].appendChild(contentDiv);
        for(var j = 0; j < contentClasses; j++) {
            tooltip.classList.add(contentClasses[i]);
        }
    sttip.appendChild(tooltip);
    if(steps[i].action.selector.includes("contains")) {
        console.log(steps[i].action.selector.split(":")[0]);
        document.getElementsByClassName(steps[i].action.selector.split(":")[0].substr(1))[1].parentElement.appendChild(sttip);
    }
    else
        document.querySelector(steps[i].action.selector).parentElement.appendChild(sttip);
    

}
