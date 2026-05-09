
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const philosophyImages = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1502672260266-1c1c24240938?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIsManual(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % philosophyImages.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }, 400);
    }, 4000); // Change image every 4 seconds automatically
    return () => clearInterval(interval);
  }, [philosophyImages.length, isHovered]);

  const handleNextImage = () => {
    if (isAnimating) return;
    setIsManual(true);
    setCurrentImageIndex((prev) => (prev + 1) % philosophyImages.length);
  };

  const scrollToBranches = () => {
    const el = document.getElementById('our-branches');
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let start: number | null = null;

      // Disable native smooth scroll globally to prevent stuttering during JS animation
      document.documentElement.style.scrollBehavior = 'auto';

      const easeInOutQuart = (t: number) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutQuart(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          // Restore native smooth scroll after animation completes
          document.documentElement.style.scrollBehavior = 'smooth';
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="bg-[#f8f6f0] text-[#002147] font-sans">
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-15px) scale(1.02) rotate(0.5deg); }
        }
        @keyframes hero-glow {
          0%, 100% { filter: drop-shadow(0 4px 20px rgba(212,175,55,0.15)); }
          50% { filter: drop-shadow(0 10px 40px rgba(212,175,55,0.4)); }
        }
        .animate-hero-float {
          animation: hero-float 8s ease-in-out infinite, hero-glow 8s ease-in-out infinite;
        }
        @keyframes text-shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-shine {
          background-size: 200% auto;
          animation: text-shine 6s linear infinite;
        }
      `}</style>
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
          }
        }}
        className="relative w-full h-[70vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: [1.1, 1, 1.05, 1.1], opacity: 1 }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000" 
            alt="Students Community" 
            className="w-full h-full object-cover grayscale-[30%] opacity-90"
          />
          <div className="absolute inset-0 bg-[#002147]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/80 to-transparent opacity-90"></div>
        </motion.div>

        {/* Animated Light Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#D4AF37]/20 rounded-full blur-[80px] mix-blend-screen"
          />
          <motion.div 
            animate={{ 
              y: [0, 50, 0],
              x: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[30%] right-[15%] w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[100px] mix-blend-screen"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[50%] left-[50%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37]/10 rounded-full blur-[120px] mix-blend-screen"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-8 mt-16 max-w-5xl mx-auto flex flex-col items-center animate-hero-float">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mb-6 inline-flex flex-col items-center"
          >
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm bg-white/5 border border-white/20 px-5 py-2 rounded-full mb-4 relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-[pulse_4s_ease-in-out_infinite]">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
              Premium Hostel Living
            </span>
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-serif text-white font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tight drop-shadow-lg mb-6"
          >
            AyaanAyaat <br/>
            <span className="italic font-light bg-gradient-to-r from-[#D4AF37] via-[#fff3cc] to-[#D4AF37] text-transparent bg-clip-text animate-text-shine inline-block pb-4">Homes</span>
          </motion.h1>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 space-y-2"
          >
            <h3 className="text-[#f8f6f0] text-lg md:text-3xl font-bold tracking-wide drop-shadow-md">
              <span className="text-[#D4AF37]">ছাত্র ছাত্রী</span> এবং সকল পেশার মানুষের জন্য
            </h3>
            <h3 className="text-white text-xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-md">
              আধুনিক হোষ্টেল সল্যুশন
            </h3>
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-white/70 text-xs md:text-base font-light tracking-widest mt-6 max-w-lg mx-auto"
          >
            এক ছাদের নিচে থাকা, খাওয়া ও বিনোদনের সকল সুবিধা।
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] } }
            }}
            className="mt-8 md:mt-12 flex justify-center"
          >
            <button 
              onClick={scrollToBranches}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] via-[#f4e2a6] to-[#D4AF37] bg-[length:200%_auto] animate-text-shine text-[#002147] px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.8)] transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-full ring-2 ring-[#D4AF37] animate-[ping_4s_ease-out_infinite] opacity-40"></div>
              <span className="relative z-10">আমাদের ব্রাঞ্চ-সমূহ</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500 group-hover:translate-y-1 relative z-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Welcome Banner */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="w-full bg-[#f8f9fa] pt-16 pb-8 md:pt-24 flex flex-col items-center justify-center px-4 relative z-20"
      >
        <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">Welcome To</span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#002147] mb-6 text-center drop-shadow-sm font-bold">
          AyaanAyaat Homes
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full shadow-sm"></div>
      </motion.div>

      {/* Philosophy Section */}
      <section className="bg-[#f8f9fa] pb-16 md:pb-24 px-6 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[60px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-[#002147]/5 rounded-full blur-[50px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-[85rem] mx-auto py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image Grid with Parallax Hover */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px] order-2 lg:order-2"
            >
              <div className={`absolute inset-0 bg-[#002147] rounded-3xl shadow-xl overflow-hidden transition-transform duration-500 ${isAnimating || isHovered ? 'rotate-0' : '-rotate-3'}`}>
                <img 
                  src={philosophyImages[(currentImageIndex + 1) % philosophyImages.length]} 
                  alt="Next Living" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div 
                className={`absolute inset-0 bg-[#002147] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 z-10 group cursor-pointer ${isAnimating || isHovered ? 'rotate-0' : 'rotate-3'}`}
                onClick={handleNextImage}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: isManual ? 0.3 : 1.2, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={philosophyImages[currentImageIndex]} 
                      alt={`Modern Living ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/20 to-transparent pointer-events-none z-30"></div>
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-30">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium">✨ স্মার্ট জীবনযাত্রার নতুন সংজ্ঞা</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center space-y-6 md:space-y-8 relative z-20 order-1 lg:order-1"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Our Philosophy</span>
              </div>
              
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#002147] leading-tight font-light relative">
                <span className="absolute -top-6 -left-6 text-6xl text-[#D4AF37]/20 font-serif">"</span>
                আমরা বিলাসিতা নয়, <br className="hidden md:block"/> 
                <span className="font-bold text-[#D4AF37]">সাধ্যের মধ্যে আধুনিক</span> <br className="hidden md:block"/> 
                জীবনযাত্রার নিশ্চয়তা দিই।
                <span className="absolute -bottom-6 -right-6 text-6xl text-[#D4AF37]/20 font-serif leading-none">"</span>
              </h3>
              
              <p className="text-sm md:text-lg text-[#002147]/70 font-medium leading-relaxed">
                ঢাকার ব্যস্ত জীবনে আপনার থাকার জায়গাটি হওয়া চাই একটি শান্তির নীড়। AyaanAyaat Homes-এর প্রতিটি প্রজেক্ট ডিজাইন করা হয়েছে আপনার কাজের উদ্দীপনা এবং ব্যক্তিগত প্রশান্তির কথা মাথায় রেখে।
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4">
                {[
                  { title: "নিরাপদ পরিবেশ", desc: "২৪/৭ সিসিটিভি ও গার্ড" },
                  { title: "স্বাস্থ্যসম্মত খাবার", desc: "৩ বেলা মানসম্মত মিল" },
                  { title: "আধুনিক সুবিধা", desc: "এসি, ওয়াইফাই ও অন্যান্য" },
                  { title: "স্মার্ট লোকেশন", desc: "যাতায়াতের সেরা সুবিধা" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-8 h-8 rounded-full bg-[#002147]/5 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37]/10 transition-colors">
                      <svg className="w-4 h-4 text-[#002147] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h4 className="text-[#002147] font-bold text-xs md:text-sm mb-1">{item.title}</h4>
                    <p className="text-[#002147]/60 text-[10px] md:text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Sections */}
      <section id="our-branches" className="bg-white border-y border-[#002147]/10 scroll-mt-20">
        {/* Navigation Grid Style approach for titles */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-[#002147]/10 px-6 py-12 md:py-16 bg-[#f8f9fa] relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002147 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="group cursor-default">
              <span className="text-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] block mb-3 group-hover:tracking-[0.5em] transition-all duration-500 origin-left">Our Premium Locations</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#002147] group-hover:text-[#003b80] transition-colors duration-300">আমাদের <span className="italic text-[#D4AF37]">ব্রাঞ্চ-সমূহ</span></h2>
            </div>
            <div className="text-right hidden md:block border-l-2 border-[#D4AF37] pl-8 py-2">
              <p className="text-[#002147]/70 text-sm max-w-xs leading-relaxed uppercase tracking-widest font-semibold">
                Discover our premium locations designed for your comfort and safety.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-[95rem] mx-auto py-12 md:py-16 px-6 flex flex-col gap-10 md:gap-14">
          {/* Queens Point (Female) */}
          <motion.div 
            id="queens-point-card"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#002147]/5 border border-[#002147]/5 group cursor-pointer relative"
            onClick={(e) => {
              const el = e.currentTarget;
              el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
              el.style.transform = "scale(1.03)";
              el.style.boxShadow = "0 30px 60px -15px rgba(0, 33, 71, 0.3)";
              el.style.zIndex = "50";
              setTimeout(() => {
                el.style.transform = "";
                el.style.boxShadow = "";
                el.style.zIndex = "";
                onNavigate({ type: 'female-hostel' });
              }, 500);
            }}
          >
            {/* Animated Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-[#002147]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="order-2 md:order-1 flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-6 relative">
                 <div className="bg-gradient-to-r from-[#002147] to-[#003b80] text-white px-5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                    Female Branch
                 </div>
                 <span className="text-[#D4AF37] font-semibold text-xs tracking-wider animate-pulse">AyaanAyaat Homes Initiative</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#002147] leading-none mb-3 drop-shadow-sm group-hover:-translate-y-1 transition-transform duration-500">Queens Point</h3>
              <p className="text-[#D4AF37] text-sm md:text-md mb-8 font-serif italic font-bold">নিরাপদ আশ্রয়ে রাজকীয়তা</p>
              
              {/* Address Section */}
              <div className="flex items-start gap-4 mb-8 bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 group-hover:border-[#D4AF37]/30 transition-colors">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[#002147] text-sm md:text-base font-semibold pt-1">বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, উত্তরা, রানাভোলা এভিনিউ, কামারপাড়া, ঢাকা</p>
              </div>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                {['২৪/৭ নিরাপত্তা', 'মানসম্মত খাবার', 'AC / Non-AC রুম', 'হাই-স্পিড ওয়াই-ফাই'].map((feature, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#002147]/5 text-[#002147] text-xs font-bold rounded-lg border border-[#002147]/10 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-6 mt-auto flex-wrap">
                <button 
                  className="relative overflow-hidden bg-[#002147] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_10px_20px_rgba(0,33,71,0.2)] group-hover:shadow-[0_15px_30px_rgba(0,33,71,0.4)] pointer-events-none animate-pulse group-hover:animate-none"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-[#002147] transition-colors duration-500">
                    ক্লিক করে বিস্তারিত দেখুন
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l7.5 7.5-7.5 7.5M21 12H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
                </button>
                <div className="flex gap-3">
                  <a title="Facebook Page" href="https://www.facebook.com/share/1AZyBMJreP/" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-[#002147]/10 flex items-center justify-center bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                      <path d="M16.671 15.542l.532-3.469h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.514V5.006s-1.375-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.633H7.078v3.469h3.048v8.385a12.096 12.096 0 003.75 0v-8.385h2.796z" fill="#fff"/>
                    </svg>
                  </a>
                  <a title="Google Maps" href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-[#002147]/10 flex items-center justify-center bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="Google Maps" className="w-5 h-5 object-contain" />
                  </a>
                </div>
              </div>
            </div>
            {/* Image Parallax Effect */}
            <div className="order-1 md:order-2 relative h-[350px] md:h-auto md:w-[400px] lg:w-[450px] shrink-0 overflow-hidden bg-[#f8f6f0]">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" 
                className="absolute inset-0 w-full h-full object-cover md:object-cover"
                alt="Queens Point"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 via-transparent to-transparent md:hidden"></div>
            </div>
          </motion.div>

          {/* Bachelor Point (Male) */}
          <motion.div 
            id="bachelor-point-card"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row-reverse bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#002147]/5 border border-[#002147]/5 group cursor-pointer relative"
            onClick={(e) => {
              const el = e.currentTarget;
              el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
              el.style.transform = "scale(1.03)";
              el.style.boxShadow = "0 30px 60px -15px rgba(0, 33, 71, 0.3)";
              el.style.zIndex = "50";
              setTimeout(() => {
                el.style.transform = "";
                el.style.boxShadow = "";
                el.style.zIndex = "";
                onNavigate({ type: 'male-hostel' });
              }, 500);
            }}
          >
            {/* Animated Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#D4AF37]/5 to-[#002147]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="order-2 md:order-2 flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-6 relative">
                 <div className="bg-gradient-to-r from-[#D4AF37] to-[#e1bb44] text-white px-5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                    Male Branch
                 </div>
                 <span className="text-[#002147] font-semibold text-xs tracking-wider animate-pulse">AyaanAyaat Homes Initiative</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#002147] leading-none mb-3 drop-shadow-sm group-hover:-translate-y-1 transition-transform duration-500">Bachelor Point</h3>
              <p className="text-[#D4AF37] text-sm md:text-md mb-8 font-serif italic font-bold">আধুনিক স্মার্ট জীবনের নিশ্চয়তা</p>
              
              {/* Address Section */}
              <div className="flex items-start gap-4 mb-8 bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 group-hover:border-[#D4AF37]/30 transition-colors">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[#002147] text-sm md:text-base font-semibold pt-1">২২৭/২, রোড-২, সি-ব্লক, রূপনগর আবাসিক, মিরপুর, ঢাকা-১২১৬</p>
              </div>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                {['২৪/৭ সিসিটিভি', 'মানসম্মত খাবার', 'AC / Non-AC রুম', 'হাই-স্পিড ওয়াই-ফাই'].map((feature, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 text-[#002147] text-xs font-bold rounded-lg border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-6 mt-auto flex-wrap">
                <button 
                  className="relative overflow-hidden bg-[#D4AF37] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] pointer-events-none animate-pulse group-hover:animate-none"
                >
                  <span className="relative z-10 flex items-center gap-2 text-[#002147] group-hover:text-white transition-colors duration-500">
                    ক্লিক করে বিস্তারিত দেখুন
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l7.5 7.5-7.5 7.5M21 12H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-[#002147] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
                </button>
                <div className="flex gap-3">
                  <a title="Facebook Page" href="https://www.facebook.com/share/1CwaVA5WXK/" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-[#002147]/10 flex items-center justify-center bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group/fb">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="group-hover/fb:text-[#1877F2]">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                      <path d="M16.671 15.542l.532-3.469h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.514V5.006s-1.375-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.633H7.078v3.469h3.048v8.385a12.096 12.096 0 003.75 0v-8.385h2.796z" fill="#fff" className="group-hover/fb:fill-white"/>
                    </svg>
                  </a>
                  <a title="Google Maps" href="https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-[#002147]/10 flex items-center justify-center bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group/maps">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="Google Maps" className="w-5 h-5 object-contain" />
                  </a>
                </div>
              </div>
            </div>
            {/* Image Parallax Effect */}
            <div className="order-1 md:order-1 relative h-[350px] md:h-auto md:w-[400px] lg:w-[450px] shrink-0 overflow-hidden bg-[#f8f6f0]">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://lh3.googleusercontent.com/d/1cjIYSZDiCig4kN1FbLxGIoEUTcdcCU1C" 
                className="absolute inset-0 w-full h-full object-cover md:object-cover"
                alt="Bachelor Point"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 via-transparent to-transparent md:hidden"></div>
            </div>
          </motion.div>
        </div>

        {/* UPCOMING BRANCHES SECTION */}
        <div id="upcoming" className="bg-[#002147] text-white py-20 md:py-28 px-6 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
          
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto relative z-10 text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-3 justify-center mb-4">
              <div className="w-10 h-[2px] bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-[10px] md:text-sm font-bold uppercase tracking-[0.4em]">Future expansion</span>
              <div className="w-10 h-[2px] bg-[#D4AF37]"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6">আমাদের <span className="italic text-[#D4AF37] font-bold">আপকামিং</span> ব্রাঞ্চসমূহ</h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              নতুন আঙ্গিকে আরও উন্নত ও আধুনিক আবাসন সুবিধা নিয়ে আমরা আসছি আপনাদের কাছাকাছি।
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
            {/* Prince Point Upcoming */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative rounded-[2rem] overflow-hidden h-[300px] md:h-[350px] transition-all duration-700 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] block"
            >
              <div className="absolute inset-0 bg-[#002147] z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:opacity-80 group-hover:scale-110 transition-all duration-[2s] ease-out"
                alt="Prince Point Upcoming"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001229] via-[#001229]/60 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40 bg-[#002147]/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Lock className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-lg">Prince Point</h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-ping"></div>
                   <span className="text-[#ff6b6b] text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] drop-shadow-md">Under Construction</span>
                </div>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-[#D4AF37]"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-[#D4AF37]"></div>
            </motion.div>

            {/* Royal Point Upcoming */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative rounded-[2rem] overflow-hidden h-[300px] md:h-[350px] transition-all duration-700 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] block"
            >
              <div className="absolute inset-0 bg-[#002147] z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:opacity-80 group-hover:scale-110 transition-all duration-[2s] ease-out"
                alt="Royal Point Upcoming"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001229] via-[#001229]/60 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40 bg-[#002147]/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Lock className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-lg">Royal Point</h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-ping"></div>
                   <span className="text-[#ff6b6b] text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] drop-shadow-md">Under Construction</span>
                </div>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-[#D4AF37]"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-[#D4AF37]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Promise Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[#f8f6f0] py-24 md:py-32 px-6 flex flex-col items-center border-t border-[#002147]/10"
      >
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-[1px] bg-[#D4AF37]/40 mb-12"
        ></motion.div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-serif italic text-2xl md:text-4xl text-[#002147] leading-relaxed">
            "ব্যাচেলরদের জন্য আমরা দিই সাশ্রয়ী মূল্যে সম্পূর্ণ আধুনিক ও নিরাপদ আবাসন ব্যবস্থা।"
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;

