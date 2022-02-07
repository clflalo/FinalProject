const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
  _id: String
  title: String!
  description: String
  createdAt: String
  updatedAt: String
  tasks: [Task!]!
}
type Task {
  _id: String
  categoryid: String
  description: String!
  deadline: String!
  done: Boolean
  important: Boolean
  createdAt: String
  updatedAt: String
  createdBy: String
}

  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    category(id: String!): Category
    tasks: [Task!]!
    task(id:String!): Task
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addCategory(title: String!, description: String): Category
    addTask(categoryid: String, description: String!, deadline: String!, done: Boolean, important: Boolean): Task
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
