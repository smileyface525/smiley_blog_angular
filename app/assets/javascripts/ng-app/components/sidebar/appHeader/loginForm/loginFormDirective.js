(function() {

  var loginForm = function() {
    return {
      restrict: 'E',
      templateUrl: 'login-form.html'
    };
  };

  angular
    .module('loginForm')
    .directive('loginForm', loginForm);

}());