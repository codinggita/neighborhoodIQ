import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  CloudRain, 
  Wind, 
  ShieldAlert,
  Play,
  History,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DataRefresh = () => {
  const [syncing, setSyncing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [lastSync, setLastSync] = useState(null);

  const syncModules = [
    { id: 'aqi', label: 'Air Quality (AQI)', icon: Wind, source: 'OpenWeather API', frequency: 'Every 1h' },
    { id: 'weather', label: 'Weather Metrics', icon: CloudRain, source: 'OpenWeather API', frequency: 'Every 1h' },
    { id: 'crime', label: 'Safety/Crime Index', icon: ShieldAlert, source: 'Internal Database', frequency: 'Monthly' },
    { id: 'score', label: 'Neighborhood Scores', icon: Database, source: 'Scoring Engine', frequency: 'On-demand' },
  ];

  const handleSync = async (type = 'all') => {
    setSyncing(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/refresh`, { type });
      setTimeout(() => {
        setSyncing(false);
        setLastSync(new Date());
        alert(`${type.toUpperCase()} sync triggered! It will run in the background.`);
      }, 2000);
    } catch (err) {
      console.error('Sync failed:', err);
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Data Synchronization</h2>
        <p className="text-slate-500 text-sm">Monitor and control the freshness of your platform's intelligence.</p>
      </div>

      {/* Hero Sync Card */}
      <div className="bg-[#0F2F20] text-white p-10 rounded-[32px] shadow-2xl shadow-[#0F2F20]/20 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12">
          <RefreshCw size={240} className={syncing ? 'animate-spin-slow' : ''} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <Activity size={12} className="text-[#11B573]" /> System Intelligence
            </div>
            <h3 className="text-4xl font-bold mb-4">Keep your data <span className="text-[#11B573]">alive</span></h3>
            <p className="text-white/60 mb-8 max-w-sm">Trigger a global synchronization to update all neighborhood scores, safety metrics, and environmental data.</p>
            <button 
              onClick={() => handleSync('all')}
              disabled={syncing}
              className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                syncing 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-[#11B573] hover:bg-[#0da368] text-white shadow-xl shadow-[#11B573]/30 hover:scale-105 active:scale-95'
              }`}
            >
              {syncing ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} className="group-hover:fill-current" />}
              {syncing ? 'Synchronizing System...' : 'Start Global Sync'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <Clock className="text-[#11B573] mb-3" size={24} />
              <p className="text-white/40 text-[10px] font-bold uppercase mb-1">Last Sync</p>
              <p className="text-lg font-bold">{lastSync ? lastSync.toLocaleTimeString() : '12m ago'}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <CheckCircle2 className="text-[#11B573] mb-3" size={24} />
              <p className="text-white/40 text-[10px] font-bold uppercase mb-1">API Health</p>
              <p className="text-lg font-bold">99.9%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {syncModules.map((module) => (
          <div key={module.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#11B573]/10 group-hover:text-[#11B573] transition-colors">
                <module.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{module.label}</h4>
                <p className="text-[10px] text-slate-400 font-medium">Source: {module.source} • {module.frequency}</p>
              </div>
            </div>
            <button 
              onClick={() => handleSync(module.id)}
              className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#11B573] hover:bg-[#11B573]/5 rounded-xl transition-all"
              title="Sync this module"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Sync Logs Placeholder */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <History size={20} className="text-slate-400" />
            Recent Sync Logs
          </h3>
          <span className="text-xs font-bold text-[#11B573] bg-[#11B573]/5 px-3 py-1 rounded-full">LIVE LOGS</span>
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'GLOBAL_SYNC', status: 'SUCCESS', time: '12:45 PM', details: 'All 148 areas updated' },
            { action: 'AQI_REFRESH', status: 'SUCCESS', time: '11:00 AM', details: 'No changes detected' },
            { action: 'API_PROBE', status: 'FAILED', time: '09:15 AM', details: 'Network timeout on OpenWeather' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${log.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{log.action}</p>
                  <p className="text-xs text-slate-500">{log.details}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataRefresh;
