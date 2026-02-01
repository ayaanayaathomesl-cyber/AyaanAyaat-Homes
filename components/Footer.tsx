
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
    <footer className="bg-[#002147] text-white pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        
        {/* 1. Brand Info */}
        <div className="space-y-6">
          <h3 className="text-3xl font-serif text-[#D4AF37] font-bold">{BRAND_NAME}</h3>
          <p className="text-white/60 font-light leading-relaxed text-sm">
            আমরা বিলাসিতা নয়, সাধ্যের মধ্যে আধুনিক জীবনযাত্রার নিশ্চয়তা দিই। ঢাকার অন্যতম সেরা ও নিরাপদ হোস্টেল সল্যুশন যা আপনার দ্বিতীয় নিবাস।
          </p>
          <div className="pt-2">
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">General Hotline</p>
            <p className="text-lg font-black text-red-500">01975-207000</p>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-black mb-8 border-b border-white/5 pb-2 inline-block">Quick Links</h4>
          <ul className="space-y-4 text-white/70 text-sm font-medium">
            <li><button onClick={() => onNavigate({ type: 'home' })} className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"><span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Home</button></li>
            <li><button className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"><span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Contact Us</button></li>
            <li><button onClick={() => onNavigate({ type: 'female-hostel' })} className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"><span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Queens Point (Female)</button></li>
            <li><button onClick={() => onNavigate({ type: 'male-hostel' })} className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"><span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Bachelor Point (Male)</button></li>
          </ul>
        </div>

        {/* 3. Social Media - Queens Point (Female) */}
        <div>
          <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-black mb-8 border-b border-white/5 pb-2">Queens Point (Female)</h4>
          <div className="flex gap-4">
            <a 
              href={queensSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg bg-white"
              title="Queens Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-full h-full rounded-full"
              />
            </a>
            <a 
              href={queensSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg bg-white"
              title="Queens Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-full h-full"
              />
            </a>
          </div>
          <p className="mt-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">For Female Branch</p>
        </div>

        {/* 4. Social Media - Bachelor Point (Male) */}
        <div>
          <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-black mb-8 border-b border-white/5 pb-2">Bachelor Point (Male)</h4>
          <div className="flex gap-4">
            <a 
              href={bachelorSocials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg bg-white"
              title="Bachelor Point Facebook"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                alt="Facebook" 
                className="w-full h-full rounded-full"
              />
            </a>
            <a 
              href={bachelorSocials.wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg bg-white"
              title="Bachelor Point WhatsApp"
            >
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                 alt="WhatsApp" 
                 className="w-full h-full"
              />
            </a>
          </div>
          <p className="mt-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">For Male Branch</p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
        <p>&copy; 2025 AyaanAyaat Homes. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
