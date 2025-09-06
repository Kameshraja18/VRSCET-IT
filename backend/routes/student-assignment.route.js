const express = require("express");
const router = express.Router();
const {
  assignStudentToFaculty,
  getFacultyAssignments,
  getStudentAssignments,
  getAllAssignments,
  updateAssignment,
  removeAssignment,
  getUnassignedStudents,
} = require("../controllers/student-assignment.controller");
const auth = require("../middlewares/auth.middleware");

// Assign student to faculty
router.post("/assign", auth, assignStudentToFaculty);

// Get assignments for a specific faculty
router.get("/faculty/:facultyId", auth, getFacultyAssignments);

// Get assignments for a specific student
router.get("/student/:studentId", auth, getStudentAssignments);

// Get all assignments with pagination and filters
router.get("/", auth, getAllAssignments);

// Update assignment
router.patch("/:id", auth, updateAssignment);

// Remove assignment (set status to inactive)
router.delete("/:id", auth, removeAssignment);

// Get unassigned students
router.get("/unassigned/students", auth, getUnassignedStudents);

module.exports = router;
