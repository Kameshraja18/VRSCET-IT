const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["academic", "administrative", "technical", "general"],
    default: "general"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium"
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved", "closed"],
    default: "pending"
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  response: {
    type: String,
    trim: true
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "responderType"
  },
  responderType: {
    type: String,
    enum: ["admin", "faculty"]
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Query", querySchema);
