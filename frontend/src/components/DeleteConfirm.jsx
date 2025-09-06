import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import CustomButton from "./CustomButton";

const DeleteConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirm Delete",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  loading = false
}) => {
  if (!isOpen) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case "danger":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 border-b border-gray-200 ${getVariantClasses()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-white ${getIconColor()}`}>
                  <FiAlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {message ||
                "Are you sure you want to delete this item? This action cannot be undone."}
            </p>

            {/* Warning note */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 flex items-center">
                <FiAlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex justify-end gap-3">
            <CustomButton
              onClick={onClose}
              variant="secondary"
              disabled={loading}
            >
              {cancelText}
            </CustomButton>
            <CustomButton
              onClick={onConfirm}
              variant={variant}
              loading={loading}
            >
              {confirmText}
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
