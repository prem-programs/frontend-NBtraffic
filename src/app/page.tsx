"use client";
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import { SearchBar, ProfileAlerts } from '@/components/Overlays';

const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar />
      <div className="flex-1 relative bg-gray-50 dark:bg-slate-900 transition-colors">
        <SearchBar />
        <ProfileAlerts />
        <MapComponent />
      </div>
    </main>
  );
}
