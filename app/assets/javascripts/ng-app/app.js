angular.module('appHeader', []);
angular.module('loginForm', []);
angular.module('userNavbar', []);
angular.module('tagList', []);
angular.module('mainContent', []);
angular.module('blogList', []);
angular.module('comments', []);
angular.module('commentForm', []);
angular.module('newBlog', []);
angular.module('blogForm', []);
angular.module('user', []);
angular.module('userForm', []);
angular.module('appServices', []);

angular.module('smileyblog', ['appHeader','loginForm', 'userNavbar', 'tagList', 'mainContent', 'blogList', 'comments', 'commentForm', 'newBlog', 'blogForm', 'user', 'userForm','templates', 'appServices']);

angular.module('smileyblog')
       .controller('appController' ['$scope', function($scope) {

                  $scope.$on('showUserForm', function() {
                    this.$scope.$broadcast('showUserForm');
                  }.bind($scope));


              }]);