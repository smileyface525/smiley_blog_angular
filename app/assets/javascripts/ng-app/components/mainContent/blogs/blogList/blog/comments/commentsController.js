(function() {

  var CommentsController = function(Session, $scope) {

    this.comments = [];
    this.generalUser = Session.isGeneralUser();

    Session.registerForUserUpdate(function() {
      this.generalUser = Session.isGeneralUser();
    }.bind(this));

    $scope.$on('toggleComments', function(event, comments) {
      this.comments = comments;
    }.bind(this));

    this.commentsEmpty = function() {
      return this.comments.length === 0;
    };

  };

  CommentsController.$inject = ['Session', '$scope'];

  angular
    .module('comments')
    .controller('CommentsController', CommentsController);

}());

