import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import PlayerBar from '@/components/PlayerBar';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Spotify Clone — Music Streaming',
  description: 'A Spotify-style music streaming application built with Next.js 14',
  keywords: ['music', 'streaming', 'spotify', 'playlist', 'songs'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-spotify-darkgray text-white font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - hidden on mobile */}
          <aside className="hidden md:flex md:w-64 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto pb-24 md:pb-28">
            {children}
          </main>
        </div>

        {/* Player Bar - fixed at bottom */}
        <PlayerBar />

        {/* Mobile Navigation */}
        <MobileNav />
      </body>
    </html>
  );
}
