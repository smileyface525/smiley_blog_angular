(function() {

  var MainContentController = function($scope) {

    this.currentlyShowing = 'blogList';

    $scope.$on('showUserPage', function(event) {
      event.currentScope.$broadcast('userForm:cancel');
      this.currentlyShowing = 'userPage';
    }.bind(this));

    $scope.$on('showBlogs', function(event) {
      this.currentlyShowing = 'blogList';
    }.bind(this));

  };

  MainContentController.$inject = ['$scope'];

  angular
    .module('mainContent')
    .controller('MainContentController', MainContentController);

}());