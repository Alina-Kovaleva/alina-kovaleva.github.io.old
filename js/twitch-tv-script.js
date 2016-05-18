var streamers = ["freecodecamp", "kravinoi", "kafugaming", "passatigy", "alina_owl", "like_player", "manyrin", "rikhh", "shamovd", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

var noImg = 'http://res.cloudinary.com/crazylittled/image/upload/v1458133730/no-user-image_dph8go.gif';

streamers.forEach(function(streamer) {

  $.getJSON("https://api.twitch.tv/kraken/users/" + streamer + "?api-version=3&callback=?",function(result) {
    $('.streamers').append('<li id="' + streamer + '">');
    $('li:last').append('<img src="' + (result.logo === null ? noImg : result.logo) + '">' + '<span class="name">' + result.display_name);

    $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?api-version=3&callback=?", function(result) {
      if (result.stream === null) {
        $('#' + streamer).append('<p><i class="fa fa-times-circle"></i> Offline</p>').addClass('offline');
      } else {
        $('#' + streamer).append('<p><i class="fa fa-twitch"></i> ' + result.stream.channel.status + '</p>').addClass('online');
      }
      $('#' + streamer).wrapInner('<a href="http://www.twitch.tv/' + streamer + '/" target="_blank">');
    });

    if ($('.streamers li').length === streamers.length) {
      setEventHandlers();
    }
  });
});

function setEventHandlers() {
  $('li:contains(All)').click(function() {
    $('li').removeClass('hidden selected');
    $(this).addClass('selected');
  });

  $('li:contains(Offline)').click(function() {
    $('li').removeClass('selected');
    $('li').filter('.online').addClass('hidden');
    $(this).addClass('selected');
    $('li').filter('.offline').removeClass('hidden');
  });

  $('li:contains(Online)').click(function() {
    $('li').removeClass('selected');
    $('li').filter('.online').removeClass('hidden');
    $(this).addClass('selected');
    $('li').filter('.offline').addClass('hidden');
  });

  $('input').keyup(search);
}