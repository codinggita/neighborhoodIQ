import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Map, 
  Bookmark, 
  MessageSquare, 
  AlertTriangle, 
  RefreshCw, 
  Activity,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#11B573]"></div>
  </div>;

  const { stats, recentActivity } = data;

  const StatCard = ({ title, value, subValue, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
        <span className="text-xs text-slate-400 font-medium">{subValue}</span>
        {trend && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight size={10} /> {trend}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Platform Health Indicator */}
      <div className="bg-[#0F2F20] text-white p-6 rounded-3xl flex items-center justify-between shadow-xl shadow-[#0F2F20]/10 overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <ShieldCheck size={200} />
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Zap className="text-[#11B573]" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Platform Status: {stats.refreshStatus}</h2>
            <p className="text-white/60 text-sm">System is performing optimally. Last full sync {new Date(stats.lastSync).toLocaleTimeString()}.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#11B573] hover:bg-[#0da368] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#11B573]/20 flex items-center gap-2">
            <RefreshCw size={18} />
            Quick Sync
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          subValue="Registered accounts" 
          icon={Users} 
          color="bg-blue-500" 
          trend="12.5%" 
        />
        <StatCard 
          title="Neighborhoods" 
          value={stats.totalAreas} 
          subValue="Live analyzed areas" 
          icon={Map} 
          color="bg-purple-500" 
          trend="4.2%" 
        />
        <StatCard 
          title="Saved Areas" 
          value={stats.savedAreasCount} 
          subValue="User favorites" 
          icon={Bookmark} 
          color="bg-orange-500" 
          trend="18.9%" 
        />
        <StatCard 
          title="Total Reviews" 
          value={stats.totalReviews} 
          subValue="Verified contributions" 
          icon={MessageSquare} 
          color="bg-emerald-500" 
        />
      </div>

      {/* Secondary Row: Health & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts & Pending */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" />
              Health Alerts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-3">
                  <Clock className="text-amber-600" size={18} />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Score Refresh Needed</p>
                    <p className="text-xs text-amber-600">{stats.pendingScores} areas pending update</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-amber-700 bg-white px-2 py-1 rounded-lg border border-amber-200">FIX NOW</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-red-600" size={18} />
                  <div>
                    <p className="text-sm font-bold text-red-900">Flagged Reviews</p>
                    <p className="text-xs text-red-600">{stats.flaggedIssues} issues detected</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-red-700 bg-white px-2 py-1 rounded-lg border border-red-200">REVIEW</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" />
              Data Sync Status
            </h3>
            <div className="space-y-3">
              {[
                { label: 'AQI API', status: 'Online', time: '12m ago' },
                { label: 'Crime Data', status: 'Syncing', time: 'Just now' },
                { label: 'Map Layers', status: 'Online', time: '2h ago' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 font-medium">{item.time}</span>
                    <span className={`w-2 h-2 rounded-full ${item.status === 'Online' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Admin Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <History className="text-slate-400" size={20} />
              Recent Admin Activity
            </h3>
            <div className="space-y-6">
              {recentActivity && recentActivity.length > 0 ? recentActivity.map((log, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-bold text-xs">
                    {log.admin?.name[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-slate-900">
                        <span className="font-bold">{log.admin?.name}</span> {log.action.toLowerCase().replace('_', ' ')}
                      </p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Target: {log.targetType} ({log.details?.name || log.targetId})</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-slate-400">
                  <Activity size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No recent activity found.</p>
                </div>
              )}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-all">
              VIEW FULL AUDIT LOG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
