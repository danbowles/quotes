var data = require('../quoteData');

module.exports = function($scope) {
  var quotes = $scope.quotes = data;

  $scope.activeQuote = quotes[Math.floor(Math.random()*quotes.length)];

  $scope.setActiveQuote = function(quote) {
    $scope.activeQuote = quote;
  }
};