(function() {

  var BlogFormController = function(Blogs, Tags, $scope) {

    this.formType = null;
    this.originalBlog = {};
    this.blog = {};
    this.newTag = null;
    this.tags = [];
    this.newTagInputDisplayed = false;
    this.errors = {};

    $scope.$on('blogEdit', function(event, blog) {
      this.formType = 'edit';
      blog.currentlyEditing = true;
      this.setOriginalBlog(blog);
      this.blog = blog;
    }.bind(this));


    $scope.$on('blogCreate', function(event) {
      if(this.formType === 'edit') {
        this.cancelForm(event.currentScope.blogForm);
      }
      if(!event.currentScope.blog) {
        this.formType = 'new';
        this.blog = event.currentScope.NewBlgCtrl.blog;
      };
    }.bind(this));

    this.setOriginalBlog = function(blog) {
      this.originalBlog = { title: blog.blog.title,
                           content: blog.blog.content,
                          tags: [] };
      blog.tags.forEach(function(tag) {
        this.originalBlog.tags.push(tag);
      }.bind(this));
    };

    Tags.registerForTagListUpdate(function() {
      this.tags = Tags.tags();
    }.bind(this));

    this.tagAlreadyChecked = function(tag) {
      var checked = false;
      if(!this.blog.tags) { return };
      this.blog.tags.forEach(function(t) {
        if (t === tag) { checked =  true;};
      });
      return checked;
    };

    this.showNewTagInput = function() {
      this.newTagInputDisplayed = true;
    };

    this.addTag = function() {
      if(this.newTag.trim() !== '') {this.tags.push(this.newTag.titleize())};
      this.cancelNewTagInput();
    };

    this.cancelNewTagInput = function() {
      this.newTag = null;
      this.newTagInputDisplayed = false;
    };

    this.toggleTagSelection = function(tagName) {
      var index = this.blog.tags.indexOf(tagName);
      index > -1 ? this.blog.tags.splice(index, 1) : this.blog.tags.push(tagName);
    };

    String.prototype.titleize = function() {
      var words = this.split(' ')
      var array = []
      for (var i=0; i<words.length; ++i) {
        array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1))
      }
      return array.join(' ')
    };

    this.validateTags = function() {
      var tags = this.blog.tags;
      if(tags.length === 0) {
        this.errors.tags = 'Please select at leat one tag.';
        return false;
      }
      else {
        this.errors.tags = null;
        return true;
      }
    };

    this.submitType = function() {
      if (this.formType === 'new') { return 'create blog'; }
      else { return 'edit blog'; }
    }

    this.submit = function($scope) {
      if(this.validateTags()) {
        if(this.formType === 'new') {
          Blogs.create(this.blog)
               .then(function() {
                  this.cancelForm($scope);
               }.bind(this));
        }
        else {
          Blogs.update(this.blog)
               .then(function(updatedBlog) {
                  this.blog.currentlyEditing = false;
                  this.resetForm($scope.blogForm);
               }.bind(this));
        };
      };
    };

    this.cancelForm = function($scope) {
      if (this.formType === 'new') {
        $scope.BlgsCtrl.hideNewBlog();
      }
      else {
        this.setBlogToOG();
        this.blog.currentlyEditing = false;
      }
      this.resetForm($scope.blogForm);
    };

    this.resetForm = function(form) {
      if (this.formType === 'new') {
        this.blog.blog = {};
        this.blog.tags = [];
      }
      this.cancelNewTagInput();
      form.$setPristine();
      this.formType = null;
      this.errors = {};
    };

    this.setBlogToOG = function() {
      this.blog.blog.title = this.originalBlog.title;
      this.blog.blog.content = this.originalBlog.content;
      this.blog.tags = this.originalBlog.tags;
    };

  };

  BlogFormController.$inject = ['Blogs', 'Tags', '$scope'];

  angular
    .module('blogForm')
    .controller('BlogFormController', BlogFormController);

}());
