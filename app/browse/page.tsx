'use client';

import Link from 'next/link';
import Image from 'next/image';
import PlaylistCard from '@/components/PlaylistCard';
import AlbumCard from '@/components/AlbumCard';
import { SAMPLE_CATEGORIES, SAMPLE_PLAYLISTS, SAMPLE_ALBUMS } from '@/lib/utils';

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-spotify-darkgray/90 backdrop-blur-sm px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Browse</h1>
      </div>

      <div className="px-6 pb-8">
        {/* Charts Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Charts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SAMPLE_PLAYLISTS.slice(0, 5).map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">New Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SAMPLE_ALBUMS.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {SAMPLE_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.name.toLowerCase()}`}
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
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SAMPLE_PLAYLISTS.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
