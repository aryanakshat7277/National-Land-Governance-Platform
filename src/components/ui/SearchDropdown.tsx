import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, FileText, ArrowRight, X } from 'lucide-react';
import { mockDocuments } from '@/data/mockData';

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

export function SearchDropdown({ isOpen, onClose, searchQuery }: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Filter mockDocuments based on query
  const results = searchQuery 
    ? mockDocuments.filter((doc: any) => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.author.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.15 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 max-h-[80vh] flex flex-col"
      >
        <div className="overflow-y-auto p-4 flex-1">
          {searchQuery ? (
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Results</h3>
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                      <div className="bg-[#1A5276]/10 p-2 rounded-lg text-[#1A5276] mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-[#1A5276] transition-colors">{doc.title}</h4>
                        <p className="text-xs text-slate-500 truncate">{doc.author} • {doc.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {['Land reforms 2024', 'Digitization acts', 'SVAMITVA scheme impact'].map((term, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-sm text-slate-700">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      {term}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-1">
                  {['Latest Policies', 'State Guidelines', 'Templates'].map((term, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-sm text-slate-700">
                      <ArrowRight className="w-3.5 h-3.5 text-[#1A5276]" />
                      {term}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {searchQuery && results.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button className="text-sm font-medium text-[#1A5276] hover:text-[#2980B9] transition-colors">
              View all results
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
