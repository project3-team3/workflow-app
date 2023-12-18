const { Schema, model } = require('mongoose');

const userSettingsSchema = new Schema({
  // Other settings fields can be added here
  gridLayout: {
    type: Schema.Types.Mixed, // Store the layout as a JSON object
    default: {}, // Default to an empty object
  },
});

const UserSettings = model('UserSettings', userSettingsSchema);

module.exports = UserSettings;
