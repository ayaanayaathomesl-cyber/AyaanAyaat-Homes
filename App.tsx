/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Home from './components/Home';
import MaleHostel from './components/MaleHostel';
import FemaleHostel from './components/FemaleHostel';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CookiePolicy } from './components/CookiePolicy';
import { ViewState } from './types';
import { AnimatePresence, motion } from 'motion/react';

function App() {
  const [view, setView] = useState<ViewState>(() => {
    const path = window.location.pathname;
    if (path === '/bachelorpoint') {
      return { type: 'male-hostel' };
    } else if (path === '/queenspoint') {
      return { type: 'female-hostel' };
    } else if (path === '/privacy') {
      return { type: 'privacy' };
    } else if (path === '/terms') {
      return { type: 'terms' };
    } else if (path === '/cookies') {
      return { type: 'cookies' };
    } else if (path === '/admin') {
      return { type: 'admin' };
    }
    return { type: 'home' };
  });

  useEffect(() => {
    // Initial replaceState to ensure state exists
    const currentPath = window.location.pathname;
    window.history.replaceState({ type: view.type }, '', currentPath);
    
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.type) {
        setView(event.state);
      } else {
        const path = window.location.pathname;
        if (path === '/bachelorpoint') {
          setView({ type: 'male-hostel' });
        } else if (path === '/queenspoint') {
          setView({ type: 'female-hostel' });
        } else if (path === '/privacy') {
          setView({ type: 'privacy' });
        } else if (path === '/terms') {
          setView({ type: 'terms' });
        } else if (path === '/cookies') {
          setView({ type: 'cookies' });
        } else if (path === '/admin') {
          setView({ type: 'admin' });
        } else {
          setView({ type: 'home' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Remove automatic scroll jump as it breaks exit animations
  // We'll let the user scroll up, or gently scroll them up after transition

  const handleNavClick = (target: ViewState) => {
    if (target.type !== view.type) {
      setView(target);
      let newPath = '/';
      if (target.type === 'male-hostel') newPath = '/bachelorpoint';
      if (target.type === 'female-hostel') newPath = '/queenspoint';
      if (target.type === 'privacy') newPath = '/privacy';
      if (target.type === 'terms') newPath = '/terms';
      if (target.type === 'cookies') newPath = '/cookies';
      if (target.type === 'admin') newPath = '/admin';
      window.history.pushState({ type: target.type }, '', newPath);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans selection:bg-[#D4AF37] selection:text-white flex flex-col relative overflow-x-hidden pb-12 lg:pb-0">
      {view.type !== 'admin' && <Navbar currentView={view} onNavigate={handleNavClick} />}
      {view.type !== 'admin' && <MobileNav currentView={view} onNavigate={handleNavClick} />}
      
      <main className="flex-grow flex flex-col relative">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {view.type === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <Home onNavigate={handleNavClick} />
            </motion.div>
          )}
          {view.type === 'male-hostel' && (
            <motion.div
              key="male-hostel"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <MaleHostel onNavigate={handleNavClick} />
            </motion.div>
          )}
          {view.type === 'female-hostel' && (
            <motion.div
              key="female-hostel"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <FemaleHostel onNavigate={handleNavClick} />
            </motion.div>
          )}
          {view.type === 'privacy' && (
            <motion.div
              key="privacy"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <PrivacyPolicy />
            </motion.div>
          )}
          {view.type === 'terms' && (
            <motion.div
              key="terms"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <TermsOfService />
            </motion.div>
          )}
          {view.type === 'cookies' && (
            <motion.div
              key="cookies"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <CookiePolicy />
            </motion.div>
          )}
          {view.type === 'admin' && (
            <motion.div
              key="admin"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex-grow flex flex-col"
            >
              <Admin onNavigate={handleNavClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {view.type !== 'admin' && <Footer onNavigate={handleNavClick} />}
      {view.type !== 'admin' && <Assistant currentView={view} />}
    </div>
  );
}

export default App;