'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, Heart } from 'lucide-react';
import { sounds } from '@/lib/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bus-cream border-t-4 border-black pt-10 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 text-center text-zinc-800">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-bus-yellow border-3 border-black flex items-center justify-center text-2xl shadow-comic-sm">
            🚌
          </div>
          <h3 className="font-comic font-black text-2xl text-black">
            Imran&apos;s Translator
          </h3>
          <p className="text-xs sm:text-sm font-bold text-bus-orange">
            &quot;Because understanding Imran is a skill.&quot;
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold">
          <Link href="/" className="hover:text-black hover:underline">
            Home
          </Link>
          <span>•</span>
          <Link href="/#translator" className="hover:text-black hover:underline">
            Translator
          </Link>
          <span>•</span>
          <Link href="/#bus-decoder" className="hover:text-black hover:underline">
            Bus Decoder
          </Link>
          <span>•</span>
          <Link href="/dictionary" className="hover:text-black hover:underline">
            Imran Dictionary
          </Link>
          <span>•</span>
          <Link href="/hall-of-fame" className="hover:text-black hover:underline">
            Hall of Fame
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-black hover:underline">
            About Imran
          </Link>
        </div>

        {/* Fun Honk Button */}
        <div className="pt-2">
          <button
            onClick={() => sounds.playBusHorn()}
            className="inline-flex items-center gap-2 bg-bus-yellow hover:bg-bus-yellow-dark text-black border-2 border-black rounded-full px-5 py-2 font-black text-xs sm:text-sm shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all touch-manipulation"
          >
            <Bus className="w-4 h-4" />
            <span>Honk Bus Horn (Muted? Tap to hear!)</span>
          </button>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-4 border-t-2 border-dashed border-zinc-300 space-y-1 text-xs text-zinc-500 font-medium">
          <p className="font-bold text-zinc-700">
            Made with confusion, buses &amp; unlimited OPADSE. 🚌😂
          </p>
          <p className="text-[11px]">
            Parody website created for humor &amp; collegiate camaraderie. 100% Imran Certified.
          </p>
        </div>
      </div>
    </footer>
  );
};
