(function() {

  var TagListController = function (Tags, Blogs) {

    this.tagsToBeListed = Tags.allTags();
    this.currentlyShowing = Tags.currentTag();

    Tags.registerForTagListUpdate(function() {
      this.tagsToBeListed = Tags.allTags();
    }.bind(this));

    Tags.registerForCurrentTagUpdate(function() {
      this.currentlyShowing = Tags.currentTag();
    }.bind(this));

    this.showBlogsFor = function(tag) {
      Blogs.getAll(tag);
    };

  };

  TagListController.$inject = ['Tags', 'Blogs'];

  angular
    .module('tagList')
    .controller('TagListController', TagListController);

}());

