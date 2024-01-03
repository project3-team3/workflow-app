import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        agoraUid
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $gridLayout: String!, $widgets: String!, $agoraUid: Int!) {
    addUser(username: $username, email: $email, password: $password, gridLayout: $gridLayout, widgets: $widgets, agoraUid: $agoraUid) {
      token
      user {
        _id
        username
        agoraUid
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

export const UPDATE_SCHEDULE_SETTINGS = gql`
  mutation updateScheduleSettings($userId: ID!, $scheduleEvents: String!) {
    updateScheduleSettings(userId: $userId, scheduleEvents: $scheduleEvents) {
      scheduleEvents {
        id
        title
        date
        time
        completed
      }
    }
  }
`;

export const UPDATE_KANBAN_SETTINGS = gql`
  mutation updateKanbanSettings($userId: ID!, $kanbanTasks: String!) {
    updateKanbanSettings(userId: $userId, kanbanTasks: $kanbanTasks) {
      kanbanTasks {
        id
        content
        status
      }
    }
  }
`;

export const GENERATE_AGORA_TOKEN = gql`
  mutation generateAgoraToken($userChannelName: String!, $userUid: Int!) {
    generateAgoraToken(userChannelName: $userChannelName, userUid: $userUid) {
      token
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($username: String!, $fileName: String!) {
    deleteFile(username: $username, fileName: $fileName)
  }
`;