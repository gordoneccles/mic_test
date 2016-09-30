const ArticleAPI = {};

ArticleAPI.fetchArticles = function(idx, count) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.open('GET', '/app/assets/data/lots-o-articles.json', true);

    request.onload = function() {
      if (true) { // in reality: request.status === 200
        let data = JSON.parse(request.responseText);
        // Pretend server only sent up 'count' articles
        let articles = data.slice(idx, idx + count);
        resolve(articles);
      } else {
        reject(Error("Server says: no good")); // in reality: Error(req.statusText)
      }
    };

    request.onerror = function() {
      console.log("Network says: no good");
    };

    request.send();
  });
};

module.exports = ArticleAPI;
