(function() {

  var BlogListController = function(Blogs) {

    this.blogs = {};

    Blogs.registerForBlogListUpdate(function() {
      if(this.beingEdited) {this.beingEdited.currentlyEditing = false}
      this.blogs = Blogs.blogs();
    }.bind(this));

    Blogs.getAll('All');

  };

  BlogListController.$inject = ['Blogs'];

  angular
    .module('blogList')
    .controller('BlogListController', BlogListController);

}());




