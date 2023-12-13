const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// TODO: Remove default secret and expiration prior to deployment
const secret = process.env.JWT_SECRET || 'defaultSecret';
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  AuthenticationError: new GraphQLError('--- USER AUTHENTICATION FAILED ---', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
