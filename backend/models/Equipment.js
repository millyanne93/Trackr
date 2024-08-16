const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  serialNumber: { type: String, unique: true },
  status: { type: String, default: 'available' },
  checkedOutBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkedOutAt: { type: Date },
  imageUrl: { type: String }
});
