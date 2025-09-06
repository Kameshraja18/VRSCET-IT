import React from "react";

const CustomButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = "left"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-blue-600 shadow-blue-100 hover:shadow-blue-200";
      case "secondary":
        return "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border-gray-300 shadow-gray-100 hover:shadow-gray-200";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border-green-600 shadow-green-100 hover:shadow-green-200";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-red-600 shadow-red-100 hover:shadow-red-200";
      case "warning":
        return "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 border-yellow-500 shadow-yellow-100 hover:shadow-yellow-200";
      case "outline":
        return "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500 shadow-transparent hover:shadow-blue-100";
      case "ghost":
        return "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 focus:ring-gray-500 shadow-transparent hover:shadow-gray-100";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-blue-600 shadow-blue-100 hover:shadow-blue-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2.5 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      case "xl":
        return "px-8 py-4 text-lg";
      default:
        return "px-4 py-2.5 text-sm";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        font-semibold rounded-xl
        border-2 transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'cursor-wait' : 'hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'}
        ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span className={loading ? 'ml-2' : ''}>{children}</span>
      {!loading && icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default CustomButton;
