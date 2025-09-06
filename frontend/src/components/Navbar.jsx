import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiSettings, FiBell, FiMenu, FiX } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import CustomButton from "./CustomButton";

const Navbar = ({ userType = "admin", userName = "User" }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const getUserTypeColor = () => {
    switch (userType) {
      case "admin":
        return "text-blue-600 bg-blue-50";
      case "faculty":
        return "text-green-600 bg-green-50";
      case "student":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div
                className="flex items-center cursor-pointer group"
                onClick={() => navigate("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white mr-3 group-hover:shadow-lg transition-all duration-200">
                  <RxDashboard className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    College Management
                  </h1>
                  <p className="text-sm text-gray-500 capitalize">
                    {userType} Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getUserTypeColor()}`}>
                  <FiUser className="w-4 h-4" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userType}</p>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{userType}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiSettings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={logouthandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {showMobileMenu ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getUserTypeColor()}`}>
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{userType}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                  <FiBell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    3
                  </span>
                </button>
              </div>

              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center">
                <FiUser className="w-5 h-5 mr-3" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center">
                <FiSettings className="w-5 h-5 mr-3" />
                Settings
              </button>
              <button
                onClick={logouthandler}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center"
              >
                <FiLogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
