(function() {

  var app = angular.module('smileyblog', []);

  app.controller('BlogController', ['$http', function($http) {
      this.blogs = [];

      $http.get('/blogs').success(function(blogs) {
        this.blogs = blogs;
      }.bind(this));

      this.toggleComments = function(blog) {
        blog.commentsDisplayed = blog.commentsDisplayed ? false : true;
      }

  } ]);

  app.controller('SessionController', ['$http', function($http) {
    this.session = {};
    this.currentUser = null;
    this.error = null;
    this.optionsDisplayed = false;

    this.isAdmin = function() {
      return this.currentUser.status === "admin" ? true : false
    };

    this.login = function() {
      $http.post('/sessions', {user: this.session}).
      success(function(user) {
        this.error = null;
        this.currentUser = user;
      }.bind(this)).
      error(function(error) {
        this.error = error;
      }.bind(this));
    };

    this.logout = function() {
      var url = '/sessions/' + this.currentUser.id;
      $http.delete(url).
      success(function() {
        this.clearSession();
      }.bind(this));
    };

    this.showCreateForm = function() {
      debugger
    };

    this.showOptions = function() {
      this.optionsDisplayed = true;
    };

    this.hideOptions = function() {
      this.optionsDisplayed = false;
    };

    this.clearSession = function() {
      this.session = {};
      this.optionDisplayed = false;
      this.currentUser = null;
    };

    $http.get('/sessions').
    success(function(user) {
      this.currentUser = user === "null" ? null : user;
    }.bind(this))

  } ]);

}())