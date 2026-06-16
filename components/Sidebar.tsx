'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { SAMPLE_PLAYLISTS } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      href: '/browse',
      label: 'Browse',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      ),
    },
    {
      href: '/search',
      label: 'Search',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-spotify-black w-full">
      {/* Logo */}
      <div className="px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white font-bold text-xl">Spotify</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 mb-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-3 py-3 rounded-md font-semibold text-sm transition-colors ${
              pathname === item.href
                ? 'text-white bg-spotify-gray'
                : 'text-spotify-lightgray hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Library */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3">
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <button className="flex items-center gap-2 text-spotify-lightgray hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
              </svg>
              <span className="font-semibold text-sm">Your Library</span>
            </button>
            <button className="text-spotify-lightgray hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>

          {/* Create Playlist Prompt */}
          <div className="bg-spotify-gray rounded-lg p-4 mb-3">
            <p className="text-white font-semibold text-sm mb-1">Create your first playlist</p>
            <p className="text-spotify-lightgray text-xs mb-3">It's easy, we'll help you</p>
            <button className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
              Create playlist
            </button>
          </div>

          {/* Playlists */}
          <div className="space-y-1">
            {SAMPLE_PLAYLISTS.slice(0, 6).map((playlist) => (
              <Link
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-spotify-gray transition-colors group"
              >
                <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-sm font-medium truncate">{playlist.title}</p>
                  <p className="text-spotify-lightgray text-xs truncate">Playlist • {playlist.owner}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
