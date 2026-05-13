import React from 'react';
import { motion } from 'motion/react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto flex-grow w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Legal</span>
        <h1 className="text-4xl md:text-5xl text-[#002147] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg prose-slate text-gray-600 space-y-6">
          <p>
            At AyaanAyaat Homes, we prioritize the privacy and security of our residents and website visitors.
            This Privacy Policy document outlines the types of personal information that is received and collected
            by us and how it is used.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">1. Information Collection</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and physical
            address when you register for our hostels or interact with our website. We use this information to
            provide and improve our services, communicate with you, and process your requests.
          </p>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">2. Use of Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process your hostel booking applications and manage your residency.</li>
            <li>Respond to your customer service requests and support inquiries.</li>
            <li>Send you important updates, newsletters, and promotional materials.</li>
            <li>Improve our website and services.</li>
          </ul>

          <h2 className="text-2xl text-[#002147] mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information
            when you enter, submit, or access your personal information. We use state-of-the-art encryption
            technologies to protect sensitive data transmitted online.
          </p>
          
          <h2 className="text-2xl text-[#002147] mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our general hotline
            or email support.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
