import React, { useState, useEffect } from "react";
import { ViewState } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

const weeklyMenuData = [
  {
    day: "শুক্রবার",
    breakfast: "খিচুড়ি + ডিম",
    lunch: "পোলাও + খাসি ভুনা",
    dinner: "ভাত + ২ রকমের ভর্তা + ডাল",
  },
  {
    day: "শনিবার",
    breakfast: "টোস্টার ৩ টি",
    lunch: "ভাত + ডিম ভুনা + ডাল",
    dinner: "ভাত + মাছ ভুনা + ডাল",
  },
  {
    day: "রবিবার",
    breakfast: "পরোটা + ভাজি",
    lunch: "ভাত + মুড়ি ঘন্ট + ভাজি",
    dinner: "ভাত + মুরগি ভুনা + ডাল",
  },
  {
    day: "সোমবার",
    breakfast: "টোস্টার ৩ টি",
    lunch: "ভাত + মাছ ভুনা + ডাল",
    dinner: "ভাত + ডিম ভুনা + ডাল",
  },
  {
    day: "মঙ্গলবার",
    breakfast: "খিচুড়ি + ডিম",
    lunch: "ভাত + মুরগি ভুনা + ডাল",
    dinner: "ভাত + ২ রকমের ভর্তা + ডাল",
  },
  {
    day: "বুধবার",
    breakfast: "টোস্টার ৩ টি",
    lunch: "ভাত + ভর্তা + সবজি + ডাল",
    dinner: "ভাত + মুরগি ভুনা + ডাল",
  },
  {
    day: "বৃহস্পতিবার",
    breakfast: "পরোটা + ভাজি",
    lunch: "ভাত + মাছ ভুনা + ডাল",
    dinner: "ভাত + ভর্তা + শাক + ডাল",
  },
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
  "https://lh3.googleusercontent.com/d/11ZiNZEt5kmzOSTg2AE5j987GKm6WM-tu",
];

const facilitiesList = [
  {
    title: "নিরাপত্তা",
    items: [
      "২৪/৭ নিরাপত্তা প্রহরী ও প্রবেশ-বাহির নিয়ন্ত্রণ",
      "কমন এরিয়ায় সিসিটিভি নজরদারি",
      "বায়োমেট্রিক/ স্মার্ট কার্ড এন্ট্রি",
      "কঠোর ভিজিটর নীতিমালা",
      "অগ্নি নির্বাপণ ব্যবস্থা",
    ],
  },
  {
    title: "খাবার",
    items: [
      "স্বাস্থ্যসম্মত খাবার (সকাল, দুপুর ও রাতের)",
      "ফিল্টার করা বিশুদ্ধ পানি",
      "কমন ডাইনিং হল",
      "মাসিক বুফে",
    ],
  },
  {
    title: "আবাসন সুবিধা",
    items: [
      "এসি/ নন-এসি সিঙ্গেল ও ডাবল রুম",
      "বেড, ম্যাট্রেস ও কমফোর্টার",
      "বেডশিট ও বালিশ (কভারসহ), লকার",
      "সংযুক্ত/ কমন বাথরুম",
      "গিজার ও হেয়ার ড্রায়ার",
    ],
  },
  {
    title: "বিনোদন ব্যবস্থা",
    items: [
      "সবুজ ছাদ ও ক্যাফে (২৪/৭ খোলা)",
      "টিভি/ কমন রুম ও ইনডোর গেম জোন",
      "জিমনেসিয়াম ও নামাজ কক্ষ",
      "মিনি সুপার শপ ও BBQ স্টেশন",
      "পোষা প্রাণীর জোন (বিড়াল ও পাখি)",
      "স্কুটি পার্কিং ও দৈনিক পত্রিকা",
    ],
  },
  {
    title: "লন্ড্রি ও হাউসকিপিং",
    items: [
      "লন্ড্রি রুম/ ওয়াশিং মেশিন",
      "ইস্ত্রি ও কাপড় শুকানোর জায়গা",
      "নিয়মিত রুম পরিষ্কার",
    ],
  },
  {
    title: "কানেক্টিভিটি ও স্বাস্থ্য সহায়তা",
    items: [
      "হাই-স্পিড ওয়াই-ফাই ও জেনারেটর সুবিধা",
      "লাইব্রেরি ও ইন্টার্নশিপ সুবিধা",
      "প্রতিটি ফ্লোরে ফার্স্ট-এইড কিট",
      "ডক্টর কনসালটেন্সি ও মেন্টর সাপোর্ট",
    ],
  },
];

