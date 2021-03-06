// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/pages/main', ['views/pages/PageView', 'collectionViews/RecipesCollectionView', 'collections/RecipesCollection'], function(PageView, RecipesCollectionView, RecipesCollection) {
    var Main, _ref;

    Main = (function(_super) {
      __extends(Main, _super);

      function Main() {
        _ref = Main.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Main.prototype.template = '#main-template';

      Main.prototype.className = "cf main-p";

      Main.prototype.render = function() {
        Main.__super__.render.apply(this, arguments);
        this.renderRecipesList();
        return this;
      };

      Main.prototype.renderRecipesList = function() {
        var _this = this;

        this.recipes = new RecipesCollection({
          isPaginated: true,
          pageNum: 1
        });
        this.recipes.fetch().then(function() {
          return _this.recipesView = new RecipesCollectionView({
            collection: _this.recipes,
            isRender: true,
            $el: _this.$('#js-recipes-place')
          });
        });
        return App.recipesCollection = this.recipes;
      };

      return Main;

    })(PageView);
    return Main;
  });

}).call(this);
