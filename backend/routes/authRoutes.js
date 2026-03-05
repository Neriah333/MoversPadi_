const express = require('express');
const router = express.Router();
const {
  signup,
  verifyOtp,
  login,
  verifyLoginOtp,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login); // sends login OTP
router.post('/verify-login-otp', verifyLoginOtp); // user submits login OTP
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', logout);

module.exports = router;