'use client';

import React, { useState } from 'react';
import { SAMPLE_MESSAGES } from '@/lib/sampleMessages';
import { SampleMessage } from '@/lib/types';
import { ArrowUpRight, MessageSquare, Filter, CheckCheck } from 'lucide-react';
import { sounds } from '@/lib/audio';

interface SampleMessagesProps {
  onSelectMessage?: (text: string) => void;
}

export const SampleMessages: React.FC<SampleMessagesProps> = ({ onSelectMessage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Bus Timing',
    'Bus Change',
    'Return Journey',
    'Multiple Buses',
    'General Announcement',
  ];

  const filteredMessages = activeCategory === 'All'
    ? SAMPLE_MESSAGES
    : SAMPLE_MESSAGES.filter((m) => m.category === activeCategory);

  const handleSelect = (msg: SampleMessage) => {
    sounds.playPop();
    if (onSelectMessage) {
      onSelectMessage(msg.text);
    } else {
      // Find translator textarea and set value, then scroll
      const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = msg.text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        const translatorEl = document.getElementById('translator');
        if (translatorEl) {
          translatorEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-amber-50/50 border-t-4 border-b-4 border-black">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-black rounded-full px-3 py-1 text-xs font-black text-black shadow-comic-sm">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real WhatsApp Announcement Feed</span>
          </div>
          <h2 className="font-comic font-black text-2xl sm:text-4xl text-black">
            SAMPLE IMRAN BROADCASTS
          </h2>
          <p className="text-xs sm:text-sm font-bold text-zinc-600 max-w-lg mx-auto">
            Tap any real WhatsApp message below to instantly inject it into the decoder.
          </p>
        </div>

        {/* Filter Pills (Horizontally scrollable for mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sounds.playPop();
                setActiveCategory(cat);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all active:scale-95 touch-manipulation ${
                activeCategory === cat
                  ? 'bg-bus-yellow text-black border-black shadow-comic-sm'
                  : 'bg-white text-zinc-700 border-black/30 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* WhatsApp Feed Mockup Container */}
        <div className="bg-[#EFEAE2] border-3 border-black rounded-3xl p-3 sm:p-5 shadow-comic-lg space-y-3 relative overflow-hidden">
          {/* Top WhatsApp Group Bar */}
          <div className="bg-[#008069] text-white p-2.5 sm:p-3 rounded-2xl flex items-center justify-between border-2 border-black shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center text-base">
                🚍
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm leading-none flex items-center gap-1">
                  <span>IMRAN BUS UPDATES (OFFICIAL)</span>
                  <span className="text-[10px] bg-white/20 px-1 rounded">Admin</span>
                </div>
                <div className="text-[10px] text-white/80 mt-0.5">
                  Imran Bhai, Driver Mukesh, +412 students
                </div>
              </div>
            </div>
            <div className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-mono">
              TAP BUBBLE TO DECODE
            </div>
          </div>

          {/* Messages Grid / Chat Stream */}
          <div className="space-y-3 pt-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className="group cursor-pointer bg-white hover:bg-emerald-50/70 border-2 border-black rounded-2xl p-3 sm:p-4 shadow-comic-sm hover:shadow-comic active:translate-x-0.5 active:translate-y-0.5 transition-all touch-manipulation"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-emerald-800">
                      ~ Imran Coordinator
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-300">
                      {msg.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-zinc-400">
                    {msg.context}
                  </span>
                </div>

                {/* Actual Broadcast Text */}
                <div className="font-mono text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-black leading-relaxed">
                  &quot;{msg.text}&quot;
                </div>

                {/* Footer of Bubble */}
                <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-emerald-700 font-bold group-hover:underline">
                    <span>Tap to decode in translator</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-1 text-zinc-400 text-[10px]">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
