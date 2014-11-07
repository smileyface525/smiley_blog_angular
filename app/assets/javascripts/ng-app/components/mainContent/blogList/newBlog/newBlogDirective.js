(function() {

  var newBlog = function() {
    return {
      restrict: 'E',
      templateUrl: 'new-blog.html'
    }
  };


  angular
    .module('newBlog')
    .directive('newBlog', newBlog);

}());