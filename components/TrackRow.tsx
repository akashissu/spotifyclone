'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Track } from '@/types';
import { formatDuration } from '@/lib/utils';

interface TrackRowProps {
  track: Track;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
  showAlbum?: boolean;
  showPopularity?: boolean;
}

export default function TrackRow({
  track,
  index,
  isPlaying,
  onPlay,
  showAlbum = false,
  showPopularity = false,
}: TrackRowProps) {
  return (
    <div
      className={`group flex items-center gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
        isPlaying ? 'bg-white/10' : ''
      }`}
      onClick={onPlay}
    >
      {/* Index / Play Button */}
      <div className="w-8 flex items-center justify-center flex-shrink-0">
        <span
          className={`text-sm group-hover:hidden ${
            isPlaying ? 'text-spotify-green hidden' : 'text-spotify-lightgray'
          }`}
        >
          {index}
        </span>
        {isPlaying ? (
          <svg className="w-4 h-4 text-spotify-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>

      {/* Cover + Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <p
            className={`text-sm font-medium truncate ${
              isPlaying ? 'text-spotify-green' : 'text-white'
            }`}
          >
            {track.title}
            {track.explicit && (
              <span className="ml-2 text-xs bg-spotify-lightgray text-black px-1 rounded font-bold">
                E
              </span>
            )}
          </p>
          <Link
            href={`/artist/${track.artistId}`}
            className="text-spotify-lightgray text-xs hover:text-white hover:underline truncate block"
            onClick={(e) => e.stopPropagation()}
          >
            {track.artist}
          </Link>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="hidden sm:block flex-1 min-w-0">
          <Link
            href={`/playlist/${track.albumId}`}
            className="text-spotify-lightgray text-sm hover:text-white hover:underline truncate block"
            onClick={(e) => e.stopPropagation()}
          >
            {track.album}
          </Link>
        </div>
      )}

      {/* Popularity Bar */}
      {showPopularity && track.popularity !== undefined && (
        <div className="hidden sm:flex items-center gap-2 w-24">
          <div className="flex-1 h-1 bg-spotify-lightgray/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-spotify-lightgray rounded-full"
              style={{ width: `${track.popularity}%` }}
            />
          </div>
        </div>
      )}

      {/* Duration */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="opacity-0 group-hover:opacity-100 text-spotify-lightgray hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <span className="text-spotify-lightgray text-sm">{formatDuration(track.duration)}</span>
        <button
          className="opacity-0 group-hover:opacity-100 text-spotify-lightgray hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
