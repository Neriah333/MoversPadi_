import Vehicle from "../models/Vehicle.js";
import Verification from "../models/Verification.js";
import Job from "../models/Job.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

export const getProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("role");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFleetOverview = async (req, res) => {
  try {
    const total = await Vehicle.countDocuments({ owner: req.user.id });
    const active = await Vehicle.countDocuments({
      owner: req.user.id,
      status: "active",
    });
    const inactive = await Vehicle.countDocuments({
      owner: req.user.id,
      status: "inactive",
    });

    res.json({
      success: true,
      data: {
        total,
        active,
        inactive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVerificationStatus = async (req, res) => {
  try {
    const verification = await Verification.findOne({
      user: req.user.id,
    });

    res.json({
      success: true,
      status: verification?.status || "not_submitted",
      documents: verification?.documents || [],
      reviewedAt: verification?.updatedAt || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobHistory = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceHistory = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





