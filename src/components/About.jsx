import { motion } from 'framer-motion';

export default function About() {
  const highlights = [
    { icon: '⭐', title: 'Established', desc: '2012' },
    { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Professional Culinary Team' },
    { icon: '🍽️', title: 'Premium Catering', desc: 'Luxury Food Experience' },
    { icon: '🎉', title: 'Events Covered', desc: 'Wedding • Reception • Birthday • Corporate Events' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0020 0%, #1A0528 50%, #0d0020 100%)' }}>
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(74,16,112,0.8) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Premium Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--secondary)]/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] group">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=1200" 
                alt="Premium Catering Service"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0528]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Background Accent Glow behind image */}
            <div className="absolute -inset-4 bg-[var(--secondary)]/20 blur-3xl -z-10 rounded-[3rem] opacity-50" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[var(--secondary)] tracking-wide mb-6">
              ABOUT DURAISH CATERING
            </h2>
            <div className="w-24 h-1 bg-[var(--secondary)] mb-10" />
            
            <div className="space-y-5 text-gray-300 leading-relaxed font-light mb-12 text-base md:text-lg">
              <p>
                Our Duraish Catering, founded by Durai Pandian, was born out of his experience and driven by his passion for food and culinary creativity.
              </p>
              <p>
                Established in the year 2012, we have become a name synonymous with taste and quality, earning us an esteemed reputation and great value. Our hard work, dedication, and efficient time management have contributed to our successful growth.
              </p>
              <p>
                Inspired by his love for food and culinary arts, Durai Pandian decided to venture into the catering industry. As we expanded our business, we ventured into outdoor catering and events, equipped with modern facilities and supported by experienced chefs and a skilled service team. Our goal is to delight customers with heavenly tastes and exquisite flavors.
              </p>
              <p>
                At Duraish Catering, we take pride in our creative menus that showcase a blend of traditional delights and delightful continental dishes, complemented by our exclusive range of delectable sweets.
              </p>
              <p>
                We take the time to customize menus and food stall decorations according to our customer's desires, adding a personal touch to every occasion.
              </p>
              <p className="text-[var(--cream)] font-medium italic mt-6">
                Experience the magic of our culinary expertise and the luxury of our impeccable service that promises to make your special moments even more glamorous and memorable.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 w-full">
              {highlights.map((item, idx) => (
                <div key={`highlight-${idx}`} className="glass-card p-6 rounded-2xl flex items-start gap-5 hover:-translate-y-2 transition-transform duration-300 border border-[var(--secondary)]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-3xl bg-[var(--secondary)]/10 p-3 rounded-xl border border-[var(--secondary)]/30 shrink-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-playfair font-bold text-[var(--secondary)] text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-block px-12 py-4 font-bold rounded-full text-center relative overflow-hidden group shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]"
              style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%)', color: '#1A0528' }}
            >
              <span className="relative z-10 text-lg tracking-wide">Book Your Event</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
            </motion.a>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
