(function() {

  var blogList = function() {
    return {
      restrict: 'E',
      templateUrl: 'blog-list.html'
    };
  };

  angular
    .module('blogList')
    .directive('blogList', blogList)

}());