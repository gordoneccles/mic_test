import { Router, Route, hashHistory } from 'react-router';
const ReactDOM = require('react-dom');
const React = require('react');
const ArticleTable = require('./components/article_table.jsx');

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={ArticleTable} />
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
    let root = document.getElementById("root");
    ReactDOM.render(routes, root);
});
