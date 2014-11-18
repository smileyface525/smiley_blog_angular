(function() {

  var User = function($q, $http, Session) {

    return {

      create: function(user) {
        var deffered = $q.defer();
        $http.post('/users', {user: user})
             .success(function(data) {
                Session.setCurrentUser(data);
                deffered.resolve();
             })
             .error(function(errors) {
                deffered.reject(errors);
             })
        return deffered.promise;
      },

      update: function(user) {
        var deffered = $q.defer();
        var url = '/users/' + user.id;
        $http.put(url, {user: user})
             .success(function(data) {
                Session.setCurrentUser(data);
                deffered.resolve();
             })
             .error(function(errors) {
                deffered.reject(errors);
             })
        return deffered.promise;
      }

    };

  };

  User.$inject = ['$q', '$http', 'Session'];

  angular
    .module('appServices')
    .factory('User', User);


}());