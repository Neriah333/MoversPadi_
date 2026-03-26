const MoverVerification = require("../models/Mover_verification");
const CompanyVerification = require("../models/Company_verification");
const Document = require("../models/Documents");

exports.getVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const moverVerification = await MoverVerification.findOne({ user_id: userId });
    const companyVerification = await CompanyVerification.findOne({ "company_id": userId });
    const documents = await Document.find({ user_id: userId });

    return res.json({
      moverVerification,
      companyVerification,
      documents
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};