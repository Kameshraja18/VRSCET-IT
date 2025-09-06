import React from "react";

const Loading = ({
  size = "md",
  color = "blue",
  text = "Loading...",
  fullScreen = false,
  className = ""
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      case "xl":
        return "w-16 h-16";
      default:
        return "w-8 h-8";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "yellow":
        return "text-yellow-600";
      case "purple":
        return "text-purple-600";
      case "gray":
        return "text-gray-600";
      default:
        return "text-blue-600";
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <div className={`${getSizeClasses()} ${getColorClasses()} animate-spin`}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent animate-ping opacity-20"></div>
      </div>
      {text && (
        <p className={`${getTextSizeClasses()} ${getColorClasses()} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
