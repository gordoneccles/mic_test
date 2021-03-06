const React = require('react');

// for handling turning a date into a 'time ago' string
const TimeAgo = require('javascript-time-ago');
TimeAgo.locale(require('javascript-time-ago/locales/en'));
require('javascript-time-ago/intl-messageformat-global');
require('intl-messageformat/dist/locale-data/en');

const ArticleTableItem = React.createClass({
    setAuthor() {
      let firstName = this.props.article.profile.first_name;
      let lastName = this.props.article.profile.last_name;
      this.author = `${firstName} ${lastName}`;
      return this.author;
    },

    setSubmittedTimeAgo() {
      const TimeAgoEnglish = new TimeAgo('en-US');
      let publishDate = new Date(this.props.article.publish_at);
      this.submittedTimeAgo = TimeAgoEnglish.format(publishDate);
      return this.submittedTimeAgo;
    },

    render() {
      return (
        <li>
          <ul className="article-line-item">
            <li className="line-item-summary body-item">
              <div className="line-item-thumbnail">
                <a href={this.props.article.url} target="_blank"><img src={this.props.article.image} /></a>
              </div>
              <a href={this.props.article.url} target="_blank"><span className="line-item-title">{this.props.article.title}</span></a>
            </li>
            <li className="line-item-author body-item"><a href="#">{this.author || this.setAuthor()}</a></li>
            <li className="line-item-words body-item">{this.props.article.words}</li>
            <li className="line-item-submitted body-item">{this.submittedTimeAgo || this.setSubmittedTimeAgo()}</li>
          </ul>
        </li>
      );
    }
});

module.exports = ArticleTableItem;
