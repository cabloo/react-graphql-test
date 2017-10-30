/* @flow */
/* eslint class-methods-use-this: "off" */

import Relay from 'react-relay';

export default class AddArticleMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{ addArticle }`;
  }

  getVariables() {
    return {
      title: this.props.title,
      author: this.props.author,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddArticlePayload @relay(plural: true) {
        user {
          articles(last: 1000) {
            edges {
              node {
                id
                author
                title
              }
            }
          }
        }
        newArticleEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'articles',
      edgeName: 'newArticleEdge',
      rangeBehaviors: {
        '': 'append',
        'orederby(oldes)': 'prepend',
      },
    }];
  }

  getOptimisticResponse() {
    return {
      newArticleEdge: {
        node: {
          title: this.props.title,
          author: this.props.author,
        },
      },
    };
  }
}
