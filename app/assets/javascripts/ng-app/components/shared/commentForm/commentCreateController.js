(function() {

  var CommentCreateController = function(Comments, Session, $scope) {

    $scope.type = 'new';
    $scope.author = Session.currentUser();
    $scope.content = '';

    Session.registerForUserUpdate(function() {
      this.author = Session.currentUser();
    }.bind($scope));

    $scope.submit = function() {
      var blog = this.blog.blog;
      Comments.comment(blog, this.content)
           .then(function(updatedBlogComments) {
              this.cancel();
           }.bind(this))
    };

    $scope.cancel = function() {
      this.replyForm.$setPristine();
      this.content = '';
    };

  };

  CommentCreateController.$inject = ['Comments', 'Session', '$scope']

  angular
    .module('commentForm')
    .controller('CommentCreateController', CommentCreateController);
}());