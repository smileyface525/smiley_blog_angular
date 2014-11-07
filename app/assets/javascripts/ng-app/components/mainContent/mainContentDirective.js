(function(){

  var mainContent = function() {
    return {
      restrict: 'E',
      templateUrl: 'main-content.html'
    };
  };

  angular
    .module('mainContent')
    .directive('mainContent', mainContent);

}());