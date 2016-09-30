const ArticleAPI = {};

ArticleAPI.fetchArticles = function(idx, count) {
  return new Promise( (resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', '/app/assets/data/lots-o-articles.json', true);

    request.onload = function() {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        let articles = data.slice(idx, idx + count); // Pretend server only sent up 'count' articles
        resolve(articles);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.onerror = function() {
      console.log("No good");
    };

    request.send();
  });
};

module.exports = ArticleAPI;
