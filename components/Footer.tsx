
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
    <footer className="bg-[#050505] text-white pt-12 md:pt-16 pb-8 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-12 relative z-10">
        
        {/* 1. Brand Info & Corporate */}
        <div className="space-y-6 lg:col-span-1">
          <div>
            <h3 className="text-4xl md:text-5xl font-serif text-[#D4AF37] font-bold tracking-tight mb-2 drop-shadow-lg">{BRAND_NAME}</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold ml-1">The Mother Brand</p>
          </div>
          <p className="text-white/60 font-light leading-relaxed text-sm">
            আমরা বিলাসিতা নয়, সাধ্যের মধ্যে আধুনিক জীবনযাত্রার নিশ্চয়তা দিই। ঢাকার অন্যতম সেরা ও নিরাপদ হোস্টেল কান্সেল্টেন্সি যা আপনার দ্বিতীয় নিবাস।
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-4">
               <svg className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
               </svg>
               <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">General Hotline</p>
                  <p className="text-xl font-bold text-white tracking-wide">01975-207000</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <svg className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
               <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Email Support</p>
                  <a href="mailto:info@ayaanayaat.com" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">info@ayaanayaat.com</a>
               </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="lg:pl-8 flex flex-col h-full">
          <h4 className="text-white text-lg font-serif mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
             Explore
          </h4>
          <ul className="space-y-3 text-white/70 text-sm font-medium flex-grow">
            <li><button onClick={() => onNavigate({ type: 'home' })} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></span> Home</button></li>
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
                  if (true) { // always available
                    onNavigate({ type: 'home' });
                    setTimeout(navigate, 400);
                  }
                }} 
                className="hover:text-[#D4AF37] hover:translate-x-2 transition-all flex items-center gap-3 group"
              >
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></span> 
                Queens Point (Female)
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
                className="hover:text-[#D4AF37] hover:translate-x-2 transition-all flex items-center gap-3 group"
              >
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></span> 
                Bachelor Point (Male)
              </button>
            </li>
            <li><button onClick={() => { onNavigate({ type: 'home' }); setTimeout(() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></span> Upcoming Projects</button></li>
          </ul>
          
          <div className="flex flex-col items-start gap-y-3 mt-6 text-[11px] md:text-sm uppercase tracking-widest text-white/90 font-bold">
            <button onClick={() => onNavigate({ type: 'privacy' })} className="hover:text-[#D4AF37] transition-colors text-left">Privacy Policy</button>
            <button onClick={() => onNavigate({ type: 'terms' })} className="hover:text-[#D4AF37] transition-colors text-left">Terms of Service</button>
            <button onClick={() => onNavigate({ type: 'cookies' })} className="hover:text-[#D4AF37] transition-colors text-left">Cookie Policy</button>
          </div>
        </div>

        {/* 3. Social Media - Queens Point (Female) */}
        <div>
          <h4 className="text-white text-lg font-serif mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
             Queens Point Hub
          </h4>
          <p className="text-white/50 text-xs mb-4 leading-relaxed">Connect with our dedicated female branch team for bookings and inquiries.</p>
          <div className="flex gap-4">
            <a 
              href={queensSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group"
              title="Queens Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
            </a>
            <a 
              href={queensSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group"
              title="Queens Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-7 h-7 group-hover:scale-110 transition-transform"
              />
            </a>
          </div>
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
             <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Female Hotline</p>
             <p className="text-lg font-medium text-[#D4AF37]">01304-730566</p>
          </div>
        </div>

        {/* 4. Social Media - Bachelor Point (Male) */}
        <div>
          <h4 className="text-white text-lg font-serif mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
             Bachelor Point Hub
          </h4>
          <p className="text-white/50 text-xs mb-4 leading-relaxed">Reach out to our male branch support team for any assistance or booking queries.</p>
          <div className="flex gap-4">
            <a 
              href={bachelorSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group"
              title="Bachelor Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
            </a>
            <a 
              href={bachelorSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white border border-white/10 hover:border-white group"
              title="Bachelor Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-7 h-7 group-hover:scale-110 transition-transform"
              />
            </a>
          </div>
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
             <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Male Hotline</p>
             <p className="text-lg font-medium text-[#D4AF37]">01628-855159</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 relative z-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-bold">
          &copy; {new Date().getFullYear()} AyaanAyaat Homes
        </p>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-bold">
          Created by <a href="https://jubayersardar.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors">Jubayer Sardar</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
