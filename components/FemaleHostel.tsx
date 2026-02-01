
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ViewState } from '../types';

const weeklyMenuData = [
  { day: 'শুক্রবার', breakfast: 'খিচুড়ি + ডিম', lunch: 'পোলাও + খাসি ভুনা', dinner: 'ভাত + ২ রকমের ভর্তা + ডাল' },
  { day: 'শনিবার', breakfast: 'টোস্টার ৩ টি', lunch: 'ভাত + ডিম ভুনা + ডাল', dinner: 'ভাত + মাছ ভুনা + ডাল' },
  { day: 'রবিবার', breakfast: 'পরোটা + ভাজি', lunch: 'ভাত + মুড়ি ঘন্ট + ভাজি', dinner: 'ভাত + মুরগি ভুনা + ডাল' },
  { day: 'সোমবার', breakfast: 'টোস্টার ৩ টি', lunch: 'ভাত + মাছ ভুনা + ডাল', dinner: 'ভাত + ডিম ভুনা + ডাল' },
  { day: 'মঙ্গলবার', breakfast: 'খিচুড়ি + ডিম', lunch: 'ভাত + মুরগি ভুনা + ডাল', dinner: 'ভাত + ২ রকমের ভর্তা + ডাল' },
  { day: 'বুধবার', breakfast: 'টোস্টার ৩ টি', lunch: 'ভাত + ভর্তা + সবজি + ডাল', dinner: 'ভাত + মুরগি ভুনা + ডাল' },
  { day: 'বৃহস্পতিবার', breakfast: 'পরোটা + ভাজি', lunch: 'ভাত + মাছ ভুনা + ডাল', dinner: 'ভাত + ভর্তা + শাক + ডাল' },
];

const galleryImages = [
  "https://lh3.googleusercontent.com/d/1Am766gEGx3x44xv1ORTozmMfW4G0kfXH",
  "https://lh3.googleusercontent.com/d/1zEZkBathjjZ_9ezngl_Ad2wVhSIsHGBC",
  "https://lh3.googleusercontent.com/d/19BuBHd3afaxjsafHmHB1kODDxv45WndV",
  "https://lh3.googleusercontent.com/d/1zD2ERUm8_CtiMv4tiOOwJkqP-X2A8wVG",
  "https://lh3.googleusercontent.com/d/1CqzelzJ0cvoXO6GQIpTOFAZLiXEODOLA",
  "https://lh3.googleusercontent.com/d/1QLZwXqv7MbXhSZoYAbDkiJsG59azYZF2",
  "https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6",
  "https://lh3.googleusercontent.com/d/1QGK3szp8a3InduybcBmshZlNRFc2ZBl0",
  "https://lh3.googleusercontent.com/d/1ShXqJoPnn_uuXGKky2ipd4Ereuoomfen",
  "https://lh3.googleusercontent.com/d/1XYn7Zlwsn6grQdlCtMme1x9lFWrziE4L",
  "https://lh3.googleusercontent.com/d/1yFDpgnZ8qbDcOZNTrXKs9lbyWePBmIGx",
  "https://lh3.googleusercontent.com/d/11ZiNZEt5kmzOSTg2AE5j987GKm6WM-tu"
];

const facilitiesList = [
  {
    title: "Safety & Security",
    items: ["24x7 security guards", "CCTV surveillance", "Biometric/Smart-card entry", "Strict visitor rules", "Firefighting system"]
  },
  {
    title: "Food & Dining",
    items: ["Hygienic meals (3 Times)", "Filtered drinking water", "Common dining hall", "Monthly buffet", "Hygienic environment"]
  },
  {
    title: "Recreation & Amenities",
    items: ["Green Rooftop with cafe (24x7)", "Gymnasium", "Prayer/Meditation room", "TV/Common room", "BBQ station", "Indoor game zone", "Pet zone (Cat & Birds)"]
  },
  {
    title: "Accommodation",
    items: ["AC/Non AC single & double room", "Attached/Common bathrooms", "Bed, mattress, comforter", "Bedsheet & pillows, locker", "Geyser & hair dryer"]
  },
  {
    title: "Laundry & Housekeeping",
    items: ["Laundry & Washing machines", "Iron & Clothes-drying area", "Regular room cleaning", "Daily maintenance"]
  },
  {
    title: "Connectivity & Health",
    items: ["High-speed Wi-Fi", "Library", "Generator backup", "Internship opportunities", "First-aid kit (Every floor)", "Doctor consultancy"]
  }
];

