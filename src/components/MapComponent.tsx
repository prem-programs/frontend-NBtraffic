"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Plus, Minus } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function CustomZoomControl() {
  const map = useMap();
  
  return (
    <div className="absolute bottom-8 right-6 z-[1000] flex flex-col shadow-md rounded-xl overflow-hidden bg-white">
      <button 
        onClick={() => map.zoomIn()}
        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-100 text-gray-700"
        title="Zoom In"
      >
        <Plus className="w-6 h-6" />
      </button>
      <button 
        onClick={() => map.zoomOut()}
        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700"
        title="Zoom Out"
      >
        <Minus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default function MapComponent() {
  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={[28.6139, 77.2090]} 
        zoom={12} 
        minZoom={10}
        maxBounds={[[28.1, 76.8], [29.0, 77.6]]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={[28.6289, 77.2400]} />
        <CustomZoomControl />
      </MapContainer>
    </div>
  );
}
