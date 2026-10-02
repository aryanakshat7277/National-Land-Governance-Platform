import React, { useState } from 'react';
import {
  BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Legend, LineChart, Line, Cell
} from 'recharts';
import { Download, TrendingUp, TrendingDown, AlertCircle,
  BarChart3, Activity, Filter, Settings, FileText, Check, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import { landDisputeData, landUseData, researchOutputData,
  climateRiskData, policyPerformanceData } from '@/data/mockData';
import { getAssetUrl } from '@/utils/assets';

const BLUE = '#1A5276';
const AMBER = '#F39C12';
const GREEN = '#1E8449';
const RED = '#C0392B';
const PURPLE = '#8E44AD';

const digitizationData = [
  { state: 'Telangana', progress: 100 },
  { state: 'MP', progress: 99.1 },
  { state: 'Odisha', progress: 98.4 },
  { state: 'AP', progress: 97.8 },
  { state: 'Maharashtra', progress: 95.2 },
  { state: 'Karnataka', progress: 93.7 },
  { state: 'Rajasthan', progress: 91.4 },
  { state: 'UP', progress: 88.6 },
  { state: 'Bihar', progress: 82.3 },
  { state: 'Jharkhand', progress: 71.8 },
];

const kpiCards = [
  { label: 'Total Land Disputes', value: '1,163,000', change: -8.4, unit: 'Pending cases', color: 'text-red-600', bg: 'bg-red-50', sparkData: [30,40,45,50,49,42,35] },
  { label: 'Digitization Progress', value: '93.2%', change: +4.1, unit: 'Villages covered', color: 'text-success-500', bg: 'bg-green-50', sparkData: [60,65,70,75,80,88,93] },
  { label: 'Forest Cover', value: '21.1%', change: -0.5, unit: '% of total area', color: 'text-primary-600', bg: 'bg-primary-50', sparkData: [22,21.8,21.6,21.4,21.3,21.2,21.1] },
  { label: 'Urban Land Area', value: '10.4%', change: +0.5, unit: 'Annual expansion', color: 'text-amber-600', bg: 'bg-amber-50', sparkData: [8,8.5,9,9.2,9.6,10.0,10.4] },
];

const radarData = [
  { axis: 'Records\nDigitization', score: 93 },
  { axis: 'Dispute\nResolution', score: 52 },
  { axis: 'Land Rights\nAccess', score: 67 },
  { axis: 'Urban\nPlanning', score: 71 },
  { axis: 'Climate\nResilience', score: 48 },
  { axis: 'Forest\nConservation', score: 79 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gov-border shadow-card-hover rounded-xl">
        <p className="font-semibold text-gov-text mb-2 border-b border-gray-100 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gov-muted">{entry.name}:</span>
            <span className="font-semibold text-gov-text">
              {typeof entry.value === 'number' && entry.value > 1000 ? (entry.value/1000).toFixed(1) + 'k' : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showCustomQuery, setShowCustomQuery] = useState(false);
  const [queryInput, setQueryInput] = useState('SELECT state, disputes, digitization_pct FROM national_land_registry ORDER BY disputes DESC LIMIT 5;');
  const [queryRunning, setQueryRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [yoyComparison, setYoyComparison] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleGenerateReport = () => {
    const content = `================================================================================
GOVERNMENT OF INDIA · MINISTRY OF RURAL DEVELOPMENT
DEPARTMENT OF LAND RESOURCES (DoLR)
NATIONAL LAND GOVERNANCE ANALYTICS REPORT · YEAR ${selectedYear}
================================================================================

1. EXECUTIVE KEY PERFORMANCE INDICATORS
---------------------------------------
• Total Land Disputes Pending: 1,163,000 cases (-8.4% YoY reduction)
• Village Digitization Progress: 93.2% national coverage (+4.1% YoY)
• Forest Cover Conservation: 21.1% of national landmass
• Urban Peri-Urban Land Expansion: 10.4% (+0.5% annual rate)

2. STATE-WISE DIGITIZATION LEADERS
-----------------------------------
1. Telangana: 100%
2. Madhya Pradesh: 99.1%
3. Odisha: 98.4%
4. Andhra Pradesh: 97.8%
5. Maharashtra: 95.2%
6. Karnataka: 93.7%
7. Rajasthan: 91.4%
8. Uttar Pradesh: 88.6%
9. Bihar: 82.3%
10. Jharkhand: 71.8%

3. REVENUE LITIGATION DISPOSAL
------------------------------
National Lok Adalat campaigns combined with drone orthomosaic pre-trial validation
have resolved 1,84,200 boundary dispute cases in 2024, saving rural households
over ₹3,200 crore in legal costs.

Report verified by DoLR Analytics Engine (SIH26019)
================================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `National_Land_Governance_Analytics_Report_${selectedYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Report exported successfully!');
    setShowReportBuilder(false);
  };

  const executeCustomQuery = () => {
    setQueryRunning(true);
    setTimeout(() => {
      setQueryRunning(false);
      setQueryResult([
        { state: 'Uttar Pradesh', disputes: '342,000', digitization_pct: '88.6%', avg_resolution_time: '14 months' },
        { state: 'Bihar', disputes: '198,000', digitization_pct: '82.3%', avg_resolution_time: '19 months' },
        { state: 'Rajasthan', disputes: '156,000', digitization_pct: '91.4%', avg_resolution_time: '11 months' },
        { state: 'Madhya Pradesh', disputes: '134,000', digitization_pct: '99.1%', avg_resolution_time: '6 months' },
        { state: 'Maharashtra', disputes: '112,000', digitization_pct: '95.2%', avg_resolution_time: '8 months' },
      ]);
      triggerToast('Query executed on NIC Land Data Lake in 42ms');
    }, 800);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <PageTransition>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="section-title">Analytics &amp; Decision Support</h1>
            <p className="section-subtitle">Evidence-based insights on India's land governance performance</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white border border-gov-border rounded-lg px-3 py-2 text-sm font-medium text-gov-text pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {[2024, 2023, 2022, 2021, 2020, 2019].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gov-muted pointer-events-none" />
            </div>
            <button onClick={() => setShowReportBuilder(!showReportBuilder)} className="btn-secondary text-sm">
              <FileText size={15} /> Report Builder
            </button>
            <button onClick={() => setShowCustomQuery(true)} className="btn-primary text-sm flex items-center gap-1.5">
              <BarChart3 size={15} /> Custom Query
            </button>
          </div>
        </div>

        {/* Report Builder Slide-in Panel */}
        <AnimatePresence>
          {showReportBuilder && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border border-primary-200 rounded-xl p-4 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-primary-700 flex items-center gap-2"><Settings size={16} /> Export Custom Report</h3>
                <button onClick={() => setShowReportBuilder(false)} className="text-gov-muted hover:text-gov-text"><Check size={16}/></button>
              </div>
              <div className="flex gap-4 flex-wrap">
                {['Dispute Trends', 'Digitization Stats', 'Land Use', 'Climate Risk', 'Policy Performance'].map(rpt => (
                  <label key={rpt} className="flex items-center gap-2 text-sm text-gov-text cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    {rpt}
                  </label>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleGenerateReport} className="btn-primary text-xs py-1.5 flex items-center gap-1.5">
                  <Download size={13} /> Generate &amp; Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Query Modal */}
        <AnimatePresence>
          {showCustomQuery && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1A5276] flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">NIC Land Data Lake · Query Console</h3>
                      <p className="text-[10px] text-slate-500">Query national revenue records, ULPIN registrations, and dispute registries</p>
                    </div>
                  </div>
                  <button onClick={() => setShowCustomQuery(false)} className="p-1 rounded hover:bg-slate-100 text-slate-400">
                    <Check size={16} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">SQL / Natural Language Query</label>
                    <textarea
                      rows={3}
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="w-full font-mono text-[11px] p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 text-slate-800"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      <button 
                        onClick={() => setQueryInput('SELECT state, disputes FROM revenue_courts WHERE year = 2024 ORDER BY disputes DESC;')}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700"
                      >
                        Top Disputes 2024
                      </button>
                      <button 
                        onClick={() => setQueryInput('SELECT district, svamitva_cards_issued FROM rural_parcels WHERE saturation > 90;')}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700"
                      >
                        SVAMITVA Saturation
                      </button>
                    </div>

                    <button 
                      onClick={executeCustomQuery}
                      disabled={queryRunning}
                      className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 font-bold"
                    >
                      {queryRunning ? 'Executing...' : 'Run Query'}
                    </button>
                  </div>

                  {queryResult && (
                    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                      <div className="p-2.5 bg-slate-100/70 border-b border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-700">
                        <span>Query Output (5 rows returned in 42ms)</span>
                        <button 
                          onClick={() => triggerToast('Downloaded CSV result')}
                          className="text-[#1A5276] hover:underline flex items-center gap-1"
                        >
                          <Download size={11} /> Export CSV
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left">
                          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                              <th className="p-2">State</th>
                              <th className="p-2">Disputes</th>
                              <th className="p-2">Digitization %</th>
                              <th className="p-2">Resolution Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {queryResult.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2 font-medium text-slate-900">{row.state}</td>
                                <td className="p-2 text-red-600 font-semibold">{row.disputes}</td>
                                <td className="p-2 text-emerald-600 font-semibold">{row.digitization_pct}</td>
                                <td className="p-2 text-slate-600">{row.avg_resolution_time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* KPI cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((k) => (
            <motion.div variants={itemVariants} key={k.label} className="card p-5 relative overflow-hidden group">
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium mb-3 ${k.bg} ${k.color}`}>
                {k.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {k.change > 0 ? '+' : ''}{k.change}% YoY
              </div>
              <p className="text-2xl font-bold text-gov-text">{k.value}</p>
              <p className="text-sm font-medium text-gov-text mt-0.5">{k.label}</p>
              <p className="text-xs text-gov-muted mt-0.5">{k.unit}</p>
              
              {/* Sparkline */}
              <div className="absolute bottom-0 left-0 w-full h-10 opacity-30 group-hover:opacity-60 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={k.sparkData.map((val, i) => ({ val, i }))}>
                    <Line type="monotone" dataKey="val" stroke={k.change > 0 ? (k.label === 'Total Land Disputes' ? RED : GREEN) : (k.label === 'Total Land Disputes' ? GREEN : RED)} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Insights & Visual Field Evidence Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 rounded-xl p-4 shadow-sm flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-primary-100 mt-0.5">
              <Sparkles size={18} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-800 mb-2">AI-Generated Insights ({selectedYear})</h3>
              <ul className="text-xs sm:text-sm text-gov-text space-y-1.5 list-disc list-inside marker:text-primary-400">
                <li>Land dispute resolution improved by <strong>8.4%</strong> in {selectedYear}, primarily driven by faster Lok Adalat and digital RoRs in Telangana, MP and Maharashtra.</li>
                <li>Urban land consumption is growing at <strong>+0.5% per annum</strong>, encroaching on peri-urban agricultural zones along NH corridors.</li>
                <li>Eastern &amp; NE India shows highest climate vulnerability at <strong>42%</strong>, requiring agroforestry and micro-watershed interventions.</li>
              </ul>
            </div>
          </motion.div>

          {/* Field Evidence Photo Badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group bg-white">
              <img 
                src={getAssetUrl('assets/images/climate_resilient_agro.jpg')} 
                alt="Agro Climate Resilience" 
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2.5 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#A9DFBF] uppercase tracking-wider">Climate Risk</span>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Watershed Mapping</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group bg-white">
              <img 
                src={getAssetUrl('assets/images/urban_rural_corridor.jpg')} 
                alt="Urban Rural Transition Corridor" 
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2.5 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#F9E79F] uppercase tracking-wider">Peri-Urban</span>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">Growth Corridors</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Dispute Chart */}
          <motion.div variants={itemVariants} className="card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gov-text">Land Disputes by State</h3>
                <p className="text-xs text-gov-muted">Resolved vs. Pending (in thousands)</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-gov-text cursor-pointer">
                  <input type="checkbox" checked={yoyComparison} onChange={(e) => setYoyComparison(e.target.checked)} className="rounded border-gray-300 text-primary-600" />
                  YoY Comp.
                </label>
                <button onClick={() => triggerToast('Downloading Dispute Data...')} className="text-gov-muted hover:text-primary-600 transition-colors"><Download size={16} /></button>
              </div>
            </div>
            <div className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={landDisputeData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="state" tick={{ fontSize: 11, fill: '#6C757D' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6C757D' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f9fafb'}} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: '10px' }} iconType="circle" />
                  <Bar dataKey="resolved" name="Resolved" fill={GREEN} radius={[3, 3, 0, 0]} stackId="a" />
                  <Bar dataKey="pending" name="Pending" fill={AMBER} radius={[3, 3, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Digitization Top 10 */}
          <motion.div variants={itemVariants} className="card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gov-text">Digitization Progress</h3>
                <p className="text-xs text-gov-muted">Top 10 States (% Villages Covered)</p>
              </div>
              <button onClick={() => triggerToast('Downloading Digitization Data...')} className="text-gov-muted hover:text-primary-600 transition-colors"><Download size={16} /></button>
            </div>
            <div className="flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={digitizationData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6C757D' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="state" type="category" tick={{ fontSize: 11, fill: '#6C757D' }} axisLine={false} tickLine={false} width={80} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f9fafb'}} />
                  <Bar dataKey="progress" name="Digitization %" fill={BLUE} radius={[0, 4, 4, 0]} barSize={16}>
                    {digitizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.progress > 95 ? GREEN : entry.progress > 85 ? BLUE : AMBER} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Land Use Trend */}
          <motion.div variants={itemVariants} className="card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gov-text">Land Use Trend 2019–{selectedYear}</h3>
                <p className="text-xs text-gov-muted">% of total geographic area</p>
              </div>
              <button onClick={() => triggerToast('Downloading Land Use Data...')} className="text-gov-muted hover:text-primary-600 transition-colors"><Download size={16} /></button>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={landUseData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6C757D' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6C757D' }} domain={[0, 70]} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                  <Line type="monotone" dataKey="agricultural" name="Agricultural" stroke={GREEN} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="urban" name="Urban" stroke={BLUE} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="forest" name="Forest" stroke={PURPLE} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="wasteland" name="Wasteland" stroke={RED} strokeWidth={1.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Governance Radar */}
          <motion.div variants={itemVariants} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gov-text">Governance Radar</h3>
                <p className="text-xs text-gov-muted">Score out of 100</p>
              </div>
              <button onClick={() => triggerToast('Downloading Radar Data...')} className="text-gov-muted hover:text-primary-600 transition-colors"><Download size={16} /></button>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: '#6C757D' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name={`India ${selectedYear}`} dataKey="score" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
                  <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Policy performance table */}
        <motion.div variants={itemVariants} initial="hidden" animate="show" className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gov-text">Policy Programme Performance</h3>
              <p className="text-xs text-gov-muted">Key performance indicators vs. targets</p>
            </div>
            <button className="btn-secondary text-sm"><Download size={14} /> Download CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gov-border bg-gray-50/50">
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Programme</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Performance Score</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Target</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Gap</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gov-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {policyPerformanceData.map((p) => {
                  const gap = p.target - p.score;
                  const status = p.score >= 80 ? 'On Track' : p.score >= 60 ? 'Moderate' : 'Needs Attention';
                  const statusColor = p.score >= 80 ? 'bg-success-50 text-success-700 border-success-200' : p.score >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200';
                  return (
                    <tr key={p.name} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gov-text text-sm">{p.name}</td>
                      <td className="py-3 px-4"><span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md border border-gray-200">{p.category}</span></td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${p.score >= 80 ? 'bg-success-500' : p.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${p.score}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gov-text">{p.score}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gov-muted">{p.target}%</td>
                      <td className={`py-3 px-4 text-sm font-medium ${gap > 15 ? 'text-red-600' : gap > 8 ? 'text-amber-600' : 'text-success-500'}`}>
                        {gap > 0 ? `-${gap}%` : '✓ Met'}
                      </td>
                      <td className="py-3 px-4"><span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md border ${statusColor}`}>{status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Global Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-6 left-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium z-50 flex items-center gap-2"
            >
              <Check size={16} className="text-green-400" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
