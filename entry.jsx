const ReactDom = require('react-dom');
const ArticleTable = require('./app/components/article_table.jsx');

document.addEventListener("DOMContentLoaded", () => {
    let root = document.getElementById("root");
    ReactDOM.render(ArticleTable, root);
});
