const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');

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

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

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


exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notification = new Notification({
      user: user._id, 
      message,
      date: new Date(),
    });
    await notification.save();

    res.status(201).json({ message: 'Notification sent!' });
  } catch (error) {
    console.error('Error sending notification:', error);
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
    const { id: notificationId } = req.params;
    const userId = req.user._id;

    console.log('User ID:', userId);

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
    const { id: notificationId } = req.params; 
    const userId = req.user._id;

    console.log('User ID:', userId);

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

exports.logoutUser = (req, res) => {

  res.status(200).json({ message: 'Logged out successfully' });
};
