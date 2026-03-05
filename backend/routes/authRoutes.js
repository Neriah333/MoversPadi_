const express = require('express');
const router = express.Router();
const {signup, verifyEmail, login, logout} = require('../controllers/authController');
// const authenticate = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
// router.post('/resend-otp', authController.resendOtp);
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post('/change-password', authController.changePassword);
// router.get('/profile', authController.getProfile);
// router.put('/profile', authController.updateProfile);
router.post('/logout', logout);

module.exports = router;