var data = require('../quoteData');

module.exports = function($scope) {
  var quotes = $scope.quotes = data;

  $scope.activeQuote = quotes[0];

  $scope.setActiveQuote = function(quote) {
    $scope.activeQuote = quote;
  }
};