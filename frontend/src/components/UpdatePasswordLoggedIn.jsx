import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock, FiEye, FiEyeOff, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import axiosWrapper from "../utils/AxiosWrapper";
import CustomButton from "./CustomButton";

const UpdatePasswordLoggedIn = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const userToken = localStorage.getItem("userToken");
  const userType = localStorage.getItem("userType");

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("One lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("One uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("One number");
    }
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Real-time validation for new password
    if (field === "newPassword") {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({ ...prev, newPassword: passwordErrors.join(", ") }));
      }
    }

    // Check confirm password match
    if (field === "confirmPassword" || field === "newPassword") {
      if (field === "confirmPassword" && value !== formData.newPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else if (field === "newPassword" && formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      newErrors.newPassword = passwordErrors.join(", ");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosWrapper.post(
        `/${userType.toLowerCase()}/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordInput = ({ label, field, placeholder, showToggle = true }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPasswords[field] ? "text" : "password"}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
            errors[field]
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder={placeholder}
          required
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(field)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPasswords[field] ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {errors[field] && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="w-4 h-4 mr-1" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FiLock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">Update Password</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <PasswordInput
              label="Current Password"
              field="currentPassword"
              placeholder="Enter your current password"
            />

            <PasswordInput
              label="New Password"
              field="newPassword"
              placeholder="Enter your new password"
            />

            <PasswordInput
              label="Confirm New Password"
              field="confirmPassword"
              placeholder="Confirm your new password"
            />

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center">
                  <FiCheck className={`w-4 h-4 mr-2 ${formData.newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <FiCheck className={`w-4 h-4 mr-2 ${/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                  One lowercase letter
                </li>
                <li className="flex items-center">
                  <FiCheck className={`w-4 h-4 mr-2 ${/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                  One uppercase letter
                </li>
                <li className="flex items-center">
                  <FiCheck className={`w-4 h-4 mr-2 ${/(?=.*\d)/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                  One number
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <CustomButton
                type="button"
                onClick={onClose}
                variant="secondary"
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                className="flex-1"
                loading={isLoading}
              >
                Update Password
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordLoggedIn;
