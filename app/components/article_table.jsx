const React = require('react');
const ArticleTableItem = require('./article_table_item.jsx');
const ArticleTableHeader = require('./article_table_header.jsx');
const ArticleActions = require('../actions/article_actions.js');

const ArticleTable = React.createClass({
  getInitialState() {
    let articles = ArticlesStore.getBatch();
    return( { articles: articles });
  },

  componentDidMount() {
    this.listener = ArticlesStore.addListener(this.refreshArticles);
    ArticleActions.fetchBatch();
  },

  render() {
    let articles = this.state.articles.map( article =>
      <ArticleTableItems article={article} />
    );

    return (
      <ul id="article-table">
        <ArticleTableHeader sortByWords={this.sortByWords} sortBySubmitted={this.sortBySubmitted}
          articleCount={this.state.articles.length}
        />

        { articles }
      </ul>
    );
  }
});

module.exports = ArticleTable;
