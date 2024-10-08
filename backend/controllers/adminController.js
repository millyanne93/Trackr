const Admin = require('../models/Admin');
const User = require('../models/User');
const Equipment = require('../models/Equipment');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all equipment (admin only)
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete equipment (admin only)
exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
