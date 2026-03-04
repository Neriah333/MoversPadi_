const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/generateOTP');
const sendSMS = require('../utils/sendSMS');

// --------------------- SIGNUP --------------------

  exports.signup = async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, phone, email, password: hashedPassword });

      // const otp = generateOTP();
      // newUser.otp = {
      //   code: otp,
      //   expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      // };

      // await newUser.save();

      // // Send OTP via SMS
      // const phoneInternational = phone.startsWith('+') ? phone : `+254${phone.slice(-9)}`;
      // await sendSMS(phoneInternational, `Your OTP code is: ${otp}`);

      res.status(201).json({
        message: "User created.",
        userId: newUser._id,
      });

    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: "Server error" });
    }
  };
// --------------------- VERIFY OTP ---------------------
  // exports.resendOtp = async (req, res) => {
  //   const { email } = req.body;

  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) return res.status(404).json({ message: "User not found" });
  //     if (user.isVerified) return res.status(400).json({ message: "User already verified" });

  //     const otp = generateOTP();
  //     user.otp = {
  //       code: otp,
  //       expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  //     };

  //     await user.save();

  //     const phoneInternational = user.phone.startsWith('+') ? user.phone : `+254${user.phone.slice(-9)}`;
  //     await sendSMS(phoneInternational, `Your new OTP code is: ${otp}`);

  //     res.json({ message: "OTP resent successfully" });

  //   } catch (error) {
  //     console.error('Error resending OTP:', error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // };
// --------------------- LOGIN ---------------------
  exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // if (!user.isVerified) return res.status(403).json({ message: "Please verify your account first" });

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

// --------------------- FORGOT PASSWORD ---------------------
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.isVerified) return res.status(400).json({ message: "Verify account first" });

//     // Generate OTP for password reset
//     const otp = generateOTP();
//     user.otp = {
//       code: otp,
//       expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
//     };
//     await user.save();

//     const phoneInternational = user.phone.startsWith('+') ? user.phone : `+254${user.phone.slice(-9)}`;
//     await sendSMS(phoneInternational, `Your password reset OTP is: ${otp}`);

//     res.json({ message: "Password reset OTP sent to your phone" });

//   } catch (error) {
//     console.error('Error in forgot password:', error);
//     res.status(500).json({ message: "Server error" });
//   }
// }; 

// --------------------- RESET PASSWORD ---------------------
// exports.resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.otp || user.otp.code !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (user.otp.expiresAt < new Date()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.otp = undefined; // clear OTP
//     await user.save();

//     res.json({ message: "Password reset successfully" });

//   } catch (error) {
//     console.error('Error in reset password:', error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// --------------------- CHANGE PASSWORD ---------------------
// exports.changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id; // assuming authenticate middleware sets req.user

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Check current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Password changed successfully" });

//   } catch (error) {
//     console.error('Error in change password:', error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// --------------------- GET PROFILE ---------------------
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from authenticate middleware
    const user = await User.findById(userId).select('-password -otp'); // hide password & OTP

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- UPDATE PROFILE ---------------------
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, email } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update only provided fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    await user.save();

    res.json({ message: "Profile updated successfully", user: { name: user.name, phone: user.phone, email: user.email } });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------- LOGOUT ---------------------
exports.logout = async (req, res) => {
  try {
    // For JWT, you usually just tell the client to remove the token
    // Optionally, you could implement token blacklisting here if needed

    res.json({ message: "Logout successful. Please remove the token on client." });

  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: "Server error" });
  }
};