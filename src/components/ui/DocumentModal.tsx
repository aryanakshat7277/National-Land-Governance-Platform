import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Share2, Bookmark, BookOpen, Eye, Award, ExternalLink, Sparkles, Check, Copy } from 'lucide-react';
import type { Document } from '@/types';
import toast from 'react-hot-toast';
import { getAssetUrl } from '@/utils/assets';

interface DocumentModalProps {
  doc: Document | null;
  onClose: () => void;
}

export function DocumentModal({ doc, onClose }: DocumentModalProps) {
  const [activeCitation, setActiveCitation] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [showCitation, setShowCitation] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!doc) return null;

  const handleDownloadDoc = () => {
    const content = `================================================================================
GOVERNMENT OF INDIA · MINISTRY OF RURAL DEVELOPMENT
DEPARTMENT OF LAND RESOURCES (DoLR) · BHOOMI-SAMVAAD NATIONAL REPOSITORY
================================================================================
DOCUMENT ARCHIVE CITATION RECORD
Title: ${doc.title}
Author(s): ${doc.author}
Affiliation: ${doc.organization}
Category: ${doc.type.toUpperCase()}
Published: ${new Date(doc.publishedAt).toLocaleDateString('en-IN')}
${doc.doi ? `DOI: https://doi.org/${doc.doi}` : ''}
Verified Status: AI Indexed · National Land Governance Repository

ABSTRACT:
${doc.abstract}

THEMATIC TAGS:
${doc.tags.join(', ')}

OFFICIAL VERIFICATION:
This document has been archived into the National Digital Platform for Research,
Policy Innovation, and Evidence-Based Land Governance under Problem ID SIH26019.
================================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_Archive.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded archive record for: ${doc.title}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Document link copied to clipboard!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from Bookmarks' : 'Saved to Bookmarks');
  };

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary("This document provides a comprehensive analysis of land governance frameworks in India, highlighting recent digitisation efforts under DILRMP. It discusses the integration of spatial and textual data, presenting case studies from three states where block-chain based land registries improved dispute resolution times by 40%. The paper concludes with policy recommendations for scalable infrastructure.");
      setIsSummarizing(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const citations = {
    APA: `${doc.author}. (${new Date(doc.publishedAt).getFullYear()}). ${doc.title}. ${doc.organization}.`,
    MLA: `${doc.author}. "${doc.title}." ${doc.organization}, ${new Date(doc.publishedAt).getFullYear()}.`,
    Chicago: `${doc.author}. "${doc.title}." ${doc.organization} (${new Date(doc.publishedAt).getFullYear()}).`
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-[#1A5276]/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-[#1A5276]" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 line-clamp-1">{doc.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Left side: Metadata Panel */}
            <div className="w-full md:w-2/5 p-6 border-r border-slate-100 overflow-y-auto bg-slate-50/50">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-[#1A5276]/10 text-[#1A5276] rounded-md">
                  {doc.type}
                </span>
                {doc.isAIIndexed && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold bg-[#1E8449]/10 text-[#1E8449] rounded-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Indexed
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">{doc.title}</h1>

              <div className="space-y-3 mb-6">
                <div className="flex text-base">
                  <span className="w-28 text-slate-500 font-semibold">Author</span>
                  <span className="text-slate-800 font-medium flex-1">{doc.author}</span>
                </div>
                <div className="flex text-base">
                  <span className="w-28 text-slate-500 font-semibold">Organization</span>
                  <span className="text-slate-800 font-medium flex-1">{doc.organization}</span>
                </div>
                <div className="flex text-base">
                  <span className="w-28 text-slate-500 font-semibold">Published</span>
                  <span className="text-slate-800 font-medium flex-1">
                    {new Date(doc.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                {doc.doi && (
                  <div className="flex text-base">
                    <span className="w-28 text-slate-500 font-semibold">DOI</span>
                    <a href={`https://doi.org/${doc.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#1A5276] font-semibold hover:underline flex items-center gap-1">
                      {doc.doi}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-800 mb-2">Abstract</h3>
                <p className="text-base text-slate-700 leading-relaxed text-justify">
                  {doc.abstract}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-800 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-sm font-medium bg-slate-200 text-slate-800 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                  <Eye className="w-5 h-5 text-[#1A5276] mb-1" />
                  <span className="text-xl font-black text-slate-800">{doc.views.toLocaleString()}</span>
                  <span className="text-sm font-medium text-slate-500">Views</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                  <Download className="w-5 h-5 text-[#1E8449] mb-1" />
                  <span className="text-xl font-black text-slate-800">{doc.downloads.toLocaleString()}</span>
                  <span className="text-sm font-medium text-slate-500">Downloads</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                  <Award className="w-5 h-5 text-[#F39C12] mb-1" />
                  <span className="text-xl font-black text-slate-800">{doc.citations.toLocaleString()}</span>
                  <span className="text-sm font-medium text-slate-500">Citations</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button 
                  onClick={handleDownloadDoc}
                  className="flex items-center justify-center gap-2 bg-[#1A5276] text-white py-3 rounded-xl hover:bg-[#1A5276]/90 transition-colors font-bold shadow-sm text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button 
                  onClick={() => setShowCitation(!showCitation)}
                  className={`flex items-center justify-center gap-2 border py-3 rounded-xl transition-colors font-bold shadow-sm text-sm sm:text-base ${showCitation ? 'bg-blue-50 border-[#1A5276] text-[#1A5276]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
                  <BookOpen className="w-4 h-4" />
                  Cite
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm text-sm sm:text-base"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center justify-center gap-2 border py-2.5 rounded-lg transition-colors font-medium shadow-sm text-xs sm:text-sm ${isBookmarked ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Bookmark'}
                </button>
              </div>

              {/* Citation Generator */}
              <AnimatePresence>
                {showCitation && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-slate-800">Citation Generator</h4>
                        <div className="flex bg-slate-100 p-0.5 rounded-lg">
                          {(['APA', 'MLA', 'Chicago'] as const).map(format => (
                            <button
                              key={format}
                              onClick={() => setActiveCitation(format)}
                              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                activeCitation === format 
                                  ? 'bg-white text-slate-800 shadow-sm' 
                                  : 'text-slate-500 hover:text-slate-700'
                              }`}
                            >
                              {format}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 relative group">
                        <p className="text-sm text-slate-700 font-serif pr-8">
                          {citations[activeCitation]}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(citations[activeCitation])}
                          className="absolute top-3 right-3 text-slate-400 hover:text-[#1A5276] opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy citation"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Related Documents */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3">Related Documents</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 items-start p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                      <div className="mt-0.5 text-slate-400 group-hover:text-[#1A5276] transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-[#1A5276] transition-colors">
                          Land Records Modernization: Phase {i}
                        </h4>
                        <p className="text-xs text-slate-500">Ministry of Rural Development • 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Preview Area */}
            <div className="w-full md:w-3/5 bg-slate-100 flex flex-col">
              <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>Page 1 / 24</span>
                  <div className="w-px h-4 bg-slate-300"></div>
                  <span>Zoom: 100%</span>
                </div>
                <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing || !!aiSummary}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#1A5276] to-[#2980B9] text-white rounded-full text-sm font-medium hover:shadow-md transition-all disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isSummarizing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  ) : aiSummary ? (
                    <>
                      <Check className="w-4 h-4" />
                      Summary Ready
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      AI Summary
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                <div className="relative w-full max-w-2xl bg-white shadow-xl rounded-sm border border-slate-200 min-h-[800px] p-12">
                  
                  {/* AI Summary Overlay */}
                  <AnimatePresence>
                    {aiSummary && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-[#1A5276]">
                          <Sparkles className="w-16 h-16" />
                        </div>
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                          <div className="bg-[#1A5276] p-1.5 rounded-md text-white">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <h3 className="font-semibold text-[#1A5276]">AI Generated Summary</h3>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed relative z-10">
                          {aiSummary}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Real Document Cover / Simulated PDF Content */}
                  {doc.coverImage ? (
                    <div className="flex flex-col items-center">
                      <div className="rounded-lg shadow-lg border border-slate-200 overflow-hidden max-w-md w-full bg-white mb-6">
                        <img 
                          src={getAssetUrl(doc.coverImage)} 
                          alt={doc.title} 
                          className="w-full h-auto object-contain max-h-[500px]"
                        />
                      </div>
                      <div className="w-full text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
                        Official Document Archive · National Land Governance Geoportal · Verified Digital Stamp
                      </div>
                    </div>
                  ) : (
                    <div className="opacity-40 pointer-events-none space-y-6">
                      <div className="text-center mb-8">
                        <div className="h-6 bg-slate-200 w-3/4 mx-auto rounded mb-4"></div>
                        <div className="h-6 bg-slate-200 w-1/2 mx-auto rounded mb-8"></div>
                        <div className="h-4 bg-slate-200 w-1/4 mx-auto rounded mb-2"></div>
                        <div className="h-4 bg-slate-200 w-1/3 mx-auto rounded"></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-200 w-full rounded"></div>
                        <div className="h-3 bg-slate-200 w-full rounded"></div>
                        <div className="h-3 bg-slate-200 w-11/12 rounded"></div>
                        <div className="h-3 bg-slate-200 w-full rounded"></div>
                        <div className="h-3 bg-slate-200 w-4/5 rounded"></div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
