"use client";
import React, { useState } from "react";
import { Search, Bell, UserCircle } from "lucide-react";

const mockIntersections = ['ITO Junction', 'AIIMS Intersection', 'Connaught Place', 'South Ext'];

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockIntersections.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[400px]">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-slate-800 border-0 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Search intersections..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {isFocused && searchTerm && filtered.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            <ul className="py-2">
              {filtered.map(item => (
                <li key={item} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                   <Search className="w-4 h-4 text-gray-400" /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileAlerts() {
  return (
    <div className="absolute top-6 right-6 z-[1000] flex space-x-3">
      <button className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
        <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}
