(function() {

  var userNavbar = function() {
    return {
      restrict: 'E',
      templateUrl: 'user-navbar.html'
    };
  };

  angular
    .module('userNavbar')
    .directive('userNavbar', userNavbar);

}());