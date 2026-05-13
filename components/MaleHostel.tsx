
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

const malePricingData = [
  { type: 'Economy AC (9-seat)', d1: '599৳', d3: '1699৳', d7: '3499৳', d15: '4999৳', monthly: '7999৳' },
  { type: 'Gold AC (6-seat)', d1: '799৳', d3: '1999৳', d7: '3799৳', d15: '5999৳', monthly: '8499৳' },
  { type: 'Diamond AC (6-seat)', d1: '999৳', d3: '2499৳', d7: '4999৳', d15: '6999৳', monthly: '10500৳' },
  { type: 'Exclusive AC (3-seat)', d1: '1099৳', d3: '2799৳', d7: '5499৳', d15: '7499৳', monthly: '12499৳' },
  { type: 'E. Non AC (8-seat)', d1: '599৳', d3: '1599৳', d7: '3299৳', d15: '4499৳', monthly: '6999৳' },
  { type: 'S. cabin non ac', d1: '799৳', d3: '1999৳', d7: '3799৳', d15: '5999৳', monthly: '8499৳' },
  { type: 'S. room non ac', d1: '899৳', d3: '2599৳', d7: '5299৳', d15: '6999৳', monthly: '11999৳' },
];

const maleWeeklyMenu = [
  { day: 'শুক্রবার', breakfast: 'খিচুড়ি + ডিম', lunch: 'পোলাও + মুরগি/খাসি ভুনা', dinner: 'ভাত + ২ রকমের ভর্তা + ডাল' },
  { day: 'শনিবার', breakfast: 'রুটি + ভাজি + চা', lunch: 'ভাত + ডিম ভুনা + ডাল', dinner: 'ভাত + মাছ ভুনা + ডাল' },
  { day: 'রবিবার', breakfast: 'পরোটা + ভাজি', lunch: 'ভাত + সবজি + মাছ + ডাল', dinner: 'ভাত + মুরগি ভুনা + ডাল' },
  { day: 'সোমবার', breakfast: 'খিচুড়ি + ডিম', lunch: 'ভাত + মাছ ভুনা + ডাল', dinner: 'ভাত + ডিম ভুনা + ডাল' },
  { day: 'মঙ্গলবার', breakfast: 'রুটি + সবজি', lunch: 'ভাত + মুরগি ভুনা + ডাল', dinner: 'ভাত + ২ রকমের ভর্তা + ডাল' },
  { day: 'বুধবার', breakfast: 'পরোটা + ডিম', lunch: 'ভাত + ভর্তা + সবজি + ডাল', dinner: 'ভাত + মুরগি ভুনা + ডাল' },
  { day: 'বৃহস্পতিবার', breakfast: 'পরোটা + ভাজি', lunch: 'ভাত + মাছ ভুনা + ডাল', dinner: 'ভাত + ভর্তা + শাক + ডাল' },
];

const maleGalleryImages = [
  "https://lh3.googleusercontent.com/d/1cjIYSZDiCig4kN1FbLxGIoEUTcdcCU1C",
  "https://lh3.googleusercontent.com/d/1yt_8ehBUySuDxteZ3QApr-gKVAwnv3HW",
  "https://lh3.googleusercontent.com/d/1BgVoDNAGm_A6ZA2MXnLPdOh0XFgXPXdw",
  "https://lh3.googleusercontent.com/d/1AedymDSejFI9ZR7hkJyV2y7ZWR4H7JjB",
  "https://lh3.googleusercontent.com/d/19s1WD9RBnbGIPgvQGXOYXCR9UBXgXSdN",
  "https://lh3.googleusercontent.com/d/1aToNZSjZGY60mRzUlZLwO_7qN-b7wUGn",
  "https://lh3.googleusercontent.com/d/1nauadCwGU3Pdc1ziw6apCXM6_4YOflYA",
  "https://lh3.googleusercontent.com/d/1MPRyL3RNCTXkMAogBqNqPbDRHryTi221",
  "https://lh3.googleusercontent.com/d/1hIP9mDvy_899p6Hw85q5i0kCZdAEId4e",
  "https://lh3.googleusercontent.com/d/1QVrXWuoIc_UJwJ4G2puj89xeyAyNvg5H"
];

