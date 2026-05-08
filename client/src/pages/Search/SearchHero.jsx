import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from '../../components/search/SearchBar';

const popularTags = [
  'Powai, Mumbai',
  'Bandra West, Mumbai',
  'Koramangala, Bangalore',
  'Whitefield, Bangalore',
];

const SearchHero = ({ onSearch }) => {
  return (
    <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
          alt="City aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/[0.85] backdrop-blur-[4px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Find the <span className="text-[#11B573]">perfect</span> neighborhood
          </h1>
          <p className="text-slate-500 mb-8 text-lg font-medium">
            Search across 148+ live analyzed areas in India
          </p>

          <div className="max-w-2xl mx-auto shadow-2xl rounded-2xl">
            <SearchBar onSelect={onSearch} placeholder="Enter a city or neighborhood name..." />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#11B573]" />
              Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearch({ name: tag.split(',')[0] })}
                className="px-3 py-1 bg-white hover:bg-[#11B573]/5 text-slate-600 hover:text-[#11B573] border border-slate-200 hover:border-[#11B573]/30 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchHero;
