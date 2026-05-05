import React from 'react';
import { Code2, FileText, Settings2, BarChart2, Code } from 'lucide-react';

const SupportDevResources = () => {
  const devResources = [
    { title: "API Documentation", desc: "View API docs", icon: <FileText size={18} /> },
    { title: "Scoring Methodology", desc: "Understand our scoring", icon: <Settings2 size={18} /> },
    { title: "Data Sources", desc: "Explore our data", icon: <BarChart2 size={18} /> },
    { title: "GitHub Repository", desc: "View on GitHub", icon: <Code size={18} /> }
  ];

  return (
    <section className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="text-[#11B573]">
            <Code2 size={32} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Developer Resources</h2>
            <p className="text-[13px] text-slate-500 mt-1">Everything you need to integrate and build with NeighborhoodIQ.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devResources.map((item, i) => (
            <button
              key={i}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-[#11B573] transition-colors group text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#11B573] flex items-center justify-center shrink-0 group-hover:bg-[#11B573] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
              <ChevronRightIcon className="text-slate-300 group-hover:text-[#11B573] transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChevronRightIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default SupportDevResources;
