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
        <ul id="article-header" className="article-line-item">
          <li className="line-item-summary header-item">{`ARTICLES (${count})`}</li>
          <li className="line-item-author header-item">AUTHOR</li>
          <li className="line-item-words header-item clickable" onClick={this.sortByWords}>WORDS</li>
          <li className="line-item-submitted header-item clickable" onClick={this.sortBySubmitted}>SUBMITTED</li>
        </ul>
      </li>
    );
  }
});

module.exports = ArticleTableHeader;
