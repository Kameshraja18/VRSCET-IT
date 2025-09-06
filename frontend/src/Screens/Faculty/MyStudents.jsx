import React, { useState, useEffect } from "react";
import { FiUsers, FiMail, FiPhone, FiCalendar, FiUser, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import { useSelector } from "react-redux";

const MyStudents = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (userData?._id) {
      fetchMyAssignments();
    }
  }, [userData]);

  const fetchMyAssignments = async () => {
    try {
      // Get current faculty ID from Redux userData
      const facultyId = userData?._id;

      if (!facultyId) {
        toast.error("Faculty ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await axiosWrapper.get(`/student-assignment/faculty/${facultyId}`);
      if (response.data.success) {
        setAssignments(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch assigned students");
    } finally {
      setLoading(false);
    }
  };

  const getAssignmentTypeColor = (type) => {
    switch (type) {
      case "mentor":
        return "bg-blue-100 text-blue-800";
      case "advisor":
        return "bg-green-100 text-green-800";
      case "counselor":
        return "bg-purple-100 text-purple-800";
      case "supervisor":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <Heading title="My Assigned Students" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <FiUsers className="text-blue-600 text-2xl mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{assignments.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <FiUser className="text-green-600 text-2xl mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {assignments.filter(a => a.assignmentType === "mentor").length}
              </div>
              <div className="text-sm text-gray-600">Mentor</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <FiCalendar className="text-purple-600 text-2xl mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {assignments.filter(a => a.assignmentType === "advisor").length}
              </div>
              <div className="text-sm text-gray-600">Advisor</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <FiPhone className="text-orange-600 text-2xl mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {assignments.filter(a => a.assignmentType === "counselor").length}
              </div>
              <div className="text-sm text-gray-600">Counselor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Assigned Students</h3>
        </div>

        {assignments.length === 0 ? (
          <NoData message="No students assigned to you yet" />
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedStudent(assignment)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">
                      {assignment.studentId?.firstName} {assignment.studentId?.lastName}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getAssignmentTypeColor(
                        assignment.assignmentType
                      )}`}
                    >
                      {assignment.assignmentType}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 mr-2" />
                      Enrollment: {assignment.studentId?.enrollmentNo}
                    </div>
                    <div className="flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      {assignment.studentId?.email}
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-2" />
                      {assignment.studentId?.phone}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      Semester: {assignment.studentId?.semester}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                    Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Student Details</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-medium">Name:</label>
                <p>{selectedStudent.studentId?.firstName} {selectedStudent.studentId?.lastName}</p>
              </div>
              <div>
                <label className="font-medium">Enrollment:</label>
                <p>{selectedStudent.studentId?.enrollmentNo}</p>
              </div>
              <div>
                <label className="font-medium">Email:</label>
                <p>{selectedStudent.studentId?.email}</p>
              </div>
              <div>
                <label className="font-medium">Phone:</label>
                <p>{selectedStudent.studentId?.phone}</p>
              </div>
              <div>
                <label className="font-medium">Semester:</label>
                <p>{selectedStudent.studentId?.semester}</p>
              </div>
              <div>
                <label className="font-medium">Assignment Type:</label>
                <p className="capitalize">{selectedStudent.assignmentType}</p>
              </div>
              {selectedStudent.notes && (
                <div>
                  <label className="font-medium">Notes:</label>
                  <p>{selectedStudent.notes}</p>
                </div>
              )}
              <div>
                <label className="font-medium">Assigned Date:</label>
                <p>{new Date(selectedStudent.assignedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <CustomButton onClick={() => setSelectedStudent(null)} variant="outline">
                Close
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudents;
