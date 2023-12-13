const typeDefs = `
  type Quote {
    _id: ID
    quoteText: String
    quoteBy: String
  }

  type BalanceTip {
    _id: ID
    tipText: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    quotes: [Quote]
    tips: [BalanceTip]
    users: [User]
    user(username: String!): User
    randomQuote: Quote
    randomTip: BalanceTip
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
