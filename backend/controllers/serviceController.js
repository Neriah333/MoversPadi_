import ServiceRequest from "../models/ServiceRequest.js";
import Vehicle from "../models/Vehicles.js";

/**
 * @desc Create a new service request with auto-pricing
 */
export const createRequest = async (req, res) => {
  try {
    const { serviceType, distance, vehicleId, pickupLocation, dropoffLocation } = req.body;

    // 1. Calculate Price
    const estimatedPrice = calculatePrice(serviceType, distance);

    // 2. Create Request
    const newRequest = new ServiceRequest({
      user: req.user.id,
      vehicle: vehicleId,
      serviceType,
      distance,
      pickupLocation,
      dropoffLocation,
      price: estimatedPrice,
      status: "pending"
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get request history with filters
 */
export const getRequestHistory = async (req, res) => {
  try {
    const { status, type } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (type) query.serviceType = type;

    const history = await ServiceRequest.find(query)
      .populate("vehicle", "plateNumber model")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update request status (For providers/admin)
 */
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};