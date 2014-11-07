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

      comment: function(blog, content) {
        var deferred = $q.defer();
        var data = {blog_id: blog.id,
                    user_id: Session.currentUser().id,
                    comment: {content: content}
                    };
        $http.post('/comments', data)
             .success(function(data) {
                this.addCommentToBlog(deferred, Blogs.blogs(), data);
             }.bind(this))
            return deferred.promise;
      },

      createReply: function(comment, content) {
        var deferred = $q.defer();
        url = '/comments/' + comment.id;
        $http.put(url, {reply: content})
             .success(function(data) {
                this.updateReply(deferred, Blogs.blogs(), data);
             }.bind(this));
          return deferred.promise;
      },

      addCommentToBlog: function(deferred, blogs, newComment) {
        blogs.forEach(function(blog) {
          if(blog.blog.id === newComment.blog_id) {
            blog.comments.push(newComment.comment);
            deferred.resolve(blog.comments);
          }
        });
      },

      updateReply: function(deferred, blogs, updatedComment) {
        blogs.forEach(function(blog) {
          if(blog.blog.id === updatedComment.blog_id) {
            blog.comments.forEach(function(comment) {
              if(comment.id === updatedComment.comment.id) {
                comment = updatedComment.comment;
                this.notifyCommentsUpdate(blog.comments);
                deferred.resolve(comment);
              }
            }.bind(this));
          }
        }.bind(this));
      }


    };

  };

  Comments.$inject = ['$q', '$http', 'Blogs', 'Session'];

  angular
    .module('appServices')
    .factory('Comments', Comments);

}());