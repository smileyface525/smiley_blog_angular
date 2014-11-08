(function() {

  var BlogListController = function(Session, Blogs, Forms, $scope) {

    this.blogs = {};
    this.editMode = false;
    this.newBlogDisplayed = false;
    this.beingEdited = {};


    Blogs.registerForBlogListUpdate(function() {
      if(this.beingEdited) {this.beingEdited.currentlyEditing = false}
      this.blogs = Blogs.blogs();
    }.bind(this));

    Blogs.getAll('All');

    this.destroy = function(blog) {
      Blogs.destroy(blog);
    };

    this.toggleComments = function(blog) {
      blog.commentsDisplayed = blog.commentsDisplayed ? false : true;
    };

    this.isAdmin = function() {
      return Session.isAdmin();
    };

    this.generalUser = function() {
      return Session.isGeneral();
    };


    this.showNewBlog = function(BFCtrl) {
      BFCtrl.cancelForm();
      this.newBlogDisplayed = true;
    };

    this.hideNewBlog = function() {
      this.newBlogDisplayed = false;
    };

    this.turnOnEditMode = function(blog, $scope) {
      this.beingEdited = blog;
      blog.currentlyEditing = true;
      $scope.$broadcast('blogEdit', this.beingEdited);
    };

    this.copyBlog = function(blog) {
      return { blog: {title: blog.blog.title,
        content: blog.blog.content},
        tags: blog.tags
      }
    };

  };

  BlogListController.$inject = ['Session', 'Blogs', 'Forms', '$scope'];

  angular
    .module('blogList')
    .controller('BlogListController', BlogListController);

}());




