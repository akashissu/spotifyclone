# Spotify Clone — Music Streaming UI

A production-ready Spotify-style music streaming application built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Features

- 🎵 **Music Streaming UI** — Full Spotify-inspired interface
- 🏠 **Home Page** — Hero section, featured playlists, recently played, trending tracks
- 🔍 **Search** — Real-time search across tracks, artists, albums, and playlists
- 🎨 **Browse** — Categories, charts, new releases
- 📋 **Playlist Detail** — Full tracklist with play controls
- 👤 **Artist Profile** — Bio, top tracks, discography, related artists
- 🎛️ **Player Bar** — Persistent bottom player with controls, progress, and volume
- 📱 **Mobile Navigation** — Bottom nav for mobile devices
- 🗂️ **Sidebar** — Desktop navigation with library

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd spotify-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
spotify-clone/
├── app/
│   ├── globals.css          # Global styles with Tailwind directives
│   ├── layout.tsx           # Root layout with Sidebar and PlayerBar
│   ├── page.tsx             # Home page
│   ├── browse/
│   │   └── page.tsx         # Browse page
│   ├── search/
│   │   └── page.tsx         # Search page
│   ├── playlist/
│   │   └── [id]/
│   │       └── page.tsx     # Playlist detail page
│   └── artist/
│       └── [id]/
│           └── page.tsx     # Artist profile page
├── components/
│   ├── Sidebar.tsx          # Desktop sidebar navigation
│   ├── PlayerBar.tsx        # Bottom music player
│   ├── MobileNav.tsx        # Mobile bottom navigation
│   ├── PlaylistCard.tsx     # Playlist card component
│   ├── TrackRow.tsx         # Track list row component
│   ├── ArtistCard.tsx       # Artist card component
│   ├── AlbumCard.tsx        # Album card component
│   ├── SearchBar.tsx        # Search input component
│   ├── Header.tsx           # Page header component
│   └── Footer.tsx           # Footer component
├── lib/
│   └── utils.ts             # Utilities and sample data
├── types/
│   └── index.ts             # TypeScript type definitions
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home with featured playlists and trending tracks |
| `/browse` | Browse categories, charts, and new releases |
| `/search` | Search with real-time filtering |
| `/playlist/[id]` | Playlist detail with full tracklist |
| `/artist/[id]` | Artist profile with bio and top tracks |

## Components

| Component | Description |
|-----------|-------------|
| `Sidebar` | Desktop navigation with library |
| `PlayerBar` | Persistent bottom music player |
| `MobileNav` | Mobile bottom navigation |
| `PlaylistCard` | Card for displaying playlists |
| `TrackRow` | Row for displaying individual tracks |
| `ArtistCard` | Card for displaying artists |
| `AlbumCard` | Card for displaying albums |
| `SearchBar` | Search input with clear button |
| `Header` | Page header with navigation |
| `Footer` | Site footer with links |

## Build

```bash
npm run build
npm start
```

## License

MIT — This is a demo/educational project and is not affiliated with Spotify AB.
