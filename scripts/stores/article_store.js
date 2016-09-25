const Dispatcher = require('../dispatcher.js');
const Store = require('flux/utils').Store;
const ArticleStore = new Store(Dispatcher);
const ArticleActions = require('../actions/article_actions');

let _articles = [];
let _sorting = "";

ArticleStore.receiveArticles = function(articles) {
  _articles = _articles.concat(articles);
};

ArticleStore.articlesSlice = function(startIdx, num) {
  return _articles.slice(startIdx, startIdx + num);
};

ArticleStore.allArticles = function() {
  return _articles.slice();
};

ArticleStore.count = function() {
  return _articles.length;
};

ArticleStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_ARTICLES":
      ArticleStore.receiveArticles(payload.articles);
      break;
  }
};

module.exports = ArticleStore;
