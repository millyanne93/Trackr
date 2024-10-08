const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');

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
      },
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
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all users (with pagination for admin)
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Results per page, default to 10
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(); // Total number of users

    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// usersController.js

exports.getUserProfile = async (req, res) => {
  try {
    // req.user is set by your auth middleware after verifying the token
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details (excluding sensitive fields like password)
    res.json({
      _id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      // Include other user details if necessary
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId); // Use userId to find the user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save the notification
    const notification = new Notification({
      user: user._id, // Store user ID, not username, to maintain relations
      message,
      date: new Date(),
    });
    await notification.save();

    res.status(201).json({ message: 'Notification sent!' });
  } catch (error) {
    console.error('Error sending notification:', error); // Log the error
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
};

exports.getNotificationsForUser = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id: notificationId } = req.params; // Extract notificationId from URL params
    const userId = req.user._id;

    console.log('User ID:', userId);

    // Find the notification by ID and user
    const notification = await Notification.findOne({ _id: notificationId, user: userId });
    console.log('Notification found:', notification);

    if (!notification) {
      return res.status(404).json({ message: 'No notification found' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const { id: notificationId } = req.params; // Extract notificationId from the URL params
    const userId = req.user._id;

    console.log('User ID:', userId);

    // Find and delete the notification by ID and user
    const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
    console.log('Notification deleted:', notification);

    if (!notification) {
      return res.status(404).json({ message: 'No notification found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully', notificationId });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update user details (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  // Invalidate the token (client-side will handle token removal)
  res.status(200).json({ message: 'Logged out successfully' });
};
