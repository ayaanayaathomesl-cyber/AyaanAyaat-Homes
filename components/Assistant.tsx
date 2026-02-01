
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewState } from '../types';

interface AssistantProps {
  currentView: ViewState;
}

const Assistant: React.FC<AssistantProps> = ({ currentView }) => {
  const isBranchView = currentView.type === 'male-hostel' || currentView.type === 'female-hostel';

  const mapLink = currentView.type === 'male-hostel' 
    ? "https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" 
    : "https://maps.app.goo.gl/wAa3pBmE6b6SVWks9";

  const getFloatingWaNumber = () => {
    if (currentView.type === 'female-hostel') return "01304730566";
    if (currentView.type === 'male-hostel') return "01628855159";
    return "01975207000"; // Main Hotline for Home Page
  };
  
  const getWaMessage = () => {
    if (currentView.type === 'female-hostel') {
      return encodeURIComponent("আসসালামু আলাইকুম, আমি কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
    } else if (currentView.type === 'male-hostel') {
      return encodeURIComponent("আসসালামু আলাইকুম, আমি ব্যাচেলর পয়েন্ট (মেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
    }
    // Main Home Page Message
    return encodeURIComponent("Assalamu Alaikum");
  };

  const getTooltipText = () => {
    if (isBranchView) return "Book Now";
    return null; 
  };

  const tooltipText = getTooltipText();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">
      
      {/* Location Button - Only shows on Branch Views */}
      {isBranchView && (
        <a 
          href={mapLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border border-gray-100 group relative animate-float-mini"
          title="Our Location on Google Maps"
        >
           {/* Original Google Maps Icon */}
           <img 
             src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
             alt="Google Maps" 
             className="w-7 h-7 md:w-9 md:h-9"
           />
           <span className="absolute right-full mr-4 bg-[#EA4335] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Location</span>
        </a>
      )}

      {/* WhatsApp Button - Shows on All Views (Dynamic Number) */}
      <a 
        href={`https://wa.me/88${getFloatingWaNumber()}?text=${getWaMessage()}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border border-gray-100 animate-whatsapp animate-float-mini group relative"
        title="WhatsApp Us"
      >
        {/* Original WhatsApp Icon */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-8 h-8 md:w-10 md:h-10"
        />
        {tooltipText && (
          <div className="absolute right-full mr-5 pointer-events-none">
             <span className="bg-[#25D366] text-white text-[12px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.5)] border-2 border-white/20 flex items-center gap-2 animate-float-mini">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                {tooltipText}
             </span>
             <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-[#25D366] rotate-45 border-r border-t border-white/20"></div>
          </div>
        )}
      </a>
    </div>
  );
};

export default Assistant;
