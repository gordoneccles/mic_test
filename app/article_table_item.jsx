const React = require('react');
const TimeAgo = require('javascript-time-ago');

TimeAgo.locale(require('javascript-time-ago/locales/en'));
require('javascript-time-ago/intl-messageformat-global');
require('intl-messageformat/dist/locale-data/en');

const ArticleTableItem = React.createClass({
    componentDidMount() {
      this.setAuthor();
      this.setSubmittedTime();
    },

    setAuthor() {
      let firstName = this.props.article.profile.first_name;
      let lastName = this.props.article.profile.last_name;
      this.author = `${firstName} ${lastName}`;
    },

    setSubmittedTime() {
      const TimeAgoEnglish = new TimeAgo('en-US');
      this.submittedTime = TimeAgoEnglish.format(this.props.article.publish_at);
    },

    render() {
      return (
        <li className="article-item">
          <ul className="article-item-list">
            <li className="item-title">
              <img src={this.props.article.image} className="article-item-thumb"/>
              {this.props.article.title}
            </li>
            <li className="item-author">{this.author}</li>
            <li className="item-words">{this.props.article.words}</li>
            <li classname="item-submitted">{this.submittedTime}</li>
          </ul>
        </li>
      );
    }
});

module.exports = ArticleTableItem;
