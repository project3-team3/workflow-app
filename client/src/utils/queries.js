import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_QUOTES = gql`
  query getQuotes {
    quotes {
      _id
      quoteText
      quoteBy
    }
  }
`;

export const QUERY_RANDOM_QUOTE = gql`
  query getRandomQuote {
    randomQuote {
      _id
      quoteText
      quoteBy
    }
  }
`;

export const QUERY_TIPS = gql`
  query getTips {
    tips {
      _id
      tipText
    }
  }
`;

export const QUERY_RANDOM_TIP = gql`
  query getRandomTip {
    randomTip {
      _id
      tipText
    }
  }
`;
