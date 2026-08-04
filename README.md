# Traffic Management System

A clean, responsive Next.js frontend built with TypeScript for visualizing traffic data. I created this for a india innovates hackathon — it uses Leaflet maps and charts to display traffic information and is designed for easy deployment (Vercel, Netlify, or static hosting).


## Features

- Interactive map views using Leaflet and react-leaflet
- Charts and visualizations powered by Recharts
- Lightweight UI components with Lucide icons
- Tailwind CSS for styling (via PostCSS)
- Built with Next.js (App Router) and TypeScript

## Tech stack

- Next.js
- React + TypeScript
- Leaflet + react-leaflet
- Recharts
- Tailwind CSS

## Getting started

Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

Install dependencies

```bash
npm install
# or
# yarn
# pnpm install
# bun install
```

Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

Build for production

```bash
npm run build
npm start
```

Lint

```bash
npm run lint
```

## Environment variables

If your frontend fetches data from an API, you can set an environment variable in a .env.local file at the project root:

```env
# Example — replace with your actual API endpoint
NEXT_PUBLIC_API_URL=https://api.example.com
```

Next.js will expose variables prefixed with NEXT_PUBLIC_ to the browser.

## Deployment

This app is ready to deploy on Vercel with zero-configuration for Next.js projects. You can also deploy to other platforms that support Node.js.

- Vercel: Connect the GitHub repo and deploy (default branch is used).
- Static export: If the app is fully static, you can export and host on any static host.
