import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  FileText, 
  Download, 
  Eye, 
  UploadCloud, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  BookOpen,
  X,
  CheckCircle2
} from 'lucide-react';
import { mockDocuments } from '@/data/mockData';
import { DocumentModal } from '@/components/ui/DocumentModal';
import type { Document } from '@/types';
import toast from 'react-hot-toast';

export function Repository() {
  const [docsList, setDocsList] = useState<Document[]>(mockDocuments as Document[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Upload modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadOrg, setUploadOrg] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Research');
  const [uploadAbstract, setUploadAbstract] = useState('');
  const [uploadTags, setUploadTags] = useState('Land Records, DILRMP, GIS');

  const documentTypes = ['All', 'Policy', 'Research', 'Guideline', 'Report', 'Legal', 'Dataset'];

  const filteredDocs = docsList.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || doc.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const featuredDoc = (docsList.find((d: any) => d.type.toLowerCase() === 'policy') as Document) || filteredDocs[0];
  const recommendedDocs = filteredDocs.slice(1, 4);
  const trendingDocs = [...filteredDocs].sort((a, b) => b.downloads - a.downloads).slice(0, 4);
  const recentlyViewed = filteredDocs.slice(4, 9);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadAuthor.trim()) {
      toast.error('Please enter document title and author/organization');
      return;
    }
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: uploadTitle.trim(),
      author: uploadAuthor.trim(),
      organization: uploadOrg.trim() || 'Ministry of Rural Development / ICSSR',
      type: uploadCategory.toLowerCase() as any,
      category: uploadCategory.toLowerCase(),
      publishedAt: new Date().toISOString().split('T')[0],
      abstract: uploadAbstract.trim() || 'Comprehensive research evaluating land governance reforms, spatial integration, and evidence-based policy implementation under DILRMP.',
      tags: uploadTags.split(',').map(t => t.trim()).filter(Boolean),
      views: 1,
      downloads: 0,
      citations: 0,
      isAIIndexed: true,
      coverImage: '/assets/images/cover_dilrmp_study.jpg',
    };
    setDocsList([newDoc, ...docsList]);
    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadAuthor('');
    setUploadOrg('');
    setUploadAbstract('');
    toast.success('Document verified, OCR scanned, and indexed into National Repository!');
  };

  const getTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'policy': return '#1A5276'; // Primary Blue
      case 'guideline': return '#1E8449'; // Success Green
      case 'research': return '#F39C12'; // Accent Amber
      case 'report': return '#8E44AD'; // Purple
      case 'legal': return '#C0392B'; // Crimson Red
      case 'dataset': return '#2980B9'; // Bright Blue
      default: return '#1A5276';
    }
  };

  const getImpactScore = (doc: Document) => {
    if (!doc.views) return 0;
    const score = ((doc.citations * 10) / doc.views) * 100;
    return Math.min(Math.max(score, 10), 100); 
  };

  const renderDocumentCard = (doc: Document, featured = false) => {
    const color = getTypeColor(doc.type);
    const impactScore = getImpactScore(doc);

    return (
      <motion.div
        key={doc.id}
        whileHover={{ scale: 1.015, y: -4 }}
        className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 cursor-pointer overflow-hidden relative group flex flex-col ${featured ? 'md:flex-row' : ''}`}
        onClick={() => setSelectedDoc(doc)}
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1.5`} style={{ backgroundColor: color }}></div>
        
        {/* Thumbnail preview for standard cards */}
        {!featured && doc.coverImage && (
          <div className="h-32 w-full bg-slate-50 border-b border-slate-100 overflow-hidden relative flex items-center justify-center p-2">
            <img 
              src={doc.coverImage} 
              alt={doc.title} 
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              Verified Scan
            </div>
          </div>
        )}

        <div className={`p-5 flex-1 flex flex-col ${featured ? 'md:w-7/12' : ''}`}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-white" style={{ backgroundColor: color }}>
                {doc.type}
              </span>
              {doc.isAIIndexed && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-100 text-indigo-700">
                  <Sparkles className="w-3 h-3" />
                  AI Indexed
                </span>
              )}
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedDoc(doc); }}
                className="flex items-center gap-1 text-xs font-medium text-[#1A5276] bg-blue-50 px-2.5 py-1 rounded hover:bg-blue-100 border border-blue-200"
              >
                <Eye className="w-3.5 h-3.5" /> Read
              </button>
            </div>
          </div>

          <h3 className={`font-bold text-slate-800 mb-2 group-hover:text-[#1A5276] transition-colors ${featured ? 'text-2xl leading-snug' : 'text-base line-clamp-2'}`}>
            {doc.title}
          </h3>
          
          <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
            {doc.abstract}
          </p>

          <div className="mt-auto">
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1 font-medium text-slate-700"><FileText className="w-3.5 h-3.5" /> {doc.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(doc.publishedAt).getFullYear()}</span>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-slate-600"><Eye className="w-3.5 h-3.5 text-slate-400" /> {doc.views.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold text-[#1E8449]"><Download className="w-3.5 h-3.5" /> {doc.downloads.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-2" title={`Impact Score: ${impactScore.toFixed(1)}`}>
                <span className="text-[10px] font-medium text-slate-400">IMPACT</span>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${impactScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {featured && (
          <div className="hidden md:flex w-5/12 bg-slate-50 border-l border-slate-100 p-6 flex-col justify-center items-center relative overflow-hidden">
            {doc.coverImage ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                <img 
                  src={doc.coverImage} 
                  alt={doc.title} 
                  className="max-h-64 object-contain shadow-md rounded border border-slate-200 group-hover:scale-105 transition-transform duration-300"
                />
                <button className="mt-4 px-6 py-2 bg-[#1A5276] text-white rounded-lg text-sm font-semibold hover:bg-[#1A5276]/90 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" /> Open Full Document
                </button>
              </div>
            ) : (
              <>
                <div className="absolute top-0 right-0 p-4 opacity-5 text-[#F39C12]">
                  <BookOpen className="w-32 h-32" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2 relative z-10">Featured Research</h4>
                <p className="text-sm text-slate-500 text-center relative z-10 mb-6">Crucial insights for the ongoing digital India land modernization program.</p>
                <button className="px-6 py-2 bg-[#1A5276] text-white rounded-lg font-medium hover:bg-[#1A5276]/90 transition-colors shadow-sm relative z-10 w-full flex items-center justify-center gap-2">
                  Read Paper <ArrowUpDown className="w-4 h-4 rotate-90" />
                </button>
              </>
            )}
            <div className="absolute bottom-0 left-0 h-1 bg-[#1A5276] animate-[pulse_4s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-[1680px] mx-auto space-y-8 pb-12"
    >
      <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Document Repository</h1>
          <p className="text-slate-500 mt-1">Access, analyze, and manage national land governance records.</p>
        </div>
        
        <div 
          onClick={() => setIsUploadModalOpen(true)}
          className="w-full md:w-auto border-2 border-dashed border-[#1A5276]/30 bg-[#1A5276]/5 hover:bg-[#1A5276]/10 hover:border-[#1A5276]/50 transition-colors rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer group"
        >
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
            <UploadCloud className="w-5 h-5 text-[#1A5276]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A5276]">Drag & Drop or Click to Upload</p>
            <p className="text-xs text-slate-500">Supports PDF, DOCX, GIS files (Max 50MB)</p>
          </div>
        </div>
      </div>

      {featuredDoc && (
        <section>
          {renderDocumentCard(featuredDoc, true)}
        </section>
      )}

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 sticky top-16 z-10">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search within documents, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 mr-2 text-slate-500">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Type:</span>
          </div>
          {documentTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedType === type 
                  ? 'bg-[#1A5276] text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#F39C12]/20 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-[#F39C12]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">AI Recommendations</h2>
              <span className="text-sm text-slate-500 ml-2 border-l border-slate-300 pl-4">Based on your recent activity</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedDocs.map(doc => renderDocumentCard(doc))}
            </div>
          </section>

          <section>
             <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-slate-500" />
              <h2 className="text-xl font-bold text-slate-800">Recently Viewed</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
              {recentlyViewed.map(doc => (
                <div key={doc.id} className="min-w-[300px] w-[300px] snap-start">
                  {renderDocumentCard(doc)}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">All Documents</h2>
              <span className="text-sm text-slate-500 font-medium">{filteredDocs.length} Results</span>
            </div>
            
            {filteredDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map(doc => renderDocumentCard(doc))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900">No documents found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm sticky top-36">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <TrendingUp className="w-5 h-5 text-[#1E8449]" />
              <h3 className="font-bold text-slate-800">Trending Downloads</h3>
            </div>
            <div className="space-y-4">
              {trendingDocs.map((doc, idx) => (
                <div key={doc.id} className="flex gap-3 items-start group cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                  <div className="font-bold text-2xl text-slate-200 group-hover:text-[#1A5276]/30 transition-colors">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-[#1A5276] transition-colors leading-tight">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Download className="w-3 h-3" /> {doc.downloads.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-[#1A5276] hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
              View Analytics Report
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Upload Document Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1A5276] flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Submit Record to National Repository</h3>
                    <p className="text-[11px] text-slate-500">Official DoLR / MoRD Research &amp; Policy Registry</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assessment of Drone RTK Boundary Demarcation in Gorakhpur District"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Lead Author / PI *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Chander (IIT Kanpur)"
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Affiliation / Ministry</label>
                    <input
                      type="text"
                      placeholder="e.g. Survey of India / DST"
                      value={uploadOrg}
                      onChange={(e) => setUploadOrg(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Classification Type</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                    >
                      {['Research', 'Policy', 'Guideline', 'Report', 'Legal', 'Dataset'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Thematic Keywords</label>
                    <input
                      type="text"
                      placeholder="e.g. SVAMITVA, Drone, GIS, Khasra"
                      value={uploadTags}
                      onChange={(e) => setUploadTags(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Executive Abstract</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of findings, econometric methodology, or policy recommendations..."
                    value={uploadAbstract}
                    onChange={(e) => setUploadAbstract(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5276]/20 focus:border-[#1A5276] text-xs font-medium"
                  />
                </div>

                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-[11px] text-slate-600">File verified (PDF / GeoJSON format accepted)</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">Ready to Scan</span>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1A5276] hover:bg-[#154360] text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" /> Index &amp; Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
