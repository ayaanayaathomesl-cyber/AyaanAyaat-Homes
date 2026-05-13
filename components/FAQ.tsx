import React from 'react';
import { motion } from 'motion/react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export const FAQ: React.FC = () => {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-[#f8f9fa] min-h-screen pt-24 pb-12 relative"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex justify-end mb-6 relative z-10">
          <a href="/" onClick={(e) => {
            e.preventDefault();
            window.history.pushState({ type: 'home' }, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate', { state: { type: 'home' }}));
          }} className="bg-white text-[#002147] hover:bg-gray-100 p-2 md:p-3 rounded-full shadow-md border border-[#002147]/10 transition-colors inline-flex items-center justify-center group" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </a>
        </div>
        <header className="mb-12 md:mb-16 text-center">
          <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-2">Frequently Asked Questions</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#002147] font-bold">About <span className="text-[#D4AF37]">AyaanAyaat</span> Homes</h1>
        </header>

        <div className="space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg md:text-2xl font-bold text-[#002147] mb-3 md:mb-4">Is it AyaanAyaat, Ayan Ayaat, or AyaanAyyat?</h3>
            <p className="text-[#002147]/80 leading-relaxed text-sm md:text-lg">
              While our official registered name is <strong>AyaanAyaat Homes</strong>, many of our residents naturally search for us using variations like <em className="font-medium text-[#002147]">Ayan Ayaat</em>, <em className="font-medium text-[#002147]">AyaanAyyat</em>, <em className="font-medium text-[#002147]">Aiyan Ayat</em>, or <em className="font-medium text-[#002147]">AyanAyaat</em>. No matter how you prefer to spell it, we are the exact same premium hostel network providing top-tier, secure accommodation in Dhaka through our flagship branches: <a href="/bachelorpoint" className="text-[#D4AF37] font-bold hover:underline">Bachelor Point</a> and <a href="/queenspoint" className="text-[#D4AF37] font-bold hover:underline">Queens Point</a>.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg md:text-2xl font-bold text-[#002147] mb-3 md:mb-4">Are Police Point and Bachelor Point the same?</h3>
            <p className="text-[#002147]/80 leading-relaxed text-sm md:text-lg">
              Yes! <strong>Bachelor Point</strong>, affectionately known by some locals as <em>Police Point Hostel</em>, is our premier male accommodation branch under the <strong>AyaanAyaat Homes</strong> (or AyanAyaat) umbrella. Whether you search for <em>batchalor point</em> or the correct spelling, it leads you to our highly secure, modern facility.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
