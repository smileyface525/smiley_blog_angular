(function() {

var Blogs = function($q, $http, Tags) {
  var blogs = [];
  var cbForBlogListUpdate = [];

  return {

    blogs: function() {
      return blogs;
    },

    registerForBlogListUpdate: function(callback) {
      cbForBlogListUpdate.push(callback);
    },

    notifyBlogListUpdate: function() {
      cbForBlogListUpdate.forEach(function(callback) {
        callback();
      })
    },

    getAll: function(tag) {
      var tag = tag;
      var url = '/blogs/?tag=' + tag;
      $http.get(url)
           .success(function(data) {
              blogs = data;
              Tags.setCurrentTag(tag);
              Tags.getAll();
              this.notifyBlogListUpdate();
           }.bind(this));
    },

    create: function(blogInputs) {
      var deferred = $q.defer();
      $http.post('/blogs', blogInputs)
           .success(function(data) {
              blogs.unshift(data);
              Tags.getAll();
              this.notifyBlogListUpdate();
              deferred.resolve();
           }.bind(this))
           return deferred.promise;
    },

    update: function(blog) {
      var deferred = $q.defer();
      var url = '/blogs/' + blog.blog.id;
      $http.put(url, blog)
           .success(function(data) {
              blogs.forEach(function(blog) {
                if(blog.blog.id === data.blog.id) {
                  blog = data;
                  Tags.getAll();
                  deferred.resolve(data);
                };
              }.bind(this));
           }.bind(this))
      return deferred.promise;
    },

    destroy: function(blog) {
      var url = '/blogs/' + blog.blog.id;
      $http.delete(url)
           .success(function(data) {
              blogs.forEach(function(blog) {
                if(blog.blog.id === data.id) {
                 var index = blogs.indexOf(blog);
                 blogs.splice(index, 1);
                };
              });
              if(blogs.length === 0) {
                this.getAll(Tags.defaultTag());
                return
              }
              Tags.getAll();
              this.notifyBlogListUpdate();
           }.bind(this))
    }

  };
};

Blogs.$inject = ['$q', '$http', 'Tags'];

angular
  .module('appServices')
  .factory('Blogs', Blogs);

}());
