(function() {

  var LoginFormController = function(Session, $scope) {

    this.error = {};
    this.formInputs = {};

    this.login = function($scope) {
      Session.create(this.formInputs)
             .then(function(user) {
                this.resetForm($scope.loginForm);
                this.error = {};
             }.bind(this), function(error) {
                this.error = error;
             }.bind(this));
    };

    this.showUserForm = function($scope) {
      this.resetForm($scope.loginForm);
      $scope.$root.$broadcast('showUserPage');
    };

    this.resetForm = function(form) {
      form.$rollbackViewValue();
      form.$setPristine();
      this.formInputs = {};
      this.error = {};
    };

  };

  LoginFormController.$inject = ['Session', '$scope'];

  angular
    .module('loginForm')
    .controller('LoginFormController', LoginFormController)

}());