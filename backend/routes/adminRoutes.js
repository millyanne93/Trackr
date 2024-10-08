const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../config/auth'); // Updated import

// Admin routes
router.get('/users', authMiddleware, isAdmin, adminController.getAllUsers);
router.get('/equipment', authMiddleware, isAdmin, adminController.getAllEquipment);
router.delete('/users/:id', authMiddleware, isAdmin, adminController.deleteUser);
router.delete('/equipment/:id', authMiddleware, isAdmin, adminController.deleteEquipment);

module.exports = router;
