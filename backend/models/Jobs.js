import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mover_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  service_type: {
    type: String,
    enum: ["dispatch", "haulage", "tow"],
    required: true
  },

  pickup_lat: Number,
  pickup_lng: Number,

  dropoff_lat: Number,
  dropoff_lng: Number,

  price: {
    type: Number,
    required: true
  },

  commission: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "in_progress", "completed"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Job", jobSchema);