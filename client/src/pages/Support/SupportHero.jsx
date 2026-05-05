import React from 'react';
import { motion } from 'framer-motion';

const SupportHero = () => {
  return (
    <section className="relative h-[400px] flex items-center overflow-hidden bg-white">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Support Background"
          className="w-full h-full object-cover opacity-10 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-block text-[#11B573] text-[11px] font-bold uppercase tracking-widest mb-4">
            SUPPORT CENTER
          </span>
          <h1 className="text-4xl md:text-[54px] font-bold mb-6 text-slate-900 tracking-tight leading-tight">
            We're here to help you<span className="text-[#11B573]">.</span>
          </h1>
          <p className="text-[15px] text-slate-600 max-w-lg leading-relaxed font-medium">
            Whether you have a question, found incorrect data,
            or want to suggest a feature — our team is here for you.
          </p>
        </motion.div>
      </div>

      {/* Background illustration decorative elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none hidden md:block">
        <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-40 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default SupportHero;