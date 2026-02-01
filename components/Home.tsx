
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#002147] overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#002147]/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000" 
            alt="Students Community" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-20 w-full pt-20">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm border border-[#D4AF37]/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
                Premium Hostel Living
              </span>
            </div>

            {/* Main Brand & Headline with Vertical Gold Line */}
            <div className="relative pl-4 md:pl-8">
              {/* The Vertical Gold Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
              
              <div className="space-y-1 md:space-y-2">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                  AyaanAyaat
                </h1>
                <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white/90 -mt-1 md:-mt-4">
                  Homes
                </h2>
              </div>

              {/* Integrated Sub-headline & Micro Description */}
              <div className="mt-5 md:mt-8">
                <div className="space-y-1">
                  <h3 className="text-[#D4AF37] text-lg sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-md leading-tight">
                    ছাত্র ছাত্রী এবং সকল পেশার মানুষের জন্য
                  </h3>
                  <h3 className="text-white text-lg sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-md leading-tight">
                    আধুনিক হোষ্টেল সল্যুশন
                  </h3>
                </div>
                <p className="text-white/60 text-[11px] md:text-[15px] font-medium tracking-wide mt-3 md:mt-2 whitespace-normal md:whitespace-nowrap overflow-visible drop-shadow-sm leading-relaxed max-w-xs md:max-w-none">
                  এক ছাদের নিচে থাকা, খাওয়া ও বিনোদনের সকল সুবিধা।
                </p>
              </div>
            </div>

            {/* Unique Action Button - "আমাদের ব্রাঞ্চসমূহ" */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 md:pt-8 pl-4 md:pl-8">
              <div className="relative animate-float mr-auto sm:mr-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/0 rounded-full blur-xl opacity-30 animate-pulse"></div>
                
                <button 
                  onClick={() => {
                    const el = document.getElementById('our-branches');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="pulse-ring-btn animate-shimmer relative bg-[#D4AF37] text-[#002147] px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-black uppercase rounded-full flex items-center justify-center gap-3 md:gap-4 hover:bg-white hover:text-[#002147] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] z-10 overflow-hidden"
                >
                  <span className="relative z-10 drop-shadow-sm">আমাদের ব্রাঞ্চ-সমূহ</span>
                  <div className="relative z-10 w-5 h-5 md:w-6 md:h-6 bg-[#002147] rounded-full flex items-center justify-center text-white shadow-inner group-hover:rotate-12 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.5em] block">Our Philosophy</span>
           <h2 className="text-3xl md:text-5xl font-bold text-[#002147] leading-tight">"আমরা বিলাসিতা নয়, সাধ্যের মধ্যে আধুনিক জীবনযাত্রার নিশ্চয়তা দিই।"</h2>
           <p className="text-lg text-gray-500 font-light leading-relaxed">
             ঢাকার ব্যস্ত জীবনে আপনার থাকার জায়গাটি হওয়া চাই একটি শান্তির নীড়। AyaanAyaat Homes-এর প্রতিটি প্রজেক্ট ডিজাইন করা হয়েছে আপনার কাজের উদ্দীপনা এবং ব্যক্তিগত প্রশান্তির কথা মাথায় রেখে।
           </p>
        </div>
      </section>

      {/* Branches Sections */}
      <div id="our-branches" className="bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 pb-24">
          
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Our Locations</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#002147] relative inline-block">
              আমাদের বর্তমান ব্রাঞ্চ-সমূহ
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
              </div>
            </h2>
          </div>

          <div className="space-y-16">
            {/* Queens Point (Female) */}
            <div 
              onClick={() => onNavigate({ type: 'female-hostel' })}
              className="relative group overflow-hidden bg-[#002147] rounded-3xl h-[450px] md:h-[600px] shadow-2xl cursor-pointer"
            >
              <div className="absolute top-8 right-8 z-30 pointer-events-none">
                 <div className="bg-gradient-to-r from-[#FF4081] to-[#F50057] text-white px-6 py-3 rounded-full text-xs md:text-xl font-black uppercase tracking-widest shadow-[0_15px_35px_rgba(245,0,87,0.4)] border border-white/40 flex items-center gap-3 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                       <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM5 20a7 7 0 1114 0 .75.75 0 01-.75.75H5.75A.75.75 0 015 20z" clipRule="evenodd" />
                    </svg>
                    Female Branch
                 </div>
              </div>

              <img 
                src="https://lh3.googleusercontent.com/d/1XVpXrYorEp471NKLuuQ124m-mDd5_ah6" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
                alt="Queens Point"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/20 to-transparent"></div>
              
              {/* Changed: Padding reduced slightly on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-14 space-y-6">
                <h3 className="text-4xl md:text-6xl font-serif text-white leading-none">Queens Point</h3>
                <p className="text-white/70 text-base md:text-lg max-w-sm">নিরাপত্তা ও হাইজিন বজায় রেখে নারীদের জন্য আধুনিক ও রুচিশীল জীবনযাত্রার নিশ্চয়তা।</p>
                
                {/* Changed: justify-between, button on right, social on left */}
                <div className="flex items-center justify-between gap-4 w-full">
                  
                  <div className="flex gap-2 md:gap-3">
                    <a 
                      href="https://www.facebook.com/share/1AZyBMJreP/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95 animate-facebook"
                      title="Facebook Page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </a>

                    <a 
                      href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95 group"
                      title="Google Maps Location"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
                        alt="Google Maps" 
                        className="w-6 h-6 md:w-8 md:h-8"
                      />
                    </a>
                  </div>

                  {/* Changed: Added whitespace-nowrap and moved to end */}
                  <button 
                    className="bg-[#D4AF37] text-[#002147] px-6 py-4 md:px-8 text-xs font-bold uppercase rounded-full hover:bg-white transition-all shadow-lg active:scale-95 whitespace-nowrap shrink-0"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            </div>

            {/* Bachelor Point (Male) */}
            <div 
              onClick={() => onNavigate({ type: 'male-hostel' })}
              className="relative group overflow-hidden bg-[#002147] rounded-3xl h-[450px] md:h-[600px] shadow-2xl cursor-pointer"
            >
              <div className="absolute top-8 right-8 z-30 pointer-events-none">
                 <div className="bg-[#D4AF37] text-[#002147] px-6 py-3 rounded-full text-xs md:text-xl font-black uppercase tracking-widest shadow-[0_15px_35px_rgba(212,175,55,0.4)] border border-white/40 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                       <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873.75.75 0 01-.75-.75v-2.126z" />
                    </svg>
                    Male Branch
                 </div>
              </div>

              <img 
                src="https://lh3.googleusercontent.com/d/1cjIYSZDiCig4kN1FbLxGIoEUTcdcCU1C" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
                alt="Bachelor Point"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/20 to-transparent"></div>
              
              {/* Changed: Padding reduced slightly on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-14 space-y-6">
                <h3 className="text-4xl md:text-6xl font-serif text-white leading-none">Bachelor Point</h3>
                <p className="text-white/70 text-base md:text-lg max-sm">ব্যাচেলর ও ছাত্রদের জন্য ঢাকার প্রাণকেন্দ্রে প্রিমিয়াম সুযোগ-সুবিধা সম্বলিত স্মার্ট আবাসন সল্যুশন।</p>
                
                {/* Changed: justify-between, button on right, social on left */}
                <div className="flex items-center justify-between gap-4 w-full">
                  
                  <div className="flex gap-2 md:gap-3">
                    <a 
                      href="https://www.facebook.com/share/1CwaVA5WXK/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95 animate-facebook"
                      title="Facebook Page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </a>

                    <a 
                      href="https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl active:scale-95 group"
                      title="Google Maps Location"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
                        alt="Google Maps" 
                        className="w-6 h-6 md:w-8 md:h-8"
                      />
                    </a>
                  </div>

                  {/* Changed: Added whitespace-nowrap and moved to end */}
                  <button 
                    className="bg-[#D4AF37] text-[#002147] px-6 py-4 md:px-8 text-xs font-bold uppercase rounded-full hover:bg-white transition-all shadow-lg active:scale-95 whitespace-nowrap shrink-0"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            </div>

            {/* UPCOMING BRANCHES SECTION */}
            <div className="pt-20">
              <div className="text-center mb-12">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Coming Soon</span>
                <h2 className="text-2xl md:text-4xl font-serif text-[#002147] font-bold">আমাদের আপকামিং ব্রাঞ্চ-সমূহ</h2>
                <div className="w-12 h-1 bg-red-500 mx-auto mt-4 rounded-full opacity-40"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Prince Point Upcoming */}
                <div className="relative group overflow-hidden bg-gray-200 rounded-3xl h-[300px] md:h-[400px] shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000" 
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50 grayscale"
                    alt="Prince Point Upcoming"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mb-2">Prince Point</h3>
                    <p className="text-red-400 font-black uppercase tracking-[0.3em] text-xs">Upcoming Branch</p>
                  </div>
                </div>

                {/* Royal Point Upcoming */}
                <div className="relative group overflow-hidden bg-gray-200 rounded-3xl h-[300px] md:h-[400px] shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" 
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50 grayscale"
                    alt="Royal Point Upcoming"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mb-2">Royal Point</h3>
                    <p className="text-red-400 font-black uppercase tracking-[0.3em] text-xs">Upcoming Branch</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Brand Promise Banner */}
      <section className="bg-white py-12 md:py-24 px-6 border-t border-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#002147] text-base md:text-xl lg:text-2xl font-bold tracking-tight leading-relaxed drop-shadow-sm px-4">
            "ব্যাচেলরদের জন্য আমরা দিই সাশ্রয়ী মূল্যে সম্পূর্ণ আধুনিক ও নিরাপদ আবাসন ব্যবস্থা।"
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-8 rounded-full opacity-30"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
