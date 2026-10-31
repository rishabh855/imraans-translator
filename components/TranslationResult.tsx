'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Sparkles, AlertTriangle, ShieldCheck, Laugh } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TranslationResultData } from '@/lib/types';
import { sounds } from '@/lib/audio';

interface TranslationResultProps {
  data: TranslationResultData;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({ data }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, section: string, label: string) => {
    sounds.playPop();
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    showToast(`${label} copied, Bhai! 😂`);

    // Subtle celebration confetti
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleShare = async () => {
    sounds.playPop();
    const shareText = `🚌 Imran's Bus Announcement Decoded!\n\nOriginal: "${data.original}"\n\nActual Meaning: "${data.normal[data.targetLang]}"\n\nImran Certified: "${data.funny}"\n\nDecoded at: ${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Imran's Translator",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(shareText);
      showToast("Full translation copied to clipboard for sharing! 📲");
    }
  };

  const normalText = data.normal[data.targetLang] || data.normal.en;
  const activeStyleText = data.style === 'savage' ? data.savage : data.funny;

  return (
    <div className="space-y-6 pt-2">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl border-2 border-bus-yellow shadow-comic font-black text-sm flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar with Detected Imranisms & Share */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-yellow-100/80 border-2 border-black rounded-2xl p-3 shadow-comic-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-black uppercase text-zinc-700 mr-1">
            Detected Imranisms:
          </span>
          {data.imranismDetected.length > 0 ? (
            data.imranismDetected.map((item, idx) => (
              <span
                key={idx}
                className="bg-white border border-black rounded-lg px-2 py-0.5 text-xs font-bold text-zinc-900 shadow-sm"
              >
                🏷️ {item}
              </span>
            ))
          ) : (
            <span className="text-xs font-semibold text-zinc-500 italic">
              Standard vocabulary detected
            </span>
          )}
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 bg-white hover:bg-zinc-50 text-black border-2 border-black rounded-xl px-3 py-1.5 text-xs font-black shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Result</span>
        </button>
      </div>

      {/* Grid of 3 Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: ORIGINAL MESSAGE */}
        <div className="bg-white border-3 border-black rounded-3xl p-5 shadow-comic flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-zinc-200 border-b-2 border-l-2 border-black rounded-bl-2xl px-3 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-700">
            Raw Input
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-comic font-black text-lg text-black">1. ORIGINAL MESSAGE</h3>
                <p className="text-[11px] font-bold text-zinc-500">Exact WhatsApp Broadcast</p>
              </div>
            </div>

            {/* WhatsApp bubble appearance */}
            <div className="bg-[#E7FFDB] border-2 border-emerald-950/40 rounded-2xl p-4 my-2 text-zinc-900 font-mono text-sm leading-relaxed shadow-sm">
              &quot;{data.original}&quot;
              <div className="text-right text-[10px] text-emerald-800 font-sans mt-2 flex items-center justify-end gap-1">
                <span>Just now</span>
                <span className="text-blue-600 font-bold">✓✓</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
            <span>Char count: {data.original.length}</span>
            <span className="font-bold text-amber-600">Untouched Gujarati-English</span>
          </div>
        </div>

        {/* CARD 2: ACTUAL MEANING */}
        <div className="bg-emerald-50/60 border-3 border-black rounded-3xl p-5 shadow-comic flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-300 border-b-2 border-l-2 border-black rounded-bl-2xl px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Accurate</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-comic font-black text-lg text-black">2. ACTUAL MEANING</h3>
                <p className="text-[11px] font-bold text-zinc-600">
                  Target: {data.targetLang === 'en' ? 'English' : data.targetLang === 'hi' ? 'Hindi' : 'Gujarati'}
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl p-4 my-2 text-zinc-950 font-bold text-base leading-relaxed shadow-comic-sm">
              {normalText}
            </div>

            {/* Micro breakdown */}
            <div className="text-xs text-zinc-600 mt-2 bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-300/80">
              <span className="font-black text-emerald-900 block mb-0.5">ℹ️ Verified Details:</span>
              <p className="text-[11px] leading-tight">{data.explanation}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-emerald-300 flex items-center justify-between">
            <button
              onClick={() => copyToClipboard(normalText, 'normal', 'Actual meaning')}
              className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 px-3 font-black text-xs shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              {copiedSection === 'normal' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied, Bhai! 😂</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Actual Meaning</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* CARD 3: IMRAN CERTIFIED TRANSLATION */}
        <div className="bg-amber-50 border-3 border-black rounded-3xl p-5 shadow-comic flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-bus-yellow border-b-2 border-l-2 border-black rounded-bl-2xl px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{data.style === 'savage' ? 'Savage Mode' : 'Certified Funny'}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">😂</span>
              <div>
                <h3 className="font-comic font-black text-lg text-black">
                  3. IMRAN CERTIFIED
                </h3>
                <p className="text-[11px] font-bold text-bus-orange">
                  Exaggerated Parody Interpretation
                </p>
              </div>
            </div>

            <div className="bg-yellow-200/90 border-2 border-black rounded-2xl p-4 my-2 text-zinc-950 font-bold text-sm leading-relaxed shadow-comic-sm">
              {activeStyleText}
            </div>

            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-black text-zinc-600 bg-amber-200/50 p-2 rounded-xl">
              <span>🎭 Comedy Warning:</span>
              <span className="font-medium">Bus numbers &amp; timings remain accurate!</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-amber-300 flex items-center justify-between">
            <button
              onClick={() => copyToClipboard(activeStyleText, 'funny', 'Imran comedy version')}
              className="w-full flex items-center justify-center gap-1.5 bg-bus-yellow hover:bg-bus-yellow-dark text-black border-2 border-black rounded-xl py-2 px-3 font-black text-xs shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              {copiedSection === 'funny' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied, Bhai! 😂</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Imran Certified</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
