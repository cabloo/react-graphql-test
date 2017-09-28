/* @flow */

import { GraphQLString, GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'A article item',
  fields: {
    id: globalIdField('User', (obj) => obj._id),
    author: {
      type: GraphQLString,
      description: 'The author of the article item',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the article item',
    },
  },
  interfaces: () => [nodeInterface],
});

const {
  connectionType: ArticleConnection,
  edgeType: ArticleEdge,
} = connectionDefinitions({ name: 'Article', nodeType: ArticleType });

function articlesById() {
  
}
function getArticle() {
  
}
registerType(articlesById, ArticleType, getArticle);

module.exports = { ArticleType, ArticleConnection, ArticleEdge };
