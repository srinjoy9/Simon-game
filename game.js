var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
    $("." + randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    $("h1").text("Level " + level);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(colour) {
    $("." + colour).addClass("pressed");
    setTimeout(function () { $("." + colour).removeClass("pressed") }, 100);
}


$("body").keypress(function () {
    if (level === 0) {
        nextSequence();
        level++;
        $("h1").text("Level " + level);
    }
})



$(".btn").click(function () {
    if (level>0){
    userColour = $(this).attr('id');
    animatePress(userColour);
    playSound(userColour);
    action2(userColour);
}})


function action2(colour) {
    userClickedPattern.push(colour);
    for(var i=0;i<userClickedPattern.length;i++){
        if (gamePattern[i]!=userClickedPattern[i]){
            check();
        }
    }
    if (userClickedPattern.length === gamePattern.length) {
        check();
        userClickedPattern = [];
    }
}


function check() {
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        level++;
        setTimeout(nextSequence, 1000);
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 100);
        level=0;
        gamePattern=[];
        $("h1").text("Game Over, Press Any Key to Restart ");
    }
}


