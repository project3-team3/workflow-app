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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    quotes: [Quote]
    tips: [BalanceTip]
    randomQuote: Quote
    randomTip: BalanceTip
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
