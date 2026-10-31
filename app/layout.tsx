import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { QuoteMarquee } from '@/components/QuoteMarquee';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Imran's Translator 🚌😂 | Google Translate for Imran's Language",
  description: "Decode confusing WhatsApp bus announcements written in Gujarati-English transliteration. From OPADSE to understandable English, Hindi, and Gujarati with hilarious certified translations.",
  keywords: ["Imran Translator", "Bus Translator", "Gujarati English", "OPADSE", "WhatsApp Bus Announcements", "College Bus Translator"],
  authors: [{ name: "Imran's Students" }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>',
  },
  openGraph: {
    title: "Imran's Translator 🚌😂",
    description: "Lost in Translation? Imran has entered the chat. Decode your WhatsApp bus announcements instantly.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFC837',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-bus-cream text-bus-black antialiased">
        <Navbar />
        <QuoteMarquee />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
