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
    agoraUid: Int!
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

  type WidgetTuple {
    name: String
    active: Boolean
  }

  type ScheduleEvent {
    id: Int
    title: String
    date: String
    time: String
    completed: Boolean
  }

  type KanbanTask {
    id: String
    content: String
    status: String
  }

  type UserSettings {
    _id: ID!
    gridLayout: GridLayout
    isAnalog: Boolean
    stickyText: String
    notepadText: String
    currentTheme: String
    widgets: [WidgetTuple]
    scheduleEvents: [ScheduleEvent]
    kanbanTasks: [KanbanTask]
  }

  type Auth {
    token: ID!
    user: User
  }

  type AgoraToken {
    token: String!
  }

  type Query {
    quotes: [Quote]
    balancetips: [BalanceTip]
    users: [User]
    user(username: String!): User
    getUserSettings(userId: ID!): UserSettings
    randomQuote: Quote
    randomTip: BalanceTip
    widgets: [WidgetTuple]
    getFileList(username: String!): [String]
    generatePresignedUrl(username: String!, fileName: String!): String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, gridLayout: String!, widgets: String!, agoraUid: Int!): Auth
    login(username: String!, password: String!): Auth
    updateGridSettings(userId: ID!, layouts: String!): UserSettings
    updateClockSettings(userId: ID!, isAnalog: Boolean!): UserSettings
    updateStickySettings(userId: ID!, stickyText: String!): UserSettings
    updateNotepadSettings(userId: ID!, notepadText: String!): UserSettings
    updateThemeSettings(userId: ID!, currentTheme: String!): UserSettings
    updateWidgetSettings(userId: ID!, widgets: String!): UserSettings
    updateScheduleSettings(userId: ID!, scheduleEvents: String!): UserSettings
    updateKanbanSettings(userId: ID!, kanbanTasks: String!): UserSettings
    generateAgoraToken(userChannelName: String!, userUid: Int!): AgoraToken
    deleteFile(username: String!, fileName: String!): Boolean
  }
`;

module.exports = typeDefs;
