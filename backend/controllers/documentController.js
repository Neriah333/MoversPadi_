const multer = require("multer");
const Document = require("../models/Documents");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

exports.uploadDocument = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { user_id, company_id, vehicle_id, document_type } = req.body;

      const doc = await Document.create({
        user_id: user_id || null,
        company_id: company_id || null,
        vehicle_id: vehicle_id || null,
        document_type,
        file_path: req.file.path,
        original_name: req.file.originalname,
        mime_type: req.file.mimetype,
        file_size: req.file.size,
        file_status: "pending"
      });

      return res.status(201).json({ message: "Document uploaded", doc });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload failed" });
    }
  }
];