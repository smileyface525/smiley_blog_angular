(function() {

  var BlogListController = function(Session, Blogs, Forms, Tags, $scope) {

    this.blogs = {};
    this.newBlogDisplayed = false;
    this.beingEdited = {};
    this.beingCreated = {};

    Blogs.registerForBlogListUpdate(function() {
      if(this.beingEdited) {this.beingEdited.currentlyEditing = false}
      this.blogs = Blogs.blogs();
    }.bind(this));

    Blogs.getAll('All');


    this.isAdmin = function() {
      return Session.isAdmin();
    };

    this.generalUser = function() {
      return Session.isGeneral();
    };

    this.showBlogsFor = function(tag) {
      Blogs.getAll(tag);
    };

    this.toggleComments = function(blog) {
      blog.commentsDisplayed = blog.commentsDisplayed ? false : true;
    };

    this.turnOnEditMode = function(blog, $scope) {
      this.beingEdited = blog;
      blog.currentlyEditing = true;
      $scope.$broadcast('blogEdit', this.beingEdited);
    };

    this.destroy = function(blog) {
      Blogs.destroy(blog);
    };

    this.turnOnCreateMode = function($scope) {
      this.newBlogDisplayed = true;
      this.beingCreated.blog = {title: 'New Title', content: 'New Content'};
      this.beingCreated.tags = [];
      $scope.$broadcast('blogEdit:cancel');
      $scope.$broadcast('blogCreate', this.beingCreated);
    };

    $scope.$on('blogCreate:cancel', function(){
      this.hideNewBlog();
    }.bind(this));

    this.hideNewBlog = function() {
      this.newBlogDisplayed = false;
    };

  };

  BlogListController.$inject = ['Session', 'Blogs', 'Forms', 'Tags', '$scope'];

  angular
    .module('blogList')
    .controller('BlogListController', BlogListController);

}());




