(function() {

  var NewBlogController = function($scope) {

    this.blog = {blog: {}, tags: []};
    this.today = new Date();

  };

  NewBlogController.$inject = ['$scope'];

  angular
    .module('newBlog')
    .controller('NewBlogController', NewBlogController);

}());