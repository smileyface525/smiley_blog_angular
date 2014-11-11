(function(){

  var user = function() {
    return {
      restrict: 'E',
      templateUrl: 'user.html'
    };
  };

  angular
    .module('user')
    .directive('user', user);

}());