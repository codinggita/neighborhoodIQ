import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Shield, 
  ShieldCheck, 
  User as UserIcon, 
  MoreHorizontal, 
  Lock, 
  Unlock, 
  Mail, 
  Calendar,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`);
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, data) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, data);
      setUsers(users.map(u => u._id === userId ? { ...u, ...data } : u));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RoleBadge = ({ role }) => {
    const styles = {
      admin: 'bg-purple-50 text-purple-600 border-purple-100',
      moderator: 'bg-blue-50 text-blue-600 border-blue-100',
      user: 'bg-slate-100 text-slate-500 border-slate-200',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border flex items-center gap-1.5 w-fit ${styles[role] || styles.user}`}>
        {role === 'admin' ? <ShieldCheck size={12} /> : role === 'moderator' ? <Shield size={12} /> : <UserIcon size={12} />}
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500 text-sm">Control user access, roles, and platform integrity.</p>
        </div>
        <div className="flex gap-4 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          <button className="px-4 py-2 bg-[#11B573] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#11B573]/20 transition-all">All Users</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-700 text-sm font-bold transition-all">Admins</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-700 text-sm font-bold transition-all">Blocked</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#11B573] transition-colors text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1,2,3].map(i => <tr key={i}><td colSpan="5" className="px-6 py-8 h-16 bg-slate-50/30 animate-pulse"></td></tr>)
              ) : filteredUsers.map((user) => (
                <tr key={user._id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar size={14} className="text-slate-300" />
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      user.isBlocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleUpdateUser(user._id, { role: user.role === 'admin' ? 'user' : 'admin' })}
                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                        title="Change Role"
                      >
                        <Shield size={16} />
                      </button>
                      <button 
                        onClick={() => handleUpdateUser(user._id, { isBlocked: !user.isBlocked })}
                        className={`p-2 rounded-lg transition-all ${
                          user.isBlocked ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={user.isBlocked ? 'Unblock User' : 'Block User'}
                      >
                        {user.isBlocked ? <Unlock size={16} /> : <Lock size={16} />}
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
