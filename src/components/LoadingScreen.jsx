import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const LoadingScreen = React.memo(({ onComplete }) => {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and call onComplete
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
      // Ring spin
      .fromTo(
        ringRef.current,
        { rotate: 0, opacity: 0 },
        { rotate: 360, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      // Progress bar fill
      .fromTo(
        barRef.current,
        { width: '0%' },
        { width: '100%', duration: 1.6, ease: 'power1.inOut' },
        '-=0.2'
      )
      // Hold briefly
      .to({}, { duration: 0.2 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #4A0A18 0%, #2A0410 50%, #120206 100%)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            left: `${(i * 137.5) % 100}%`,
            top: `${80 + (i % 4) * 5}%`,
          }}
          animate={{
            y: [0, -window.innerHeight - 50],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 3 + (i % 4) * 0.5,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative flex flex-col items-center">
        {/* Shared ring + logo container — both anchored to the exact same center */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Spinning orbit ring — same size as container, perfectly centered */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border-2 border-transparent opacity-0"
            style={{
              borderTopColor: '#D4AF37',
              borderRightColor: 'rgba(212,175,55,0.3)',
              animation: 'spin-slow 2s linear infinite',
            }}
          />

          {/* Logo — centered inside the ring with equal padding */}
          <div ref={logoRef} className="opacity-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <img
                src="/logo.png"
                alt="Duraish Catering"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <h1
          className="text-3xl font-bold tracking-[0.3em] uppercase mb-1"
          style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}
        >
          DURAISH
        </h1>
        <p className="text-xs tracking-[0.4em] uppercase text-[#9d8fb0]">
          Catering &amp; Event Management
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="mt-10 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #F3E5AB, #D4AF37)',
            width: '0%',
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-xs tracking-widest text-[#9d8fb0] uppercase"
      >
        Loading Luxury Experience...
      </motion.p>
    </div>
  );
});

export default LoadingScreen;
