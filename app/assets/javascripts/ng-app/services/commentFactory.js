(function() {

  var Comments = function($q, $http, Blogs, Session) {

    var cbForCommentsUpdate = [];

    return {

      registerForCommentsUpdate: function(callback) {
        cbForCommentsUpdate.push(callback);
      },

      notifyCommentsUpdate: function(updatedComments) {
        var updatedComments = updatedComments;
        cbForCommentsUpdate.forEach(function(callback) {
          callback(updatedComments);
        });
      },

      comment: function(commentScope) {
        var deferred = $q.defer();
        var commentScope = commentScope;
        var data = {blog_id: commentScope.blog.blog.id,
                    user_id: Session.currentUser().id,
                    comment: {content: commentScope.content}
                    };
        $http.post('/comments', data)
             .success(function(data) {
                commentScope.blog.comments.push(data.comment);
                deferred.resolve();
             }.bind(this))
        return deferred.promise;
      },

      createReply: function(commentScope) {
        var comment = commentScope.comment;
        var deferred = $q.defer();
        url = '/comments/' + comment.id;
        $http.put(url, {reply: commentScope.content})
             .success(function(data) {
                comment.reply = data.comment.reply;
                deferred.resolve(comment);
             }.bind(this));
        return deferred.promise;
      }

    };

  };

  Comments.$inject = ['$q', '$http', 'Blogs', 'Session'];

  angular
    .module('appServices')
    .factory('Comments', Comments);

}());