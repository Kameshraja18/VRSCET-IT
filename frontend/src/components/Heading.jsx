import React from "react";

const Heading = ({
  title,
  subtitle,
  icon,
  size = "lg",
  color = "blue",
  className = "",
  actions,
  borderColor,
  gradient = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-lg";
      case "md":
        return "text-2xl";
      case "lg":
        return "text-3xl";
      case "xl":
        return "text-4xl";
      case "2xl":
        return "text-5xl";
      default:
        return "text-3xl";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "text-blue-600 border-blue-500";
      case "green":
        return "text-green-600 border-green-500";
      case "red":
        return "text-red-600 border-red-500";
      case "yellow":
        return "text-yellow-600 border-yellow-500";
      case "purple":
        return "text-purple-600 border-purple-500";
      case "gray":
        return "text-gray-600 border-gray-500";
      default:
        return "text-blue-600 border-blue-500";
    }
  };

  const getGradientClasses = () => {
    if (!gradient) return "";
    switch (color) {
      case "blue":
        return "bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent";
      case "green":
        return "bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent";
      case "red":
        return "bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent";
      case "yellow":
        return "bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent";
      case "purple":
        return "bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent";
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4 ${className}`}>
      <div className="flex items-center">
        <div className={`flex items-center ${borderColor ? `border-l-8 ${borderColor}` : `border-l-8 ${getColorClasses().split(' ')[1]}`} pl-3`}>
          {icon && (
            <div className={`mr-3 ${getColorClasses().split(' ')[0]}`}>
              {icon}
            </div>
          )}
          <div>
            <h1 className={`font-bold ${getSizeClasses()} ${gradient ? getGradientClasses() : getColorClasses().split(' ')[0]}`}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 text-sm mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Heading;
