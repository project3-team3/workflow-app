const { Quote, BalanceTip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    quotes: async () => {
      return Quote.find().populate("quotes");
    },
    tips: async () => {
      return BalanceTip.find().populate("tips");
    },
    randomQuote: async () => {
      const quotes = await Quote.find();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    },
    randomTip: async () => {
      const tips = await BalanceTip.find();
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    },
  },

  Mutation: {
    addUser: async (__, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (__, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
