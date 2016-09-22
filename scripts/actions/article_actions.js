const Dispatcher = require('../dispatcher.js');
const ArticleAPI = require('../apis/article_api.js');

const ArticleActions = {};

ArticleActions.fetchBatch = function(idx = 0) {
  ArticleAPI.fetchBatch(idx, ArticleActions.receiveBatch);
};

ArticleActions.receiveBatch = function(articles) {
  Dispatcher.dispatch({
    actionType: "RECEIVE_ARTICLES_BATCH",
    articles: articles
  });
};

module.exports = ArticleActions;
