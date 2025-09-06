import React, { useState, useEffect } from "react";
import { FiUsers, FiBookOpen, FiCalendar, FiTrendingUp, FiActivity, FiPlus, FiEye, FiEdit, FiDownload } from "react-icons/fi";
import CustomButton from "./CustomButton";
import Loading from "./Loading";
import NoData from "./NoData";

const Dashboard = ({ userType = "admin" }) => {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      // Mock data - replace with actual API calls
      setTimeout(() => {
        setStats({
          totalStudents: 1250,
          totalFaculty: 85,
          totalSubjects: 45,
          totalBranches: 8,
          activeExams: 12,
          pendingNotices: 5
        });
        setRecentActivities([
          { id: 1, type: "student_added", message: "New student John Doe enrolled", time: "2 hours ago" },
          { id: 2, type: "exam_created", message: "Mathematics exam scheduled for tomorrow", time: "4 hours ago" },
          { id: 3, type: "material_uploaded", message: "New study material uploaded for CS101", time: "6 hours ago" },
          { id: 4, type: "notice_posted", message: "Holiday notice posted", time: "1 day ago" }
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchDashboardData();
  }, []);

  const getQuickActions = () => {
    switch (userType) {
      case "admin":
        return [
          { icon: <FiPlus />, label: "Add Student", action: () => console.log("Add Student") },
          { icon: <FiPlus />, label: "Add Faculty", action: () => console.log("Add Faculty") },
          { icon: <FiPlus />, label: "Create Notice", action: () => console.log("Create Notice") },
          { icon: <FiCalendar />, label: "Schedule Exam", action: () => console.log("Schedule Exam") }
        ];
      case "faculty":
        return [
          { icon: <FiPlus />, label: "Add Marks", action: () => console.log("Add Marks") },
          { icon: <FiPlus />, label: "Upload Material", action: () => console.log("Upload Material") },
          { icon: <FiCalendar />, label: "Update Timetable", action: () => console.log("Update Timetable") },
          { icon: <FiEye />, label: "View Students", action: () => console.log("View Students") }
        ];
      case "student":
        return [
          { icon: <FiEye />, label: "View Marks", action: () => console.log("View Marks") },
          { icon: <FiDownload />, label: "Download Material", action: () => console.log("Download Material") },
          { icon: <FiCalendar />, label: "Check Timetable", action: () => console.log("Check Timetable") },
          { icon: <FiActivity />, label: "View Notices", action: () => console.log("View Notices") }
        ];
      default:
        return [];
    }
  };

  const StatCard = ({ icon, title, value, trend, color = "blue" }) => {
    const getColorClasses = () => {
      switch (color) {
        case "blue":
          return "bg-blue-50 text-blue-600 border-blue-200";
        case "green":
          return "bg-green-50 text-green-600 border-green-200";
        case "yellow":
          return "bg-yellow-50 text-yellow-600 border-yellow-200";
        case "purple":
          return "bg-purple-50 text-purple-600 border-purple-200";
        case "red":
          return "bg-red-50 text-red-600 border-red-200";
        default:
          return "bg-blue-50 text-blue-600 border-blue-200";
      }
    };

    return (
      <div className={`bg-white rounded-xl border-2 ${getColorClasses()} p-6 shadow-sm hover:shadow-md transition-all duration-200`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className="text-sm text-green-600 font-medium mt-1">
                <FiTrendingUp className="inline w-4 h-4 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${getColorClasses().split(' ')[0]} bg-opacity-20`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loading text="Loading dashboard..." fullScreen />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {userType.charAt(0).toUpperCase() + userType.slice(1)}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening in your college management system today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<FiUsers className="w-6 h-6" />}
          title="Total Students"
          value={stats?.totalStudents || 0}
          trend="+12% this month"
          color="blue"
        />
        <StatCard
          icon={<FiBookOpen className="w-6 h-6" />}
          title="Total Faculty"
          value={stats?.totalFaculty || 0}
          trend="+5% this month"
          color="green"
        />
        <StatCard
          icon={<FiCalendar className="w-6 h-6" />}
          title="Active Exams"
          value={stats?.activeExams || 0}
          trend="3 upcoming"
          color="yellow"
        />
        <StatCard
          icon={<FiActivity className="w-6 h-6" />}
          title="Pending Notices"
          value={stats?.pendingNotices || 0}
          trend="2 urgent"
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getQuickActions().map((action, index) => (
            <CustomButton
              key={index}
              onClick={action.action}
              variant="outline"
              className="flex flex-col items-center justify-center h-20 space-y-2 hover:bg-gray-50"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </CustomButton>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">{activity.message}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <NoData
            title="No recent activities"
            description="Activities will appear here as they happen in the system."
            variant="minimal"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
