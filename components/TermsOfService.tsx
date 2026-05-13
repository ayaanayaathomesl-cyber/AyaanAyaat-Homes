import React from 'react';
import { motion } from 'motion/react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto flex-grow w-full relative">
      <div className="flex justify-end mb-6 relative z-10 w-full">
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Legal</span>
        <h1 className="text-4xl md:text-5xl text-[#002147] mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg prose-slate text-gray-600 space-y-6">
          <p>
            Welcome to AyaanAyaat Homes. By accessing our website and using our hostel services,
            you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By using our services, you confirm that you accept these terms and that you agree to comply
            with them. If you do not agree to these terms, you must not use our services.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">2. Hostel Rules & Regulations</h2>
          <p>
            All residents must adhere strictly to the rules and regulations established by AyaanAyaat Homes
            management. These include, but are not limited to, respecting quiet hours, maintaining cleanliness,
            and cooperating with hostel staff and security. Specific rules are provided upon admission.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">3. Payments and Fees</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rent and all applicable fees must be paid on time as per the agreed schedule.</li>
            <li>Security deposits are subject to the terms discussed during admission and will be refunded upon checkout provided there are no damages.</li>
            <li>Failure to pay rent on time may result in late fees or termination of residency.</li>
          </ul>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            AyaanAyaat Homes shall not be held liable for any direct, indirect, incidental, or consequential
            damages resulting from the use of our facilities or website, or the inability to use them.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
