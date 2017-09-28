/* @flow */

import { GraphQLID, GraphQLInterfaceType, GraphQLNonNull } from 'graphql';
import { nodeDefinitions } from 'graphql-relay';
import { getNode, getNodeType } from './typeRegistry';

var nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the object.'
      }
    };
  },
  resolveType: getNodeType,
});

var nodeField = {
  name: 'node',
  description: 'Fetches an object given its ID',
  type: nodeInterface,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of an object'
    }
  },
  resolve: function resolve(obj, _ref, context, info) {
    var id = _ref.id;
    return getNode(id, context, info);
  }
};

// nodeInterface is used in the interfaces property of each type
// nodeField is used to set the node property of the root query
module.exports = { nodeInterface, nodeField };
