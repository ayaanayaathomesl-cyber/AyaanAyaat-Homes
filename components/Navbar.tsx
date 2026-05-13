/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ViewState } from "../types";

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrolledDeep, setScrolledDeep] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrolledDeep(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isBranchView =
    currentView.type === "male-hostel" || currentView.type === "female-hostel";

  // Dynamic calling logic based on current branch
  const getCallLink = () => {
    if (currentView.type === "female-hostel") return "tel:01304730566";
    if (currentView.type === "male-hostel") return "tel:01628855159";
    return "tel:01975207000"; // General Hotline
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolledDeep 
          ? "top-0"
          : "top-2 md:top-4"
      }`}
    >
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolledDeep
            ? "w-full max-w-[100%] bg-[#002147]/95 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] px-3 md:px-8 lg:px-12 py-3 border-b border-white/20"
            : "w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1400px] bg-[#002147] backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] rounded-full md:rounded-[2.5rem] px-3 sm:px-4 md:px-8 py-3 md:py-2.5 border border-white/20 mx-auto"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate({ type: "home" })}
          className="flex items-center gap-2 md:gap-3 group animate-[fade-in-up_0.8s_ease-out] min-w-0"
        >
          <div className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white shadow-xl overflow-hidden group-hover:scale-105 transition-all duration-300 shrink-0">
            <img 
              src="/logo.png" 
              alt="Ayaan Ayaat Homes" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left flex flex-col justify-center gap-0.5 md:gap-0 min-w-0">
            <h2 className="text-[11px] sm:text-sm md:text-xl font-black text-white leading-none tracking-tight drop-shadow-sm group-hover:text-[#D4AF37] transition-colors whitespace-nowrap truncate">
              Ayaanayaat Homes
            </h2>
            <p className="text-[6px] sm:text-[7px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.25em] text-white/80 font-bold md:mt-1 drop-shadow-sm whitespace-nowrap shrink-0">
              THE MOTHER BRAND
            </p>
          </div>
        </button>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold uppercase tracking-[0.2em] text-white/90 animate-[fade-in-up_1s_ease-out_0.2s_both]">
          <button
            onClick={() => onNavigate({ type: "home" })}
            className="group relative py-2 px-1 hover:text-[#D4AF37] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="drop-shadow-sm">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
          </button>
          <button 
            onClick={() => {
              const navigate = () => {
                const el = document.getElementById("queens-point-card");
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => {
                    el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
                    el.style.transform = "scale(1.05)";
                    el.style.boxShadow = "0 25px 50px -12px rgba(0, 33, 71, 0.25)";
                    el.style.zIndex = "50";
                    setTimeout(() => {
                      el.style.transform = "";
                      el.style.boxShadow = "";
                      el.style.zIndex = "";
                      onNavigate({ type: "female-hostel" });
                    }, 500);
                  }, 600);
                } else {
                  onNavigate({ type: "female-hostel" });
                }
              };

              if (currentView.type !== 'home') {
                onNavigate({ type: 'home' });
                setTimeout(navigate, 400); // wait for page transition
              } else {
                navigate();
              }
            }}
            className="group relative py-2 px-1 hover:text-[#D4AF37] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="drop-shadow-sm">Queens Point</span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
          </button>
          <button
            onClick={() => {
              const navigate = () => {
                const el = document.getElementById("bachelor-point-card");
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => {
                    el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
                    el.style.transform = "scale(1.05)";
                    el.style.boxShadow = "0 25px 50px -12px rgba(0, 33, 71, 0.25)";
                    el.style.zIndex = "50";
                    setTimeout(() => {
                      el.style.transform = "";
                      el.style.boxShadow = "";
                      el.style.zIndex = "";
                      onNavigate({ type: "male-hostel" });
                    }, 500);
                  }, 600);
                } else {
                  onNavigate({ type: "male-hostel" });
                }
              };

              if (currentView.type !== 'home') {
                onNavigate({ type: 'home' });
                setTimeout(navigate, 400); // wait for page transition
              } else {
                navigate();
              }
            }}
            className="group relative py-2 px-1 hover:text-[#D4AF37] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="drop-shadow-sm">Bachelor Point</span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
          </button>
          <button
            onClick={() => {
              onNavigate({ type: "home" });
              setTimeout(() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="group relative py-2 px-1 hover:text-[#D4AF37] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="drop-shadow-sm">Upcoming</span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
          </button>
        </div>

        {/* Action Button */}
        <div className="animate-[fade-in-up_1.2s_ease-out_0.4s_both]">
          {isBranchView ? (
            <a
              href={getCallLink()}
              className="group relative inline-flex items-center justify-center gap-1 sm:gap-2 px-3 md:px-6 py-1.5 md:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#002147] rounded-full font-black text-[8px] md:text-[11px] uppercase tracking-wider md:tracking-widest shadow-[0_8px_20px_-6px_rgba(212,175,55,0.6)] hover:shadow-[0_12px_25px_-6px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-2.5 h-2.5 md:w-4 md:h-4 relative z-10"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative z-10 whitespace-nowrap">Call Now</span>
            </a>
          ) : (
            <a
              href="tel:01975207000"
              className="group relative inline-flex items-center justify-center gap-1 sm:gap-2 px-3 md:px-6 py-1.5 md:py-2.5 bg-white text-[#002147] rounded-full font-black text-[8px] md:text-[11px] uppercase tracking-wider md:tracking-widest shadow-[0_8px_20px_-6px_rgba(255,255,255,0.6)] hover:shadow-[0_12px_25px_-6px_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-red-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-2.5 h-2.5 md:w-4 md:h-4 text-red-600 relative z-10"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.54 2.159a1.83 1.83 0 01-.521 1.748L6.222 8.307a11.042 11.042 0 005.471 5.471l1.488-1.488a1.83 1.83 0 011.748-.521l2.159.54c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 01-3 3h-2.25a16.5 16.5 0 01-16.5-16.5V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative z-10 whitespace-nowrap">Hotline</span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
