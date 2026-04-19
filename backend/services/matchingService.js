const { AvailabilityStatus } = require('../models');
const { getDistance } = require('../utils/distance');

async function findNearbyMovers(request) {
  const movers = await AvailabilityStatus.findAll({
    where: { is_online: true, is_available: true }
  });

  return movers
    .map(m => ({
      ...m.toJSON(),
      distance: getDistance(
        request.pickup_lat,
        request.pickup_lng,
        m.current_lat,
        m.current_lng
      )
    }))
    .sort((a, b) => a.distance - b.distance);
}

module.exports = { findNearbyMovers };