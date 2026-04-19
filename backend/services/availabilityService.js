const { AvailabilityStatus } = require('../models');

async function updateAvailability(userId, data) {
  return AvailabilityStatus.update(data, {
    where: { user_id: userId }
  });
}

module.exports = { updateAvailability };