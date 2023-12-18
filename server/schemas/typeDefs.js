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
    _id: ID!
    username: String!
    email: String!
    settings: UserSettings
  }

  type GridItem {
    i: String
    x: Int
    y: Int
    w: Int
    h: Int
    minH: Int
    minW: Int
    autosize: Boolean
  }

  type GridLayout {
    lg: [GridItem]
    md: [GridItem]
    sm: [GridItem]
    xs: [GridItem]
  }

  type UserSettings {
    _id: ID!
    gridLayout: GridLayout
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    quotes: [Quote]
    balancetips: [BalanceTip]
    users: [User]
    user(username: String!): User
    getUserSettings(userId: ID!): UserSettings
    randomQuote: Quote
    randomTip: BalanceTip
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, gridLayout: String!): Auth
    login(username: String!, password: String!): Auth
    updateUserSettings(userId: ID!, layouts: String!): UserSettings
  }
`;

module.exports = typeDefs;
