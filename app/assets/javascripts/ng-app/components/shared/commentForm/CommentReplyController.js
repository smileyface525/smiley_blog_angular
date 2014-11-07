(function() {

  var CommentReplyController = function(Comments, Session, $scope) {

    $scope.type = 'reply';
    $scope.author = Session.currentUser();
    $scope.content = '';
    $scope.commentBeingUpdated = {};

    Session.registerForUserUpdate(function() {
      this.author = Session.currentUser();
    }.bind($scope));

    $scope.submit = function(comment) {
      this.commentBeingUpdated = comment;
      Comments.createReply(comment, this.content)
           .then(function(updatedComment) {
              this.cancel(this.commentBeingUpdated);
              this.commentBeingUpdated.reply = updatedComment.reply;
           }.bind(this));
    };

    $scope.cancel = function(comment) {
      this.replyForm.$setPristine();
      this.content = '';
      comment.replyFormDisplayed = false;
    };

  };

  CommentReplyController.$inject = ['Comments', 'Session', '$scope']

  angular
    .module('commentForm')
    .controller('CommentReplyController', CommentReplyController);
}());