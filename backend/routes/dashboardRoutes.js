// routes/dashboardRoutes.js
import express from "express";
import {
  getProfileData,
  getServiceHistory,
  getJobHistory,
  getVerificationStatus,
  getFleetOverview,
  getDashboardOverview,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, getProfileData);
router.get("/service-history", protect, getServiceHistory);
router.get("/job-history", protect, getJobHistory);
router.get("/verification-status", protect, getVerificationStatus);
router.get("/fleet-overview", protect, getFleetOverview);
router.get("/overview", protect, getDashboardOverview);

export default router;