(function() {

  var Session = function($q, $http) {

    var currentUser = {};
    var cbForUserUpdate = [];

    return {

      registerForUserUpdate: function(callback) {
        cbForUserUpdate.push(callback);
      },

      notifyUserUpdate: function() {
        cbForUserUpdate.forEach(function(callback) {
          callback();
        })
      },

      currentUser: function() {
        return currentUser;
      },

      isAdmin: function() {
        return currentUser.status === 'admin';
      },

      isGeneral: function() {
        return currentUser.status === 'general';
      },

      getSession: function() {
        var deferred = $q.defer();
        $http.get('/sessions')
             .success(function(data) {
                currentUser = data;
                deferred.resolve();
             }.bind(this));
        return deferred.promise;
      },

      create: function(enteredValues) {
        var deferred = $q.defer();
        var dataToBeSent = {user: enteredValues}
        $http.post('/sessions', dataToBeSent)
             .success(function(data) {
                currentUser = data;
                this.notifyUserUpdate();
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
                currentUser = {};
                deferred.resolve();
             })
        return deferred.promise;
      }

    };
  };

  Session.$inject = ['$q', '$http'];

  angular
    .module('appServices')
    .factory('Session', Session);

}());