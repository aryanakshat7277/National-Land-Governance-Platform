import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Library, 
  Map, 
  Search, 
  Bell, 
  UploadCloud, 
  ChevronRight,
  Users,
  Sparkles,
  BarChart3,
  Sliders,
  Rocket,
  FileCheck2,
  ExternalLink,
  Crosshair,
  ArrowRight,
  Activity,
  Radio,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Globe,
  HelpCircle
} from 'lucide-react';
import { SearchDropdown } from '@/components/ui/SearchDropdown';
import toast from 'react-hot-toast';

export function Layout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sidebarUlpin, setSidebarUlpin] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navGroups = [
    {
      title: 'PLATFORM CORE',
      items: [
        { path: '/', icon: LayoutDashboard, label: 'Executive Dashboard' },
        { path: '/repository', icon: Library, label: 'Digital Repository' },
        { path: '/gis', icon: Map, label: 'Cadastral WebGIS Studio' },
      ]
    },
    {
      title: 'ANALYTICS & POLICY',
      items: [
        { path: '/analytics', icon: BarChart3, label: 'Decision Analytics' },
        { path: '/policy-sim', icon: Sliders, label: 'Policy Simulation' },
      ]
    },
    {
      title: 'RESEARCH ECOSYSTEM',
      items: [
        { path: '/collaboration', icon: Users, label: 'Research Workspaces' },
        { path: '/innovation', icon: Rocket, label: 'Innovation & Grants' },
      ]
    }
  ];

  const [showNotifications, setShowNotifications] = useState(false);

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/': return { title: 'Executive Dashboard', subtitle: 'National Land Governance Overview', badge: 'MoRD • DoLR' };
      case '/repository': return { title: 'Digital Repository & Case Law', subtitle: '5,000+ Verified Policy & Research Records', badge: 'DILRMP Index' };
      case '/gis': return { title: 'Cadastral WebGIS Studio', subtitle: 'Bhu-Aadhaar ULPIN & Drone RTK Parcels', badge: 'Survey of India / NIC' };
      case '/analytics': return { title: 'Decision Analytics & Support', subtitle: 'Predictive Modeling & Tenure Performance', badge: 'NITI Aayog' };
      case '/policy-sim': return { title: 'Policy Simulation Sandbox', subtitle: 'Ex-Ante Policy Impact & Dispute Forecasting', badge: 'Evidence Lab' };
      case '/collaboration': return { title: 'Research Workspaces', subtitle: 'Inter-Institutional Working Groups', badge: 'Academic Network' };
      case '/innovation': return { title: 'Innovation Portal & Grants', subtitle: 'National Hackathons & Fellowship Grants', badge: '₹2.1 Cr Pool' };
      default: return { title: 'Bhoomi-Samvaad', subtitle: 'National Land Governance Platform', badge: 'Government of India' };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      {/* Top National Tricolor Accent Ribbon */}
      <div className="h-1 w-full flex flex-shrink-0 z-50">
        <div className="h-full flex-1 bg-[#FF9933]" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#138808]" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white px-4 py-2 rounded shadow-md text-[#1A5276] font-medium border border-slate-200">
          Skip to main content
        </a>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarExpanded ? 285 : 76 }}
          className="bg-white border-r border-slate-200 flex flex-col z-20 shadow-sm relative"
        >
          {/* Brand Header */}
          <div className="h-18 flex items-center justify-between px-4 border-b border-slate-100 py-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A5276] to-[#2980B9] p-0.5 shadow-sm flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="#F39C12" strokeWidth="1.5" />
                  <path d="M12 3V21M3 12H21" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                  <path d="M5.6 5.6L18.4 18.4M5.6 18.4L18.4 5.6" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                </svg>
              </div>
              
              {isSidebarExpanded && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 tracking-tight text-lg whitespace-nowrap">
                      भूमि संवाद
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      DoLR
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-tight truncate">
                    National Land Governance
                  </p>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              aria-label="Toggle navigation sidebar"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors absolute -right-3 top-5 bg-white border border-slate-200 shadow-sm z-30"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSidebarExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* User Profile Info */}
          <div className={`p-3.5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/60 ${!isSidebarExpanded && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A5276] to-[#3498DB] text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 border-2 border-white">
              GOI
            </div>
            {isSidebarExpanded && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">Dr. Rajesh Verma (IAS)</p>
                <p className="text-xs font-semibold text-slate-500 truncate">Principal Secretary • Land Records</p>
              </div>
            )}
          </div>

          {/* Sidebar Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3.5 scrollbar-hide flex flex-col">
            <div className="space-y-3.5">
              {/* Navigation Links */}
              <nav className="space-y-4">
                {navGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-1">
                    {isSidebarExpanded ? (
                      <h3 className="px-3 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                        {group.title}
                      </h3>
                    ) : (
                      <div className="h-2.5"></div>
                    )}
                    
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          title={!isSidebarExpanded ? item.label : undefined}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group overflow-hidden ${
                            isActive 
                              ? 'bg-[#1A5276]/10 text-[#1A5276] font-bold shadow-xs' 
                              : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-semibold'
                          }`}
                        >
                          {isActive && (
                            <motion.div 
                              layoutId="activeNavBorder"
                              className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#1A5276]"
                            />
                          )}
                          <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-[#1A5276]' : 'text-slate-500 group-hover:text-slate-800'}`} />
                          
                          {isSidebarExpanded && (
                            <span className="text-sm whitespace-nowrap tracking-normal">
                              {item.label}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              {/* Quick ULPIN Bhu-Aadhaar Finder */}
              {isSidebarExpanded ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Crosshair size={13} className="text-[#1A5276]" /> Quick ULPIN Search
                    </span>
                    <span className="text-xs font-black text-[#1E8449] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Live
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. UP-28-LKO-4091..."
                      value={sidebarUlpin}
                      onChange={(e) => setSidebarUlpin(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && sidebarUlpin.trim()) {
                          navigate('/gis');
                          toast.success(`Locating ULPIN: ${sidebarUlpin}`);
                        }
                      }}
                      className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1A5276]"
                    />
                    <button
                      onClick={() => {
                        if (sidebarUlpin.trim()) {
                          navigate('/gis');
                          toast.success(`Locating ULPIN: ${sidebarUlpin}`);
                        } else {
                          navigate('/gis');
                        }
                      }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#1A5276]"
                      title="Jump to Cadastre"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="text-xs text-slate-500 font-bold">Demo:</span>
                    <button
                      onClick={() => {
                        setSidebarUlpin('UP-28-LKO-4091-8842');
                        navigate('/gis');
                        toast.success('Navigated to Pilot Village Cadastre (Lucknow)');
                      }}
                      className="text-xs font-mono font-bold bg-white hover:bg-slate-100 text-[#1A5276] px-2 py-0.5 rounded border border-slate-200"
                    >
                      Plot 412/1
                    </button>
                    <button
                      onClick={() => {
                        setSidebarUlpin('GJ-19-VAD-2041-3918');
                        navigate('/gis');
                        toast.success('Navigated to Agricultural Parcel (Vadodara)');
                      }}
                      className="text-xs font-mono font-bold bg-white hover:bg-slate-100 text-[#1A5276] px-2 py-0.5 rounded border border-slate-200"
                    >
                      Plot 819
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button 
                    onClick={() => navigate('/gis')}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-[#1A5276]"
                    title="Quick ULPIN Search"
                  >
                    <Crosshair size={18} />
                  </button>
                </div>
              )}

              {/* DILRMP National Mission Status Widget */}
              {isSidebarExpanded ? (
                <div className="p-3.5 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-slate-200/90 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={14} className="text-[#1A5276]" /> DILRMP Mission Status
                    </span>
                    <span className="text-sm font-black text-[#1A5276] font-mono">
                      93.2%
                    </span>
                  </div>

                  {/* National Tricolor Progress Bar */}
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                    <div className="bg-[#FF9933] h-full" style={{ width: '46.6%' }}></div>
                    <div className="bg-white h-full" style={{ width: '5%' }}></div>
                    <div className="bg-[#138808] h-full" style={{ width: '41.6%' }}></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-slate-500 block text-xs font-bold">VILLAGES COVERED</span>
                      <span className="font-black text-slate-900 font-mono text-xs sm:text-sm">6,08,452</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs font-bold">BHU-AADHAAR</span>
                      <span className="font-black text-slate-900 font-mono text-xs sm:text-sm">48.2 Million</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs font-bold">SVAMITVA CARDS</span>
                      <span className="font-black text-[#1E8449] font-mono text-xs sm:text-sm">1.25 Crore</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs font-bold">PENDING DISPUTES</span>
                      <span className="font-black text-emerald-700 font-mono text-xs sm:text-sm">▼ 8.4% YoY</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div 
                    className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center cursor-pointer"
                    title="DILRMP Saturation: 93.2%"
                    onClick={() => navigate('/analytics')}
                  >
                    <span className="text-xs font-bold text-[#1A5276]">93%</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
              )}

              {/* CORS RTK Network & System Telemetry */}
              {isSidebarExpanded ? (
                <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Radio size={14} className="text-emerald-600 animate-pulse" /> CORS Telemetry
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Locked
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span>SoI CORS Network:</span>
                      <strong className="text-slate-900 font-mono font-bold">568 Active</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span>NIC Core Gateway:</span>
                      <strong className="text-emerald-700 font-mono font-bold">18ms (99.9%)</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span>ISRO Bhuvan Sync:</span>
                      <strong className="text-slate-900 font-mono font-bold">WGS-84 Datum</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="p-2 text-emerald-600" title="CORS RTK: 568 Active Stations">
                    <Radio size={18} className="animate-pulse" />
                  </div>
                </div>
              )}

              {/* Live Land Settlement Stream */}
              {isSidebarExpanded ? (
                <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={14} className="text-[#1A5276]" /> Settlement Telemetry
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 bg-white rounded-lg border border-slate-200/70 flex items-start gap-2 shadow-2xs">
                      <span className="text-[#1E8449] font-black text-xs bg-emerald-50 px-1.5 py-0.5 rounded">UP</span>
                      <div className="text-slate-700 leading-tight font-medium">
                        <strong className="text-slate-900 font-bold">Amethi:</strong> 1,420 mutations cleared
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200/70 flex items-start gap-2 shadow-2xs">
                      <span className="text-[#1A5276] font-black text-xs bg-blue-50 px-1.5 py-0.5 rounded">GJ</span>
                      <div className="text-slate-700 leading-tight font-medium">
                        <strong className="text-slate-900 font-bold">Vadodara:</strong> 840 drone maps geo-locked
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200/70 flex items-start gap-2 shadow-2xs">
                      <span className="text-[#F39C12] font-black text-xs bg-amber-50 px-1.5 py-0.5 rounded">MH</span>
                      <div className="text-slate-700 leading-tight font-medium">
                        <strong className="text-slate-900 font-bold">Pune:</strong> e-Chawani RoR synchronized
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="p-2 text-[#1A5276]" title="Live Settlement Feed">
                    <Activity size={18} />
                  </div>
                </div>
              )}

              {/* 24x7 Citizen & Kisan Helpline */}
              {isSidebarExpanded ? (
                <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <PhoneCall size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-900 leading-tight">Bhoomi Sahayata 24x7</p>
                      <p className="text-sm font-black text-amber-900 font-mono">1800-180-LAND</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded">Toll-Free</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="p-2 text-amber-600" title="Kisan Helpline: 1800-180-LAND">
                    <PhoneCall size={18} />
                  </div>
                </div>
              )}

              {/* Federation Quick Links */}
              {isSidebarExpanded && (
                <div className="px-1 py-1">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Government Portals
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'DILRMP', url: 'https://dilrmp.gov.in' },
                      { name: 'ISRO Bhuvan', url: 'https://bhuvan.nrsc.gov.in' },
                      { name: 'NJDG Courts', url: 'https://njdg.ecourts.gov.in' },
                      { name: 'SVAMITVA', url: 'https://svamitva.nic.in' }
                    ].map((p) => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-slate-700 hover:text-[#1A5276] bg-slate-100 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
                      >
                        {p.name} <ExternalLink size={10} className="opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Governance Engine Badge & DoLR Seal Footer */}
            {isSidebarExpanded && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl border border-blue-100 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-[#1A5276] mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#1A5276]">AI Governance Engine</p>
                    <p className="text-xs text-slate-600 leading-snug font-medium">
                      Synchronized with Survey of India CORS &amp; Revenue e-Courts.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 text-center py-1">
                  <p className="font-bold text-slate-600">Ministry of Rural Development · GoI</p>
                  <p className="font-semibold text-slate-400">Problem Statement ID: SIH26019</p>
                </div>
              </div>
            )}
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0" id="main-content">
          {/* Header Bar */}
          <header className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0 shadow-xs">
            <div className="flex items-center gap-4 flex-1">
              <div className="hidden md:flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base sm:text-lg">
                    {pageMeta.title}
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-50 text-[#1A5276] text-xs font-bold rounded-full border border-blue-100">
                    {pageMeta.badge}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium">
                  {pageMeta.subtitle}
                </span>
              </div>

              {/* Global Search Bar */}
              <div className="max-w-md w-full relative ml-2 sm:ml-6">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="global-search"
                    type="text"
                    placeholder="Search ULPIN, policies, legal rulings, spatial layers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full pl-10 pr-14 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1A5276] focus:ring-2 focus:ring-[#1A5276]/15 rounded-xl text-sm text-slate-800 transition-all placeholder:text-slate-400 font-semibold"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                    <span>Ctrl K</span>
                  </div>
                </div>
                <SearchDropdown 
                  isOpen={isSearchFocused} 
                  onClose={() => setIsSearchFocused(false)} 
                  searchQuery={searchQuery} 
                />
              </div>
            </div>

            {/* Right Header Badges & Actions */}
            <div className="flex items-center gap-3 ml-4">
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E8449] animate-pulse"></div>
                <span className="text-xs sm:text-sm font-bold text-[#1E8449]">NIC Gateway Live</span>
              </div>

              {/* Notification Popover */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F39C12] text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    3
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-88 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
                      <span className="text-sm font-black text-slate-900">Government Notifications</span>
                      <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => setShowNotifications(false)}>Dismiss</span>
                    </div>
                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                        <p className="font-bold text-slate-900">DILRMP RoR Coverage</p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">National digitization crossed 93.2% of villages across 28 states.</p>
                      </div>
                      <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                        <p className="font-bold text-slate-900">Bhu-Aadhaar ULPIN Registry</p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">Over 48,000 new cadastral parcel shapes synchronized from UP & MP.</p>
                      </div>
                      <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                        <p className="font-bold text-slate-900">Policy Sandbox Alert</p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">New scenario run: Revenue court fast-track impact assessment ready.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Upload Button */}
              <button 
                onClick={() => {
                  toast.success("Ready for submission: Select PDF Research Papers, Cadastral GeoJSON, or DILRMP Policy briefs.");
                  if (location.pathname !== '/repository') {
                    window.location.hash = '#/repository';
                  }
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A5276] hover:bg-[#154360] text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upload Asset</span>
              </button>
            </div>
          </header>

          {/* Main View Area — Full Canvas */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
