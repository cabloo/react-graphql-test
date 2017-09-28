/* @flow */

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
  fromGlobalId,
} from 'graphql-relay';

import {ArticleEdge} from '../types/articleType';
import DB, {Article} from '../database';
import articles from '../queries/user';
import {getUser, UserType} from "../types/userType";

const addArticleMutation = mutationWithClientMutationId({
  name: 'AddArticle',
  inputFields: {
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: () => getUser(),
    },
    newArticleEdge: {
      type: ArticleEdge,
      resolve: async ({localArticleId}) => {
        let numArticles;
        return DB.instance.collection('articles').count().then((count) => {
          numArticles = count;

          return DB.instance.collection('articles').findOne({
            _id: localArticleId,
          });
        }).then(function (result) {
          // Note on offsetToCursor
          // WARNING: 'cursorForObjectInConnection' returns null and causes
          // mutation to fail here b/c it uses indexOf. See:
          // <https://github.com/graphql/graphql-relay-js/issues/29>
          if (!result) {
            console.error('Failed finding recent insert: '+localArticleId);
          }

          return {
            cursor: offsetToCursor(numArticles - 1),
            node: result,
          };
        });
      },
    },
  },
  mutateAndGetPayload: (article: Article) => {
    return DB.instance.collection('articles').insertOne(article).then((result) => {
      const localArticleId = result.insertedId;
      return {
        localArticleId,
      };
    });
  },
});

export default {
  addArticle: addArticleMutation,
};
