(function() {

  var CommentFormController = function(Comments, Session, $scope) {

    $scope.type = 'reply';
    $scope.author = Session.currentUser();
    $scope.content = '';

    Session.registerForUserUpdate(function() {
      this.author = Session.currentUser();
    }.bind($scope));

    $scope.submit = function(comment) {
      if (this.comment) {
        Comments.createReply(this)
             .then(function() {
                this.cancel();
             }.bind(this));
      }
      else {
        Comments.comment(this)
             .then(function() {
                this.cancel();
             }.bind(this))
      }
    };

    $scope.cancel = function() {
      this.replyForm.$setPristine();
      this.content = '';
      if (this.comment) {
        this.comment.replyFormDisplayed = false;
      }
    };

  };

  CommentFormController.$inject = ['Comments', 'Session', '$scope']

  angular
    .module('commentForm')
    .controller('CommentFormController', CommentFormController);
}());