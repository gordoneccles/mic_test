const React = require('react');
const ArticleTableItem = require('./article_table_item.jsx');
const ArticleTableHeader = require('./article_table_header.jsx');
const ArticleActions = require('../actions/article_actions.js');
const ArticleStore = require('../stores/article_store.js');

const ArticleTable = React.createClass({
  getInitialState() {
    this.PULL_COUNT = 10;
    this.INITIAL_PULL_COUNT = 30;
    this.currentIdx = 0;
    return( { articles: [], sorting: undefined });
  },

  componentDidMount() {
    this.listener = ArticleStore.addListener(this.refreshArticles);
    ArticleActions.fetchBatch(this.currentIdx, this.INITIAL_PULL_COUNT);
  },

  refreshArticles() {
    let articles = ArticleStore.getArticles(this.currentIdx, this.PULL_COUNT);
    this.currentIdx += 10;
    articles = this.state.articles.concat(articles);
    this.setState({ articles: articles });
  },

  sortByWords() {
    let articles = this.state.articles;
    let sorting = (this.state.sorting === "wordsAsc") ? ("wordsDesc") : ("wordsAsc");

    articles = articles.sort((a, b) => {
      if (sorting === "wordsAsc") {
        return a.words - b.words;
      } else {
        return b.words - a.words;
      }
    });

    this.setState({ articles: articles, sorting: sorting });
  },

  sortBySubmitted() {
    let articles = this.state.articles;
    let sorting = (this.state.sorting === "submittedDesc") ? ("submittedAsc") : ("submittedDesc");
    let aSubmitted, bSubmitted;

    articles = articles.sort((a, b) => {
      aSubmitted = Date.parse(a.publish_at);
      bSubmitted = Date.parse(b.publish_at);

      if (sorting === "submittedAsc") {
        return aSubmitted - bSubmitted;
      } else {
        return bSubmitted - aSubmitted;
      }
    });

    this.setState({ articles: articles, sorting: sorting });
  },

  loadMore() {
    ArticleActions.fetchBatch(this.currentIdx, this.PULL_COUNT);
  },

  render() {
    debugger
    let articles = this.state.articles.map( article =>
      <ArticleTableItem article={article} key={article.id}/>
    );

    return (
      <ul id="article-table">
        <ArticleTableHeader sortByWords={this.sortByWords} sortBySubmitted={this.sortBySubmitted}
          articleCount={this.state.articles.length}
        />

        { articles }

        <li id="load-more-button" className="article-line-item clickable" onClick={this.loadMore}>load more</li>
      </ul>
    );
  }
});

module.exports = ArticleTable;
