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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const chatSessionRef = useRef<any>(null);

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

  useEffect(() => {
    let greeting = 'আসসালামু আলাইকুম! আমি AyaanAyaat Homes-এর এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
    
    if (currentView.type === 'female-hostel') {
      greeting = 'আসসালামু আলাইকুম! কুইন্স পয়েন্ট (ফিমেল হোস্টেল) সম্পর্কিত কোনো তথ্য বা ভাড়ার তালিকা জানতে চান?';
    } else if (currentView.type === 'male-hostel') {
      greeting = 'আসসালামু আলাইকুম! ব্যাচেলর পয়েন্ট (মেল হোস্টেল) এর সিট ভাড়া বা সুবিধা সম্পর্কে জানতে চান?';
    }

    if (messages.length === 0) {
      setMessages([{ role: 'model', text: greeting, timestamp: Date.now() }]);
    }
  }, [currentView.type]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const getKnowledgeBase = () => {
    return `
    ROLE: You are the Senior Relationship Manager AI for "AyaanAyaat Homes".
    TONE: Professional, Polite, Warm, Helpful, and Trustworthy. Speak primarily in Bengali (Polite/আপনি form), but use English if the user asks in English.
    
    BRAND INFO:
    - Name: AyaanAyaat Homes.
    - Slogan: "Affordable luxury and modern lifestyle."
    - Hotline: 01975-207000

    BRANCH 1: BACHELOR POINT (MALE HOSTEL)
    - Location: 367, Gaowair, Dakhinkhan, Dhaka-1230.
    - Phone: 01628-855159
    - Pricing (Monthly with 3 meals):
      * Economy AC (9-seat): 7,999 TK
      * Gold AC (6-seat): 8,499 TK
      * Diamond AC (6-seat): 10,500 TK
      * Exclusive AC (3-seat): 12,499 TK
      * Economy Non-AC (8-seat): 6,999 TK
      * Single Cabin Non-AC: 8,499 TK
      * Single Room Non-AC: 11,999 TK
    - Security Deposit: 1000 TK (Refundable).
    - Facilities: Gym, Rooftop Garden, High-speed Wifi, Generator, Cleaning.

    BRANCH 2: QUEENS POINT (FEMALE HOSTEL)
    - Location: House# 189, Road# 13, Sector# 10, Ranavola Avenue, Kamarpara, Uttara.
    - Phone: 01304-730566
    - Pricing (Monthly with 3 meals):
      * Single Room AC: 31,500 TK
      * Single Room Non-AC: 15,000 - 40,000 TK (Depends on duration)
      * 2 Seats AC: 20,000 TK
      * 4 Seats AC: 17,000 TK
      * 4 Seats Non-AC: 11,500 TK
      * 6 Seats AC: 12,000 TK
    - Facilities: Female Warden, Biometric Entry, CCTV, 3 Times Food, Laundry, Attached Bath available.

    RULES:
    1. If asked about booking, ask them to call the specific branch number or click the WhatsApp button.
    2. Keep answers concise. Do not write long paragraphs. Use bullet points.
    3. If asked about something not in this data, suggest calling the hotline (01975-207000).
    4. Always emphasize "Security" and "Hygienic Food".
    `;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: Date.now() }]);
    setIsThinking(true);
    setHasError(false);

    const apiKey = process.env.API_KEY;

    if (!apiKey || apiKey.length < 5) {
      console.error("Missing API Key");
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'দুঃখিত, বর্তমানে সার্ভার মেইনটেনেন্স চলছে। অনুগ্রহ করে আমাদের হটলাইনে কল করুন: ০১৯৭৫-২০৭০০০', 
          timestamp: Date.now() 
        }]);
        setIsThinking(false);
        setHasError(true);
      }, 1000);
      return;
    }

    try {
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: getKnowledgeBase(),
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        });
      }

      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);

      const result = await chatSessionRef.current.sendMessageStream({ message: userText });
      
      let fullText = '';
      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullText += chunkText;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          newMessages[newMessages.length - 1] = { ...lastMsg, text: fullText };
          return newMessages;
        });
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last.role === 'model' && last.text === '') {
            return [...prev.slice(0, -1), { role: 'model', text: 'দুঃখিত, একটি প্রযুক্তিগত সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন বা হটলাইনে কল করুন।', timestamp: Date.now() }];
        }
        return [...prev, { role: 'model', text: 'দুঃখিত, একটি প্রযুক্তিগত সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', timestamp: Date.now() }];
      });
      setHasError(true);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">
      
      {/* Floating Action Buttons for Branches */}
      {isBranchView && (
        <>
          <a 
            href={mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-16 md:h-16 bg-white text-[#EA4335] rounded-full shadow-[0_4px_20px_rgba(234,67,53,0.3)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border-2 border-[#EA4335]/10 group relative animate-float-mini"
            title="Our Location on Google Maps"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
               <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.152-.722c1.102-.736 2.531-1.748 3.82-3.114 1.256-1.337 2.162-2.715 2.162-4.565 0-4.639-3.76-8.5-8.5-8.5s-8.5 3.861-8.5 8.5c0 1.85 1.006 3.228 2.262 4.565 1.289 1.366 2.718 2.378 4.02 3.114a16.707 16.707 0 001.152.722zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
             </svg>
             <span className="absolute right-full mr-4 bg-[#EA4335] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Location</span>
          </a>

          <a 
            href={`https://wa.me/88${getFloatingWaNumber()}?text=${getWaMessage()}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-16 md:h-16 bg-white text-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 border-2 border-[#25D366]/10 animate-whatsapp animate-float-mini group relative"
            title="WhatsApp Booking"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" className="drop-shadow-sm group-hover:rotate-12 transition-transform">
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

      {/* Main AI Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative ${isOpen ? 'bg-white text-[#002147]' : 'bg-[#002147] text-[#D4AF37] border-[3px] border-[#D4AF37]'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#002147]"></span>
            <span className="text-2xl md:text-3xl font-serif italic font-bold">AI</span>
          </>
        )}
      </button>

      {/* Main Chat Window */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[380px] h-[500px] md:h-[600px] rounded-2xl shadow-[0_10px_50px_-10px_rgba(0,33,71,0.3)] flex flex-col overflow-hidden border border-gray-100 animate-fade-in-up origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#002147] p-4 flex items-center justify-between shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-[#D4AF37]/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#D4AF37]">
                  <path d="M16.5 7.5h-9v9h9v-9z" />
                  <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75V6.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A1.5 1.5 0 004.5 8.25v7.5A1.5 1.5 0 006 17.25h12a1.5 1.5 0 001.5-1.5v-7.5A1.5 1.5 0 0018 6.75H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">AyaanAyaat AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${hasError ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`}></span>
                  <p className="text-[10px] text-white/70">{hasError ? 'System Offline' : 'Online'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setMessages([])} className="text-[#D4AF37] text-[10px] font-bold hover:underline relative z-10 px-2">
              Clear Chat
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin"
            ref={scrollRef}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full animate-slide-in-right ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#002147] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text ? (
                     <div className="whitespace-pre-wrap">{msg.text}</div>
                  ) : (
                    <div className="flex gap-1 h-5 items-center px-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isThinking && messages[messages.length - 1]?.role === 'user' && (
               <div className="flex w-full justify-start animate-fade-in-up">
                 <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full typing-dot"></div>
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full typing-dot"></div>
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full typing-dot"></div>
                    </div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-[#D4AF37] focus-within:bg-white transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
                disabled={isThinking}
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className={`p-2 rounded-full transition-all ${
                  !inputValue.trim() || isThinking 
                    ? 'text-gray-400' 
                    : 'text-[#002147] hover:bg-[#D4AF37]/20 active:scale-90'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;