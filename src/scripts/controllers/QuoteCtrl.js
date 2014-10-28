var data = require('../quoteData');

module.exports = function($scope, $timeout) {
  var quotes = $scope.quotes = data;

  $scope.quoteSet = false;
  $scope.activeQuote = quotes[Math.floor(Math.random()*quotes.length)];
  activateQuote();

  $scope.setActiveQuote = function(quote) {
    $scope.quoteSet = false;
    $scope.activeQuote = quote;
    activateQuote();
  }


  function activateQuote() {
    $timeout(function() {
      $scope.quoteSet = true;
    }, 200);
  }
};