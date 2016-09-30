const React = require('react');
const ArticleTableItem = require('./article_table_item.jsx');
const ArticleTableHeader = require('./article_table_header.jsx');
const ArticleAPI = require('../apis/article_api.js');

const ArticleTable = React.createClass({
  getInitialState() {
    this.LOAD_COUNT = 10;
    this.PULL_COUNT = 30;
    this.articles = [];
    return( { articles: [] });
  },

  componentDidMount() {
    let that = this;
    ArticleAPI.fetchArticles(this.displayedCount(), this.PULL_COUNT)
                .then( articles => {
                    that.receiveArticles(articles);
                    that.showMore();
                }, error => {
                    console.error("Well, I tried", error);
                });
  },

  receiveArticles(articles) {
      this.articles = this.articles.concat(articles);
  },

  sorting() {
    return window.localStorage.getItem("sorting") || "";
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

  displayedCount() {
    return this.state.articles.length;
  },

  toggleWordSorting() {
    let sorting = (this.sorting() === "wordsAsc") ? ("wordsDesc") : ("wordsAsc");
    window.localStorage.setItem("sorting", sorting);
    let articles = this.sort(this.state.articles);
    this.setState({ articles: articles });
  },

  toggleSubmittedSorting() {
    let sorting = (this.sorting() === "submittedAsc") ? ("submittedDesc") : ("submittedAsc");
    window.localStorage.setItem("sorting", sorting);
    let articles = this.sort(this.state.articles);
    this.setState({ articles: articles });
  },

  showMore() {
    let newArticles = this.articles.slice(this.displayedCount(), this.displayedCount() + this.LOAD_COUNT);
    newArticles = this.sort(newArticles);
    let articles = this.state.articles.concat(newArticles);
    this.setState({ articles: articles });

    if (this.displayedCount() + this.LOAD_COUNT >= this.articles.length) {
      let that = this;
      ArticleAPI.fetchArticles(this.displayedCount() + this.LOAD_COUNT, this.PULL_COUNT)
                  .then( articles => {
                      that.receiveArticles(articles);
                  }, error => {
                      console.error("Well, I tried", error);
      });
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
          articleCount={this.displayedCount()}
        />

        { articles }

        <li id="show-more-button" className="article-line-item clickable" onClick={this.showMore}>Load More</li>
      </ul>
    );
  }
});

module.exports = ArticleTable;
