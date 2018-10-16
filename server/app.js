const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());
//connect to mlab database
mongoose.connect('mongodb://ross:pass1234@ds221003.mlab.com:21003/gql-ross')
mongoose.connection.once('open',() => {
  console.log('connected to database');
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000')
})