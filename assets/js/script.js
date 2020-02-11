var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("cardback") === -1) {
    return;
    // Exits function (via return) if -1 index (i.e. not 'cardback'). "Preventing functions from running is this way to prevent undesired effects is common in programming"
  }
  var clickedElement = event.target;
  clickedElement.className = clickedElement.className + " " + "hidden";
  // clickedElement.classList.add("hidden") *not supported in IE9

  if (!firstCardClicked) {
    firstCardClicked = clickedElement;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = clickedElement;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    // remove listening for click-events after the 2nd card clicked
    gameCards.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      console.log("The images match");
      gameCards.addEventListener("click", handleClick);
      // start a new round by resetting values to falsy
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      console.log("The images do not match");
      function flipToCardback() {
        firstCardClicked.classList.remove("hidden");
        // alternative: firstCardClicked.classList.toggle("hidden");
        secondCardClicked.classList.remove("hidden");
        // start new round
        gameCards.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }
      setTimeout(flipToCardback, 1500);
    }
  }
}
