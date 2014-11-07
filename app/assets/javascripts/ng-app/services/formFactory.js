(function() {

  var Forms = function() {

    var forms = {};

    return {

      forms: function() {
        return forms;
      },

      setForm: function(type, form) {
        forms.type = form;
      },

      getForm: function(type) {
        return forms.type;
      }

    };

  };

  angular
    .module('appServices')
    .factory('Forms', Forms);

}());