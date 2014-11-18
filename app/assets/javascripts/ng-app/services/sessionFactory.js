(function() {

  var Session = function($q, $http) {

    var currentUser = {};
    var cbForUserUpdate = [];
    var isLoggedIn = false;

    return {

      registerForUserUpdate: function(callback) {
        cbForUserUpdate.push(callback);
      },

      notifyUserUpdate: function() {
        cbForUserUpdate.forEach(function(callback) {
          callback();
        })
      },

      setCurrentUser: function(user) {
        currentUser = user;
        isLoggedIn = true;
        this.notifyUserUpdate();
      },

      unsetCurrentUser: function() {
        currentUser = {};
        isLoggedIn = false;
        this.notifyUserUpdate();
      },

      currentUser: function() {
        return currentUser;
      },

      isLoggedIn: function() {
        return isLoggedIn;
      },

      isAdmin: function() {
        return currentUser.status === 'admin';
      },

      isGeneralUser: function() {
        return currentUser.status === 'general';
      },

      getSession: function() {
        $http.get('/sessions')
             .success(function(data) {
                this.setCurrentUser(data);
             }.bind(this));
      },

      create: function(enteredValues) {
        var deferred = $q.defer();
        var dataToBeSent = {user: enteredValues}
        $http.post('/sessions', dataToBeSent)
             .success(function(data) {
                this.setCurrentUser(data);
                deferred.resolve();
             }.bind(this))
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
                this.unsetCurrentUser();
                deferred.resolve();
             }.bind(this))
        return deferred.promise;
      }

    };
  };

  Session.$inject = ['$q', '$http'];

  angular
    .module('appServices')
    .factory('Session', Session);

}());