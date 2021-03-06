// Global Varibles
// ============================================================================================================

var audioWin = new Audio("assets/sound/Money-song.mp3");
var audioLose = new Audio("assets/sound/Game-over.mp3");
var audioClick = new Audio("assets/sound/register-cha-ching.mp3");

var winCount = 0;
var lossCount = 0;

var portfolioCounter = 0;
var counter = 0;
var targetNumber = 0;

$(document).ready(function () {

  function startGame() {
    // The random number shown at the start of the game should be between 19 - 120.
    var randomTargetNumber = ((Math.floor(Math.random() * 102)) + 19);
    targetNumber = randomTargetNumber;

    $("#portfolio-value").text(portfolioCounter);

    $("#number-to-guess").text(targetNumber);
    console.log("Value to match: " + targetNumber);

    // Reset variables to start
    portfolioCounter = 0;
    $("#portfolio-value").text(portfolioCounter);
    stockValue = "";
    $("#last-stock-value").text("Last clicked stock value: " + stockValue);
  }

  function setStockValue() {

    // reset imageStock and empty display of any previous images and its value
    imageStock = "";
    $("#logorow").empty();

    // Now for the hard part. Creating multiple crystals each with their own unique number value.

    // We begin by expanding our array to include four/five options.
    var numberOptions = [];

    // We begin by expanding our array to include four/five options, random hidden value between 1 - 12.
    for (var i = 0; i < 5; i++) {
      var randomNumberOption = ((Math.floor(Math.random() * 12)) + 1);
      numberOptions.push(randomNumberOption);
    }

    for (var i = 0; i < 5; i++) {

      // For each iteration, we will create an imageStock
      var imageStock = $("<img>");

      // First each stock will be given the class ".stock-image".
      // This will allow the CSS to take effect.
      imageStock.addClass("stock-image");

      // Each imageStock will be given a src link to the stock image
      var logoArray = ["facebook", "apple", "amazon", "netflix", "google"];
      imageStock.attr("src", "assets/images/logos/" + logoArray[i] + ".png");
      console.log(logoArray[i]);

      // Each imageStock will be given a data attribute called data-stockValue.
      // This data attribute will be set equal to the array value.
      imageStock.attr("data-stockvalue", numberOptions[i]);
      console.log("random stock values: " + numberOptions);

      // Lastly, each stock image (with all it classes and attributes) will get added to the page.
      $("#logorow").append(imageStock);
    }
  

  // Functions
  // ============================================================================================================

  // This time, our click event applies to every single stock on the page. Not just one.
  $(".stock-image").on("click", function () {
    audioClick.play();
    // Determining the stock's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the stock value of the clicked stock.
    // Using the .attr("data-stockvalue") allows us to grab the value out of the "data-stockvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var stockValue = ($(this).attr("data-stockvalue"));
    // alert(stockValue);

    stockValue = parseInt(stockValue);
    // alert(stockValue);
    $("#last-stock-value").text("Last clicked stock value: " + stockValue);

    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    portfolioCounter += stockValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    // alert("New score: " + portfolioCounter);
    // $("#breakdown-values").text("Breakdown of portfolio values (click to show): " + portfolioCounter);
    $("#portfolio-value").text(portfolioCounter);

    if (portfolioCounter === targetNumber) {
      winCount++;
      $("#win-counter").text("Wins: " + winCount);
      audioWin.play();
      alert("You win! Your portfolio value matches the target value! Play another round!");
      startGame();
      setStockValue();
    }

    else if (portfolioCounter >= targetNumber) {
      lossCount++;
      $("#loss-counter").text("Losses: " + lossCount);
      audioLose.play();
      alert("You lose! Your portfolio value of $" + portfolioCounter + " million does not match the target value of $" + targetNumber + " million! Try again!");
      startGame();
      setStockValue();
    }

    // $("#last-stock-value").click(function(){
    //   $("#last-stock-value").hide();
    // }

  });
}


  // Main Process
  // ============================================================================================================

  startGame();
  setStockValue();

});