'use client';

import React from 'react';
import { sounds } from '@/lib/audio';

export const QuoteMarquee: React.FC = () => {
  const quotes = [
    '⚡ KALE BY-PASS THI BUS OPAADSE',
    '🚌 7460 NA STUDENT NE 6977 MA BESWANO',
    '🚨 BUS NAHI AAVE AETLE 0088 NA STUDENT NE 7460 MA BESVO PADSE',
    '🔄 0001 NA STUDENT NE 0088 MA BESWANU RETURNS MAA',
    '⏱️ TAVRATHI BUS 2 OPADSE 6/55',
    '☕ REGYULAR TIME PAR BUS AAVSEE',
    '🛑 NEVER QUESTION IMRAN BHAI',
  ];

  return (
    <div className="bg-bus-yellow border-y-3 border-black py-2 overflow-hidden select-none shadow-sm">
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-comic font-black text-xs sm:text-sm text-black">
        {[...quotes, ...quotes].map((quote, idx) => (
          <span
            key={idx}
            onClick={() => sounds.playBusHorn()}
            className="cursor-pointer hover:text-bus-orange transition-colors inline-flex items-center gap-2"
          >
            <span>{quote}</span>
            <span className="text-zinc-500 font-mono">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
