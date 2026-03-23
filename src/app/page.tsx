"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Camera, MapPin, AlertCircle, Clock, Navigation } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { SearchBar, ProfileAlerts } from '@/components/Overlays';

const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { ssr: false }
);

export const vulnerabilitiesData = [
  {
    id: "CAM-001",
    type: "Camera",
    location: "Connaught Place",
    coordinates: [28.6328, 77.2197],
    status: "Critical",
    issue: "Lens Shattered",
    last_ping: "2026-03-23T10:05:00Z"
  },
  {
    id: "RAD-042",
    type: "Radar Sensor",
    location: "AIIMS Intersection",
    coordinates: [28.5672, 77.2100],
    status: "Warning",
    issue: "Intermittent Signal",
    last_ping: "2026-03-23T09:45:00Z"
  },
  {
    id: "LGT-088",
    type: "Traffic Light",
    location: "South Ext",
    coordinates: [28.5684, 77.2201],
    status: "Critical",
    issue: "Power Failure",
    last_ping: "2026-03-23T08:30:00Z"
  },
  {
    id: "CAM-104",
    type: "Camera",
    location: "ITO Junction",
    coordinates: [28.6295, 77.2405],
    status: "Warning",
    issue: "Connection Timeout",
    last_ping: "2026-03-23T10:15:00Z"
  },
  {
    id: "SEN-211",
    type: "Air Quality Sensor",
    location: "Karol Bagh",
    coordinates: [28.6520, 77.1903],
    status: "Critical",
    issue: "Sensor Contaminated",
    last_ping: "2026-03-23T07:12:00Z"
  },
  {
    id: "CAM-302",
    type: "Camera",
    location: "Lajpat Nagar",
    coordinates: [28.5680, 77.2433],
    status: "Warning",
    issue: "Poor Visibility (Dust)",
    last_ping: "2026-03-23T09:55:00Z"
  }
];

