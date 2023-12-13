const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
  quoteText: {
    type: String,
  },
  quoteBy: {
    type: String,
  }
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
