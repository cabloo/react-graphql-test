/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from 'components/ListItem';

type Article = {
  id: string,
  title: string;
  author: string;
};

type Props = {
  article: Article,
};

/**
 * ListItem wrapper for ArticleList implementation
 * Parent component: ArticleList
 * Child component: ListItem
 */
class ArticleItem extends React.Component {

  props: Props;

  render() {
    const {
      title,
      author,
      id,
    } = this.props.article;

    return (
      <ListItem
        title={title}
        author={author}
        id={id}
      />
    );
  }
}

exports.ArticleItem = ArticleItem;

export default Relay.createContainer(ArticleItem, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {
        id
        author
        title
      }
    `,
  },
});
