const User = require('../models/User');
const Role = require('../models/Role');
const OtpVerification = require('../models/OtpVerification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationCode, sendResetPasswordLink } = require('../utils/emails');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Import Sequelize operators

// --------------------- SIGNUP ---------------------
exports.signup = async (req, res) => {
  const { name, role, phone, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 2. LOOKUP THE ROLE ID (Fixes the 'admin' is not an integer error)
    // This finds the record in 'roles' where name = 'admin' (or 'mover', etc)
    const roleData = await Role.findOne({ where: { name: role } });
    
    if (!roleData) {
      return res.status(400).json({ message: `Role '${role}' does not exist in the database.` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = await sendVerificationCode(email);

    // 3. Create the User using the roleData.id
    const newUser = await User.create({
      full_name: name,   
      role_id: roleData.id, 
      phone,
      email,
      password: hashedPassword,
      verifyCode: otp,
      verifyCodeExpires: new Date(Date.now() + 10 * 60 * 1000), 
      isVerified: false
    });

    res.status(201).json({
      message: "User created, OTP sent to email",
      userId: newUser.id,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- VERIFY OTP ---------------------
exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.verifyCode || user.verifyCode !== code || user.verifyCodeExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.verifyCode = null; // Use null for SQL
    user.verifyCodeExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- LOGIN ---------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your account first" });

    const otp = await sendVerificationCode(email);
    user.verifyCode = otp;
    user.verifyCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    res.json({ message: "OTP sent to email for login" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- VERIFY LOGIN OTP ---------------------
exports.verifyLoginOtp = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.verifyCode || user.verifyCode !== code || user.verifyCodeExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.verifyCode = null;
    user.verifyCodeExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Verify login OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- FORGOT PASSWORD ---------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendResetPasswordLink(user.email, resetLink);

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- RESET PASSWORD ---------------------
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // FIX 3: Use Sequelize Op.gt for date comparison
    const user = await User.findOne({ 
      where: {
        resetPasswordToken: token, 
        resetPasswordExpires: { [Op.gt]: new Date() } 
      }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- LOGOUT ---------------------
exports.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};