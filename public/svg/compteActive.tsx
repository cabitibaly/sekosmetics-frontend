import React from "react";

const CompteActiveIcon = ({ className = "", color = "#FF7993" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="6" r="4" fill={color} />
    <ellipse cx="12" cy="17" rx="7" ry="4" fill={color} />
  </svg>
);

export default CompteActiveIcon;
