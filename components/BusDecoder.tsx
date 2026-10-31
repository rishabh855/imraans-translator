'use client';

import React from 'react';
import { Bus, Clock, MapPin, Calendar, ArrowRightLeft, AlertTriangle, CheckCircle2, Ticket } from 'lucide-react';
import { ExtractedBusInfo } from '@/lib/types';
import { sounds } from '@/lib/audio';

interface BusDecoderProps {
  info: ExtractedBusInfo;
  originalText: string;
}

export const BusDecoder: React.FC<BusDecoderProps> = ({ info, originalText }) => {
  return (
    <div className="bg-white border-3 sm:border-4 border-black rounded-3xl p-4 sm:p-7 shadow-comic-lg">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-zinc-200">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-bus-yellow border-2 border-black flex items-center justify-center text-lg shadow-comic-sm">
            🎫
          </div>
          <div>
            <h3 className="font-comic font-black text-xl sm:text-2xl text-black">
              BUS DECODER TICKET
            </h3>
            <p className="text-[11px] sm:text-xs font-bold text-zinc-500">
              Structured Logistical Boarding Pass
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 bg-yellow-200 border-2 border-black rounded-full px-3 py-1 text-xs font-black">
          <Ticket className="w-3.5 h-3.5 text-bus-orange" />
          <span>PASS #IMR-{info.busNumbers[0] || '7460'}</span>
        </div>
      </div>

      {/* Ticket Design Container */}
      <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50/50 border-3 border-black rounded-2xl p-4 sm:p-6 shadow-comic-sm overflow-hidden">
        {/* Left and Right Perforated Notches for Ticket Effect */}
        <div className="hidden sm:block absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-3 border-black rounded-full z-10" />
        <div className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-3 border-black rounded-full z-10" />

        {/* Top Header of Ticket */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-dashed border-black/30">
          <div className="flex items-center gap-1.5">
            <span className="font-comic font-black text-base sm:text-lg text-black">
              IMRAN STATE HIGHWAY EXPRESS
            </span>
          </div>
          <div className="bg-red-500 text-white font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-md border-2 border-black uppercase rotate-2 shadow-xs">
            {info.actions.length > 0 ? info.actions[0] : 'OFFICIALLY OPADSE'}
          </div>
        </div>

        {/* Grid of Ticket Fields (Optimized for Mobile Single/2-Col) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
          {/* 1. Date */}
          <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase text-zinc-500 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Date</span>
            </div>
            <div className="font-comic font-black text-sm sm:text-base text-black truncate">
              {info.date || 'Regular Day'}
            </div>
          </div>

          {/* 2. Primary Bus Number */}
          <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase text-zinc-500 mb-0.5">
              <Bus className="w-3.5 h-3.5 text-amber-600" />
              <span>Bus Fleet #</span>
            </div>
            <div className="font-comic font-black text-sm sm:text-base text-bus-orange truncate">
              {info.busNumbers.length > 0 ? info.busNumbers.join(', ') : 'Unspecified'}
            </div>
          </div>

          {/* 3. Location */}
          <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase text-zinc-500 mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Pickup Stop</span>
            </div>
            <div className="font-comic font-black text-sm sm:text-base text-black truncate">
              {info.locations.length > 0 ? info.locations.join(' & ') : 'Standard Stop'}
            </div>
          </div>

          {/* 4. Departure Time */}
          <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase text-zinc-500 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Time / Schedule</span>
            </div>
            <div className="font-comic font-black text-sm sm:text-base text-black truncate">
              {info.times.length > 0
                ? info.times.join(', ')
                : info.isRegularTime
                ? 'Regular Time'
                : 'As per Imran'}
            </div>
          </div>
        </div>

        {/* Student Transfer Alert (If Detected) */}
        {info.transfers.length > 0 && (
          <div className="mb-4 bg-yellow-200/90 border-2 border-black rounded-xl p-3 shadow-comic-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-black mb-1">
              <ArrowRightLeft className="w-4 h-4 text-bus-orange" />
              <span>MANDATORY PASSENGER RELOCATION:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {info.transfers.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black rounded-lg px-3 py-1 font-mono font-black text-xs sm:text-sm text-black flex items-center gap-2 shadow-xs"
                >
                  <span className="text-red-600">Bus {t.from}</span>
                  <span className="text-zinc-400">➔</span>
                  <span className="text-emerald-700">Board Bus {t.to}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Return Journey Banner (If Detected) */}
        {info.isReturnJourney && (
          <div className="mb-4 bg-blue-100 border-2 border-black rounded-xl p-2.5 text-xs font-black text-blue-950 flex items-center gap-2">
            <span>🔄</span>
            <span>Applicable strictly to the Afternoon Campus Return Journey (RETURNS MAA).</span>
          </div>
        )}

        {/* Bus Cancelled Warning (If Detected) */}
        {info.busWillNotCome && (
          <div className="mb-4 bg-red-100 border-2 border-red-500 rounded-xl p-2.5 text-xs font-black text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>BUS CANCELLED NOTICE: Scheduled vehicle will not operate. Follow backup boarding plan.</span>
          </div>
        )}

        {/* Barcode & Punchhole Bottom Section */}
        <div className="pt-3 border-t-2 border-dashed border-black/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Simulated Barcode */}
          <div className="flex items-center gap-1 select-none">
            {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, i) => (
              <div
                key={i}
                className="bg-black h-8"
                style={{ width: `${(w % 3) + 2}px` }}
              />
            ))}
            <span className="font-mono text-[10px] ml-2 text-zinc-500 tracking-widest">
              OPADSE-7460-VALID
            </span>
          </div>

          <div className="text-[11px] font-bold text-zinc-500 text-center sm:text-right">
            Extraction Confidence: <span className="font-black text-black">{info.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Verification Disclaimer */}
      <div className="mt-3 text-center">
        <p className="text-[10px] sm:text-xs text-zinc-500 font-bold">
          ⚠️ Note: Information extracted via algorithmic pattern matching. Always cross-verify with Imran Bhai before running to the bus stop.
        </p>
      </div>
    </div>
  );
};
