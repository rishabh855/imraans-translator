import { HallOfFame } from '@/components/HallOfFame';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Imran's Hall of Fame 🏆 | The Greatest Bus Announcements",
  description: "Browse, rate, and like the most baffling, iconic, and legendary WhatsApp announcements ever composed by Imran.",
};

export default function HallOfFamePage() {
  return <HallOfFame />;
}
