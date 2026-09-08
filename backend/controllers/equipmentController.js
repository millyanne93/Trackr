const Equipment = require('../models/Equipment');
const User = require('../models/User');
const mongoose = require('mongoose');
const History = require('../models/History');

exports.getAllEquipment = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const equipment = await Equipment.find()
      .skip((page - 1) * limit) 
      .limit(parseInt(limit));
    const totalEquipment = await Equipment.countDocuments();

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

exports.getEquipmentById = async (req, res) => {
  const equipmentId = req.params.id;

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

exports.createEquipment = async (req, res) => {
  try {
    console.log('Received data for new equipment:', req.body); 

    const newEquipment = new Equipment(req.body);
    await newEquipment.save();

    console.log('Equipment created successfully:', newEquipment);
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error('Error creating equipment:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation error', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    console.log('Equipment updated successfully:', updatedEquipment); 
    res.json(updatedEquipment);
  } catch (err) {
    console.error('Error updating equipment:', err); 
    res.status(500).send('Server error');
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    console.log('Equipment deleted successfully:', deletedEquipment);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error('Error deleting equipment:', err);
    res.status(500).send('Server error');
  }
};

exports.getSummary = async (req, res) => {
  try {

    const totalEquipment = await Equipment.countDocuments();
    const issuedEquipment = await Equipment.countDocuments({ status: "issued" });
    const availableEquipment = totalEquipment - issuedEquipment;

    const totalUsers = await User.countDocuments();

    res.json({ totalEquipment, issuedEquipment, availableEquipment, totalUsers });
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).send('Server error');
  }
};

exports.getActivity = async (req, res) => {
  try {

    const activityData = await Equipment.find({}).sort({ checkedOutAt: -1 }).limit(10);
    res.json(activityData);
  } catch (err) {
    console.error('Error fetching activity:', err);
    res.status(500).send('Server error');
  }
};

exports.getIssuedEquipment = async (req, res) => {
  try {
    const issuedEquipment = await Equipment.find({ status: "issued" });
    res.json(issuedEquipment);
  } catch (err) {
    console.error('Error fetching issued equipment:', err);
    res.status(500).send('Server error');
  }
};

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

    equipment.checkedOutBy = user._id;
    equipment.checkedOutAt = new Date();
    equipment.status = 'issued';
    equipment.returnDate = returnDate ? new Date(returnDate) : null;

    await equipment.save();

    const historyEntry = new History({
      equipmentId: equipment._id,
      userId: user._id,
      borrowedAt: new Date(),
      returnedAt: null
    });

    await historyEntry.save();

    const history = await History.find({ equipmentId: equipment._id }).populate('userId', 'username');

    const responseEquipment = {
      ...equipment._doc,
      history: history.map(entry => ({
        _id: entry._id,
        userId: entry.userId.username,
        borrowedAt: entry.borrowedAt,
        returnedAt: entry.returnedAt
      }))
    };

    res.status(200).json({
      message: 'Equipment assigned successfully',
      equipment: responseEquipment
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

    res.status(200).json({ equipment: assignedEquipment || [] });
  } catch (error) {
    console.error('Error fetching assigned equipment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment || equipment.checkedOutBy?.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Equipment not found or not assigned to this user' });
    }

    equipment.checkedOutBy = null;
    equipment.checkedOutAt = null;
    equipment.status = 'available';

    const history = await History.findOne({
      equipmentId: equipment._id,
      userId: req.user._id,
      returnedAt: null, 
    });

    if (history) {
      history.returnedAt = new Date(); 
      await history.save();
    }

    await equipment.save();

    res.json({ message: 'Equipment returned successfully', equipment });
  } catch (error) {
    console.error('Error returning equipment:', error);
    res.status(500).json({ message: 'Error returning equipment', error });
  }
};

exports.getBorrowingHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const borrowingHistory = await History.find({ userId })
      .populate('equipmentId', 'name') 
      .populate('userId', 'username'); 


    res.status(200).json({ 
      success: true,
      borrowingHistory: borrowingHistory || [],
      count: borrowingHistory.length
    });

  } catch (error) {
    console.error('Error fetching borrowing history:', error);
    res.status(500).json({
      sucess: false,
      message: 'An error occurred while fetching the borrowing history' 
    });
  }
};
