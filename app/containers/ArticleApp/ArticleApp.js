/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ArticleList from './components/ArticleList';

type Props = {
  user: {
    id: any,
    articles: Array,
  },
};

/**
 * Container for article application
 * Parent component: N/A
 * Child components: ArticleList, ArticleForm
 */
class ArticleApp extends React.Component {

  props: Props;

  render() {
    return (
      <div className="article-app-component">
        <h1>Article App</h1>
        <ArticleList articles={this.props.user.articles} user={this.props.user}/>
      </div>
    );
  }
}

exports.ArticleApp = ArticleApp;

export default Relay.createContainer(ArticleApp, {
  fragments: {
    user: () => Relay.QL` 
      fragment on User {
        id
        articles(first: 1000) {
          ${ArticleList.getFragment('articles')}
        }
        ${ArticleList.getFragment('user')}
      }
      `,
  },
});
