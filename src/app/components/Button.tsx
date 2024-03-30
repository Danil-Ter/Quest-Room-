import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mt-10 px-10 py-5 rounded-full bg-orange-500 text-white shadow-md hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
      onClick={onClick}
    >
      Забронювати
    </button>
  );
};

export default Button;