const initialPricingData = [
    { type: "৬ সিট (নন এসি)", d1: "৫০০/-", d7: "৩০০০/-", d15: "৫০০০/-", d30: "৯০০০/-" },
    { type: "৪ সিট (নন এসি)", d1: "৬০০/-", d7: "৩৫০০/-", d15: "৬০০০/-", d30: "১০৫০০/-" },
    { type: "২ সিট (নন এসি)", d1: "৯০০/-", d7: "৬০০০/-", d15: "৯০০০/-", d30: "১৫০০০/-" },
    { type: "সিঙ্গেল কেবিন (নন এসি)", d1: "৮০০/-", d7: "৫২০০/-", d15: "৯০০০/-", d30: "১৫০০০/-" },
    { type: "সিঙ্গেল রুম (নন এসি)", d1: "১৫০০/-", d7: "৯০০০/-", d15: "১৬০০০/-", d30: "২২০০০/-" },
    { type: "৬ সিট (এসি)", d1: "৬০০/-", d7: "৩৫০০/-", d15: "৬০০০/-", d30: "১২০০০/-" },
    { type: "৪ সিট (এসি)", d1: "৮০০/-", d7: "৫৫০০/-", d15: "৮০০০/-", d30: "১৩৫০০/-" },
    { type: "২ সিট (এসি)", d1: "১০০০/-", d7: "৭০০০/-", d15: "১২০০০/-", d30: "১৭০০০/-" },
    { type: "সিঙ্গেল রুম (এসি)", d1: "২০০০/-", d7: "১২০০০/-", d15: "২০০০/-", d30: "৩০০০০/-" },
    { type: "ভি.আই.পি (এসি)", d1: "২৫০০/-", d7: "--------", d15: "--------", d30: "--------" },
  ];

