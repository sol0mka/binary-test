// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('collectionViews/RecipesCollectionView', ['collectionViews/ProtoCollectionView', 'views/RecipeView'], function(ProtoView, RecipeView) {
    var RecipesCollectionView, _ref;

    RecipesCollectionView = (function(_super) {
      __extends(RecipesCollectionView, _super);

      function RecipesCollectionView() {
        _ref = RecipesCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RecipesCollectionView.prototype.itemView = RecipeView;

      RecipesCollectionView.prototype.template = '#recipes-collection-template';

      RecipesCollectionView.prototype.initialize = function(o) {
        var _this = this;

        this.o = o != null ? o : {};
        this.o.isAnimate = true;
        RecipesCollectionView.__super__.initialize.apply(this, arguments);
        this.listenToScroll();
        this.collection.on('afterFetch', function() {
          return _this.lock = false;
        });
        return this;
      };

      RecipesCollectionView.prototype.appendHtml = function(cv, iv, i) {
        if (iv.model.get('isNew')) {
          cv.$el.prepend(iv.el);
        } else {
          cv.$el.append(iv.el);
        }
        return this;
      };

      RecipesCollectionView.prototype.listenToScroll = function() {
        var _this = this;

        console.log('listen');
        return App.$window.on('scroll', function() {
          if (App.$window.scrollTop() + App.$window.outerHeight() >= _this.$el.position().top + _this.$el.height()) {
            !_this.lock && _this.collection.nextPage();
            return _this.lock = true;
          }
        });
      };

      return RecipesCollectionView;

    })(ProtoView);
    return RecipesCollectionView;
  });

}).call(this);
