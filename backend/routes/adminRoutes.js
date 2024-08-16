const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../config/auth');

// Admin routes
router.get('/users', authMiddleware, adminController.getAllUsers);
router.get('/equipment', authMiddleware, adminController.getAllEquipment);
router.delete('/users/:id', authMiddleware, adminController.deleteUser);
router.delete('/equipment/:id', authMiddleware, adminController.deleteEquipment);

module.exports = router;
