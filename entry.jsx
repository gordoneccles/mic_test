const ReactDOM = require('react-dom');
const React = require('react');
const ArticleTable = require('./scripts/components/article_table.jsx');

document.addEventListener("DOMContentLoaded", () => {
    let root = document.getElementById("root");
    ReactDOM.render(<ArticleTable />, root);
});
