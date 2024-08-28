const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    let user = new User({ username, password, role });
    await user.save();

    // Generate JWT token using the model method
    const token = await user.generateAuthToken();

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error: ' + err.message });
    } else if (err.code === 11000) {
      return res.status(400).json({ message: 'Username already exists.' });
    } else {
      return res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await user.generateAuthToken();

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.logoutUser = (req, res) => {
  // Invalidate the token (client-side will handle token removal)
  res.status(200).json({ message: 'Logged out successfully' });
};
