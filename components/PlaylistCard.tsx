'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Playlist } from '@/types';
import { formatNumber } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="group bg-spotify-gray hover:bg-white/10 rounded-lg p-4 transition-colors cursor-pointer"
    >
      <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
        <Image
          src={playlist.coverUrl}
          alt={playlist.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm truncate mb-1">{playlist.title}</h3>
      <p className="text-spotify-lightgray text-xs truncate">{playlist.description}</p>
    </Link>
  );
}
