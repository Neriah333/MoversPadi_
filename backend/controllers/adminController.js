const MoverVerification = require("../models/Movers_verification");
const CompanyVerification = require("../models/Company_verification");

exports.verifyEntity = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { decision, reason, admin_user_id } = req.body;

    let record;
    if(type === "mover"){
      record = await MoverVerification.findById(id);
    } else if(type === "company"){
      record = await CompanyVerification.findById(id);
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    if(!record) return res.status(404).json({ message: "Record not found" });

    record.verification_status = decision;
    record.rejection_reason = reason || null;
    record.reviewed_by = admin_user_id;
    record.reviewed_at = new Date();

    await record.save();

    return res.json({ message: `Verification ${decision}`, record });
  } catch(err){
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};