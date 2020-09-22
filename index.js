// the order of the buttons to press
var pressedButton = [];
var pressedKey = true;
var index = 0;
// dictionary for colors
var colors = {
  "green": 1,
  "red": 2,
  "yellow": 3,
  "blue": 4
};


// Listener for pressing a key adding animation and sound
$(document).keydown(function() {
  if (pressedKey) {
    pressedButton = [];
    index = 0;
    // change the heading
    changeHeading();
    randomButton();
    pressedKey = false;
  }
})

/* Listener for a click adding animation and sound */
 $(".simon-button").click(function() {
   if (!pressedKey) {
     var whichButton = $(this).attr("id");
     // there is button to click on
     if (index < pressedButton.length) {
       // the clicked one is the right one.
       if (pressedButton[index] == colors[whichButton]) {
         addAnimation(this, "pressed");
         addSound(whichButton);
         index++;
         setTimeout(function() {} ,400);
       } else {
         gameOver();
       }
     }
     // all the buttons were clicked, adding one more button
     if (index == pressedButton.length) {
       changeHeading();
       /* next button to click on */
       randomButton();
       index = 0;
     }
   } else {
     gameOver();
   }
 })

 // change the title to the right level
 function changeHeading() {
   $(".level-heading").text("Level " + (index + 1));
 }

 // create random button and add animation (1-4)
 function randomButton() {
   var rNumber = Math.floor(Math.random() * 4) + 1;
   var selectedButton = getButton(rNumber);
   pressedButton.push(rNumber);
   $(selectedButton).fadeToggle(200);
   $(selectedButton).fadeToggle(200);
 }

 // return a button based on a given number (1-4)
 function getButton(number) {
   var returnButton;
   switch (number) {
     case 1:
         returnButton = $("#green");
       break;
     case 2:
         returnButton = $("#red");
       break;
     case 3:
         returnButton = $("#yellow");
       break;
     case 4:
         returnButton = $("#blue");
       break;
     default:
       returnButton = $("#green");
   }
   return returnButton;
 }

// add animation for pressing a Buttons
function addAnimation(pressedButton, classToAdd) {
  $(pressedButton).addClass(classToAdd);
  setTimeout(function() {
    $(pressedButton).removeClass(classToAdd);
  }, 100);
}

// add sound to a button based on it's id
function addSound(addSoundTo) {
  switch (addSoundTo) {
    case "green":
        var green = new Audio("sounds/green.mp3");
        green.play();
      break;
    case "red":
        var red = new Audio("sounds/red.mp3");
        red.play();
      break;
    case "yellow":
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
      break;
    case "blue":
        var blue = new Audio("sounds/blue.mp3");
        blue.play();
      break;

    default:

  }
}

function gameOver() {
  $(".level-heading").text("Game Over, Press Any Key to Restart");
  addAnimation(this, "game-over");
  addAnimation($("body"), "game-over-body");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  pressedKey = true;
}
