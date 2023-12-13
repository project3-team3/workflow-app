const { Schema, model } = require('mongoose');

const tipSchema = new Schema({
  tipText: {
    type: String,
  }
});

const BalanceTip = model('BalanceTip', tipSchema);

module.exports = BalanceTip;
