'use client';

import React from 'react';

interface ImranMascotProps {
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ImranMascot: React.FC<ImranMascotProps> = ({
  speechText = 'KALE BY-PASS THI BUS OPAADSE!',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-36 h-36',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  }[size];

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Speech bubble */}
      {speechText && (
        <div className="relative mb-2 max-w-[240px] bg-white border-3 border-black rounded-2xl p-2.5 shadow-comic text-xs font-bold text-center animate-bus-bounce">
          <span>{speechText}</span>
          {/* Arrow */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
        </div>
      )}

      {/* Imran Character SVG */}
      <div className={`${sizeMap} select-none drop-shadow-[4px_4px_0px_#1E1B18]`}>
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Legs */}
          <rect x="58" y="115" width="16" height="32" rx="6" fill="#1E293B" stroke="#1E1B18" strokeWidth="4" />
          <rect x="86" y="115" width="16" height="32" rx="6" fill="#1E293B" stroke="#1E1B18" strokeWidth="4" />
          {/* Shoes */}
          <rect x="52" y="140" width="24" height="12" rx="5" fill="#EF4444" stroke="#1E1B18" strokeWidth="3" />
          <rect x="84" y="140" width="24" height="12" rx="5" fill="#EF4444" stroke="#1E1B18" strokeWidth="3" />

          {/* Body / Bus Manager Vest */}
          <rect x="45" y="65" width="70" height="55" rx="16" fill="#FFC837" stroke="#1E1B18" strokeWidth="5" />
          
          {/* Neon Safety Vest Stripes */}
          <path d="M56 66 L56 120" stroke="#10B981" strokeWidth="8" strokeDasharray="4 2" />
          <path d="M104 66 L104 120" stroke="#10B981" strokeWidth="8" strokeDasharray="4 2" />
          
          {/* ID Badge around neck */}
          <path d="M72 65 L80 82 L88 65" stroke="#1E1B18" strokeWidth="3" fill="none" />
          <rect x="73" y="82" width="14" height="18" rx="2" fill="#FFFFFF" stroke="#1E1B18" strokeWidth="2" />
          <rect x="76" y="85" width="8" height="4" fill="#3B82F6" />
          <line x1="75" y1="92" x2="85" y2="92" stroke="#1E1B18" strokeWidth="1" />
          <line x1="75" y1="95" x2="83" y2="95" stroke="#1E1B18" strokeWidth="1" />

          {/* Left Arm with Clipboard */}
          <path d="M46 75 L28 92" stroke="#1E1B18" strokeWidth="8" strokeLinecap="round" />
          {/* Clipboard */}
          <rect x="14" y="86" width="22" height="30" rx="3" fill="#D97706" stroke="#1E1B18" strokeWidth="3" />
          <rect x="17" y="89" width="16" height="23" fill="#FFFDF5" />
          <line x1="20" y1="94" x2="30" y2="94" stroke="#1E1B18" strokeWidth="2" />
          <line x1="20" y1="99" x2="28" y2="99" stroke="#1E1B18" strokeWidth="2" />
          <line x1="20" y1="104" x2="29" y2="104" stroke="#1E1B18" strokeWidth="2" />
          <rect x="22" y="84" width="6" height="4" rx="1" fill="#475569" stroke="#1E1B18" strokeWidth="1" />

          {/* Right Arm holding Megaphone */}
          <path d="M114 75 L130 68" stroke="#1E1B18" strokeWidth="8" strokeLinecap="round" />
          {/* Megaphone */}
          <polygon points="128,68 152,56 152,80" fill="#EF4444" stroke="#1E1B18" strokeWidth="3" />
          <rect x="122" y="65" width="8" height="8" rx="2" fill="#1E1B18" />
          <ellipse cx="152" cy="68" rx="3" ry="12" fill="#FEE2E2" stroke="#1E1B18" strokeWidth="2" />
          {/* Sound waves */}
          <path d="M156 60 Q160 68 156 76" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" />

          {/* Head & Neck */}
          <circle cx="80" cy="45" r="24" fill="#FDE047" stroke="#1E1B18" strokeWidth="5" />
          
          {/* Bus Coordinator Cap */}
          <path d="M54 36 C56 22 72 16 80 16 C88 16 104 22 106 36 Z" fill="#1E1B18" stroke="#1E1B18" strokeWidth="4" />
          <path d="M50 36 C65 32 95 32 110 36" stroke="#FFC837" strokeWidth="5" strokeLinecap="round" />
          {/* Cap Emblem */}
          <circle cx="80" cy="27" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Cool Sunglasses */}
          <path d="M64 42 H77 V50 C77 53 74 55 70 55 H67 C64 55 64 53 64 50 Z" fill="#1E1B18" />
          <path d="M83 42 H96 V50 C96 53 93 55 89 55 H86 C83 55 83 53 83 50 Z" fill="#1E1B18" />
          <line x1="77" y1="45" x2="83" y2="45" stroke="#1E1B18" strokeWidth="3" />
          {/* Glasses Glare */}
          <line x1="66" y1="45" x2="72" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="45" x2="91" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Big Confident Smile / Mustache */}
          <path d="M72 58 Q80 62 88 58" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 57 Q80 54 90 57" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
