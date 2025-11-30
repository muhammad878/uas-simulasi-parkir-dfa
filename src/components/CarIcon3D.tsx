import React from 'react';

interface CarIcon3DProps {
  size?: number;
  className?: string;
  color?: string;
  isMoving?: boolean;
}

const CarIcon3D: React.FC<CarIcon3DProps> = ({ 
  size = 80, 
  className = '', 
  color = '#2563eb',
  isMoving = false
}) => {
  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: 'perspective(500px) rotateX(-5deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.4))',
          transform: 'translateZ(10px)'
        }}
      >
        {/* Shadow besar di bawah */}
        <ellipse
          cx="60"
          cy="115"
          rx="45"
          ry="10"
          fill="rgba(0, 0, 0, 0.3)"
          opacity="0.6"
        />

        {/* Body mobil - isometric style */}
        {/* Atap */}
        <path
          d="M 30 50 L 35 40 L 85 40 L 90 50 L 85 60 L 35 60 Z"
          fill={color}
          stroke="#1e40af"
          strokeWidth="2"
        />

        {/* Highlight atap */}
        <path
          d="M 35 40 L 85 40 L 90 50 L 85 50 L 35 50 Z"
          fill="rgba(255, 255, 255, 0.4)"
        />

        {/* Body samping */}
        <path
          d="M 30 50 L 25 65 L 25 75 L 35 80 L 85 80 L 95 75 L 95 65 L 90 50 Z"
          fill={color}
          stroke="#1e40af"
          strokeWidth="2"
        />

        {/* Highlight body */}
        <path
          d="M 30 50 L 25 65 L 25 70 L 30 70 L 90 70 L 95 70 L 95 65 L 90 50 Z"
          fill="rgba(255, 255, 255, 0.3)"
        />

        {/* Kaca depan */}
        <path
          d="M 40 45 L 50 40 L 70 40 L 80 45 L 80 50 L 70 48 L 50 48 L 40 50 Z"
          fill="#87ceeb"
          stroke="#4682b4"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Kaca belakang */}
        <path
          d="M 85 40 L 90 50 L 90 55 L 85 55 Z"
          fill="#87ceeb"
          stroke="#4682b4"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Roda kiri depan - 3D effect */}
        <g transform="translate(25, 75)">
          {/* Shadow roda */}
          <ellipse cx="0" cy="5" rx="10" ry="3" fill="rgba(0, 0, 0, 0.4)" />
          {/* Roda */}
          <circle cx="0" cy="0" r="10" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
          <circle cx="0" cy="0" r="7" fill="#2a2a2a" />
          <circle cx="0" cy="0" r="5" fill="#3a3a3a" />
          {/* Rim */}
          <circle cx="0" cy="0" r="4" fill="#555" />
          <circle cx="0" cy="0" r="2" fill="#777" />
          {/* Highlight */}
          <ellipse cx="-2" cy="-2" rx="3" ry="1.5" fill="rgba(255, 255, 255, 0.3)" />
        </g>

        {/* Roda kanan depan - 3D effect */}
        <g transform="translate(95, 75)">
          {/* Shadow roda */}
          <ellipse cx="0" cy="5" rx="10" ry="3" fill="rgba(0, 0, 0, 0.4)" />
          {/* Roda */}
          <circle cx="0" cy="0" r="10" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
          <circle cx="0" cy="0" r="7" fill="#2a2a2a" />
          <circle cx="0" cy="0" r="5" fill="#3a3a3a" />
          {/* Rim */}
          <circle cx="0" cy="0" r="4" fill="#555" />
          <circle cx="0" cy="0" r="2" fill="#777" />
          {/* Highlight */}
          <ellipse cx="-2" cy="-2" rx="3" ry="1.5" fill="rgba(255, 255, 255, 0.3)" />
        </g>

        {/* Lampu depan - glow effect */}
        <circle cx="25" cy="60" r="4" fill="#ffd700" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;1;0.9"
            dur="1s"
            repeatCount="indefinite"
            begin={isMoving ? "0s" : "indefinite"}
          />
        </circle>
        <circle cx="25" cy="60" r="2.5" fill="#fff" opacity="1" />

        {/* Lampu belakang */}
        <circle cx="95" cy="70" r="3" fill="#ff4444" opacity="0.8" />

        {/* Handle pintu */}
        <rect x="55" y="58" width="10" height="3" rx="1.5" fill="rgba(0, 0, 0, 0.4)" />

        {/* Detail garis */}
        <line x1="35" y1="55" x2="85" y2="55" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
        <line x1="35" y1="70" x2="85" y2="70" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="1" />

        {/* Exhaust pipe */}
        <rect x="20" y="78" width="3" height="4" rx="1" fill="#333" />
        <ellipse cx="21.5" cy="82" rx="2" ry="1" fill="rgba(100, 100, 100, 0.5)" />
      </svg>

      {/* Exhaust smoke effect saat bergerak */}
      {isMoving && (
        <div
          style={{
            position: 'absolute',
            left: '15%',
            bottom: '15%',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(200, 200, 200, 0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'smoke 1s ease-out infinite',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default CarIcon3D;

