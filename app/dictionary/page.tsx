import { Dictionary } from '@/components/Dictionary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Official Imran Dictionary 📖 | Imran's Translator",
  description: "Learn and decode legendary Gujarati-English bus terms used by Imran: KALE, OPADSE, BESWANU, TAVRATHI, and more.",
};

export default function DictionaryPage() {
  return <Dictionary />;
}
