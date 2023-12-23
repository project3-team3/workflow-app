import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $gridLayout: String!
    $widgets: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      gridLayout: $gridLayout
      widgets: $widgets
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_GRID_SETTINGS = gql`
  mutation updateGridSettings($userId: ID!, $layouts: String!) {
    updateGridSettings(userId: $userId, layouts: $layouts) {
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

export const UPDATE_CLOCK_SETTINGS = gql`
  mutation updateClockSettings($userId: ID!, $isAnalog: Boolean!) {
    updateClockSettings(userId: $userId, isAnalog: $isAnalog) {
      isAnalog
    }
  }
`;

export const UPDATE_STICKY_SETTINGS = gql`
  mutation updateStickySettings($userId: ID!, $stickyText: String!) {
    updateStickySettings(userId: $userId, stickyText: $stickyText) {
      stickyText
    }
  }
`;

export const UPDATE_NOTEPAD_SETTINGS = gql`
  mutation updateNotepadSettings($userId: ID!, $notepadText: String!) {
    updateNotepadSettings(userId: $userId, notepadText: $notepadText) {
      notepadText
    }
  }
`;

export const UPDATE_THEME_SETTINGS = gql`
  mutation updateThemeSettings($userId: ID!, $currentTheme: String!) {
    updateThemeSettings(userId: $userId, currentTheme: $currentTheme) {
      currentTheme
    }
  }
`;

export const UPDATE_WIDGET_SETTINGS = gql`
  mutation updateWidgetSettings($userId: ID!, $widgets: String!) {
    updateWidgetSettings(userId: $userId, widgets: $widgets) {
      _id
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
      isAnalog
      stickyText
      notepadText
      currentTheme
      widgets {
        name
        active
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
