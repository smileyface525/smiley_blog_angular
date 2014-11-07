(function() {

  var AppHeaderController = function(Session) {

    this.currentUser = Session.currentUser();
    this.loggedIn = false;

    Session.getSession()
           .then(function() {
              this.currentUser = Session.currentUser();
              this.loggedIn = true;
           }.bind(this));
  };

  AppHeaderController.$inject = ['Session'];

  angular
    .module('appHeader')
    .controller('AppHeaderController', ['Session', AppHeaderController]);

}());

