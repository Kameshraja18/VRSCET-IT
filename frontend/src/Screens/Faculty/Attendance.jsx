import React, { useState, useEffect } from "react";
import { FiCalendar, FiUsers, FiCheck, FiX, FiClock, FiBarChart } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const AttendanceManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("mark"); // "mark" or "report"

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchStudents();
    }
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    try {
      const response = await axiosWrapper.get("/subject", {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axiosWrapper.get(`/student?subjectId=${selectedSubject}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        const studentList = response.data.data;
        // Initialize attendance data for all students
        const initialAttendance = studentList.map(student => ({
          studentId: student._id,
          name: `${student.firstName} ${student.lastName}`,
          enrollmentNo: student.enrollmentNo,
          status: "present", // Default to present
          remarks: ""
        }));
        setStudents(studentList);
        setAttendanceData(initialAttendance);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const updateAttendanceStatus = (studentId, status) => {
    setAttendanceData(prev =>
      prev.map(item =>
        item.studentId === studentId
          ? { ...item, status }
          : item
      )
    );
  };

  const updateRemarks = (studentId, remarks) => {
    setAttendanceData(prev =>
      prev.map(item =>
        item.studentId === studentId
          ? { ...item, remarks }
          : item
      )
    );
  };

  const markAttendance = async () => {
    if (!selectedSubject || !selectedDate) {
      toast.error("Please select subject and date");
      return;
    }

    try {
      setLoading(true);
      const attendanceRecords = attendanceData.map(record => ({
        studentId: record.studentId,
        subjectId: selectedSubject,
        date: selectedDate,
        status: record.status,
        remarks: record.remarks,
        semester: students.find(s => s._id === record.studentId)?.semester || 1,
        branchId: students.find(s => s._id === record.studentId)?.branchId
      }));

      const response = await axiosWrapper.post("/attendance", {
        attendanceData: attendanceRecords
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        toast.success("Attendance marked successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAttendanceStats = () => {
    const present = attendanceData.filter(item => item.status === "present").length;
    const absent = attendanceData.filter(item => item.status === "absent").length;
    const late = attendanceData.filter(item => item.status === "late").length;

    return { present, absent, late, total: attendanceData.length };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading
          title="Attendance Management"
          subtitle="Mark and manage student attendance"
          icon={<FiCalendar />}
        />
        <div className="flex gap-3">
          <CustomButton
            onClick={() => setViewMode("mark")}
            variant={viewMode === "mark" ? "primary" : "outline"}
            icon={<FiUsers />}
          >
            Mark Attendance
          </CustomButton>
          <CustomButton
            onClick={() => setViewMode("report")}
            variant={viewMode === "report" ? "primary" : "outline"}
            icon={<FiBarChart />}
          >
            View Reports
          </CustomButton>
        </div>
      </div>

      {/* Subject and Date Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {selectedSubject && (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FiUsers className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                </div>
                <FiCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                </div>
                <FiX className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Late</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                </div>
                <FiClock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Attendance Marking */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Mark Attendance</h3>
                <CustomButton
                  onClick={markAttendance}
                  variant="primary"
                  loading={loading}
                  icon={<FiCheck />}
                >
                  Save Attendance
                </CustomButton>
              </div>

              {loading ? (
                <Loading text="Loading students..." />
              ) : attendanceData.length === 0 ? (
                <NoData
                  title="No students found"
                  description="No students are enrolled in this subject."
                />
              ) : (
                <div className="space-y-3">
                  {attendanceData.map((record, index) => (
                    <div key={record.studentId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{record.name}</p>
                          <p className="text-sm text-gray-500">{record.enrollmentNo}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          {["present", "absent", "late"].map(status => (
                            <button
                              key={status}
                              onClick={() => updateAttendanceStatus(record.studentId, status)}
                              className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all ${
                                record.status === status
                                  ? getStatusColor(status)
                                  : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>

                        <input
                          type="text"
                          placeholder="Remarks"
                          value={record.remarks}
                          onChange={(e) => updateRemarks(record.studentId, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceManagement;
