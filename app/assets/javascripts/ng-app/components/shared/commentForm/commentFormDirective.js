(function() {

  var commentForm = function(Forms) {
    return {
      restrict: 'E',
      templateUrl: 'comment-form.html',
      link: function(scope) {
        Forms.setForm('commentReply', scope.replyForm);
      }
    };
  };

  commentForm.$inject = ['Forms'];

  angular
    .module('commentForm')
    .directive('commentForm', commentForm);

}());