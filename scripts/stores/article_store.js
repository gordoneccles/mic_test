const Dispatcher = require('../dispatcher.js');
const Store = require('flux/utils').Store;
const ArticleStore = new Store(Dispatcher);
const ArticleActions = require('../actions/article_actions');

let _articles = [];
let _PULL_COUNT = 30;

ArticleStore.receiveBatch = function(articles) {
  _articles = _articles.concat(articles);
  ArticleStore.__emitChange();
};

ArticleStore.getArticles = function(idx, num) {
  return _articles.slice(idx, idx + num);
};

ArticleStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_ARTICLES_BATCH":
      ArticleStore.receiveBatch(payload.articles);
      break;
  }
};

module.exports = ArticleStore;
