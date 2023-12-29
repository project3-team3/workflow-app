const { User, UserSettings, Quote, BalanceTip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (__, { username }) => {
      return User.findOne({ username }).populate("settings.gridLayout");
    },
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
    }
  },

  Mutation: {
    addUser: async (__, { username, email, password, gridLayout, widgets }) => {
      try {
        // Create a new UserSettings document
        const userSettings = await UserSettings.create({
          gridLayout: JSON.parse(gridLayout),
          widgets: JSON.parse(widgets),
        });

        // Create the user with the reference to the UserSettings document
        const user = await User.create({
          username,
          email,
          password,
          settings: userSettings._id,
        });

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error("Server Error:", error);
        throw error;
      }
    },
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

      return { token, user };
    },
    updateGridSettings: async (__, { userId, layouts }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Parse the layouts string
        const parsedLayouts = JSON.parse(layouts);

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.gridLayout = parsedLayouts;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateClockSettings: async (__, { userId, isAnalog }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.isAnalog = isAnalog;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateStickySettings: async (__, { userId, stickyText }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.stickyText = stickyText;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateNotepadSettings: async (__, { userId, notepadText }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.notepadText = notepadText;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateThemeSettings: async (__, { userId, currentTheme }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.currentTheme = currentTheme;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateWidgetSettings: async (__, { userId, widgets }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedWidgets = JSON.parse(widgets);

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.widgets = parsedWidgets;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        const newUserSettings = await UserSettings.findById(user.settings);

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateScheduleSettings: async (__, { userId, scheduleEvents }) => {
      try {

        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        const parsedScheduleEvents = JSON.parse(scheduleEvents);

        // Get the UserSettings document
        const userSettings = await UserSettings.findById(user.settings);

        // Update the gridLayout property in UserSettings
        userSettings.scheduleEvents = parsedScheduleEvents;

        // Save changes to UserSettings
        await userSettings.save();

        user.settings = userSettings;

        // Save the user
        await user.save();

        const newUserSettings = await UserSettings.findById(user.settings);

        return user.settings;
      } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Error updating user settings");
      }
    },
    updateKanbanSettings: async (__, { userId, kanbanTasks }) => {
      try {
          
          console.log("In updateKanbanSettings resolver!");
  
          const user = await User.findById(userId);
  
          if (!user) {
            throw new Error("User not found");
          }
  
          const parsedKanbanTasks = JSON.parse(kanbanTasks);
  
          // Get the UserSettings document
          const userSettings = await UserSettings.findById(user.settings);
  
          // Update the gridLayout property in UserSettings
          userSettings.kanbanTasks = parsedKanbanTasks;
  
          // Save changes to UserSettings
          await userSettings.save();
  
          user.settings = userSettings;
  
          // Save the user
          await user.save();
  
          const newUserSettings = await UserSettings.findById(user.settings);
  
          console.log("Updated userSettings in resolver?", JSON.stringify(newUserSettings.kanbanTasks));
  
          return user.settings;
      } catch (error) {
          console.error("Error updating user settings:", error);
          throw new Error("Error updating user settings");
      }
    }
  },
};

module.exports = resolvers;
