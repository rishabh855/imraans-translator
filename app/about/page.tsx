import { About } from '@/components/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who is Imran? 🚌 | Imran's Translator",
  description: "The story behind Imran Bhai, the legendary bus manager whose WhatsApp broadcasts inspired an entire decoder website.",
};

export default function AboutPage() {
  return <About />;
}
