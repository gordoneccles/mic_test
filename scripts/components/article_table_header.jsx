const React = require('react');

const ArticleTableHeader = React.createClass({
  getInitialState() {
    return ({ articleCount: this.props.articleCount} );
  },

  sortByWords() {
    this.props.sortByWords();
  },

  sortBySubmitted() {
    this.props.sortBySubmitted();
  },

  render() {
    let count = this.props.articleCount;

    return (
      <li>
        <ul id="article-header">
          <li className="header-item">{`UNPUBLISHED ARTICLES (${count})`}</li>
          <li className="header-item">AUTHOR</li>
          <li className="header-item clickable" onClick={this.sortByWords}>WORDS</li>
          <li className="header-item clickable" onClick={this.sortBySubmitted}>SUBMITTED</li>
        </ul>
      </li>
    );
  }
});

module.exports = ArticleTableHeader;
