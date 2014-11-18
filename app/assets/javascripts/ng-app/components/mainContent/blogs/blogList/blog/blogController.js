(function() {

  var BlogController = function(Session, $scope) {

    this.isAdmin = Session.isAdmin();
    this.commentsDisplayed = false;

    Session.registerForUserUpdate(function() {
      this.isAdmin = Session.isAdmin();
    }.bind(this));


    this.showBlogsFor = function(tag) {
      Blogs.getAll(tag);
    };

    this.toggleComments = function($scope) {
      if (this.commentsDisplayed) {
        this.commentsDisplayed = false;
      }
      else {
        $scope.$broadcast('toggleComments', $scope.blog.comments);
        this.commentsDisplayed = true;
      }
    };

    this.notifyBlogEdit = function($scope) {
      $scope.$broadcast('blogEdit', $scope.blog);
    };

    this.destroy = function(blog) {
      Blogs.destroy(blog);
    };

  };

  BlogController.$inject = ['Session', '$scope'];

  angular
    .module('blogList')
    .controller('BlogController', BlogController);

}());




