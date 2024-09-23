import React from "react";

type TButtonProps = {
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<TButtonProps> = ({ loading, onClick, children }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`font-bold rounded-lg text-md mb-6 p-4 bg-[#4DB6AC] hover:bg-[#379D8F] text-[#ffffff] justify-center ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
