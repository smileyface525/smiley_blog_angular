(function() {

  var blogForm = function() {
    return {
      restrict: 'E',
      templateUrl: 'blog-form.html'
    };
  };

  angular
    .module('blogForm')
    .directive('blogForm', blogForm);

}());