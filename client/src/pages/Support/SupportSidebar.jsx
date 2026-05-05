import React from 'react';
import { Monitor, HelpCircle, Briefcase, Rocket, ArrowRight, ArrowUp } from 'lucide-react';

const SupportSidebar = () => {
  const systemStatus = [
    { name: "Data Sync Services", status: "Operational" },
    { name: "API Services", status: "Operational" },
    { name: "Database (MongoDB)", status: "Operational" },
    { name: "Cache (Redis)", status: "Operational" },
    { name: "External Data Sources", status: "Operational" }
  ];

  const faqs = [
    "Why is my crime data showing old?",
    "Why is water quality data unavailable?",
    "How is the NeighborhoodIQ Score calculated?",
    "Where does your data come from?",
    "How often is the data updated?"
  ];

  const forProfessionals = [
    { title: "API Access Request", desc: "Apply for API access", icon: <Briefcase size={16} /> },
    { title: "Bulk Data Inquiry", desc: "Request bulk data or reports", icon: <Briefcase size={16} /> },
    { title: "Partnership Opportunities", desc: "Work with us", icon: <Briefcase size={16} /> }
  ];

  const roadmap = [
    { name: "Commute Time Calculator", votes: 128 },
    { name: "Noise Pollution Metric", votes: 95 },
    { name: "School Rating & Reviews", votes: 82 },
    { name: "Property Price Predictions", votes: 67 },
    { name: "Traffic Congestion Index", votes: 45 }
  ];

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* System Status */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3 text-slate-900">
            <div className="text-[#11B573]">
              <Monitor size={20} />
            </div>
            <h3 className="font-bold text-[15px]">System Status</h3>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#11B573]"></div>
            <span className="text-[10px] text-slate-500">All Systems Operational</span>
          </div>
        </div>

        <div className="space-y-4">
          {systemStatus.map((item, i) => (
            <div key={i} className="flex justify-between items-center group cursor-default">
              <span className="text-[13px] text-slate-700 flex items-center space-x-2">
                <span>{item.name}</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <div className="w-1 h-1 rounded-full bg-[#11B573]"></div>
                <span className="text-[11px] text-[#11B573] font-medium">{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 flex items-center justify-center space-x-2 text-[12px] font-bold text-[#11B573] hover:text-[#0d8555] transition-colors">
          <span>View detailed status</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Quick Help / FAQs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center space-x-3 text-slate-900 mb-6">
          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <HelpCircle size={16} />
          </div>
          <h3 className="font-bold text-[15px]">Quick Help</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <button key={i} className="w-full flex items-center justify-between text-left group">
              <div className="flex items-center space-x-3">
                <HelpCircle size={14} className="text-blue-500 shrink-0" />
                <span className="text-[13px] text-slate-700 group-hover:text-blue-600 transition-colors">{faq}</span>
              </div>
              <ChevronRightIcon className="text-slate-300 group-hover:text-blue-600 transition-colors" />
            </button>
          ))}
        </div>

        <button className="w-full mt-6 flex items-center justify-center space-x-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
          <span>View all FAQs</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* For Professionals */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center space-x-3 text-slate-900 mb-6">
          <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
            <Briefcase size={16} />
          </div>
          <h3 className="font-bold text-[15px]">For Professionals</h3>
        </div>

        <div className="space-y-5">
          {forProfessionals.map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between text-left group">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 text-orange-400">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
              <ChevronRightIcon className="text-slate-300 group-hover:text-orange-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Feature Roadmap */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center space-x-3 text-slate-900 mb-2">
          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <Rocket size={16} />
          </div>
          <h3 className="font-bold text-[15px]">Feature Roadmap</h3>
        </div>
        <p className="text-[11px] text-slate-500 mb-6">Vote for features you want to see next!</p>

        <div className="space-y-4">
          {roadmap.map((item, i) => (
            <div key={i} className="flex items-center space-x-3 group cursor-default">
              <div className="flex items-center space-x-1.5 w-14 shrink-0">
                <div className="w-4 h-4 rounded-full bg-emerald-50 text-[#11B573] flex items-center justify-center">
                  <ArrowUp size={10} strokeWidth={3} />
                </div>
                <span className="text-[12px] font-bold text-slate-900">{item.votes}</span>
              </div>
              <span className="text-[13px] text-slate-700">{item.name}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 flex items-center justify-center space-x-2 text-[12px] font-bold text-purple-600 hover:text-purple-700 transition-colors">
          <span>View full roadmap</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const ChevronRightIcon = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default SupportSidebar;
