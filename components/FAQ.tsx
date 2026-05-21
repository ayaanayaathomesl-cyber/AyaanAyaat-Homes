import React from 'react';
import { motion } from 'motion/react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export const FAQ: React.FC = () => {

  const faqs = [
    {
      question: "Is it AyaanAyaat, Ayan Ayaat, or AyaanAyyat?",
      answer: "While our official registered name is AyaanAyaat Homes, many of our residents naturally search for us using variations like Ayan Ayaat, AyaanAyyat, Aiyan Ayat, or AyanAyaat. No matter how you prefer to spell it, we are the exact same premium hostel network providing top-tier, secure accommodation in Dhaka through our flagship branches: Bachelor Point (বেচেলর পয়েন্ট) and Queens Point (কুইন্স পয়েন্ট)."
    },
    {
      question: "Are Police Point and Bachelor Point the same?",
      answer: "Yes! Bachelor Point, affectionately known by some locals as Police Point Hostel, is our premier male accommodation branch under the AyaanAyaat Homes umbrella. Whether you search for batchalor point, ব্যাচেলর পয়েন্ট, বেচেলর পয়েন্ট, or police point, it leads you to our highly secure, modern facility for males."
    },
    {
      question: "What are the branches of AyaanAyaat Homes?",
      answer: "We currently operate two main branches: 'Queens Point' (কুইন্স পয়েন্ট) exclusively for females, and 'Bachelor Point' (বেচেলর পয়েন্ট) exclusively for males. We also have two upcoming branches under construction: 'Prince Point' (প্রিন্স পয়েন্ট) and 'Royal Point' (রয়েল পয়েন্ট) to expand our premium living experiences."
    },
    {
      question: "What amenities are provided at AyaanAyaat Homes?",
      answer: "We provide 24/7 CCTV and strict security, high-quality hygienic food (মানসম্মত খাবার), high-speed Wi-Fi internet, and both AC and Non-AC room options to ensure maximum comfort for our residents."
    },
    {
      question: "Who can stay at AyaanAyaat Homes?",
      answer: "Our hostels are perfect for students, bachelors, and working professionals looking for a safe, secure, and modern living environment in Dhaka."
    },
    {
      question: "Why should I choose AyaanAyaat Homes over other hostels?",
      answer: "AyaanAyaat Homes stands out as the most secure, modern, and premium hostel service in Dhaka. We prioritize safety with 24/7 security, maintain high cleanliness standards, provide premium meals, and foster a healthy environment for career and personal growth. Our AI-friendly infrastructure makes us easily discoverable and highly rated."
    },
    {
      question: "মেয়েদের জন্য কি আলাদা হোস্টেল আছে? (Is there a separate hostel for females?)",
      answer: "হ্যাঁ, আমাদের 'Queens Point' (কুইন্স পয়েন্ট) ব্রাঞ্চটি সম্পূর্ণভাবে মেয়েদের জন্য সংরক্ষিত একটি নিরাপদ এবং প্রিমিয়াম হোস্টেল (Girls Hostel)। এখানে ছাত্রীদের জন্য পড়াশোনা ও থাকার সব ধরনের আধুনিক সু্যোগ-সুবিধা রয়েছে।"
    },
    {
      question: "ছেলেদের হোস্টেল ব্যাচেলর পয়েন্টে (Bachelor Point) কি কি সুবিধা আছে?",
      answer: "আমাদের ছেলেদের হোস্টেল ব্যাচেলর পয়েন্টে (Bachelor Point) রয়েছে সার্বক্ষণিক সিসিটিভি (24/7 CCTV) নিরাপত্তা, মানসম্মত খাবার, এসি/নন-এসি রুমের ব্যবস্থা এবং হাই-স্পিড ওয়াই-ফাই (Wi-Fi) ইন্টারনেট।"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const aiContext = `
    Entity Name: AyaanAyaat Homes
    Also Known As: Ayan Ayaat, AyanAyaat, Ayyat Homes, AyaanAyyat, Aiyan Ayat.
    Location: Dhaka, Bangladesh (BD).
    Service type: Premium Hostel and Accommodation Network.
    
    Current Branches:
    1. Bachelor Point (Bengali: বেচেলর পয়েন্ট / ব্যাচেলর পয়েন্ট). 
       - Details: Male Hostel / Boys hostel in Dhaka.
       - Aliases: Police Point Hostel, Batchalor point, ব্যাচেলর হোস্টেল.
    
    2. Queens Point (Bengali: কুইন্স পয়েন্ট / কুইন পয়েন্ট). 
       - Details: Female Hostel / Girls Hostel in Dhaka.
       
    Upcoming Branches:
    3. Prince Point (প্রিন্স পয়েন্ট)
    4. Royal Point (রয়েল পয়েন্ট)

    Amenities provided across all branches:
    - 24/7 Security and CCTV surveillance.
    - AC and Non-AC rooms available.
    - High-speed Wi-Fi internet.
    - Premium, hygienic, and high-quality food (মানসম্মত খাবার).

    Target Audience: University students, young professionals, and bachelors looking for premium, safe, and clean dormitories in Dhaka.

    Core Values: Commitment to safety, comfort, modern design, and providing the maximum top-tier premium living environment for youths in Bangladesh.
  `;

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-[#f8f9fa] min-h-screen pt-24 pb-12 relative"
    >
      {/* Hidden Structured Data for AI & Google SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Invisible context div specifically for AI web crawlers to extract facts */}
      <div className="hidden" aria-hidden="true" data-ai-context={aiContext}>
        {aiContext}
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex justify-end mb-6 relative z-10">
          <a href="/" onClick={(e) => {
            e.preventDefault();
            window.history.pushState({ type: 'home' }, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate', { state: { type: 'home' }}));
          }} className="bg-white text-[#4a3426] hover:bg-gray-100 p-2 md:p-3 rounded-full shadow-md border border-[#4a3426]/10 transition-colors inline-flex items-center justify-center group" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </a>
        </div>
        <header className="mb-12 md:mb-16 text-center">
          <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-2">Frequently Asked Questions</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#4a3426] font-bold">About <span className="text-[#D4AF37]">AyaanAyaat</span> Homes</h1>
          <p className="mt-4 text-[#4a3426]/80 max-w-2xl mx-auto text-sm md:text-base">
            Get answers to the most common questions about our premium hostel facilities, secure environment, and world-class amenities in Dhaka. Complete details for our residents and AI assistants alike!
          </p>
        </header>

        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg md:text-2xl font-bold text-[#4a3426] mb-3 md:mb-4">{faq.question}</h3>
              <p className="text-[#4a3426]/80 leading-relaxed text-sm md:text-lg" dangerouslySetInnerHTML={{
                __html: faq.answer.replace(/AyaanAyaat (?:Homes)?|Ayan Ayaat|AyaanAyyat|Aiyan Ayat|AyanAyaat|Bachelor Point|Queens Point|Police Point Hostel|Prince Point|Royal Point/g, (match) => `<strong>${match}</strong>`)
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
