(function() {

  var BlogListController = function(Session, Blogs, Forms, $scope) {

    this.blogs = {};
    this.newBlogDisplayed = false;
    this.currentlyEditting = {};

    Blogs.registerForBlogListUpdate(function() {
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

    this.turnOnEditMode = function(blog, BFCtrl) {
      BFCtrl.cancelForm();
      this.turnOffEditMode(this.currentlyEditting);
      BFCtrl.originalBlog = this.copyBlog(blog);
      this.currentlyEditting = blog;
      blog.editMode = true;
      BFCtrl.blogInputs = blog;
    };

    this.turnOffEditMode = function() {
      this.currentlyEditting.editMode = false;
      this.currentlyEditting = {};
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




