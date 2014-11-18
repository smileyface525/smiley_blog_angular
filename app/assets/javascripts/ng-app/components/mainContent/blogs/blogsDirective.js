(function() {

  var blogs = function() {

    return {
      restrict: 'E',
      templateUrl: 'blogs.html'
    }

  };

  angular
    .module('blogs')
    .directive('blogs', blogs);

}());