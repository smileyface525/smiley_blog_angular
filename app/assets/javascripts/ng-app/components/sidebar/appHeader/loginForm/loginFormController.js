(function() {

  var LoginFormController = function(Session) {
    this.error = {};
    this.loginForm = {};
    this.formInputs = {};

    this.login = function(loginForm, AHCtrl) {
      this.loginForm = loginForm;
      Session.create(this.formInputs, AHCtrl)
             .then(function(user) {
                AHCtrl.currentUser = Session.currentUser();
                AHCtrl.loggedIn = true;
                this.formInputs = {};
                this.error = null;
                this.loginForm.$setPristine();
             }.bind(this), function(error) {
                this.error = error;
             }.bind(this));
    };

  };

  LoginFormController.$inject = ['Session'];

  angular
    .module('loginForm')
    .controller('LoginFormController', LoginFormController)

}());