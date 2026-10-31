'use client';

import React from 'react';

interface ConfusionMeterProps {
  score: number; // 0 to 10
  className?: string;
}

export const ConfusionMeter: React.FC<ConfusionMeterProps> = ({ score, className = '' }) => {
  // Determine severity tier
  let label = 'Mildly Understandable';
  let color = 'bg-emerald-400';
  let emoji = '🙂';

  if (score >= 9) {
    label = 'Brain Melting Gujarati Sorcery';
    color = 'bg-purple-500 text-white';
    emoji = '🤯';
  } else if (score >= 7.5) {
    label = 'Severe WhatsApp Emergency';
    color = 'bg-red-500 text-white';
    emoji = '🚨';
  } else if (score >= 6) {
    label = 'Standard Imran Cryptic Broadcast';
    color = 'bg-amber-400 text-black';
    emoji = '🤔';
  } else if (score >= 4) {
    label = 'Decipherable with One Cup of Chai';
    color = 'bg-yellow-300 text-black';
    emoji = '☕';
  }

  const percentage = Math.min(100, Math.max(0, (score / 10) * 100));

  return (
    <div className={`bg-white border-2 border-black rounded-2xl p-3.5 shadow-comic-sm ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xl">{emoji}</span>
          <span className="text-xs font-black uppercase tracking-wider text-zinc-700">
            Imran Confusion Meter
          </span>
        </div>
        <div className="flex items-center gap-1 font-black text-sm">
          <span className="text-base text-bus-orange font-comic">{score.toFixed(1)}</span>
          <span className="text-zinc-400 text-xs">/ 10</span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-4 bg-zinc-100 rounded-full border-2 border-black overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            score >= 8 ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' : 'bg-bus-yellow'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Tier Label */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-zinc-600">
        <span className="truncate">{label}</span>
        <span className="text-[10px] text-zinc-400 font-mono">{percentage.toFixed(0)}% Chaos</span>
      </div>
    </div>
  );
};
