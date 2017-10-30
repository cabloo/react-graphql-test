/* @flow */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import { schema } from './data/schema';
import { MongoClient } from 'mongodb';
import DB from './data/database';

const PORT = process.env.PORT || 8080;
const app = express();

MongoClient.connect('mongodb://localhost:27018/test', (err, db) => {
  if (err) {
    throw err;
  }

  DB.instance = db;
});

// Start HTTP server
app.use('/graphql', graphQLHTTP({ schema, pretty: true, graphiql: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`HTTP Server listening on port ${PORT}`); // eslint-disable-line no-console
});
