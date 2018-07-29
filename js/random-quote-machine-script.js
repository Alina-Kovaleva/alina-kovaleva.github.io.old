function newQuote(){
  $.getJSON( "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function( data ) {
    var text = data.quoteText;
    var author = data.quoteAuthor;
    if (author === '') {
      author = 'Author unknown';
    }
    $(".quote").hide().html('<p class="content"><em>"' + text +'"</em></p>' + ' <br><p class="author"> ' + author + ' </p> ').fadeIn('slow');
    $('.tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + text + '"' + ' - ' + author);
  });
}
$(document).ready(function(){
  newQuote();
  $(".new-quote").on("click", newQuote);
});
