import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
import casual from 'casual';
import schemaString from './schema.graphql';

casual.seed(123);

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

const mocks = {
  ArticleConnection: () => ({
    edges: () => new MockList(10),
  }),
  Article: () => ({
    id: () => casual.integer(0, 1000).toString(),
    title: () => casual.string,
    author: () => casual.string,
  }),
};

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema, mocks });

const query = `
query ArticleList {
  articles(first: 10) {
    edges {
      node {
        id
        title
        author
      }
    }
  }
}
`;

graphql(schema, query).then(result => { console.log('Got result', result, result.data.articles.edges)}); // eslint-disable-line
