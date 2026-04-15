// routes/dashboardRoutes.js
import express from "express";
import {
  getProfileData,
  getServiceHistory,
  getJobHistory,
  getVerificationStatus,
  getFleetOverview,
  getDashboardSnapshot, // Renamed here to match the optimized controller
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Apply 'protect' middleware to all dashboard routes at once
router.use(protect); 

router.get("/profile", getProfileData);
router.get("/service-history", getServiceHistory);
router.get("/job-history", getJobHistory);
router.get("/verification-status", getVerificationStatus);
router.get("/fleet-overview", getFleetOverview);
router.get("/overview", getDashboardSnapshot);

export default router;