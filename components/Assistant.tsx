
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
    <div className="fixed bottom-[60px] lg:bottom-6 right-4 lg:right-6 z-[100] flex flex-col items-end gap-3 lg:gap-4 font-sans">
      
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
      <div className="flex items-center gap-3 group">
        <a 
          href={`https://wa.me/88${getFloatingWaNumber()}?text=${getWaMessage()}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#F8F9FA] shadow-sm border border-gray-100 rounded-lg py-2.5 px-4 hover:shadow-md transition-all hidden md:block"
        >
          <div className="flex flex-col text-[14px] leading-[1.2]">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Need Help?</span>
              <span className="font-bold text-gray-900 tracking-tight">Chat</span>
            </div>
            <div className="font-bold text-gray-900 tracking-tight text-left">
              with us
            </div>
          </div>
        </a>

        <div className="relative flex items-center justify-center">
          {/* Mobile Pulse Animation Ring */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-60 md:hidden"></div>
          <a 
            href={`https://wa.me/88${getFloatingWaNumber()}?text=${getWaMessage()}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="relative z-10 w-10 h-10 md:w-[60px] md:h-[60px] bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all active:scale-95 animate-heartbeat"
            title="WhatsApp Us"
          >
            {/* White WhatsApp Icon */}
            <svg className="w-5 h-5 md:w-9 md:h-9 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
