(function() {

  var UserNavbarController = function(Session) {

    this.username = Session.currentUser().username;
    this.optionsDisplayed = false;

    Session.registerForUserUpdate(function() {
      this.username = Session.currentUser().username;
    }.bind(this));

    this.showOptions = function() {
      this.optionsDisplayed = true;
    };

    this.hideOptions = function() {
      this.optionsDisplayed = false;
    };

    this.showUserPage = function($scope) {
      $scope.$root.$broadcast('showUserPage');
    };

    this.logout = function() {
      Session.destroy()
             .then(function() {
                this.optionsDisplayed = false;
             }.bind(this));
    };

  };

  UserNavbarController.$inject = ['Session'];

  angular
    .module('userNavbar')
    .controller('UserNavbarController', UserNavbarController);

}());