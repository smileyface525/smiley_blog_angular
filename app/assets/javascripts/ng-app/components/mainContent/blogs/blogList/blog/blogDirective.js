(function() {

  var blog = function() {
    return {
      restrict: 'E',
      templateUrl: 'blog.html'
    }
  };

  angular
    .module('blog')
    .directive('blog', blog);

}());