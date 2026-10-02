import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  { 
    id: '1', 
    role: 'system', 
    content: 'Welcome! I am your AI Research Assistant for the National Land Governance Platform (SIH26019). Ask me anything about DILRMP, SVAMITVA, Bhu-Aadhaar (ULPIN), land dispute analytics, GIS data, or policy simulation.' 
  },
  { 
    id: '2', 
    role: 'user', 
    content: 'What is the current digitization status of land records across India?' 
  },
  { 
    id: '3', 
    role: 'assistant', 
    content: `As of 2024, India has digitized land records for **93.2% of villages** under the Digital India Land Records Modernization Programme (DILRMP).\n\n• **Leading States:** Telangana (100%), Madhya Pradesh (99.1%), Odisha (98.4%), and Andhra Pradesh (97.8%).\n• **Cadastral Maps Digitized:** Over 6.2 lakh village cadastral maps have been georeferenced and vectorized.\n• **Spatial-Textual Integration:** 87.4% of RoR (Record of Rights) are now seamlessly integrated with cadastral survey maps.\n• **Next Horizon:** Ongoing saturation in remote tribal belts of Jharkhand, Arunachal Pradesh, and Nagaland.` 
  }
];

const QUICK_PROMPTS = [
  'Summarize DILRMP 2024',
  'Top disputed states',
  'What is Bhu-Aadhaar ULPIN?',
  'SVAMITVA economic impact',
  'Climate risk zones',
  'Forest Rights Act (FRA)'
];

function generateDomainResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('dilrmp') || q.includes('digitiz') || q.includes('progress') || q.includes('coverage')) {
    return `### DILRMP 2024 National Status\n\nThe **Digital India Land Records Modernization Programme** has achieved major milestones:\n\n1. **Village Coverage:** 93.2% of rural villages have fully computerized textual Records of Rights (RoR).\n2. **Cadastral Geo-referencing:** 6,24,000 village maps vectorized with WGS-84 coordinate systems.\n3. **Modern Sub-Registrar Offices (SROs):** 94.6% of SROs now computerized and linked with revenue registries for automatic mutation.\n4. **Bhu-Aadhaar Seeding:** 28 states currently assigning unique 14-digit geospatial parcel identifiers.\n\n*Source: Department of Land Resources (DoLR), Ministry of Rural Development.*`;
  }

  if (q.includes('dispute') || q.includes('litigat') || q.includes('court') || q.includes('pendency') || q.includes('lok adalat')) {
    return `### Land Dispute & Revenue Court Analytics\n\nLand disputes constitute an estimated **66% of all civil litigation** in India:\n\n• **Highest Dispute Volumes:**\n  1. Uttar Pradesh: ~342,000 active cases\n  2. Bihar: ~198,000 active cases\n  3. Rajasthan: ~156,000 active cases\n  4. Madhya Pradesh: ~134,000 active cases\n\n• **Judicial Innovation:** Fast-track **National Lok Adalats** integrated with drone cadastral overlays reduce average settlement timelines from **4.8 years to 1.2 months** with a 92.4% settlement finality rate.\n• **Economic Savings:** Pre-trial GIS boundary verification prevents boundary ambiguity, saving rural families over ₹3,200 crore annually in legal costs.`;
  }

  if (q.includes('bhu-aadhaar') || q.includes('ulpin') || q.includes('14-digit') || q.includes('identifier')) {
    return `### Bhu-Aadhaar (ULPIN) Standard\n\nThe **Unique Land Parcel Identification Number (ULPIN)**, known as Bhu-Aadhaar, is the foundational building block for national land interoperability:\n\n• **Syntax:** 14-digit alphanumeric alphanumeric code based on international Open Geospatial Consortium (OGC) standards.\n• **Derivation:** Generated mathematically from the longitude and latitude coordinates of the land parcel's boundary vertices.\n• **Interoperability Matrix:**\n  - **Revenue Registry:** Jamabandi & RoR authentication.\n  - **Registration:** Prevents fraudulent double-selling and unauthorized benami registrations.\n  - **Judiciary (NJDG):** Auto-flags parcels under civil or revenue litigation.\n  - **Banking (KCC):** Enables instant institutional mortgage verification for farmers without physical revenue office visits.`;
  }

  if (q.includes('svamitva') || q.includes('property card') || q.includes('drone') || q.includes('collateral') || q.includes('panchayat')) {
    return `### SVAMITVA Scheme & Economic Impact\n\n**SVAMITVA** (Survey of Villages and Mapping with Improvised Technology in Village Areas) addresses the historical absence of inhabited rural land titles:\n\n• **Technology:** Survey of India drone photogrammetry and Continuously Operating Reference Stations (CORS) providing **5cm planimetric accuracy**.\n• **Property Cards:** Over **1.25 Crore Property Cards** (सम्पत्ति पत्रक) issued across 1.1 lakh villages.\n• **Economic Monetization:** An estimated **₹1.84 Trillion** in dead rural capital has been unlocked, enabling a 312% increase in formal bank mortgage credit.\n• **Local Governance:** Gram Panchayats report a **48.6% increase in Own Source Revenue (OSR)** from structured property tax registers.`;
  }

  if (q.includes('climate') || q.includes('drought') || q.includes('water') || q.includes('soil') || q.includes('aquifer')) {
    return `### Climate Vulnerability & Agro-Cadastre Nexus\n\nOur platform integrates satellite remote sensing with cadastral parcel boundaries to assess environmental risk:\n\n• **Drought Vulnerability:** 42 rainfed districts across Bundelkhand, Marathwada, and Rayalaseema exhibit Standardized Precipitation Evapotranspiration Index (SPEI) below -1.5.\n• **Soil Moisture Deficit:** NASA SMAP & ISRO radar data detects up to 38% topsoil moisture deficit in rainfed kharif crops.\n• **Policy Interventions:** The platform simulates automated PMFBY insurance payouts and MGNREGS farm pond watershed prioritization based on cadastral climate scores.`;
  }

  if (q.includes('fra') || q.includes('forest') || q.includes('tribal') || q.includes('scheduled tribes')) {
    return `### Forest Rights Act (FRA 2006) & Titling\n\n• **Objective:** Recognition of Scheduled Tribes and Other Traditional Forest Dwellers' pre-existing rights over forest lands.\n• **Convergence with DILRMP:** Vectorizing Individual Forest Rights (IFR) and Community Forest Rights (CFR) titles prevents arbitrary eviction and land diversion.\n• **State Focus:** Priority pilot projects underway in tribal pockets of Jharkhand, Chhattisgarh, and Odisha to map community forest resource boundaries using mobile DGPS.`;
  }

  if (q.includes('urban') || q.includes('corridor') || q.includes('pmay') || q.includes('housing') || q.includes('masterplan')) {
    return `### Urban-Rural Land Transition & Corridors\n\n• **Peri-Urban Expansion:** Land consumption along major infrastructure corridors (Delhi-Meerut RRTS, DMIC) is expanding at 1.8% to 3.2% annually.\n• **PMAY Alignment:** Over 162 Tier-2 and Tier-3 urban development authorities utilize land pooling mechanisms to provide affordable housing parcels while preserving fertile agricultural zones.`;
  }

  // General helpful synthesis
  return `### Land Governance Intelligence Synthesis\n\nRegarding your query on **"${query}"**:\n\n• The National Digital Platform integrates data across **DoLR, Survey of India, ISRO Bhuvan, and NJDG**.\n• You can explore related spatial patterns in the **GIS Visualization Hub**, run predictive budget simulations in the **Policy Simulator**, or download verified academic papers and government gazettes in the **Document Repository**.\n\n*Tip: Try asking about "DILRMP status", "Bhu-Aadhaar ULPIN", "Top disputed states", or "SVAMITVA economic impact"!*`;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userQuery = text.trim();
    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: userQuery };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Fast, responsive domain simulation without external API dependency
    setTimeout(() => {
      setIsTyping(false);
      const answer = generateDomainResponse(userQuery);
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer
      };
      setMessages(prev => [...prev, newAssistantMessage]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#1A5276] text-white rounded-full shadow-2xl flex items-center justify-center z-50 group border-2 border-white"
            title="Open AI Research Assistant"
          >
            <div className="absolute inset-0 rounded-full bg-[#1A5276] animate-ping opacity-20 group-hover:opacity-40"></div>
            <Bot className="w-6 h-6 relative z-10 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F39C12] rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[420px] max-w-[calc(100vw-2rem)] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-300"
          >
            {/* Header */}
            <div className="bg-[#1A5276] p-4 flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-white/15 p-2 rounded-xl border border-white/20">
                  <Bot className="w-5 h-5 text-[#F39C12]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                    AI Land Governance Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-[11px] text-blue-200">Ministry of Rural Development • Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#1A5276] text-white rounded-tr-none shadow-sm'
                      : msg.role === 'system'
                        ? 'bg-amber-50 border border-amber-200 text-slate-800 w-full rounded-xl shadow-xs text-center text-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.role !== 'system' && (
                      <div className="flex items-center space-x-1.5 mb-1 pb-1 border-b border-black/5">
                        {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-[#F39C12]" /> : <User className="w-3.5 h-3.5 text-blue-200" />}
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                          {msg.role === 'assistant' ? 'LandGov AI' : 'You'}
                        </span>
                      </div>
                    )}
                    <div className="leading-relaxed whitespace-pre-wrap text-slate-700 font-sans">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#1A5276]" />
                    <span className="text-xs text-slate-500 font-medium">Synthesizing cadastral intelligence...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 bg-blue-50 text-[#1A5276] border border-blue-200 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about DILRMP, ULPIN, disputes, climate..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-[#1A5276] text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#154360] transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
