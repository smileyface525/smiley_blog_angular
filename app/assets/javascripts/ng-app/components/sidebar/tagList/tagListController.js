(function() {

  var TagListController = function (Tags, Blogs, $scope) {

    this.tagsToBeListed = Tags.allTags();
    this.currentlyShowing = Tags.currentTag();

    Tags.registerForTagListUpdate(function() {
      this.tagsToBeListed = Tags.allTags();
    }.bind(this));

    Tags.registerForCurrentTagUpdate(function() {
      this.currentlyShowing = Tags.currentTag();
    }.bind(this));

    this.showBlogsFor = function(tag, $scope) {
      Blogs.getAll(tag);
      $scope.$root.$broadcast('showBlogs');
    };

  };

  TagListController.$inject = ['Tags', 'Blogs', '$scope'];

  angular
    .module('tagList')
    .controller('TagListController', TagListController);

}());

