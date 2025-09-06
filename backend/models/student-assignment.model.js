const mongoose = require("mongoose");

const studentAssignmentSchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacultyDetail",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentDetail",
      required: true,
    },
    assignmentType: {
      type: String,
      enum: ["mentor", "advisor", "counselor", "supervisor"],
      default: "mentor",
    },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
    notes: {
      type: String,
      default: "",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminDetail",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate assignments
studentAssignmentSchema.index({ facultyId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model("StudentAssignment", studentAssignmentSchema);
