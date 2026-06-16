'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import TrackRow from '@/components/TrackRow';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import PlaylistCard from '@/components/PlaylistCard';
import { SAMPLE_TRACKS, SAMPLE_ARTISTS, SAMPLE_ALBUMS, SAMPLE_PLAYLISTS, SAMPLE_CATEGORIES } from '@/lib/utils';
import { Track, Artist, Album, Playlist } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tracks' | 'artists' | 'albums' | 'playlists'>('all');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredTracks = SAMPLE_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase()) ||
      t.album.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = SAMPLE_ARTISTS.filter(
    (a) => a.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = SAMPLE_ALBUMS.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = SAMPLE_PLAYLISTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const hasResults =
    filteredTracks.length > 0 ||
    filteredArtists.length > 0 ||
    filteredAlbums.length > 0 ||
    filteredPlaylists.length > 0;

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
  ] as const;

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-spotify-darkgray/90 backdrop-blur-sm px-6 py-4">
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="What do you want to listen to?" />

        {query && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-spotify-gray text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-8">
        {!query ? (
          /* Browse Categories when no search */
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {SAMPLE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setQuery(category.name)}
                  className="relative rounded-lg overflow-hidden aspect-square cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="absolute inset-0 p-4">
                    <span className="text-white font-bold text-lg leading-tight">{category.name}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 translate-x-2 translate-y-2 rotate-12">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover rounded-md shadow-lg"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : !hasResults ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-white text-2xl font-bold mb-2">No results found for "{query}"</p>
            <p className="text-spotify-lightgray">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Tracks */}
            {(activeTab === 'all' || activeTab === 'tracks') && filteredTracks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                <div className="bg-spotify-gray rounded-lg overflow-hidden">
                  {filteredTracks.slice(0, activeTab === 'all' ? 5 : filteredTracks.length).map((track, index) => (
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
            )}

            {/* Artists */}
            {(activeTab === 'all' || activeTab === 'artists') && filteredArtists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredArtists.slice(0, activeTab === 'all' ? 5 : filteredArtists.length).map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {(activeTab === 'all' || activeTab === 'albums') && filteredAlbums.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredAlbums.slice(0, activeTab === 'all' ? 5 : filteredAlbums.length).map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {(activeTab === 'all' || activeTab === 'playlists') && filteredPlaylists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredPlaylists.slice(0, activeTab === 'all' ? 5 : filteredPlaylists.length).map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
