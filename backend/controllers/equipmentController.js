const Equipment = require('../models/Equipment');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    console.error('Error fetching all equipment:', err); // Log the error
    res.status(500).send('Server error');
  }
};

// Get a single piece of equipment by ID
exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (err) {
    console.error('Error fetching equipment by ID:', err); // Log the error
    res.status(500).send('Server error');
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
