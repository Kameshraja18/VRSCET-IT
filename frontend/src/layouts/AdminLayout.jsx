import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiLogOut,
  FiHome,
  FiUsers,
  FiBookOpen,
  FiFileText,
  FiCalendar,
  FiUser,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUserCheck
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: FiHome, path: "/admin" },
    { id: "student", label: "Students", icon: FiUsers, path: "/admin/student" },
    { id: "faculty", label: "Faculty", icon: FiUser, path: "/admin/faculty" },
    { id: "branch", label: "Branches", icon: FiBookOpen, path: "/admin/branch" },
    { id: "subjects", label: "Subjects", icon: FiFileText, path: "/admin/subject" },
    { id: "exam", label: "Exams", icon: FiCalendar, path: "/admin/exam" },
    { id: "notice", label: "Notices", icon: FiFileText, path: "/admin/notice" },
    { id: "assignments", label: "Student Assignments", icon: FiUserCheck, path: "/admin/student-assignments" },
  ];

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <RxDashboard className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-blue-100 text-sm">Management System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors duration-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <Icon className={`mr-3 text-lg transition-colors duration-200 ${
                  isActive(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                }`} />
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logouthandler}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <FiLogOut className="mr-3 text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
              >
                <FiMenu className="text-xl" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {menuItems.find(item => isActive(item.path))?.label || "Dashboard"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Welcome back, Administrator
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Today:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <FiChevronDown className={`text-sm transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Administrator</p>
                      <p className="text-xs text-gray-500">admin@college.edu</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Profile Settings
                    </button>
                    <button
                      onClick={logouthandler}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;