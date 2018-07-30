$(document).ready(function() {

  var title = [],
      desc = [],
      link = [],
      val = $('#search-box'),
      url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';

  $('#search-box').focus();

  $('.search-btn').click(function() {
    $('.result').empty();
    $.getJSON(url + val.val() + '&callback=?').success(function(data) {

      //                        $('.json-res').text(JSON.stringify(data));
      for (i = 0; i < data[1].length; i++) {
        title = data[1][i];
        if (data[2][i] === '') {
          desc = "No description"
        } else {
          desc = data[2][i];
        }
        link = data[3][i];

        $('.result').append('<div class="results"><a href="' + link + '" target="_blank"><h3><br>' + title + '</h3><p>' + desc + '</p></a></div>');
      }
    });
  });

  $('#search-box').click(function() {
    $(this).val('');
  });

  $('#search-box').keydown(function(e) {
    if (e.which === 13) {
      $('.search-btn').click();
      $('#search-box').blur();
    }
  });
});
