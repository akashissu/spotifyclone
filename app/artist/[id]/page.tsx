'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackRow from '@/components/TrackRow';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';
import { SAMPLE_ARTISTS, SAMPLE_ALBUMS, formatNumber } from '@/lib/utils';
import { Track } from '@/types';

interface ArtistPageProps {
  params: { id: string };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artist = SAMPLE_ARTISTS.find((a) => a.id === params.id) || SAMPLE_ARTISTS[0];
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const artistAlbums = SAMPLE_ALBUMS.filter((a) => a.artistId === artist.id);
  const relatedArtists = SAMPLE_ARTISTS.filter((a) => a.id !== artist.id).slice(0, 6);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayAll = () => {
    if (artist.topTracks.length > 0) {
      setCurrentTrack(artist.topTracks[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-spotify-darkgray via-spotify-darkgray/40 to-transparent" />
        <div className="absolute bottom-0 left-0 px-6 pb-6">
          {artist.verified && (
            <div className="flex items-center gap-1 mb-2">
              <svg className="w-5 h-5 text-spotify-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span className="text-white text-xs font-semibold">Verified Artist</span>
            </div>
          )}
          <h1 className="text-5xl sm:text-7xl font-bold text-white">{artist.name}</h1>
          <p className="text-white/80 mt-2 text-sm">
            {formatNumber(artist.monthlyListeners)} monthly listeners
          </p>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
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
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-full text-sm font-semibold border transition-colors ${
              isFollowing
                ? 'border-white text-white hover:border-spotify-lightgray hover:text-spotify-lightgray'
                : 'border-spotify-lightgray text-white hover:border-white'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="text-spotify-lightgray hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Popular Tracks */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
          {artist.topTracks.length > 0 ? (
            <div className="bg-spotify-gray rounded-lg overflow-hidden">
              {artist.topTracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index + 1}
                  isPlaying={isPlaying && currentTrack?.id === track.id}
                  onPlay={() => handlePlayTrack(track)}
                  showPopularity
                />
              ))}
            </div>
          ) : (
            <p className="text-spotify-lightgray">No tracks available</p>
          )}
        </section>

        {/* Albums */}
        {artistAlbums.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Discography</h2>
              <button className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {artistAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="relative rounded-xl overflow-hidden">
            <div className="relative h-48 sm:h-64">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="bg-spotify-gray p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-white">
                  {formatNumber(artist.monthlyListeners)}
                </span>
                <span className="text-spotify-lightgray text-sm">monthly listeners</span>
              </div>
              <p className="text-spotify-lightgray text-sm leading-relaxed">
                {showFullBio ? artist.bio : `${artist.bio.slice(0, 200)}...`}
              </p>
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-white font-semibold text-sm mt-2 hover:underline"
              >
                {showFullBio ? 'Show less' : 'Show more'}
              </button>
              <div className="flex flex-wrap gap-2 mt-4">
                {artist.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Fans also like</h2>
            <button className="text-sm text-spotify-lightgray hover:text-white font-semibold transition-colors">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {relatedArtists.map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
