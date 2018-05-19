import React from "react";

export default function Printout({ theme }) {
  const fill = theme === "light" ? "#ffffff" : "#000000";
  const stroke = theme === "light" ? "#000000" : "#ffffff";
  const grayscale = theme === "dark" ? "#ffffff" : "#ddd";
  return (
    <svg viewBox="0 0 90 120" width="40px" height="36px">
      <title>printout</title>
      <g>
        <rect
          x="0"
          y="0"
          width="90"
          height="120"
          fill={grayscale}
          stroke={stroke}
        />
        <rect x="0" y="0" width="90" height="20" fill="#b8d877" stroke="#fff" />
        <rect
          x="0"
          y="40"
          width="90"
          height="20"
          fill="#b8d877"
          stroke="#fff"
        />
        <rect
          x="0"
          y="80"
          width="90"
          height="20"
          fill="#b8d877"
          stroke="#fff"
        />
        <rect
          x="0"
          y="0"
          width="16"
          height="120"
          fill="none"
          stroke="#231f20"
        />
        <rect
          x="74"
          y="0"
          width="16"
          height="120"
          fill="none"
          stroke="#231f20"
        />
        <circle cx="8" cy="10" r="5" fill={fill} stroke={stroke} />
        <circle cx="8" cy="30" r="5" fill={fill} stroke={stroke} />
        <circle cx="8" cy="50" r="5" fill={fill} stroke={stroke} />
        <circle cx="8" cy="70" r="5" fill={fill} stroke={stroke} />
        <circle cx="8" cy="90" r="5" fill={fill} stroke={stroke} />
        <circle cx="8" cy="110" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="10" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="30" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="50" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="70" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="90" r="5" fill={fill} stroke={stroke} />
        <circle cx="82" cy="110" r="5" fill={fill} stroke={stroke} />
      </g>
    </svg>
  );
}
