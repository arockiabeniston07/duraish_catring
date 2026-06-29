import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

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

export default function Hero() {
  const particles = useMemo(() => generateParticles(25), []);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const tagRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // GSAP cinematic entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
    )
      .fromTo(
        tagRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

    return () => tl.kill();
  }, []);

  // Mouse parallax depth effect
  useEffect(() => {
    const bg = document.getElementById('hero-bg');
    const handleMouse = (e) => {
      if (!bg) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bg, {
        x: xPct,
        y: yPct,
        duration: 1.5,
        ease: 'power1.out',
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Background with parallax */}
      <div
        id="hero-bg"
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay – Royal Purple gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(13,0,32,0.85) 0%, rgba(26,5,40,0.88) 50%, rgba(13,0,32,0.97) 100%)',
        }}
      />

      {/* Purple accent glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(74,16,112,0.8) 0%, transparent 70%)' }} />
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
          <motion.div
            key={`hero-particle-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, #F3E5AB 0%, #D4AF37 60%, transparent 100%)`,
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center">
        <div className="max-w-4xl mx-auto">

          {/* Tamil quote tag */}
          <div ref={tagRef} className="opacity-0 mb-8 inline-block">
            <div className="border-y border-[#D4AF37]/40 py-3 px-6">
              <p className="text-[#D4AF37] text-sm md:text-base tamil-font tracking-wide">
                &ldquo;உண்ணும் உணவை வீண் செய்யாமல் இருப்பதே நாம் செய்யும் முதல் அன்னதானம்&rdquo;
              </p>
            </div>
          </div>

          {/* Main headline */}
          <h1 ref={headlineRef} className="opacity-0 text-[clamp(2.2rem,8vw,4.5rem)] font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-white">Premium Catering &amp;</span>
            <br />
            <span className="gold-shimmer">Event Management</span>
          </h1>

          {/* Subheading */}
          <p ref={subRef} className="opacity-0 text-lg md:text-2xl text-[#9d8fb0] mb-4 font-light max-w-2xl mx-auto">
            From Traditional Celebrations to Grand Events
          </p>
          <p className="opacity-80 text-sm tracking-widest text-[#D4AF37] uppercase mb-10">
            Serving Tamil Nadu since 2012 · Coimbatore
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="glow-pulse px-6 sm:px-8 py-4 font-semibold rounded-full w-full sm:w-auto text-center relative overflow-hidden group"
              style={{ background: '#D4AF37', color: '#1A0528' }}
            >
              <span className="relative z-10">✦ Book Your Event</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#menu"
              className="glass px-6 sm:px-8 py-4 font-semibold rounded-full w-full sm:w-auto text-center"
              style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.4)' }}
            >
              Explore Menu →
            </motion.a>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
