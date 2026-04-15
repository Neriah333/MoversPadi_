import Mover from "../models/Mover.js";
import Document from "../models/Documents.js";
import MoverVerification from "../models/Mover_verification.js";
import CompanyVerification from "../models/Company_verification.js";

/**
 * Helper to save document metadata to the database
 */
const saveDocRecord = async (file, userId, type, vehicleId = null) => {
  return await Document.create({
    user_id: userId,
    document_type: type,
    vehicle_id: vehicleId,
    file_path: file.path,
    original_name: file.originalname,
    mime_type: file.mimetype,
    file_size: file.size,
    file_status: "pending"
  });
};

/**
 * @desc Register Independent Mover with multiple document uploads
 */
export const registerMover = async (req, res) => {
  try {
    const { user_id, bank_account_name, bank_account_number, bank_name } = req.body;

    if (!req.files) return res.status(400).json({ message: "No files uploaded" });

    // 1. Create the Mover record with file paths
    const mover = new Mover({
      user_id,
      id_document: req.files.id_document[0].path,
      vehicle_registration_doc: req.files.vehicle_registration_doc[0].path,
      road_worthiness_certificate: req.files.road_worthiness_certificate[0].path,
      insurance_policy: req.files.insurance_policy[0].path,
      passport_photo: req.files.passport_photo[0].path,
      bank_account_name,
      bank_account_number,
      bank_name,
      verification_status: "pending"
    });

    // 2. Log each file in the central Documents table for tracking/audit
    const docTypes = Object.keys(req.files);
    await Promise.all(
      docTypes.map((type) => saveDocRecord(req.files[type][0], user_id, type))
    );

    await mover.save();

    res.status(201).json({ success: true, message: "Mover registered successfully", mover });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Unified Verification Status Check
 */
export const getVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const [moverVer, companyVer, documents] = await Promise.all([
      MoverVerification.findOne({ user_id: userId }),
      CompanyVerification.findOne({ company_id: userId }),
      Document.find({ user_id: userId }).sort({ createdAt: -1 })
    ]);

    return res.json({
      success: true,
      data: {
        mover: moverVer,
        company: companyVer,
        documents // List of all uploaded files and their individual status
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc Single Document Upload (for ad-hoc updates)
 */
export const uploadSingleDocument = async (req, res) => {
  try {
    const { user_id, document_type, vehicle_id } = req.body;
    
    const doc = await saveDocRecord(req.file, user_id, document_type, vehicle_id);

    return res.status(201).json({ message: "Document uploaded successfully", doc });
  } catch (err) {
    return res.status(500).json({ message: "Upload failed" });
  }
};

/**
 * @desc Admin: Approve/Reject Mover
 */
export const updateMoverStatus = async (req, res) => {
  try {
    const { status } = req.body; // pending, approved, rejected, resubmission_required
    const mover = await Mover.findByIdAndUpdate(
      req.params.id,
      { verification_status: status },
      { new: true }
    );
    res.json({ success: true, mover });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};