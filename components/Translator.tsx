'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Clipboard, Shuffle, ArrowRight, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TargetLanguage, TranslationResultData, TranslationStyle } from '@/lib/types';
import { translateMessage } from '@/lib/translator';
import { SAMPLE_MESSAGES } from '@/lib/sampleMessages';
import { TranslationResult } from './TranslationResult';
import { BusDecoder } from './BusDecoder';
import { ConfusionMeter } from './ConfusionMeter';
import { sounds } from '@/lib/audio';

interface TranslatorProps {
  initialText?: string;
}

export const Translator: React.FC<TranslatorProps> = ({ initialText = '' }) => {
  const [inputText, setInputText] = useState(
    initialText || 'KALE BY-PASS THI BUS OPAADSE BUS NO. 9861 TIMING 6/40'
  );
  const [style, setStyle] = useState<TranslationStyle>('normal');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en');
  const [result, setResult] = useState<TranslationResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

  const loadingPhrases = [
    'Consulting Imran Bhai...',
    'Checking bus number database...',
    'Translating advanced Gujarati engineering...',
    'Verifying if Tavra junction is awake...',
    'Calculating student seating compression...',
    'Checking diesel fuel levels...',
  ];

  // Perform translation on mount with initial text
  useEffect(() => {
    if (inputText.trim()) {
      const res = translateMessage(inputText, style, targetLang);
      setResult(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update translation when style or target language toggles
  const handleStyleChange = (newStyle: TranslationStyle) => {
    sounds.playPop();
    setStyle(newStyle);
    if (inputText.trim()) {
      setResult(translateMessage(inputText, newStyle, targetLang));
    }
  };

  const handleLangChange = (newLang: TargetLanguage) => {
    sounds.playPop();
    setTargetLang(newLang);
    if (inputText.trim()) {
      setResult(translateMessage(inputText, style, newLang));
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      sounds.playPop();
      return;
    }

    sounds.playBusHorn();
    setIsLoading(true);
    setLoadingPhraseIndex(0);

    // Cycle through humorous loading messages
    const interval = setInterval(() => {
      setLoadingPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 350);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      const res = translateMessage(inputText, style, targetLang);
      setResult(res);
      sounds.playSuccessChime();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 900);
  };

  const handleClear = () => {
    sounds.playPop();
    setInputText('');
    setResult(null);
  };

  const handlePaste = async () => {
    sounds.playPop();
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        const res = translateMessage(text, style, targetLang);
        setResult(res);
      }
    } catch {
      // Clipboard permission denied or unsupported
    }
  };

  const handleRandomSample = () => {
    sounds.playPop();
    const randomMsg = SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)];
    setInputText(randomMsg.text);
    const res = translateMessage(randomMsg.text, style, targetLang);
    setResult(res);
  };

  return (
    <section id="translator" className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 bg-bus-cream scroll-mt-14">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-yellow-200 border-2 border-black rounded-full px-3 py-1 text-xs font-black text-black shadow-comic-sm">
            <span>✨ Google Translate for Imran&apos;s World</span>
          </div>
          <h2 className="font-comic font-black text-3xl sm:text-4xl text-black tracking-tight">
            THE MAIN IMRAN DECODER
          </h2>
          <p className="text-sm sm:text-base font-bold text-zinc-600 max-w-xl mx-auto">
            Drop in any WhatsApp broadcast. We extract bus numbers, routes, timings, and turn the chaotic Gujarati transliteration into plain human language.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border-3 sm:border-4 border-black rounded-3xl p-4 sm:p-7 shadow-comic-lg relative">
          {/* Quick Action Buttons Row on Mobile */}
          <div className="flex items-center justify-between gap-1.5 pb-3 border-b-2 border-dashed border-zinc-200 text-xs font-bold">
            <span className="text-zinc-500 font-mono text-[11px]">
              {inputText.length} characters
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePaste}
                title="Paste from clipboard"
                className="flex items-center gap-1 bg-zinc-100 hover:bg-zinc-200 text-black border border-black rounded-lg px-2.5 py-1 text-xs font-bold active:scale-95 transition-all touch-manipulation"
              >
                <Clipboard className="w-3.5 h-3.5 text-zinc-700" />
                <span>Paste</span>
              </button>

              <button
                onClick={handleRandomSample}
                title="Load random sample"
                className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-black border border-black rounded-lg px-2.5 py-1 text-xs font-bold active:scale-95 transition-all touch-manipulation"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-700" />
                <span>Sample</span>
              </button>

              {inputText && (
                <button
                  onClick={handleClear}
                  title="Clear input"
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 rounded-lg px-2 py-1 text-xs font-bold active:scale-95 transition-all touch-manipulation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="relative mt-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste message here... e.g., KALE BY-PASS THI BUS OPAADSE 7460 NA STUDENT NE 6977 MA BESWANO..."
              rows={3}
              className="w-full p-3 sm:p-4 rounded-2xl bg-amber-50/40 border-2 sm:border-3 border-black font-mono text-sm sm:text-base font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-bus-yellow/50 transition-all resize-y min-h-[100px]"
            />
          </div>

          {/* Horizontal Quick-Chip Sample Suggestions (Mobile Friendly) */}
          <div className="mt-3">
            <div className="text-[11px] font-black uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1">
              <span>⚡ Quick Tap Samples:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
              {SAMPLE_MESSAGES.slice(0, 5).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sounds.playPop();
                    setInputText(s.text);
                    setResult(translateMessage(s.text, style, targetLang));
                  }}
                  className="flex-shrink-0 bg-zinc-100 hover:bg-bus-yellow/60 text-zinc-800 hover:text-black border border-black/30 hover:border-black rounded-xl px-2.5 py-1 text-[11px] font-bold transition-all active:scale-95 whitespace-nowrap shadow-xs"
                >
                  &quot;{s.text.slice(0, 26)}...&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Tone & Target Language */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-200 space-y-3">
            {/* Translation Tone Selector (Segmented Button for easy thumb tapping) */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700 flex items-center gap-1">
                <span>🎭 Translation Style:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-zinc-100 p-1 rounded-2xl border-2 border-black">
                {[
                  { id: 'normal', label: 'Normal', icon: '✅' },
                  { id: 'funny', label: 'Funny Parody', icon: '😂' },
                  { id: 'savage', label: 'Savage Roast', icon: '🔥' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleStyleChange(t.id as TranslationStyle)}
                    className={`flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all active:scale-95 touch-manipulation ${
                      style === t.id
                        ? 'bg-bus-yellow text-black border-2 border-black shadow-comic-sm'
                        : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700 flex items-center gap-1">
                <span>🌐 Target Language:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-zinc-100 p-1 rounded-2xl border-2 border-black">
                {[
                  { id: 'en', label: 'English', flag: '🇬🇧' },
                  { id: 'hi', label: 'Hindi', flag: '🇮🇳' },
                  { id: 'gu', label: 'Gujarati', flag: '🦁' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLangChange(l.id as TargetLanguage)}
                    className={`flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all active:scale-95 touch-manipulation ${
                      targetLang === l.id
                        ? 'bg-white text-black border-2 border-black shadow-comic-sm'
                        : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="mt-5">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="w-full flex items-center justify-center gap-2 bg-bus-yellow hover:bg-bus-yellow-dark disabled:bg-zinc-200 text-black border-3 border-black rounded-2xl py-3.5 sm:py-4 px-6 font-comic font-black text-lg sm:text-xl shadow-comic hover:shadow-comic-sm active:translate-x-1 active:translate-y-1 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none transition-all touch-manipulation"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-base sm:text-lg animate-pulse">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{loadingPhrases[loadingPhraseIndex]}</span>
                </div>
              ) : (
                <>
                  <span>TRANSLATE THIS NONSENSE</span>
                  <span className="text-2xl">😂</span>
                </>
              )}
            </button>
          </div>

          {/* Real-time Confusion Meter for current input */}
          {result && (
            <div className="mt-5">
              <ConfusionMeter score={result.confusionScore} />
            </div>
          )}
        </div>

        {/* Results Area */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <TranslationResult data={result} />
            
            {/* Bus Decoder Ticket Section */}
            <div id="bus-decoder" className="scroll-mt-14 pt-4">
              <BusDecoder info={result.extractedInfo} originalText={result.original} />
            </div>
          </div>
        )}

        {/* Empty state when input is cleared */}
        {!inputText && !result && (
          <div className="text-center py-8 px-4 bg-white/70 border-2 border-dashed border-black/30 rounded-3xl">
            <div className="text-4xl mb-2">😴</div>
            <h4 className="font-comic font-black text-lg text-black">
              No message detected!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-500 font-bold max-w-sm mx-auto mt-1">
              Even Imran is silent today. Paste an announcement above or tap &quot;Sample&quot; to test.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
