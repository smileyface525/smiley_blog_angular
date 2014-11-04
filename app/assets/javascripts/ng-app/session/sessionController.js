var session = angular.module('session', []);

session.controller('SessionController', ['Session', function(Session) {

    this.session = {};
    this.error = null;
    this.currentUser = {};
    this.optionsDisplayed = false;
    this.loginForm = {};

    Session.getSession()
           .then(function(user) {
              this.currentUser = user;
           }.bind(this));


    this.login = function(loginForm) {
      this.loginForm = loginForm;
      Session.create(this.session)
             .then(function(user) {
                this.currentUser = user;
                this.session = {};
                this.error = null;
                this.loginForm.$setPristine();
             }.bind(this), function(error) {
                this.error = error;
             }.bind(this));
    };

    this.logout = function() {
      Session.destroy()
             .then(function() {
                this.optionsDisplayed = false;
             }.bind(this));
    };

    this.loggedIn = function() {
      return Session.loggedIn();
    };

    this.showOptions = function() {
      this.optionsDisplayed = true;
    };

    this.hideOptions = function() {
      this.optionsDisplayed = false;
    };

  } ]);