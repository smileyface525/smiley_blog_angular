(function() {

  var BlogFormController = function(Blogs, Tags) {
    this.blogInputs = {blog: {title: 'blog title',
                              content: 'blog content'},
                       tags:[]};
    this.originalBlog = {};
    this.tags = [];
    this.newTag = null;
    this.today = new Date();
    this.newTagInputDisplayed = false;
    this.errors = {};

    Tags.registerObserverCB(function() {
      this.tags = Tags.tags();
    }.bind(this));

    this.tagAlreadyChecked = function(tag) {
      var checked = false;
      this.blogInputs.tags.forEach(function(t) {
        if (t === tag) { checked =  true;};
      });
      return checked;
    };

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
      if(this.newTag.trim() !== '') {this.tags.push(this.newTag.titleize())};
      this.cancelNewTagInput();
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
      var tags = this.blogInputs.tags;
      if(tags.length === 0) {
        this.errors.tags = 'Please select at leat one tag.';
      }
      else {
        this.errors.tags = null;
      }
    };

    this.validateTitle = function() {
      var title = this.blogInputs.blog.title;
       if(title.trim() === '' || title === 'blog title') {
        this.errors.title = 'Please enter a new title.';
       }
       else {
        this.errors.title = null;
       }
    };

    this.validateContent = function() {
      var content = this.blogInputs.blog.content;
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

    this.formType = function() {
      return this.blogInputs.editMode === true ? 'edit' : 'new';
    };

    this.submitType = function() {
      if (this.formType() === 'new') {
        return 'create blog';
      }
      else {
        return 'edit blog';
      }
    }

    this.submit = function(blogForm, blogsCtrl) {
      if(this.validateForm()) {
        Blogs.create(this.blogInputs);
        blogForm.$setPristine();
        blogsCtrl.hideNewBlog();
        this.resetForm();
      }
    };

    this.resetForm = function() {
      this.blogInputs = {blog: {title: 'blog title',
                              content: 'blog content'},
                         tags:[]};
      this.newTag = null;
      this.cancelNewTagInput();
    };

    this.cancelForm = function(blogsCtrl) {
      this.resetForm();
      if (this.formType === 'new') {
        debugger
        blogsCtrl.hideNewBlog();
      }
      else {
        this.setBlogToOG(blogsCtrl.currentlyEditting);
        blogsCtrl.turnOffEditMode();
      }
    };

    this.setBlogToOG = function(blog) {
      blog.blog.title = this.originalBlog.blog.title;
      blog.blog.content = this.originalBlog.blog.content;
      blog.tags = this.originalBlog.tags;
    };
  };

  BlogFormController.$inject = ['Blogs', 'Tags'];

  angular
    .module('blogForm')
    .controller('BlogFormController', BlogFormController);

}());
