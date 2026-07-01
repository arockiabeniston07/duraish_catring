import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = React.memo(() => {
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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section ref={containerRef} id="about" className="py-20 px-6 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}>
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(106,15,36,0.8) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10 max-w-[1100px] flex flex-col items-center">
          
        {/* Main Heading */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center w-full mb-14 flex flex-col items-center"
        >
          <motion.h2 variants={textRevealVariants} className="text-[clamp(2.2rem,5vw,4rem)] font-playfair font-bold text-[var(--secondary)] tracking-wider mb-5">
            ABOUT DURAISH CATERING
          </motion.h2>
          <motion.div variants={textRevealVariants} className="flex items-center justify-center gap-3 mt-1">
             <div className="w-16 h-[1.5px] bg-[var(--secondary)]/60" />
             <div className="w-2.5 h-2.5 rotate-45 border-[1.5px] border-[var(--secondary)]/80" />
             <div className="w-16 h-[1.5px] bg-[var(--secondary)]/60" />
          </motion.div>
        </motion.div>

        {/* Two Image Gallery */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full mb-20"
        >
          {/* Image 1 */}
          <motion.div 
            variants={blurRevealVariants}
            className="aspect-square relative rounded-[24px] overflow-hidden border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(212,175,55,0.15)] group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A0410]/70 via-[#2A0410]/10 to-transparent z-10 pointer-events-none" />
            <img 
              src="/video/about1.jpeg" 
              alt="Duraish Catering Preparation"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block transition-transform duration-[1.5s] group-hover:scale-[1.08]"
            />
          </motion.div>

          {/* Image 2 */}
          <motion.div 
            variants={blurRevealVariants}
            className="aspect-square relative rounded-[24px] overflow-hidden border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(212,175,55,0.15)] group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A0410]/70 via-[#2A0410]/10 to-transparent z-10 pointer-events-none" />
            <img 
              src="/video/about2.jpeg" 
              alt="Duraish Catering Events"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block transition-transform duration-[1.5s] group-hover:scale-[1.08]"
            />
          </motion.div>
        </motion.div>

        {/* About Description & Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          <div className="space-y-8 text-gray-300 leading-[2.1] font-light mb-20 text-lg md:text-[1.15rem] text-left">
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
            <motion.div variants={textRevealVariants} className="pt-6 border-t border-[var(--secondary)]/20 mt-10">
              <p className="text-[var(--cream)] font-medium italic text-xl md:text-2xl text-center leading-relaxed">
                "Experience the magic of our culinary expertise and the luxury of our impeccable service that promises to make your special moments even more glamorous and memorable."
              </p>
            </motion.div>
          </div>

          {/* Highlight Cards */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            {highlights.map((item, idx) => (
              <motion.div variants={blurRevealVariants} key={`highlight-${idx}`} className="glass-card p-8 rounded-[20px] flex flex-col items-center text-center gap-5 transition-all duration-300 border border-[var(--secondary)]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-[var(--secondary)]/60 hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] group">
                <div className="text-4xl bg-[var(--secondary)]/10 w-20 h-20 rounded-full border border-[var(--secondary)]/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-[var(--secondary)] text-[1.2rem] mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h4>
                  <p className="text-gray-300 text-[0.95rem] leading-relaxed opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] } }
            }} 
          >
            <a
              href="#contact"
              className="inline-flex px-14 py-5 font-bold rounded-full text-center relative overflow-hidden group shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] btn-ripple touch-target hover:-translate-y-1.5"
              style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%)', color: '#2A0410' }}
            >
              <span className="relative z-10 text-[1.1rem] tracking-wider group-hover:scale-105 transition-transform duration-300 inline-block uppercase">Book Your Event</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

export default About;
