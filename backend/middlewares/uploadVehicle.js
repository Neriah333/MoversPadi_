const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname === "id_document") {
      cb(null, "uploads/ids");
    } 
    else if (file.fieldname === "vehicle_registration_doc") {
      cb(null, "uploads/vehicleDocs");
    } 
    else if (file.fieldname === "road_worthiness_certificate") {
      cb(null, "uploads/roadWorthiness");
    } 
    else if (file.fieldname === "insurance_policy" || file.fieldname === "insurance_coverage") {
      cb(null, "uploads/insurance");
    } 
    else if (file.fieldname === "passport_photo") {
      cb(null, "uploads/passports");
    } 
    else if (file.fieldname === "cac_certificate") {
      cb(null, "uploads/cac");
    }
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// File filter (only allow images and PDFs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|pdf/;
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;