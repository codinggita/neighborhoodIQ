import { motion } from 'framer-motion';
import { TrendingUp, PieChart, List } from 'lucide-react';
import SearchBar from '../../components/search/SearchBar';

const ExploreHero = ({ onSearchSelect }) => {
  return (
    <section className="relative min-h-[600px] flex items-center pt-28 pb-16 lg:py-0 lg:pt-24 overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Premium Cityscape"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-400 font-bold tracking-wider text-sm uppercase mb-4 block">
              Make Informed Real Estate Decisions
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explore Neighborhoods.<br />
              Invest with Confidence.
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Access standardized, data-driven insights on 19,000+ neighborhoods across India. 
              Compare, analyze, and choose the right location for your home or next investment.
            </p>

            <div className="mt-10 mb-6">
              <SearchBar onSelect={onSearchSelect} />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid - Bento Box Style */}
        <div className="mt-10 lg:mt-0 grid grid-cols-2 gap-3 w-full max-w-[360px] mx-auto lg:mx-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2">
          
          {/* Top wide card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 bg-[#121A26] border border-[#11B573] rounded-xl py-6 px-4 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(17,181,115,0.1)]"
          >
            <div className="text-[38px] leading-none font-bold text-white mb-1 tracking-tight">19,000+</div>
            <div className="text-slate-300 text-[13px] font-medium tracking-wide">Neighborhoods</div>
          </motion.div>

          {/* Left Column (2 small cards) */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#121A26] border border-[#11B573] rounded-xl p-5 shadow-lg flex flex-col relative"
            >
              <TrendingUp size={16} className="absolute top-4 right-4 text-[#11B573]" strokeWidth={2.5} />
              <div className="text-3xl font-bold text-white mb-1 mt-4 tracking-tight">50+</div>
              <div className="text-slate-300 text-xs font-medium">Data Metrics</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#121A26] border border-[#11B573] rounded-xl p-5 shadow-lg flex flex-col relative"
            >
              <PieChart size={16} className="absolute top-4 right-4 text-[#11B573]" strokeWidth={2.5} />
              <div className="text-3xl font-bold text-white mb-1 mt-4 tracking-tight">100%</div>
              <div className="text-slate-300 text-xs font-medium">Transparent</div>
            </motion.div>
          </div>

          {/* Right Column (1 tall card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#121A26] border border-[#11B573] rounded-xl p-5 shadow-lg flex flex-col relative overflow-hidden h-full"
          >
            <List size={18} className="absolute top-4 right-4 text-[#11B573]" strokeWidth={2.5} />
            <div className="text-4xl font-bold text-white mt-[4.5rem] mb-1 tracking-tight">8</div>
            <div className="text-slate-300 text-[13px] font-medium leading-snug">Key<br/>Categories</div>
            
            {/* Fake Line Graph */}
            <div className="absolute bottom-0 left-0 right-0 h-24 w-full">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-[#11B573]">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,40 L0,32 Q5,35 15,30 T30,22 T45,30 T55,15 T65,22 T75,10 T85,15 T100,5 L100,40 Z" 
                  fill="url(#chartGradient)" 
                />
                <path 
                  d="M0,32 Q5,35 15,30 T30,22 T45,30 T55,15 T65,22 T75,10 T85,15 T100,5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExploreHero;
