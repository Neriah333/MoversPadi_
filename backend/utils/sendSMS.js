const Africastalking = require('africastalking');

const africastalking = Africastalking({
  apiKey: process.env.AT_API_KEY,      // Your Africa’s Talking API key
  username: process.env.AT_USERNAME,   // Your Africa’s Talking username
});

const sms = africastalking.SMS;

/**
 * sendSMS
 * @param {String} phone - recipient number (in international format, e.g., +2547xxxxxxx)
 * @param {String} message - message to send
 */
const sendSMS = async (phone, message) => {
  try {
    const response = await sms.send({
      to: [phone],
      message,
    });
    console.log('SMS sent:', response);
    return response;
  } catch (error) {
    console.error('SMS failed:', error);
    throw new Error('Failed to send SMS');
  }
};

module.exports = sendSMS;