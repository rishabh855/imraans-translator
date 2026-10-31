export type TargetLanguage = 'en' | 'hi' | 'gu';
export type TranslationStyle = 'normal' | 'funny' | 'savage';

export interface ExtractedBusInfo {
  busNumbers: string[];
  transfers: { from: string; to: string }[];
  locations: string[];
  times: string[];
  date: string | null;
  actions: string[];
  isReturnJourney: boolean;
  busWillNotCome: boolean;
  isRegularTime: boolean;
  confidenceScore: number; // 0 to 100
  notes: string[];
}

export interface TranslationResultData {
  original: string;
  normal: {
    en: string;
    hi: string;
    gu: string;
  };
  funny: string;
  savage: string;
  explanation: string;
  extractedInfo: ExtractedBusInfo;
  confusionScore: number; // 1 to 10
  imranismDetected: string[];
  style: TranslationStyle;
  targetLang: TargetLanguage;
}

export interface DictionaryEntry {
  id: string;
  term: string;
  spellingVariations: string[];
  gujaratiScript: string;
  pronunciation: string;
  meaningEn: string;
  meaningHi: string;
  category: 'Verb' | 'Location' | 'Logistics' | 'Time & Date' | 'Directives' | 'Status';
  funnyDescription: string;
  exampleImran: string;
  exampleTranslation: string;
  isProvisional?: boolean;
}

export interface SampleMessage {
  id: string;
  text: string;
  category: 'Bus Timing' | 'Bus Change' | 'Return Journey' | 'Multiple Buses' | 'General Announcement';
  context: string;
  timestamp: string;
  sender: string;
  confusionRating: number; // out of 10
}

export interface HallOfFameEntry {
  id: string;
  original: string;
  actualTranslation: string;
  funnyTranslation: string;
  confusionRating: number;
  category: 'Linguistic Masterpiece' | 'Bus Mathematics' | 'Advanced Gujarati Engineering' | 'The Return Journey Saga' | 'Timing Mystery' | 'Imran Logic';
  badge: string;
  initialLikes: number;
}
