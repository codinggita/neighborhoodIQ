import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Landmark, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardHeader = () => {
  const [navSearch, setNavSearch] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavSearch = () => {
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    } else {
      navigate('/search');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Explore', path: '/explore' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  const isActive = (path) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-8 h-full flex items-center relative">
        
        {/* Logo Section - Left */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-[#11B573] text-white transition-transform group-hover:scale-105 shadow-lg shadow-emerald-100">
              <Landmark size={24} strokeWidth={2} />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Neighborhood<span className="text-[#11B573]">IQ</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Smart Decisions. Better Neighborhoods.
              </span>
            </div>
          </Link>
        </div>

        {/* Nav Links - Absolute Center */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold transition-all relative py-2 ${
                isActive(link.path) ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#11B573] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions - Right aligned */}
        <div className="flex items-center space-x-6 ml-auto">
          {/* Search Bar */}
          <div className="relative group hidden xl:block">
            <div className="flex items-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 transition-all group-focus-within:bg-white group-focus-within:border-emerald-500 group-focus-within:shadow-md w-80">
              <Search size={16} className="text-slate-400 mr-3 shrink-0 group-focus-within:text-emerald-500" />
              <input
                type="text"
                placeholder="Search neighborhoods, cities..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavSearch()}
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400 font-medium"
              />
              <div className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400 flex items-center gap-0.5 ml-2 shadow-sm">
                XK
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#11B573] transition-all">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#11B573] text-[9px] font-bold text-white border-2 border-white">
              3
            </span>
          </button>

          {/* User Profile or Login */}
          {user ? (
            <Link to="/profile" className="flex items-center space-x-3 p-1 pl-4 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-slate-900">{user.name || 'User'}</span>
                <span className="text-[10px] font-black text-[#11B573] uppercase tracking-wider">Premium</span>
              </div>
              <div className="relative">
                <img 
                  src={user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md group-hover:border-emerald-500 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#11B573] border-2 border-white rounded-full"></div>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5" />
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-xl bg-[#11B573] text-white text-sm font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
