const { Schema, model } = require("mongoose");

const userSettingsSchema = new Schema({
  gridLayout: {
    type: Schema.Types.Mixed,
    default: {},
  },
  isAnalog: {
    type: Boolean,
    default: false,
  },
  stickyText: {
    type: String,
    default: "",
  },
  notepadText: {
    type: String,
    default: "",
  },
  currentTheme: {
    type: String,
    default: "default-mode-wf",
  },
  widgets: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  scheduleEvents: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  kanbanTasks: {
    type: [Schema.Types.Mixed],
    default: [],
  },
});

const UserSettings = model("UserSettings", userSettingsSchema);

module.exports = UserSettings;
