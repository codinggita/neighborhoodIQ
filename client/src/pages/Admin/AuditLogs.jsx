import React, { useState, useEffect } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  User, 
  Activity, 
  ChevronRight, 
  ChevronDown,
  Clock,
  Database,
  ShieldAlert
} from 'lucide-react';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/logs`);
      setLogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    if (action.includes('DELETE')) return 'text-red-600 bg-red-50';
    if (action.includes('UPDATE')) return 'text-orange-600 bg-orange-50';
    if (action.includes('CREATE')) return 'text-emerald-600 bg-emerald-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Audit Logs</h2>
        <p className="text-slate-500 text-sm">Monitor all administrative actions and system changes.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1,2,3,4,5].map(i => <tr key={i}><td colSpan="5" className="px-6 py-6 h-12 bg-slate-50/20 animate-pulse"></td></tr>)
              ) : logs.map((log) => (
                <React.Fragment key={log._id}>
                  <tr className="hover:bg-slate-50/30 transition-colors cursor-pointer" onClick={() => setExpandedLog(expandedLog === log._id ? null : log._id)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                          {log.admin?.name?.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{log.admin?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${getActionColor(log.action)}`}>
                        {log.action.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <span className="font-bold text-slate-700">{log.targetType}</span>: {log.targetId}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {expandedLog === log._id ? <ChevronDown size={18} className="text-slate-300" /> : <ChevronRight size={18} className="text-slate-300" />}
                    </td>
                  </tr>
                  {expandedLog === log._id && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 bg-slate-50/50 border-y border-slate-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase">Before Change</h5>
                            <pre className="p-4 bg-white rounded-2xl border border-slate-100 text-[10px] overflow-auto max-h-48 text-slate-600">
                              {JSON.stringify(log.details?.before || {}, null, 2)}
                            </pre>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase">After Change</h5>
                            <pre className="p-4 bg-white rounded-2xl border border-slate-100 text-[10px] overflow-auto max-h-48 text-slate-600">
                              {JSON.stringify(log.details?.after || {}, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
