(function() {

  var TagListController = function (Tags, Blogs) {

    this.tagsToBeListed = Tags.allTags();
    this.currentlyShowing = Tags.defaultTag();

    Tags.registerObserverCB(function() {
      this.tagsToBeListed = Tags.allTags();
      if(this.tagsToBeListed.indexOf(this.currentlyShowing) === -1) {
        this.currentlyShowing = Tags.defaultTag();
      }
    }.bind(this));

    this.showBlogsFor = function(tag) {
      this.currentlyShowing = tag;
      Blogs.getAll(tag);
    };

  };

  TagListController.$inject = ['Tags', 'Blogs'];

  angular
    .module('tagList')
    .controller('TagListController', TagListController);

}());

