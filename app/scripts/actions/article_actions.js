const Dispatcher = require('../dispatcher.js');
const ArticleAPI = require('../apis/article_api.js');

const ArticleActions = {};

ArticleActions.fetchArticles = function(idx, count, optionalCB) {
  ArticleAPI.fetchArticles(idx, count, ArticleActions.receiveArticles.bind(ArticleActions, optionalCB));
};

ArticleActions.receiveArticles = function(optionalCB, articles) {
  Dispatcher.dispatch({
    actionType: "RECEIVE_ARTICLES",
    articles: articles
  });

  if (optionalCB !== undefined) {
    optionalCB();
  }
};

module.exports = ArticleActions;