const FemaleHostel: React.FC<{ onNavigate: (view: ViewState) => void }> = ({
  onNavigate,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const branchPhoneNumber = "01304-730566";
  const branchWaNumber = "01304730566";
  const waBranchMessage = encodeURIComponent(
    "আসসালামু আলাইকুম, আমি কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।"
  );

  const [prices, setPrices] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const unsubPrices = onSnapshot(collection(db, 'queenspoint_prices'), (snapshot) => {
      setPrices(snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>a.order-b.order));
    });
    const unsubMenu = onSnapshot(collection(db, 'queenspoint_menu'), (snapshot) => {
      setMenu(snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>a.order-b.order));
    });
    const unsubGallery = onSnapshot(collection(db, 'queenspoint_gallery'), (snapshot) => {
      setGallery(snapshot.docs.map(doc => doc.data() as any).sort((a,b)=>b.createdAt-a.createdAt));
    });
    return () => { unsubPrices(); unsubMenu(); unsubGallery(); };
  }, []);

  const scrollToPricing = () => {
    const el = document.getElementById("pricing-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative font-sans text-[#002147] bg-[#f8f9fa] overflow-hidden">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-24 left-4 md:top-32 md:left-8 z-[100]"
      >
        <button 
          onClick={() => {
            onNavigate({ type: 'home' });
            setTimeout(() => {
              const el = document.getElementById("our-branches");
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
          }}
          className="group flex items-center justify-center gap-2 bg-black/40 hover:bg-[#D4AF37] backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-lg transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider hidden sm:block">Back</span>
        </button>
      </motion.div>

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

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-[#002147] flex items-center justify-center text-center overflow-hidden">
        <motion.div
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
           className="absolute inset-0"
        >
          <img
            src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6"
            className="w-full h-full object-cover opacity-60 object-center"
            alt="Queens Point Interior"
          />
        </motion.div>
        
        {/* Layered Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/60 via-transparent to-[#002147]/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#002147_90%)]"></div>

        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 px-4 md:px-6 max-w-5xl"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#002147]/50 backdrop-blur-md mb-6 md:mb-8">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
             <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[9px] md:text-xs font-bold leading-none mt-0.5">
               FEEL THE ROYALTY WITH SAFETY
             </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-[44px] sm:text-6xl md:text-7xl lg:text-[7.5rem] text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            Queens Point
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-300 text-sm md:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed md:leading-snug font-light mb-10 md:mb-14">
            নারীদের জন্য ঢাকার সেরা ও নিরাপদ আবাসন। রাজকীয় পরিবেশ আর আধুনিক সুযোগ-সুবিধার এক অনন্য সমন্বয়।
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-5 w-full">
            <button
              onClick={scrollToPricing}
              className="w-auto overflow-hidden relative group bg-[#D4AF37] text-[#002147] px-4 py-2 sm:px-10 sm:py-4 md:py-4 md:px-12 rounded-full text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-widest shadow-[0_15px_45px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 whitespace-nowrap flex-1 md:flex-none"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
              <span>প্যাকেজ-সমূহ</span>
            </button>
            <a
              href="https://www.facebook.com/QueensPointBD"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto shrink flex items-center justify-center gap-1 sm:gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/30 px-3 py-2 sm:px-8 sm:py-4 rounded-full text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-widest transition-all duration-300 backdrop-blur-sm group flex-1 md:flex-none whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform shrink-0">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href={`https://wa.me/88${branchWaNumber}?text=${waBranchMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto shrink flex items-center justify-center gap-1 sm:gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 px-3 py-2 sm:px-8 sm:py-4 rounded-full text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-widest transition-all duration-300 backdrop-blur-sm group flex-1 md:flex-none whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform shrink-0">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.061 3.978l-1.127 4.121 4.212-1.105a7.959 7.959 0 0 0 3.785.959h.004c4.367 0 7.927-3.558 7.931-7.927a7.863 7.863 0 0 0-2.327-5.621zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.501c.004-3.623 2.961-6.58 6.586-6.58a6.547 6.547 0 0 1 4.646 1.929 6.547 6.547 0 0 1 1.929 4.646c-.004 3.624-2.963 6.58-6.585 6.58z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Location Strip */}
      <section className="relative z-30 px-4 md:px-6 -mt-16 md:-mt-24">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,33,71,0.12)] p-2.5 sm:p-4 md:p-8 border border-white/50 backdrop-blur-xl flex flex-row items-center gap-3 sm:gap-6 justify-between relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="flex flex-row items-center gap-3 sm:gap-6 text-left w-full relative z-10 flex-1">
            <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#002147] to-[#003b80] rounded-full flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg relative overflow-hidden group/icon">
              <div className="absolute inset-0 bg-[#D4AF37] scale-0 group-hover/icon:scale-100 transition-transform duration-500 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 relative z-10 group-hover/icon:text-[#002147] transition-colors duration-500 animate-bounce">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.152-.722c1.102-.736 2.531-1.748 3.82-3.114 1.256-1.337 2.162-2.715 2.162-4.565 0-4.639-3.76-8.5-8.5-8.5s-8.5 3.861-8.5 8.5c0 1.85 1.006 3.228 2.262 4.565 1.289 1.366 2.718 2.378 4.02 3.114a16.707 16.707 0 001.152.722zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1 max-w-2xl overflow-hidden">
              <span className="text-[#D4AF37] text-[6px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] block mb-0.5 md:mb-3">OUR LOCATION</span>
              <h3 className="text-[#002147] text-[8px] sm:text-sm md:text-2xl font-bold leading-tight md:leading-snug truncate md:whitespace-normal">
                বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, রানাভোলা এভিনিউ, কামারপাড়া, উত্তরা, ঢাকা
              </h3>
            </div>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-auto shrink-0 flex items-center justify-center gap-1 md:gap-2 bg-[#f8f9fa] hover:bg-[#D4AF37] hover:text-[#002147] text-[#002147] border border-[#002147]/10 px-3 py-2 sm:px-6 sm:py-3 rounded-full text-[7px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300 group relative z-10 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Google </span><span>Maps</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* Security Focus Section */}
      <section className="py-6 md:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Our Priority</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-[#002147] mb-6 leading-tight font-bold">
              সর্বোচ্চ নিরাপত্তা নিশ্চিতকরণ
            </h2>
            <p className="text-[14px] md:text-lg text-[#002147]/70 mb-8 leading-relaxed">
              Queens Point-এ আমরা আপনার নিরাপত্তাকে সবথেকে বেশি গুরুত্ব দিই। আমাদের প্রাঙ্গণ ২৪/৭ অভিজ্ঞ মহিলা সিকিউরিটি এবং সিসিটিভি ক্যামেরা দ্বারা নিয়ন্ত্রিত।
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                "২৪/৭ সিসিটিভি",
                "মহিলা গার্ড",
                "বায়োমেট্রিক এন্ট্রি",
                "অগ্নি-নির্বাপক",
                "ভিজিটর নীতিমালা",
                "সুরক্ষিত পথ",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 group hover:border-[#D4AF37]/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] transition-colors">
                    <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-[#002147] text-xs md:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="w-full aspect-video bg-[#002147] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_-20px_rgba(0,33,71,0.5)] border-4 border-white/40">
              {!isVideoPlaying ? (
                <div
                  className="w-full h-full cursor-pointer flex items-center justify-center relative bg-gradient-to-br from-[#002147] to-gray-900 overflow-hidden group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105" alt="Video thumbnail" />
                  <div className="relative w-20 h-20 bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
                      <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] animate-[ping_2s_ease-out_infinite] opacity-50"></div>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://drive.google.com/file/d/13d55MDXy4Og6DW3L4tgvNiCsAD8OZZFp/preview"
                  className="w-full h-full border-0 bg-black"
                  allow="autoplay"
                ></iframe>
              )}
            </div>
            
            <div className="mt-8 text-center flex items-center justify-center">
               <a
                href="https://www.facebook.com/share/v/17vCHb5wXa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                Watch on Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-6 md:py-32 bg-[#f8f9fa] px-4 md:px-6 scroll-mt-24">
        <div className="max-w-[85rem] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-20"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">ROOM RATES</span>
            <h2 className="text-3xl md:text-5xl text-[#002147] font-bold">সিট এর ধরন এবং ভাড়ার তালিকা</h2>
            <p className="text-[#002147]/60 text-sm md:text-base mt-4 max-w-2xl mx-auto">(৩ বেলা খাবার ও অন্যান্য সকল সুবিধাসহ)</p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
            
            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <div className="bg-[#002147] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wider">৩০০০৳ ফেরতযোগ্য সিকিউরিটি ডিপোজিট</div>
              <div className="bg-white border border-[#D4AF37] text-[#002147] px-4 py-2 rounded-lg text-xs font-bold tracking-wider shadow-sm">স্কুটি পার্কিং - ১০০০/-</div>
              <div className="bg-white border border-[#D4AF37] text-[#002147] px-4 py-2 rounded-lg text-xs font-bold tracking-wider shadow-sm">কার পার্কিং - ৩০০০/-</div>
            </div>
          </motion.div>

          {/* Table View (Consistent across all screens) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl md:rounded-[2rem] shadow-xl md:shadow-2xl border border-gray-100 overflow-hidden"
          >
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#002147] text-white">
                  <th className="py-2 px-1 text-left pl-2 md:pl-10 text-[9px] sm:text-xs md:text-lg font-bold border-r border-white/10 w-1/3">সিট এর ধরন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">১ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">৭ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37] border-r border-white/10">১৫ দিন</th>
                  <th className="py-2 px-1 text-[8px] sm:text-[10px] md:text-base font-black tracking-widest text-[#D4AF37]">৩০ দিন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prices.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors group">
                    <td className="py-2 md:py-5 px-1 text-left pl-2 md:pl-10 font-bold text-[#002147] border-r border-gray-100 text-[9px] sm:text-xs md:text-lg">{row.type}</td>
                    <td className="py-2 md:py-5 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d1}</td>
                    <td className="py-2 md:py-5 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d7}</td>
                    <td className="py-2 md:py-5 px-1 font-black text-gray-600 text-[8px] sm:text-[10px] md:text-base group-hover:text-[#D4AF37] transition-colors border-r border-gray-100">{row.d15}</td>
                    <td className="py-2 md:py-5 px-1 font-black text-gray-800 text-[9px] sm:text-xs md:text-lg group-hover:text-[#002147] transition-colors">{row.d30 || row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Meal Menu */}
      <section className="py-6 md:py-32 bg-white px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl text-[#002147] font-bold mb-4">সাপ্তাহিক খাবারের তালিকা</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-[0_20px_50px_-20px_rgba(0,33,71,0.15)] rounded-3xl border border-gray-100 overflow-hidden relative"
          >
             <div className="absolute right-0 top-0 hidden md:block">
               <div className="bg-[#ff4d4d] text-white px-6 py-2 rounded-bl-3xl font-bold text-xs shadow-lg">
                 নির্ধারিত সময়ের বাইরে খাবার পরিবেশন করা হবে না
               </div>
             </div>

            <div className="overflow-hidden pb-2 w-full">
              <table className="w-full text-center">
                <thead>
                  <tr className="bg-[#002147] text-white">
                    <th className="py-2 md:py-5 px-1 border-r border-white/10 font-bold text-[10px] md:text-lg">দিন</th>
                    <th className="py-2 md:py-5 px-1 border-r border-white/10 font-bold text-[10px] md:text-base">সকালের নাস্তা<br/><span className="text-[7px] md:text-xs text-white/50 font-normal tracking-wide block">(০৭:০০-০৯:৩০ টা)</span></th>
                    <th className="py-2 md:py-5 px-1 border-r border-white/10 font-bold text-[10px] md:text-base">দুপুরের খাবার<br/><span className="text-[7px] md:text-xs text-white/50 font-normal tracking-wide block">(০১:০০-০৩:০০ টা)</span></th>
                    <th className="py-2 md:py-5 px-1 font-bold text-[10px] md:text-base">রাতের খাবার<br/><span className="text-[7px] md:text-xs text-white/50 font-normal tracking-wide block">(০৮:৩০-১০:৩০ টা)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#002147]">
                  {menu.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2 md:py-4 px-1 font-bold bg-[#002147]/5 border-r border-gray-100 text-[9px] md:text-base">{item.day}</td>
                      <td className="py-2 md:py-4 px-1 text-[8px] md:text-base border-r border-gray-100 font-medium whitespace-pre-wrap">{item.breakfast}</td>
                      <td className="py-2 md:py-4 px-1 text-[8px] md:text-base border-r border-gray-100 font-medium whitespace-pre-wrap">{item.lunch}</td>
                      <td className="py-2 md:py-4 px-1 text-[8px] md:text-base font-medium whitespace-pre-wrap">{item.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <div className="mt-6 text-center text-xs md:text-sm text-gray-500 font-medium">
             * বাজার দরের উপর ভিত্তি করে কর্তৃপক্ষ যে কোনো সময় মেন্যু পরিবর্তন করতে পারে।
          </div>
        </div>
      </section>

      {/* Gallery Section with Lightbox */}
      <section id="gallery" className="py-6 md:py-32 bg-[#f8f9fa] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">GALLERY</span>
            <h2 className="text-3xl md:text-5xl text-[#002147] font-bold">গ্যালারি</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 pb-4 sm:pb-8"
          >
            {gallery.map((item, idx) => (
              <motion.div
                variants={fadeInUp}
                key={idx}
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-md sm:rounded-xl md:rounded-3xl bg-white shadow-sm hover:shadow-md cursor-zoom-in border border-gray-100"
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-[#002147]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#D4AF37] bg-white shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    {item.type === 'video' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
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


      {/* Facilities Section */}
      <section id="facilities" className="py-6 md:py-32 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-20"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3">ALL FEATURES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#002147]">সব সুযোগ-সুবিধা এক নজরে</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
          >
            {facilitiesList.map((category, idx) => (
              <motion.div
                variants={fadeInUp}
                key={idx}
                className="bg-[#f8f9fa] border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:bg-[#002147] hover:border-[#002147] transition-all duration-500 group shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-white/5 transition-colors duration-500"></div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-4 sm:mb-6 relative z-10 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-[#D4AF37] group-hover:border-transparent transition-colors duration-500 shadow-sm shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-[#002147] group-hover:text-white transition-colors duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xs sm:text-xl font-black text-[#002147] tracking-tight group-hover:text-white transition-colors duration-500">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-4 relative z-10">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 sm:gap-3 text-[10px] sm:text-[14px] text-[#002147]/70 group-hover:text-white/80 transition-colors duration-500 leading-snug">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1 sm:mt-1.5 shrink-0 shadow-sm"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
                বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, রানাভোলা এভিনিউ, কামারপাড়া, উত্তরা, ঢাকা।
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
                <a href={`tel:01304730566`} className="inline-flex items-center gap-2 text-[#00B4D8] font-bold text-lg md:text-xl hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" clipRule="evenodd" />
                  </svg>
                  +880 1304 730566
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.88306789894!2d90.38406097582408!3d23.893764778572812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c582110a79db%3A0x9aee67894848cd01!2sThe%20Queen&#39;s%20Point!5e0!3m2!1sen!2sbd!4v1778234151792!5m2!1sen!2sbd" 
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

      {/* Footer Helper */}
      <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h4 className="text-2xl text-[#002147] font-bold mb-4">যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-8">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z" /></svg>
                  </div>
                  <span className="font-black text-xl text-[#002147]">{branchPhoneNumber}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <span className="font-bold text-lg text-[#002147]">info.queenspoint@gmail.com</span>
               </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default FemaleHostel;
