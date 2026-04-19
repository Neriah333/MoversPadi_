const { JobStatusLog } = require('../models');

async function logStatus(requestId, status, userId = null, note = null) {
  return JobStatusLog.create({
    service_request_id: requestId,
    status,
    changed_by: userId,
    note
  });
}

module.exports = { logStatus };