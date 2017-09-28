/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { connectionDefinitions, globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import { ArticleConnection } from "./articleType";
import DB from '../database';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user with access to articles',
  fields: {
    id: globalIdField('User', (obj) => obj._id),
    articles: {
      type: ArticleConnection,
      description: 'The articles visible for a user',
      args: connectionArgs,
      resolve: async (source, args, context, info) => {
        return DB.instance
          .collection('articles')
          .find()
          .toArray()
          .then((results) => {
            return connectionFromArray(results, args);
          });
      }
    },
  },
  interfaces: () => [nodeInterface],
});

const VIEWER = 1;
const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({ name: 'User', nodeType: UserType });

function usersById() {
  return [getUser()];
}
function getUser() {
  return {
    id: VIEWER,
  };
}

registerType(usersById, UserType, getUser);

module.exports = { UserType, UserConnection, UserEdge, getUser };