function CityPeakCard({ city, trafficData, onClick }: { city: string; trafficData: number[]; onClick?: () => void }) {
  const hours = ['6A', '7A', '8A', '9A', '10A', '11A', '12P', '1P', '2P', '3P', '4P', '5P', '6P', '7P', '8P', '9P', '10P'];
  const peak = Math.max(...trafficData);
  const avg = Math.round(trafficData.reduce((a, b) => a + b, 0) / trafficData.length);

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 p-4 hover:shadow-md transition-all ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 dark:text-white text-sm">{city}</h3>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
            Peak {peak}%
          </span>
          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 font-medium">
            Avg {avg}%
          </span>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div className="flex items-end gap-0.5 h-16 pointer-events-none">
        {trafficData.map((val, i) => (
          <div key={i} className="flex flex-col items-center flex-1 group relative h-full justify-end">
            <div
              className={`w-full rounded-t transition-all duration-500 min-h-[2px] ${val > 80 ? 'bg-red-500' : val > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>

      {/* X-axis labels (sparse) */}
      <div className="flex justify-between mt-1 px-0.5 pointer-events-none">
        <span className="text-[9px] text-gray-400">6A</span>
        <span className="text-[9px] text-gray-400">12P</span>
        <span className="text-[9px] text-gray-400">6P</span>
        <span className="text-[9px] text-gray-400">10P</span>
      </div>
    </div>
  );
}

function PeakHoursView() {
  const [search, setSearch] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState<{ city: string; data: number[] } | null>(null);

  const cityData = React.useMemo(() => [
    { city: 'Rajiv Chowk', data: [10, 20, 60, 95, 80, 50, 45, 40, 45, 50, 60, 85, 95, 75, 55, 30, 15] },
    { city: 'Connaught Place', data: [8, 18, 55, 90, 75, 48, 42, 38, 44, 52, 65, 88, 92, 70, 50, 28, 12] },
    { city: 'Karol Bagh', data: [12, 25, 65, 88, 70, 52, 48, 43, 48, 55, 62, 80, 90, 72, 58, 35, 18] },
    { city: 'Lajpat Nagar', data: [6, 15, 50, 85, 72, 45, 40, 35, 42, 50, 68, 82, 88, 68, 48, 25, 10] },
    { city: 'Dwarka', data: [15, 30, 70, 92, 78, 55, 50, 46, 50, 58, 70, 86, 91, 74, 60, 38, 20] },
    { city: 'Rohini', data: [9, 22, 58, 86, 68, 46, 43, 39, 45, 53, 63, 83, 89, 71, 52, 27, 13] },
    { city: 'Vasant Kunj', data: [7, 16, 52, 82, 66, 44, 38, 34, 40, 48, 60, 78, 85, 65, 46, 23, 9] },
    { city: 'Saket', data: [11, 23, 62, 89, 74, 51, 47, 42, 47, 54, 66, 84, 93, 73, 56, 33, 16] },
    { city: 'Nehru Place', data: [5, 14, 48, 80, 69, 43, 37, 33, 39, 46, 59, 76, 83, 63, 44, 21, 8] },
    { city: 'Hauz Khas', data: [10, 21, 57, 84, 71, 47, 41, 36, 43, 51, 61, 79, 87, 67, 49, 26, 11] },
    { city: 'Chandni Chowk', data: [14, 28, 68, 91, 77, 54, 49, 45, 49, 57, 69, 85, 92, 73, 59, 37, 19] },
    { city: 'ITO Junction', data: [8, 19, 54, 87, 73, 49, 44, 40, 46, 53, 64, 82, 90, 69, 51, 29, 14] },
    { city: 'AIIMS', data: [13, 26, 64, 90, 76, 53, 48, 44, 48, 56, 67, 83, 91, 72, 57, 36, 18] },
    { city: 'South Ext', data: [7, 17, 51, 83, 67, 45, 39, 35, 41, 49, 60, 77, 84, 64, 45, 22, 9] },
    { city: 'Janakpuri', data: [11, 24, 61, 88, 74, 50, 46, 42, 46, 54, 65, 84, 90, 71, 55, 32, 16] },
    { city: 'Pitampura', data: [9, 20, 56, 85, 69, 47, 42, 39, 44, 52, 62, 81, 88, 70, 52, 28, 13] },
  ], []);

  const filtered = search.trim() === ''
    ? cityData
    : cityData.filter(c => c.city.toLowerCase().includes(search.toLowerCase()));

  const hours = ['6A', '7A', '8A', '9A', '10A', '11A', '12P', '1P', '2P', '3P', '4P', '5P', '6P', '7P', '8P', '9P', '10P'];

  return (
    <div className="h-full flex flex-col overflow-hidden w-full relative">
      {/* sticky search bar */}
      <div className="flex-shrink-0 px-6 pt-5 pb-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Peak Hours — Delhi Areas</h2>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              id="city-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search city…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>
          {search && (
            <p className="mt-1.5 text-xs text-gray-400">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* scrollable grid */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <span className="text-sm">No cities match &ldquo;{search}&rdquo;</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(({ city, data }) => (
                <CityPeakCard
                  key={city}
                  city={city}
                  trafficData={data}
                  onClick={() => setSelectedCity({ city, data })}
                />
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="flex justify-center items-center gap-5 mt-5 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-xs text-gray-500">Low</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><span className="text-xs text-gray-500">Moderate</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-xs text-gray-500">High</span></div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedCity && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-all"
          onClick={() => setSelectedCity(null)}
        >
          <div
            className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedCity.city}</h2>
              <button
                onClick={() => setSelectedCity(null)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-end justify-between h-64 gap-2">
              {hours.map((hour, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                  <div className="h-56 w-full flex items-end justify-center rounded-t-lg mb-2 relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                      {hour}: {selectedCity.data[i]}%
                    </div>
                    <div
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 min-h-[4px] ${selectedCity.data[i] > 80 ? 'bg-red-500' :
                        selectedCity.data[i] > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ height: `${selectedCity.data[i]}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{hour}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-6 mt-8 border-t border-gray-100 dark:border-slate-700 pt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-sm text-gray-600 dark:text-gray-300">Low Density</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-sm text-gray-600 dark:text-gray-300">Moderate Density</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-sm text-gray-600 dark:text-gray-300">High Density</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MostBusiestView() {
  const cities = [
    'Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Dwarka',
    'Rohini', 'Vasant Kunj', 'Saket', 'Nehru Place', 'Hauz Khas', 'Chandni Chowk'
  ];

  // Create a randomized ranking list using useMemo to avoid re-shuffling on every render
  const rankedCities = React.useMemo(() => {
    const list = cities.map(city => ({
      name: city,
      trafficIndex: Math.floor(Math.random() * 50) + 50 // Random number between 50 and 99
    }));
    list.sort((a, b) => b.trafficIndex - a.trafficIndex);
    return list;
  }, []);

  return (
    <div className="p-8 h-full flex flex-col items-center overflow-y-auto w-full">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 my-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Most Busiest Areas</h2>
        <p className="text-gray-500 mb-8">Real-time ranking of Delhi areas by randomly generated traffic density</p>

        <div className="space-y-4">
          {rankedCities.map((city, index) => (
            <div key={city.name} className="flex items-center bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 mr-4">
                #{index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{city.name}</h3>
                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${city.trafficIndex}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <span className="block text-2xl font-bold text-gray-800 dark:text-white">{city.trafficIndex}</span>
                <span className="text-xs text-gray-500 uppercase">Index</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HardwareVulnerabilityView() {
  return (
    <div className="p-8 h-full flex flex-col items-center overflow-y-auto w-full">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Hardware Vulnerability</h2>
            <p className="text-gray-500">Live monitoring of device health across the city</p>
          </div>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold rounded-full text-sm">
            {vulnerabilitiesData.length} Issues Detected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vulnerabilitiesData.map((vulnerabilityData) => (
            <div id={`vuln-${vulnerabilityData.id}`} key={vulnerabilityData.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-800 dark:text-white font-semibold mb-1">
                    {vulnerabilityData.type === 'Camera' ? <Camera className="w-4 h-4 mr-2 text-gray-500" /> : <Navigation className="w-4 h-4 mr-2 text-gray-500" />}
                    {vulnerabilityData.type}
                  </div>
                  <span className="text-xs text-gray-500">{vulnerabilityData.id}</span>
                </div>
                <span className={`px-3 py-1 font-semibold rounded-full text-xs flex items-center ${vulnerabilityData.status === 'Critical'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {vulnerabilityData.status}
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div className={`p-3 rounded-xl border ${vulnerabilityData.status === 'Critical'
                  ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                  : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30'
                  }`}>
                  <div className={`text-xs mb-1 ${vulnerabilityData.status === 'Critical' ? 'text-red-500 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-500'
                    }`}>Detected Issue</div>
                  <div className={`font-semibold text-sm ${vulnerabilityData.status === 'Critical' ? 'text-red-700 dark:text-red-400' : 'text-yellow-800 dark:text-yellow-500'
                    }`}>
                    {vulnerabilityData.issue}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Location
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {vulnerabilityData.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <Navigation className="w-3 h-3 mr-1" /> Coordinates
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {vulnerabilityData.coordinates[0]}, {vulnerabilityData.coordinates[1]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{new Date(vulnerabilityData.last_ping).toLocaleTimeString()}</span>
                </div>
                <div className="flex gap-3">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline font-semibold">
                    Dispatch
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:underline font-semibold">
                    View feed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Delhi Map");

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 relative bg-gray-50 dark:bg-slate-900 transition-colors h-full flex flex-col">
        {activeTab === "Delhi Map" && (
          <>
            <SearchBar />
            <ProfileAlerts setActiveTab={setActiveTab} />
            <div className="flex-1 relative w-full h-full">
              <MapComponent />
            </div>
          </>
        )}
        {activeTab === "Peak hours" && <PeakHoursView />}
        {activeTab === "Most busiest" && <MostBusiestView />}
        {activeTab === "Hardware vulnerability" && <HardwareVulnerabilityView />}
      </div>
    </main>
  );
}
