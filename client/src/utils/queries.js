import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      settings {
        _id
        gridLayout
      }
    }
  }
`;

export const QUERY_USER_SETTINGS = gql`
  query getUserSettings($userId: ID!) {
    getUserSettings(userId: $userId) {
      _id
      isAnalog
      stickyText
      notepadText
      currentTheme
      widgets {
        name
        active
      }
      gridLayout {
        lg {
          i
          x
          y
          w
          h
          minH
          minW
          autosize
        }
        md {
          i
          x
          y
          w
          h
          minH
          minW
          autosize
        }
        sm {
          i
          x
          y
          w
          h
          minH
          minW
          autosize
        }
        xs {
          i
          x
          y
          w
          h
          minH
          minW
          autosize
        }
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
