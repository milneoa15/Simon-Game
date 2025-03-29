
var buttonColors = ["green", "red", "yellow", "blue"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

function mainGame() {
    var gamePattern = [];

    nextLevel(1, gamePattern);
}

function nextLevel (level, gamePattern) {
    var userClickedPattern = [];

    var newGamePattern = gamePattern.slice();
    newGamePattern.push(buttonColors[nextSequence()]);
    $("h1").html("Level "+ level);
    console.log("game:  " + newGamePattern);

    playSequence(newGamePattern);

    $(".square").on("click", function() {
        userClickedPattern.push(this.id);
        console.log("user:  " + userClickedPattern);
        playSoundAnimate(this.id);
        checkAnswer(newGamePattern, userClickedPattern, level);
    });
}

function checkAnswer(gamePattern, userClickedPattern, level) {
    var indexToCheck = userClickedPattern.length - 1;
    if (gamePattern[indexToCheck] == userClickedPattern[indexToCheck]) {
        if (gamePattern.length == userClickedPattern.length) {
            $(".square").off("click");
            setTimeout(function () {nextLevel(level+1, gamePattern)}, 1000);
        }
    } else {
        //alert("game over. you reached level " + level);
        $("h1").html("Game Over. You Reached Level " + level)
        $(".square").off("click");
    }
}

function playSequence(sequence) {
    if (sequence.length > 0) {
        $("#"+sequence[0]).fadeOut(100).fadeIn(100);
        var audio = new Audio ("sounds/"+sequence[0]+".mp3");
        audio.play();
        setTimeout(function () {playSequence(sequence.slice(1))}, 500);
    }
}

function playSoundAnimate(colorId) {
    $("#"+colorId).fadeOut(100).fadeIn(100);
    var audio = new Audio ("sounds/"+colorId+".mp3");
    audio.play();
}

$(document).on("click", function() {
    startGame();
});

function startGame() {
    $(document).off("click");
    setTimeout(function () {mainGame()}, 1000);
}