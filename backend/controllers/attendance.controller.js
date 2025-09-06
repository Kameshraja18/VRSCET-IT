const Attendance = require("../models/attendance.model");
const Student = require("../models/details/student-details.model");
const ApiResponse = require("../utils/ApiResponse");

// Mark attendance for students
const markAttendanceController = async (req, res) => {
  try {
    const { attendanceData } = req.body; // Array of attendance records
    const facultyId = req.user.userId;

    const attendanceRecords = attendanceData.map(record => ({
      ...record,
      facultyId
    }));

    const savedRecords = await Attendance.insertMany(attendanceRecords);

    res.status(201).json(new ApiResponse(true, "Attendance marked successfully", savedRecords));
  } catch (error) {
    console.error("Mark attendance error:", error);
    if (error.code === 11000) {
      res.status(400).json(new ApiResponse(false, "Attendance already marked for some students on this date"));
    } else {
      res.status(500).json(new ApiResponse(false, "Failed to mark attendance"));
    }
  }
};

// Get attendance for a specific student
const getStudentAttendanceController = async (req, res) => {
  try {
    const { studentId, subjectId, semester, startDate, endDate } = req.query;

    let filter = {};
    if (studentId) filter.studentId = studentId;
    if (subjectId) filter.subjectId = subjectId;
    if (semester) filter.semester = parseInt(semester);
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(filter)
      .populate("subjectId", "name code")
      .populate("facultyId", "firstName lastName")
      .sort({ date: -1 });

    res.json(new ApiResponse(true, "Attendance fetched successfully", attendance));
  } catch (error) {
    console.error("Get student attendance error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to fetch attendance"));
  }
};

// Get attendance summary for a student
const getAttendanceSummaryController = async (req, res) => {
  try {
    const { studentId, semester } = req.query;

    const matchStage = { studentId };
    if (semester) matchStage.semester = parseInt(semester);

    const summary = await Attendance.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { subjectId: "$subjectId", status: "$status" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.subjectId",
          attendance: {
            $push: {
              status: "$_id.status",
              count: "$count"
            }
          },
          totalClasses: { $sum: "$count" }
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "_id",
          as: "subject"
        }
      },
      {
        $unwind: "$subject"
      },
      {
        $project: {
          subjectName: "$subject.name",
          subjectCode: "$subject.code",
          attendance: 1,
          totalClasses: 1
        }
      }
    ]);

    res.json(new ApiResponse(true, "Attendance summary fetched successfully", summary));
  } catch (error) {
    console.error("Get attendance summary error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to fetch attendance summary"));
  }
};

// Update attendance record
const updateAttendanceController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json(new ApiResponse(false, "Attendance record not found"));
    }

    res.json(new ApiResponse(true, "Attendance updated successfully", attendance));
  } catch (error) {
    console.error("Update attendance error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to update attendance"));
  }
};

// Delete attendance record
const deleteAttendanceController = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json(new ApiResponse(false, "Attendance record not found"));
    }

    res.json(new ApiResponse(true, "Attendance record deleted successfully"));
  } catch (error) {
    console.error("Delete attendance error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to delete attendance record"));
  }
};

// Get attendance report for faculty
const getAttendanceReportController = async (req, res) => {
  try {
    const { subjectId, date, semester, branchId } = req.query;
    const facultyId = req.user.userId;

    let filter = { facultyId };
    if (subjectId) filter.subjectId = subjectId;
    if (date) filter.date = new Date(date);
    if (semester) filter.semester = parseInt(semester);
    if (branchId) filter.branchId = branchId;

    const attendance = await Attendance.find(filter)
      .populate("studentId", "firstName lastName enrollmentNo")
      .populate("subjectId", "name code")
      .sort({ date: -1 });

    res.json(new ApiResponse(true, "Attendance report fetched successfully", attendance));
  } catch (error) {
    console.error("Get attendance report error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to fetch attendance report"));
  }
};

module.exports = {
  markAttendanceController,
  getStudentAttendanceController,
  getAttendanceSummaryController,
  updateAttendanceController,
  deleteAttendanceController,
  getAttendanceReportController
};
