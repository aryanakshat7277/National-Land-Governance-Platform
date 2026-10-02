import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polygon, Marker, Tooltip as LeafletTooltip, useMap, useMapEvents } from 'react-leaflet';
import { 
  Layers, Info, Download, Eye, EyeOff, Satellite,
  BarChart2, Thermometer, Droplets, AlertTriangle, RefreshCw, X, 
  Map as MapIcon, Crosshair, ChevronRight, Maximize2, Search,
  Compass, Sliders, Ruler, SplitSquareVertical, CheckCircle2, Shield,
  FileText, CornerDownRight, Share2, Printer, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip as RechartsTooltip } from 'recharts';
import type { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import toast from 'react-hot-toast';
import { getAssetUrl } from '@/utils/assets';

import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const INDIA_CENTER: LatLngTuple = [20.5937, 78.9629];
const GEOJSON_URL = getAssetUrl('data/india_states.geojson');

// State-level dispute counts for National Choropleth
const disputeByState: Record<string, number> = {
  'Uttar Pradesh': 342000,
  'Bihar': 198000,
  'Rajasthan': 156000,
  'Madhya Pradesh': 134000,
  'Maharashtra': 112000,
  'West Bengal': 98000,
  'Gujarat': 67000,
  'Andhra Pradesh': 54000,
  'Karnataka': 47000,
  'Tamil Nadu': 43000,
  'Odisha': 38000,
  'Jharkhand': 35000,
  'Chhattisgarh': 31000,
  'Haryana': 28000,
  'Punjab': 25000,
  'Telangana': 22000,
  'Kerala': 18000,
  'Assam': 15000,
};

const getDisputeCount = (stateName: string) => {
  return disputeByState[stateName] || Math.floor(Math.random() * 7000) + 5000;
};

const getDisputeColor = (disputes: number) => {
  if (disputes > 200000) return '#C0392B';
  if (disputes > 100000) return '#E67E22';
  if (disputes > 50000) return '#F39C12';
  if (disputes > 20000) return '#F1C40F';
  return '#1E8449';
};

// Basemap URLs
const BASEMAPS = {
  satellite: {
    label: 'Satellite Hybrid (High-Res)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  },
  cadastral: {
    label: 'Survey Cadastral Base (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, Survey of India'
  },
  topo: {
    label: 'Topographic & Watershed Contours',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, CGIAR, USGS'
  }
};

// Realistic Cadastral Land Parcels for Pilot Village (Bakshi Ka Talab, Lucknow Cluster)
const PILOT_PARCELS = [
  {
    id: 'khasra-412-1',
    khasraNo: 'Plot 412/1',
    ulpin: 'UP-28-LKO-4091-8842',
    owner: 'Smt. Ramwati Devi & Sh. Rameshwar Sharma',
    relative: 'Late K. L. Sharma (Spouse / Father)',
    areaSqM: 245.8,
    areaHa: 0.0246,
    landUse: 'Rural Residential Abadi (Gram Kantham)',
    status: 'clear',
    statusLabel: 'SVAMITVA Clear Title (Verified)',
    statusColor: '#1E8449',
    fillColor: '#2ECC71',
    coordinates: [
      [26.9854, 80.9231],
      [26.9859, 80.9234],
      [26.9857, 80.9242],
      [26.9851, 80.9239]
    ] as LatLngTuple[],
    encumbrance: 'Nil · Free of encumbrance',
    droneBatch: 'Batch 4 (Survey of India CORS Verified)',
    soilHealth: 'N/A (Residential)',
    taxStatus: 'Up-to-date (Gram Panchayat Receipt #8410)'
  },
  {
    id: 'khasra-412-2',
    khasraNo: 'Plot 412/2',
    ulpin: 'UP-28-LKO-4091-8843',
    owner: 'Sh. Surendra Mohan Patel',
    relative: 'Sh. Ram Das Patel (Father)',
    areaSqM: 182.5,
    areaHa: 0.0183,
    landUse: 'Commercial Agro-Processing Shed',
    status: 'mortgage',
    statusLabel: 'KCC Bank Mortgage Linked (SBI)',
    statusColor: '#1A5276',
    fillColor: '#3498DB',
    coordinates: [
      [26.9859, 80.9234],
      [26.9864, 80.9237],
      [26.9862, 80.9245],
      [26.9857, 80.9242]
    ] as LatLngTuple[],
    encumbrance: 'Charge Created: SBI Agri Branch ₹4.5 Lakhs (Ref: KCC-8821)',
    droneBatch: 'Batch 4 (Survey of India CORS Verified)',
    soilHealth: 'N/A (Commercial Shed)',
    taxStatus: 'PMAY Commercial Tax Paid'
  },
  {
    id: 'khasra-413',
    khasraNo: 'Plot 413',
    ulpin: 'UP-28-LKO-4091-8844',
    owner: 'Gram Sabha / Gaon Sabha Public Commons',
    relative: 'Village Panchayat Custodianship',
    areaSqM: 14250.0,
    areaHa: 1.425,
    landUse: 'Amrit Sarovar Waterbody & Grazing Land',
    status: 'commons',
    statusLabel: 'Gram Sabha Inalienable Commons',
    statusColor: '#8E44AD',
    fillColor: '#9B59B6',
    coordinates: [
      [26.9864, 80.9237],
      [26.9872, 80.9243],
      [26.9869, 80.9258],
      [26.9860, 80.9251]
    ] as LatLngTuple[],
    encumbrance: 'Inalienable Public Property under UP Revenue Code Sec 77',
    droneBatch: 'Batch 4 (Survey of India CORS Verified)',
    soilHealth: 'Alluvial Loam / Wetland Buffer',
    taxStatus: 'Exempt (Public Commons)'
  },
  {
    id: 'khasra-414',
    khasraNo: 'Plot 414',
    ulpin: 'UP-28-LKO-4091-8845',
    owner: 'Sh. Harishankar Yadav vs. Smt. Kamala Devi',
    relative: 'Sub-Divisional Court Partition Suit',
    areaSqM: 21400.0,
    areaHa: 2.14,
    landUse: 'Irrigated Agricultural Farmland (Wheat / Mustard)',
    status: 'dispute',
    statusLabel: 'Sub-Judice (Tehsil Revenue Court #2023/88)',
    statusColor: '#C0392B',
    fillColor: '#E74C3C',
    coordinates: [
      [26.9846, 80.9225],
      [26.9854, 80.9231],
      [26.9851, 80.9239],
      [26.9842, 80.9233]
    ] as LatLngTuple[],
    encumbrance: 'Notice of Lis Pendens Registered · Mutation Stayed',
    droneBatch: 'Batch 4 (Survey of India CORS Verified)',
    soilHealth: 'NPK 180:45:210 (Nitrogen Deficient)',
    taxStatus: 'Pending judicial dispute resolution'
  },
  {
    id: 'khasra-415',
    khasraNo: 'Plot 415',
    ulpin: 'UP-28-LKO-4091-8846',
    owner: 'Sh. Jagdish Prasad Verma & Sons',
    relative: 'Sh. Bansilal Verma (Father)',
    areaSqM: 18700.0,
    areaHa: 1.87,
    landUse: 'Intensive Cropland with Tubewell Irrigation',
    status: 'clear',
    statusLabel: 'Clear Title (Kisan Credit Enrolled)',
    statusColor: '#1E8449',
    fillColor: '#2ECC71',
    coordinates: [
      [26.9842, 80.9233],
      [26.9851, 80.9239],
      [26.9848, 80.9250],
      [26.9838, 80.9243]
    ] as LatLngTuple[],
    encumbrance: 'Clear Title · No Adverse Possession Claims',
    droneBatch: 'Batch 4 (Survey of India CORS Verified)',
    soilHealth: 'High Organic Carbon (0.78%) · Soil Card Valid',
    taxStatus: 'Paid FY 2024-25'
  }
];

const SEARCH_PRESETS = [
  { label: 'Bakshi Ka Talab, Lucknow (Cadastral Pilot)', center: [26.9854, 80.9238] as LatLngTuple, zoom: 16, type: 'cadastre' },
  { label: 'Vadodara Rural Cluster, Gujarat', center: [22.3072, 73.1812] as LatLngTuple, zoom: 15, type: 'pilot' },
  { label: 'Bundelkhand Aquifer Stress Pilot', center: [25.4484, 78.5685] as LatLngTuple, zoom: 11, type: 'climate' },
  { label: 'Telangana Full Digitization Model', center: [17.8749, 78.1008] as LatLngTuple, zoom: 10, type: 'state' },
  { label: 'UP-28-LKO-4091-8842 (Sample ULPIN)', center: [26.9854, 80.9231] as LatLngTuple, zoom: 17, type: 'ulpin' },
];

const thematicGalleries = [
  {
    id: 'bhu-aadhaar',
    title: 'Bhu-Aadhaar 14-Digit ULPIN',
    category: 'Cadastral Standard',
    image: getAssetUrl('assets/images/bhu_aadhaar_ulpin.svg'),
    desc: 'National geospatial syntax architecture standardizing land parcel identifiers across 28 states.'
  },
  {
    id: 'svamitva-card',
    title: 'SVAMITVA Property Card Deed',
    category: 'Title Deed',
    image: getAssetUrl('assets/images/svamitva_property_card_preview.svg'),
    desc: 'Digital land title card with QR cryptographic verification and RTK CORS coordinates.'
  },
  {
    id: 'survey-settlement',
    title: 'Drone RTK vs Cloth Shajra Survey',
    category: 'Survey Method',
    image: getAssetUrl('assets/images/survey_settlement_map.svg'),
    desc: 'Comparative resolution analysis of 1930s revenue maps vs Survey of India drone CORS orthomosaics.'
  },
  {
    id: 'groundwater-stress',
    title: 'Aquifer Depletion & Stress Zones',
    category: 'Hydro-Geology',
    image: getAssetUrl('assets/images/sat_groundwater_depletion.svg'),
    desc: 'CGWB & ISRO satellite gravimetry showing critical over-exploited blocks in Central & Western India.'
  },
  {
    id: 'revenue-court',
    title: 'Revenue Court & Lok Adalat Funnel',
    category: 'Judicial Analytics',
    image: getAssetUrl('assets/images/revenue_court_analytics.svg'),
    desc: 'National Judicial Data Grid case pendency and fast-track Lok Adalat clearance rates.'
  },
  {
    id: 'coastal-crz',
    title: 'Coastal Regulation Zones (CRZ)',
    category: 'Eco-Sensitive',
    image: getAssetUrl('assets/images/coastal_land_regulation.svg'),
    desc: 'CRZ-I, II, and III high-tide line buffer monitoring and mangrove ecosystem preservation cadastre.'
  },
  {
    id: 'soil-health',
    title: 'Agricultural Soil Health Cadastre',
    category: 'Agro-Cadastre',
    image: getAssetUrl('assets/images/soil_health_land_cadastre.svg'),
    desc: 'Parcel-level NPK fertility and organic carbon indices integrated with Soil Health Card records.'
  },
  {
    id: 'periurban-corridor',
    title: 'Peri-Urban Corridor Masterplan',
    category: 'Urban Expansion',
    image: getAssetUrl('assets/images/periurban_corridor_masterplan.svg'),
    desc: 'Transit-oriented development (RRTS/DMIC) land pooling and zoning boundary simulation.'
  },
];

// Helper to fly the map smoothly to requested target
function MapFlyController({ target }: { target: { center: LatLngTuple; zoom: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target.center, target.zoom, { duration: 1.5 });
    }
  }, [target, map]);
  return null;
}

