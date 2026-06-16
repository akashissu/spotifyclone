'use client';

import Link from 'next/link';
import Image from 'next/image';
import PlaylistCard from '@/components/PlaylistCard';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import TrackRow from '@/components/TrackRow';
import { SAMPLE_PLAYLISTS, SAMPLE_ARTISTS, SAMPLE_ALBUMS, SAMPLE_TRACKS } from '@/lib/utils';
import { useState } from 'react';
import { Track } from '@/types';

export default function HomePage() {
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const recentlyPlayed = SAMPLE_PLAYLISTS.slice(0, 6);
  const featuredPlaylists = SAMPLE_PLAYLISTS.slice(0, 8);
  const trendingTracks = SAMPLE_TRACKS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-spotify-darkgray to-spotify-darkgray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-indigo-900/80 to-transparent backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{getGreeting()}</h1>
        <div className="flex items-center gap-3">
          <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
            Upgrade
          </button>
          <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center text-black font-bold text-sm">
            U
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        {/* Recently Played Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recentlyPlayed.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-colors group"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-sm text-white truncate pr-2">{playlist.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
            <Link href="/browse" className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {featuredPlaylists.slice(0, 6).map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <Link href="/browse" className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="bg-spotify-gray rounded-lg overflow-hidden">
            {trendingTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index + 1}
                isPlaying={isPlaying && currentTrack?.id === track.id}
                onPlay={() => handlePlayTrack(track)}
              />
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Popular Artists</h2>
            <Link href="/browse" className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {SAMPLE_ARTISTS.slice(0, 6).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">New Releases</h2>
            <Link href="/browse" className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {SAMPLE_ALBUMS.slice(0, 6).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
