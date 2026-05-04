import React, { useState } from 'react';
import { Landmark, Globe, Mail, MessageCircle, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-white/10 md:border-none py-5 md:py-0">
      <div 
        className="flex justify-between items-center w-full cursor-pointer md:cursor-default" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-[17px] md:text-lg font-semibold text-white">{title}</h4>
        <ChevronDown 
          className={`md:hidden text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:!mt-6 ${
          isOpen ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-12 pb-8 md:pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-6 pb-6 md:pb-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-brand-700 rounded-lg">
                <Landmark size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight">NeighborhoodIQ<span className="text-brand-500">.</span></span>
            </div>
            <p className="text-white/80 md:text-white/60 leading-relaxed max-w-[300px] md:max-w-xs text-[15px] md:text-base">
              Empowering real estate decisions with transparent, data-driven neighborhood intelligence across India.
            </p>
            <div className="flex space-x-4">
              {[Globe, Mail, MessageCircle, User].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 md:p-2 bg-white/5 hover:bg-brand-700 rounded-full transition-colors text-white/80 md:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Platform">
            <ul className="space-y-4 text-white/60 text-[15px] md:text-base">
              <li><Link to="/explore" className="hover:text-brand-400 transition-colors">Neighborhood Search</Link></li>
              <li><Link to="/compare" className="hover:text-brand-400 transition-colors">Comparison Tool</Link></li>
              <li><Link to="/login" className="hover:text-brand-400 transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-brand-400 transition-colors">Create Account</Link></li>
              <li><Link to="/support" className="hover:text-brand-400 transition-colors">Contact Support</Link></li>
            </ul>
          </FooterSection>

          {/* Top Cities */}
          <FooterSection title="Top Cities">
            <ul className="space-y-4 text-white/60 text-[15px] md:text-base">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Mumbai</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Bangalore</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">New Delhi</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Chennai</a></li>
            </ul>
          </FooterSection>

          {/* Newsletter */}
          <FooterSection title="Stay Informed">
            <div className="space-y-5 md:space-y-0">
              <p className="text-[15px] md:text-sm text-white/60 mb-0 md:mb-6 leading-relaxed">Subscribe to our monthly market insights<br className="hidden md:block"/> and new area reports.</p>
              <form className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="px-4 py-3.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-500 transition-colors text-[15px] md:text-base text-white placeholder:text-white/40"
                />
                <button type="submit" className="btn-primary w-full py-3.5 md:py-2.5 text-[15px] md:text-base">Subscribe</button>
              </form>
            </div>
          </FooterSection>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[13px] md:text-sm text-white/60 md:text-white/40">
          <div className="text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
            <p className="hidden md:block">© 2024 NeighborhoodIQ Intelligence Platform. Built with transparency.</p>
            <div className="md:hidden flex flex-col gap-1">
              <p>© 2024 NeighborhoodIQ Intelligence Platform.</p>
              <p>Built with transparency.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 md:gap-0 md:space-x-6 order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="md:hidden text-white/40">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="md:hidden text-white/40">|</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
