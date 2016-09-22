const ArticleAPI = {};

ArticleAPI.fetchBatch = function(idx, successCB) {
  let request = new XMLHttpRequest();
  request.open('GET', 'some/where', true);

  request.onload = function() {
    let data = JSON.parse(request.responseText);
    let articles = data.slice(idx, idx + 30);
    successCB(articles);
  };

  request.onerror = function() {
    console.log("No good");
  };

  request.send();
};

module.exports = ArticleAPI;
