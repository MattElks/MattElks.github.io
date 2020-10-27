function showCurrentTime() {

    // display the string on the webpage
    var clock = document.getElementById("clock");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridian = "AM";

    // set hours
    if (hours >= 12) {
        meridian = "PM";
    }
    // set minutes
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // set seconds
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // string that displays the time 
    var clockTime = hours + ":" + minutes + ":" + seconds + meridian;
    clock.innerText = clockTime;

    // update clock
    setTimeout(showCurrentTime, 1000)
    

};

showCurrentTime();