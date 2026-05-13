import React from 'react';
import { ViewState } from '../types';

interface MobileNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center px-1 pt-1.5 pb-1 max-w-md mx-auto">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className={`relative flex flex-col items-center justify-center w-full py-1 transition-all duration-300 ${
            currentView.type === 'home' ? 'text-[#D4AF37]' : 'text-[#002147]/40 hover:text-[#002147]/70'
          }`}
        >
          <div className={`flex flex-col items-center transition-transform duration-300 ${currentView.type === 'home' ? '-translate-y-0.5' : ''}`}>
            <svg className="w-[18px] h-[18px] mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentView.type === 'home' ? 2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wider uppercase">Home</span>
          </div>
          {currentView.type === 'home' && (
            <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_rgba(212,175,55,0.6)]"></span>
          )}
        </button>

        <button
          onClick={() => onNavigate({ type: 'female-hostel' })}
          className={`relative flex flex-col items-center justify-center w-full py-1 transition-all duration-300 ${
            currentView.type === 'female-hostel' ? 'text-[#D4AF37]' : 'text-[#002147]/40 hover:text-[#002147]/70'
          }`}
        >
          <div className={`flex flex-col items-center transition-transform duration-300 ${currentView.type === 'female-hostel' ? '-translate-y-0.5' : ''}`}>
            <svg className="w-[18px] h-[18px] mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentView.type === 'female-hostel' ? 2 : 1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wider uppercase">Queens</span>
          </div>
          {currentView.type === 'female-hostel' && (
            <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_rgba(212,175,55,0.6)]"></span>
          )}
        </button>

        <button
          onClick={() => onNavigate({ type: 'male-hostel' })}
          className={`relative flex flex-col items-center justify-center w-full py-1 transition-all duration-300 ${
            currentView.type === 'male-hostel' ? 'text-[#D4AF37]' : 'text-[#002147]/40 hover:text-[#002147]/70'
          }`}
        >
          <div className={`flex flex-col items-center transition-transform duration-300 ${currentView.type === 'male-hostel' ? '-translate-y-0.5' : ''}`}>
            <svg className="w-[18px] h-[18px] mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentView.type === 'male-hostel' ? 2 : 1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wider uppercase">Bachelor</span>
          </div>
          {currentView.type === 'male-hostel' && (
            <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_rgba(212,175,55,0.6)]"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
