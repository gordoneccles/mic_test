const ReactDom = require('react-dom');
const ArticleTable = require('./app/components/article-table');

document.addEventListener("DOMContentLoaded", () => {
    let root = document.getElementById("root");
    ReactDOM.render(ArticleTable, root);
});
