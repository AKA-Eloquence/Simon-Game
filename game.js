'use strict';
// I really wanted to use the let and const keywords, but I need to finish this challenge and don't have time for the docs.

// Button Colors
var buttonColors = ['red', 'blue', 'green', 'yellow'];
//  nextSequence Game Pattern
var gamePattern = [];
// user Pattern
var userClickedPattern = [];
// Starting Game
var start = false;
// game Level
var level = 0;

// Starting Game on a Keypress for The First Time
$('body').keypress(function () {
  if (!start) {
    // Calling Sequence
    nextSequence();

    start = true;
  }
});

// detect when any of the buttons are clicked
$('.btn').click(function () {
  // User Chosen Color
  var userChosenColor = this.id;

  // Addinf User Chosen Color to User Clicked Pattern
  userClickedPattern.push(userChosenColor);

  // Calling Sound Function User Chosen Color
  playSound(userChosenColor);

  // Calling Animate Function On User Click
  animatePress(userChosenColor);

  // Calling checkAnswer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Checking Answer With Check Answer f
function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('Success');

    // checking if they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // Calling nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('Wrong');
    playSound('wrong');
    // Applying game-over Class to Body
    $('body').addClass('game-over');
    // removing gameover Class with setTimeout() Method
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    //Change the h1 title to say "Game Over,"
    $('#level-title').text('Game Over, Press Any Key to Restart');
    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

// Next Sequence
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // Increasing The Level By One
  level++;
  // Changing H1 to Level
  $('#level-title').text('Level ' + level);

  // Generating a Random Number
  var randomNumber = Math.floor(Math.random() * 4);
  // Random Color
  var randomChosenColor = buttonColors[randomNumber];
  // Adding Random Color to Game Pattern
  gamePattern.push(randomChosenColor);

  // Applying FadeIn Effect on RandomChosenColor
  $('.' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Calling Sound Function on Game Sequence
  playSound(randomChosenColor);
}
// End of Next Sequence

// Addiing Sound Function
function playSound(name) {
  let mySound = new Audio('sounds/' + name + '.mp3');
  mySound.play();
}

// Adding Animation on User Clicked Button
function animatePress(currentColor) {
  // Adding Animation
  $('#' + currentColor).addClass('pressed');
  // Removing Animation after a Second
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

// restart the Game
function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
