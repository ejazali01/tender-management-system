import React from "react";

const Loading = () => {
  return (
    <svg className="w-6 h-6 animate-rotate" viewBox="0 0 50 50">
      <circle
        className="path stroke-current text-black animate-dash"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};

export default Loading;
