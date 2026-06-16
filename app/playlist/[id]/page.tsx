'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackRow from '@/components/TrackRow';
import { SAMPLE_PLAYLISTS, formatNumber, formatDuration } from '@/lib/utils';
import { Track } from '@/types';

interface PlaylistPageProps {
  params: { id: string };
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  const playlist = SAMPLE_PLAYLISTS.find((p) => p.id === params.id) || SAMPLE_PLAYLISTS[0];
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-800 to-spotify-darkgray px-6 pt-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 shadow-2xl">
            <Image
              src={playlist.coverUrl}
              alt={playlist.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-2">Playlist</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{playlist.title}</h1>
            <p className="text-spotify-lightgray text-sm mb-3">{playlist.description}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-sm">
              <span className="font-semibold text-white">{playlist.owner}</span>
              <span className="text-spotify-lightgray">•</span>
              <span className="text-spotify-lightgray">{formatNumber(playlist.followers)} likes</span>
              <span className="text-spotify-lightgray">•</span>
              <span className="text-spotify-lightgray">{playlist.tracks.length} songs,</span>
              <span className="text-spotify-lightgray">about {totalMinutes} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="w-10 h-10 rounded-full border-2 border-spotify-lightgray flex items-center justify-center hover:border-white transition-colors">
          <svg className="w-5 h-5 text-spotify-lightgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="text-spotify-lightgray hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Track List Header */}
      <div className="px-6">
        <div className="grid grid-cols-[16px_1fr_1fr_80px] gap-4 px-4 py-2 border-b border-white/10 text-spotify-lightgray text-sm font-medium">
          <span>#</span>
          <span>Title</span>
          <span className="hidden sm:block">Album</span>
          <span className="text-right">
            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
            </svg>
          </span>
        </div>

        {/* Tracks */}
        <div className="mt-2">
          {playlist.tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index + 1}
              isPlaying={isPlaying && currentTrack?.id === track.id}
              onPlay={() => handlePlayTrack(track)}
              showAlbum
            />
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-6 mt-8 pb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Recommended</h2>
        <p className="text-spotify-lightgray text-sm mb-4">Based on what's in this playlist</p>
        <div className="bg-spotify-gray rounded-lg overflow-hidden">
          {SAMPLE_PLAYLISTS.filter(p => p.id !== playlist.id).slice(0, 3).flatMap(p => p.tracks.slice(0, 2)).slice(0, 5).map((track, index) => (
            <TrackRow
              key={`rec-${track.id}-${index}`}
              track={track}
              index={index + 1}
              isPlaying={false}
              onPlay={() => handlePlayTrack(track)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
