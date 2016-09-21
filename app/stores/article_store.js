const Dispatcher = require('../dispatcher.js');
const Store = require('flux/utils').Store;
const ArticleStore = new Store(Dispatcher);

_allArticles = [];
_newArticles = [];

ArticleStore.receiveBatch = function(articles) {
  _newArticles = articles;
  _allArticles = _allArticles.concat(articles);
  ArticleStore.__emitChange();
};

ArticleStore.all = function() {
  return _allArticles.slice();
};

ArticleStore.new = function() {
  return _newArticles.slice();
};

ArticleStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_ARTICLES_BATCH":
      ArticleStore.receiveBatch(payload.articles);
      break;
  }
};
