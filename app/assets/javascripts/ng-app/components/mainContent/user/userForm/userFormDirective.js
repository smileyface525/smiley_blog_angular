(function(){

  var userForm = function() {
    return {
      restrict: 'E',
      templateUrl: 'user-form.html'
    };
  };

  angular
    .module('userForm')
    .directive('userForm', userForm);

}());