const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const userController = require('../controllers/userController');
const authMiddleware = require('../config/auth');

// Equipment routes
router.get('/equipment', equipmentController.getAllEquipment);
router.get('/equipment/:id', equipmentController.getEquipmentById);
router.post('/equipment', authMiddleware, equipmentController.createEquipment);
router.put('/equipment/:id', authMiddleware, equipmentController.updateEquipment);
router.delete('/equipment/:id', authMiddleware, equipmentController.deleteEquipment);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
