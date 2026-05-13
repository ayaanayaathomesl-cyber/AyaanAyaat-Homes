import React from 'react';
import { motion } from 'motion/react';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto flex-grow w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Legal</span>
        <h1 className="text-4xl md:text-5xl text-[#002147] mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg prose-slate text-gray-600 space-y-6">
          <p>
            This Cookie Policy explains how AyaanAyaat Homes uses cookies and similar tracking
            technologies when you visit our website.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">1. What are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you
            visit a website. They are widely used by website owners to make their websites work,
            or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">2. How We Use Cookies</h2>
          <p>
            We use cookies for several reasons, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our website.</li>
            <li><strong>Performance and Analytics Cookies:</strong> These cookies collect information that is used in aggregate form to help us understand how our website is being used.</li>
            <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website and personalize content for you.</li>
          </ul>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">3. Your Choices</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your
            cookie preferences by setting or amending your web browser controls to accept or refuse cookies.
            If you choose to reject cookies, you may still use our website though your access to some
            functionality and areas of our website may be restricted.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
