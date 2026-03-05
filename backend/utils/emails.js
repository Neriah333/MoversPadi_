// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password if Gmail
  },
});

async function sendVerificationEmail(to, token) {
  const url = `http://localhost:5000/api/auth/verify-email/${token}`;
  await transporter.sendMail({
    from: `"MoversPadi" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
}

module.exports = sendVerificationEmail;