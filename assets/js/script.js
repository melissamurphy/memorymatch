/* eslint-disable no-inner-declarations */
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick);

function calculateAccuracy (attempts, matches) {
  return `${Math.trunc((matches/attempts)*100)}%`;
}

function displayStats () {
  document.getElementById("gamesPlayed").textContent = gamesPlayed;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("accuracy").textContent = calculateAccuracy(attempts, matches);
}

function handleClick(event) {
  if (event.target.className.indexOf("cardback") === -1) {
    return;
  }
  var clickedElement = event.target;
  clickedElement.classList.add("hidden")

  if (!firstCardClicked) {
    firstCardClicked = clickedElement;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = clickedElement;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    attempts++;
    // remove listening for click-events after the 2nd card clicked [listening restored when resetting first/secondCardClicked]
    // gameCards.removeEventListener("click", handleClick);
    if (firstCardClasses === secondCardClasses) {
      matches++;
      if (matches === maxMatches) {
        document.getElementById("winModal").classList.remove("hidden");
      }
      // gameCards.addEventListener("click", handleClick);
      // start new round
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      gameCards.removeEventListener("click", handleClick);

      function flipToCardback() {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        // start new round
        gameCards.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }
      setTimeout(flipToCardback, 1500);
    }
    displayStats();

  }
}
