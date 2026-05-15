import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Cpu,
  RefreshCcw,
  Sliders
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'scoring', label: 'Scoring Weights', icon: Sliders },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Platform Settings</h2>
          <p className="text-slate-500 text-sm">Configure global parameters and system behavior.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#11B573] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#11B573]/20 hover:scale-[1.02] transition-all">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-grow space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            {activeTab === 'scoring' ? (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Algorithm Configuration</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Air Quality Index', weight: 30, color: 'bg-blue-500' },
                    { label: 'Safety & Crime', weight: 25, color: 'bg-red-500' },
                    { label: 'Healthcare & Schools', weight: 20, color: 'bg-emerald-500' },
                    { label: 'Connectivity & Transit', weight: 15, color: 'bg-purple-500' },
                    { label: 'Commercial POIs', weight: 10, color: 'bg-orange-500' },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="text-slate-900">{item.weight}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.weight}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-300">
                  <Cpu size={48} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h4>
                  <p className="text-sm text-slate-500">Configuration module under implementation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
