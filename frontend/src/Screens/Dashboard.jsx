import React from "react";
import {
  FiUsers,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiTrendingUp,
  FiActivity,
  FiAward,
  FiClock,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: FiUsers,
      color: "blue",
      description: "Active enrollments"
    },
    {
      title: "Faculty Members",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: FiUser,
      color: "green",
      description: "Teaching staff"
    },
    {
      title: "Active Subjects",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: FiBookOpen,
      color: "purple",
      description: "Current semester"
    },
    {
      title: "This Month",
      value: "24",
      change: "+15%",
      changeType: "positive",
      icon: FiCalendar,
      color: "orange",
      description: "New registrations"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "student",
      message: "New student John Doe enrolled in CSE",
      time: "2 hours ago",
      icon: FiUsers,
      color: "blue"
    },
    {
      id: 2,
      type: "exam",
      message: "Mid-term examination scheduled for tomorrow",
      time: "4 hours ago",
      icon: FiCalendar,
      color: "orange"
    },
    {
      id: 3,
      type: "faculty",
      message: "Dr. Smith uploaded new study materials",
      time: "6 hours ago",
      icon: FiUser,
      color: "green"
    },
    {
      id: 4,
      type: "grade",
      message: "Semester grades published for 2024 batch",
      time: "1 day ago",
      icon: FiAward,
      color: "purple"
    }
  ];

  const quickActions = [
    {
      title: "Add Student",
      description: "Register new student",
      icon: FiUsers,
      color: "blue",
      action: () => console.log("Add student")
    },
    {
      title: "Schedule Exam",
      description: "Create new examination",
      icon: FiCalendar,
      color: "green",
      action: () => console.log("Schedule exam")
    },
    {
      title: "Upload Material",
      description: "Share study resources",
      icon: FiBookOpen,
      color: "purple",
      action: () => console.log("Upload material")
    },
    {
      title: "View Reports",
      description: "Check analytics",
      icon: FiTrendingUp,
      color: "orange",
      action: () => console.log("View reports")
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        icon: "text-blue-600",
        bgLight: "bg-blue-500"
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        icon: "text-green-600",
        bgLight: "bg-green-500"
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        icon: "text-purple-600",
        bgLight: "bg-purple-500"
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
        icon: "text-orange-600",
        bgLight: "bg-orange-500"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Welcome to College Management System</h1>
            <p className="text-blue-100 text-lg mb-4">Manage your institution efficiently with our comprehensive dashboard</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <FiActivity className="text-green-300" />
                <span>System Status: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="text-blue-300" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block ml-8">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FiActivity className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`text-xl ${colors.icon}`} />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <FiArrowUp className="text-xs" />
                  ) : (
                    <FiArrowDown className="text-xs" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-gray-500 text-xs">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <FiActivity className="text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colors = getColorClasses(action.color);

              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`group p-4 ${colors.bg} ${colors.border} border rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
                >
                  <Icon className={`text-2xl ${colors.icon} mb-3 group-hover:scale-110 transition-transform duration-200`} />
                  <h3 className="font-semibold text-gray-900 mb-1 text-left">{action.title}</h3>
                  <p className="text-sm text-gray-600 text-left">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <FiClock className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              const colors = getColorClasses(activity.color);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">{activity.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FiClock className="text-gray-400 text-xs" />
                      <span className="text-gray-500 text-xs">{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">System Status</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">All systems operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-gray-900">Database</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-gray-900">Server</p>
              <p className="text-sm text-gray-600">Response time: 45ms</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-gray-900">Backup</p>
              <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;