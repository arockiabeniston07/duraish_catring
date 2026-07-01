import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// ---- Scroll Progress Bar ----
const ScrollProgress = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #D4AF37, #F3E5AB, #D4AF37)', willChange: 'transform' }}
      />
    </div>
  );
});

// ---- Mouse Glow Effect ----
const MouseGlow = React.memo(() => {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    
    let currentX = -300;
    let currentY = -300;
    let targetX = -300;
    let targetY = -300;
    let rafId;

    const move = (e) => {
      targetX = e.clientX - 250;
      targetY = e.clientY - 250;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[150] w-[500px] h-[500px] rounded-full opacity-[0.025] blur-[80px] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        willChange: 'transform'
      }}
    />
  );
});

// ---- Main Site ----
const MainSite = React.memo(() => {
  return (
    <div className="bg-transparent min-h-screen">
      <ScrollProgress />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Menu />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
});

// ---- App Root ----
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <Router>
          <Routes>
            <Route path="/" element={<MainSite />} />
            {/* Any unknown route falls back to home */}
            <Route path="*" element={<MainSite />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
