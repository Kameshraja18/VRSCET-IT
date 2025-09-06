import React from "react";
import { FiInbox } from "react-icons/fi";

const NoData = ({
  title = "No data found",
  description = "There are no items to display at the moment.",
  icon: CustomIcon,
  actionButton,
  className = "",
  variant = "default"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "text-gray-400";
      case "primary":
        return "text-blue-500";
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "danger":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const IconComponent = CustomIcon || FiInbox;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="relative mb-6">
        <div className={`w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center ${getVariantClasses()}`}>
          <IconComponent className="w-12 h-12" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className={`w-3 h-3 rounded-full ${getVariantClasses().replace('text-', 'bg-')}`}></div>
        </div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {actionButton && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {actionButton}
          </div>
        )}
      </div>

      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default NoData;
