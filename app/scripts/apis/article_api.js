const ArticleAPI = {};

ArticleAPI.fetchArticles = function(idx, count, successCB) {
  let request = new XMLHttpRequest();
  request.open('GET', '/app/assets/data/lots-o-articles.json', true);

  request.onload = function() {
    let data = JSON.parse(request.responseText);
    // Pretend server only sent up 'count' articles
    let articles = data.slice(idx, idx + count);
    successCB(articles);
  };

  request.onerror = function() {
    console.log("No good");
  };

  request.send();
};

module.exports = ArticleAPI;
