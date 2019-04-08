
$(document).ready(function(){
  $.getJSON("https://ipinfo.io", function(ipAPI) {
    var city = ipAPI.city;
    var country = ipAPI.country;
    var cor = ipAPI.loc.split(',')
    var lat = cor[0];
    var lon = cor[1];
    var appid = '5ce5d089fc7200d0e199f246c845bbb7';
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" 
    + lat + "&lon=" + lon + "&units=metric" + "&APPID=" + appid;

    $.getJSON(weatherUrl, function(weather){
      $('#location').text(ipAPI.city + ', ' + ipAPI.country);
      $('#description').text(weather.weather[0].main);
      $('#wind').text(weather.wind.speed + 'm/s');
      $('#temp').text(Math.round(weather.main.temp * 10) / 10  + ' °C');

      $('#toggle').click(function() {
        $('#wind').toggleClass('fahrenheit');
        $('#temp').toggleClass('fahrenheit');
        if($('#temp').is(".fahrenheit")){
          $('#temp').text(CtoF(weather.main.temp) + ' °F') && $('#wind').text(MetersToMiles(weather.wind.speed) + 'MPH')
        }
        else {
          $('#temp').text(Math.round(weather.main.temp* 10) / 10 + ' °C') && $('#wind').text(weather.wind.speed + 'm/s');
        }

      });
    });

  }, 'json');
  function CtoF(celcius) {
    celcius = celcius * (9 / 5) + 32
    return Math.round(celcius * 10) / 10;
  }
  function MetersToMiles(meters){
    meters = meters * 2,23694
    return Math.round(meters);
  }
}); 
