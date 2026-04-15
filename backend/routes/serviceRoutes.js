import express from "express";
import { createRequest, getRequestHistory, updateRequestStatus } from "../controllers/serviceController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/request", createRequest);
router.get("/history", getRequestHistory);
router.patch("/request/:id/status", updateRequestStatus);

export default router;