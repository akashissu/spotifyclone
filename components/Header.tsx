'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-spotify-darkgray/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Link
          href="#"
          className="text-white text-sm font-semibold hover:underline"
        >
          Install App
        </Link>
        <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
          Upgrade
        </button>
        <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:scale-105 transition-transform">
          U
        </div>
      </div>
    </header>
  );
}
