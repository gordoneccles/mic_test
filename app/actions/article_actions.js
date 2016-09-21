const Dispatcher = require('../dispatcher.js');
const ArticleAPI = require('../apis/article_api.js');

ArticleActions.fetchBatch = function(idx) {
  ArticleAPI.fetchBatch(idx, ArticleActions.receiveBath);
};

ArticleActions.receiveBatch = function(articles) {
  Dispatcher.dispatch({
    actionType: "RECEIVE_ARTICLES_BATCH",
    articles: articles
  });
};

module.exports = ArticleActions;
