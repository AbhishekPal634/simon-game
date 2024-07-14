var gameStarted = false;

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
    $("body").removeClass("game-over");
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
    }
    else {
        if (gameStarted) {
            $("body").addClass("game-over");
            var gameOverAudio = new Audio("./sounds/wrong.mp3");
            gameOverAudio.play();
            setTimeout(function () {
                startOver();
                $("#level-title").text("Game Over! Press Any Key to Restart");
            }, 200);
        }
    }
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    level++;
    gamePattern.push(randomChosenColor);
    $("#level-title").text("Level " + level);
    for (var i = 0; i < gamePattern.length; i++) {
        (function (i) {
            setTimeout(function () {
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
            }, 500 * i);
        })(i);
    }
}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    var currentSequenceIndex = userClickedPattern.length - 1
    checkAnswer(currentSequenceIndex);
    playSound(userChosenColor);
});

$(document).on("keydown", function (event) {
    if (!gameStarted) {
        gameStarted = true;
        setTimeout(function () {
            nextSequence();
        }, 500);
    }
});

