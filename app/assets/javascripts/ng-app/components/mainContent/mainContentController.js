(function() {

  var MainContentController = function($scope) {

    this.currentlyShowing = 'blogList';

    $scope.$on('showUserForm', function() {
      this.currentlyShowing = 'userForm';
    }.bind(this));

  };

  MainContentController.$inject = ['$scope'];

  angular
    .module('mainContent')
    .controller('MainContentController', MainContentController);


}());