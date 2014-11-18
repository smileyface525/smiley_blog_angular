angular.module('appHeader', []);
angular.module('loginForm', []);
angular.module('userNavbar', []);
angular.module('tagList', []);
angular.module('mainContent', []);
angular.module('blogList', []);
angular.module('blogs', []);
angular.module('blog', []);
angular.module('comments', []);
angular.module('comment', []);
angular.module('commentForm', []);
angular.module('newBlog', []);
angular.module('blogForm', []);
angular.module('user', []);
angular.module('userForm', []);
angular.module('appServices', []);

angular.module('smileyblog', ['appHeader','loginForm', 'userNavbar', 'tagList', 'mainContent', 'blogs', 'blogList', 'blog', 'comments', 'comment', 'commentForm', 'newBlog', 'blogForm', 'user', 'userForm','templates', 'appServices']);

