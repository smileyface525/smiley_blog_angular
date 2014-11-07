(function() {

  var Tags = function($q, $http) {
    var specialTags = ['All', 'Recent'];
    var tags = [];
    var registeredCBs = [];

    return {

      tags: function() {
        return tags;
      },

      allTags: function() {
        return specialTags.concat(tags);
      },

      defaultTag: function() {
        return specialTags[0];
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

  };

  Tags.$inject = ['$q', '$http'];

  angular
    .module('appServices')
    .factory('Tags', Tags);

}());