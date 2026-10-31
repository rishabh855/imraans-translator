'use client';

import React from 'react';
import { CartoonBus } from './CartoonBus';
import { ImranMascot } from './ImranMascot';
import { Bus, Heart, Sparkles, Coffee } from 'lucide-react';
import { sounds } from '@/lib/audio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 bg-bus-cream min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-yellow-200 border-2 border-black rounded-full px-3 py-1 text-xs font-black text-black shadow-comic-sm">
            <Sparkles className="w-3.5 h-3.5 text-bus-orange" />
            <span>The Man, The Myth, The Bus Manager</span>
          </div>
          <h1 className="font-comic font-black text-3xl sm:text-5xl text-black tracking-tight">
            WHO IS IMRAN? 🚌
          </h1>
          <p className="text-sm sm:text-base font-bold text-zinc-600 max-w-xl mx-auto">
            The legendary WhatsApp bus coordinator who revolutionized morning panic.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white border-3 sm:border-4 border-black rounded-3xl p-5 sm:p-8 shadow-comic-lg space-y-6 relative overflow-hidden">
          {/* Cartoon Character Centerstage on Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            <ImranMascot size="md" speechText="BUS OPADSE! NO ARGUMENTS!" />
            <div className="max-w-xs flex justify-center">
              <CartoonBus size="sm" animated={true} />
            </div>
          </div>

          {/* Narrative text */}
          <div className="space-y-4 text-zinc-800 text-sm sm:text-base font-medium leading-relaxed bg-amber-50/60 p-4 sm:p-6 rounded-2xl border-2 border-black">
            <p className="font-bold text-base sm:text-lg text-black">
              Some people send messages. Some people send announcements. <br />
              <span className="text-bus-orange font-comic font-black text-xl">And then there&apos;s Imran.</span>
            </p>

            <p>
              A man whose daily WhatsApp messages contain bus numbers, mysterious timings, Gujarati phonetic vocabulary, and enough missing punctuation to confuse an entire generation of engineering students.
            </p>

            <p>
              One morning you are in <span className="font-black text-black">bus 7460</span>. The next evening you are informed via all-caps that <span className="font-black text-black">0088 NA STUDENT NE 0033 MA BESWANU RETURNS MAA</span>. Why? Nobody knows. Does it work? Always.
            </p>

            <p className="italic text-zinc-600 border-l-4 border-bus-orange pl-3 py-1 font-semibold">
              &quot;We decided to build this translator so students no longer need an honorary PhD in Imran Linguistics to understand tomorrow&apos;s bus schedule.&quot;
            </p>
          </div>

          {/* Bus Coordinator Axioms */}
          <div className="space-y-2">
            <h3 className="font-comic font-black text-lg text-black">
              IMRAN&apos;S GOLDEN LAWS OF TRANSIT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold">
              {[
                { title: 'The OPADSE Rule', desc: 'If Imran says "OPADSE", the bus leaves. Even if the driver hasn\'t finished his chai.' },
                { title: 'The Seating Paradox', desc: 'A 45-seater bus has an infinite capacity if Imran says "BESVO PADSE".' },
                { title: 'The Tavra Bermuda Triangle', desc: 'All routes eventually lead through or depart from Tavra By-pass.' },
                { title: 'The Quantum Timetable', desc: '"REGYULAR TIME" is whatever time Imran sends the second message.' },
              ].map((law, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-50 border-2 border-black rounded-xl p-3 shadow-comic-sm"
                >
                  <div className="font-black text-bus-orange mb-0.5">{law.title}</div>
                  <div className="text-zinc-600 text-xs font-semibold">{law.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Friendly Note */}
          <div className="bg-yellow-100 border-2 border-black rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">❤️</span>
            <div className="text-xs font-bold text-zinc-800">
              <span className="font-black text-black">A Loving Student Tribute: </span>
              This project is built with absolute affection, humor, and respect for our college bus coordinators who safely transport thousands of students every single day through Bharuch &amp; Gujarat.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
