const StudentAssignment = require("../models/student-assignment.model");
const FacultyDetail = require("../models/details/faculty-details.model");
const StudentDetail = require("../models/details/student-details.model");
const AdminDetail = require("../models/details/admin-details.model");
const ApiResponse = require("../utils/ApiResponse");

const assignStudentToFaculty = async (req, res, next) => {
  try {
    const { facultyId, studentIds, assignmentType, notes } = req.body;
    const assignedBy = req.user.userId;

    // Validate input
    if (!facultyId) {
      return ApiResponse.badRequest("Faculty ID is required").send(res);
    }

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return ApiResponse.badRequest("At least one student ID is required").send(res);
    }

    // Check if faculty exists
    const faculty = await FacultyDetail.findById(facultyId);
    if (!faculty) {
      return ApiResponse.notFound("Faculty not found").send(res);
    }

    const assignments = [];
    const errors = [];

    // Process each student assignment
    for (const studentId of studentIds) {
      try {
        // Check if student exists
        const student = await StudentDetail.findById(studentId);
        if (!student) {
          errors.push(`Student with ID ${studentId} not found`);
          continue;
        }

        // Check if assignment already exists
        const existingAssignment = await StudentAssignment.findOne({
          facultyId,
          studentId,
          status: "active",
        });

        if (existingAssignment) {
          errors.push(`Student ${student.firstName} ${student.lastName} is already assigned to this faculty member`);
          continue;
        }

        const assignment = await StudentAssignment.create({
          facultyId,
          studentId,
          assignmentType: assignmentType || "mentor",
          notes: notes || "",
          assignedBy,
        });

        assignments.push(assignment);
      } catch (error) {
        errors.push(`Error assigning student ${studentId}: ${error.message}`);
      }
    }

    // Populate the assignments for response
    const populatedAssignments = await StudentAssignment.find({
      _id: { $in: assignments.map(a => a._id) }
    })
      .populate("facultyId", "firstName lastName employeeId")
      .populate("studentId", "firstName lastName enrollmentNo")
      .populate("assignedBy", "firstName lastName");

    const response = {
      assignments: populatedAssignments,
      successCount: assignments.length,
      errorCount: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    };

    return ApiResponse.created(response, `${assignments.length} student(s) assigned to faculty successfully`).send(res);
  } catch (error) {
    console.error("Assign Student Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getFacultyAssignments = async (req, res, next) => {
  try {
    const { facultyId } = req.params;

    const assignments = await StudentAssignment.find({
      facultyId,
      status: "active",
    })
      .populate("studentId", "firstName lastName enrollmentNo email phone semester")
      .populate("facultyId", "firstName lastName employeeId")
      .populate("assignedBy", "firstName lastName")
      .sort({ assignedDate: -1 });

    return ApiResponse.success(assignments, "Faculty assignments retrieved successfully").send(res);
  } catch (error) {
    console.error("Get Faculty Assignments Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getStudentAssignments = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const assignments = await StudentAssignment.find({
      studentId,
      status: "active",
    })
      .populate("facultyId", "firstName lastName employeeId email phone")
      .populate("studentId", "firstName lastName enrollmentNo")
      .populate("assignedBy", "firstName lastName")
      .sort({ assignedDate: -1 });

    return ApiResponse.success(assignments, "Student assignments retrieved successfully").send(res);
  } catch (error) {
    console.error("Get Student Assignments Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getAllAssignments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, facultyId, studentId, assignmentType } = req.query;

    let filter = { status: "active" };

    if (facultyId) filter.facultyId = facultyId;
    if (studentId) filter.studentId = studentId;
    if (assignmentType) filter.assignmentType = assignmentType;

    const assignments = await StudentAssignment.find(filter)
      .populate("facultyId", "firstName lastName employeeId email")
      .populate("studentId", "firstName lastName enrollmentNo email semester")
      .populate("assignedBy", "firstName lastName")
      .sort({ assignedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StudentAssignment.countDocuments(filter);

    return ApiResponse.success(
      {
        assignments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
      "Assignments retrieved successfully"
    ).send(res);
  } catch (error) {
    console.error("Get All Assignments Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignmentType, notes, status } = req.body;

    const assignment = await StudentAssignment.findByIdAndUpdate(
      id,
      { assignmentType, notes, status },
      { new: true }
    )
      .populate("facultyId", "firstName lastName employeeId")
      .populate("studentId", "firstName lastName enrollmentNo")
      .populate("assignedBy", "firstName lastName");

    if (!assignment) {
      return ApiResponse.notFound("Assignment not found").send(res);
    }

    return ApiResponse.success(assignment, "Assignment updated successfully").send(res);
  } catch (error) {
    console.error("Update Assignment Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const removeAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const assignment = await StudentAssignment.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );

    if (!assignment) {
      return ApiResponse.notFound("Assignment not found").send(res);
    }

    return ApiResponse.success(null, "Assignment removed successfully").send(res);
  } catch (error) {
    console.error("Remove Assignment Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getUnassignedStudents = async (req, res, next) => {
  try {
    // Get all students
    const allStudents = await StudentDetail.find({}, "firstName lastName enrollmentNo email semester");

    // Get students who have active assignments
    const assignedStudentIds = await StudentAssignment.distinct("studentId", {
      status: "active",
    });

    // Filter out assigned students
    const unassignedStudents = allStudents.filter(
      (student) => !assignedStudentIds.includes(student._id)
    );

    return ApiResponse.success(unassignedStudents, "Unassigned students retrieved successfully").send(res);
  } catch (error) {
    console.error("Get Unassigned Students Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  assignStudentToFaculty,
  getFacultyAssignments,
  getStudentAssignments,
  getAllAssignments,
  updateAssignment,
  removeAssignment,
  getUnassignedStudents,
};
