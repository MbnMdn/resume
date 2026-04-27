import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Mobina Madanikhah | Frontend Engineer',
  description: 'Frontend Engineer specializing in building scalable, high-performance web applications using React and Next.js ecosystems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} selection:bg-teal-500/30`}>
      <body className="bg-[#0a0a0a] text-zinc-300 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
