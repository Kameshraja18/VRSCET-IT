const express = require("express");
const {
  markAttendanceController,
  getStudentAttendanceController,
  getAttendanceSummaryController,
  updateAttendanceController,
  deleteAttendanceController,
  getAttendanceReportController
} = require("../controllers/attendance.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", auth, markAttendanceController);
router.get("/student", auth, getStudentAttendanceController);
router.get("/summary", auth, getAttendanceSummaryController);
router.get("/report", auth, getAttendanceReportController);
router.put("/:id", auth, updateAttendanceController);
router.delete("/:id", auth, deleteAttendanceController);

module.exports = router;
