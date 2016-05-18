var timer;
var isRunning = false;
var breakLength = 5 * 60, sessionLength = 25 * 60;
var sessCurrent = "session", currentLength = sessionLength;
var bell = new Audio('http://res.cloudinary.com/crazylittled/video/upload/v1462446785/250629_kwahmah-02_alarm1_mp3cut.ru_oqancy.mp3');
function formatNumber(num) {
  return (num < 10) ? "0" + num : num;
}
function secondsTime(num) {
  num = parseInt(num)
  var hrs = Math.floor(num / 3600);
  var mins = Math.floor(num % 3600 / 60);
  var secs = Math.floor(num % 3600 % 60);
  hrs = (hrs > 0) ? formatNumber(hrs) + ":" : "";
  mins = (mins > 0) ? formatNumber(mins) + ":" : "00:";
  secs = formatNumber(secs);
  return hrs + mins + secs;
}
function converToSeconds(time) {
  time = time.split(":");
  var counter = 0, numSecs = 0;
  while (time.length !== 0)
  {
    numSecs += parseInt(time.pop()) * Math.pow(60, counter);
    counter++;
  } 
  return numSecs;
}
function moveBakGrnd(time) {
  var current = converToSeconds(time);
  var percentage = 100 - Math.floor(current / currentLength * 100);
}
function clock() {
  var secs = converToSeconds($('#timeSession').text());
  secs--;
  if (secs >= 0)
  {
    var str = secondsTime(secs);
    $('#timeSession').text(str);
    moveBakGrnd(str);    
  }
  else
  {
    if (sessCurrent === "session")
    {
      sessCurrent = "break";
      currentLength = breakLength;
      $('#session').text("Break!");
      bell.play();
    }
    else
    {
      sessCurrent = "session";
      currentLength = sessionLength;
      $('#session').text("Session");
      bell.play();

    }
    $('#timeSession').text(secondsTime(currentLength));
    moveBakGrnd(secondsTime(currentLength));
  }
}
function startTime() {
  timer = setInterval(clock, 1000);
}
function stopTime() {
  clearInterval(timer);
}
function reset() {
  if (isRunning)
  {
    stopTime();
    isRunning = false;
  }
  sessCurrent = "session";
  currentLength = sessionLength;
  $('#session').text("Session");
  $('#timeSession').text(secondsTime(currentLength));
}
function toglTime() {
  if (isRunning)
  {
    stopTime();
    isRunning = false;
  }
  else
  {
    startTime();
    isRunning = true;
  }
}
$(document).ready(function() {
  $(".minus-break-btn").click(function() {
    if (!isRunning)
    {
      var num = parseInt($('#break-length').text());
      num = (num > 0) ? num - 1 : num;
      $("#break-length").text(num);
      breakLength = num * 60;
      if (sessCurrent === "break") {reset();}
    }
  });
  $(".plus-break-btn").click(function() {
    if (!isRunning)
    {
      var num = parseInt($('#break-length').text());
      num++;
      $("#break-length").text(num);
      breakLength = num * 60;
      if (sessCurrent === "break") {reset();}
    }
  });
  $(".minus-session-btn").click(function() {
    if(!isRunning)
    {
      var num = parseInt($('#session-length').text());
      num = (num > 1) ? num - 1 : num;
      $("#session-length").text(num);
      sessionLength = num * 60;
      if (sessCurrent === "session") {reset();}
    }
  });
  $(".plus-session-btn").click(function() {
    if(!isRunning)
    {
      var num = parseInt($('#session-length').text());
      num++;
      $("#session-length").text(num);
      sessionLength = num * 60;
      if (sessCurrent === "session") {reset();}
    }
  });
});