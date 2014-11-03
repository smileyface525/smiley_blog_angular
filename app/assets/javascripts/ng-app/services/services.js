var appServices = angular.module('appServices', []);

appServices.service('Blogs', ['$q', '$http', function($q, $http) {

  var blogs = {};
  var registeredCBs = [];

  return {

    blogs: function() {
      return blogs;
    },

    registerObserverCB: function(callback) {
      registeredCBs.push(callback);
    },

    notifyObservers: function() {
      registeredCBs.forEach(function(callback) {
        callback();
      })
    },

    getAll: function() {
      var deferred = $q.defer();
      $http.get('/blogs')
           .success(function(data) {
              blogs = data;
              deferred.resolve();
           });
        return deferred.promise;
    },

    create: function(blogInputs) {
      var data = {blog: {title: blogInputs.title,
                         content: blogInputs.content},
                  tags: blogInputs.tags};
      $http.post('/blogs', data)
           .success(function(data) {
            debugger
              blogs.push(data);
              this.notifyObservers();
           }.bind(this))
    },

    createReply: function(comment, content) {
      var deferred = $q.defer();
      url = '/comments/' + comment.id;
      $http.put(url, {reply: content})
           .success(function(data) {
              blogs.forEach(function(blog) {
                if(blog.id === data.id) { blog = data; }
              });
              deferred.resolve(blogs)
           });
        return deferred.promise;
    }
  };
} ]);

appServices.service('Session', ['$q', '$http', function($q, $http) {

  var currentUser = null;

  return {

    currentUser: function() {
      return currentUser;
    },

    loggedIn: function() {
      return currentUser !== null;
    },

    isAdmin: function() {
      if(this.loggedIn()) { return currentUser.status === 'admin'; }
    },

    getSession: function() {
      var deferred = $q.defer();
      $http.get('/sessions')
           .success(function(data) {
              currentUser = data;
              deferred.resolve(data)
           }.bind(this));
      return deferred.promise;
    },

    create: function(enteredValues) {
      var deferred = $q.defer();
      var dataToBeSent = {user: enteredValues}
      $http.post('/sessions', dataToBeSent)
           .success(function(data) {
              currentUser = data;
              deferred.resolve(data);
           })
           .error(function(error) {
              deferred.reject(error);
           })
      return deferred.promise;
    },

    destroy: function() {
      var deferred = $q.defer();
      var url = '/sessions/' + currentUser.id;
      $http.delete(url)
           .success(function() {
              currentUser = null;
              deferred.resolve();
           })
      return deferred.promise;
    }

  };

} ]);

appServices.service('Tags', ['$http', function($http) {

  var tags = [];
  var registeredCBs = [];

  return {

    tags: function() {
      return tags;
    },

    registerObserverCB: function(callback) {
      registeredCBs.push(callback);
    },

    notifyObservers: function() {
      registeredCBs.forEach(function(callback) {
        callback();
      });
    },

    getAll: function() {
      $http.get('/tags')
           .success(function(data) {
              tags = data;
              this.notifyObservers();
           }.bind(this))
    }
  };

} ]);