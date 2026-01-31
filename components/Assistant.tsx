/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ViewState } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AssistantProps {
  currentView: ViewState;
}

const Assistant: React.FC<AssistantProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি AyaanAyaat Homes-এর অফিসিয়াল এআই এসিস্ট্যান্ট। আমাদের হোস্টেল সার্ভিস, লোকেশন বা বুকিং নিয়ে যেকোনো প্রশ্ন থাকলে আমাকে করতে পারেন।', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the active chat session for history support
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const isBranchView = currentView.type === 'male-hostel' || currentView.type === 'female-hostel';

  const mapLink = currentView.type === 'male-hostel' 
    ? "https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" 
    : "https://maps.app.goo.gl/wAa3pBmE6b6SVWks9";

  const getFloatingWaNumber = () => {
    if (currentView.type === 'female-hostel') return "01304730566";
    if (currentView.type === 'male-hostel') return "01628855159";
    return "01975207000";
  };
  
  const getWaMessage = () => {
    if (currentView.type === 'female-hostel') {
      return encodeURIComponent("আসসালামু আলাইকুম, আমি কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
    } else if (currentView.type === 'male-hostel') {
      return encodeURIComponent("আসসালামু আলাইকুম, আমি ব্যাচেলর পয়েন্ট (মেল হোস্টেল) সম্পর্কে বিস্তারিত তথ্য এবং সিট বুকিং এর প্রক্রিয়া জানতে চাচ্ছি।");
    }
    return encodeURIComponent("আসসালামু আলাইকুম, আমি AyaanAyaat Homes-এর আবাসন প্যাকেজ সম্পর্কে বিস্তারিত জানতে চাচ্ছি। দয়া করে আমাকে সাহায্য করুন।");
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue.trim();
    const userMsg: ChatMessage = { role: 'user', text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Check if API Key exists
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === "") {
        const hotline = getFloatingWaNumber();
        setTimeout(() => {
            const fallbackMsg: ChatMessage = { 
                role: 'model', 
                text: `ধন্যবাদ আপনার আগ্রহের জন্য। বর্তমানে অটোমেটেড চ্যাট সেবাটি বন্ধ আছে। অনুগ্রহ করে বিস্তারিত তথ্যের জন্য আমাদের হটলাইনে (${hotline}) কল করুন অথবা WhatsApp এ মেসেজ দিন।`, 
                timestamp: Date.now() 
            };
            setMessages(prev => [...prev, fallbackMsg]);
            setIsThinking(false);
        }, 1000);
        return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      if (!chatSessionRef.current) {
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `
              You are the "Senior Relationship Manager AI" for AyaanAyaat Homes. Your goal is to provide fast, accurate, and polite information about our hostels.
              
              ABOUT THE BRAND:
              - Name: AyaanAyaat Homes.
              - Philosophy: "Affordable luxury and modern lifestyle." It's a "Second Home."
              - Services: All-inclusive living (Stay, 3 meals, cleaning, high-speed WiFi).
              
              BRANCH 1: QUEENS POINT (FEMALE HOSTEL)
              - Address: House# 189, Road# 13, Sector# 10, Ranavola Avenue, Kamarpara, Uttara, Dhaka.
              - Phone: 01304730566
              - Packages (Monthly/30 Days):
                * Single AC: 31,500৳
                * Single Non-AC: 15,000৳
                * 2 Seats AC: 20,000৳
                * 4 Seats AC: 17,000৳
                * 4 Seats Non-AC: 11,500৳
                * 6 Seats AC: 12,000৳
              - Security: 24/7 CCTV, female wardens, biometric access, firefighting system.
              
              BRANCH 2: BACHELOR POINT (MALE HOSTEL)
              - Address: 367, Gaowair, Dakhinkhan, Dhaka-1230.
              - Phone: 01628855159
              - Packages (Monthly):
                * Economy AC (9-seat): 7,999৳
                * Gold AC (6-seat): 8,499৳
                * Diamond AC (6-seat): 10,500৳
                * Exclusive AC (3-seat): 12,499৳
                * Economy Non-AC (8-seat): 6,999৳
                * Single Cabin Non-AC: 8,499৳
                * Single Room Non-AC: 11,999৳
              - Refundable Security Deposit: 1,000৳ (for Male branch).
              
              FACILITIES:
              - High-speed WiFi, 3 hygienic meals, RO Filtered water, Laundry, Housekeeping, Geyser, Generator backup.
              - Male hostel specific: Modern Gym, Rooftop Garden, Reading zone.
              - Female hostel specific: Pet zone (Cats & Birds), Green Rooftop Cafe, Prayer room.
              
              FOOD MENU:
              - Breakfast: Khichuri+Egg / Paratha+Vaji / Toster.
              - Lunch: Pulao+Mutton/Chicken / Fish Bhuna / Rice+Dal+Vaji.
              - Dinner: Rice+2 types of Bhorta+Dal / Chicken Bhuna.
              
              GENERAL HOTLINE: 01975207000

              BEHAVIOR RULES:
              1. Always speak in polite Bengali ("আপনি"). Answer in English only if the user asks in English.
              2. Be very professional and helpful. Use emojis to look friendly.
              3. If someone asks for a price not listed, give them the nearest range and ask them to call the hotline.
              4. If they ask about booking, encourage them to click the "Book Now" or "WhatsApp" button on the site.
              5. Keep answers concise and bulleted for fast reading.
            `,
            temperature: 0.7,
            topP: 0.95,
          },
        });
      }

      const aiMsgPlaceholder: ChatMessage = { role: 'model', text: '', timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsgPlaceholder]);

      const streamResponse = await chatSessionRef.current.sendMessageStream({ message: userText });
      
      let fullResponse = '';
      for await (const chunk of streamResponse) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { ...updated[updated.length - 1], text: fullResponse };
          }
          return updated;
        });
      }

    } catch (error) {
      console.error("AI Error:", error);
      const hotline = getFloatingWaNumber();
      const errorMsg: ChatMessage = { 
        role: 'model', 
        text: `দুঃখিত, টেকনিক্যাল সমস্যার কারণে উত্তর দিতে পারছি না। অনুগ্রহ করে সরাসরি আমাদের হটলাইনে (${hotline}) কল করুন। আমরা আপনাকে সাহায্য করতে পারলে খুশি হব।`, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev.slice(0, -1), errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
      
      {isBranchView && (
        <>
          <a 
            href={mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-16 h-16 bg-white text-[#EA4335] rounded-full shadow-[0_15px_35px_rgba(234,67,53,0.3)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border-4 border-[#EA4335]/10 animate-float-mini group relative"
            title="Our Location on Google Maps"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" className="drop-shadow-sm group-hover:bounce transition-transform">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span className="absolute right-full mr-4 bg-[#EA4335] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              Our Location
            </span>
          </a>

          <a 
            href={`https://wa.me/88${getFloatingWaNumber()}?text=${getWaMessage()}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-16 h-16 bg-white text-[#25D366] rounded-full shadow-[0_15px_35px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border-4 border-[#25D366]/10 animate-whatsapp animate-float-mini group relative"
            title="WhatsApp Booking"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 16 16" className="drop-shadow-sm group-hover:rotate-12 transition-transform">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.061 3.978l-1.127 4.121 4.212-1.105a7.959 7.959 0 0 0 3.785.959h.004c4.367 0 7.927-3.558 7.931-7.927a7.863 7.863 0 0 0-2.327-5.621zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.501c.004-3.623 2.961-6.58 6.586-6.58a6.547 6.547 0 0 1 4.646 1.929 6.547 6.547 0 0 1 1.929 4.646c-.004 3.624-2.963 6.58-6.585 6.58z"/>
            </svg>
            <div className="absolute right-full mr-5 pointer-events-none">
               <span className="bg-[#25D366] text-white text-[12px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.5)] border-2 border-white/20 flex items-center gap-2 animate-float-mini">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                  Book Now
               </span>
               <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-[#25D366] rotate-45 border-r border-t border-white/20"></div>
            </div>
          </a>
        </>
      )}

      {isOpen && (
        <div className="absolute bottom-[80px] right-0 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,33,71,0.3)] w-[350px] md:w-[380px] h-[550px] flex flex-col overflow-hidden border border-[#D4AF37]/20 animate-fade-in-up">
          <div className="bg-[#002147] p-5 flex justify-between items-center border-b border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#D4AF37] rounded-full flex items-center justify-center bg-[#D4AF37]/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#D4AF37]">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.063C4.028 22.5 3.188 21.66 3.188 20.625v-6.198a.529.529 0 01.09-.086L12 5.432z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#D4AF37] font-bold text-sm tracking-tight leading-none uppercase">Assistant</h4>
                <p className="text-[10px] text-white/60 mt-1">Ready to help you</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-[#002147] text-white rounded-tr-none' 
                    : 'bg-white text-[#1a1a1a] border border-gray-100 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {m.text || (isThinking && i === messages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-[11px] text-[#002147]/60 italic font-medium px-2">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
                Processing...
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-[#D4AF37] transition-all">
              <input 
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400" 
                placeholder="আমাদের হোস্টেল নিয়ে কিছু জিজ্ঞেস করুন..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isThinking}
              />
              <button 
                onClick={handleSend} 
                disabled={isThinking || !inputValue.trim()}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                  isThinking || !inputValue.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#002147] text-[#D4AF37] hover:scale-105'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">AyaanAyaat Smart Support</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#002147] border-[3px] border-[#D4AF37] text-[#D4AF37] rounded-full shadow-[0_10px_30px_rgba(0,33,71,0.3)] flex items-center justify-center hover:scale-110 transition-all active:scale-90 group relative"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative flex flex-col items-center justify-center">
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#002147] animate-ping"></span>
             <span className="text-3xl font-black tracking-tighter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] font-serif italic select-none">
               AI
             </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Assistant;