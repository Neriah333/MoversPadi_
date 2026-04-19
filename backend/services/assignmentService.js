const { ServiceRequest } = require('../models');
const { logStatus } = require('./statusLogService');

async function assignMover(request, mover) {
  await ServiceRequest.update({
    assigned_mover_id: mover.user_id,
    status: 'matched'
  }, { where: { id: request.id } });

  await logStatus(request.id, 'matched', null, 'Auto-assigned mover');
}

module.exports = { assignMover };