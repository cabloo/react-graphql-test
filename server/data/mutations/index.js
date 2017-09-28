/* @flow */

import { GraphQLObjectType } from 'graphql';
import article from './article';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...article,
  },
});
