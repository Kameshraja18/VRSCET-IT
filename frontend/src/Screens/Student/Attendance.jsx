import React, { useState, useEffect } from "react";
import { FiCalendar, FiBarChart, FiClock, FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const StudentAttendance = () => {
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [detailedAttendance, setDetailedAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    fetchAttendanceSummary();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchDetailedAttendance();
    }
  }, [selectedSubject, dateRange]);

  const fetchAttendanceSummary = async () => {
    try {
      setLoading(true);
      const response = await axiosWrapper.get("/attendance/summary", {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setAttendanceSummary(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch attendance summary");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailedAttendance = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSubject) params.append("subjectId", selectedSubject);
      if (dateRange.startDate) params.append("startDate", dateRange.startDate);
      if (dateRange.endDate) params.append("endDate", dateRange.endDate);

      const response = await axiosWrapper.get(`/attendance/student?${params}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setDetailedAttendance(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch detailed attendance");
    } finally {
      setLoading(false);
    }
  };

  const getAttendancePercentage = (attendance) => {
    if (!attendance || attendance.length === 0) return 0;

    const totalClasses = attendance.reduce((sum, item) => sum + item.count, 0);
    const presentClasses = attendance.find(item => item.status === "present")?.count || 0;

    return totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Heading
        title="My Attendance"
        subtitle="View your attendance records and statistics"
        icon={<FiCalendar />}
      />

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full">
            <Loading text="Loading attendance data..." />
          </div>
        ) : attendanceSummary.length === 0 ? (
          <div className="col-span-full">
            <NoData
              title="No attendance data"
              description="Your attendance records will appear here once classes begin."
            />
          </div>
        ) : (
          attendanceSummary.map((subject) => {
            const percentage = getAttendancePercentage(subject.attendance);
            return (
              <div key={subject._id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{subject.subjectName}</h3>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPercentageColor(percentage) === 'text-green-600' ? 'bg-green-100' : getPercentageColor(percentage) === 'text-yellow-600' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                    <FiBarChart className={`w-6 h-6 ${getPercentageColor(percentage)}`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Attendance Rate</span>
                    <span className={`font-bold text-lg ${getPercentageColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${percentage >= 85 ? 'bg-green-500' : percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Classes: {subject.totalClasses}</span>
                    <span>Present: {subject.attendance.find(a => a.status === "present")?.count || 0}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detailed Attendance View */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Detailed Attendance</h3>

            <div className="flex gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {attendanceSummary.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="End Date"
              />
            </div>
          </div>

          {detailedAttendance.length === 0 ? (
            <NoData
              title="No attendance records"
              description="No attendance records found for the selected criteria."
            />
          ) : (
            <div className="space-y-3">
              {detailedAttendance.map((record) => (
                <div key={record._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                      {record.status === "present" ? (
                        <FiCheck className="w-5 h-5" />
                      ) : record.status === "absent" ? (
                        <FiX className="w-5 h-5" />
                      ) : (
                        <FiClock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{record.subjectId?.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                    {record.remarks && (
                      <span className="text-sm text-gray-500 italic">
                        "{record.remarks}"
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
