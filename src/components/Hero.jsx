import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Stable particle data using golden-angle distribution
const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 137.508) % 100,
    y: 60 + (i * 47.3) % 40,
    size: 2 + (i % 4) * 1.5,
    duration: 10 + (i % 8) * 2,
    delay: (i % 10) * 0.4,
  }));

// Floating icon set
const FloatingIcon = ({ emoji, style }) => (
  <div
    className="absolute text-3xl pointer-events-none select-none opacity-20"
    style={style}
  >
    {emoji}
  </div>
);

const Hero = React.memo(() => {
  const particles = useMemo(() => generateParticles(25), []);
  
  // Scroll container for framer motion parallax
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background with parallax scroll */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <div
          id="hero-bg-inner"
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Overlay – Deep Maroon gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,2,6,0.85) 0%, rgba(42,4,16,0.88) 50%, rgba(18,2,6,0.97) 100%)',
        }}
      />

      {/* Maroon & Gold accent glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(106,15,36,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* Floating emojis / decorative icons */}
      <FloatingIcon emoji="👨‍🍳" style={{ top: '15%', left: '8%', animation: 'float 7s ease-in-out infinite' }} />
      <FloatingIcon emoji="🍛"    style={{ top: '25%', right: '7%', animation: 'float 9s ease-in-out infinite 1s' }} />
      <FloatingIcon emoji="🥘"    style={{ bottom: '25%', left: '5%', animation: 'float 8s ease-in-out infinite 0.5s' }} />
      <FloatingIcon emoji="🌿"    style={{ bottom: '15%', right: '6%', animation: 'float 6s ease-in-out infinite 2s' }} />
      <FloatingIcon emoji="✨"    style={{ top: '40%', left: '3%', animation: 'float 10s ease-in-out infinite 1.5s' }} />
      <FloatingIcon emoji="🎊"    style={{ top: '20%', right: '3%', animation: 'float 7.5s ease-in-out infinite 0.8s' }} />

      {/* Gold rising particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={`hero-particle-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, #F3E5AB 0%, #D4AF37 60%, transparent 100%)`,
              animation: `particle-rise ${p.duration}s linear infinite ${p.delay}s`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center">
        <motion.div 
          className="max-w-4xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        >

          {/* Tamil quote tag */}
          <div className="mb-8 inline-block">
            <div className="border-y border-[#D4AF37]/40 py-3 px-6">
              <p className="text-[#D4AF37] text-sm md:text-base tamil-font tracking-wide">
                &ldquo;உண்ணும் உணவை வீண் செய்யாமல் இருப்பதே நாம் செய்யும் முதல் அன்னதானம்&rdquo;
              </p>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-[clamp(2.2rem,8vw,4.5rem)] font-bold mb-6 leading-[1.2] flex flex-col items-center"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-white">Premium Catering &amp;</span>
            <span className="gold-shimmer mt-2">Event Management</span>
          </h1>

          {/* Subheading */}
          <div className="w-full">
            <p className="text-lg md:text-2xl text-[#9d8fb0] mb-4 font-light max-w-2xl mx-auto">
              From Traditional Celebrations to Grand Events
            </p>
            <p className="opacity-80 text-sm tracking-widest text-[#D4AF37] uppercase mb-10">
              Serving Tamil Nadu since 2012 · Coimbatore
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="glow-pulse px-6 sm:px-8 py-4 font-semibold rounded-full w-full sm:w-auto text-center relative overflow-hidden group btn-ripple hover:scale-105 transition-transform duration-300 touch-target"
                style={{ background: '#D4AF37', color: '#2A0410' }}
              >
                <span className="relative z-10">✦ Book Your Event</span>
              </a>

              <a
                href="#menu"
                className="glass px-6 sm:px-8 py-4 font-semibold rounded-full w-full sm:w-auto text-center hover:bg-[#D4AF37]/10 transition-colors duration-300 touch-target"
                style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.4)' }}
              >
                Explore Menu →
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
