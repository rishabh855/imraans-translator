'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Sparkles, Bus, Languages, Ticket, BookOpen, Trophy, Info, Home } from 'lucide-react';
import { sounds } from '@/lib/audio';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      sounds.playPop();
    }
  };

  const handleHonk = () => {
    sounds.playBusHorn();
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Translator', href: '/#translator', icon: Languages },
    { label: 'Bus Decoder', href: '/#bus-decoder', icon: Ticket },
    { label: 'Dictionary', href: '/dictionary', icon: BookOpen },
    { label: 'Hall of Fame', href: '/hall-of-fame', icon: Trophy },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-bus-cream/95 backdrop-blur-md border-b-3 border-black px-3 sm:px-6 py-2.5 shadow-comic-sm transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => sounds.playPop()}
            className="flex items-center gap-2 transition-transform active:scale-95 touch-manipulation"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-bus-yellow border-2 sm:border-3 border-black flex items-center justify-center text-xl sm:text-2xl shadow-comic-sm">
              🚌
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-comic font-black text-lg sm:text-2xl text-black tracking-tight leading-none">
                  Imran&apos;s Translator
                </span>
                <span className="text-sm sm:text-base">😂</span>
              </div>
              <span className="text-[9px] sm:text-xs font-black uppercase text-bus-orange tracking-wider mt-0.5">
                Decode WhatsApp Chaos
              </span>
            </div>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center gap-1 font-bold text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => sounds.playPop()}
                className="px-3 py-1.5 rounded-xl text-zinc-800 hover:text-black hover:bg-bus-yellow/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Honk */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Small Certified Pill */}
            <div className="hidden sm:flex items-center gap-1 bg-yellow-200 border-2 border-black rounded-full px-2.5 py-1 text-[11px] font-black text-black shadow-comic-sm">
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
              <span>Certified</span>
            </div>

            {/* Quick Bus Honk Button - High Priority on Mobile */}
            <button
              onClick={handleHonk}
              title="Honk the Bus Horn!"
              aria-label="Honk Horn"
              className="flex items-center gap-1 bg-bus-yellow hover:bg-bus-yellow-dark text-black border-2 border-black rounded-xl px-2.5 py-1.5 font-black text-xs sm:text-sm shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all touch-manipulation"
            >
              <Bus className="w-4 h-4 text-black animate-pulse" />
              <span className="font-comic tracking-wide">HONK!</span>
            </button>

            {/* Mute/Sound Button */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label="Toggle Sound"
              className="p-1.5 sm:p-2 rounded-xl bg-white border-2 border-black shadow-comic-sm hover:bg-zinc-100 text-black active:translate-x-0.5 active:translate-y-0.5 transition-all touch-manipulation"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock (App-like thumb bar on mobile, hidden on lg screens) */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-3 border-black py-1.5 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] safe-area-pb"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => sounds.playPop()}
                className="flex flex-col items-center justify-center p-1.5 text-zinc-700 hover:text-black active:scale-90 transition-transform touch-manipulation min-w-[56px]"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-transparent active:bg-bus-yellow/60">
                  <Icon className="w-5 h-5 text-zinc-900" />
                </div>
                <span className="text-[10px] font-bold tracking-tight text-zinc-800 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
