const express = require('express');
const router = express.Router();
const {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);  
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', logout);

module.exports = router;