import { ExtractedBusInfo, TargetLanguage, TranslationResultData, TranslationStyle } from './types';
import { analyzeMessage, busNumbers, messageTimes, messageLocations, messageTransfers, normalizeMessage, translateAccurately } from './translationEngine';

export const extractBusNumbers = busNumbers;
export const extractTimes = messageTimes;
export const extractLocations = messageLocations;
export const extractTransfers = messageTransfers;
export const parseBusMessage = analyzeMessage;

// Core rule-based translation builder
export function translateMessage(
  rawInput: string,
  style: TranslationStyle = 'normal',
  targetLang: TargetLanguage = 'en'
): TranslationResultData {
  const input = rawInput.trim();
  const upper = normalizeMessage(input);
  const info = parseBusMessage(input);

  // Detect Imranisms present
  const imranisms: string[] = [];
  if (/OPAADSE|OPADSE|OPADE|UPAADSE/i.test(upper)) imranisms.push('OPADSE (Depart)');
  if (/BESWANO|BESWANU|BESVO PADSE|BESVU PADSE/i.test(upper)) imranisms.push('BESWANU (Board)');
  if (/NA STUDENT NE/i.test(upper)) imranisms.push('NA STUDENT NE (Student assignment)');
  if (/\bRETURN\b/i.test(upper)) imranisms.push('RETURNS MAA (Return journey)');
  if (/REGYULAR|REGULAR/i.test(upper)) imranisms.push('REGYULAR TIME (Standard schedule)');
  if (/\bNAHI AAVSE\b/i.test(upper)) imranisms.push('BUS NAHI AAVE (Cancellation notice)');
  if (/TAVRATHI|TAVRA THI/i.test(upper)) imranisms.push('TAVRATHI (Tavra stop)');
  if (/BY-PASS|BYPASS/i.test(upper)) imranisms.push('BY-PASS (Highway stop)');

  // Render every supported clause, retaining uncertain wording for verification.
  const normal = translateAccurately(input);
  const funny = buildFunnyTranslation(input, info);
  const savage = buildSavageTranslation(input, info);

  // Confusion score calculation (scale 1 to 10)
  let confusion = 4.0;
  if (info.busNumbers.length > 2) confusion += 2.5;
  if (info.transfers.length > 0) confusion += 1.5;
  if (upper.includes('AND') || upper.includes('AETLE') || upper.includes('ETLE')) confusion += 1.0;
  if (info.locations.length > 1) confusion += 1.2;
  if (upper.length > 80) confusion += 1.0;
  confusion = Math.min(10, Math.max(3.5, Math.round(confusion * 10) / 10));

  return {
    original: input,
    normal,
    funny,
    savage,
    explanation: generateExplanation(info),
    extractedInfo: info,
    confusionScore: confusion,
    imranismDetected: imranisms,
    style,
    targetLang,
  };
}

function buildFunnyTranslation(input: string, info: ExtractedBusInfo): string {
  const upper = input.toUpperCase();

  if (info.busWillNotCome && info.transfers.length > 0) {
    const t = info.transfers[0];
    return `🚨 RED ALERT: Bus ${t.from} has given up on life and will remain in deep meditation. All passengers of ${t.from} must now cram into bus ${t.to} like freshly packed samosas. Imran guarantees zero legroom!`;
  }

  if (info.isReturnJourney && info.transfers.length > 0) {
    const t = info.transfers[0];
    return `🔄 THE RETURN SAGA: You survived college, but you haven't survived Imran. Bus ${t.from} students are hereby transferred to bus ${t.to} for the return voyage. Claim your seat before someone puts their notebook on it!`;
  }

  if (info.transfers.length > 0) {
    const t = info.transfers[0];
    return `📢 ATTENTION CITIZENS: Anyone holding loyalty cards for bus ${t.from} is officially evicted. Please board chariot ${t.to}. If ${t.to} is full, stand on one foot and maintain eye contact with Imran.`;
  }

  if (info.busNumbers.length === 1 && info.times.length > 0) {
    const bus = info.busNumbers[0];
    const loc = info.locations[0] || 'the mystery junction';
    const time = info.times[0];
    return `🚌 BEHOLD: The legendary iron beast number ${bus} shall roar out of ${loc} precisely at ${time}. Arrive 5 minutes early, or begin practicing your 100-meter sprint behind the exhaust pipe.`;
  }

  if (upper.includes('REGYULAR') && info.busNumbers.length >= 2) {
    return `🌀 QUANTUM TRANSIT: Imran claims buses will run on "REGYULAR TIME". Scholars are still debating whether this regular time exists in our solar system. Expect buses ${info.busNumbers.join(' & ')} to appear according to divine will.`;
  }

  if (info.busNumbers.length > 2) {
    return `🧠 300 IQ LOGISTICS: Imran has released a high-level bus matrix featuring ${info.busNumbers.join(', ')}. If you can decipher which bus reaches your village first, Oxford University will grant you an honorary degree.`;
  }

  return `🚌 IMRAN SAYS: Board whatever has wheels and is moving in the general direction of college. Question nothing, hold the handrail tightly, and trust the OPADSE process!`;
}

function buildSavageTranslation(input: string, info: ExtractedBusInfo): string {
  if (info.busWillNotCome) {
    return `Bus won't come because it doesn't like your face today. Squeeze into whatever other bus is passing by and don't dare call Imran to complain.`;
  }

  if (info.transfers.length > 0) {
    const t = info.transfers[0];
    return `Students of ${t.from}: your bus has dumped you. You are now the problem of bus ${t.to}'s driver. Go fight for the window seat.`;
  }

  if (info.times.length > 0) {
    const time = info.times[0];
    return `Bus departs at ${time}. That means if you show up at ${time.replace('AM', '')}:01, you'll be smelling diesel smoke while waving goodbye.`;
  }

  return `Imran typed this while drinking cutting chai with one thumb. Do not ask for clarification, just show up at the stop and pray.`;
}

function generateExplanation(info: ExtractedBusInfo): string {
  const points: string[] = [];
  if (info.busNumbers.length > 0) points.push(`Fleet: #${info.busNumbers.join(', #')}`);
  if (info.locations.length > 0) points.push(`Stops: ${info.locations.join(', ')}`);
  if (info.times.length > 0) points.push(`Time: ${info.times.join(', ')}`);
  if (info.transfers.length > 0) points.push(`Reallocation: ${info.transfers.map(t => `${t.from} ➔ ${t.to}`).join(', ')}`);
  if (info.isReturnJourney) points.push('Return trip (RETURNS MAA)');
  if (info.isRegularTime) points.push('Standard college schedule');

  return points.length > 0 ? points.join(' • ') : 'Standard Imran broadcast announcement.';
}
