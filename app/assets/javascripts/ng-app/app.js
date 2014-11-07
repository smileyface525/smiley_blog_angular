angular.module('appHeader', []);
angular.module('loginForm', []);
angular.module('userNavbar', []);
angular.module('tagList', []);
angular.module('blogList', []);
angular.module('comments', []);
angular.module('commentForm', []);
angular.module('newBlog', []);
angular.module('blogForm', []);
angular.module('mainContent', []);
angular.module('appServices', []);

angular.module('smileyblog', ['appHeader','loginForm', 'userNavbar', 'tagList', 'mainContent', 'blogList', 'comments', 'commentForm', 'newBlog', 'blogForm', 'templates', 'appServices']);
