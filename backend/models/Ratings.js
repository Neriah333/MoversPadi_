import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  reviewer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reviewee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  review: {
    type: String,
    trim: true
  }

}, { timestamps: true });

export default mongoose.model("Rating", ratingSchema);