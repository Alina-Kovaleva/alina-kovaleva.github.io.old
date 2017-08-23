var on = false;
var strict = false;
var gameStarted = false;
var mistake = false;
var computerSequence = [];
var round = 1;
var playerChoise;
var computerTurn = false;
var color = '';
var seqIndex = 0;
var redSound = new Audio('http://res.cloudinary.com/crazylittled/video/upload/v1467027777/1396_u2urb7.mp3');
var blueSound = new Audio('http://res.cloudinary.com/crazylittled/video/upload/v1467027777/1397_bgt11v.mp3');
var yellowSound = new Audio('http://res.cloudinary.com/crazylittled/video/upload/v1467027777/1406_d7ubjf.mp3');
var greenSound = new Audio('http://res.cloudinary.com/crazylittled/video/upload/v1467027777/1416_sdzqkc.mp3');
var sound = {red: redSound, blue: blueSound, yellow: yellowSound, green: greenSound};
var idColorMap = {1: 'red', 2: 'blue', 3: 'yellow', 4: 'green'};

function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function addNewCell() {
    var randomInteger = getRandomInteger(1, 4);
    computerSequence.push(idColorMap[randomInteger]);
    $('.counter').html(computerSequence.length);
}

function makeComputerTurn() {
    if (!mistake) {
        addNewCell();
    }
    console.log(computerSequence);
    for (var i = 0; i < computerSequence.length; i++) {
        var playSound = function(sound) {
            sound.play();
        }
        var tempElement = $('#' + computerSequence[i]);
        setTimeout(playSound.bind(null, sound[computerSequence[i]]), i * 1000);
        setTimeout(addClass.bind(null, tempElement), i * 1000);
        setTimeout(delClass.bind(null, tempElement), i * 1000 + 150);
    }
    setTimeout(computerTurnEnd, computerSequence.length * 1000);
}

var addClass = function(e){
    e.addClass('cell-blink');
}

var delClass = function(e){
    e.removeClass('cell-blink');
}

function computerTurnEnd(){
    computerTurn = false;
    mistake = false;
}

$('.cell').on('click', function(){
    if(!computerTurn){
        playerChoise = $(this).attr('id');
        var aud = sound[playerChoise];
        console.log(aud);
        aud.play();
        $(this).addClass('cell-blink');
        console.log($(this));
        setTimeout(delClass.bind(null, $(this)), 150)
        
        if(playerChoise !== computerSequence[seqIndex]){
            if(strict){
                computerSequence = [];
            } else {
                mistake = true;
            }
            seqIndex = 0;
            computerTurn = true;
            console.log('1');
            setTimeout(makeComputerTurn, 1000);
        } else {
            seqIndex++;
            if (seqIndex === computerSequence.length) {
                seqIndex = 0;
                computerTurn = true;
                console.log('2');
                setTimeout(makeComputerTurn, 1000);
            }
        }
    }
})

function reset(){
    computerSequence = [];
}

$(document).ready(function(){
    $('.onoffswitch-checkbox').on('click', function(){
        on = document.getElementById('myonoffswitch').checked;
        computerSequence = [];
        mistake = false;
        gameStarted = false;
        $('.counter').html('--');
    })
    $('.normalstrictswitch-checkbox').on('click', function(){
        strict = document.getElementById('mynormalstrictswitch').checked;
    })
    $('#start').on('click', function(){
        reset();
        if (on) {
            if (strict) {
                computerSequence = [];
                seqIndex = 0;
                console.log('--');
            }
            gameStarted = true;
            computerTurn = true;
            console.log('3');
            makeComputerTurn();
        }
        
    });
});