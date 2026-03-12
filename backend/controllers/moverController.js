const express = require("express");
const router = express.Router();
const Mover = require("../models/Mover");
const upload = require("../middleware/uploadDocs");

// Register Independent Mover
router.post(
  "/register-mover",
  upload.fields([
    { name: "id_document", maxCount: 1 },
    { name: "vehicle_registration_doc", maxCount: 1 },
    { name: "road_worthiness_certificate", maxCount: 1 },
    { name: "insurance_policy", maxCount: 1 },
    { name: "passport_photo", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        user_id,
        bank_account_name,
        bank_account_number,
        bank_name
      } = req.body;

      const mover = new Mover({
        user_id,
        id_document: req.files.id_document[0].path,
        vehicle_registration_doc: req.files.vehicle_registration_doc[0].path,
        road_worthiness_certificate: req.files.road_worthiness_certificate[0].path,
        insurance_policy: req.files.insurance_policy[0].path,
        passport_photo: req.files.passport_photo[0].path,
        bank_account_name,
        bank_account_number,
        bank_name
      });

      await mover.save();

      res.status(201).json({
        message: "Mover registered successfully",
        mover
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get all movers (admin)
router.get("/movers", async (req, res) => {
  try {
    const movers = await Mover.find().populate("user_id");
    res.json(movers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve mover
router.patch("/approve-mover/:id", async (req, res) => {
  try {
    const mover = await Mover.findByIdAndUpdate(
      req.params.id,
      { verification_status: "approved" },
      { new: true }
    );

    res.json(mover);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;