const maleFacilitiesList = [
  {
    title: "নিরাপত্তা ও পরিবেশ",
    items: ["সার্বক্ষনিক নিরাপত্তা ও সিসিটিভি ক্যামেরা", "সম্পূর্ণ এরিয়া সিসিটিভি কভারেজ", "সম্পূর্ণ রাজনীতিমুক্ত হোস্টেল", "নিরাপদ ও অভিজাত ব্যাচেলর আবাসন", "শব্দদূষনমুক্ত ও নিরিবিলি পরিবেশ"]
  },
  {
    title: "খাবার ও ডাইনিং",
    items: ["সাপ্তাহিক মেনু অনুযায়ী ৩ বেলা খাবার", "বিশুদ্ধ খাবার পানি (RO Filter)", "কফি কর্নার সুবিধা", "মানসম্মত ও পরিষ্কার ডাইনিং হল"]
  },
  {
    title: "বিনোদন ও রিফ্রেশমেন্ট",
    items: ["আধুনিক জিমনেশিয়াম (Gym)", "ইনডোর প্লে-গ্রাউন্ড", "মনোমুগ্ধকর রুফ-টপ বাগান", "ছাদে আড্ডা দেওয়ার সুন্দর স্থান", "পৃথক Smoking Zone"]
  },
  {
    title: "আবাসন সুবিধা",
    items: ["সম্পূর্ণ AC ও Non-AC রুমের সুবিধা", "১ দিনের প্যাকেজ থেকে শুরু", "বিছানা, টেবিল ও লাইট সুবিধা", "VIP Zone এর বিশেষ সুবিধা", "২৪ ঘণ্টা জেনারেটর ব্যাকআপ"]
  },
  {
    title: "কানেক্টিভিটি ও স্টাডি",
    items: ["হাই-স্পিড WiFi ইন্টারনেট", "ছাত্রদের জন্য স্পেশাল রিডিং জোন", "Dhaka Airport থেকে ১০ মিনিটের দূরত্ব", "ক্যারিয়ার গড়ার উপযুক্ত পরিবেশ"]
  },
  {
    title: "স্বাস্থ্যবিধি ও অন্যান্য",
    items: ["নিজস্ব ক্লিনিং ও হাউসকিপিং ব্যবস্থা", "গরম পানির ব্যবস্থা (Geyser)", "প্রাথমিক চিকিৎসা (First Aid) বক্স", "নামাজ আদায়ের জন্য নিজস্ব স্থান"]
  }
];

interface MaleHostelProps {
  onNavigate: (view: ViewState) => void;
}

