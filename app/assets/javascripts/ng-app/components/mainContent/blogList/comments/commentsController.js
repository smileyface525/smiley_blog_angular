(function() {

  var CommentsController = function(Comments, $scope) {

    Comments.registerForCommentsUpdate(function(updatedComments) {
      this.blog.comments = updatedComments;
    }.bind($scope));

    this.showReplyForm = function(comment) {
      comment.replyFormDisplayed = true;
    };

    this.replyFormDisplayed = function(comment) {
      return comment.replyFormDisplayed;
    };

  };

  CommentsController.$inject = ['Comments', '$scope'];

  angular
    .module('comments')
    .controller('CommentsController', CommentsController);

}());

