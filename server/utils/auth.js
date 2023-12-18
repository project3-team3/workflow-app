const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// TODO: Remove default secret and expiration prior to deployment
const secret = process.env.JWT_SECRET || 'defaultSecret';
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Username not found. Please sign up to create a new account.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id, settings }) {
    const payload = { email, username, _id, settings };
    console.log('Payload:', payload);
    return jwt.sign({ user: payload }, secret, { expiresIn: expiration });
  },
};
