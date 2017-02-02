/* @flow */

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
  fromGlobalId,
} from 'graphql-relay';

import { userType } from '../types/userType';
import { TodoEdge, todoType } from '../types/todoType';
import {
  addTodo,
  getTodo,
  getNumTodos,
  getViewer,
  removeTodo,
  updateTodo,
} from '../database';

const addTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    newTodoEdge: {
      type: TodoEdge,
      resolve: async ({ localTodoId }) => {
        const todo = await getTodo(localTodoId);
        const numTodos = await getNumTodos();
        return {
          cursor: offsetToCursor(numTodos - 1),
          node: todo,
        };
      },
    },
    user: {
      type: userType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: async ({ content }) => {
    const localTodoId = await addTodo(content);
    return {
      localTodoId,
    };
  },
});

const removeTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    user: {
      type: userType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    const localTodoId = fromGlobalId(id).id;
    removeTodo(localTodoId);
    return {
      id,
    };
  },
});

const updateTodoMutation = mutationWithClientMutationId({
  name: 'UpdateTodo',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    todo: {
      type: todoType,
      resolve: async ({ localTodoId }) => getTodo(localTodoId),
    },
  },
  mutateAndGetPayload: ({ id, content }) => {
    const localTodoId = fromGlobalId(id).id;
    updateTodo(localTodoId, content);
    return {
      localTodoId,
    };
  },
});

export default {
  addTodo: addTodoMutation,
  removeTodo: removeTodoMutation,
  updateTodo: updateTodoMutation,
};
