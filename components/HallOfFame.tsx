'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Heart, Share2, Sparkles, CheckCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HALL_OF_FAME_ENTRIES } from '@/lib/hallOfFame';
import { HallOfFameEntry } from '@/lib/types';
import { sounds } from '@/lib/audio';

export const HallOfFame: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load favorites and likes from localStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('imran_hof_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const initialLikes: Record<string, number> = {};
      HALL_OF_FAME_ENTRIES.forEach((e) => {
        const savedLike = localStorage.getItem(`imran_like_${e.id}`);
        initialLikes[e.id] = savedLike ? parseInt(savedLike, 10) : e.initialLikes;
      });
      setLikesCount(initialLikes);
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const toggleFavorite = (entry: HallOfFameEntry) => {
    sounds.playPop();
    const isFav = favorites.includes(entry.id);
    const newFavs = isFav
      ? favorites.filter((id) => id !== entry.id)
      : [...favorites, entry.id];

    setFavorites(newFavs);

    const currentLikes = likesCount[entry.id] || entry.initialLikes;
    const newLikes = isFav ? currentLikes - 1 : currentLikes + 1;
    setLikesCount({ ...likesCount, [entry.id]: newLikes });

    try {
      localStorage.setItem('imran_hof_favorites', JSON.stringify(newFavs));
      localStorage.setItem(`imran_like_${entry.id}`, newLikes.toString());
    } catch {
      // ignore
    }

    if (!isFav) {
      try {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleShare = async (entry: HallOfFameEntry) => {
    sounds.playPop();
    const shareText = `🏆 Imran's Hall of Fame Announcement!\n\nOriginal: "${entry.original}"\n\nActual Meaning: "${entry.actualTranslation}"\n\nCertified Funny: "${entry.funnyTranslation}"\n\nConfusion Rating: ${entry.confusionRating}/10`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Imran's Hall of Fame 🏆",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // ignore
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setToastMessage('Hall of Fame post copied to clipboard! 📲');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <section id="hall-of-fame" className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 bg-bus-cream min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl border-2 border-bus-yellow shadow-comic font-black text-sm flex items-center gap-2 animate-bounce">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-yellow-200 border-2 border-black rounded-full px-3 py-1 text-xs font-black text-black shadow-comic-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>The Greatest WhatsApp Announcements in History</span>
          </div>
          <h1 className="font-comic font-black text-3xl sm:text-5xl text-black tracking-tight">
            IMRAN&apos;S HALL OF FAME 🏆
          </h1>
          <p className="text-sm sm:text-base font-bold text-zinc-600 max-w-xl mx-auto">
            A curated shrine celebrating Imran&apos;s most baffling, iconic, and poetic bus coordination broadcasts.
          </p>
        </div>

        {/* Feed of Masterpieces */}
        <div className="space-y-5">
          {HALL_OF_FAME_ENTRIES.map((entry, index) => {
            const isFavorite = favorites.includes(entry.id);
            const likes = likesCount[entry.id] || entry.initialLikes;

            return (
              <div
                key={entry.id}
                className="bg-white border-3 sm:border-4 border-black rounded-3xl p-4 sm:p-6 shadow-comic-lg hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                {/* Top Badge & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-bus-yellow border-2 border-black flex items-center justify-center font-comic font-black text-xs text-black">
                      #{index + 1}
                    </span>
                    <span className="bg-yellow-200 border-2 border-black px-2.5 py-0.5 rounded-full text-xs font-black text-black shadow-xs">
                      {entry.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-100 border border-black/30 px-2.5 py-0.5 rounded-lg text-xs font-bold text-zinc-800">
                      {entry.category}
                    </span>
                    <div className="flex items-center gap-1 bg-red-100 border border-red-300 px-2 py-0.5 rounded-lg text-xs font-black text-red-700">
                      <span>🤯 {entry.confusionRating}/10</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Bubble Original */}
                <div className="bg-[#E7FFDB] border-2 border-emerald-950/30 rounded-2xl p-3 sm:p-4 my-2 text-zinc-950 font-mono text-xs sm:text-sm leading-relaxed shadow-sm">
                  <div className="text-[10px] text-emerald-800 font-sans font-black uppercase mb-1">
                    📱 Authentic Imran Broadcast:
                  </div>
                  &quot;{entry.original}&quot;
                  <div className="text-right text-[10px] text-emerald-800 font-sans mt-1 flex items-center justify-end gap-1">
                    <span>Double Tick Certified</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>

                {/* Meanings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {/* Actual Meaning */}
                  <div className="bg-emerald-50 border-2 border-black rounded-2xl p-3">
                    <div className="text-xs font-black text-emerald-900 mb-1 flex items-center gap-1">
                      <span>✅ Actual Meaning:</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-800 leading-snug">
                      {entry.actualTranslation}
                    </p>
                  </div>

                  {/* Certified Funny */}
                  <div className="bg-amber-50 border-2 border-black rounded-2xl p-3">
                    <div className="text-xs font-black text-amber-900 mb-1 flex items-center gap-1">
                      <span>😂 Imran Certified Reality:</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-800 leading-snug">
                      {entry.funnyTranslation}
                    </p>
                  </div>
                </div>

                {/* Footer Controls: Like & Share */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 flex items-center justify-between">
                  <button
                    onClick={() => toggleFavorite(entry)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all active:scale-95 touch-manipulation text-xs font-black ${
                      isFavorite
                        ? 'bg-red-500 text-white border-black shadow-comic-sm'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-black'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? 'fill-current text-white' : 'text-zinc-600'}`}
                    />
                    <span>{isFavorite ? 'Favorited' : 'Legendary'}</span>
                    <span className="text-[11px] opacity-80">({likes})</span>
                  </button>

                  <button
                    onClick={() => handleShare(entry)}
                    className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-black border-2 border-black rounded-xl px-3 py-1.5 text-xs font-black shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all touch-manipulation"
                  >
                    <Share2 className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Share Post</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
