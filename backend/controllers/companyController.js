const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const upload = require("../middleware/uploadDocs");

// Register Logistics Company
router.post(
  "/register-company",
  upload.fields([
    { name: "cac_certificate", maxCount: 1 },
    { name: "insurance_coverage", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        company_name,
        tin_number
      } = req.body;

      const company = new LogisticsCompany({
        company_name,
        tin_number,
        cac_certificate: req.files.cac_certificate[0].path,
        insurance_coverage: req.files.insurance_coverage[0].path
      });

      await company.save();

      res.status(201).json({
        message: "Company registered successfully",
        company
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get all companies
router.get("/companies", async (req, res) => {
  try {
    const companies = await LogisticsCompany.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve company
router.patch("/approve-company/:id", async (req, res) => {
  try {
    const company = await LogisticsCompany.findByIdAndUpdate(
      req.params.id,
      { verification_status: "approved" },
      { new: true }
    );

    res.json(company);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;