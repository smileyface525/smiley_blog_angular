(function() {

  var comment = function() {
    return {
      restrict: 'E',
      templateUrl: 'comment.html'
    }
  };

  angular
    .module('comment')
    .directive('comment', comment);

}());