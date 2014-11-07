(function() {

  var UserNavbarController = function(Session) {

    this.optionsDisplayed = false;

    this.showOptions = function() {
      this.optionsDisplayed = true;
    };

    this.hideOptions = function() {
      this.optionsDisplayed = false;
    };

    this.logout = function(AHCtrl) {
      Session.destroy()
             .then(function() {
                AHCtrl.loggedIn = false;
                this.optionsDisplayed = false;
             }.bind(this));
    };

  };

  UserNavbarController.$inject = ['Session'];

  angular
    .module('userNavbar')
    .controller('UserNavbarController', UserNavbarController);

}());