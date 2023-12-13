const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const model = models[modelName];
    if (!model) {
      console.error(`Model '${modelName}' not found.`);
      return;
    }

    const collections = await db.db.listCollections().toArray();
    const existingCollection = collections.find(c => c.name === collectionName);

    if (existingCollection) {
      await db.collections[collectionName].drop();
      console.log(`Collection '${collectionName}' dropped.`);
    } else {
      console.log(`Collection '${collectionName}' not found.`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
