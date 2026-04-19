const { Request_Tracking } = require('../models');

async function addTracking(data) {
  return Request_Tracking.create(data);
}

module.exports = { addTracking };