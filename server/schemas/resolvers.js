// resolvers.js
const { User, UserSettings, Quote, BalanceTip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const generateRtcToken = require("../utils/agoraTokenGen.js");
const {
  fetchFileList,
  generatePresignedUrl,
  deleteFile,
} = require("../utils/awsS3.js");
const { generateStreamToken } = require("../utils/streamAuth.js");

const resolvers = {
  Query: {
    // Regular queries for the User, Quote, and BalanceTip models
    user: async (__, { username }) => {
      return User.findOne({ username }).populate("settings.gridLayout");
    },
    quotes: async () => {
      return Quote.find().populate("quotes");
    },
    balancetips: async () => {
      return BalanceTip.find().populate("balancetips");
    },
    // Queries for random quotes and tips
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
    // Main query for user settings
    getUserSettings: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const userSettingsID = user.settings;
        const userSettings = await UserSettings.findById(userSettingsID);

        return userSettings;
      } catch (error) {
        throw new Error(`Error fetching user settings: ${error.message}`);
      }
    },
    getFileList: async (_, { username }) => {
      // Fetch file list from S3 for the specified username
      const fileList = await fetchFileList(username);
      return fileList;
    },
    generatePresignedUrl: async (_, { username, fileName }) => {
      try {
        const url = await generatePresignedUrl(username, fileName);
        return url;
      } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        throw new Error("Error generating pre-signed URL");
      }
    },
  },

  Mutation: {
    // Create a new user
    addUser: async (
      __,
      { username, email, password, gridLayout, widgets, agoraUid }
    ) => {
      try {
        // Create a new UserSettings field with default values
        const userSettings = await UserSettings.create({
          gridLayout: JSON.parse(gridLayout),
          widgets: JSON.parse(widgets),
        });

        const user = await User.create({
          username,
          email,
          password,
          settings: userSettings._id,
          agoraUid: agoraUid,
        });

        const token = signToken(user);

        return {
          token,
          user: {
            _id: user._id,
            username: user.username,
            agoraUid: user.agoraUid,
          },
        };
      } catch (error) {
        console.error("Server Error:", error);
        throw error;
      }
    },
    // Login a user
    login: async (__, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError.UserNotFoundError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError.IncorrectPasswordError;
      }

      const token = signToken(user);

      return {
        token,
        user: {
          _id: user._id,
          username: user.username,
          agoraUid: user.agoraUid,
        },
      };
    },
    // Save new grid layout to user settings
    updateGridSettings: async (__, { userId, layouts }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedLayouts = JSON.parse(layouts);

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.gridLayout = parsedLayouts;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save clock analog/digital status to user settings
    updateClockSettings: async (__, { userId, isAnalog }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.isAnalog = isAnalog;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save sticky note text to user settings
    updateStickySettings: async (__, { userId, stickyText }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.stickyText = stickyText;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save notepad text to user settings
    updateNotepadSettings: async (__, { userId, notepadText }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.notepadText = notepadText;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save color theme to user settings
    updateThemeSettings: async (__, { userId, currentTheme }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.currentTheme = currentTheme;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save widgets' active/inactive statuses to user settings
    updateWidgetSettings: async (__, { userId, widgets }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedWidgets = JSON.parse(widgets);

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.widgets = parsedWidgets;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        const newUserSettings = await UserSettings.findById(user.settings);

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save schedule events to user settings
    updateScheduleSettings: async (__, { userId, scheduleEvents }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedScheduleEvents = JSON.parse(scheduleEvents);

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.scheduleEvents = parsedScheduleEvents;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Save kanban tasks to user settings
    updateKanbanSettings: async (__, { userId, kanbanTasks }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedKanbanTasks = JSON.parse(kanbanTasks);

        const userSettings = await UserSettings.findById(user.settings);

        userSettings.kanbanTasks = parsedKanbanTasks;

        await userSettings.save();

        user.settings = userSettings;

        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    // Generate an Agora RTC token for Video Chat
    generateAgoraToken: async (__, { userChannelName, userUid }) => {
      try {
        const token = await generateRtcToken(userChannelName, userUid);

        return { token };
      } catch (error) {
        console.error("Error generating RTC token:", error.message);
        throw error;
      }
    },
    // Delete a file from S3
    deleteFile: async (__, { username, fileName }) => {
      return deleteFile(username, fileName);
    },
    // Generate a Stream token for Text Chat
    generateStreamToken: async (__, { username }) => {
      console.log("[resolvers.js] In generateStreamToken. username:", username)
      try {
        const token = await generateStreamToken(username);
        console.log("[resolvers.js] Generated Stream token? token:", token)
        return token;
      } catch (error) {
        console.error("Error generating Stream token:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
