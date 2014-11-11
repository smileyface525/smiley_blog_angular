(function() {

  var NewBlogController = function($scope) {

    this.blog = {};
    this.today = new Date();

    $scope.$on('blogCreate', function(event, beingCreated) {
      this.blog = beingCreated;
    }.bind(this));

  };

  NewBlogController.$inject = ['$scope'];

  angular
    .module('newBlog')
    .controller('NewBlogController', NewBlogController);

}());