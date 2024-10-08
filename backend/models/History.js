const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowedAt: { type: Date, required: true },
  returnedAt: { type: Date }
});

module.exports = mongoose.model('History', historySchema);
