import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Sparkles, Filter, X, ArrowRight, 
  Compass, Search, Volume2, ShieldCheck, Navigation, 
  Layers, Eye, Route, ChevronRight
} from 'lucide-react';
import { TAMIL_NADU_DESTINATIONS } from '../data/tamilNaduData';
import { Destination } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

type MapStyle = 'dark' | 'streets' | 'satellite';

export const SmartMapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  const [mapStyle, setMapStyle] = useState<MapStyle>('dark');
  const [showHeritageTrail, setShowHeritageTrail] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(TAMIL_NADU_DESTINATIONS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const categories = ['All', 'Heritage', 'Temples', 'Beaches', 'Hill Station', 'Culture', 'Nature', 'Village Experiences'];

  const filteredDestinations = TAMIL_NADU_DESTINATIONS.filter((d) => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get tile URL based on chosen style
  const getTileUrl = (style: MapStyle) => {
    if (MAPBOX_TOKEN) {
      const styleId =
        style === 'dark'
          ? 'mapbox/dark-v11'
          : style === 'satellite'
          ? 'mapbox/satellite-streets-v12'
          : 'mapbox/outdoors-v12';

      return `https://api.mapbox.com/styles/v1/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`;
    }
    // Fallback standard OpenStreetMap
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [11.1271, 78.6569], // Central Tamil Nadu
        zoom: 7,
        minZoom: 6,
        maxZoom: 18,
        zoomControl: false, // We'll add custom positioned zoom control
        scrollWheelZoom: true,
      });

      // Position zoom controls in top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add Mapbox Tile Layer
      const tileLayer = L.tileLayer(getTileUrl('dark'), {
        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: 0,
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;

      // Invalidate size to guarantee tile rendering without grey gaps
      setTimeout(() => map.invalidateSize(), 150);
      setTimeout(() => map.invalidateSize(), 500);
    }

    const map = mapInstanceRef.current;
    const handleResize = () => {
      if (map) map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update Tile Layer when mapStyle changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(getTileUrl(mapStyle), {
      attribution: '&copy; Mapbox &copy; OpenStreetMap | OorTrip AI',
      maxZoom: 19,
      tileSize: 256,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [mapStyle]);

  // Update Markers & Heritage Corridor
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Marker styling helper
    const createCustomIcon = (dest: Destination, isSelected: boolean) => {
      const crowdColor = dest.crowdLevel === 'LOW' ? '#10B981' : dest.crowdLevel === 'HIGH' ? '#EF4444' : '#F59E0B';
      const borderColor = isSelected ? '#D35B2D' : '#ffffff40';
      const scale = isSelected ? 'scale(1.15)' : 'scale(1)';
      const zIndex = isSelected ? '999' : '1';

      return L.divIcon({
        className: 'custom-map-marker-container',
        html: `
          <div style="
            background: #171B21;
            border: 2px solid ${borderColor};
            box-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 0 12px ${isSelected ? 'rgba(211,91,45,0.7)' : 'transparent'};
            border-radius: 9999px;
            padding: 5px 10px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transform: ${scale};
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: ${zIndex};
            white-space: nowrap;
          ">
            <span style="width: 8px; height: 8px; border-radius: 9999px; background: ${crowdColor}; box-shadow: 0 0 6px ${crowdColor};"></span>
            <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 700; color: #ffffff;">
              ${dest.name}
            </span>
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16],
      });
    };

    // Add updated markers
    filteredDestinations.forEach((dest) => {
      const isSelected = selectedDestination?.id === dest.id;
      const marker = L.marker(dest.coordinates, {
        icon: createCustomIcon(dest, isSelected),
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      marker.on('click', () => {
        setSelectedDestination(dest);
        map.flyTo(dest.coordinates, 10, { duration: 1.2 });
      });

      markersRef.current[dest.id] = marker;
    });

    // Render Heritage Corridor Polyline
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    if (showHeritageTrail) {
      // Connect iconic corridor: Chennai -> Mahabalipuram -> Kanchipuram -> Thanjavur -> Trichy -> Madurai -> Rameswaram -> Kanyakumari
      const corridorIds = ['chennai', 'mahabalipuram', 'kanchipuram', 'thanjavur', 'trichy', 'madurai', 'rameswaram', 'kanyakumari'];
      const corridorCoords = corridorIds
        .map((id) => TAMIL_NADU_DESTINATIONS.find((d) => d.id === id)?.coordinates)
        .filter((c): c is [number, number] => c !== undefined);

      if (corridorCoords.length > 1) {
        polylineRef.current = L.polyline(corridorCoords, {
          color: '#D35B2D',
          weight: 3,
          opacity: 0.85,
          dashArray: '8, 8',
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map);
      }
    }

  }, [filteredDestinations, selectedDestination, showHeritageTrail]);

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(dest.coordinates, 10, { duration: 1.2 });
    }
  };

  const handleResetMap = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([11.1271, 78.6569], 7, { duration: 1.2 });
      setSelectedDestination(null);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-charcoal-950 flex flex-col md:flex-row">
      
      {/* Left Collapsible Destination Explorer Panel */}
      <div
        className={`absolute md:relative z-20 top-0 left-0 h-full w-full md:w-96 bg-charcoal-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-terracotta-400" />
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                Smart Tamil Nadu Map
              </h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg bg-charcoal-800 text-warmwhite-300 hover:text-white md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-warmwhite-300/50" />
            <input
              type="text"
              placeholder="Search temple, hill station, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-charcoal-800/80 border border-white/10 text-xs text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-charcoal-800/60 text-warmwhite-300/80 hover:text-white hover:bg-charcoal-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Destination List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
          <div className="flex items-center justify-between px-1 text-[11px] text-warmwhite-300/60 font-medium">
            <span>Showing {filteredDestinations.length} destinations</span>
            <button
              onClick={handleResetMap}
              className="text-terracotta-400 hover:text-terracotta-300 font-semibold flex items-center gap-1"
            >
              <Navigation className="w-3 h-3" />
              <span>Reset View</span>
            </button>
          </div>

          {filteredDestinations.map((dest) => {
            const isSelected = selectedDestination?.id === dest.id;
            const crowdColor = dest.crowdLevel === 'LOW' ? 'text-emerald-400' : dest.crowdLevel === 'HIGH' ? 'text-rose-400' : 'text-amber-400';

            return (
              <div
                key={dest.id}
                onClick={() => handleSelectDestination(dest)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-charcoal-800 border-terracotta-500 shadow-depth-sm'
                    : 'bg-charcoal-850/50 border-white/5 hover:border-white/15 hover:bg-charcoal-800/60'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-charcoal-800">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    category={dest.category}
                    label={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif text-sm font-bold text-white truncate">{dest.name}</h4>
                    <span className="flex items-center gap-0.5 text-amber-400 text-xs font-semibold flex-shrink-0">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{dest.rating}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-warmwhite-300/60 truncate">{dest.district} • {dest.category}</p>
                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="text-warmwhite-200 font-medium">₹{dest.estimatedCost} avg</span>
                    <span className={`font-semibold uppercase ${crowdColor}`}>{dest.crowdLevel} CROWD</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Footer */}
        <div className="p-3 border-t border-white/10 bg-charcoal-900/90 text-center">
          <Link
            to="/planner"
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Custom Route</span>
          </Link>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="relative flex-1 w-full h-full">
        
        {/* Mobile Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-20 md:hidden p-2.5 rounded-xl bg-charcoal-900/90 border border-white/15 text-white shadow-depth-md flex items-center gap-2 text-xs font-bold"
          >
            <Compass className="w-4 h-4 text-terracotta-400" />
            <span>Browse Places</span>
          </button>
        )}

        {/* Top Controls: Mapbox Style Switcher & Heritage Trail Toggle */}
        <div className="absolute top-4 right-14 z-20 flex flex-wrap items-center gap-2">
          
          {/* Mapbox Layer Switcher */}
          <div className="flex items-center rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-white/15 p-1 shadow-depth-sm text-xs">
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                mapStyle === 'dark' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-warmwhite-300 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                mapStyle === 'streets' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-warmwhite-300 hover:text-white'
              }`}
            >
              Outdoors
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                mapStyle === 'satellite' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-warmwhite-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Heritage Trail Polyline Toggle */}
          <button
            onClick={() => setShowHeritageTrail(!showHeritageTrail)}
            className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold shadow-depth-sm flex items-center gap-1.5 transition-all ${
              showHeritageTrail
                ? 'bg-charcoal-900/90 text-terracotta-300 border-terracotta-500/50'
                : 'bg-charcoal-900/80 text-warmwhite-300/70 border-white/10 hover:text-white'
            }`}
          >
            <Route className="w-3.5 h-3.5 text-terracotta-400" />
            <span>{showHeritageTrail ? 'Heritage Trail ON' : 'Show Trail'}</span>
          </button>

          {/* Map Reset */}
          <button
            onClick={handleResetMap}
            className="px-3 py-1.5 rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-white/15 text-warmwhite-200 hover:text-white text-xs font-semibold shadow-depth-sm flex items-center gap-1.5 transition-all"
          >
            <Navigation className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Reset</span>
          </button>
        </div>

        {/* Mapbox Engine & Live Status Pill */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-white/10 text-xs text-warmwhite-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mapbox HD Vector Tiles • <strong className="text-terracotta-400 font-mono">TAMIL NADU LIVE COORDINATES</strong></span>
        </div>

        {/* Leaflet 2D Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full z-0"
          style={{ background: '#0B0D10' }}
        />

        {/* Floating Selected Destination Details Flyout Card */}
        {selectedDestination && (
          <div className="absolute bottom-4 left-4 right-4 md:bottom-auto md:top-16 md:right-4 md:left-auto md:w-96 z-20 animate-in slide-in-from-right duration-200">
            <div className="rounded-3xl bg-charcoal-900/95 backdrop-blur-2xl border border-white/20 p-4 shadow-depth-3d space-y-4">
              
              {/* Header image */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-charcoal-800">
                <ImageWithFallback
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  category={selectedDestination.category}
                  label={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />

                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-charcoal-950/70 text-warmwhite-200 hover:text-white transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-terracotta-400" />
                  <span>{selectedDestination.district}</span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
                  <span className="text-[10px] uppercase font-bold text-sand-300 tracking-wider">
                    {selectedDestination.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {selectedDestination.name}
                  </h3>
                  <p className="text-[11px] text-warmwhite-300/80 italic line-clamp-1">
                    "{selectedDestination.tagline}"
                  </p>
                </div>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-white/10">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>★ {selectedDestination.rating}</span>
                  <span className="text-[10px] text-warmwhite-300/60 font-normal">({selectedDestination.reviewCount})</span>
                </div>
                <div className="text-right text-warmwhite-200 font-medium">
                  <span className="text-white font-semibold">₹{selectedDestination.estimatedCost}</span>
                  <span className="text-[10px] text-warmwhite-300/60 ml-1">avg</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-warmwhite-300/70">
                  <Clock className="w-3 h-3 text-terracotta-400" />
                  <span>{selectedDestination.duration}</span>
                </div>
                <div className="text-right text-[11px] font-bold">
                  <span className={selectedDestination.crowdLevel === 'LOW' ? 'text-emerald-400' : selectedDestination.crowdLevel === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}>
                    {selectedDestination.crowdLevel} CROWD
                  </span>
                </div>
              </div>

              <p className="text-xs text-warmwhite-300/80 line-clamp-2 leading-relaxed">
                {selectedDestination.description}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to={`/planner?dest=${selectedDestination.id}`}
                  className="py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-100 font-semibold text-xs text-center border border-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>Plan Trip</span>
                </Link>

                <Link
                  to={`/destinations/${selectedDestination.id}`}
                  className="py-2.5 px-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Explore Place</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
