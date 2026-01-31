
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBranchView = currentView.type === 'male-hostel' || currentView.type === 'female-hostel';
  
  // Dynamic calling logic based on current branch
  const getCallLink = () => {
    if (currentView.type === 'female-hostel') return "tel:01304730566";
    if (currentView.type === 'male-hostel') return "tel:01628855159";
    return "tel:01975207000"; // General Hotline
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#002147]/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.063C4.028 22.5 3.188 21.66 3.188 20.625v-6.198a.529.529 0 01.09-.086L12 5.432z" />
             </svg>
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white leading-none">
              AyaanAyaat <span className="text-[#D4AF37]">Homes</span>
            </h2>
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/60 font-medium">The Mother Brand</p>
          </div>
        </button>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/80">
          <button onClick={() => onNavigate({ type: 'home' })} className="hover:text-[#D4AF37] transition-colors">Home</button>
          <button className="hover:text-[#D4AF37] transition-colors">Values</button>
          <button onClick={() => onNavigate({ type: 'male-hostel' })} className="hover:text-[#D4AF37] transition-colors">Branches</button>
          <button className="hover:text-[#D4AF37] transition-colors">Upcoming</button>
        </div>

        {/* Action Button */}
        {isBranchView ? (
          <a 
            href={getCallLink()}
            className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap bg-[#D4AF37] text-[#002147] hover:bg-white animate-pulse-slow shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
               <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" clipRule="evenodd" />
             </svg>
             Call Now
          </a>
        ) : (
          <a 
            href="tel:01975207000"
            className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap bg-red-600 text-white hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)]"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
               <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" clipRule="evenodd" />
             </svg>
             Hotline
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
