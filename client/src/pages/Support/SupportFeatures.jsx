import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Users, CheckCircle2 } from 'lucide-react';

const SupportFeatures = () => {
  const features = [
    {
      icon: <CheckCircle2 className="text-[#11B573]" size={20} />,
      title: "Data You Can Trust",
      desc: "Powered by 6+ verified sources"
    },
    {
      icon: <Clock className="text-[#11B573]" size={20} />,
      title: "Fast Response",
      desc: "We usually respond within 24 hours"
    },
    {
      icon: <ShieldCheck className="text-[#11B573]" size={20} />,
      title: "Safe & Secure",
      desc: "Your data and privacy are our priority"
    },
    {
      icon: <Users className="text-[#11B573]" size={20} />,
      title: "Built for Everyone",
      desc: "For residents, planners, investors and developers"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 bg-white relative z-20 pt-8 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start space-x-4 cursor-default"
          >
            <div className="w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center shrink-0 bg-transparent">
              {feature.icon}
            </div>
            <div className="pt-1">
              <h3 className="text-[13px] font-bold text-slate-900 leading-tight">{feature.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug pr-4">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SupportFeatures;
