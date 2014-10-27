(function() {

  var app = angular.module('smileyblog', []);

  app.controller('BlogController', ['$http', function($http) {
      this.blogs = [];

      $http.get('/blogs').success(function(blogs) {
        this.blogs = blogs;
      }.bind(this));

    } ]);

}())