(function() {

  var AppHeaderController = function(Session) {

    this.currentUser = Session.currentUser();
    this.loggedIn = false;

    Session.registerForUserUpdate(function() {
      this.loggedIn = Session.isLoggedIn();
    }.bind(this));

    Session.getSession();

  };

  AppHeaderController.$inject = ['Session'];

  angular
    .module('appHeader')
    .controller('AppHeaderController', ['Session', AppHeaderController]);

}());

