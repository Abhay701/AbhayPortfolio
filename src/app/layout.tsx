
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Abhay Kumar | Full Stack Developer Portfolio',
  description: 'Portfolio of Abhay Kumar - Full Stack Developer specializing in React, Next.js, and Enterprise ERP Systems.',
  openGraph: {
    title: 'Abhay Kumar | Full Stack Developer',
    description: 'Building modern, responsive, and scalable web applications.',
    type: 'website',
    locale: 'en_IN',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
