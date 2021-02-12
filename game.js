var randomNumber = null;
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//random next sequence
function nextSequence() {
  userClickedPattern = [];
  level++; //Increase the level each calling the method
  $("#level-title").text(`Level ${level}`); //Display the current level

  randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playAnimation(randomChosenColour);
  playAudio(randomChosenColour);
}


//user click button color
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  buttonPressAnimation(userChosenColour);
  playAudio(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})


//Start game
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})

//Check the answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length && gamePattern.every(function(e, i) {
        return e === userClickedPattern[i];
      })) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
  }
}

//General Function
function playAudio(nameFile) {
  var audio = new Audio(`sounds/${nameFile}.mp3`);
  audio.play();
}

function playAnimation(id) {
  $(`#${id}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function buttonPressAnimation(currentKey) {
  var currentButton = $(`#${currentKey}`);
  currentButton.addClass("pressed");
  setTimeout(function() {
    currentButton.removeClass("pressed")
  }, 100);
}

function wrongAnswer() {
  var body = $("body");
  playAudio("wrong");
  body.addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function() {
    body.removeClass("game-over")
    resetGame();
  }, 200);
}

function resetGame() {
  gamePattern = [];
  //userClickedPattern = [];
  started = false;
  level = 0;
}