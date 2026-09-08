const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const userController = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../config/auth');
const { validators, validatePayloadSize, honeypotCheck } = require('../middleware/validation');
const rateLimiters = require('../middleware/rateLimiter');

console.log('userController:', userController);
console.log('authMiddleware:', authMiddleware);
console.log('isAdmin:', isAdmin);

router.post(
    '/register',
    rateLimiters.auth,
    validatePayloadSize,
    validators.register,
    honeypotCheck,
    userController.registerUser
);

router.post(
    '/login',
    rateLimiters.auth,
    validatePayloadSize,
    validators.login,
    userController.loginUser
);

router.post('/logout', authMiddleware, userController.logoutUser);

router.get('/equipment', rateLimiters.general, equipmentController.getAllEquipment);

router.get('/equipment/:id', rateLimiters.general, equipmentController.getEquipmentById);

router.post(
    '/equipment',
    authMiddleware,
    isAdmin,
    rateLimiters.equipment,
    validatePayloadSize,
    validators.createEquipment,
    equipmentController.createEquipment
);

router.put(
    '/equipment/:id',
    authMiddleware,
    isAdmin,
    validatePayloadSize,
    validators.updateEquipment,
    equipmentController.updateEquipment
);

router.delete('/equipment/:id', authMiddleware, isAdmin, rateLimiters.general, equipmentController.deleteEquipment);

router.get('/summary', authMiddleware, isAdmin, rateLimiters.general, equipmentController.getSummary);
router.get('/activity', authMiddleware, isAdmin, rateLimiters.general, equipmentController.getActivity);
router.get('/issued', authMiddleware, rateLimiters.general, equipmentController.getIssuedEquipment);

router.post(
    '/assign',
    authMiddleware,
    isAdmin,
    validatePayloadSize,
    validators.assignEquipment,
    equipmentController.assignEquipment
);

router.put('/return/:id', authMiddleware, rateLimiters.general, equipmentController.returnEquipment);
router.get('/assigned', authMiddleware, rateLimiters.general, equipmentController.getAssignedEquipment);
router.get('/borrowing-history', authMiddleware, rateLimiters.general, equipmentController.getBorrowingHistory);

router.get('/user/me', authMiddleware, userController.getUserProfile);

router.get('/users', authMiddleware, isAdmin, rateLimiters.general, userController.getAllUsers);
router.get('/users/:id', authMiddleware, isAdmin, rateLimiters.general, userController.getUserById);
router.put(
    '/users/:id',
    authMiddleware,
    isAdmin,
    validatePayloadSize,
    validators.updateUser,
    userController.updateUser
);
router.delete('/users/:id', authMiddleware, isAdmin, rateLimiters.general, userController.deleteUser);

router.get('/notifications', authMiddleware, rateLimiters.general, userController.getNotificationsForUser);
router.post('/notifications/send', authMiddleware, isAdmin, rateLimiters.general, userController.sendNotification);
router.put('/notifications/:id/read', authMiddleware, rateLimiters.general, userController.markNotificationAsRead);
router.delete('/notifications/:id', authMiddleware, rateLimiters.general, userController.deleteNotification);

module.exports = router;
