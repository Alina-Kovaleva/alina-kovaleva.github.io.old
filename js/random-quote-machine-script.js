

//function newQuote(){
//  $.getJSON( "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=xml&lang=en", function( data ) {
//    var text = data.quoteText;
//    var author = data.quoteAuthor;
//    if (author === '') {
//      author = 'Author unknown';
//    }
//    $(".quote").hide().html('<p class="content"><em>"' + text +'"</em></p>' + ' <br><p class="author"> ' + author + ' </p> ').fadeIn('slow');
//    $('.tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + text + '"' + ' - ' + author);
//  });
//}
//$(document).ready(function(){
//    getQuote();
//    $(".new-quote").on("click", getQuote());
//});




// $(document).ready(function(){
//     var getQuote = function(){
//         return $.ajax({
//             url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
//             headers: {
//               "X-Mashape-Key": "frU2BZvBvXmshf9FIhGdY8SGKNjDp1MecBEjsn7XVOAR8Knobr"  
//             },
//             method: "POST",
//             contentType: "application/x-www-form-urlencoded",
//             dataType: 'json',
//         })
//     };
    
//     var setQuote = function(data){
//         $(".quote").hide().html('<p class="content"><em>"' + data.quote +'"</em></p>' + ' <br><p class="author"> ' + data.author + ' </p> ').fadeIn('slow');
//         $('.tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + data.quote + '"' + ' - ' + data.author);        
//     };
    
//     	$('.new-quote').on('click', function() {
// 		  var reloadBtn = $(this);
// 		  getQuote().done(function(data) {
//               setQuote(data);
// 		});
// 	}); 
// })

function newQuote(){
  $.getJSON( "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function( data ) {
    var text = data.quoteText;
    var author = data.quoteAuthor;
    if (author === '') {
      author = 'Автор неизвестен';
    }
    $(".quote").hide().html('<p class="content"><em>"' + text +'"</em></p>' + ' <br><p class="author"> ' + author + ' </p> ').fadeIn('slow');
    $('.tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + text + '"' + ' - ' + author);
  });
}
$(document).ready(function(){
  newQuote();
  $(".new-quote").on("click", newQuote);
});
