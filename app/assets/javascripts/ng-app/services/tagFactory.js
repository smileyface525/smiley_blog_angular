(function() {

  var Tags = function($q, $http) {
    var specialTags = ['All', 'Recent'];
    var tags = [];
    var cbForTagListUpdate = [];

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

      registerForTagListUpdate: function(callback) {
        cbForTagListUpdate.push(callback);
      },

      notifyTagListUpdate: function() {
        cbForTagListUpdate.forEach(function(callback) {
          callback();
        });
      },

      getAll: function() {
        $http.get('/tags')
             .success(function(data) {
                tags = data;
                this.notifyTagListUpdate();
             }.bind(this))
      }
    };

  };

  Tags.$inject = ['$q', '$http'];

  angular
    .module('appServices')
    .factory('Tags', Tags);

}());