import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const highlights = [
    { icon: '⭐', title: 'Established', desc: '2012' },
    { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Professional Culinary Team' },
    { icon: '🍽️', title: 'Premium Catering', desc: 'Luxury Food Experience' },
    { icon: '🎉', title: 'Events Covered', desc: 'Wedding • Reception • Birthday • Corporate Events' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const blurRevealVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section ref={containerRef} id="about" className="py-20 px-6 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}>
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(106,15,36,0.8) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center gap-[50px]">
          
          {/* Left Side: Premium Image Cinematic Entrance + Parallax */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full lg:w-[40%] relative"
          >
            <motion.div 
              style={{ y: imageY }}
              className="relative rounded-[24px] overflow-hidden border border-[var(--secondary)]/50 shadow-[0_8px_40px_rgba(212,175,55,0.25)] group"
            >
              <img 
                src="/video/about.jpeg" 
                alt="Agent Pandian - Duraish Catering"
                className="w-full h-auto object-contain block transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A0410]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            {/* Background Accent Glow behind image */}
            <div className="absolute -inset-4 bg-[var(--secondary)]/20 blur-3xl -z-10 rounded-[24px] opacity-50 pointer-events-none" />
          </motion.div>

          {/* Right Side: Content with Staggered Entrance */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="w-full lg:w-[60%] flex flex-col justify-center text-left py-4"
          >
            <motion.h2 variants={textRevealVariants} className="text-[clamp(2rem,5vw,3rem)] font-playfair font-bold text-[var(--secondary)] tracking-wide mb-6">
              ABOUT DURAISH CATERING
            </motion.h2>
            <motion.div variants={textRevealVariants} className="w-24 h-1 bg-[var(--secondary)] mb-8" />
            
            <div className="space-y-6 text-gray-300 leading-[1.8] font-light mb-12 text-lg">
              <motion.p variants={textRevealVariants}>
                Our Duraish Catering, founded by Durai Pandian, was born out of his experience and driven by his passion for food and culinary creativity.
              </motion.p>
              <motion.p variants={textRevealVariants}>
                Established in the year 2012, we have become a name synonymous with taste and quality, earning us an esteemed reputation and great value. Our hard work, dedication, and efficient time management have contributed to our successful growth.
              </motion.p>
              <motion.p variants={textRevealVariants}>
                Inspired by his love for food and culinary arts, Durai Pandian decided to venture into the catering industry. As we expanded our business, we ventured into outdoor catering and events, equipped with modern facilities and supported by experienced chefs and a skilled service team. Our goal is to delight customers with heavenly tastes and exquisite flavors.
              </motion.p>
              <motion.p variants={textRevealVariants}>
                At Duraish Catering, we take pride in our creative menus that showcase a blend of traditional delights and delightful continental dishes, complemented by our exclusive range of delectable sweets.
              </motion.p>
              <motion.p variants={textRevealVariants}>
                We take the time to customize menus and food stall decorations according to our customer's desires, adding a personal touch to every occasion.
              </motion.p>
              <motion.p variants={textRevealVariants} className="text-[var(--cream)] font-medium italic mt-6">
                Experience the magic of our culinary expertise and the luxury of our impeccable service that promises to make your special moments even more glamorous and memorable.
              </motion.p>
            </div>

            {/* Highlight Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-10">
              {highlights.map((item, idx) => (
                <motion.div variants={blurRevealVariants} key={`highlight-${idx}`} className="glass-card p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 border border-[var(--secondary)]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)] glass-card-hover group">
                  <div className="text-3xl bg-[var(--secondary)]/10 p-3 rounded-xl border border-[var(--secondary)]/30 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-playfair font-bold text-[var(--secondary)] text-xl mb-1 group-hover:text-white transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
              }} 
              className="self-start"
            >
              <a
                href="#contact"
                className="inline-flex px-12 py-4 font-bold rounded-full text-center relative overflow-hidden group shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] btn-ripple touch-target hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%)', color: '#2A0410' }}
              >
                <span className="relative z-10 text-lg tracking-wide group-hover:scale-105 transition-transform duration-300 inline-block">Book Your Event</span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
