'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Translator } from '@/components/Translator';
import { SampleMessages } from '@/components/SampleMessages';
import { BookOpen, Trophy, Info, ArrowRight, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/audio';

export default function Home() {
  const handleSelectSample = (text: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      const el = document.getElementById('translator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* Main Translator Section */}
      <Translator />

      {/* Sample Messages Feed */}
      <SampleMessages onSelectMessage={handleSelectSample} />

      {/* Feature Showcase Grid (Quick Jump Cards for Mobile & Desktop) */}
      <section className="py-10 sm:py-14 px-3 sm:px-6 lg:px-8 bg-bus-cream">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-comic font-black text-2xl sm:text-3xl text-black">
              EXPLORE MORE IMRAN LORE
            </h3>
            <p className="text-xs sm:text-sm font-bold text-zinc-500">
              Go deeper into the linguistic archives of Bharuch&apos;s greatest coordinator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Dictionary */}
            <Link
              href="/dictionary"
              onClick={() => sounds.playPop()}
              className="group bg-white hover:bg-yellow-50 border-3 border-black rounded-3xl p-5 shadow-comic hover:shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-yellow-200 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-xs">
                  📖
                </div>
                <h4 className="font-comic font-black text-xl text-black group-hover:text-bus-orange transition-colors">
                  Imran Dictionary
                </h4>
                <p className="text-xs text-zinc-600 font-medium mt-1 leading-snug">
                  From OPADSE to BESWANU, learn all 15+ verified terms with phonetic guides.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-xs font-black text-black">
                <span>Browse Lexicon</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Hall of Fame */}
            <Link
              href="/hall-of-fame"
              onClick={() => sounds.playPop()}
              className="group bg-white hover:bg-emerald-50 border-3 border-black rounded-3xl p-5 shadow-comic hover:shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-200 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-xs">
                  🏆
                </div>
                <h4 className="font-comic font-black text-xl text-black group-hover:text-emerald-700 transition-colors">
                  Hall of Fame
                </h4>
                <p className="text-xs text-zinc-600 font-medium mt-1 leading-snug">
                  The most baffling announcements rated for confusion. Like and save your favorites!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-xs font-black text-black">
                <span>View Shrines</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: About Imran */}
            <Link
              href="/about"
              onClick={() => sounds.playPop()}
              className="group bg-white hover:bg-orange-50 border-3 border-black rounded-3xl p-5 shadow-comic hover:shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-orange-200 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-xs">
                  🚌
                </div>
                <h4 className="font-comic font-black text-xl text-black group-hover:text-orange-700 transition-colors">
                  Who is Imran?
                </h4>
                <p className="text-xs text-zinc-600 font-medium mt-1 leading-snug">
                  The backstory of the legend who coordinates college transit with zero punctuation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-xs font-black text-black">
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
