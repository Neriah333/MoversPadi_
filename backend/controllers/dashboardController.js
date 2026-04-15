import Vehicle from "../models/Vehicle.js";
import Verification from "../models/Verification.js";
import Job from "../models/Job.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

/**
 * @desc Get aggregated snapshot for the main dashboard view
 * @route GET /api/v1/dashboard/snapshot
 */
export const getDashboardSnapshot = async (req, res) => {
  try {
    // Promise.all runs these queries in parallel rather than one-by-one
    const [fleetStats, verification, recentJobs, user] = await Promise.all([
      Vehicle.aggregate([
        { $match: { owner: req.user.id } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } },
            inactive: { $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] } }
          }
        }
      ]),
      Verification.findOne({ user: req.user.id }),
      Job.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5),
      User.findById(req.user.id).select("-password")
    ]);

    res.status(200).json({
      success: true,
      data: {
        profile: user,
        fleet: fleetStats[0] || { total: 0, active: 0, inactive: 0 },
        verification: {
          status: verification?.status || "not_submitted",
          updatedAt: verification?.updatedAt
        },
        recentJobs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get User Profile
 */
export const getProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate("role");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get Detailed Fleet Stats
 */
export const getFleetOverview = async (req, res) => {
  try {
    const stats = await Vehicle.aggregate([
      { $match: { owner: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get Verification Status & Documents
 */
export const getVerificationStatus = async (req, res) => {
  try {
    const verification = await Verification.findOne({ user: req.user.id });
    res.json({
      success: true,
      data: {
        status: verification?.status || "not_submitted",
        documents: verification?.documents || [],
        reviewedAt: verification?.updatedAt || null,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get Job History with Pagination
 */
export const getJobHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments({ user: req.user.id });

    res.json({
      success: true,
      data: jobs,
      pagination: { total, page, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get Service History
 */
export const getServiceHistory = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};