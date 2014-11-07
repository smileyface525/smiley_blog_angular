(function() {

  var appHeader = function() {
    return {
      restrict: 'E',
      templateUrl: 'app-header.html'
    };
  };

  angular
    .module('appHeader')
    .directive('appHeader', appHeader);

}());

