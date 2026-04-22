const User = require('../models/User');
const Role = require('../models/Role');
const OtpVerification = require('../models/Otp_verification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationCode, sendResetPasswordLink } = require('../utils/emails');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Import Sequelize operators

exports.signup = async (req, res) => {
  const { name, role, phone, email, password } = req.body;

  try {
    const emailNormalized = email.trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: emailNormalized } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const roleData = await Role.findOne({ where: { name: role } });
    if (!roleData) return res.status(400).json({ message: "Role not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 1. Generate the code
    const otp = await sendVerificationCode(email);

    // 2. Create the User (notice we removed otp fields here)
    const newUser = await User.create({
      full_name: name,
      role_id: roleData.id,
      phone,
      email: emailNormalized,
      password: hashedPassword,
      isVerified: false
    });

    // 3. Save to your new OtpVerification table
    await OtpVerification.create({
      user_id: newUser.id,
      phone_or_email: emailNormalized,
      otp_code: otp,
      channel: 'email',
      expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 mins from now
      status: 'pending'
    });

    res.status(201).json({ message: "User created, OTP sent", userId: newUser.id });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- VERIFY OTP ---------------------
exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Normalize email FIRST
    const emailNormalized = email.trim().toLowerCase();

    // 1. Find the latest valid OTP
    const otpRecord = await OtpVerification.findOne({
      where: {
        phone_or_email: emailNormalized,
        otp_code: code,
        status: 'pending',
        expires_at: { [Op.gt]: new Date() }
      },
      order: [['created_at', 'DESC']]
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // 2. Mark OTP as verified
    otpRecord.status = 'verified';
    otpRecord.verified_at = new Date();
    await otpRecord.save();

    // 3. Mark user as verified
    await User.update(
      { isVerified: true },
      { where: { email: emailNormalized } }
    );

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
    const emailNormalized = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: emailNormalized } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your account first" });

    const role = await Role.findByPk(user.role_id);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: role.name
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- FORGOT PASSWORD ---------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const emailNormalized = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: emailNormalized } });
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