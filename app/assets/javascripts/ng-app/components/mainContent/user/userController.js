(function() {

  var UserController = function(Session) {

    this.user = {email: Session.currentUser().email,
                 username: Session.currentUser().username};
    this.pageType = Session.isLoggedIn() ? 'update' : 'new';

    Session.registerForUserUpdate(function() {
      this.user = {email: Session.currentUser().email,
                   username: Session.currentUser().username};
      this.pageType = Session.isLoggedIn() ? 'update' : 'new';
    }.bind(this));

    this.pageTitle = function() {
      return this.pageType === 'new' ? 'Create Your Account' : 'Account Information';
    };

    this.pageTypeIs = function(type) {
      return this.pageType === type;
    };

  };

  UserController.$inject = ['Session'];

  angular
    .module('user')
    .controller('UserController', UserController);

}());