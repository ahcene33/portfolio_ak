import '@/app/globals.css';
import Navbar from '@/app/components/Navbar';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Data Analyst Portfolio – Ahcene',
  description:
    'Data Analyst Freelance – Energy, Aerospace, Environment – Python, SQL, PowerBI, ML',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Sticky + blur Navbar */}
        <Navbar />
        <main className="min-h-screen pt-24 bg-darkbg">{children}</main>
      </body>
    </html>
  );
}
