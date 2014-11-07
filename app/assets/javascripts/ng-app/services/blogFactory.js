(function() {

var Blogs = function($q, $http, Tags) {
  var blogs = {};
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
      var url = '/blogs/?tag=' + tag;
      $http.get(url)
           .success(function(data) {
              blogs = data;
              Tags.getAll();
              this.notifyBlogListUpdate();
           }.bind(this));
    },

    create: function(blogInputs) {
      $http.post('/blogs', blogInputs)
           .success(function(data) {
              blogs.unshift(data);
              Tags.getAll();
              this.notifyBlogListUpdate();
           }.bind(this))
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
