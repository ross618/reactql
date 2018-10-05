const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
// var books = [
//   { name: 'Test1', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'Test2', genre: 'Sci-Fi', id: '2', authorId: '2' },
//   { name: 'Test3', genre: 'Fiction', id: '3', authorId: '3' },
//   { name: 'Test4', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'Test5', genre: 'Sci-Fi', id: '5', authorId: '3' },
//   { name: 'Test6', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//   { name: 'Author1', age: 44, id: '1' },
//   { name: 'Author2', age: 50, id: '2' },
//   { name: 'Author3', age: 26, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args){
        //console.log(parent);
        //return _.find(authors, { id: parent.authorId });
      }
    },
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get datta from db / other source
        //console.log(typeof(args.id));
        //return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        //return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //return authors;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})