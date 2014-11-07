(function() {

  var tagList = function() {
    return {
      restrict: 'E',
      templateUrl: 'tag-list.html'
    };
  };

  angular.module('tagList')
         .directive('tagList', tagList)

}());