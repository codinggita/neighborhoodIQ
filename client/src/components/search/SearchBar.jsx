import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSelect, placeholder = "Search for a city or neighborhood..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length > 1) {
        setLoading(true);
        try {
          const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
          const response = await axios.get(`${apiBase}/areas/search?q=${query}`);
          setResults(response.data.results || []);
          setShowDropdown(true);
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (area) => {
    setQuery(area.name);
    setShowDropdown(false);
    if (onSelect) onSelect(area);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-[50]" ref={dropdownRef}>
      <div className={`relative flex items-center bg-white/95 backdrop-blur-xl border-2 transition-all duration-300 rounded-2xl overflow-hidden ${
        showDropdown ? 'border-[#11B573] shadow-lg ring-4 ring-[#11B573]/10' : 'border-slate-200 shadow-md hover:border-[#11B573]/50'
      }`}>
        <div className="pl-5 text-slate-400">
          <Search size={20} strokeWidth={2.5} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full py-4 px-4 bg-transparent text-slate-800 font-bold placeholder:text-slate-400 focus:outline-none text-base md:text-lg"
        />

        {loading ? (
          <div className="pr-5">
            <Loader2 size={20} className="text-[#11B573] animate-spin" />
          </div>
        ) : query && (
          <button onClick={clearSearch} className="pr-5 text-slate-400 hover:text-slate-600">
            <X size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <div className="py-2 max-h-[350px] overflow-y-auto custom-scrollbar">
              {results.map((area) => (
                <button
                  key={area._id}
                  onClick={() => handleSelect(area)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#11B573] group-hover:bg-[#11B573] group-hover:text-white transition-all">
                    <MapPin size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-800">{area.name}</div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {area.city}, {area.state} • Score: {area.score}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
