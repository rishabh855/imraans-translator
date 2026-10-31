'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, BookOpen, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { CartoonBus } from './CartoonBus';
import { ImranMascot } from './ImranMascot';
import { sounds } from '@/lib/audio';

export const Hero: React.FC = () => {
  const scrollToTranslator = () => {
    sounds.playBusHorn();
    const el = document.getElementById('translator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bus-cream via-amber-50/40 to-bus-cream border-b-4 border-black">
      {/* Background playful comic doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-8 text-4xl select-none rotate-12">❓</div>
        <div className="absolute top-24 right-12 text-5xl select-none -rotate-12">🚍</div>
        <div className="absolute bottom-16 left-1/4 text-3xl select-none rotate-6">⚠️</div>
        <div className="absolute top-1/2 right-1/4 text-4xl select-none -rotate-6">🚏</div>
        <div className="absolute bottom-8 right-16 text-3xl select-none">💬</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Floating WhatsApp Announcement snippet */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100/90 border-2 border-black rounded-full px-4 py-1.5 shadow-comic-sm animate-bus-bounce">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-black text-emerald-950">
              WhatsApp Broadcast Detected: &quot;KALE BY-PASS THI BUS OPAADSE...&quot;
            </span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-block relative">
            <h1 className="font-comic font-black text-4xl sm:text-6xl md:text-7xl text-black tracking-tight leading-tight">
              WHAT DID IMRAN <br className="hidden sm:block" />
              <span className="relative inline-block text-bus-orange px-2">
                JUST SAY?!
                <span className="absolute -top-3 -right-6 text-3xl sm:text-4xl animate-bounce">
                  🚌
                </span>
                {/* Comic underline */}
                <svg
                  className="w-full h-4 text-bus-yellow -mt-1"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 3 197 9"
                    stroke="#FFC837"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-2xl text-zinc-800 font-bold max-w-2xl mx-auto leading-snug">
            Paste that confusing WhatsApp bus announcement and let us decode the mystery.
          </p>

          <p className="text-sm font-semibold text-zinc-600 italic">
            &quot;From <span className="font-black text-black">OPADSE</span> to Understandable English.&quot;
          </p>
        </div>

        {/* Floating Cartoon Stage: Bus & Imran Mascot */}
        <div className="mt-8 mb-10 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12">
          {/* Animated Bus */}
          <div className="flex-1 flex justify-center">
            <CartoonBus size="lg" animated={true} />
          </div>

          {/* Imran Mascot holding megaphone */}
          <div className="flex-shrink-0 flex justify-center">
            <ImranMascot
              size="lg"
              speechText="7460 NA STUDENT NE 6977 MA BESWANO!"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={scrollToTranslator}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 bg-bus-yellow hover:bg-bus-yellow-dark text-black border-3 border-black rounded-2xl px-6 py-4 font-black text-lg shadow-comic-lg hover:shadow-comic active:translate-x-1 active:translate-y-1 transition-all"
          >
            <span>DECODE IMRAN&apos;S MESSAGE</span>
            <span className="text-xl">🚀</span>
          </button>

          <Link
            href="/dictionary"
            onClick={() => sounds.playPop()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-yellow-50 text-black border-3 border-black rounded-2xl px-6 py-4 font-black text-base shadow-comic hover:shadow-comic-sm active:translate-x-1 active:translate-y-1 transition-all"
          >
            <BookOpen className="w-5 h-5 text-bus-orange" />
            <span>Explore Imran Dictionary</span>
          </Link>
        </div>

        {/* Small Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-zinc-500 bg-white/60 inline-block px-3 py-1 rounded-full border border-black/20">
            ⚠️ Translation accuracy: <span className="text-black">Depends entirely on Imran&apos;s morning mood.</span>
          </p>
        </div>

        {/* Quick funny stat counters */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { label: 'Buses OPADSE', value: '450+', icon: '🚍' },
            { label: 'Confusion Decoded', value: '99.8%', icon: '🧠' },
            { label: 'Guarantees Given', value: '0', icon: '🤷‍♂️' },
            { label: 'Tea Breaks Taken', value: 'Unlimited', icon: '☕' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border-2 border-black rounded-xl p-3 text-center shadow-comic-sm hover:-translate-y-0.5 transition-transform"
            >
              <div className="text-xl mb-0.5">{stat.icon}</div>
              <div className="font-comic font-black text-xl text-black">{stat.value}</div>
              <div className="text-[11px] font-bold text-zinc-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
