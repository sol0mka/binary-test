// Generated by CoffeeScript 1.6.2
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('collections/PaginatedCollection', ['backbone', 'helpers', 'underscore'], function(B, helpers, _) {
    var PaginatedCollection, _ref;

    PaginatedCollection = (function(_super) {
      __extends(PaginatedCollection, _super);

      function PaginatedCollection() {
        _ref = PaginatedCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PaginatedCollection.prototype.page = 1;

      PaginatedCollection.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        this.perPage = (function() {
          if (helpers.isMobile()) {
            return 4;
          } else {
            if (window.App.isDevMode) {
              return 6;
            } else {
              return 8;
            }
          }
        })();
        _.bindAll(this, "parseFun", "pageInfo", "nextPage");
        this.options = {
          page: this.page,
          perPage: this.perPage,
          total: 50,
          reset: false,
          remove: false
        };
        this.o.isPaginated && (this.fetch = this.fetchFun);
        this.o.isPaginated && (this.parse = this.parseFun);
        PaginatedCollection.__super__.initialize.apply(this, arguments);
        return this;
      };

      PaginatedCollection.prototype.fetchFun = function(options) {
        options = {
          remove: false
        };
        this.loadFromFile = (options != null ? options.sectionNames : void 0) ? true : false;
        return Backbone.Collection.prototype.fetch.call(this, {
          data: $.extend(this.options, options || {}),
          remove: false,
          reset: false
        });
      };

      PaginatedCollection.prototype.parseFun = function(resp) {
        if (resp.total) {
          this.options.total = resp.total;
        }
        return resp.models;
      };

      PaginatedCollection.prototype.pageInfo = function() {
        var info, max;

        info = {
          total: this.options.total,
          page: this.options.page,
          perPage: this.options.perPage,
          pages: Math.ceil(this.options.total / this.options.perPage),
          prev: false,
          next: false
        };
        max = Math.min(this.options.total, this.options.page * this.options.perPage);
        if (this.options.total === this.options.pages * this.options.perPage) {
          max = this.options.total;
        }
        info.range = [(this.options.page - 1) * this.options.perPage + 1, max];
        if (this.options.page > 1) {
          info.prev = this.options.page - 1;
        }
        if (this.options.page < info.pages) {
          info.next = this.options.page + 1;
        }
        return info;
      };

      PaginatedCollection.prototype.nextPage = function() {
        var _this = this;

        if (!this.pageInfo().next) {
          return false;
        }
        this.options.page++;
        return this.fetch().then(function() {
          return !_this.isClosed && _this.trigger('afterFetch');
        });
      };

      PaginatedCollection.prototype.prevPage = function() {
        var _this = this;

        if (!this.pageInfo().prev) {
          return false;
        }
        this.options.page--;
        return this.fetch().then(function() {
          return !_this.isClosed && _this.trigger('afterFetch');
        });
      };

      PaginatedCollection.prototype.loadPage = function(n) {
        var _this = this;

        if (n == null) {
          n = 1;
        }
        if (n === this.options.page) {
          return false;
        }
        this.options.page = n;
        return this.fetch().then(function() {
          return !_this.isClosed && _this.trigger('afterFetch');
        });
      };

      PaginatedCollection.prototype.clearSelectedIcons = function() {
        return App.vent.trigger('icon:deselect');
      };

      return PaginatedCollection;

    })(B.Collection);
    return PaginatedCollection;
  });

}).call(this);
