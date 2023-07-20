
var buttonColors = ["red", "blue","green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level = 0;
var userLevel = 0;

// Keypress is to start the game
//
$(document).on("keypress", function(){
    if(!gameStarted){
        nextSequence();
        gameStarted=true;
    }
});


//
// Event listener for click on buttons
//
$(".btn").click(function() {
    userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userLevel);

});

//
// Check if most recent user click is correct,
// also check if user has finished the pattern 
//
function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        userLevel+=1; // user got current level right
        // Now check if user has matched entire game pattern...
        if(currentLevel == (gamePattern.length-1)){
            setTimeout(nextSequence, 1000);
            userPattern=[];
            userLevel=0;
        }
        return true;
    }
    else {
        gameOver();
        return false;
    }
}

//
// Adds a color to game sequence, plays sound and updates level
//
function nextSequence() {
    // return random number between 0 and 3 (inclusive)
    randomNumber =  Math.floor(Math.random()*4);
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    playSound(randomColor);
    animatePress(randomColor);
    level+=1;
    $("h1").text("Level "+level.toString());
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress(name) {
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed")
    }, 100);
}


//
// Function to display message, play sound, and animate background
// when user makes a mistake and ends game.
//
function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    resetGameState();

}

// Reset key game variables so that new game starts fresh...
//
function resetGameState(){
    gamePattern=[];
    userPattern=[];
    gameStarted=false;
    level=0;
    userLevel=0;
}