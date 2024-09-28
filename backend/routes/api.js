const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const userController = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../config/auth'); 

console.log('authMiddleware:', authMiddleware);
console.log('isAdmin:', isAdmin);

router.get('/equipment', equipmentController.getAllEquipment);
router.get('/equipment/:id', equipmentController.getEquipmentById);
router.post('/equipment', authMiddleware, isAdmin, equipmentController.createEquipment);
router.put('/equipment/:id', authMiddleware, isAdmin, equipmentController.updateEquipment);
router.delete('/equipment/:id', authMiddleware, isAdmin, equipmentController.deleteEquipment);

// New routes added
router.get('/summary', authMiddleware, isAdmin, equipmentController.getSummary);
router.get('/activity', authMiddleware, isAdmin, equipmentController.getActivity);
router.get('/issued', authMiddleware, equipmentController.getIssuedEquipment);
router.post('/assign', authMiddleware, isAdmin, equipmentController.assignEquipment);
router.put('/return/:id', authMiddleware, equipmentController.returnEquipment);
router.get('/assigned', authMiddleware, equipmentController.getAssignedEquipment);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, isAdmin, userController.getUserById);
router.put('/users/:id', authMiddleware, isAdmin, userController.updateUser);
router.delete('/users/:id', authMiddleware, isAdmin, userController.deleteUser);

router.post('/logout', userController.logoutUser);

module.exports = router;
