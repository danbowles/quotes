module.exports = function($scope) {
  $scope.navActive = false;

  $scope.toggleNavActive = function() {
    if ($scope.navActive) {
      $scope.navActive = false;
      return;
    }

    $scope.navActive = true;
  }
};