(function() {

  var BlogFormController = function(Blogs, Tags, $scope) {

    this.formType = null;
    this.originalBlog = {};
    this.blog = {};
    this.newTag = null;
    this.tags = [];
    this.newTagInputDisplayed = false;
    this.errors = {};

    $scope.$on('blogEdit', function(event, beingEdited) {
      this.formType = 'edit';
      this.blog = beingEdited;
      this.setOriginalBlog(beingEdited);
    }.bind(this));

    $scope.$on('blogEdit:cancel', function(event) {
      if(this.formType === 'edit') {
        this.cancelForm(event.currentScope.blogForm);
      }
    }.bind(this));

    $scope.$on('blogCreate', function(event, beingCreated) {
      if(!event.currentScope.blog) {
        this.formType = 'new';
        this.blog = beingCreated;
        this.setOriginalBlog(beingCreated);
      };
    }.bind(this));

    this.setOriginalBlog = function(blog) {
      this.originalBlog = {title: blog.blog.title,
                           content: blog.blog.content};
      this.originalBlog.tags = [];
      blog.tags.forEach(function(tag) {
        this.originalBlog.tags.push(tag);
      }.bind(this));
    };

    Tags.registerForTagListUpdate(function() {
      this.tags = Tags.tags();
    }.bind(this));

    this.tagAlreadyChecked = function(tag) {
      var checked = false;
      if(!this.blog.tags) {return};
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
      }
      else {
        this.errors.tags = null;
      }
    };

    this.validateTitle = function() {
      var title = this.blog.blog.title;
       if(title.trim() === '' || title === this.originalBlog.title) {
        this.errors.title = 'Please enter a new title.';
       }
       else {
        this.errors.title = null;
       }
    };

    this.validateContent = function() {
      var content = this.blog.blog.content;
      if(content.trim() === '' || content === this.originalBlog.content) {
        this.errors.content = 'Please enter a new content.'
      }
      else {
        this.errors.content = null;
      }
    };

    this.validateForm = function() {
      this.validateTags();
      if(this.formType === 'new') {
        this.validateTitle()
        this.validateContent();
      };
      for (var key in this.errors ) {
        if(this.errors[key] !== null) { return false; }
      }
      return true;
    };


    this.submitType = function() {
      if (this.formType === 'new') { return 'create blog'; }
      else { return 'edit blog'; }
    }

    this.submit = function($scope) {
      if(this.validateForm()) {
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
                  this.resetForm($scope);
               }.bind(this));
        };
      };
    };

    this.cancelForm = function(blogForm) {
      if (this.formType === 'new') {
        $scope.$emit('blogCreate:cancel');
        this.blog = {};
      }
      else {
        this.setBlogToOG();
        this.blog.currentlyEditing = false;
      }
      this.resetForm(blogForm);
    };

    this.resetForm = function(form) {
      this.cancelNewTagInput();
      form.$setPristine();
      this.formType = null;
      this.errros = {};
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
