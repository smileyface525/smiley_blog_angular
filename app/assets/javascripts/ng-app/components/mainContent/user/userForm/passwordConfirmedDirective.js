(function(){

  var passwordConfirmed = function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.passwordConfirmed = function(mValue, vValue) {
          if (ctrl.$isEmpty(mValue)) {
            return true;
          }
          if (vValue === this.userForm.password.$viewValue) {
            return true;
          }
          return false;
        }.bind(scope);
      }
    };
  }

  angular
    .module('userForm')
    .directive('passwordConfirmed', passwordConfirmed);

}());
