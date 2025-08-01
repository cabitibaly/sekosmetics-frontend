import React from "react";

interface LoupeActiveProps {
  className?: string;
  color?: string;
}

const LoupeActive: React.FC<LoupeActiveProps> = ({ className, color = "#FF7993" }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
  >
    <g fill={color}>
      <path d="M289.688,1171.25 L281.429,1163.12 C283.591,1160.77 284.92,1157.67 284.92,1154.25 C284.92,1146.93 278.894,1141 271.46,1141 C264.026,1141 258,1146.93 258,1154.25 C258,1161.56 264.026,1167.49 271.46,1167.49 C274.672,1167.49 277.618,1166.38 279.932,1164.53 L288.224,1172.69 C288.629,1173.09 289.284,1173.09 289.688,1172.69 C290.093,1172.3 290.093,1171.65 289.688,1171.25" transform="translate(-258 -1141)" />
    </g>
  </svg>
);

export default LoupeActive;
