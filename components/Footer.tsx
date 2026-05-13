
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewState } from '../types';
import { BRAND_NAME } from '../constants';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Branch Specific Data with Automation Messages
  const bachelorMsg = encodeURIComponent("আসসালামু আলাইকুম, আমি ব্যাচেলর পয়েন্ট (মেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
  const queensMsg = encodeURIComponent("আসসালামু আলাইকুম, আমি কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");

  const bachelorSocials = {
    fb: "https://www.facebook.com/share/1CwaVA5WXK/",
    wa: `https://wa.me/8801628855159?text=${bachelorMsg}`
  };

  const queensSocials = {
    fb: "https://www.facebook.com/share/1AZyBMJreP/",
    wa: `https://wa.me/8801304730566?text=${queensMsg}`
  };

  return (
    <footer className="bg-[#050505] text-white pt-8 md:pt-16 pb-5 md:pb-8 px-3 md:px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-3 md:gap-8 border-b border-white/10 pb-8 md:pb-12 relative z-10 w-full">
        
        {/* 1. Brand Info & Corporate */}
        <div className="space-y-3 md:space-y-6 col-span-1">
          <div>
            <h3 className="text-[18px] sm:text-xl md:text-5xl text-[#D4AF37] font-bold tracking-tight mb-0.5 md:mb-2 drop-shadow-lg leading-none">{BRAND_NAME}</h3>
            <p className="text-[7.5px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/50 font-bold ml-0.5 md:ml-1">The Mother Brand</p>
          </div>
          <p className="text-white/60 font-light leading-snug md:leading-relaxed text-[10px] sm:text-[11px] md:text-sm">
            আমরা বিলাসিতা নয়, সাধ্যের মধ্যে আধুনিক জীবনযাত্রার নিশ্চয়তা দিই।
          </p>
          <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
            <div className="flex items-start gap-2 md:gap-4">
               <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0 mt-0.5 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
               </svg>
               <div>
                  <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-0.5 md:mb-1">Hotline</p>
                  <p className="text-[11px] sm:text-[12px] md:text-xl font-bold text-white tracking-wide">01975-207000</p>
               </div>
            </div>
            <div className="flex items-start gap-2 md:gap-4">
               <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0 mt-0.5 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
               <div>
                  <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-0.5 md:mb-1">Email</p>
                  <a href="mailto:info@ayaanayaat.com" className="text-[10px] sm:text-[11px] md:text-sm font-medium text-white hover:text-[#D4AF37] transition-colors break-all">info@ayaanayaat.com</a>
               </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="md:pl-8 flex flex-col h-full col-span-1">
          <h4 className="text-white text-[12px] sm:text-sm md:text-lg mb-2 md:mb-6 flex items-center gap-1.5 md:gap-3">
             <span className="w-3 md:w-8 h-[1px] bg-[#D4AF37]"></span>
             Explore
          </h4>
          <ul className="space-y-2 md:space-y-3 text-white/70 text-[10px] sm:text-[11px] md:text-sm font-medium flex-grow">
            <li><button onClick={() => onNavigate({ type: 'home' })} className="hover:text-[#D4AF37] hover:translate-x-1 md:hover:translate-x-2 transition-all flex items-center gap-1.5 md:gap-3 group"><span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></span> Home</button></li>
            <li>
              <button 
                onClick={() => {
                  const navigate = () => {
                    const el = document.getElementById("queens-point-card");
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setTimeout(() => {
                        el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
                        el.style.transform = "scale(1.05)";
                        el.style.boxShadow = "0 25px 50px -12px rgba(0, 33, 71, 0.25)";
                        el.style.zIndex = "50";
                        setTimeout(() => {
                          el.style.transform = "";
                          el.style.boxShadow = "";
                          el.style.zIndex = "";
                          onNavigate({ type: "female-hostel" });
                        }, 500);
                      }, 600);
                    } else {
                      onNavigate({ type: "female-hostel" });
                    }
                  };
                  if (true) {
                    onNavigate({ type: 'home' });
                    setTimeout(navigate, 400);
                  }
                }} 
                className="hover:text-[#D4AF37] hover:translate-x-1 md:hover:translate-x-2 transition-all flex items-center gap-1.5 md:gap-3 group text-left"
              >
                <span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span> 
                Queens Point
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  const navigate = () => {
                    const el = document.getElementById("bachelor-point-card");
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setTimeout(() => {
                        el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
                        el.style.transform = "scale(1.05)";
                        el.style.boxShadow = "0 25px 50px -12px rgba(0, 33, 71, 0.25)";
                        el.style.zIndex = "50";
                        setTimeout(() => {
                          el.style.transform = "";
                          el.style.boxShadow = "";
                          el.style.zIndex = "";
                          onNavigate({ type: "male-hostel" });
                        }, 500);
                      }, 600);
                    } else {
                      onNavigate({ type: "male-hostel" });
                    }
                  };
                  if (true) {
                    onNavigate({ type: 'home' });
                    setTimeout(navigate, 400);
                  }
                }} 
                className="hover:text-[#D4AF37] hover:translate-x-1 md:hover:translate-x-2 transition-all flex items-center gap-1.5 md:gap-3 group text-left"
              >
                <span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span> 
                Bachelor Point
              </button>
            </li>
            <li><button onClick={() => { onNavigate({ type: 'home' }); setTimeout(() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-[#D4AF37] hover:translate-x-1 md:hover:translate-x-2 transition-all flex items-center gap-1.5 md:gap-3 group text-left leading-tight"><span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span> Upcoming</button></li>
          </ul>
          
          <div className="flex flex-col items-start gap-y-2 md:gap-y-3 mt-4 md:mt-6 text-[8.5px] sm:text-[9.5px] md:text-sm uppercase tracking-widest text-white/90 font-bold">
            <button onClick={() => onNavigate({ type: 'privacy' })} className="hover:text-[#D4AF37] transition-colors text-left leading-tight">Privacy</button>
            <button onClick={() => onNavigate({ type: 'terms' })} className="hover:text-[#D4AF37] transition-colors text-left leading-tight">Terms</button>
            <button onClick={() => onNavigate({ type: 'cookies' })} className="hover:text-[#D4AF37] transition-colors text-left leading-tight">Cookies</button>
          </div>
        </div>

        {/* 3. Social Media - Queens Point (Female) */}
        <div className="col-span-1">
          <h4 className="text-white text-[12px] sm:text-sm md:text-lg mb-2 md:mb-6 flex items-center gap-1.5 md:gap-3 leading-tight">
             <span className="w-3 md:w-8 h-[1px] bg-[#D4AF37]"></span>
             Queens Point
          </h4>
          <p className="text-white/50 text-[10px] md:text-xs mb-3 md:mb-4 leading-relaxed hidden sm:block">Connect with our dedicated female branch team for bookings.</p>
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <a 
              href={queensSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group shrink-0"
              title="Queens Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
              />
            </a>
            <a 
              href={queensSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group shrink-0"
              title="Queens Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-7 md:h-7 group-hover:scale-110 transition-transform"
              />
            </a>
          </div>
          <div className="mt-4 md:mt-6 p-2 md:p-4 bg-white/5 border border-white/10 rounded overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
             <p className="text-[7.5px] sm:text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Female Hotline</p>
             <p className="text-[9.5px] sm:text-[11px] md:text-lg font-medium text-[#D4AF37] leading-none mt-1">01304-730566</p>
          </div>
        </div>

        {/* 4. Social Media - Bachelor Point (Male) */}
        <div className="col-span-1">
          <h4 className="text-white text-[12px] sm:text-sm md:text-lg mb-2 md:mb-6 flex items-center gap-1.5 md:gap-3 leading-tight">
             <span className="w-3 md:w-8 h-[1px] bg-[#D4AF37]"></span>
             Bachelor Point
          </h4>
          <p className="text-white/50 text-[10px] md:text-xs mb-3 md:mb-4 leading-relaxed hidden sm:block">Reach out to our male branch support team for any queries.</p>
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <a 
              href={bachelorSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group shrink-0"
              title="Bachelor Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
              />
            </a>
            <a 
              href={bachelorSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group shrink-0"
              title="Bachelor Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-7 md:h-7 group-hover:scale-110 transition-transform"
              />
            </a>
          </div>
          <div className="mt-4 md:mt-6 p-2 md:p-4 bg-white/5 border border-white/10 rounded overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
             <p className="text-[7.5px] sm:text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Male Hotline</p>
             <p className="text-[9.5px] sm:text-[11px] md:text-lg font-medium text-[#D4AF37] leading-none mt-1">01628-855159</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-8 relative z-10 px-4">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold text-center md:text-left">
          &copy; {new Date().getFullYear()} AyaanAyaat Homes
        </p>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold text-center md:text-right">
          Created by <a href="https://jubayersardar.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors">Jubayer Sardar</a>
        </p>
      </div>

      <div className="flex justify-center mt-6 md:mt-8 relative z-10">
        <button 
          onClick={() => onNavigate({ type: 'admin' })} 
          className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors"
        >
          Admin Panel
        </button>
      </div>
    </footer>
  );
};

export default Footer;
