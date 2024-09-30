const Equipment = require('../models/Equipment');
const User = require('../models/User');
const mongoose = require('mongoose');

// Get all equipment with pagination
exports.getAllEquipment = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query, default to page 1 and limit 10
  try {
    const equipment = await Equipment.find()
      .skip((page - 1) * limit) // Pagination logic
      .limit(parseInt(limit));
    const totalEquipment = await Equipment.countDocuments(); // Total equipment count for pagination

    res.json({
      equipment,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalEquipment / limit),
    });
  } catch (err) {
    console.error('Error fetching all equipment:', err);
    res.status(500).send('Server error');
  }
};

// Get a single piece of equipment by ID
exports.getEquipmentById = async (req, res) => {
  const equipmentId = req.params.id;

  // Check if the equipmentId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
    return res.status(400).json({ message: 'Invalid equipment ID' });
  }

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json({ equipment });
  } catch (error) {
    console.error('Error fetching equipment by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new equipment
exports.createEquipment = async (req, res) => {
  try {
    console.log('Received data for new equipment:', req.body); // Log the received data

    const newEquipment = new Equipment(req.body);
    await newEquipment.save();

    console.log('Equipment created successfully:', newEquipment); // Log success
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error('Error creating equipment:', error); // Log the error
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      res.status(400).json({ message: 'Validation error', error: error.message });
    } else {
      // General server error
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// Update equipment by ID
exports.updateEquipment = async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    console.log('Equipment updated successfully:', updatedEquipment); // Log success
    res.json(updatedEquipment);
  } catch (err) {
    console.error('Error updating equipment:', err); // Log the error
    res.status(500).send('Server error');
  }
};

// Delete equipment by ID
exports.deleteEquipment = async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    console.log('Equipment deleted successfully:', deletedEquipment); // Log success
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error('Error deleting equipment:', err); // Log the error
    res.status(500).send('Server error');
  }
};

// Get summary
exports.getSummary = async (req, res) => {
  try {
    // Calculate total equipment, issued equipment, available equipment
    const totalEquipment = await Equipment.countDocuments();
    const issuedEquipment = await Equipment.countDocuments({ status: "issued" });
    const availableEquipment = totalEquipment - issuedEquipment;

    // Calculate total users
    const totalUsers = await User.countDocuments();

    // Send the summary data to the frontend
    res.json({ totalEquipment, issuedEquipment, availableEquipment, totalUsers });
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).send('Server error');
  }
};

// Get activity overview
exports.getActivity = async (req, res) => {
  try {
    // Your logic to get activity overview, such as recent checkouts/check-ins
    const activityData = await Equipment.find({}).sort({ checkedOutAt: -1 }).limit(10);
    res.json(activityData);
  } catch (err) {
    console.error('Error fetching activity:', err);
    res.status(500).send('Server error');
  }
};

// Get issued equipment
exports.getIssuedEquipment = async (req, res) => {
  try {
    const issuedEquipment = await Equipment.find({ status: "issued" });
    res.json(issuedEquipment);
  } catch (err) {
    console.error('Error fetching issued equipment:', err);
    res.status(500).send('Server error');
  }
};

// Assign equipment to a user
exports.assignEquipment = async (req, res) => {
  const { equipmentId, userId, returnDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(equipmentId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid equipment or user ID' });
  }

  try {
    const equipment = await Equipment.findById(equipmentId);
    const user = await User.findById(userId);

    if (!equipment || !user) {
      return res.status(404).json({ message: 'Equipment or User not found' });
    }

    if (equipment.status === 'issued') {
      return res.status(400).json({ message: 'Equipment is already issued' });
    }

    // Assign the equipment to the user
    equipment.checkedOutBy = user._id;
    equipment.checkedOutAt = new Date();
    equipment.status = 'issued';
    equipment.returnDate = returnDate ? new Date(returnDate) : null;

    await equipment.save();

    // Populate 'checkedOutBy' field to return the user's username
    const populatedEquipment = await equipment.populate('checkedOutBy', 'username');

    res.status(200).json({
      message: 'Equipment assigned successfully',
      equipment: populatedEquipment
    });
  } catch (error) {
    console.error('Error assigning equipment:', error);
    res.status(500).json({ message: 'Error assigning equipment', error });
  }
};

exports.getAssignedEquipment = async (req, res) => {
  try {
    const userId = req.user && req.user._id ? req.user._id : null;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    console.log("User ID from token:", objectId);

    const assignedEquipment = await Equipment.find({ checkedOutBy: objectId });
    console.log("Assigned equipment:", assignedEquipment);

    // Instead of sending a 404, return an empty list if no equipment is assigned
    res.status(200).json({ equipment: assignedEquipment || [] });
  } catch (error) {
    console.error('Error fetching assigned equipment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.returnEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    // Check if equipment exists and is assigned to the current user
    if (!equipment || equipment.checkedOutBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Equipment not found or not assigned to this user' });
    }

    // Mark as returned
    equipment.checkedOutBy = null;  // Clear the assigned user
    equipment.checkedOutAt = null;  // Clear the checkout date
    equipment.status = 'available';  // Mark the equipment as available
    await equipment.save();

    res.json({ message: 'Equipment returned successfully', equipment });
  } catch (error) {
    console.error('Error returning equipment:', error);
    res.status(500).json({ message: 'Error returning equipment', error });
  }
};
