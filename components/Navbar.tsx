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
    <>
      <style>{`
        .nav-logo-custom {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(201,168,76,0.5);
          animation: logoPulse 3s ease-in-out infinite;
          flex-shrink: 0;
          overflow: hidden;
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.5); }
          50%       { box-shadow: 0 0 40px rgba(201,168,76,0.9); }
        }
        
        .nav-brand-name-custom {
          display: block;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 17px;
          color: #FFFFFF;
          letter-spacing: .5px;
          line-height: 1.2;
        }
        
        .nav-brand-tag-custom {
          display: block;
          font-size: 10px;
          letter-spacing: 3px;
          color: #C9A84C;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .nav-links-custom a {
          text-decoration: none;
          font-family: 'Hind Siliguri', sans-serif;
          font-size: 14px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          position: relative;
          transition: color .3s;
        }
        .nav-links-custom a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #C9A84C;
          transition: width .3s;
        }
        .nav-links-custom a:hover, .nav-links-custom a.active { color: #E8C97A; }
        .nav-links-custom a:hover::after, .nav-links-custom a.active::after { width: 100%; }

        .btn-hotline-custom {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          border-radius: 50px;
          background: #FFFFFF;
          color: #1A1208;
          font-family: 'Hind Siliguri', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background .3s, transform .2s, box-shadow .3s;
          box-shadow: 0 4px 20px rgba(255,255,255,0.15);
          white-space: nowrap;
        }
        .btn-hotline-custom:hover {
          background: #C9A84C;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201,168,76,0.5);
        }
        .btn-hotline-custom svg { width: 14px; height: 14px; }
        @media (max-width: 768px) {
          .nav-logo-custom { width: 40px; height: 40px; }
          .btn-hotline-custom { padding: 8px 16px; font-size: 11px; }
        }
      `}</style>
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
              ? "w-full max-w-[100%] bg-[rgba(20,12,3,0.75)] backdrop-blur-[16px] px-4 md:px-12 py-2 md:py-3.5 border-b border-[rgba(201,168,76,0.18)]"
              : "w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1400px] bg-[rgba(20,12,3,0.75)] backdrop-blur-[16px] rounded-full md:rounded-[2.5rem] px-3 md:px-6 py-2 md:py-3.5 border border-[rgba(201,168,76,0.18)] mx-auto"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate({ type: "home" })}
            className="flex items-center gap-3 text-left min-w-0"
          >
            <div className="nav-logo-custom">
              <img src="/logo.png" alt="Ayaan Ayaat Homes" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="nav-brand-name-custom">Ayaanayaat Homes</span>
              <span className="nav-brand-tag-custom">The Mother Brand</span>
            </div>
          </button>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-9 nav-links-custom">
            <a
              href="/"
              className={currentView.type === "home" ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavigate({ type: "home" }); }}
            >
              Home
            </a>
            <a
              href="/queenspoint"
              className={currentView.type === "female-hostel" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: "female-hostel" });
              }}
            >
              Queens Point
            </a>
            <a
              href="/bachelorpoint"
              className={currentView.type === "male-hostel" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: "male-hostel" });
              }}
            >
              Bachelor Point
            </a>
            <a
              href="/#upcoming"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: "home" });
                setTimeout(() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
            >
              Upcoming
            </a>
          </div>

          {/* Action Button */}
          <div>
            <a href={getCallLink()} className="btn-hotline-custom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
              Hotline
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
