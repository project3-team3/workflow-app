const models = require('../models');
const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    const model = models[modelName];
    if (!model) {
      console.error(`Model '${modelName}' not found.`);
      return;
    }

    try {
      await mongoose.model(modelName).deleteMany({});
      console.log(`Collection ${collectionName} dropped successfully.`);
    } catch (err) {
      console.error(`Error dropping collection ${collectionName}:`, err);
      throw err;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};