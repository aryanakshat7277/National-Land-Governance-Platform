import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/ui/PageTransition';
import { AnimatedStatCard } from '../../components/ui/AnimatedStatCard';
import { 
  MapPin, FileText, AlertTriangle, CheckCircle, Clock, Search, 
  BookOpen, Activity, ArrowRight, Compass, ShieldCheck, Eye, Download, Sparkles
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';

const timelineData = [
  { name: '2019', coverage: 45, disputes: 120 },
  { name: '2020', coverage: 58, disputes: 110 },
  { name: '2021', coverage: 65, disputes: 95 },
  { name: '2022', coverage: 78, disputes: 85 },
  { name: '2023', coverage: 86, disputes: 70 },
  { name: '2024', coverage: 93.2, disputes: 50 },
];

const stateData = [
  { name: 'Telangana', digitized: 100, pending: 0 },
  { name: 'Madhya Pradesh', digitized: 99.1, pending: 0.9 },
  { name: 'Odisha', digitized: 98.4, pending: 1.6 },
  { name: 'Andhra Pradesh', digitized: 97.8, pending: 2.2 },
  { name: 'Maharashtra', digitized: 95.2, pending: 4.8 },
  { name: 'Uttar Pradesh', digitized: 88.6, pending: 11.4 },
];

const keyFeatures = [
  {
    title: 'SVAMITVA Property Card Deeds',
    tag: 'Property Card Titling',
    desc: 'Digital land title deeds with QR cryptographic verification, RTK CORS coordinates, and revenue authority seals across 1.1 lakh villages.',
    image: '/assets/images/svamitva_property_card_preview.svg',
    metric: '1.25 Cr+ Cards Issued',
    link: '/repository'
  },
  {
    title: 'Bhu-Aadhaar (ULPIN) Interoperability',
    tag: '14-Digit PIN Syntax',
    desc: 'Universal geospatial identifier linking Jamabandi revenue records, judicial courts (NJDG), and Kisan Credit Card banking.',
    image: '/assets/images/bhu_aadhaar_ulpin.svg',
    metric: '28 States Onboarded',
    link: '/gis'
  },
  {
    title: 'NRSC-ISRO GeoAI Research Lab',
    tag: '30m Satellite LULC',
    desc: 'National satellite data infrastructure detecting spatiotemporal land cover changes, aquifer stress, and peri-urban corridors.',
    image: '/assets/images/gis_mapping_lab.jpg',
    metric: '30m Resolution Atlas',
    link: '/gis'
  },
  {
    title: 'Revenue Dispute Lok Adalat',
    tag: 'Alternative Dispute Resolution',
    desc: 'Fast-track digital adjudication councils reducing agricultural and boundary disputes by 8.4% YoY across 18 states.',
    image: '/assets/images/revenue_court_analytics.svg',
    metric: '1.16M+ Cases Tracked',
    link: '/policy-sim'
  }
];

const featuredPublications = [
  {
    title: 'Bhu-Aadhaar & National Cadastral Interoperability: Standardizing 14-Digit ULPIN',
    author: 'DoLR / NIC Technical Working Group',
    date: 'Aug 2024',
    tag: 'National Architecture',
    cover: '/assets/images/cover_bhu_aadhaar_study.svg',
    downloads: '14,210'
  },
  {
    title: 'Economic Upliftment Through SVAMITVA: Unlocking ₹1.8 Trillion in Rural Collateral',
    author: 'National Institute of Public Finance and Policy (NIPFP)',
    date: 'May 2024',
    tag: 'Economic Impact',
    cover: '/assets/images/cover_svamitva_outcomes.svg',
    downloads: '16,890'
  },
  {
    title: 'Climate Vulnerability & Land Use Adaptation in Rainfed Agro-Ecosystems',
    author: 'TERI Climate Resilience Lab & ISRO NRSC',
    date: 'Jul 2024',
    tag: 'Climate & Cadastre',
    cover: '/assets/images/cover_climate_adaptation.svg',
    downloads: '8,740'
  },
  {
    title: 'Expediting Land Dispute Resolution: ADR & Revenue Court Reforms',
    author: 'National Law University Delhi & Dept. of Justice',
    date: 'Jun 2024',
    tag: 'Judicial Review',
    cover: '/assets/images/cover_dispute_litigation.svg',
    downloads: '11,250'
  }
];

const partners = [
  'IIT Delhi', 'IIT Bombay', 'TERI', 'ISRO-NRSC', 'NITI Aayog', 'NLU Delhi', 'World Bank', 'TISS Mumbai', 'CEPT University', 'NIC India'
];

export default function Dashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8FAFC] pb-14">
        
        {/* Live Ticker — Light Theme */}
        <div className="bg-white text-slate-700 text-xs sm:text-sm py-2.5 overflow-hidden border-b border-slate-200/90 shadow-xs flex items-center">
          <div className="flex items-center gap-2 pl-4 pr-3 border-r border-slate-200 bg-white z-10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="bg-[#1A5276] text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase">
              LIVE TELEMETRY
            </span>
          </div>
          <motion.div 
            animate={{ x: [0, -1200] }} 
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="whitespace-nowrap flex space-x-12 px-4 font-medium text-slate-600"
          >
            <span>🇮🇳 DILRMP National Coverage: <strong className="text-[#1A5276]">93.2%</strong> Villages Computerized</span>
            <span>📍 SVAMITVA Survey: <strong className="text-[#1E8449]">608,452</strong> Rural Abadi Parcels Mapped with Drone CORS</span>
            <span>✅ Telangana &amp; Madhya Pradesh: <strong className="text-[#1E8449]">100%</strong> Record Digitization Completed</span>
            <span>⚖️ Fast-track Lok Adalat: Pendency Reduced by <strong className="text-emerald-700 font-bold">8.4% YoY</strong></span>
            <span>🛰️ ISRO Bhuvan 2024 LULC 30m Atlas: Resourcesat-2 Sync Online</span>
            <span>📊 2.4M Verified Cadastral Title Deeds Added This Quarter</span>
          </motion.div>
        </div>

        <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8">
          
          {/* Hero Section — 100% Crisp Executive Government Light Theme */}
          <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200/90 overflow-hidden">
            {/* Top National Tricolor Ribbon */}
            <div className="h-1.5 w-full flex">
              <div className="w-1/3 bg-[#FF9933]"></div>
              <div className="w-1/3 bg-white border-y border-slate-100"></div>
              <div className="w-1/3 bg-[#138808]"></div>
            </div>

            {/* Subtle Cartographic Pattern Background */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ 
                backgroundImage: "radial-gradient(#1A5276 1px, transparent 1px)",
                backgroundSize: "20px 20px" 
              }}
            />

            <div className="relative p-6 sm:p-10 lg:p-12 lg:flex items-center justify-between gap-10">
              <div className="lg:w-7/12 space-y-5">
                
                {/* National Emblem & Department Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-1.5 shadow-xs">
                    {/* Ashoka Chakra SVG */}
                    <svg viewBox="0 0 24 24" className="w-full h-full text-[#1A5276]" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" stroke="#1A5276" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="2.5" fill="#1A5276" />
                      <line x1="12" y1="2" x2="12" y2="22" stroke="#1A5276" strokeWidth="1" />
                      <line x1="2" y1="12" x2="22" y2="12" stroke="#1A5276" strokeWidth="1" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#1A5276" strokeWidth="0.8" />
                      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" stroke="#1A5276" strokeWidth="0.8" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A5276] bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                      GOVERNMENT OF INDIA · MINISTRY OF RURAL DEVELOPMENT
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Department of Land Resources (DoLR) · SIH26019 National Digital Initiative
                    </p>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 leading-[1.18]">
                  National Digital Platform for <span className="text-[#1A5276] relative inline-block">
                    Evidence-Based Land Governance
                    <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#F39C12]/20 -z-10 rounded"></span>
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                  A centralized national ecosystem unifying multi-departmental land records, ISRO Bhuvan satellite imagery, cadastral drone photogrammetry, and AI-assisted policy simulation for transparent, future-ready land administration in India.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link 
                    to="/repository" 
                    className="bg-[#1A5276] hover:bg-[#154360] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow flex items-center gap-2 text-sm"
                  >
                    <Search className="w-4 h-4 text-[#F39C12]" /> Explore Research Repository
                  </Link>
                  <Link 
                    to="/gis" 
                    className="bg-white hover:bg-slate-50 text-[#1A5276] border border-slate-300 hover:border-slate-400 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-xs flex items-center gap-2 text-sm"
                  >
                    <Compass className="w-4 h-4 text-[#1A5276]" /> Launch GIS Geoportal
                  </Link>
                  <Link 
                    to="/policy-sim" 
                    className="bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-200 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-xs flex items-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#F39C12]" /> Policy Simulation Sandbox
                  </Link>
                </div>
              </div>

              {/* Right Side: Realistic Cadastral GIS Preview Console */}
              <div className="mt-8 lg:mt-0 lg:w-5/12 flex flex-col gap-3">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
                  {/* Top Cadastral Telemetry Header */}
                  <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-slate-800">CORS RTK Lock (±2.3cm)</span>
                    </div>
                    <span className="font-mono text-slate-500 font-semibold">EPSG: 4326 | WGS-84</span>
                  </div>

                  {/* Satellite Map with SVG Cadastral Vector Overlay */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden group">
                    <img 
                      src="/assets/images/hero_satellite_earth.jpg" 
                      alt="High-resolution Indian satellite GIS mapping" 
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Cadastral Parcel Vector Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Parcel 412/1 - Clear Title */}
                      <polygon 
                        points="40,30 140,25 130,110 30,105" 
                        fill="#1E8449" 
                        fillOpacity="0.35" 
                        stroke="#2ECC71" 
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-60 transition-all"
                      />
                      <circle cx="40" cy="30" r="3" fill="#FFFFFF" stroke="#1E8449" strokeWidth="1.5"/>
                      <circle cx="140" cy="25" r="3" fill="#FFFFFF" stroke="#1E8449" strokeWidth="1.5"/>
                      <circle cx="130" cy="110" r="3" fill="#FFFFFF" stroke="#1E8449" strokeWidth="1.5"/>
                      <circle cx="30" cy="105" r="3" fill="#FFFFFF" stroke="#1E8449" strokeWidth="1.5"/>
                      <text x="82" y="70" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Plot 412/1</text>
                      <text x="82" y="84" fill="#A7F3D0" fontSize="8" fontWeight="bold" textAnchor="middle">245.8 m² · Clear</text>

                      {/* Parcel 412/2 - Mortgage / KCC */}
                      <polygon 
                        points="145,25 250,30 240,115 135,110" 
                        fill="#2980B9" 
                        fillOpacity="0.35" 
                        stroke="#3498DB" 
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-60 transition-all"
                      />
                      <circle cx="250" cy="30" r="3" fill="#FFFFFF" stroke="#2980B9" strokeWidth="1.5"/>
                      <circle cx="240" cy="115" r="3" fill="#FFFFFF" stroke="#2980B9" strokeWidth="1.5"/>
                      <text x="190" y="70" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Plot 412/2</text>
                      <text x="190" y="84" fill="#BFDBFE" fontSize="8" fontWeight="bold" textAnchor="middle">180.4 m² · KCC</text>

                      {/* Parcel 413 - Gram Sabha Land */}
                      <polygon 
                        points="255,30 365,35 355,140 245,120" 
                        fill="#8E44AD" 
                        fillOpacity="0.35" 
                        stroke="#9B59B6" 
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-60 transition-all"
                      />
                      <circle cx="365" cy="35" r="3" fill="#FFFFFF" stroke="#8E44AD" strokeWidth="1.5"/>
                      <circle cx="355" cy="140" r="3" fill="#FFFFFF" stroke="#8E44AD" strokeWidth="1.5"/>
                      <text x="305" y="80" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Plot 413</text>
                      <text x="305" y="94" fill="#E9D5FF" fontSize="8" fontWeight="bold" textAnchor="middle">Gram Sabha</text>

                      {/* Parcel 414 - Under Dispute */}
                      <polygon 
                        points="35,112 132,118 120,185 25,178" 
                        fill="#C0392B" 
                        fillOpacity="0.4" 
                        stroke="#E74C3C" 
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        className="cursor-pointer hover:fill-opacity-60 transition-all"
                      />
                      <text x="75" y="150" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Plot 414 [Disputed]</text>
                    </svg>

                    {/* Corner Tag */}
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      22.3072° N, 73.1812° E · Vadodara Pilot
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-800 font-bold px-2 py-0.5 rounded text-[9px] border border-slate-200">
                      ISRO 30m LULC · SoI RTK
                    </div>
                  </div>

                  {/* Parcel Legend & Action bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Clear (SVAMITVA)
                      </span>
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Bank KCC
                      </span>
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Dispute
                      </span>
                    </div>
                    <Link to="/gis" className="text-[#1A5276] font-bold hover:underline">
                      Explore Geoportal →
                    </Link>
                  </div>
                </div>

                {/* 2 Clean Light Theme Metric Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs">
                    <p className="text-xl font-black text-[#1E8449]">93.2%</p>
                    <p className="text-slate-600 text-xs font-semibold">Villages Digitized</p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[93.2%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs">
                    <p className="text-xl font-black text-[#1A5276]">12,847</p>
                    <p className="text-slate-600 text-xs font-semibold">Indexed Research &amp; Acts</p>
                    <span className="inline-block mt-1 text-[10px] text-primary-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                      DoLR / ISRO Verified
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <AnimatedStatCard
              title="Total Villages Digitized"
              value={608452}
              icon={<CheckCircle className="w-5 h-5 text-[#1A5276]" />}
              change={4.2}
              changeType="positive"
            />
            <AnimatedStatCard
              title="National Coverage Rate"
              value={93}
              suffix=".2%"
              icon={<MapPin className="w-5 h-5 text-[#F39C12]" />}
              change={1.8}
              changeType="positive"
              colorClass="text-[#F39C12] bg-[#F39C12]/10"
            />
            <AnimatedStatCard
              title="Pending Land Disputes"
              value={845000}
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
              change={-8.4}
              changeType="positive"
              colorClass="text-rose-600 bg-rose-50"
            />
            <AnimatedStatCard
              title="Peer-Reviewed Publications"
              value={12847}
              icon={<BookOpen className="w-5 h-5 text-[#1E8449]" />}
              change={18}
              changeType="positive"
              colorClass="text-[#1E8449] bg-[#1E8449]/10"
            />
          </motion.div>

          {/* Strategic National Initiatives (Photos Showcase Grid) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">National Land Governance Initiatives</h2>
                <p className="text-sm text-gray-500">Key flagship technological interventions powered by Ministry of Rural Development</p>
              </div>
              <Link to="/innovation" className="text-sm font-semibold text-[#1A5276] hover:underline flex items-center gap-1">
                Explore Innovations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {keyFeatures.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#1A5276]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-[#F9E79F] text-[11px] font-bold px-2 py-0.5 rounded">
                      {item.metric}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#1A5276] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <Link 
                      to={item.link} 
                      className="mt-3 text-xs font-semibold text-[#1A5276] flex items-center gap-1 hover:underline"
                    >
                      View Framework <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Progress */}
            <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">DILRMP Digitization vs Dispute Reduction</h2>
                  <p className="text-xs text-gray-500">Pan-India historical trend (2019 – 2024)</p>
                </div>
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  Inverse Correlation Verified
                </span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A5276" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1A5276" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #DEE2E6', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area yAxisId="left" type="monotone" dataKey="coverage" name="Digitization Coverage (%)" stroke="#1A5276" strokeWidth={3} fillOpacity={1} fill="url(#colorCoverage)" />
                    <Line yAxisId="right" type="monotone" dataKey="disputes" name="Dispute Pendency Index" stroke="#F39C12" strokeWidth={2.5} dot={{r: 4}} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 2: Top States */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Leading States</h2>
                  <p className="text-xs text-gray-500">Record of Rights (RoR) completion</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData} layout="vertical" margin={{ top: 0, right: 10, left: 15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 11}} width={85} />
                    <RechartsTooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '10px', border: '1px solid #DEE2E6' }} />
                    <Bar dataKey="digitized" name="Digitized %" stackId="a" fill="#1A5276" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Featured Research Publications with Real Publication Cover Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Featured Policy &amp; Scientific Publications</h2>
                <p className="text-sm text-gray-500">Peer-reviewed white papers, geospatial atlases, and jurisprudence case studies</p>
              </div>
              <Link to="/repository" className="text-[#1A5276] text-sm font-semibold hover:underline flex items-center gap-1">
                Browse Repository ({featuredPublications.length * 300}+ Papers) <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredPublications.map((paper, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                  <div className="h-56 bg-gray-50 flex items-center justify-center p-3 border-b border-gray-100 overflow-hidden relative">
                    <img 
                      src={paper.cover} 
                      alt={paper.title} 
                      className="max-h-full max-w-full object-contain shadow-md rounded group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-[#1A5276] bg-white/90 px-2 py-0.5 rounded shadow-sm">
                      {paper.tag}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-[#1A5276] transition-colors line-clamp-2">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                        {paper.author}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {paper.date}</span>
                      <span className="flex items-center gap-1 font-semibold text-[#1E8449]"><Download className="w-3.5 h-3.5" /> {paper.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Research Partners Grid */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              National Research, Academic &amp; Technical Partners
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              {partners.map((partner, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 font-bold text-xs sm:text-sm hover:border-primary-300 hover:text-[#1A5276] hover:bg-blue-50/50 transition-all cursor-default"
                >
                  {partner}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
