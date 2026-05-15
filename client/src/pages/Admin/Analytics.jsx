import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area as RechartsArea 
} from 'recharts';
import { 
  TrendingUp, 
  Search, 
  Map, 
  Bookmark, 
  Globe, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/analytics`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#11B573]"></div>
  </div>;

  const { searchStats, usageTrend } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Analytics</h2>
          <p className="text-slate-500 text-sm">Deep insights into user behavior and platform performance.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {['7D', '30D', '90D', '1Y'].map(range => (
            <button key={range} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${range === '7D' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Search size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={10} /> 14%
            </span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Searches</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{searchStats.totalSearches.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Bookmark size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={10} /> 22%
            </span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Saves / Wishlist</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">842</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              <ArrowDownRight size={10} /> 2%
            </span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Engagement Rate</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">64.2%</h3>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-900">User Activity Trend</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
              <Calendar size={14} /> Last 7 Days
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageTrend}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#11B573" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#11B573" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <RechartsArea type="monotone" dataKey="users" stroke="#11B573" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-900">Most Searched Cities</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
              <Globe size={14} /> Geographical Distribution
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={searchStats.topCities} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="city" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#475569'}} width={80} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Popular Neighborhoods Table */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Map size={20} className="text-[#11B573]" />
          Top Saved Neighborhoods
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchStats.popularNeighborhoods.map((hood, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#11B573] transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-[#11B573] transition-colors">
                  <Bookmark size={16} />
                </div>
                <span className="text-[10px] font-black text-slate-300">#0{idx + 1}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{hood.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{hood.saves} people saved this</p>
              <div className="mt-4 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#11B573] transition-all duration-1000" 
                  style={{ width: `${(hood.saves / 85) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
