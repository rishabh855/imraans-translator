'use client';

import React from 'react';

interface CartoonBusProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const CartoonBus: React.FC<CartoonBusProps> = ({
  className = '',
  size = 'md',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-48 h-28',
    md: 'w-72 h-40',
    lg: 'w-96 h-52',
  }[size];

  return (
    <div className={`relative select-none ${sizeClasses} ${className}`}>
      {/* Animated exhaust puff */}
      {animated && (
        <div className="absolute -left-6 bottom-4 flex gap-1 items-center pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-black animate-ping opacity-60" />
          <div className="w-3 h-3 rounded-full bg-slate-200 border-2 border-black animate-bounce opacity-80" />
          <div className="w-2 h-2 rounded-full bg-slate-100 border border-black animate-pulse" />
        </div>
      )}

      {/* Main Bus SVG */}
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-[5px_5px_0px_#1E1B18] ${
          animated ? 'animate-bus-wiggle' : ''
        }`}
      >
        {/* Shadow under bus */}
        <ellipse cx="160" cy="165" rx="130" ry="8" fill="#1E1B18" opacity="0.3" />

        {/* Bus Body */}
        <rect
          x="25"
          y="35"
          width="265"
          height="105"
          rx="24"
          fill="#FFC837"
          stroke="#1E1B18"
          strokeWidth="6"
        />

        {/* Bus Roof Bump */}
        <path
          d="M60 35 Q160 22 255 35"
          stroke="#1E1B18"
          strokeWidth="6"
          fill="#FFB703"
        />

        {/* Top Destination Board */}
        <rect
          x="80"
          y="18"
          width="155"
          height="22"
          rx="6"
          fill="#1E1B18"
          stroke="#1E1B18"
          strokeWidth="4"
        />
        <text
          x="157"
          y="33"
          fill="#FFE484"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui"
          textAnchor="middle"
          letterSpacing="1"
        >
          ⚡ IMRAN EXPRESS 7460 ⚡
        </text>

        {/* Side Stripe */}
        <path
          d="M25 92 H290"
          stroke="#FF6B35"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M25 98 H290"
          stroke="#1E1B18"
          strokeWidth="3"
        />

        {/* Front Windshield */}
        <path
          d="M225 45 H275 C282 45 286 52 284 62 L278 86 H225 V45 Z"
          fill="#67E8F9"
          stroke="#1E1B18"
          strokeWidth="5"
        />
        {/* Windshield glare */}
        <path
          d="M245 49 L270 49 L255 82 L235 82 Z"
          fill="white"
          opacity="0.4"
        />

        {/* Driver (Imran with shades) */}
        <circle cx="250" cy="65" r="9" fill="#FBBF24" stroke="#1E1B18" strokeWidth="3" />
        {/* Sunglasses */}
        <rect x="246" y="62" width="10" height="5" rx="2" fill="#1E1B18" />
        {/* Steering wheel */}
        <ellipse cx="264" cy="74" rx="4" ry="7" fill="none" stroke="#1E1B18" strokeWidth="3" />

        {/* Windows */}
        {[
          { x: 40, label: '👴' },
          { x: 85, label: '🎒' },
          { x: 130, label: '😂' },
          { x: 175, label: '🏃' },
        ].map((win, idx) => (
          <g key={idx}>
            <rect
              x={win.x}
              y="45"
              width="38"
              height="38"
              rx="8"
              fill="#BAE6FD"
              stroke="#1E1B18"
              strokeWidth="5"
            />
            {/* Window glare */}
            <path
              d={`M${win.x + 6} 47 L${win.x + 18} 47 L${win.x + 8} 81 L${win.x + 2} 81 Z`}
              fill="white"
              opacity="0.5"
            />
            {/* Emoji Passenger */}
            <text
              x={win.x + 19}
              y="71"
              fontSize="18"
              textAnchor="middle"
            >
              {win.label}
            </text>
          </g>
        ))}

        {/* Front Headlight */}
        <rect
          x="284"
          y="98"
          width="10"
          height="18"
          rx="4"
          fill="#FEF08A"
          stroke="#1E1B18"
          strokeWidth="4"
        />
        {/* Light Beam */}
        <polygon
          points="294,98 320,85 320,130 294,116"
          fill="#FEF08A"
          opacity="0.35"
        />

        {/* Front Bumper */}
        <rect
          x="278"
          y="125"
          width="18"
          height="14"
          rx="4"
          fill="#E2E8F0"
          stroke="#1E1B18"
          strokeWidth="4"
        />

        {/* Rear Bumper */}
        <rect
          x="18"
          y="125"
          width="14"
          height="14"
          rx="4"
          fill="#E2E8F0"
          stroke="#1E1B18"
          strokeWidth="4"
        />

        {/* Rear Tail Light */}
        <rect
          x="22"
          y="98"
          width="6"
          height="16"
          rx="2"
          fill="#EF4444"
          stroke="#1E1B18"
          strokeWidth="3"
        />

        {/* Side Text / Badge */}
        <g transform="translate(100, 118)">
          <rect
            x="-4"
            y="-14"
            width="112"
            height="22"
            rx="6"
            fill="#FEF3C7"
            stroke="#1E1B18"
            strokeWidth="3"
          />
          <text
            x="52"
            y="1"
            fill="#1E1B18"
            fontSize="11"
            fontWeight="900"
            fontFamily="Fredoka, system-ui"
            textAnchor="middle"
          >
            OPADSE GUARANTEED
          </text>
        </g>

        {/* Wheel Arches */}
        <path
          d="M62 140 A24 24 0 0 1 114 140"
          fill="#1E1B18"
        />
        <path
          d="M205 140 A24 24 0 0 1 257 140"
          fill="#1E1B18"
        />

        {/* Rear Wheel */}
        <g transform="translate(88, 140)">
          <circle cx="0" cy="0" r="22" fill="#1E1B18" stroke="#1E1B18" strokeWidth="3" />
          <circle cx="0" cy="0" r="14" fill="#94A3B8" stroke="#1E1B18" strokeWidth="3" />
          <circle cx="0" cy="0" r="6" fill="#F1F5F9" stroke="#1E1B18" strokeWidth="2" />
          {/* Wheel spokes */}
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#1E1B18" strokeWidth="2" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#1E1B18" strokeWidth="2" />
        </g>

        {/* Front Wheel */}
        <g transform="translate(231, 140)">
          <circle cx="0" cy="0" r="22" fill="#1E1B18" stroke="#1E1B18" strokeWidth="3" />
          <circle cx="0" cy="0" r="14" fill="#94A3B8" stroke="#1E1B18" strokeWidth="3" />
          <circle cx="0" cy="0" r="6" fill="#F1F5F9" stroke="#1E1B18" strokeWidth="2" />
          {/* Wheel spokes */}
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#1E1B18" strokeWidth="2" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#1E1B18" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
