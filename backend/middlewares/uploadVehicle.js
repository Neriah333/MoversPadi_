const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "vehicle_image") {
      cb(null, "uploads/vehicles");
    } else if (file.fieldname === "drivers_license_image") {
      cb(null, "uploads/licenses");
    }
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (ext) {
    return cb(null, true);
  } else {
    cb("Only images are allowed");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;