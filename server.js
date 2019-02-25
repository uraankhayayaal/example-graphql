var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema');

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4001, () => console.log('Now browse to localhost:4000/graphql'));