const { User, Quote, BalanceTip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    quotes: async () => {
      return Quote.find().populate("quotes");
    },
    balancetips: async () => {
      return BalanceTip.find().populate("balancetips");
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
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        console.log("Server Response:", { token, user });
  
        return { token, user };
      } catch (error) {
        console.error("Server Error:", error);
        throw error; // Ensure errors are thrown so they can be captured by the client
      }
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
