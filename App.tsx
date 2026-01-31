/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MaleHostel from './components/MaleHostel';
import FemaleHostel from './components/FemaleHostel';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavClick = (target: ViewState) => {
    setView(target);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans selection:bg-[#D4AF37] selection:text-white">
      <Navbar currentView={view} onNavigate={handleNavClick} />
      
      <main>
        {view.type === 'home' && <Home onNavigate={handleNavClick} />}
        {view.type === 'male-hostel' && <MaleHostel onNavigate={handleNavClick} />}
        {view.type === 'female-hostel' && <FemaleHostel onNavigate={handleNavClick} />}
      </main>

      <Footer onNavigate={handleNavClick} />
      <Assistant currentView={view} />
    </div>
  );
}

export default App;