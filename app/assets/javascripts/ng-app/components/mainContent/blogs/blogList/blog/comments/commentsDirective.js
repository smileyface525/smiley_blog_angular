(function() {

  var comments = function() {
    return {
      restrict: 'E',
      templateUrl: 'comments.html'
    };
  };

  angular
    .module('comments')
    .directive('comments', comments);

}());