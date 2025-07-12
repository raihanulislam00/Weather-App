import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Custom SVG marker icon as a data URI
const customMarkerSvg = encodeURI(
  `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <circle cx="20" cy="20" r="14" fill="#2563eb" stroke="white" stroke-width="4" filter="url(#shadow)"/>
    <circle cx="20" cy="20" r="6" fill="white"/>
  </svg>`
);

const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${customMarkerSvg}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'weather-map-marker',
});

interface WeatherMapProps {
  lat: number;
  lon: number;
  locationName?: string;
}

// Custom label above marker
function MarkerLabel({ text }: { text: string }) {
  return (
    <div className="weather-map-marker-label">
      <span>{text}</span>
    </div>
  );
}

// Animate map container on mount
function AnimatedMapContainer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .weather-map-animate {
        opacity: 0;
        transform: translateY(30px) scale(0.98);
        animation: map-fade-in 0.8s cubic-bezier(.4,1.4,.6,1) 0.1s forwards;
      }
      @keyframes map-fade-in {
        to { opacity: 1; transform: none; }
      }
      .weather-map-marker {
        animation: marker-pulse 1.5s infinite;
      }
      @keyframes marker-pulse {
        0% { transform: scale(1); filter: drop-shadow(0 2px 8px #2563eb44); }
        50% { transform: scale(1.08); filter: drop-shadow(0 4px 16px #2563eb66); }
        100% { transform: scale(1); filter: drop-shadow(0 2px 8px #2563eb44); }
      }
      .weather-map-glass {
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: 1rem;
        background: linear-gradient(120deg,rgba(255,255,255,0.18) 60%,rgba(37,99,235,0.08) 100%);
        backdrop-filter: blur(2px);
        z-index: 400;
      }
      .weather-map-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 500;
        background: rgba(255,255,255,0.85);
        color: #2563eb;
        font-weight: 600;
        font-size: 1rem;
        padding: 0.5rem 1.1rem;
        border-radius: 999px;
        box-shadow: 0 2px 12px 0 rgba(37,99,235,0.08);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1.5px solid #2563eb22;
      }
      .leaflet-control-zoom {
        display: none !important;
      }
      .weather-map-marker-label {
        position: absolute;
        left: 50%;
        top: calc(50% - 48px);
        transform: translate(-50%, -100%);
        z-index: 600;
        background: rgba(255,255,255,0.95);
        color: #2563eb;
        font-weight: 600;
        font-size: 1rem;
        padding: 0.25rem 0.9rem;
        border-radius: 999px;
        box-shadow: 0 2px 12px 0 rgba(37,99,235,0.08);
        border: 1.5px solid #2563eb22;
        pointer-events: none;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return <div className="weather-map-animate relative h-full w-full">{children}</div>;
}

function WeatherMap({ lat, lon, locationName }: WeatherMapProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/50 shadow-md h-64 w-full relative">
      <AnimatedMapContainer>
        {/* Floating badge */}
        {locationName && (
          <div className="weather-map-badge">
            <svg width="18" height="18" fill="#2563eb" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {locationName}
          </div>
        )}
        {/* Glass overlay */}
        <div className="weather-map-glass" />
        <MapContainer center={[lat, lon]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} zoomControl={false} dragging={true} doubleClickZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>
              {locationName ? <span>{locationName}</span> : <span>Current Location</span>}
            </Popup>
          </Marker>
        </MapContainer>
      </AnimatedMapContainer>
    </div>
  );
}

export default WeatherMap; 