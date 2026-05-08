import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Minus, Crosshair, Trash2, MapPin, SlidersHorizontal } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet icon fix (using Vite-compatible import format)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Child component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

// Child component to expose map instance for zoom controls
const MapController = ({ onMapReady }) => {
  const map = useMap();
  React.useEffect(() => {
    if (map) onMapReady(map);
  }, [map, onMapReady]);
  return null;
};

// Helper to get color based on score
const getScoreColor = (score) => {
  if (score >= 90) return '#0F2F20'; // Excellent - Deep Green
  if (score >= 75) return '#11B573'; // Very Good - Emerald
  if (score >= 60) return '#fbbf24'; // Good - Amber
  if (score >= 40) return '#f97316'; // Average - Orange
  return '#ef4444'; // Below Average - Red
};

// Create custom div icon for neighborhood scores
const createCustomIcon = (score, name) => {
  const color = getScoreColor(score);
  return L.divIcon({
    className: 'custom-score-marker',
    html: `
      <div style="position: absolute; left: 0; top: 0;">
        <div style="position: absolute; left: 0; top: 0; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; cursor: pointer; padding-bottom: 2px;">
          <div style="width: 34px; height: 34px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; position: relative; z-index: 10;">
            ${score}
          </div>
          <div style="width: 10px; height: 10px; background: ${color}; transform: rotate(45deg); margin-top: -6px; z-index: 0;"></div>
        </div>
        <div style="position: absolute; left: 0; top: 4px; transform: translateX(-50%); padding: 2px 10px; background: white; border-radius: 20px; font-size: 11px; font-weight: 700; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: 1px solid #f1f5f9; white-space: nowrap; text-align: center;">
          ${name}
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// Create a user-placed pin icon (red)
const userPinIcon = L.divIcon({
  className: 'user-pin-marker',
  html: `
    <div style="position: absolute; left: 0; top: 0;">
      <div style="position: absolute; left: 0; top: 0; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center;">
        <div style="width: 28px; height: 28px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px rgba(239,68,68,0.4); border: 2px solid white; position: relative; z-index: 10;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div style="width: 8px; height: 8px; background: #ef4444; transform: rotate(45deg); margin-top: -5px; z-index: 0;"></div>
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const MapNeighborhoodCard = ({ neighborhood, isActive }) => {
  return (
    <div className={`flex items-center p-3 rounded-2xl bg-white transition-all cursor-pointer ${
      isActive ? 'border-2 border-[#11B573] shadow-md' : 'border border-slate-100 hover:border-[#11B573]/50 hover:shadow-sm'
    }`}>
      <img src={neighborhood.image} alt={neighborhood.name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="ml-4 flex-grow">
        {neighborhood.tags && neighborhood.tags[0] && (
          <span className="inline-block px-2 py-0.5 bg-emerald-50 text-[#11B573] text-[9px] font-bold uppercase tracking-wider rounded-md mb-1">
            {neighborhood.tags[0]}
          </span>
        )}
        <h4 className="font-bold text-slate-900 text-[17px] leading-tight mb-0.5">{neighborhood.name}</h4>
        <p className="text-slate-500 text-xs">{neighborhood.location.split(',')[0]}</p>
      </div>
      <div className="ml-4 w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: getScoreColor(neighborhood.score) }}>
        <span className="text-white font-bold text-sm">{neighborhood.score}</span>
      </div>
    </div>
  );
};

const ExploreMap = ({ neighborhoods, focusLocation }) => {
  const mapCenter = [19.0760, 72.8777];
  const [mapInstance, setMapInstance] = React.useState(null);
  const [userMarkers, setUserMarkers] = React.useState([]);

  const handleMapReady = React.useCallback((map) => {
    setMapInstance(map);
  }, []);

  // Fly to focusLocation when it changes
  React.useEffect(() => {
    if (mapInstance && focusLocation) {
      mapInstance.flyTo([focusLocation.lat, focusLocation.lng], focusLocation.zoom || 14, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
  }, [mapInstance, focusLocation]);

  const handleZoomIn = () => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleRecenter = () => {
    if (mapInstance) mapInstance.setView(mapCenter, 11);
  };

  const handleMapClick = (latlng) => {
    setUserMarkers((prev) => [...prev, latlng]);
  };

  const handleRemoveMarker = (idx) => {
    setUserMarkers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearAllMarkers = () => {
    setUserMarkers([]);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 h-[calc(100vh-140px)] md:h-[calc(100vh-140px)] min-h-[550px] md:min-h-[750px]">
      
      {/* Mobile Map Header */}
      <div className="lg:hidden flex items-center justify-between mb-4 px-2">
        <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Explore on Map</h2>
        <button className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 active:scale-95 transition-transform">
          <SlidersHorizontal size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row h-full gap-6">
        
        {/* Left Side: List */}
        <div className="hidden lg:flex w-full lg:w-[35%] xl:w-[30%] flex-col h-full overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] p-6">
          <div className="mb-5 shrink-0">
            <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">Top Neighborhoods</h2>
            <p className="text-slate-500 text-sm">19,000+ neighborhoods analyzed</p>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-3 pb-4">
            {neighborhoods.map((n, idx) => (
              <MapNeighborhoodCard key={n.id} neighborhood={n} isActive={idx === 0} />
            ))}
          </div>

          {/* User Marked Locations */}
          {userMarkers.length > 0 && (
            <div className="pt-4 mt-2 shrink-0 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-500" />
                  <span className="text-xs font-bold text-slate-700">Your Pins ({userMarkers.length})</span>
                </div>
                <button 
                  onClick={handleClearAllMarkers}
                  className="text-[10px] font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={11} />
                  Clear All
                </button>
              </div>
              <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto custom-scrollbar">
                {userMarkers.map((pos, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 bg-red-50 rounded-xl text-xs">
                    <span className="text-slate-700 font-medium">📍 Pin {idx + 1}: <span className="text-slate-400">{pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}</span></span>
                    <button 
                      onClick={() => handleRemoveMarker(idx)} 
                      className="text-red-400 hover:text-red-600 transition-colors ml-2"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 mt-2 shrink-0 border-t border-slate-100 flex justify-center">
            <button className="px-6 py-2.5 border border-[#11B573] text-[#11B573] font-bold text-xs rounded-full hover:bg-[#11B573]/5 transition-colors">
              Load More Neighborhoods
            </button>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-full lg:w-[65%] xl:w-[70%] h-full relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-[#e8f0f8]">
          
          <MapContainer
            center={mapCenter}
            zoom={11}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <MapController onMapReady={handleMapReady} />
            <MapClickHandler onMapClick={handleMapClick} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* Predefined neighborhood markers */}
            {neighborhoods.map((n) => (
              n.lat && n.lng ? (
                <Marker 
                  key={n.id} 
                  position={[n.lat, n.lng]} 
                  icon={createCustomIcon(n.score, n.name)}
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <img src={n.image} alt={n.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                      <div style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '14px', color: '#1e293b' }}>{n.name}</strong>
                          <span style={{ color: '#11B573', fontWeight: 'bold', fontSize: '14px' }}>{n.score}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{n.grade} • {n.aqiStatus} AQI</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}

            {/* User-placed markers */}
            {userMarkers.map((pos, idx) => (
              <Marker key={`user-${idx}`} position={pos} icon={userPinIcon}>
                <Popup>
                  <div style={{ padding: '8px' }}>
                    <p style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '13px', margin: '0 0 4px 0' }}>📍 Your Pin #{idx + 1}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Floating hint badge */}
          <div className="hidden lg:flex absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl rounded-full px-4 py-2 shadow-md border border-white z-[20] items-center gap-2">
            <MapPin size={14} className="text-red-500" />
            <span className="text-[11px] font-bold text-slate-600">Click anywhere on the map to drop a pin</span>
          </div>
          
          {/* Floating Controls: Filter List (Top Left) - Hidden on Mobile */}
          <div className="hidden lg:flex absolute top-6 left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white flex flex-col gap-3.5 min-w-[200px] z-[20]">
            {['Show Scores', 'Tech Parks', 'Business Districts', 'Premium Areas'].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-[18px] h-[18px] rounded-[4px] bg-[#11B573] flex items-center justify-center text-white shadow-sm">
                  <Check size={12} strokeWidth={4} />
                </div>
                <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
              </label>
            ))}
            <label className="flex items-center gap-3 cursor-pointer group mt-0.5">
              <div className="w-[18px] h-[18px] rounded-[4px] border-[2px] border-slate-200 bg-white transition-colors group-hover:border-[#11B573]" />
              <span className="text-[13px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Emerging Areas</span>
            </label>
          </div>

          {/* Floating Controls: Zoom (Top Right) */}
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white flex flex-col overflow-hidden z-[20]">
            <button 
              onClick={handleZoomIn}
              className="p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-b border-slate-100 transition-colors"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={handleZoomOut}
              className="p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Minus size={18} />
            </button>
            <div className="h-px w-full bg-slate-100 my-1" />
            <button 
              onClick={handleRecenter}
              className="p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Crosshair size={18} />
            </button>
          </div>

          {/* Floating Legend (Bottom) */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:right-6 lg:left-auto bg-white/95 backdrop-blur-xl rounded-2xl p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white z-[20]">
            <h4 className="font-bold text-slate-900 text-[12px] lg:text-[13px] mb-3 lg:mb-4 tracking-tight">Score Range</h4>
            
            {/* Desktop Legend (Vertical) */}
            <div className="hidden lg:flex flex-col gap-3">
              {[
                { range: '90-100', label: 'Excellent', color: 'bg-[#0F2F20]' },
                { range: '75-89', label: 'Very Good', color: 'bg-[#11B573]' },
                { range: '60-74', label: 'Good', color: 'bg-amber-400' },
                { range: '40-59', label: 'Average', color: 'bg-orange-500' },
                { range: '0-39', label: 'Below Average', color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                  <span className="text-xs font-bold text-slate-700 w-12">{item.range}</span>
                  <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile Legend (Horizontal + Hint) */}
            <div className="lg:hidden flex flex-col">
              <div className="flex items-center justify-between">
                {[
                  { range: '90-100', label: 'Excellent', color: 'bg-[#0F2F20]' },
                  { range: '75-89', label: 'Very Good', color: 'bg-[#11B573]' },
                  { range: '60-74', label: 'Good', color: 'bg-amber-400' },
                  { range: '40-59', label: 'Average', color: 'bg-orange-500' },
                  { range: '0-39', label: 'Below Avg', color: 'bg-red-500' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${item.color} shadow-sm`} />
                      <span className="text-[10px] font-bold text-slate-700 leading-none">{item.range}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium leading-none">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-center gap-2">
                <MapPin size={12} className="text-red-500" />
                <span className="text-[10px] font-medium text-slate-600">Tap anywhere on the map to see details</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreMap;
