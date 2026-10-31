'use client';

import React, { useState } from 'react';
import { Search, X, Volume2, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import { IMRAN_DICTIONARY } from '@/lib/dictionary';
import { DictionaryEntry } from '@/lib/types';
import { sounds } from '@/lib/audio';

export const Dictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLetter, setActiveLetter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Verb', 'Location', 'Logistics', 'Time & Date', 'Directives', 'Status'];
  const alphabet = ['All', 'A', 'B', 'E', 'G', 'K', 'N', 'O', 'R', 'T'];

  const filteredEntries = IMRAN_DICTIONARY.filter((entry) => {
    const matchesSearch =
      entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.meaningEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.meaningHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.spellingVariations.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || entry.category === selectedCategory;

    const matchesLetter =
      activeLetter === 'All' || entry.term.toUpperCase().startsWith(activeLetter);

    return matchesSearch && matchesCategory && matchesLetter;
  });

  const handleCopy = (entry: DictionaryEntry) => {
    sounds.playPop();
    const text = `${entry.term} (${entry.gujaratiScript}) - Meaning: ${entry.meaningEn}. Example: "${entry.exampleImran}"`;
    navigator.clipboard.writeText(text);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="dictionary" className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 bg-bus-cream min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-yellow-200 border-2 border-black rounded-full px-3 py-1 text-xs font-black text-black shadow-comic-sm">
            <BookOpen className="w-3.5 h-3.5 text-bus-orange" />
            <span>Official Imran Lexicon</span>
          </div>
          <h1 className="font-comic font-black text-3xl sm:text-5xl text-black tracking-tight">
            THE OFFICIAL IMRAN DICTIONARY
          </h1>
          <p className="text-sm sm:text-base font-bold text-zinc-600 max-w-xl mx-auto">
            Decoding one legendary word at a time. Verified Gujarati terms, wild phonetic spellings, and situational rules.
          </p>
        </div>

        {/* Search & Filter Controls (Mobile Touch Optimized) */}
        <div className="bg-white border-3 border-black rounded-3xl p-3 sm:p-5 shadow-comic-lg space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search word, meaning, variation (e.g. OPADSE, KALE)..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-50 border-2 border-black font-bold text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-bus-yellow/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  sounds.playPop();
                  setSearchQuery('');
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-black uppercase text-zinc-400 mr-1 flex-shrink-0">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCategory(cat);
                }}
                className={`flex-shrink-0 px-3 py-1 rounded-xl text-xs font-black border-2 transition-all active:scale-95 touch-manipulation ${
                  selectedCategory === cat
                    ? 'bg-bus-yellow text-black border-black shadow-comic-sm'
                    : 'bg-zinc-100 text-zinc-700 border-transparent hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alphabet Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-black uppercase text-zinc-400 mr-1 flex-shrink-0">
              A-Z:
            </span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  sounds.playPop();
                  setActiveLetter(letter);
                }}
                className={`flex-shrink-0 min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-black transition-all border ${
                  activeLetter === letter
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border-3 border-black rounded-3xl p-4 sm:p-5 shadow-comic flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Top header of card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-comic font-black text-xl sm:text-2xl text-black">
                        {entry.term}
                      </h3>
                      <span className="text-sm font-bold text-bus-orange font-mono bg-yellow-100 px-2 py-0.5 rounded-md border border-yellow-300">
                        {entry.gujaratiScript}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-zinc-500 mt-0.5">
                      Pronounced: <span className="text-zinc-800 italic">&quot;{entry.pronunciation}&quot;</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black bg-zinc-100 text-zinc-800">
                    {entry.category}
                  </span>
                </div>

                {/* English & Hindi Meanings */}
                <div className="bg-amber-50/70 border-2 border-black rounded-2xl p-3 my-2.5 space-y-1">
                  <div className="text-xs font-bold text-zinc-900">
                    <span className="font-black text-black">English:</span> {entry.meaningEn}
                  </div>
                  <div className="text-xs font-bold text-zinc-700">
                    <span className="font-black text-zinc-800">Hindi:</span> {entry.meaningHi}
                  </div>
                </div>

                {/* Funny Imran Usage Lore */}
                <p className="text-xs text-zinc-600 font-medium leading-relaxed mb-3">
                  💡 {entry.funnyDescription}
                </p>

                {/* Spelling Variations */}
                <div className="mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">
                    Known WhatsApp Variations:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {entry.spellingVariations.map((v, i) => (
                      <span
                        key={i}
                        className="bg-zinc-100 border border-zinc-300 text-zinc-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real WhatsApp Usage Example */}
                <div className="bg-[#E7FFDB] border border-emerald-950/30 rounded-xl p-2.5 text-xs text-zinc-900 font-mono">
                  <div className="text-[10px] text-emerald-800 font-sans font-black uppercase mb-0.5">
                    📱 WhatsApp Example:
                  </div>
                  &quot;{entry.exampleImran}&quot;
                  <div className="text-[11px] text-emerald-950 font-sans font-bold mt-1">
                    ➔ {entry.exampleTranslation}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-zinc-400">
                  {entry.isProvisional ? '⚠️ Provisional Decoding' : '✅ 100% Imran Fact'}
                </span>

                <button
                  onClick={() => handleCopy(entry)}
                  className="flex items-center gap-1 bg-yellow-100 hover:bg-bus-yellow text-black border border-black rounded-lg px-2.5 py-1 text-xs font-bold active:scale-95 transition-all touch-manipulation"
                >
                  {copiedId === entry.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Word</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-12 px-4 bg-white border-2 border-dashed border-black rounded-3xl">
            <div className="text-4xl mb-2">🔍</div>
            <h4 className="font-comic font-black text-xl text-black">
              Word Not Found in Imran&apos;s Dictionary!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 font-bold max-w-sm mx-auto mt-1">
              Imran has not invented this spelling yet. Try searching for &quot;OPADSE&quot;, &quot;BESWANU&quot;, or &quot;KALE&quot;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