const FemaleHostel: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const branchPhoneNumber = "01304-730566";
  const branchWaNumber = "01304730566";
  const waBranchMessage = encodeURIComponent("আসসালামু আলাইকুম, আমি কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");

  const pricingData = [
    { type: 'Single Room (AC)', d1: '1500৳', d7: '9750৳', d15: '19100৳', d30: '31500৳', d90: 'Negotiable' },
    { type: 'Single Room (Non AC)', d1: '800৳', d7: '5220৳', d15: '9500৳', d30: '15000৳', d90: '40000৳' },
    { type: '2 Seats (AC)', d1: '1100৳', d7: '7150৳', d15: '13000৳', d30: '20000৳', d90: '55000৳' },
    { type: '4 Seats (AC)', d1: '800৳', d7: '5500৳', d15: '10000৳', d30: '17000৳', d90: '45000৳' },
    { type: '4 Seats (Non AC)', d1: '600৳', d7: '3500৳', d15: '7000৳', d30: '11500৳', d90: '32000৳' },
    { type: '6 Seats (AC)', d1: '600৳', d7: '3500৳', d15: '7000৳', d30: '12000৳', d90: '30000৳' },
    { type: 'AC - VIP', d1: '3000৳', d7: 'Negotiable', d15: 'Negotiable', d30: 'Negotiable', d90: 'Negotiable' },
  ];

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in-up">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border-2 border-white/10" 
            alt="Enlarged view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header Space */}
      <div className="h-20 md:h-24 bg-[#002147]"></div>

      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[85vh] bg-[#002147] flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Queens Point Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/70 via-transparent to-[#002147]"></div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl -translate-y-6">
          <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] md:text-sm font-bold block mb-4 animate-fade-in-up">FEEL THE ROYALTY WITH SAFETY</span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl">Queens Point</h1>
          <p className="text-white/90 text-[13px] md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10 md:mb-12">
            নারীদের জন্য ঢাকার সেরা ও নিরাপদ আবাসন। রাজকীয় পরিবেশ আর আধুনিক সুযোগ-সুবিধার এক অনন্য সমন্বয়।
          </p>

          <div className="flex flex-col items-center gap-5 md:gap-6 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 md:gap-5 w-full md:w-auto">
              <a 
                href="https://www.facebook.com/share/1AZyBMJreP/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group animate-facebook bg-[#1877F2] text-white px-2 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(24,119,242,0.4)] active:scale-95 flex flex-1 md:flex-none items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Facebook
              </a>
              <a 
                href={`https://wa.me/88${branchWaNumber}?text=${waBranchMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-whatsapp bg-[#25D366] text-white px-2 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_15px_35px_-10px_rgba(37,211,102,0.5)] active:scale-95 flex flex-1 md:flex-none items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4 md:w-5 md:h-5">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.061 3.978l-1.127 4.121 4.212-1.105a7.959 7.959 0 0 0 3.785.959h.004c4.367 0 7.927-3.558 7.931-7.927a7.863 7.863 0 0 0-2.327-5.621zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.501c.004-3.623 2.961-6.58 6.586-6.58a6.547 6.547 0 0 1 4.646 1.929 6.547 6.547 0 0 1 1.929 4.646c-.004 3.624-2.963 6.58-6.585 6.58z"/>
                </svg>
                WhatsApp Booking
              </a>
            </div>
            
            <button 
              onClick={scrollToPricing}
              className="shimmer-btn bg-[#D4AF37] text-[#002147] px-12 py-3.5 md:px-20 md:py-5 rounded-full text-xs md:text-sm font-black uppercase shadow-[0_15px_45px_-5px_rgba(212,175,55,0.4)] hover:bg-white hover:scale-105 active:scale-95 transition-all"
            >
              প্যাকেজ-সমূহ
            </button>
          </div>
        </div>
      </section>

      {/* Location Strip */}
      <section className="relative z-30 px-4 -mt-12 md:-mt-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full shadow-[0_20px_60px_-15px_rgba(0,33,71,0.2)] py-4 px-6 md:py-5 md:px-10 border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-8 animate-fade-in-up">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-lg animate-float-mini">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.152-.722c1.102-.736 2.531-1.748 3.82-3.114 1.256-1.337 2.162-2.715 2.162-4.565 0-4.639-3.76-8.5-8.5-8.5s-8.5 3.861-8.5 8.5c0 1.85 1.006 3.228 2.262 4.565 1.289 1.366 2.718 2.378 4.02 3.114a16.707 16.707 0 001.152.722zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">(LOCATION)</span>
          </div>
          <div className="flex-1 text-center md:text-left overflow-hidden">
            <h3 className="text-[#002147] text-xs md:text-lg font-bold leading-tight truncate md:whitespace-normal">
              বাড়ি# ১৮৯, রোড# ১৩, সেক্টর # ১০, রানাভোলা এভিনিউ, কামারপাড়া, ঢাকা
            </h3>
          </div>
          <a 
            href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center bg-[#002147] text-white px-8 py-3 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#002147] transition-all shadow-md active:scale-95 group"
          >
            GOOGLE MAPS
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Security Focus Section */}
      <section className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-[2px] bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest">Our Priority</span>
             </div>
             <h2 className="text-2xl md:text-5xl font-serif text-[#002147] mb-4 md:mb-8 leading-tight font-bold">সর্বোচ্চ নিরাপত্তা নিশ্চিতকরণ</h2>
             <p className="text-[14px] md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
               Queens Point-এ আমরা আপনার নিরাপত্তাকে সবথেকে বেশি গুরুত্ব দিই। আমাদের প্রাঙ্গণ ২৪/৭ অভিজ্ঞ মহিলা সিকিউরিটি এবং সিসিটিভি ক্যামেরা দ্বারা নিয়ন্ত্রিত।
             </p>
             <div className="grid grid-cols-2 gap-3 md:gap-6">
                {['২৪/৭ সিসিটিভি', 'মহিলা গার্ড', 'বায়োমেট্রিক এন্ট্রি', 'অগ্নি-নির্বাপক', 'ভিজিটর নীতিমালা', 'সুরক্ষিত পথ'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border-l-4 border-[#D4AF37] shadow-sm">
                     <svg className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                     <span className="font-bold text-[#002147] text-[10px] md:text-sm">{item}</span>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="w-full max-w-[500px] aspect-video bg-[#002147] rounded-3xl overflow-hidden relative shadow-2xl">
               {!isVideoPlaying ? (
                 <div className="w-full h-full cursor-pointer flex items-center justify-center bg-black/40" onClick={() => setIsVideoPlaying(true)}>
                    <div className="w-16 h-16 bg-[#D4AF37] text-[#002147] rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1"><path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"/></svg>
                    </div>
                 </div>
               ) : (
                 <iframe src="https://drive.google.com/file/d/13d55MDXy4Og6DW3L4tgvNiCsAD8OZZFp/preview" className="w-full h-full border-0" allow="autoplay"></iframe>
               )}
            </div>
            
            {/* FACEBOOK BUTTON LINK */}
            <a 
              href="https://www.facebook.com/share/v/17vCHb5wXa/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 bg-[#1877F2] text-white px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg active:scale-95 group animate-facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              WATCH ON FACEBOOK
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-2">OUR RATES</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#002147] font-bold">আবাসন প্যাকেজ ও ভাড়ার তালিকা</h2>
            <p className="text-gray-500 text-[10px] md:text-sm mt-3">(৩ বেলা খাবার এবং অন্যান্য সকল সুবিধাসহ)</p>
            <div className="w-12 md:w-16 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-8 max-w-6xl mx-auto">
            {pricingData.map((row, idx) => {
              const packageWaMessage = encodeURIComponent(`আসসালামু আলাইকুম, আমি কুইন্স পয়েন্টের "${row.type}" প্যাকেজটি সম্পর্কে বিস্তারিত জানতে এবং বুকিং করতে আগ্রহী।`);
              return (row.type !== 'AC - VIP' && (
                <div key={idx} className="bg-white rounded-xl md:rounded-3xl shadow-[0_5px_20px_rgba(0,33,71,0.06)] md:shadow-[0_10px_40px_rgba(0,33,71,0.08)] border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="bg-[#002147] py-2.5 px-3 md:py-4 md:px-6 text-center">
                    <h3 className="text-white font-bold text-[10px] md:text-lg tracking-wide uppercase">{row.type}</h3>
                  </div>
                  <div className="p-3 md:p-8 space-y-3 md:space-y-6 flex-1">
                    <div className="flex justify-between items-center text-[8px] md:text-sm">
                      <span className="text-gray-400 font-bold tracking-widest uppercase">1 DAY</span>
                      <span className="text-[#002147] font-black">{row.d1}</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] md:text-sm">
                      <span className="text-gray-400 font-bold tracking-widest uppercase">7 DAYS</span>
                      <span className="text-[#002147] font-black">{row.d7}</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] md:text-sm">
                      <span className="text-gray-400 font-bold tracking-widest uppercase">15 DAYS</span>
                      <span className="text-[#002147] font-black">{row.d15}</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] md:text-sm">
                      <span className="text-gray-400 font-bold tracking-widest uppercase">30 DAYS</span>
                      <span className="text-[#002147] font-black">{row.d30}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-[#D4AF37] font-black tracking-widest uppercase text-[8px] md:text-sm">90 DAYS</span>
                      <span className="text-[#D4AF37] font-black text-[9px] md:text-xl">{row.d90}</span>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/88${branchWaNumber}?text=${packageWaMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#D4AF37] py-3 md:py-4 text-center border-t border-[#D4AF37]/20 hover:bg-[#002147] transition-all duration-300 group/btn"
                  >
                    <span className="text-[#002147] group-hover/btn:text-[#D4AF37] font-black text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase">BOOK NOW</span>
                  </a>
                </div>
              ));
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section with Lightbox */}
      <section id="gallery" className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-2">GALLERY</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#002147] font-bold">গ্যালারি</h2>
            <p className="text-gray-500 text-[10px] md:text-sm mt-3">আমাদের আধুনিক ও আরামদায়ক পরিবেশের কিছু মুহূর্ত</p>
            <div className="w-12 md:w-16 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md cursor-zoom-in"
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#002147]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-white/50 rounded-full flex items-center justify-center text-white bg-white/10 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Menu */}
      <section className="py-16 md:py-24 bg-[#FAFAFA] px-2 md:px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm border border-gray-200 overflow-hidden relative">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
             <img src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" className="w-96 grayscale" alt="watermark" />
          </div>

          <div className="p-4 md:p-10 text-center relative z-10">
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#D4AF37] rounded-full p-1 bg-white shadow-sm overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" className="w-full h-full object-cover rounded-full" alt="Queens Point Logo" />
                </div>
                <div className="text-center">
                   <h2 className="text-3xl md:text-6xl font-black text-[#002147] tracking-tighter">কুইন্স পয়েন্ট</h2>
                   <p className="text-lg md:text-2xl font-bold text-gray-600 mt-1 uppercase tracking-widest">সাপ্তাহিক খাবারের তালিকা</p>
                </div>
             </div>
          </div>

          <div className="absolute top-4 right-4 md:top-10 md:right-10 w-32 md:w-56 z-20 hidden md:block">
             <div className="bg-[#FFF9C4] p-4 shadow-xl border-l-4 border-red-500 rotate-1 transform-gpu">
                <p className="text-[10px] md:text-xs font-bold text-gray-800 leading-snug">
                   নির্ধারিত সময়ের বাইরে খাবার পরিবেশন করা হবে না। বাজার দরের উপর ভিত্তি করে কর্তৃপক্ষ যে কোনো সময় মেন্যু পরিবর্তন করতে পারে।
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-bl-full shadow-md"></div>
             </div>
          </div>

          <div className="overflow-x-auto relative z-10">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#FDE7E7] border-y-2 border-gray-300">
                  <th className="py-4 md:py-6 px-2 md:px-4 text-sm md:text-xl font-black text-[#002147] border-r-2 border-gray-300">দিন</th>
                  <th className="py-4 md:py-6 px-2 md:px-4 text-sm md:text-xl font-black text-[#002147] border-r-2 border-gray-300">
                    সকালের নাস্তা<br/>
                    <span className="text-[10px] md:text-sm font-bold text-gray-700">(০৭:০০ - ০৯:৩০ টা)</span>
                  </th>
                  <th className="py-4 md:py-6 px-2 md:px-4 text-sm md:text-xl font-black text-[#002147] border-r-2 border-gray-300">
                    দুপুরের খাবার<br/>
                    <span className="text-[10px] md:text-sm font-bold text-gray-700">(০১:৩০ - ০৩:০০ টা)</span>
                  </th>
                  <th className="py-4 md:py-6 px-2 md:px-4 text-sm md:text-xl font-black text-[#002147]">
                    রাতের খাবার<br/>
                    <span className="text-[10px] md:text-sm font-bold text-gray-700">(০৮:৩০ - ১০:৩০ টা)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyMenuData.map((item, idx) => (
                  <tr key={idx} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-2 md:px-6 font-black text-[#002147] text-sm md:text-lg border-r-2 border-gray-300 bg-[#FDFDFD]">{item.day}</td>
                    <td className="py-5 px-2 md:px-6 font-bold text-gray-700 text-[11px] md:text-base border-r-2 border-gray-300">{item.breakfast}</td>
                    <td className="py-5 px-2 md:px-6 font-bold text-gray-700 text-[11px] md:text-base border-r-2 border-gray-300">{item.lunch}</td>
                    <td className="py-5 px-2 md:px-6 font-bold text-gray-700 text-[11px] md:text-base">{item.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden p-4 bg-[#FFF9C4] m-4 rounded-lg border-l-8 border-red-500 shadow-sm text-xs font-bold text-gray-800">
            নির্ধারিত সময়ের বাইরে খাবার পরিবেশন করা হবে না। বাজার দরের উপর ভিত্তি করে কর্তৃপক্ষ যে কোনো সময় মেন্যু পরিবর্তন করতে পারে।
          </div>

          <div className="p-4 md:p-8 text-center bg-gray-50 border-t-2 border-gray-200 relative z-10">
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 md:py-24 bg-[#F8FAFC] text-[#002147] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-2">ALL FEATURES</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold">সব সুযোগ-সুবিধা এক নজরে</h2>
             <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {facilitiesList.map((category, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-[#D4AF37] hover:shadow-xl transition-all group">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#002147]/5 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#002147] tracking-tight group-hover:text-[#D4AF37] transition-colors">{category.title}</h3>
                 </div>
                 <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 bg-white border border-gray-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
             <div className="text-center md:text-left">
                <h4 className="text-2xl font-serif text-[#002147] font-bold mb-2">& Many More...</h4>
                <p className="text-gray-500 text-sm">আরো বিস্তারিত জানতে এবং যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।</p>
             </div>
             <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-[#002147] font-black text-xl md:text-2xl">
                   <div className="w-10 h-10 bg-[#D4AF37] text-[#002147] rounded-full flex items-center justify-center shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                         <path d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" />
                      </svg>
                   </div>
                   <span className="font-black">{branchPhoneNumber}</span>
                </div>
                <div className="text-gray-400 text-xs flex items-center gap-2 font-medium">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#D4AF37]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                   </svg>
                   info.queenspoint@gmail.com
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FemaleHostel;
