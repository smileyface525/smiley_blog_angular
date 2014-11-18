(function() {

  var BlogsController = function(Session, $scope) {

      this.newBlogsDisplayed = false;
      this.beingCreated = {};
      this.isAdmin = Session.isAdmin();


      Session.registerForUserUpdate(function() {
        this.isAdmin = Session.isAdmin();
      }.bind(this));

      this.turnOnCreateMode = function($scope) {
        this.newBlogDisplayed = true;
        this.beingCreated.blog = {title: 'New Title', content: 'New Content'};
        this.beingCreated.tags = [];
        $scope.$broadcast('blogCreate');
      };

      this.hideNewBlog = function() {
        this.newBlogDisplayed = false;
      };

  };

  BlogsController.$inject = ['Session', '$scope'];

  angular
    .module('blogs')
    .controller('BlogsController', BlogsController);

}());