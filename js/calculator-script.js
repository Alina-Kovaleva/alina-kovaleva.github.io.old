$(document).ready(function(){
  $(".btn-writer").on("click", function(event){
    var textboxVal = $('.textbox').val();
    textboxVal += event.target.value;
    $('.textbox').val(textboxVal);
  });
  $('#C').on('click', function(){
    $('.textbox').val('');
  });
  $('#backspace').on('click', function(){
    var texboxVal = $('.textbox').val();
    if (texboxVal !== '') {
      var temp = texboxVal.substring(0,texboxVal.length-1);
      $('.textbox').val(temp);
    }

  });
  $('#equal').on('click', function() {
    var textboxVal = $('.textbox').val();
    var temp = eval(textboxVal);
    $('.textbox').val(temp);

  });
});