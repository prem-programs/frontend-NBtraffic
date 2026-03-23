export interface IntersectionData {
  id: number;
  nodeId: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  p: number;
}

export const intersections: IntersectionData[] = [
  { id: 1, nodeId: "284501", name: "ITO Junction", lat: 28.6271, lng: 77.2403, status: "Red", p: 0.85 },
  { id: 2, nodeId: "284502", name: "AIIMS", lat: 28.5675, lng: 77.2069, status: "Red", p: 0.92 },
  { id: 3, nodeId: "284503", name: "Connaught Place", lat: 28.6304, lng: 77.2177, status: "Yellow", p: 0.60 },
  { id: 4, nodeId: "284504", name: "South Ext", lat: 28.5685, lng: 77.2215, status: "Red", p: 0.75 },
  { id: 5, nodeId: "284505", name: "Dhaula Kuan", lat: 28.5918, lng: 77.1615, status: "Green", p: 0.25 },
  { id: 6, nodeId: "284506", name: "Kashmere Gate", lat: 28.6665, lng: 77.2289, status: "Yellow", p: 0.55 },
  { id: 7, nodeId: "284507", name: "Ashram Chowk", lat: 28.5724, lng: 77.2600, status: "Red", p: 0.88 },
  { id: 8, nodeId: "284508", name: "Laxmi Nagar", lat: 28.6300, lng: 77.2764, status: "Green", p: 0.30 },
  { id: 9, nodeId: "284509", name: "Karol Bagh", lat: 28.6429, lng: 77.1901, status: "Yellow", p: 0.45 },
  { id: 10, nodeId: "284510", name: "Moolchand", lat: 28.5645, lng: 77.2340, status: "Green", p: 0.20 },
  { id: 11, nodeId: "284511", name: "Raja Garden", lat: 28.6433, lng: 77.1207, status: "Red", p: 0.78 },
  { id: 12, nodeId: "284512", name: "Akshardham", lat: 28.6186, lng: 77.2769, status: "Green", p: 0.15 },
];
