
var counter = 0;
var timer = $("#time")
var stopped = true;
var mainButton = $("#button");
var list  = $("#list")

var initialized = false
function start(){
    if (!stopped) {
        return;
    }
    stopped = false;
    replaceStartStop();
    if (!initialized) {
        setInterval(() => {
            if (!stopped) {
                increaseTimer();
                showTime();
            }
         },1000)
        initialized = true;
    }
}

function increaseTimer(){
    counter++;
}

function reset(){
    counter=0;
    showTime();   
}

function showTime(){
    hours = parseInt(counter/3600);
    minutes = parseInt(counter/60) - 60*hours;
    seconds = counter - 3600*hours - 60*minutes;
    timer.text(("0"+hours).slice(-2)+":"+("0"+minutes).slice(-2)+":"+("0"+seconds).slice(-2));
}

function stop(){
    stopped = true; 
    replaceStartStop();
}

function replaceStartStop() {
    if (!stopped){
        mainButton.text("Stop");
        mainButton.attr("onclick","stop()")
    } else {
        mainButton.text("Start"); 
        mainButton.attr("onclick","start()")
    }
}

function lap(){
    list.append("<li>"+timer.text()+"</li>");
}

function clear()