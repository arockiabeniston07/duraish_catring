import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-75"
        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #D4AF37, #F3E5AB, #D4AF37)' }}
      />
    </div>
  );
}

// ---- Mouse Glow Effect ----
function MouseGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-[150] w-[500px] h-[500px] rounded-full opacity-[0.025] blur-[80px]"
      style={{
        left: pos.x - 250,
        top: pos.y - 250,
        background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        transform: 'translate3d(0,0,0)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}

// ---- Main Site ----
function MainSite() {
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
}

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