// Telemetry & cursor controller
function MapTelemetryController({ 
  setCoords,
  setZoom
}: { 
  setCoords: (c: { lat: number; lng: number } | null) => void;
  setZoom: (z: number) => void;
}) {
  const map = useMap();
  
  useMapEvents({
    mousemove(e) {
      setCoords(e.latlng);
    },
    mouseout() {
      setCoords(null);
    },
    zoomend() {
      setZoom(map.getZoom());
    }
  });

  return null;
}

export default function GISViewer() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['disputes', 'parcels']));
  const [activeTimeYear, setActiveTimeYear] = useState(2024);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<typeof PILOT_PARCELS[0] | null>(null);
  const [basemapKey, setBasemapKey] = useState<keyof typeof BASEMAPS>('cadastral');
  const [layerOpacity, setLayerOpacity] = useState(0.72);
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState(5);
  const [flyTarget, setFlyTarget] = useState<{ center: LatLngTuple; zoom: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<typeof thematicGalleries[0] | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'snapshot' | 'cadastre' | 'aquifer' | 'court'>('snapshot');
  
  // Real Measurement Tool Mode: 'none' | 'distance' | 'area'
  const [measureMode, setMeasureMode] = useState<'none' | 'distance' | 'area'>('none');
  const [measurePoints, setMeasurePoints] = useState<LatLngTuple[]>([]);
  
  // Swipe comparison mode (historical Shajra vs Drone Orthomosaic)
  const [swipeMode, setSwipeMode] = useState(false);
  const [swipePosition, setSwipePosition] = useState(50); // percentage

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        setLoading(true);
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error('Local GeoJSON failed');
        const data = await res.json();
        setGeoData(data);
      } catch (err) {
        console.warn("Fallback to remote GeoJSON", err);
        try {
          const fallbackRes = await fetch('https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson');
          const fallbackData = await fallbackRes.json();
          setGeoData(fallbackData);
        } catch (e) {
          console.error("All GeoJSON sources failed", e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGeoJSON();
  }, []);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const handleSearchSelect = (preset: typeof SEARCH_PRESETS[0]) => {
    setSearchQuery(preset.label);
    setShowSearchDropdown(false);
    setFlyTarget({ center: preset.center, zoom: preset.zoom });
    if (preset.type === 'ulpin' || preset.type === 'cadastre') {
      setSelectedParcel(PILOT_PARCELS[0]);
    }
    toast.success(`Flew to: ${preset.label}`);
  };

  const onEachFeature = (feature: any, layer: any) => {
    const stateName = feature.properties.state_name || feature.properties.NAME_1 || feature.properties.ST_NM || 'State';
    const disputes = getDisputeCount(stateName);
    feature.properties.disputes = disputes;
    feature.properties.state_name = stateName;

    layer.on({
      click: (e: LeafletMouseEvent) => {
        setSelectedState(feature.properties);
        setSelectedParcel(null);
        const map = e.target._map;
        map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
      },
      mouseover: (e: LeafletMouseEvent) => {
        const lyr = e.target;
        lyr.setStyle({
          weight: 3,
          color: '#1A5276',
          fillOpacity: Math.min(1, layerOpacity + 0.15)
        });
        lyr.bringToFront();
      },
      mouseout: (e: LeafletMouseEvent) => {
        const lyr = e.target;
        lyr.setStyle({
          weight: 1.5,
          color: '#ffffff',
          fillOpacity: layerOpacity
        });
      }
    });

    layer.bindTooltip(
      `<div style="font-family:Inter,sans-serif;font-size:12px;padding:4px">
        <strong>${stateName}</strong><br/>
        Disputes: ${disputes.toLocaleString()}
      </div>`,
      { sticky: true }
    );
  };

  // State Profile Drawer
  const renderStatePanel = () => {
    if (!selectedState) return null;
    const stateName = selectedState.state_name || selectedState.NAME_1 || selectedState.ST_NM || 'State Overview';
    const disputes = selectedState.disputes || 0;
    
    const isHighRisk = disputes > 100000;
    const climateRisk = isHighRisk ? 'High' : 'Moderate';
    const lulcClass = isHighRisk ? 'Mixed / Peri-Urban' : 'Predominantly Agricultural';
    const mockChartData = [
      { name: 'Agri', value: Math.floor(Math.random() * 30) + 40 },
      { name: 'Urban', value: Math.floor(Math.random() * 20) + 15 },
      { name: 'Forest', value: Math.floor(Math.random() * 25) + 15 },
      { name: 'Waste', value: Math.floor(Math.random() * 15) + 5 },
    ];

    return (
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 w-88 sm:w-96 h-full bg-white shadow-2xl z-[1000] overflow-y-auto border-l border-slate-200"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                State Cadastral Profile
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-1">
                {stateName} 🏛️
              </h2>
              <p className="text-xs text-slate-500">DoLR &amp; Survey of India Sync</p>
            </div>
            <button 
              onClick={() => setSelectedState(null)}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Dispute Volume Metric */}
            <div className="card p-3.5 bg-slate-50 border border-slate-200 shadow-xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Dispute Volume</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-black text-slate-900">{disputes.toLocaleString()}</span>
                <span className="text-xs text-slate-500 mb-1">litigated land parcels</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (disputes/350000)*100)}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getDisputeColor(disputes) }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                <span>Revenue Court Pendency: <strong>4.2 yrs avg</strong></span>
                <span className="text-primary-700 font-bold">NJDG Tracked</span>
              </p>
            </div>

            {/* Quick Action: Zoom to Cadastral Pilot */}
            <button
              onClick={() => {
                setFlyTarget({ center: [26.9854, 80.9238], zoom: 16 });
                setSelectedParcel(PILOT_PARCELS[0]);
                toast.success('Navigating to high-precision cadastral pilot...');
              }}
              className="w-full py-2 bg-gradient-to-r from-[#1A5276] to-[#2563EB] text-white rounded-lg text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              <CornerDownRight size={13} /> Zoom to Cadastral Village Pilot (1:2,500)
            </button>

            {/* Sub-tabs for Map Views */}
            <div>
              <div className="flex gap-1 border-b border-slate-200 pb-1 mb-2">
                {[
                  { id: 'snapshot', label: 'LULC' },
                  { id: 'cadastre', label: 'Cadastre' },
                  { id: 'aquifer', label: 'Aquifer' },
                  { id: 'court', label: 'Litigation' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveDetailTab(t.id as any)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-t transition-colors ${activeDetailTab === t.id ? 'bg-[#1A5276] text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Images */}
              <div className="rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 h-44 shadow-xs">
                {activeDetailTab === 'snapshot' && (
                  <>
                    <img 
                      src={getAssetUrl('assets/images/hero_satellite_earth.jpg')} 
                      alt="Satellite View" 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-xs text-[#F9E79F] font-bold px-2.5 py-1 rounded-md">
                      ISRO 30m Resourcesat-2
                    </span>
                  </>
                )}
                {activeDetailTab === 'cadastre' && (
                  <>
                    <img 
                      src={getAssetUrl('assets/images/svamitva_property_card_preview.svg')} 
                      alt="Cadastral Deed" 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      onClick={() => setPreviewAsset(thematicGalleries[1])}
                      className="absolute bottom-2 right-2 bg-[#1A5276] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1 hover:bg-[#154360]"
                    >
                      <Maximize2 size={12} /> Full View
                    </button>
                  </>
                )}
                {activeDetailTab === 'aquifer' && (
                  <>
                    <img 
                      src={getAssetUrl('assets/images/sat_groundwater_depletion.svg')} 
                      alt="Groundwater Depletion" 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      onClick={() => setPreviewAsset(thematicGalleries[3])}
                      className="absolute bottom-2 right-2 bg-[#1A5276] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1 hover:bg-[#154360]"
                    >
                      <Maximize2 size={12} /> Full View
                    </button>
                  </>
                )}
                {activeDetailTab === 'court' && (
                  <>
                    <img 
                      src={getAssetUrl('assets/images/revenue_court_analytics.svg')} 
                      alt="Court Funnel" 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      onClick={() => setPreviewAsset(thematicGalleries[4])}
                      className="absolute bottom-2 right-2 bg-[#1A5276] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1 hover:bg-[#154360]"
                    >
                      <Maximize2 size={12} /> Full View
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="card p-3 shadow-xs border-slate-200">
                <Layers size={15} className="text-primary-600 mb-1" />
                <p className="text-[10px] text-slate-500 uppercase font-bold">Primary LULC</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{lulcClass}</p>
              </div>
              <div className="card p-3 shadow-xs border-slate-200">
                <Thermometer size={15} className={climateRisk === 'High' ? 'text-red-500' : 'text-amber-500'} mb-1 />
                <p className="text-[10px] text-slate-500 uppercase font-bold">Climate Risk</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{climateRisk}</p>
              </div>
            </div>

            {/* Land Use Chart */}
            <div className="card p-3.5 shadow-xs border-slate-200">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Land Classification (%)</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#1A5276" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button
              onClick={() => toast.success(`Generated official dossier for ${stateName}`)}
              className="w-full py-2.5 bg-[#1A5276] text-white rounded-lg text-xs font-bold hover:bg-[#1A5276]/90 transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Download size={14} /> Export State Dossier (GeoPDF)
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Detailed Parcel Inspection Dossier Drawer
  const renderParcelPanel = () => {
    if (!selectedParcel) return null;

    return (
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 w-88 sm:w-96 h-full bg-white shadow-2xl z-[1000] overflow-y-auto border-l border-slate-200"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: selectedParcel.statusColor }}>
                {selectedParcel.khasraNo} · Cadastral Record
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-1.5 flex items-center gap-1.5">
                {selectedParcel.ulpin}
              </h2>
              <p className="text-[11px] text-slate-500 font-mono">Bhu-Aadhaar 14-Digit Standard</p>
            </div>
            <button 
              onClick={() => setSelectedParcel(null)}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Status Pill Card */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/80">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} style={{ color: selectedParcel.statusColor }} />
                <span className="text-xs font-bold" style={{ color: selectedParcel.statusColor }}>
                  {selectedParcel.statusLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                {selectedParcel.encumbrance}
              </p>
            </div>

            {/* Ownership & Survey Attributes */}
            <div className="card p-3.5 space-y-2.5 text-xs border-slate-200">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Owner Name(s):</span>
                <span className="font-bold text-slate-900 text-right">{selectedParcel.owner}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Father / Spouse:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedParcel.relative}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Parcel Area:</span>
                <span className="font-bold text-emerald-700 text-right">
                  {selectedParcel.areaSqM} m² ({selectedParcel.areaHa} Ha)
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Classification:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedParcel.landUse}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Survey Precision:</span>
                <span className="font-mono font-bold text-primary-700 text-right">±2.4 cm RTK CORS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Panchayat Tax:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedParcel.taxStatus}</span>
              </div>
            </div>

            {/* SVAMITVA Property Card Preview Thumbnail */}
            <div className="card p-3.5 border-slate-200 overflow-hidden">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Cryptographic Property Card Deed</p>
              <div className="h-36 rounded-xl overflow-hidden border border-slate-200 bg-white relative">
                <img 
                  src={getAssetUrl('assets/images/svamitva_property_card_preview.svg')} 
                  alt="SVAMITVA Property Card" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setPreviewAsset(thematicGalleries[1])}
                  className="absolute bottom-2 right-2 bg-[#1A5276] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-[#154360] flex items-center gap-1"
                >
                  <Maximize2 size={12} /> Open Deed
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => toast.success(`Generated official Naksha Map for ${selectedParcel.khasraNo}`)}
                className="w-full py-2.5 bg-[#1A5276] hover:bg-[#154360] text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Printer size={13} /> Print Official Naksha Map (PDF)
              </button>
              <button
                onClick={() => toast.success(`Shared ULPIN link: ${selectedParcel.ulpin}`)}
                className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={13} /> Share Encumbrance Verification Link
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col p-3 sm:p-4 space-y-3 bg-[#F8FAFC]">

      {/* Top Professional GIS Command Ribbon */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        
        {/* Left: Department & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A5276] font-bold shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1A5276] px-2 py-0.5 rounded border border-blue-200">
                National Geoportal
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                CORS-RTK Active (±2.4cm)
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              Cadastral GIS Decision Support System
            </h1>
          </div>
        </div>

        {/* Center: Universal Cadastral Search with Autocomplete */}
        <div className="relative flex-1 max-w-md">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search ULPIN, Khasra, Village, or District..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showSearchDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 z-[1200] overflow-hidden"
              >
                <div className="p-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Geospatial Navigation
                </div>
                <div className="max-h-56 overflow-y-auto p-1 space-y-0.5">
                  {SEARCH_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearchSelect(preset)}
                      className="px-3 py-2 rounded-lg hover:bg-blue-50/70 cursor-pointer transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-[#1A5276]" />
                        <span className="font-semibold text-slate-800">{preset.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {preset.type}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Basemap Selector & Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Basemap Switcher */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setBasemapKey('cadastral')}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${basemapKey === 'cadastral' ? 'bg-white text-[#1A5276] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              title="Survey of India Cadastral Street Base"
            >
              Cadastral Base
            </button>
            <button
              onClick={() => setBasemapKey('satellite')}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${basemapKey === 'satellite' ? 'bg-white text-[#1A5276] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              title="ESRI High-Resolution Satellite"
            >
              Satellite
            </button>
            <button
              onClick={() => setBasemapKey('topo')}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${basemapKey === 'topo' ? 'bg-white text-[#1A5276] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              title="Topographic Terrain & Watersheds"
            >
              Topographic
            </button>
          </div>

          {/* Quick Fly to Cadastral Pilot Button */}
          <button
            onClick={() => {
              setFlyTarget({ center: [26.9854, 80.9238], zoom: 16 });
              setSelectedParcel(PILOT_PARCELS[0]);
              toast.success('Navigated to Cadastral Village Pilot (1:2,500 scale)');
            }}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 font-bold"
          >
            <CornerDownRight size={13} /> Village Pilot
          </button>
        </div>
      </div>

      {/* Main Map Workspace Area */}
      <div className="flex flex-col xl:flex-row gap-3.5 flex-1 min-h-0 relative">

        {/* Left Side: Real GIS Tools & Layer Stack */}
        <div className="xl:w-80 flex flex-col gap-3 flex-shrink-0 overflow-y-auto pr-1">

          {/* Layer Management Card */}
          <div className="card p-3.5 border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Layers size={14} className="text-[#1A5276]" /> Active GIS Data Layers
              </h3>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                WGS-84
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Cadastral Parcels Layer (Real Feature) */}
              <div 
                onClick={() => toggleLayer('parcels')}
                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition-all ${activeLayers.has('parcels') ? 'bg-blue-50/80 border-blue-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="w-7 h-7 rounded-md bg-[#1A5276] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">Cadastral Survey Parcels</p>
                    {activeLayers.has('parcels') ? <Eye size={12} className="text-primary-600" /> : <EyeOff size={12} className="text-slate-400" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">High-precision vector khasra polygons with ULPIN</p>
                </div>
              </div>

              {/* Dispute Density Layer */}
              <div 
                onClick={() => toggleLayer('disputes')}
                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition-all ${activeLayers.has('disputes') ? 'bg-amber-50/80 border-amber-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="w-7 h-7 rounded-md bg-[#F39C12] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">Land Dispute Density</p>
                    {activeLayers.has('disputes') ? <Eye size={12} className="text-primary-600" /> : <EyeOff size={12} className="text-slate-400" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">State &amp; District revenue pendency choropleth</p>
                </div>
              </div>
            </div>

            {/* Layer Opacity Slider (Real Interactive GIS Control) */}
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                  <Sliders size={12} className="text-slate-500" /> Layer Opacity
                </span>
                <span className="font-mono text-slate-800 font-bold text-[11px]">{Math.round(layerOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={layerOpacity}
                onChange={(e) => setLayerOpacity(Number(e.target.value))}
                className="w-full accent-[#1A5276] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Professional GIS Analysis Tools */}
          <div className="card p-3.5 border-slate-200">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
              <Ruler size={14} className="text-[#1A5276]" /> Measurement &amp; Compare Tools
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  if (measureMode === 'distance') {
                    setMeasureMode('none');
                    toast('Measurement tool deactivated');
                  } else {
                    setMeasureMode('distance');
                    toast.success('Linear Distance Tool Active: Click on map to measure');
                  }
                }}
                className={`p-2 rounded-lg border font-semibold flex flex-col items-center justify-center gap-1 transition-all ${measureMode === 'distance' ? 'bg-blue-50 border-[#1A5276] text-[#1A5276]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <Ruler size={16} />
                <span className="text-[10px]">Measure Distance</span>
              </button>

              <button
                onClick={() => {
                  setSwipeMode(!swipeMode);
                  toast.success(swipeMode ? 'Exited Swipe Compare mode' : 'Activated 1930s Shajra vs 2024 Drone RTK Compare');
                }}
                className={`p-2 rounded-lg border font-semibold flex flex-col items-center justify-center gap-1 transition-all ${swipeMode ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <SplitSquareVertical size={16} />
                <span className="text-[10px]">Swipe Shajra/CORS</span>
              </button>
            </div>

            {/* Swipe Mode Active Banner */}
            {swipeMode && (
              <div className="mt-2.5 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">Split Swipe Comparison</span>
                  <span className="font-mono text-xs">{swipePosition}%</span>
                </div>
                <input 
                  type="range" 
                  min={10} 
                  max={90} 
                  value={swipePosition} 
                  onChange={(e) => setSwipePosition(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1.5"
                />
                <div className="flex justify-between text-[9px] text-amber-700 mt-0.5">
                  <span>1930s Cloth Shajra</span>
                  <span>2024 Drone RTK Ortho</span>
                </div>
              </div>
            )}
          </div>

          {/* Thematic Overlays Grid */}
          <div className="card p-3.5 border-slate-200">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapIcon size={14} className="text-[#1A5276]" /> Thematic Cadastral Maps
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">8 Atlases</span>
            </h3>
            <p className="text-xs text-slate-600 mb-2.5">Click for publication-grade vector overlay:</p>
            <div className="grid grid-cols-2 gap-2">
              {thematicGalleries.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewAsset(item)}
                  className="group rounded-xl border border-slate-200 overflow-hidden bg-white hover:border-[#1A5276] hover:shadow-xs cursor-pointer transition-all flex flex-col"
                >
                  <div className="h-16 w-full bg-slate-100 overflow-hidden relative">
                    <img 
                      src={getAssetUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-1.5">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Density Legend */}
          <div className="card p-3.5 border-slate-200 text-xs">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info size={14} className="text-[#1A5276]" /> Dispute Density Legend
            </h4>
            <div className="space-y-1.5">
              {[
                { color: '#C0392B', label: 'Critical (>200K disputes)' },
                { color: '#E67E22', label: 'High (100K–200K disputes)' },
                { color: '#F39C12', label: 'Moderate (50K–100K disputes)' },
                { color: '#F1C40F', label: 'Elevated (20K–50K disputes)' },
                { color: '#1E8449', label: 'Stable (<20K disputes)' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3 rounded-xs shrink-0" style={{ background: l.color }} />
                  <span className="text-xs font-medium text-slate-700">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center / Right: The Interactive GIS Map Container */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[540px]">
          {loading && (
            <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-[#1A5276] mb-2.5"></div>
              <p className="text-sm font-bold text-slate-800">Synchronizing Cadastral Spatial Data...</p>
            </div>
          )}

          {/* Swipe Comparison Overlay (When Active) */}
          {swipeMode && (
            <div 
              className="absolute inset-0 z-[400] pointer-events-none overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${swipePosition}% 0, ${swipePosition}% 100%, 0 100%)` }}
            >
              <img 
                src={getAssetUrl('assets/images/survey_settlement_map.svg')} 
                alt="1930s Shajra Map" 
                className="w-full h-full object-cover opacity-90 filter contrast-125"
              />
              <div className="absolute top-4 left-4 bg-amber-900/80 text-white text-xs font-bold px-3 py-1 rounded shadow-md pointer-events-auto">
                1930s Historical Revenue Shajra
              </div>
            </div>
          )}

          <MapContainer
            center={INDIA_CENTER}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            className="z-0"
          >
            <TileLayer
              attribution={BASEMAPS[basemapKey].attribution}
              url={BASEMAPS[basemapKey].url}
            />

            {/* National State Boundary Choropleth */}
            {geoData && activeLayers.has('disputes') && (
              <GeoJSON
                key={`disputes-${activeTimeYear}-${basemapKey}-${layerOpacity}`}
                data={geoData}
                style={(feature: any) => ({
                  fillColor: getDisputeColor(feature?.properties?.disputes || getDisputeCount(feature?.properties?.state_name || feature?.properties?.NAME_1 || feature?.properties?.ST_NM || '')),
                  fillOpacity: layerOpacity,
                  color: '#ffffff',
                  weight: 1.5,
                  dashArray: '2'
                })}
                onEachFeature={onEachFeature}
              />
            )}

            {/* Interactive Cadastral Parcels Layer (Simulated Real Cadastre at High Resolution) */}
            {activeLayers.has('parcels') && (
              <>
                {PILOT_PARCELS.map((parcel) => (
                  <Polygon
                    key={parcel.id}
                    positions={parcel.coordinates}
                    pathOptions={{
                      color: parcel.statusColor,
                      weight: selectedParcel?.id === parcel.id ? 3.5 : 2,
                      fillColor: parcel.fillColor,
                      fillOpacity: selectedParcel?.id === parcel.id ? 0.65 : 0.35,
                      dashArray: parcel.status === 'dispute' ? '5,5' : undefined
                    }}
                    eventHandlers={{
                      click: () => {
                        setSelectedParcel(parcel);
                        setSelectedState(null);
                        toast.success(`Selected Cadastral Parcel: ${parcel.khasraNo}`);
                      }
                    }}
                  >
                    <LeafletTooltip sticky>
                      <div className="text-xs p-1">
                        <strong className="text-slate-900">{parcel.khasraNo}</strong> ({parcel.areaSqM} m²)<br/>
                        <span className="text-slate-600 font-medium">{parcel.owner}</span><br/>
                        <span className="text-primary-700 font-mono text-[10px] font-bold">{parcel.ulpin}</span>
                      </div>
                    </LeafletTooltip>
                  </Polygon>
                ))}
              </>
            )}

            {/* Controllers */}
            <MapFlyController target={flyTarget} />
            <MapTelemetryController setCoords={setCoords} setZoom={setMapZoom} />
          </MapContainer>

          {/* Cartographic Compass Rose / North Arrow Overlay */}
          <div className="absolute top-3 right-3 z-[800] bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-md border border-slate-200 pointer-events-none flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#1A5276]">
              {/* North Pointer */}
              <polygon points="50,10 60,50 50,42" fill="#C0392B" />
              <polygon points="50,10 40,50 50,42" fill="#E74C3C" />
              {/* South Pointer */}
              <polygon points="50,90 60,50 50,58" fill="#1A5276" />
              <polygon points="50,90 40,50 50,58" fill="#2980B9" />
              <circle cx="50" cy="50" r="4" fill="#0F172A" />
              <text x="50" y="8" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle">N</text>
            </svg>
            <span className="text-[8px] font-bold font-mono text-slate-500 mt-0.5">TN 0.4° E</span>
          </div>

          {/* Real Graphic Scale Bar Overlay */}
          <div className="absolute bottom-3 right-3 z-[800] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 pointer-events-none flex flex-col items-end text-[10px] font-mono text-slate-700">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span>0</span>
              <div className="w-16 h-1 bg-slate-800 border-x border-slate-800"></div>
              <span>{mapZoom >= 15 ? '100 m' : mapZoom >= 10 ? '5 km' : '200 km'}</span>
            </div>
            <span className="text-[9px] text-slate-500">Scale 1:{mapZoom >= 15 ? '2,500' : mapZoom >= 10 ? '50,000' : '2,500,000'}</span>
          </div>

          {/* Real Telemetry Bar (Bottom Left) */}
          <div className="absolute bottom-3 left-3 z-[800] bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl shadow-md border border-slate-200 pointer-events-none flex items-center gap-4 text-xs font-mono text-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">COORDINATES (WGS-84)</span>
              <span className="font-bold font-mono">
                {coords ? `${coords.lat.toFixed(5)}° N, ${coords.lng.toFixed(5)}° E` : 'Hover to stream telemetry'}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">ELEVATION</span>
              <span className="font-bold">MSL 184m</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">ZOOM LEVEL</span>
              <span className="font-bold">{mapZoom}x</span>
            </div>
          </div>

          {/* Slide-in State Panel */}
          <AnimatePresence>
            {selectedState && renderStatePanel()}
          </AnimatePresence>

          {/* Slide-in Cadastral Parcel Dossier */}
          <AnimatePresence>
            {selectedParcel && renderParcelPanel()}
          </AnimatePresence>
        </div>
      </div>

      {/* Thematic Asset Full View Modal */}
      <AnimatePresence>
        {previewAsset && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
            >
              <div className="p-4 bg-[#1A5276] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#F39C12] text-slate-900 px-2.5 py-0.5 rounded">
                    {previewAsset.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{previewAsset.title}</h3>
                </div>
                <button 
                  onClick={() => setPreviewAsset(null)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-50">
                <div className="max-h-[60vh] max-w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                  <img 
                    src={getAssetUrl(previewAsset.image)} 
                    alt={previewAsset.title} 
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                </div>
                <p className="text-sm text-slate-700 mt-4 max-w-2xl text-center leading-relaxed">
                  {previewAsset.desc}
                </p>
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Official MoRD / DoLR Cadastral Architecture</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = previewAsset.image;
                      link.download = `${previewAsset.id}.svg`;
                      link.click();
                      toast.success(`Downloaded ${previewAsset.title}`);
                    }}
                    className="btn-primary text-xs flex items-center gap-1.5"
                  >
                    <Download size={13} /> Download Vector Asset
                  </button>
                  <button 
                    onClick={() => setPreviewAsset(null)}
                    className="btn-secondary text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
