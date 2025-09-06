import React, { useState, useEffect } from "react";
import { FiUserPlus, FiUsers, FiSearch, FiX, FiCheck, FiLoader, FiZap } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const StudentAssignment = () => {
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignmentType, setAssignmentType] = useState("mentor");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("assign");

  useEffect(() => {
    fetchFaculty();
    fetchStudents();
    fetchAssignments();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axiosWrapper.get("/faculty");
      if (response.data.success) {
        setFaculty(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch faculty");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axiosWrapper.get("/student-assignment/unassigned/students");
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axiosWrapper.get("/student-assignment");
      if (response.data.success) {
        setAssignments(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch assignments");
    }
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignStudents = async () => {
    if (!selectedFaculty || selectedStudents.length === 0) {
      toast.error("Please select faculty and students");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosWrapper.post("/student-assignment/assign", {
        facultyId: selectedFaculty,
        studentIds: selectedStudents,
        assignmentType,
        notes
      });

      if (response.data.success) {
        toast.success(`Successfully assigned ${selectedStudents.length} student(s)`);
        setSelectedStudents([]);
        setSelectedFaculty("");
        setNotes("");
        fetchAssignments();
        fetchStudents();
      }
    } catch (error) {
      toast.error("Failed to assign students");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAssignment = async (assignmentId) => {
    try {
      await axiosWrapper.delete(`/student-assignment/${assignmentId}`);
      toast.success("Assignment removed successfully");
      fetchAssignments();
      fetchStudents();
    } catch (error) {
      toast.error("Failed to remove assignment");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentNo.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 page-transition">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
              <FiZap className="text-3xl text-white animate-pulse" />
            </div>
            <div>
              <Heading title="Student Assignment Management" className="text-slate-800" />
              <p className="text-slate-600 text-lg font-medium mt-2">Connect students with faculty mentors for academic excellence</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
              <FiZap className="text-3xl text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mode Toggle with Professional Design */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setViewMode("assign")}
            className={`btn-professional px-8 py-4 text-lg font-semibold rounded-xl flex items-center gap-3 ${
              viewMode === "assign"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl transform scale-105"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <FiUserPlus className="text-xl" />
            Assign Students
          </button>
          <button
            onClick={() => setViewMode("view")}
            className={`btn-professional px-8 py-4 text-lg font-semibold rounded-xl flex items-center gap-3 ${
              viewMode === "view"
                ? "bg-gradient-to-r from-green-600 to-teal-600 shadow-xl transform scale-105"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <FiUsers className="text-xl" />
            View Assignments
          </button>
        </div>

        {viewMode === "assign" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-up">
            {/* Faculty Selection */}
            <div className="card-professional p-8 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FiUsers className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Select Faculty</h3>
                  <p className="text-slate-600">Choose a faculty member to assign students</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-700">Faculty Member</label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="input-professional text-slate-700"
                  >
                    <option value="">Choose Faculty Member</option>
                    {faculty.map((fac) => (
                      <option key={fac._id} value={fac._id}>
                        {fac.firstName} {fac.lastName} (ID: {fac.employeeId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-700">Assignment Type</label>
                  <select
                    value={assignmentType}
                    onChange={(e) => setAssignmentType(e.target.value)}
                    className="input-professional text-slate-700"
                  >
                    <option value="mentor">🎓 Academic Mentor</option>
                    <option value="advisor">👨‍🏫 Academic Advisor</option>
                    <option value="counselor">💬 Career Counselor</option>
                    <option value="supervisor">👁️ Project Supervisor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-700">Additional Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-professional text-slate-700 resize-none"
                    rows="4"
                    placeholder="Add any special instructions or notes about this assignment..."
                  />
                </div>
              </div>
            </div>

            {/* Student Selection */}
            <div className="card-professional p-8 border-l-4 border-l-green-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                  <FiUsers className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Select Students</h3>
                  <p className="text-slate-600">Choose students to assign to the selected faculty</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <FiSearch className="absolute left-4 top-4 text-slate-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search students by name or enrollment number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-professional pl-12 text-slate-700"
                />
              </div>

              {/* Selected Count */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    Selected: {selectedStudents.length} student(s)
                  </div>
                  {selectedStudents.length > 0 && (
                    <button
                      onClick={() => setSelectedStudents([])}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <FiX className="text-lg" />
                    </button>
                  )}
                </div>
              </div>

              {/* Student List */}
              <div className="max-h-96 overflow-y-auto space-y-4">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <FiUsers className="text-slate-400 text-5xl mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No unassigned students found</p>
                  </div>
                ) : (
                  filteredStudents.map((student, index) => (
                    <div
                      key={student._id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                        selectedStudents.includes(student._id)
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-md"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleStudentSelection(student._id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 text-lg">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-slate-600 mt-1 space-y-1">
                            <div>📚 Enrollment: <span className="font-medium">{student.enrollmentNo}</span></div>
                            <div>🎓 Semester: <span className="font-medium">{student.semester}</span></div>
                          </div>
                        </div>
                        {selectedStudents.includes(student._id) && (
                          <div className="ml-4">
                            <div className="p-2 bg-green-500 rounded-full">
                              <FiCheck className="text-white text-lg animate-bounce" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-professional p-8 border-l-4 border-l-purple-500 animate-slide-in-right">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <FiUsers className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Current Assignments</h3>
                <p className="text-slate-600">View and manage all student-faculty assignments</p>
              </div>
            </div>

            {assignments.length === 0 ? (
              <div className="text-center py-16">
                <FiUsers className="text-slate-400 text-6xl mx-auto mb-6" />
                <p className="text-slate-500 text-xl font-medium">No assignments found</p>
                <p className="text-slate-400 text-sm mt-2">Create your first assignment to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                      <th className="px-6 py-4 text-left font-semibold text-slate-700">👨‍🏫 Faculty</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700">🎓 Student</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700">📋 Type</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700">📅 Assigned Date</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700">⚡ Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((assignment, index) => (
                      <tr
                        key={assignment._id}
                        className="border-t border-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">
                            {assignment.facultyId?.firstName} {assignment.facultyId?.lastName}
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            ID: {assignment.facultyId?.employeeId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">
                            {assignment.studentId?.firstName} {assignment.studentId?.lastName}
                          </div>
                          <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mt-1">
                            📚 {assignment.studentId?.enrollmentNo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {assignment.assignmentType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">
                          {new Date(assignment.assignedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleRemoveAssignment(assignment._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <FiX className="inline mr-2" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Assign Button */}
        {viewMode === "assign" && selectedStudents.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAssignStudents}
              disabled={loading}
              className="btn-professional px-12 py-4 text-xl font-semibold rounded-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <FiUserPlus className="text-xl" />
                  Assign {selectedStudents.length} Student(s)
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignment;
