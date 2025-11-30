import React from 'react';

interface CarIconProps {
  size?: number;
  className?: string;
  color?: string;
}

const CarIcon: React.FC<CarIconProps> = ({ 
  size = 64, 
  className = '', 
  color = '#2563eb' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))' }}
    >
      {/* Shadow di bawah mobil */}
      <ellipse
        cx="50"
        cy="95"
        rx="35"
        ry="8"
        fill="rgba(0, 0, 0, 0.2)"
        opacity="0.5"
      />

      {/* Body mobil - bagian utama */}
      <path
        d="M 20 50 L 15 60 L 15 70 L 25 75 L 75 75 L 85 70 L 85 60 L 80 50 L 75 45 L 60 40 L 40 40 L 25 45 Z"
        fill={color}
        stroke="#1e40af"
        strokeWidth="1.5"
      />

      {/* Highlight di body */}
      <path
        d="M 25 45 L 40 40 L 60 40 L 75 45 L 80 50 L 75 50 L 60 45 L 40 45 L 25 50 Z"
        fill="rgba(255, 255, 255, 0.3)"
      />

      {/* Kaca depan */}
      <path
        d="M 30 45 L 45 40 L 55 40 L 70 45 L 70 50 L 55 48 L 45 48 L 30 50 Z"
        fill="#87ceeb"
        stroke="#4682b4"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Kaca belakang */}
      <path
        d="M 75 45 L 80 50 L 80 55 L 75 55 Z"
        fill="#87ceeb"
        stroke="#4682b4"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Roda kiri depan */}
      <circle
        cx="30"
        cy="70"
        r="8"
        fill="#1a1a1a"
        stroke="#333"
        strokeWidth="2"
      />
      <circle
        cx="30"
        cy="70"
        r="5"
        fill="#4a4a4a"
      />
      <circle
        cx="30"
        cy="70"
        r="3"
        fill="#666"
      />

      {/* Roda kanan depan */}
      <circle
        cx="70"
        cy="70"
        r="8"
        fill="#1a1a1a"
        stroke="#333"
        strokeWidth="2"
      />
      <circle
        cx="70"
        cy="70"
        r="5"
        fill="#4a4a4a"
      />
      <circle
        cx="70"
        cy="70"
        r="3"
        fill="#666"
      />

      {/* Detail garis di body */}
      <line
        x1="25"
        y1="50"
        x2="75"
        y2="50"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />

      {/* Lampu depan */}
      <circle
        cx="20"
        cy="55"
        r="3"
        fill="#ffd700"
        opacity="0.8"
      />
      <circle
        cx="20"
        cy="55"
        r="2"
        fill="#fff"
        opacity="0.9"
      />

      {/* Lampu belakang */}
      <circle
        cx="85"
        cy="65"
        r="2.5"
        fill="#ff4444"
        opacity="0.8"
      />

      {/* Handle pintu */}
      <rect
        x="50"
        y="52"
        width="8"
        height="2"
        rx="1"
        fill="rgba(0, 0, 0, 0.3)"
      />
    </svg>
  );
};

export default CarIcon;

