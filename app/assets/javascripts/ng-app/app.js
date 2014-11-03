  var app = angular.module('smileyblog', ['templates','appControllers', 'appServices', 'appDirectives']);

  var appControllers = angular.module('appControllers', []);

  appControllers.controller('SessionController', ['Session', function(Session) {

    this.session = {};
    this.error = null;
    this.currentUser = {};
    this.optionsDisplayed = false;
    this.loginForm = {};

    Session.getSession()
           .then(function(user) {
              this.currentUser = user;
           }.bind(this));


    this.login = function(loginForm) {
      this.loginForm = loginForm;
      Session.create(this.session)
             .then(function(user) {
                this.currentUser = user;
                this.session = {};
                this.error = null;
                this.loginForm.$setPristine();
             }.bind(this), function(error) {
                this.error = error;
             }.bind(this));
    };

    this.logout = function() {
      Session.destroy()
             .then(function() {
                this.optionsDisplayed = false;
             }.bind(this));
    };

    this.loggedIn = function() {
      return Session.loggedIn();
    };

    this.showOptions = function() {
      this.optionsDisplayed = true;
    };

    this.hideOptions = function() {
      this.optionsDisplayed = false;
    };

  } ]);

  appControllers.controller('TagListController', ['Tags', function(Tags) {

    this.tags = [];
    Tags.registerObserverCB(function() {
      this.tags = Tags.tags();
    }.bind(this));
    Tags.getAll();

  }]);

  appControllers.controller('BlogsController', ['Session', 'Blogs', function(Session, Blogs) {

      this.blogs = {};
      this.replyContent = '';
      this.newBlogDisplayed = false;

      Blogs.registerObserverCB(function() {
        this.blogs = Blogs.blogs();
      }.bind(this));

      Blogs.getAll()
           .then(function() {
              this.blogs = Blogs.blogs();
            }.bind(this));

      this.toggleComments = function(blog) {
        blog.commentsDisplayed = blog.commentsDisplayed ? false : true;
      };

      this.isAdmin = function() {
        return Session.isAdmin();
      };

      this.showReplyForm = function(form, comment) {
        form.$setPristine();
        this.replyContent = '';
        this.hideAllReplyForms();
        comment.replyFormDisplayed = true;
      };

      this.hideReplyForm = function(comment) {
        comment.replyFormDisplayed = false;
      };

      this.hideAllReplyForms = function() {
        this.blogs.forEach(function(blog) {
          blog.comments.forEach(function(com) {
            this.hideReplyForm(com);
          }.bind(this));
        }.bind(this));
      };

      this.submitReply = function(form, comment) {
        Blogs.createReply(comment, this.replyContent)
             .then(function(blogs) {
                this.blogs = blogs;
                this.hideReplyForm(comment);
             }.bind(this));
      };

      this.showNewBlog = function() {
        this.newBlogDisplayed = true;
      };

      this.hideNewBlog = function(BlogFormController) {
        this.newBlogDisplayed = false;
        BlogFormController.resetForm();
      };

      this.formatContent = function(content) {
        return content.replace(/(?:\r\n|\r|\n)/g, '<br />');
      };

  } ]);

appControllers.controller('BlogFormController', ['Blogs', 'Tags', function(Blogs, Tags) {

  this.blogInputs = {title: 'blog title',
                     content: 'blog content',
                     tags:[]};
  this.tags = [];
  this.newTag = null;
  this.today = new Date();
  this.newTagInputDisplayed = false;
  this.errors = {};

  Tags.registerObserverCB(function() {
    this.tags = Tags.tags();
  }.bind(this));

  this.toggleTagSelection = function(tagName) {
    var index = this.blogInputs.tags.indexOf(tagName);
    index > -1 ? this.blogInputs.tags.splice(index, 1) : this.blogInputs.tags.push(tagName);
  };

  this.showNewTagInput = function() {
    this.newTagInputDisplayed = true;
  };

  this.cancelNewTagInput = function() {
    this.newTag = null;
    this.newTagInputDisplayed = false;
  };

  this.addTag = function() {
    if(this.newTag.trim() !== '') {this.tags.push(this.newTag)};
    this.cancelNewTagInput();
  };

  this.validateTags = function() {
    var tags = this.blogInputs.tags;
    if(tags.length === 0) {
      this.errors.tags = 'Please select at leat one tag.';
    }
    else {
      this.errors.tags = null;
    }
  };

  this.validateTitle = function() {
    var title = this.blogInputs.title;
     if(title.trim() === '' || title === 'blog title') {
      this.errors.title = 'Please enter a new title.';
     }
     else {
      this.errors.title = null;
     }
  };

  this.validateContent = function() {
    var content = this.blogInputs.content;
    if(content.trim() === '' || content === 'blog content') {
      this.errors.content = 'Please enter a new content.'
    }
    else {
      this.errors.content = null;
    }
  };

  this.validateForm = function() {
    this.validateTags();
    this.validateTitle();
    this.validateContent();
    for (var key in this.errors ) {
      if(this.errors[key] !== null) { return false; }
    }
    return true;
  };

  this.submit = function(blogForm) {
    if(this.validateForm()) {
      debugger
      Blogs.create(this.blogInputs);
      blogForm.$setPristine();
      this.resetForm();
    }
  };

  this.resetForm = function() {
    this.blogInputs = {title: 'blog title',
                     content: 'blog content',
                     tags:[]};
    this.newTag = null;
    this.cancelNewTagInput();
  };

} ]);

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('appHeader', function() {
  return {
    restrict: 'E',
    templateUrl: 'app-header.html'
  };
});

appDirectives.directive('tagList', function() {
  return {
    restrict: 'E',
    templateUrl: 'tag-list.html'
  };
});

appDirectives.directive('mainContent', function() {
  return {
    restrict: 'E',
    templateUrl: 'main-content.html'
  };
});

appDirectives.directive('blogList', function() {
  return {
    restrict: 'E',
    templateUrl: 'blog-list.html'
  };
});

appDirectives.directive('newBlog', function() {
  return {
    restrict: 'E',
    templateUrl: 'new-blog.html'
  }
})

appDirectives.directive('blogForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'blog-form.html'
  };
});

