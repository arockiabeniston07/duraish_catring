import React from 'react';
import { motion } from 'framer-motion';
import ReelCarousel from './ReelCarousel';
import { reviewVideos } from '../data/staticData';

const Reviews = React.memo(() => {
  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label">Testimonials</p>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-playfair font-bold text-white">Client Reviews</h2>
          <div className="gold-divider mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-12 lg:gap-[2%] items-center">
          
          {/* Left Column - Videos */}
          <div className="w-full">
            <ReelCarousel videos={reviewVideos} />
          </div>

          {/* Right Column - Review Us Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full glass-card p-8 md:p-10 rounded-3xl border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(212,175,55,0.08)] flex flex-col items-center text-center relative overflow-hidden group"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
            
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-[0.2em] uppercase mb-4">★★★★★ Review Us</h4>
            
            <h3 className="text-[clamp(1.8rem,4vw,2.5rem)] font-playfair font-bold text-white mb-2 leading-tight">
              Love Our Catering?
            </h3>
            
            <p className="text-[#F3E5AB] font-medium text-lg mb-6">
              Your feedback means everything to us.
            </p>
            
            <p className="text-gray-300 text-sm md:text-base leading-[1.8] mb-10 opacity-90 max-w-sm mx-auto">
              "If you enjoyed our food, service, and hospitality, we'd truly appreciate your review. Your valuable feedback helps us improve and allows more families to discover Duraish Catering."
            </p>

            {/* QR Code */}
            <div className="mb-6 group/qr relative">
              <div className="w-[180px] h-[180px] bg-white rounded-[16px] p-2.5 border-2 border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.15)] transition-transform duration-500 group-hover/qr:scale-105 flex items-center justify-center">
                <img 
                  src={"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.google.com/search?q=duraishcatering"} 
                  alt="Scan to Review" 
                  className="w-full h-full object-contain rounded-lg" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            
            <p className="text-gray-300 font-medium text-xs md:text-sm mb-8 tracking-wide uppercase opacity-80">
              Scan to Leave a Google Review
            </p>

            {/* CTA Button */}
            <a
              href={"https://www.google.com/search?q=duraishcatering&oq=dura&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg8MgYIARBFGDsyBggCEEUYOzIOCAMQLhgKGAsYsQMYgAQyBggEEEUYOTIOCAUQABgKGAsYsQMYgAQyBggGEEUYPDIGCAcQRRg80gEIMzc4OWowajeoAgiwAgHxBaLW_evVrDT-&sourceid=chrome&ie=UTF-8#sv=CAwS_AEKBmxjbF9wdhI7CgNwdnESNENnMHZaeTh4TVhnMk5XZ3pOSFE1SWhZS0VHUjFjbUZwYzJnZ1kyRjBaWEpwYm1jUUFoZ0QSdgoDbHFpEm9DaEJrZFhKaGFYTm9JR05oZEdWeWFXNW5TS21teHRlWXZJQ0FDRm9pRUFBUUFSZ0FHQUVpRUdSMWNtRnBjMmdnWTJGMFpYSnBibWNxQmdnQ0VBQVFBWklCRUdOaGRHVnlhVzVuWDNObGNuWnBZMlUSEgoDdGJzEgtscmY6ITNzSUFFPRIVCgFxEhBkdXJhaXNoIGNhdGVyaW5nGhJsb2NhbC1wbGFjZS12aWV3ZXIYCiCT8ua_Cg"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 font-bold text-[#2A0410] rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%)' }}
            >
              <span className="relative z-10 text-[0.95rem] tracking-wide uppercase">
                ★★★★★ Click Here to Review Us
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

export default Reviews;
