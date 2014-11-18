(function() {

  var CommentController = function(Session) {

    this.admin = Session.isAdmin();

    Session.registerForUserUpdate(function() {
      this.admin = Session.isAdmin();
    }.bind(this));

    this.showReplyForm = function(comment) {
      comment.replyFormDisplayed = true;
    };

    this.hasBeenReplied = function(comment) {
      return comment.reply !== null;
    };

    this.hasNotBeenReplied = function(comment) {
      return comment.reply === null;
    };

  };

  CommentController.$inject = ['Session'];

  angular
    .module('comment')
    .controller('CommentController', CommentController);

}());