
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../src/lib/firebase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const defaultPhilosophyImages = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1502672260266-1c1c24240938?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
  ];
  
  const [philosophyImages, setPhilosophyImages] = useState<string[]>(defaultPhilosophyImages);
  const [homeBgImages, setHomeBgImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isManual, setIsManual] = useState(false);

  const [typedL1, setTypedL1] = useState('');
  const [typedL2, setTypedL2] = useState('');
  const [activeHighlight, setActiveHighlight] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ branches: 0, residents: 0, experience: 0 });
  const hasAnimatedRef = React.useRef(false);

  useEffect(() => {
    const slides = [
      { l1: 'ছাত্র ছাত্রী এবং সকল পেশার মানুষের জন্য', l2: 'আধুনিক হোস্টেল সল্যুশন', hl: 'ছাত্র ছাত্রী' },
      { l1: 'নিরাপদ ও আরামদায়ক আবাসন', l2: 'উত্তরা এবং দক্ষিণখানে আমাদের শাখা', hl: 'নিরাপদ' },
      { l1: '৩ বেলা মানসম্মত খাবার ও হাই-স্পিড ওয়াই-ফাই', l2: 'স্বাচ্ছন্দ্যময় জীবনযাত্রার নিশ্চয়তা', hl: 'খাবার' },
      { l1: '২৪/৭ নিরাপত্তা ও সিসিটিভি মনিটরিং', l2: 'আপনার পরিবারের বিশ্বাসযোগ্য আশ্রয়', hl: '২৪/৭' }
    ];
    let active = true;
    let slideIdx = 0;

    const timer = async () => {
      // Delay initial typewriter start a bit to let page intro complete
      await new Promise(resolve => setTimeout(resolve, 1800));
      while (active) {
        const slide = slides[slideIdx % slides.length];
        setCurrentBgIndex(slideIdx);
        setTypedL2('');
        setActiveHighlight(slide.hl);
        
        // Type Line 1
        for (let i = 0; i <= slide.l1.length; i++) {
          if (!active) return;
          setTypedL1(slide.l1.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 55));
        }

        // Type Line 2
        for (let i = 0; i <= slide.l2.length; i++) {
          if (!active) return;
          setTypedL2(slide.l2.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 55));
        }

        // Pause state on full description
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Erase Line 2
        for (let i = slide.l2.length; i >= 0; i--) {
          if (!active) return;
          setTypedL2(slide.l2.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 20));
        }

        // Erase Line 1
        for (let i = slide.l1.length; i >= 0; i--) {
          if (!active) return;
          setTypedL1(slide.l1.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 20));
        }

        await new Promise(resolve => setTimeout(resolve, 400));
        slideIdx++;
      }
    };

    timer();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const PARTICLE_COUNT = 70;
    const particles: any[] = [];
    const bokeh: any[] = [];
    const stars: any[] = [];
    const colors = [
      'rgba(201,168,76,', 'rgba(232,201,122,', 'rgba(245,228,176,'
    ];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: -(Math.random() * 0.6 + 0.2),
        life: Math.random(),
        maxLife: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shimmer: Math.random() * Math.PI * 2,
        shimmerSpeed: Math.random() * 0.04 + 0.01,
      });
    }

    // Firefly-style: also add a few larger bokeh circles
    for (let i = 0; i < 12; i++) {
      bokeh.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 18 + 8,
        dx: (Math.random() - 0.5) * 0.25,
        dy: -(Math.random() * 0.3 + 0.1),
        alpha: Math.random() * 0.08 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    function spawnStar() {
      if (Math.random() > 0.98) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: 0,
          len: Math.random() * 120 + 60,
          speed: Math.random() * 8 + 5,
          alpha: 1.0,
          angle: Math.PI / 4 + Math.random() * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function drawParticles() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bokeh
      bokeh.forEach(b => {
        b.x += b.dx; b.y += b.dy;
        b.pulse += b.pulseSpeed;
        if (b.y < -50) { b.y = canvas.height + 50; b.x = Math.random() * canvas.width; }
        const alpha = b.alpha + Math.sin(b.pulse) * 0.03;
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, b.color + alpha + ')');
        gradient.addColorStop(1, b.color + '0)');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Sparks / fireflies
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        p.life += 0.004;
        p.shimmer += p.shimmerSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.life = 0;
        }

        const lifeAlpha = Math.sin(p.life * Math.PI);
        const alpha = lifeAlpha * (0.5 + Math.sin(p.shimmer) * 0.3);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, p.color + alpha + ')');
        grd.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.min(alpha * 2, 1) + ')';
        ctx.fill();
      });

      // Shooting Stars
      spawnStar();
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        const dx = Math.cos(s.angle) * s.speed;
        const dy = Math.sin(s.angle) * s.speed;
        s.x += dx; s.y += dy;
        s.alpha -= 0.025;
        if (s.alpha <= 0) {
          stars.splice(i, 1);
          continue;
        }
        ctx.save();
        const sg = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        sg.addColorStop(0, s.color + s.alpha + ')');
        sg.addColorStop(1, s.color + '0)');
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    }
    drawParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    const animateCounters = () => {
      hasAnimatedRef.current = true;
      const targets = { branches: 4, residents: 1000, experience: 5 };
      const current = { branches: 0, residents: 0, experience: 0 };
      const steps = {
        branches: targets.branches / 60,
        residents: targets.residents / 60,
        experience: targets.experience / 60
      };
      
      const timer = setInterval(() => {
        current.branches = Math.min(current.branches + steps.branches, targets.branches);
        current.residents = Math.min(current.residents + steps.residents, targets.residents);
        current.experience = Math.min(current.experience + steps.experience, targets.experience);
        
        setStats({
          branches: Math.floor(current.branches),
          residents: Math.floor(current.residents),
          experience: Math.floor(current.experience)
        });
        
        if (current.branches >= targets.branches && current.residents >= targets.residents && current.experience >= targets.experience) {
          clearInterval(timer);
        }
      }, 30);
    };
    setTimeout(animateCounters, 1600);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${cx * 30}px, ${cy * 30}px) scale(1)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-cx * 25}px, ${-cy * 25}px) scale(1)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Fetch philosophy images
    const unsubPhil = onSnapshot(doc(db, 'settings', 'philosophy'), (d) => {
      if (d.exists()) {
        const data = d.data();
        if (data.images && Array.isArray(data.images) && data.images.length > 0) {
          setPhilosophyImages(data.images);
        } else if (data.imageUrl) {
          setPhilosophyImages([data.imageUrl]);
        }
      }
    });

    // Fetch background images
    const unsubBg = onSnapshot(doc(db, 'settings', 'homeBackgrounds'), (d) => {
      if (d.exists()) {
        const data = d.data();
        if (data.images && Array.isArray(data.images)) {
          // Exclude the bedroom with two wine glasses image (photo-1616594039964-ae9021a400a0)
          setHomeBgImages(data.images.filter((img: string) => !img.includes("photo-1616594039964-ae9021a400a0")));
        }
      }
    });

    return () => {
      unsubPhil();
      unsubBg();
    };
  }, []);

  // Background images are now synchronized with the high-end typewriter slides

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIsManual(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % philosophyImages.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }, 400);
    }, 4000); // Change image every 4 seconds automatically
    return () => clearInterval(interval);
  }, [philosophyImages.length, isHovered]);

  const handleNextImage = () => {
    if (isAnimating) return;
    setIsManual(true);
    setCurrentImageIndex((prev) => (prev + 1) % philosophyImages.length);
  };

  const scrollToBranches = () => {
    const el = document.getElementById('our-branches');
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let start: number | null = null;

      // Disable native smooth scroll globally to prevent stuttering during JS animation
      document.documentElement.style.scrollBehavior = 'auto';

      const easeInOutQuart = (t: number) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutQuart(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          // Restore native smooth scroll after animation completes
          document.documentElement.style.scrollBehavior = 'smooth';
        }
      };

      requestAnimationFrame(animation);
    }
  };


  const defaultBgImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600"
  ];
  const activeBgImages = homeBgImages && homeBgImages.length >= 1 ? homeBgImages : defaultBgImages;

  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight || !text.includes(highlight)) return text;
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-[#E2C46A]">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  useGSAP(() => {
    // Scroll-based parallax for hero section background
    gsap.to('.bg-wrap', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 150,
      scale: 1.05,
      ease: 'none'
    });

    // 1. Philosophy Content Parallax
    gsap.from('.philosophy-content > *', {
      scrollTrigger: {
        trigger: '.philosophy-content',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out'
    });

    // 2. Welcome underline smooth reveal
    gsap.from('.welcome-underline', {
      scrollTrigger: {
        trigger: '.welcome',
        start: 'top 80%',
      },
      width: 0,
      duration: 1.2,
      ease: 'power4.out'
    });

    // 3. Branches Section Title reveal
    gsap.from('.br-section-header > *', {
      scrollTrigger: {
        trigger: '.br-section-header',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });

    // 4. Branch Cards powerful stagger
    gsap.from('.br-new-card', {
      scrollTrigger: {
        trigger: '.br-branches-grid',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'back.out(1.2)'
    });

    // 5. Parallax for images inside branch cards
    gsap.utils.toArray('.br-card-image img').forEach((img: any) => {
      gsap.fromTo(img, 
        { y: -15, scale: 1.05 }, 
        {
          y: 15,
          scrollTrigger: {
            trigger: img.parentElement.parentElement, // triggers on the card
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          ease: 'none'
        }
      );
    });

    // 6. Upcoming Branches reveal
    gsap.from('#upcoming .max-w-6xl > div, #upcoming .grid > div', {
      scrollTrigger: {
        trigger: '#upcoming',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="bg-[#f8f6f0] text-[#4a3426] font-sans w-full max-w-full overflow-x-hidden" ref={containerRef}>
      <style>{`
        /* Google Fonts provided by user */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        
        :root {
          --gold:       #C9A84C;
          --gold-light: #E8C97A;
          --gold-pale:  #F5E4B0;
          --dark:       #080602;
          --cream:      #F8F0DC;
          --white:      #FFFFFF;
        }

        .custom-hero-scope {
          font-family: 'Hind Siliguri', sans-serif;
          color: var(--white);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          width: 100%; height: 100vh;
          min-height: 680px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: var(--dark);
        }

        /* ── BACKGROUND LAYERS ── */
        .bg-wrap {
          position: absolute; inset: 0; z-index: 0; overflow: hidden;
        }

        /* High-end full-width background slideshow */
        .bg-slides {
          position: absolute; inset: 0;
        }
        .bg-slide {
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 1.8s ease-in-out;
          pointer-events: none;
        }
        .bg-slide.active {
          opacity: 1;
        }
        .bg-slide img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(.60) saturate(.90) contrast(1.02);
          transition: transform 14s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1.02);
        }
        .bg-slide.active img {
          transform: scale(1.1); /* Slow majestic Ken Burns zoom */
        }

        /* Dark unified overlay */
        .bg-master-overlay {
          position: absolute; inset: 0; z-index: 2;
          background:
            linear-gradient(180deg,
              rgba(8,6,2,.45) 0%,
              rgba(8,6,2,.20) 30%,
              rgba(8,6,2,.25) 60%,
              rgba(8,6,2,.65) 100%
            ),
            linear-gradient(90deg, rgba(8,6,2,.4) 0%, transparent 20%, transparent 80%, rgba(8,6,2,.4) 100%);
        }

        /* Gold vignette pulse */
        .bg-vignette {
          position: absolute; inset: 0; z-index: 3;
          background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(8,6,2,.30) 100%);
        }

        /* Noise grain overlay */
        .bg-grain {
          position: absolute; inset: 0; z-index: 4; opacity: .03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          animation: grainMove 0.15s steps(2) infinite;
        }
        @keyframes grainMove {
          0% { transform: translate(0,0); } 25% { transform: translate(-2px,1px); } 50% { transform: translate(1px,-1px); } 75% { transform: translate(2px,2px); } 100% { transform: translate(-1px,0); }
        }

        /* Diagonal light sweep */
        .bg-sweep {
          position: absolute; inset: 0; z-index: 5;
          background: linear-gradient(110deg, transparent 0%, rgba(201,168,76,.04) 48%, rgba(201,168,76,.08) 50%, transparent 52%);
          animation: sweepMove 8s ease-in-out infinite;
        }
        @keyframes sweepMove {
          0% { transform: translateX(-100%); } 100% { transform: translateX(200%); }
        }

        /* Floating particles drawn on canvas */
        #particles { position: absolute; inset: 0; z-index: 6; pointer-events: none; }

        /* Ambient gradient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(95px);
          opacity: .4;
          pointer-events: none;
          z-index: 1;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
          top: -100px; left: -100px;
          animation: orbFloat1 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #8B6914 0%, transparent 70%);
          bottom: -80px; right: -80px;
          animation: orbFloat2 15s ease-in-out infinite;
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.15); }
        }

        /* ── HERO CONTENT ── */
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 24px;
          max-width: 860px;
          width: 100%;
        }

        .badge {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 7px 20px;
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 50px;
          font-size: 10.5px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;
          backdrop-filter: blur(10px);
          background: rgba(201,168,76,0.06);
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .25; transform: scale(.7); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(54px, 8.5vw, 106px);
          font-weight: 900;
          line-height: .92;
          letter-spacing: -2px;
          color: var(--white);
          margin-bottom: 2px;
          text-shadow: 0 4px 50px rgba(0,0,0,.6);
          opacity: 0;
          animation: fadeUp .9s .6s cubic-bezier(.16,1,.3,1) forwards;
        }
        .hero-title span {
          color: var(--gold-light);
          display: block;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(44px, 7vw, 86px);
          line-height: .98;
          text-shadow: 0 0 85px rgba(201,168,76,.3);
        }

        .hero-divider {
          display: flex; align-items: center; gap: 16px;
          margin: 24px auto;
          width: 220px;
          opacity: 0;
          animation: fadeUp .6s .85s ease forwards;
        }
        .dline { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,168,76,.5)); }
        .dline.r { background: linear-gradient(to left, transparent, rgba(201,168,76,.5)); }
        .ddiamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }

        /* MULTI-LINE TYPEWRITER */
        .tw-wrap {
          min-height: 90px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          margin-bottom: 16px;
          opacity: 0;
          animation: fadeUp .7s 1.0s ease forwards;
        }
        #twL1 {
          font-family: 'Hind Siliguri', sans-serif;
          font-size: clamp(17px, 2.3vw, 26px);
          font-weight: 600;
          color: rgba(255,255,255,.88);
          line-height: 1.55;
          min-height: 1.5em;
        }
        #twL2 {
          font-family: 'Hind Siliguri', sans-serif;
          font-size: clamp(19px, 2.7vw, 30px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.45;
          min-height: 1.5em;
        }
        .twc {
          display: inline-block; width: 2px; height: 1.05em;
          background: var(--gold); margin-left: 2px;
          vertical-align: text-bottom;
          animation: cblink .7s step-end infinite;
        }
        @keyframes cblink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }

        .hero-tagline {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          letter-spacing: .5px;
          margin-bottom: 36px;
          opacity: 0;
          animation: fadeUp .7s 1.15s ease forwards;
        }

        .hero-cta {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 38px;
          border-radius: 50px;
          background: linear-gradient(135deg, var(--gold) 0%, #9a7320 100%);
          color: #0C0902;
          font-family: 'Hind Siliguri', sans-serif;
          font-size: 16px;
          font-weight: 700;
          border: none; cursor: pointer;
          box-shadow: 0 10px 46px rgba(200,168,75,.38);
          transition: transform .3s, box-shadow .3s;
          opacity: 0;
          animation: fadeUp .9s 1.3s cubic-bezier(.16,1,.3,1) forwards;
          position: relative;
          overflow: hidden;
        }
        .hero-cta::before {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,0.25);
          transform: skewX(-20deg);
          animation: shimmer 3s 2s infinite;
        }
        @keyframes shimmer {
          0%   { left: -60%; }
          100% { left: 130%; }
        }
        .hero-cta:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 18px 60px rgba(200,168,75,.55);
        }
        .cta-icon-box {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(0,0,0,.15);
          display: flex; align-items: center; justify-content: center;
          transition: transform .3s;
        }
        .hero-cta:hover .cta-icon-box { transform: translateY(3px); }
        .cta-icon-box svg { width: 13px; height: 13px; stroke: #0C0902; stroke-width: 2.5; }

        /* Stats row with vertical linear gold dividers */
        .hero-stats {
          display: flex; justify-content: center; align-items: stretch;
          margin-top: 52px;
          opacity: 0;
          animation: fadeUp .9s 1.45s cubic-bezier(.16,1,.3,1) forwards;
        }
        .stat-item { padding: 0 32px; text-align: center; position: relative; }
        .stat-item + .stat-item::before {
          content: ''; position: absolute; left: 0; top: 10%; height: 80%; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,.4), transparent);
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: var(--gold-light);
          line-height: 1;
        }
        .stat-label {
          font-size: 10.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-top: 5px;
        }

        /* Vertical scrolling track */
        .scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0;
          animation: fadeIn 1s 2.2s ease forwards;
        }
        .scroll-word {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .scroll-track {
          width: 1px; height: 50px;
          background: rgba(201,168,76,0.15);
          position: relative; overflow: hidden;
        }
        .scroll-fill {
          position: absolute; top: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollTrackAnimation 2.2s ease-in-out infinite;
        }
        @keyframes scrollTrackAnimation {
          0% { top: -100%; }
          100% { top: 100%; }
        }

        /* Gold frames inside corners (Classic Royal Style) */
        .corner {
          position: absolute; z-index: 9; pointer-events: none;
          opacity: 0; animation: fadeIn 1.2s 1.6s ease forwards;
        }
        .corner-tl { top: 32px; left: 32px; }
        .corner-br { bottom: 32px; right: 32px; transform: rotate(180deg); }
        .corner svg { width: 44px; height: 44px; stroke: rgba(201,168,76,.28); fill: none; stroke-width: 1.2; }

        /* Left and Right Rotated Editorial Labels */
        .side-text {
          position: absolute; z-index: 9;
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,.18);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0; animation: fadeIn 1.2s 1.8s ease forwards;
        }
        .side-text-l { left: 24px; top: 50%; transform: translateY(-50%) rotate(-90deg); transform-origin: left center; }
        .side-text-r { right: 24px; top: 50%; transform: translateY(-50%) rotate(90deg); transform-origin: right center; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── WELCOME SECTION ── */
        .welcome {
          background: var(--cream);
          color: var(--dark);
          padding: 80px 48px;
          text-align: center;
        }
        .section-label {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .welcome h2 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: var(--dark);
        }
        .welcome-underline {
          width: 60px; height: 3px;
          background: var(--gold);
          margin: 16px auto 0;
          border-radius: 2px;
        }

        /* Responsive custom variables overlay */
        @media (max-width: 900px) {
          .side-text, .corner { display: none; }
          .hero-stats { gap: 16px; margin-top: 36px; flex-wrap: wrap; }
          .stat-item { padding: 0 16px; }
          .stat-item + .stat-item::before { display: none; }
          .stat-num { font-size: 26px; }
          .hero-title { font-size: clamp(38px, 10vw, 68px); }
          .hero-title span { font-size: clamp(30px, 8vw, 54px); }
          .tw-wrap { min-height: 80px; }
          .hero-cta { padding: 14px 28px; font-size: 14px; }
          .welcome { padding: 40px 24px; }
          .welcome h2 { font-size: 32px; }
        }
      `}</style>
      
      <div className="custom-hero-scope">
        {/* HERO */}
        <section className="hero">
          {/* Unified elegant full-screen crossfading Ken Burns background slideshow */}
          <div className="bg-wrap">
            <div className="bg-slides">
              {activeBgImages.map((img, idx) => {
                const isActive = currentBgIndex % activeBgImages.length === idx;
                return (
                  <div key={idx} className={`bg-slide ${isActive ? 'active' : ''}`}>
                    <img src={img} alt="" />
                  </div>
                );
              })}
            </div>
            <div className="bg-master-overlay"></div>
            <div className="bg-vignette"></div>
            <div className="bg-grain"></div>
            <div className="bg-sweep"></div>
          </div>

          {/* Ambient moving orbs */}
          <div className="orb orb-1" ref={orb1Ref}></div>
          <div className="orb orb-2" ref={orb2Ref}></div>

          {/* Golden star / spark canvas */}
          <canvas id="particles" ref={canvasRef}></canvas>

          {/* Ornamental corner markings (Classic Royal Style) */}
          <div className="corner corner-tl">
            <svg viewBox="0 0 48 48">
              <path d="M2 46 L2 2 L46 2" />
            </svg>
          </div>
          <div className="corner corner-br">
            <svg viewBox="0 0 48 48">
              <path d="M2 46 L2 2 L46 2" />
            </svg>
          </div>

          {/* Structural rotated editorial side tags */}
          <div className="side-text side-text-l">Premium Hostel Living · Dhaka Bangladesh</div>
          <div className="side-text side-text-r">Queens Point · Bachelor Point · Premium Accommodations</div>

          {/* Hero primary layout contents */}
          <div className="hero-content">
            <div className="badge">
              <div className="badge-dot"></div>
              Premium Hostel Living
            </div>

            <h1 className="hero-title">
              AyaanAyaat
              <span>Homes</span>
            </h1>

            <div className="hero-divider">
              <div className="dline"></div>
              <div className="ddiamond"></div>
              <div className="dline r"></div>
            </div>

            {/* HIGH-END MULTI-LINE TYPEWRITER */}
            <div className="tw-wrap">
              <div id="twL1">
                {renderHighlightedText(typedL1, activeHighlight)}
                {typedL1 && !typedL2 && <span className="twc"></span>}
              </div>
              <div id="twL2">
                {typedL2}
                {typedL2 && <span className="twc"></span>}
                {!typedL1 && !typedL2 && <span className="twc"></span>}
              </div>
            </div>

            <p className="hero-tagline">এক ছাদের নিচে থাকা, খাওয়া ও বিনোদনের সকল সুবিধা।</p>

            <button className="hero-cta" onClick={scrollToBranches}>
              আমাদের শাখা সমূহ
              <div className="cta-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </button>

            {/* High end royal numeric metric counters */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">{stats.branches}+</div>
                <div className="stat-label">শাখা সমূহ</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{stats.residents}+</div>
                <div className="stat-label">সন্তুষ্ট বাসিন্দা</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{stats.experience}+</div>
                <div className="stat-label">বছরের অভিজ্ঞতা</div>
              </div>
            </div>
          </div>

          {/* Smooth Vertical Scroll Hint Track */}
          <div className="scroll-hint">
            <span className="scroll-word">Scroll</span>
            <div className="scroll-track">
              <div className="scroll-fill"></div>
            </div>
          </div>
        </section>

        {/* WELCOME */}
        <section className="welcome">
          <p className="section-label">Welcome To</p>
          <h2>AyaanAyaat Homes</h2>
          <div className="welcome-underline"></div>
        </section>
      </div>

      {/* Philosophy Section */}
      <section className="bg-gradient-to-b from-[#fcfbf9] to-[#f5f2eb] pb-10 md:pb-24 px-4 md:px-6 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-[60px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-[#8B5A2B]/5 rounded-full blur-[50px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-[85rem] mx-auto py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            
            {/* Image Grid with Parallax Hover */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[220px] sm:h-[350px] md:h-[500px] order-2 lg:order-2 w-full max-w-[90vw] sm:max-w-none mx-auto"
            >
              <div className={`absolute inset-0 bg-[#4a3426] rounded-2xl md:rounded-3xl shadow-xl overflow-hidden transition-transform duration-500 ${isAnimating || isHovered ? 'rotate-0' : '-rotate-3'}`}>
                <img 
                  src={philosophyImages[(currentImageIndex + 1) % philosophyImages.length]} 
                  alt="Next Living" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div 
                className={`absolute inset-0 bg-[#4a3426] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 z-10 group cursor-pointer ${isAnimating || isHovered ? 'rotate-0' : 'rotate-3'}`}
                onClick={handleNextImage}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: isManual ? 0.3 : 1.2, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={philosophyImages[currentImageIndex]} 
                      alt={`Modern Living ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3426]/90 via-[#4a3426]/20 to-transparent pointer-events-none z-30"></div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 pointer-events-none z-30">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-xs md:text-sm font-medium">✨ স্মার্ট জীবনযাত্রার নতুন সংজ্ঞা</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="philosophy-content flex flex-col justify-center space-y-3 md:space-y-8 relative z-20 order-1 lg:order-1"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-10 md:w-16 h-[2px] bg-gradient-to-r from-[#C9A84C] to-transparent"></div>
                <span className="text-[#C9A84C] font-semibold text-[11px] md:text-sm uppercase tracking-[0.4em] font-serif">Philosophy</span>
              </div>
              
              <h3 className="text-[22px] sm:text-3xl md:text-5xl lg:text-[3.25rem] text-[#2a1b12] leading-[1.25] font-black tracking-tight relative z-10 w-full">
                <span className="absolute -top-4 -left-3 md:-top-10 md:-left-8 text-5xl md:text-8xl text-[#C9A84C] opacity-20 font-serif leading-none select-none">"</span>
                আমরা বিলাসিতা নয়, <br className="hidden md:block"/> 
                <span className="relative inline-block mt-1 md:mt-2">
                  <span className="relative z-10 text-[#C9A84C]">সাধ্যের মধ্যে আধুনিক</span>
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-1.5 md:h-4 bg-[#C9A84C]/20 -z-10 skew-x-[-15deg]"></span>
                </span> <br className="hidden md:block"/> 
                <span className="mt-1 inline-block">জীবনযাত্রার নিশ্চয়তা দিই।</span>
                <span className="absolute -bottom-3 -right-1 md:-bottom-6 md:-right-4 text-5xl md:text-8xl text-[#C9A84C] opacity-20 font-serif leading-none select-none drop-shadow-sm">"</span>
              </h3>
              
              <p className="text-[13px] md:text-[17px] text-[#615249] bg-gradient-to-r from-white to-white/60 backdrop-blur-md p-4 md:p-7 rounded-xl md:rounded-2xl border-l-4 border-[#C9A84C] font-medium leading-[1.6] md:leading-[1.8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] selection:bg-[#C9A84C]/20">
                ঢাকার ব্যস্ত জীবনে আপনার থাকার জায়গাটি হওয়া চাই একটি শান্তির নীড়। AyaanAyaat Homes-এর প্রতিটি প্রজেক্ট ডিজাইন করা হয়েছে আপনার কাজের উদ্দীপনা এবং ব্যক্তিগত প্রশান্তির কথা মাথায় রেখে।
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-5 pt-1 md:pt-2">
                {[
                  { title: "নিরাপদ পরিবেশ", desc: "২৪/৭ সিসিটিভি ও গার্ড", icon: <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> },
                  { title: "স্বাস্থ্যসম্মত খাবার", desc: "৩ বেলা মানসম্মত মিল", icon: <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2z"></path></svg> },
                  { title: "আধুনিক সুবিধা", desc: "এসি, ওয়াইফাই ও অন্যান্য", icon: <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> },
                  { title: "স্মার্ট লোকেশন", desc: "যাতায়াতের সেরা সুবিধা", icon: <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 p-3 md:p-5 bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#faf8f5] rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(201,168,76,0.12)] transition-all duration-300 group">
                    <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 rounded-full bg-[#faf8f5] border border-gray-100 flex items-center justify-center text-[#a88241] group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] group-hover:text-white transition-all duration-500 ease-out sm:group-hover:-translate-y-1">
                      {item.icon}
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-[#2a1b12] font-black text-[11px] md:text-base leading-tight mb-1 md:mb-1.5 tracking-tight">{item.title}</h4>
                      <p className="text-[#615249]/80 text-[9px] md:text-sm font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Sections */}
      <section id="our-branches" className="bg-white border-y border-[#4a3426]/10 scroll-mt-20">
        {/* Navigation Grid Style approach for titles */}
        

        

        {/* --- CUSTOM CSS FOR NEW BRANCHES DESIGN --- */}
        <style>{`
          :root {
            --gold: #C9A84C;
            --gold-light: #E8C97A;
            --dark-color: #1A1A14; /* changed from --dark to avoid conflicts potentially */
            --dark-mid: #2A2A1E;
            --cream: #F9F6EF;
            --cream-mid: #EDE8DC;
            --white: #FFFFFF;
            --female-accent: #C97A9B;
            --male-accent: #4A7AAC;
            --text-muted: #888878;
          }

          /* ── Section Header ── */
          .br-section-header {
            text-align: center;
            padding: 72px 24px 56px;
            position: relative;
            background: var(--cream);
          }

          .br-section-header::after {
            content: '';
            display: block;
            width: 60px;
            height: 2px;
            background: var(--gold);
            margin: 20px auto 0;
          }

          .br-section-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 14px;
          }

          .br-section-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 700;
            color: var(--dark-color);
            line-height: 1.15;
          }

          .br-section-title span {
            color: var(--gold);
          }

          .br-section-desc {
            max-width: 520px;
            margin: 18px auto 0;
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.7;
          }

          /* ── Cards Grid ── */
          .br-branches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
            gap: 32px;
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 28px 80px;
            background: var(--cream);
          }

          /* ── Branch Card ── */
          .br-new-card {
            background: var(--white);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 32px rgba(0,0,0,0.07);
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 340px;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            position: relative;
            cursor: pointer;
          }

          .br-new-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 20px;
            border: 3px solid transparent;
            pointer-events: none;
            z-index: 10;
            transition: border-color 0.4s ease, box-shadow 0.4s ease;
          }

          .br-new-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 24px 50px rgba(0,0,0,0.15);
          }

          .br-new-card.female:hover::after {
            animation: glowPulseFemale 1.5s infinite alternate;
            border-color: var(--female-accent);
          }
          
          .br-new-card.male:hover::after {
            animation: glowPulseMale 1.5s infinite alternate;
            border-color: var(--male-accent);
          }

          @keyframes glowPulseFemale {
            0% { box-shadow: 0 0 5px rgba(201,122,155, 0.4), inset 0 0 5px rgba(201,122,155, 0.4); border-color: rgba(201,122,155, 0.8); }
            100% { box-shadow: 0 0 20px rgba(201,122,155, 1), inset 0 0 15px rgba(201,122,155, 0.8); border-color: rgba(201,122,155, 1); }
          }

          @keyframes glowPulseMale {
            0% { box-shadow: 0 0 5px rgba(74,122,172, 0.4), inset 0 0 5px rgba(74,122,172, 0.4); border-color: rgba(74,122,172, 0.8); }
            100% { box-shadow: 0 0 20px rgba(74,122,172, 1), inset 0 0 15px rgba(74,122,172, 0.8); border-color: rgba(74,122,172, 1); }
          }

          /* ── Card Image Side ── */
          .br-card-image {
            position: relative;
            overflow: hidden;
            height: 100%;
          }

          .br-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }

          .br-new-card:hover .br-card-image img {
            transform: scale(1.05);
          }

          .br-image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.25) 0%, transparent 60%);
          }

          .br-type-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: white;
            backdrop-filter: blur(8px);
          }

          .br-new-card.female .br-type-badge {
            background: rgba(201,122,155,0.85);
          }

          .br-new-card.male .br-type-badge {
            background: rgba(74,122,172,0.85);
          }

          /* ── Card Content Side ── */
          .br-card-content {
            padding: 32px 28px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            background: var(--white);
          }

          .br-card-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
          }

          .br-new-card.female .br-card-content::before {
            background: linear-gradient(to bottom, var(--female-accent), transparent);
          }

          .br-new-card.male .br-card-content::before {
            background: linear-gradient(to bottom, var(--male-accent), transparent);
          }

          .br-brand-name {
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 6px;
          }

          .br-branch-name {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-weight: 700;
            color: var(--dark-color);
            line-height: 1.2;
            margin-bottom: 6px;
          }

          .br-branch-tagline {
            font-size: 12px;
            color: var(--gold);
            margin-bottom: 18px;
          }

          /* Address */
          .br-address-box-new {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            background: var(--cream);
            border-radius: 10px;
            padding: 12px 14px;
            margin-bottom: 18px;
          }

          .br-address-icon-new {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            margin-top: 1px;
          }

          .br-address-text-new {
            font-size: 12.5px;
            line-height: 1.6;
            color: #555548;
            margin: 0;
          }

          /* Amenity Tags */
          .br-amenities {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 22px;
          }

          .br-amenity-tag {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 11px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid;
          }

          .br-amenity-tag.green  { color: #2D7A4F; border-color: #A8D9BF; background: #EEF8F3; }
          .br-amenity-tag.amber  { color: #7A5A1A; border-color: #E0C97A; background: #FDF8EC; }
          .br-amenity-tag.blue   { color: #1A4A7A; border-color: #7AB0E0; background: #EEF4FB; }
          .br-amenity-tag.pink   { color: #7A2A5A; border-color: #E07AB0; background: #FBEEF4; }

          /* Card Footer */
          .br-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .br-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.5px;
            transition: all 0.25s ease;
            cursor: pointer;
            border: none;
          }

          .br-new-card.female .br-cta-btn {
            background: var(--dark-color);
            color: var(--gold-light);
          }

          .br-new-card.male .br-cta-btn {
            background: var(--dark-color);
            color: var(--gold-light);
          }

          .br-cta-btn:hover {
            background: var(--gold);
            color: var(--dark-color);
          }

          .br-cta-arrow {
            font-size: 14px;
            transition: transform 0.25s;
          }

          .br-cta-btn:hover .br-cta-arrow {
            transform: translateX(4px);
          }

          .br-social-links {
            display: flex;
            gap: 8px;
          }

          .br-social-link {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: var(--cream-mid);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s;
            border: 1px solid transparent;
          }

          .br-social-link:hover {
            border-color: var(--gold);
            background: var(--white);
          }

          .br-social-link svg { width: 16px; height: 16px; }

          /* ── Decorative corner accent ── */
          .br-corner-accent {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 60px;
            height: 60px;
            opacity: 0.06;
            pointer-events: none;
          }

          .br-new-card.female .br-corner-accent { color: var(--female-accent); }
          .br-new-card.male   .br-corner-accent { color: var(--male-accent); }

          /* ── Responsive ── */
          @media (max-width: 768px) {
            .br-section-header {
              padding: 32px 16px 24px;
            }
            .br-section-header::after { margin-top: 12px; }
            .br-section-label { font-size: 10px; margin-bottom: 8px; }
            .br-section-title { font-size: clamp(28px, 8vw, 32px); }
            .br-section-desc { font-size: 12px; margin-top: 12px; line-height: 1.5; }

            .br-branches-grid {
              grid-template-columns: 1fr;
              padding: 0 16px 40px;
              gap: 16px;
            }

            .br-new-card {
              grid-template-columns: 120px 1fr;
              min-height: unset;
            }

            .br-card-image {
              height: 100%;
            }

            .br-card-content {
              padding: 16px 14px;
            }
            
            .br-brand-name { margin-bottom: 4px; font-size: 9px; }
            .br-branch-name { font-size: 18px; margin-bottom: 4px; }
            .br-branch-tagline { margin-bottom: 8px; font-size: 10px; }
            .br-address-box-new { padding: 6px 8px; margin-bottom: 10px; gap: 6px; border-radius: 6px; }
            .br-address-icon-new { width: 14px; height: 14px; }
            .br-address-text-new { font-size: 10px; line-height: 1.3; }
            .br-amenities { gap: 4px; margin-bottom: 12px; }
            .br-amenity-tag { font-size: 8.5px; padding: 3px 6px; }
            .br-type-badge { font-size: 8px; padding: 4px 8px; top: 8px; left: 8px; }
            .br-cta-btn { padding: 8px 12px; font-size: 10px; }
            .br-social-link { width: 30px; height: 30px; }
            .br-social-link svg { width: 14px; height: 14px; }
          }

          /* GSAP handles entry animation */
        `}</style>

        {/* --- NEW BRANCHES DESIGN --- */}
        <section className="bg-[var(--cream)]" id="branches-section">
          {/* Section Header */}
          <div className="br-section-header">
            <p className="br-section-label">OUR PREMIUM LOCATIONS</p>
            <h2 className="br-section-title">আমাদের <span>ব্রাঞ্চ-সমূহ</span></h2>
            <p className="br-section-desc">
              ছাত্র-ছাত্রী ও চাকরিজীবীদের নিরাপদ আবাসনে AyaanAyaat Homes-এর দুটি প্রিমিয়াম প্রজেক্ট— ছেলেদের জন্য 'ব্যাচেলর পয়েন্ট' এবং মেয়েদের জন্য 'কুইন্স পয়েন্ট'।
            </p>
          </div>

          {/* Cards */}
          <div className="br-branches-grid">

            {/* Queens Point (Female) */}
            <div className="br-new-card female" onClick={() => onNavigate({ type: 'female-hostel' })}>
              <div className="br-card-image">
                <img src="/Queens%20Point.png" alt="Queens Point Building" />
                <div className="br-image-overlay"></div>
                <span className="br-type-badge">FEMALE BRANCH</span>
              </div>

              <div className="br-card-content">
                <div className="br-card-top">
                  <p className="br-brand-name">AyaanAyaat Homes</p>
                  <h3 className="br-branch-name">Queens Point</h3>
                  <span className="sr-only">কুইন্স পয়েন্ট - মেয়েদের হোস্টেল Queens Point Girls Hostel in Dhaka</span>
                  <p className="br-branch-tagline">নিরাপদ আশ্রয়ে রাজকীয়তা</p>

                  <div className="br-address-box-new">
                    <svg className="br-address-icon-new" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="br-address-text-new">বাড়ি# ১৮৯, রোড# ১৩, সেক্টর# ১০, উত্তরা, রানাভোলা এভিনিউ, ঢাকা</p>
                  </div>

                  <div className="br-amenities">
                    <span className="br-amenity-tag green">✓ ২৪/৭ নিরাপত্তা</span>
                    <span className="br-amenity-tag amber">✓ মানসম্মত খাবার</span>
                    <span className="br-amenity-tag blue">✓ AC / Non-AC</span>
                    <span className="br-amenity-tag pink">✓ ওয়াই-ফাই</span>
                  </div>
                </div>

                <div className="br-card-footer">
                  <button onClick={() => onNavigate({ type: 'female-hostel' })} className="br-cta-btn">
                    বিস্তারিত দেখুন <span className="br-cta-arrow">→</span>
                  </button>
                  <div className="br-social-links">
                    <a href="https://www.facebook.com/share/1AZyBMJreP/" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Facebook" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    </a>
                    <a href="https://maps.app.goo.gl/wAa3pBmE6b6SVWks9" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Google Maps" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/><circle cx="12" cy="8" r="2" fill="#EA4335" stroke="none"/></svg>
                    </a>
                  </div>
                </div>

                {/* decorative */}
                <svg className="br-corner-accent" viewBox="0 0 60 60" fill="currentColor"><path d="M0 60 L60 0 L60 60 Z"/></svg>
              </div>
            </div>

            {/* Bachelor Point (Male) */}
            <div className="br-new-card male" onClick={() => onNavigate({ type: 'male-hostel' })}>
              <div className="br-card-image">
                <img src="/bechelor%20piont.png" alt="Bachelor Point Building" />
                <div className="br-image-overlay"></div>
                <span className="br-type-badge">MALE BRANCH</span>
              </div>

              <div className="br-card-content">
                <div className="br-card-top">
                  <p className="br-brand-name">AyaanAyaat Homes</p>
                  <h3 className="br-branch-name">Bachelor Point</h3>
                  <span className="sr-only">বেচেলর পয়েন্ট - ব্যাচেলর পয়েন্ট ছেলেদের হোস্টেল Bachelor Point Boys Hostel in Dhaka</span>
                  <p className="br-branch-tagline">আধুনিক স্মার্ট জীবনের নিশ্চয়তা</p>

                  <div className="br-address-box-new">
                    <svg className="br-address-icon-new" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="br-address-text-new">৩৬৭, গাওয়াইর, দক্ষিণখান, ঢাকা-১২৩০</p>
                  </div>

                  <div className="br-amenities">
                    <span className="br-amenity-tag green">✓ ২৪/৭ সিসিটিভি</span>
                    <span className="br-amenity-tag amber">✓ মানসম্মত খাবার</span>
                    <span className="br-amenity-tag blue">✓ AC / Non-AC</span>
                    <span className="br-amenity-tag pink">✓ ওয়াই-ফাই</span>
                  </div>
                </div>

                <div className="br-card-footer">
                  <button onClick={() => onNavigate({ type: 'male-hostel' })} className="br-cta-btn">
                    বিস্তারিত দেখুন <span className="br-cta-arrow">→</span>
                  </button>
                  <div className="br-social-links">
                    <a href="https://www.facebook.com/share/1CwaVA5WXK/" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Facebook" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    </a>
                    <a href="https://maps.app.goo.gl/EtBr4xqaVPK8ZH4N9" target="_blank" rel="noopener noreferrer" className="br-social-link" title="Google Maps" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/><circle cx="12" cy="8" r="2" fill="#EA4335" stroke="none"/></svg>
                    </a>
                  </div>
                </div>

                <svg className="br-corner-accent" viewBox="0 0 60 60" fill="currentColor"><path d="M0 60 L60 0 L60 60 Z"/></svg>
              </div>
            </div>

          </div>
        </section>



        {/* --- UPCOMING BRANCHES --- */}
        <section id="upcoming" className="bg-[#f8f6f0] py-10 px-6 border-b border-[#4a3426]/10 relative overflow-hidden scroll-mt-20">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-[#C9A84C]/60"></span>
                <span className="text-[#C9A84C] font-semibold text-xs tracking-[0.3em] uppercase">Future Expansion</span>
                <span className="w-12 h-[1px] bg-[#C9A84C]/60"></span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2A2A1E] mb-6">
                আমাদের <span className="text-[#C9A84C]">আপকামিং</span> ব্রাঞ্চসমূহ
              </h2>
              <p className="max-w-2xl mx-auto text-[#615249] text-sm md:text-base leading-relaxed">
                নতুন আঙ্গিকে আরও উন্নত ও আধুনিক আবাসন সুবিধা নিয়ে আমরা আসছি আপনাদের কাছাকাছি।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Prince Point */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-[20px] bg-[#2A2A1E] aspect-[4/3] md:aspect-[3/2] flex flex-col justify-center items-center border border-[#C9A84C]/20 shadow-lg"
              >
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop" alt="Prince Point Future Expansion" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 blur-[2px] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 z-0 transition-colors duration-500 group-hover:bg-black/40"></div>
                
                {/* Decorative borders */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C9A84C]/30 z-10"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C9A84C]/30 z-10"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                    <Lock className="w-6 h-6 text-white/80" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white/90 mb-3 tracking-wide">Prince Point</h3>
                  <span className="sr-only">প্রিন্স পয়েন্ট - Prince Point</span>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 rounded-full border border-white/10 backdrop-blur-md text-white/60">
                    <span className="w-2 h-2 rounded-full bg-[#E57373] animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Upcoming</span>
                  </div>
                </div>
              </motion.div>

              {/* Royal Point */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-[20px] bg-[#2A2A1E] aspect-[4/3] md:aspect-[3/2] flex flex-col justify-center items-center border border-[#C9A84C]/20 shadow-lg"
              >
                <img src="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=900&auto=format&fit=crop" alt="Royal Point Future Expansion" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 blur-[2px] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 z-0 transition-colors duration-500 group-hover:bg-black/40"></div>
                
                {/* Decorative borders */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C9A84C]/30 z-10"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C9A84C]/30 z-10"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                    <Lock className="w-6 h-6 text-white/80" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white/90 mb-3 tracking-wide">Royal Point</h3>
                  <span className="sr-only">রয়েল পয়েন্ট - Royal Point</span>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 rounded-full border border-white/10 backdrop-blur-md text-white/60">
                    <span className="w-2 h-2 rounded-full bg-[#E57373] animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Upcoming</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
        
      </section>
      
{/* Brand Promise Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[#f8f6f0] py-12 md:py-32 px-4 md:px-6 flex flex-col items-center border-t border-[#4a3426]/10"
      >
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-[1px] bg-[#D4AF37]/40 mb-6 md:mb-12 h-8 md:h-16"
        ></motion.div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-lg sm:text-2xl md:text-4xl text-[#4a3426] leading-relaxed md:leading-relaxed">
            "ব্যাচেলরদের জন্য আমরা দিই সাশ্রয়ী মূল্যে সম্পূর্ণ আধুনিক ও নিরাপদ আবাসন ব্যবস্থা।"
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;

