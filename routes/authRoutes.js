const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUser,
  getSpecificUser,
  updateUserProfile,
  logoutUser,
  deleteUser,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getAllUser);
router.get('/users/:id', protect, getSpecificUser);
router.put('/users', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);
router.delete('/users/:id', protect, deleteUser);


module.exports = router;
