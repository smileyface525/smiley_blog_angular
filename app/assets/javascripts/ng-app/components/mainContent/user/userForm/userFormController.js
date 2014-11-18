(function() {

  var UserFormController = function(Session, User, $scope) {

    this.copyUser = function(user) {
      return { email: user.email,
               username: user.username,
               password: user.password,
               password_confirmation: user.password_confirmation
             };
    };

    this.user = Session.currentUser();
    this.formType = this.user.email ? 'edit' : 'new';
    this.originalUser = this.copyUser(this.user);
    this.errors = {};

    Session.registerForUserUpdate(function() {
      this.user = Session.currentUser();
      this.formType = this.user.email ? 'edit' : 'new';
      this.originalUser = this.copyUser(this.user);
    }.bind(this));

    $scope.$on('userForm:cancel', function(event) {
      this.cancelForm(event.currentScope);
    }.bind(this));

    this.submitType = function() {
      return this.formType === 'new' ? 'create' : 'update';
    };

    this.submit = function($scope) {
      if (this.formType === 'new') {
        User.create(this.user)
            .then(function() {
              this.resetForm($scope);
              $scope.$emit('showBlogs');
            }.bind(this), function(errors) {
              this.errors = errors;
            }.bind(this));
      }
      else {
        User.update(this.user)
            .then(function() {
              this.resetForm($scope);
              $scope.$emit('showBlogs');
            }.bind(this), function(errors) {
              this.errors = errors;
            }.bind(this));
      }
    };

    this.resetForm = function($scope) {
      $scope.userForm.$setPristine();
      this.errors = {};
    };

    this.setUserToOG = function() {
      for (key in this.originalUser) {
        this.user[key] = this.originalUser[key];
      }
    };

    this.cancelForm = function($scope) {
      this.resetForm($scope);
      this.setUserToOG();
      $scope.$emit('showBlogs');
    };

    this.prepareForm = function() {
      this.user = Session.currentUser();
      this.formType = this.user.email ? 'edit' : 'new';
      this.originalUser = this.copyUser(this.user);
    };

  };

  UserFormController.$inject = ['Session', 'User', '$scope'];

  angular
    .module('userForm')
    .controller('UserFormController', UserFormController);

}());