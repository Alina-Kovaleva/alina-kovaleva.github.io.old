$(document).ready(function(){
    
    var user;
    var computer;
    var computerMove = false;
    var field = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    
    $('.choose').slideDown();
    $(".choose-btn").on("click", function() {
        $(".choose").slideUp();
        user = $(this).html();
        if (user == "X") {
            computer = "O";
        } else {
            computer = "X";
            computerMove = true;
            computerTurn();
        }
    });
    
     $(".cell-field").on("click", function() {

        var pick = $(this).html();
        getCurrent();
        

        if ($(".choose").is(":hidden") && pick !== "X" && pick !== "O" && computerMove === false && checkWin() === '') {

            $(this).html(user);
            computerMove = true;
            setTimeout(computerTurn, 200);
        }

    });
    
    function getCurrent(){
        for(var i = 0; i <= 2; i++) {
            for(var j = 0; j <= 2; j++) {
                field[i][j] = $('#f' + i + '-' + j).html();
            }
        }
    };
   
    function checkWin(){
        //Horizontal winning check
        for(var i = 0; i <= 2; i++){
           if(field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== ''){
               if(field[i][0] == user){
                   $('#message').html("You won!").show();
               } else if(field[i][0] == computer){
                    $('#message').html("Computer won!").show();
               }
               
               return field[i][0];
           }
       }
        //Vertical winning check
        for(var i = 0; i <= 2; i++){
            if(field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[0][i] !== ''){
                if(field[0][i] == user){
                   $('#message').html("You won!").show();
               } else if(field[0][i] == computer){
                    $('#message').html("Computer won!").show();
               }
                return field[0][i];
            }
        }
        //Diagonally winning check
        if((((field[0][0] === field[1][1]) && (field[1][1] === field[2][2])) || ((field[0][2] === field[1][1]) && (field[1][1] === field[2][0]))) && field[1][1] !== ''){
            if(field[1][1] == user){
                   $('#message').html("You won!").show();
               } else if(field[1][1] == computer){
                    $('#message').html("Computer won!").show();
               }
           return field[1][1];
        }
        return '';
        
        
    };
    
    function checkDraw(){
        getCurrent();
        for(var i = 0; i <= 2; i++){
            for(var j = 0; j <= 2; j++){
                if(field[i][j] === ''){
                    return false;
                }
            }
        }
        if(checkWin() === ''){
            $('#message').html("It's a draw!").show();
            return true;
        }
    }
    
    $('#reset-btn').on('click', function(){
        $('.cell-field').html('');
        getCurrent();
        $('.choose').slideDown();
        $('#message').hide();
        pick = '';
    });
    
    function chooseRandomCell(){
        getCurrent();
        var temp = [];
        for(var i = 0; i <= 2; i++){
            for(var j = 0; j <= 2; j++){
                if(field[i][j] === '') {
                    temp.push([i, j]);
                }
            }
        }
        return temp[Math.floor(Math.random() * temp.length)];
    };
    
    function computerTurn(){
        getCurrent();
        checkDraw();
        checkWin();
        var gameOver = checkWin();
        
        if (gameOver === '' && !checkDraw()) {
            var coordinates = chooseRandomCell();
            var id = '#f' + coordinates[0] + '-' + coordinates[1];
            $(id).html(computer);
            getCurrent();
            checkDraw();
        } 
        computerMove = false;
    };
});
       