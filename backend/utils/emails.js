// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // your app password
  },
});

/**
 * Sends a 6-digit verification code to the user email.
 * Returns the generated code so you can save it in the DB.
 */
async function sendVerificationCode(to) {
  // Generate 6-digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await transporter.sendMail({
    from: `"MoversPadi" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify your email',
    html: `<p>Your verification code is: <b>${code}</b>. It expires in 10 minutes.</p>`,
  });

  return code;
}

module.exports = sendVerificationCode;