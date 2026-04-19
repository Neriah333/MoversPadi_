import ServiceRequest from "../models/ServiceRequest.js";
import Vehicle from "../models/Vehicles.js";

// services (matching system)
import { findNearbyMovers } from "../services/matchingService.js";
import { assignMover } from "../services/assignmentService.js";
import { logStatus } from "../services/statusLogService.js";

/**
 * Helper: Price calculation
 */
const calculatePrice = (serviceType, distance) => {
  let baseRate = 500;

  if (serviceType === "truck") baseRate = 1000;
  if (serviceType === "van") baseRate = 700;
  if (serviceType === "motorcycle") baseRate = 300;

  return baseRate + distance * 50;
};

/**
 * @desc Create Service Request + Auto Matching + Assignment
 */
export const createRequest = async (req, res) => {
  try {
    const {
      serviceType,
      distance,
      vehicleId,
      pickupLocation,
      dropoffLocation,
      pickup_lat,
      pickup_lng,
      dropoff_lat,
      dropoff_lng
    } = req.body;

    // 1. Calculate price
    const estimatedPrice = calculatePrice(serviceType, distance);

    // 2. Create request
    const newRequest = await ServiceRequest.create({
      user: req.user.id,
      vehicle: vehicleId,
      serviceType,
      distance,
      pickupLocation,
      dropoffLocation,
      pickup_lat,
      pickup_lng,
      dropoff_lat,
      dropoff_lng,
      price: estimatedPrice,
      status: "pending"
    });

    // 3. Log creation
    await logStatus(newRequest.id, "pending", req.user.id, "Request created");

    // 4. Find nearby available movers
    const movers = await findNearbyMovers(newRequest);

    if (!movers || movers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Request created but no movers available",
        data: newRequest
      });
    }

    // 5. Assign closest mover
    const assignedMover = movers[0];
    await assignMover(newRequest, assignedMover);

    // 6. Log assignment
    await logStatus(
      newRequest.id,
      "matched",
      req.user.id,
      `Assigned to mover ${assignedMover.user_id}`
    );

    res.status(201).json({
      success: true,
      message: "Request created and mover assigned",
      data: newRequest
    });

  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc Get request history
 */
export const getRequestHistory = async (req, res) => {
  try {
    const { status, type } = req.query;

    const where = {
      user: req.user.id
    };

    if (status) where.status = status;
    if (type) where.serviceType = type;

    const history = await ServiceRequest.findAll({
      where,
      include: [{ model: Vehicle, attributes: ["plateNumber", "model"] }],
      order: [["createdAt", "DESC"]]
    });

    res.json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc Update request status (job lifecycle)
 */
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }

    request.status = status;
    await request.save();

    // log every change
    await logStatus(id, status, req.user?.id, "Status updated");

    res.json({
      success: true,
      data: request
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc Cancel request
 */
export const cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }

    request.status = "cancelled";
    await request.save();

    await logStatus(id, "cancelled", req.user?.id, "Request cancelled");

    res.json({
      success: true,
      message: "Request cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};