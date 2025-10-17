import React from "react";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full sm:w-auto px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
