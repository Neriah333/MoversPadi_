import express from "express";
import { 
  registerMover, 
  getVerificationStatus, 
  updateMoverStatus,
  uploadSingleDocument 
} from "../controllers/verificationController.js";
import upload from "../middleware/uploadDocs.js"; // Assuming this is your multer config
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public/Auth routes
router.get("/status/:userId", protect, getVerificationStatus);

// Multi-document registration
router.post(
  "/register-mover",
  protect,
  upload.fields([
    { name: "id_document", maxCount: 1 },
    { name: "vehicle_registration_doc", maxCount: 1 },
    { name: "road_worthiness_certificate", maxCount: 1 },
    { name: "insurance_policy", maxCount: 1 },
    { name: "passport_photo", maxCount: 1 }
  ]),
  registerMover
);

// Single file update (e.g., renewing an expired insurance doc)
router.post("/upload-single", protect, upload.single("file"), uploadSingleDocument);

// Admin only
router.patch("/mover-status/:id", protect, updateMoverStatus);

export default router;