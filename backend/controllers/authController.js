const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/generateOTP');

// --------------------- SIGNUP ---------------------
exports.signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Generate OTP
    const otp = generateOTP();
    newUser.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    };

    await newUser.save();

    console.log("OTP for testing:", otp); // replace with SMS in production

    res.status(201).json({
      message: "User created. Please verify OTP.",
      userId: newUser._id,
    });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- VERIFY OTP ---------------------
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Optionally generate JWT after verification
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Account verified successfully", token });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- LOGIN ---------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your account first" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- RESEND OTP ---------------------
exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    const otp = generateOTP();
    user.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };

    await user.save();

    console.log("Resent OTP for testing:", otp); // replace with SMS

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ message: "Server error" });
  }
};