const MaleHostel: React.FC<MaleHostelProps> = ({ onNavigate }) => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  
  const [prices, setPrices] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>(() =>
    maleGalleryImages.map((url) => ({ type: 'image', url }))
  );

  useEffect(() => {
    const unsubPrices = onSnapshot(collection(db, 'bachelorpoint_prices'), (snapshot) => {
      setPrices(snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>a.order-b.order));
    });
    const unsubMenu = onSnapshot(collection(db, 'bachelorpoint_menu'), (snapshot) => {
      setMenu(snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>a.order-b.order));
    });
    const unsubGallery = onSnapshot(collection(db, 'bachelorpoint_gallery'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>b.createdAt-a.createdAt);
      if (items.length > 0) {
        setGallery(items);
      }
    });
    return () => { unsubPrices(); unsubMenu(); unsubGallery(); };
  }, []);

  const branchPhoneRaw = "01628855159";
  const branchPhoneFormatted = "01628-855159";
  const waMessage = encodeURIComponent("আসসালামু আলাইকুম, আমি ব্যাচেলর পয়েন্ট (মেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
  const branchMapLink = "https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9";
  const facebookLink = "https://www.facebook.com/share/1CwaVA5WXK/";

  const scrollToPackages = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative font-sans text-[#002147] bg-[#f8f9fa] overflow-hidden">
      {/* Back Button */}
      <div className="fixed top-24 left-4 md:top-32 md:left-8 z-[100]">
        <button 
          onClick={() => {
            onNavigate({ type: 'home' });
            setTimeout(() => {
              const el = document.getElementById("our-branches");
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
          }}
          className="group flex items-center justify-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-lg transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider hidden sm:block">Back</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-all transform hover:rotate-90 duration-300 z-[10000] bg-black/40 rounded-full p-3"
              onClick={() => setSelectedMedia(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-12 lg:p-20"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'video' ? (
                <video controls autoPlay className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg sm:rounded-2xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)] border border-white/10" src={selectedMedia.url} />
              ) : (
                <img
                  src={selectedMedia.url}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg sm:rounded-2xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)] border border-white/10"
                  alt="Enlarged view"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Space */}
      <div className="h-20 md:h-24 bg-[#002147]"></div>

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] bg-[#002147] flex items-center justify-center text-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://lh3.googleusercontent.com/d/1cjIYSZDiCig4kN1FbLxGIoEUTcdcCU1C" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Bachelor Point Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/40 to-[#002147]/20"></div>
        <div className="relative z-10 px-4 md:px-6 max-w-5xl -translate-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></div>
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[9px] md:text-xs font-bold leading-none mt-0.5">A Premium Initiative by AyaanAyaat Homes</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[44px] sm:text-6xl md:text-7xl lg:text-9xl text-white mb-6 leading-[1.1] md:leading-[0.9] drop-shadow-2xl"
          >
            Bachelor Point
            <span className="sr-only"> Hostel, a subsidiary of AyaanAyaat Homes. Quality accommodation similar to Police Point.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            বিলাসবহুল ও আধুনিক ব্যাচেলর লাইফস্টাইলের জন্য সেরা ঠিকানা। আপনার ক্যারিয়ারের শুরু হোক একটি সুন্দর ও নিরাপদ পরিবেশে।
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-4 w-full"
          >
            <button 
              onClick={scrollToPackages}
              className="w-auto relative group overflow-hidden bg-[#D4AF37] text-[#002147] px-4 py-2 sm:px-10 sm:py-4 rounded-full text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-widest shadow-[0_15px_40px_-5px_rgba(212,175,55,0.4)] transition-all whitespace-nowrap flex-1 sm:flex-none"
            >
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">
                প্যাকেজ-সমূহ
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5 sm:w-4 sm:h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </button>

            <a 
              href={facebookLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-auto flex items-center justify-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-6 sm:py-4 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-widest transition-all whitespace-nowrap flex-1 sm:flex-none"
            >
              Facebook
            </a>

            <a 
              href={`https://wa.me/88${branchPhoneRaw}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto flex items-center justify-center gap-1 sm:gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/80 border border-[#25D366]/50 backdrop-blur-md text-white px-3 py-2 sm:px-6 sm:py-4 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-widest transition-all whitespace-nowrap flex-1 sm:flex-none"
            >
              WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* LOCATION STRIP */}
      <section className="relative z-30 px-4 -mt-10 md:-mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto bg-white rounded-full shadow-2xl py-2 sm:py-4 flex flex-row items-center justify-between px-3 sm:px-6 md:px-8 border border-gray-100 gap-2 sm:gap-4 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 w-full relative z-10 flex-1">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#002147] to-[#003b80] rounded-full flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.152-.722c1.102-.736 2.531-1.748 3.82-3.114 1.256-1.337 2.162-2.715 2.162-4.565 0-4.639-3.76-8.5-8.5-8.5s-8.5 3.861-8.5 8.5c0 1.85 1.006 3.228 2.262 4.565 1.289 1.366 2.718 2.378 4.02 3.114a16.707 16.707 0 001.152.722zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="text-[#D4AF37] text-[6px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] block mb-0.5 sm:mb-1">Our Location</span>
              <h3 className="text-[#002147] text-[8px] sm:text-sm md:text-base font-bold leading-tight sm:leading-snug truncate sm:whitespace-normal">
                ৩৬৭, গাওয়াইর, দক্ষিণখান, ঢাকা-১২৩০
              </h3>
            </div>
          </div>
          
          <a 
            href={branchMapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-auto shrink-0 flex items-center justify-center gap-1 sm:gap-2 bg-[#f8f9fa] hover:bg-[#D4AF37] hover:text-[#002147] text-[#002147] border border-[#002147]/10 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[7px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300 group relative z-10 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Google </span><span>Maps</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* PRICING (OUR RATES) */}
      <section id="pricing-section" className="py-6 md:py-32 bg-[#f8f9fa] px-4 md:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-20"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">Our Packages</span>
            <h2 className="text-3xl md:text-5xl text-[#002147] font-bold mb-4">আবাসন প্যাকেজ ও ভাড়ার তালিকা</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">(৩ বেলা খাবার এবং অন্যান্য সকল সুবিধাসহ)</p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
            
            <div className="mt-8 inline-flex items-center gap-3 bg-white border border-[#4CAF50]/20 px-6 py-3 rounded-full shadow-sm">
               <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse"></div>
               <p className="text-[#4CAF50] font-bold text-[10px] md:text-sm uppercase tracking-widest">
                  Refundable Security Deposit: 1,000 BDT
               </p>
            </div>
          </motion.div>

          {/* Table View (Consistent across all screens) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl md:rounded-[2rem] shadow-[0_10px_30px_rgba(0,33,71,0.04)] border border-gray-100 overflow-hidden"
          >
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#002147] text-white">
                  <th className="py-2 px-1 text-left pl-2 md:pl-10 text-[8px] sm:text-[10px] md:text-lg font-bold border-r border-white/10 w-1/4">প্যাকেজ এর ধরন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">১ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">৩ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">৭ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">১৫ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37]">৩০ দিন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prices.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors group">
                    <td className="py-2 md:py-4 px-1 text-left pl-2 md:pl-10 font-bold text-[#002147] border-r border-gray-100 text-[8px] sm:text-[10px] md:text-lg">{row.type}</td>
                    <td className="py-2 md:py-4 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d1}</td>
                    <td className="py-2 md:py-4 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d3}</td>
                    <td className="py-2 md:py-4 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d7}</td>
                    <td className="py-2 md:py-4 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d15}</td>
                    <td className="py-2 md:py-4 px-1 font-black text-gray-800 text-[8px] sm:text-[10px] md:text-lg group-hover:text-[#002147] transition-colors">{row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Weekly Menu Section */}
      <section className="py-6 md:py-32 bg-[#f8f9fa] px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,33,71,0.08)] rounded-xl md:rounded-3xl border border-gray-100 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D4AF37] via-[#f4e2a6] to-[#D4AF37]"></div>
          <div className="p-6 md:p-12 text-center relative z-10 border-b border-gray-100 bg-[#fefbf2]">
             <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-white shadow-xl rounded-full p-1 bg-[#f8f9fa] overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/d/1cjIYSZDiCig4kN1FbLxGIoEUTcdcCU1C" className="w-full h-full object-cover rounded-full" alt="Bachelor Point Logo" />
                </div>
                <div className="text-center md:text-left">
                   <h2 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight">ব্যাচেলর পয়েন্ট</h2>
                   <p className="text-sm md:text-xl font-bold text-[#D4AF37] mt-2 uppercase tracking-[0.2em]">সাপ্তাহিক খাবারের তালিকা</p>
                </div>
             </div>
          </div>

          <div className="overflow-hidden relative z-10 w-full pb-2">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#E3F2FD] border-y-2 border-gray-300">
                  <th className="py-2 md:py-6 px-1 md:px-4 text-[10px] md:text-xl font-black text-[#002147] border-r-2 border-gray-300">দিন</th>
                  <th className="py-2 md:py-6 px-1 md:px-4 text-[9px] md:text-xl font-black text-[#002147] border-r-2 border-gray-300">
                    সকালের নাস্তা
                  </th>
                  <th className="py-2 md:py-6 px-1 md:px-4 text-[9px] md:text-xl font-black text-[#002147] border-r-2 border-gray-300">
                    দুপুরের খাবার
                  </th>
                  <th className="py-2 md:py-6 px-1 md:px-4 text-[9px] md:text-xl font-black text-[#002147]">
                    রাতের খাবার
                  </th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, idx) => (
                  <tr key={idx} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-2 md:py-5 px-1 md:px-6 font-black text-[#002147] text-[9px] md:text-lg border-r-2 border-gray-300 bg-[#FDFDFD]">{item.day}</td>
                    <td className="py-2 md:py-5 px-1 md:px-6 font-bold text-gray-700 text-[8px] md:text-base border-r-2 border-gray-300 whitespace-pre-wrap">{item.breakfast}</td>
                    <td className="py-2 md:py-5 px-1 md:px-6 font-bold text-gray-700 text-[8px] md:text-base border-r-2 border-gray-300 whitespace-pre-wrap">{item.lunch}</td>
                    <td className="py-2 md:py-5 px-1 md:px-6 font-bold text-gray-700 text-[8px] md:text-base whitespace-pre-wrap">{item.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 md:p-8 text-center bg-gray-50 border-t-2 border-gray-200 relative z-10">
               <p className="text-xs md:text-sm font-bold text-gray-500">
                  * বাজার দরের উপর ভিত্তি করে কর্তৃপক্ষ যে কোনো সময় মেন্যু পরিবর্তন করতে পারে।
               </p>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-6 md:py-32 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-20"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">GALLERY</span>
            <h2 className="text-3xl md:text-5xl text-[#002147] font-bold mb-4">গ্যালারি</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">আমাদের আধুনিক ও আরামদায়ক পরিবেশের কিছু মুহূর্ত</p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 pb-4 sm:pb-8"
          >
            {gallery.map((item, idx) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                }}
                key={idx} 
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-md sm:rounded-xl md:rounded-3xl bg-gray-200 animate-pulse shadow-sm hover:shadow-md cursor-zoom-in transition-shadow duration-500"
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={`Gallery ${idx + 1}`} 
                    loading="lazy"
                    onLoad={(e) => {
                      (e.target as HTMLElement).parentElement?.classList.remove('animate-pulse');
                    }}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="w-10 h-10 md:w-12 md:h-12 border border-white/40 rounded-full flex items-center justify-center text-white bg-white/20 backdrop-blur-md transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      {item.type === 'video' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      )}
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ALL FEATURES SECTION */}
      <section id="facilities" className="py-6 md:py-32 bg-[#F8FAFC] text-[#002147] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-24"
          >
             <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">ALL FEATURES</span>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5">সব সুযোগ-সুবিধা এক নজরে</h2>
             <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
          >
            {maleFacilitiesList.map((category, idx) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                key={idx} 
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:shadow-[0_20px_40px_rgba(0,33,71,0.08)] transition-all duration-500 group relative overflow-hidden border border-gray-100"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8 text-center sm:text-left">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#002147]/5 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm shrink-0">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                    </div>
                    <h3 className="text-xs sm:text-xl md:text-2xl font-bold text-[#002147] tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">{category.title}</h3>
                 </div>
                 <ul className="space-y-2 sm:space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 sm:gap-4 text-[10px] sm:text-sm text-gray-500 group-hover:text-[#002147]/80 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#D4AF37] rounded-full mt-1 sm:mt-1.5 shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                 </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 md:mt-28 bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_15px_40px_rgba(0,33,71,0.05)] relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002147 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="text-center md:text-left relative z-10 w-full md:w-auto">
                <h4 className="text-3xl md:text-4xl text-[#002147] font-bold mb-3">& Many More...</h4>
                <p className="text-gray-500 text-sm md:text-base max-w-md">আরো বিস্তারিত জানতে এবং যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।</p>
             </div>
             <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full md:w-auto shrink-0 bg-[#f8f9fa] p-4 rounded-3xl border border-gray-100">
                <a href={`tel:${branchPhoneRaw}`} className="flex items-center gap-3 text-[#002147] hover:text-[#D4AF37] font-black text-xl md:text-2xl transition-colors group">
                   <div className="w-12 h-12 bg-white text-[#002147] border border-gray-200 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:animate-bounce">
                         <path d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" />
                      </svg>
                   </div>
                   <span className="font-black drop-shadow-sm">{branchPhoneFormatted}</span>
                </a>
                <div className="hidden sm:block w-[1px] h-10 bg-gray-200"></div>
                <a href="mailto:info.bachelorpoint@gmail.com" className="text-gray-500 text-xs md:text-sm flex items-center gap-2 font-medium hover:text-[#002147] transition-colors group px-2">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                   </svg>
                   <span className="underline decoration-transparent group-hover:decoration-gray-300 transition-colors">info.bachelorpoint@gmail.com</span>
                </a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-8 md:py-12 bg-white px-4 md:px-6">
        <div className="w-[95%] max-w-[1500px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-6 md:mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
              Find Us on <span className="text-[#8CC63F]">Google Map</span>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#F8F9FA] rounded-[24px] md:rounded-[32px] p-4 md:p-6 border border-gray-100 flex-1 flex flex-col justify-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#8CC63F] rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-3 md:mb-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.152-.722c1.102-.736 2.531-1.748 3.82-3.114 1.256-1.337 2.162-2.715 2.162-4.565 0-4.639-3.76-8.5-8.5-8.5s-8.5 3.861-8.5 8.5c0 1.85 1.006 3.228 2.262 4.565 1.289 1.366 2.718 2.378 4.02 3.114a16.707 16.707 0 001.152.722zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#002147] mb-1 md:mb-2">Hostel Address</h3>
              <p className="text-[#002147]/70 text-sm md:text-base font-medium leading-relaxed max-w-md">
                ৩৬৭, গাওয়াইর, দক্ষিণখান, ঢাকা-১২৩০
              </p>
            </motion.div>

            {/* Directions Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0f172a] rounded-[24px] md:rounded-[32px] p-4 md:p-6 text-white flex-1 flex flex-col justify-center relative overflow-hidden"
            >
              {/* Decorative Circles */}
              <div className="absolute -right-20 -top-20 md:top-auto md:-bottom-20 w-40 md:w-60 h-40 md:h-60 border-[20px] md:border-[30px] border-white/5 rounded-full pointer-events-none"></div>
              <div className="absolute -right-20 -top-20 md:top-auto md:-bottom-20 w-60 md:w-80 h-60 md:h-80 border-[20px] md:border-[30px] border-white/5 rounded-full pointer-events-none scale-125"></div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Need Directions?</h3>
                <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4 max-w-md">
                  Call us if you're having trouble finding the location.
                </p>
                <a href={`tel:${branchPhoneRaw}`} className="inline-flex items-center gap-2 text-[#00B4D8] font-bold text-lg md:text-xl hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" clipRule="evenodd" />
                  </svg>
                  +880 1628 855159
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm border border-gray-100 h-[250px] md:h-[350px]"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.8679073015746!2d90.41524659999999!3d23.858823899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5ca77b15a39%3A0x597edfe505aabc6c!2sBachelor%20Point%20Hostel!5e0!3m2!1sen!2sbd!4v1778234936192!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MaleHostel;