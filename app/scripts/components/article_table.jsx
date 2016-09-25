const React = require('react');
const ArticleTableItem = require('./article_table_item.jsx');
const ArticleTableHeader = require('./article_table_header.jsx');
const ArticleActions = require('../actions/article_actions.js');
const ArticleStore = require('../stores/article_store.js');

const ArticleTable = React.createClass({
  getInitialState() {
    this.LOAD_COUNT = 10;
    this.PULL_COUNT = 30;
    return( { articles: [] });
  },

  componentDidMount() {
    ArticleActions.fetchArticles(this.state.articles.length, this.PULL_COUNT, this.showMore);
  },

  sorting() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)sorting\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  },

  sort(articles) {
    if (this.sorting() === "") {
      return articles;
    } else if (this.sorting().includes("words")) {
      return this.sortByWords(articles);
    } else {
      return this.sortBySubmitted(articles);
    }
  },

  sortByWords(articles) {
    articles = articles.sort((a, b) => {
      if (this.sorting() === "wordsAsc") {
        return a.words - b.words;
      } else {
        return b.words - a.words;
      }
    });

    return articles;
  },

  sortBySubmitted(articles) {
    let aSubmitted, bSubmitted;

    articles = articles.sort((a, b) => {
      aSubmitted = Date.parse(a.publish_at);
      bSubmitted = Date.parse(b.publish_at);

      if (this.sorting() === "submittedAsc") {
        return aSubmitted - bSubmitted;
      } else {
        return bSubmitted - aSubmitted;
      }
    });

    return articles;
  },

  toggleWordSorting() {
    document.cookie = (this.sorting() === "wordsAsc") ? ("sorting=wordsDesc") : ("sorting=wordsAsc");
    let articles = this.sort(this.state.articles);
    this.setState({ articles: articles });
  },

  toggleSubmittedSorting() {
    document.cookie = (this.sorting() === "submittedAsc") ? ("sorting=submittedDesc") : ("sorting=submittedAsc");
    let articles = this.sort(this.state.articles);
    this.setState({ articles: articles });
  },

  showMore() {
    let newArticles = ArticleStore.articlesSlice(this.state.articles.length, this.LOAD_COUNT);
    newArticles = this.sort(newArticles);
    let articles = this.state.articles.concat(newArticles);
    this.setState({ articles: articles });

    if (this.state.articles.length + this.LOAD_COUNT >= ArticleStore.count()) {
      ArticleActions.fetchArticles(this.state.articles.length + this.LOAD_COUNT, this.PULL_COUNT);
    }
  },

  render() {
    let articles = this.state.articles.map( article =>
      <ArticleTableItem article={article} key={article.id}/>
    );

    return (
      <ul id="article-table">
        <ArticleTableHeader
          sortByWords={this.toggleWordSorting}
          sortBySubmitted={this.toggleSubmittedSorting}
          articleCount={this.state.articles.length}
        />

        { articles }

        <li id="show-more-button" className="article-line-item clickable" onClick={this.showMore}>Load More</li>
      </ul>
    );
  }
});

module.exports = ArticleTable;
