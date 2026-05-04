import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Landmark, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user for design purposes if not logged in
  const displayUser = user || {
    name: 'Dev Singh',
    isPremium: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'
  };

  const handleNavSearch = () => {
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    } else {
      navigate('/search');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Explore', path: '/explore' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isTransparentPage = location.pathname === '/explore' || location.pathname === '/' || location.pathname === '/contact'; // Home is now /
  const isTransparent = !isScrolled && isTransparentPage;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100' : 
      isTransparent ? 'bg-transparent py-4 border-b border-white/10' : 
      'bg-white py-4 shadow-sm border-b border-slate-100'
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-[#11B573] text-white transition-transform group-hover:scale-105">
              <Landmark size={24} strokeWidth={2} />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className={`text-xl font-bold tracking-tight ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                Neighborhood<span className={isTransparent ? 'text-white' : 'text-[#11B573]'}>IQ</span>
              </span>
              <span className={`text-[10px] font-medium ${isTransparent ? 'text-white/60' : 'text-slate-500'}`}>
                Smart Decisions. Better Neighborhoods.
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Links - Absolute Center */}
        <div className="hidden xl:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-all relative py-2 ${
                isActive(link.path) 
                  ? (isTransparent ? 'text-white' : 'text-slate-900') 
                  : (isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-900')
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#11B573] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions - Right aligned */}
        <div className="flex items-center space-x-4 lg:space-x-6 ml-auto">
            {/* Search Bar (Command Palette Style) */}
            <div className="relative group">
              <div className={`flex items-center px-4 py-2 rounded-xl border transition-all group-focus-within:bg-white group-focus-within:border-emerald-500 group-focus-within:shadow-md w-64 lg:w-80 ${
                isTransparent ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
              }`}>
                <Search size={16} className={`shrink-0 mr-3 transition-colors group-focus-within:text-emerald-500 ${
                  isTransparent ? 'text-white/70' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search neighborhoods, cities..."
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavSearch()}
                  className={`bg-transparent border-none outline-none text-sm w-full group-focus-within:text-slate-700 placeholder:text-xs lg:placeholder:text-sm ${
                    isTransparent ? 'text-white placeholder:text-white/60' : 'text-slate-700 placeholder:text-slate-400'
                  }`}
                />
                <div className={`hidden lg:flex items-center px-1.5 py-0.5 rounded border text-[10px] font-bold ml-2 ${
                  isTransparent ? 'bg-white/10 border-white/20 text-white/60' : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  XK
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className={`relative p-2 rounded-full transition-colors ${
              isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-600'
            }`}>
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#11B573] text-[10px] font-bold text-white border-2 border-white">
                3
              </span>
            </button>

            {/* User Profile or Login */}
            {user ? (
              <Link to="/profile" className="flex items-center space-x-3 p-1 pl-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group">
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-bold ${isTransparent ? 'text-white' : 'text-slate-900'}`}>{user.name || 'User'}</span>
                  <span className="text-[10px] font-bold text-[#11B573]">Premium</span>
                </div>
                <div className="relative">
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500/20"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#11B573] border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown size={14} className={`${isTransparent ? 'text-white/60' : 'text-slate-400'} group-hover:text-slate-600`} />
              </Link>
            ) : (
              <Link 
                to="/login" 
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isTransparent 
                    ? 'bg-white text-emerald-600 hover:bg-emerald-50' 
                    : 'bg-[#11B573] text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-4">
            <button className={`p-2 rounded-full ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Bell size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${isTransparent ? 'text-white hover:text-white/80' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 text-base font-bold rounded-xl transition-all ${
                  isActive(link.path) ? 'bg-emerald-50 text-[#11B573]' : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link 
                to="/profile" 
                className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={displayUser.avatar} alt={displayUser.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-base font-bold text-slate-900">{displayUser.name}</div>
                  <div className="text-xs font-medium text-[#11B573]">Premium Member</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
