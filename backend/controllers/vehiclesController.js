const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const upload = require("../middleware/uploadVehicle");

router.post(
  "/register-vehicle",
  upload.fields([
    { name: "vehicle_image", maxCount: 1 },
    { name: "drivers_license_image", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        user_id,
        service_type,
        plate_number,
        means_of_identification,
        home_address
      } = req.body;

      const vehicle = new Vehicle({
        user_id,
        service_type,
        plate_number,
        means_of_identification,
        home_address,
        vehicle_image: req.files.vehicle_image[0].path,
        drivers_license_image: req.files.drivers_license_image[0].path
      });

      await vehicle.save();

      res.status(201).json({
        message: "Vehicle registered successfully",
        vehicle
      });

    } catch (error) {
      res.status(500).json({
        message: "Error registering vehicle",
        error: error.message
      });
    }
  }
);

module.exports = router;