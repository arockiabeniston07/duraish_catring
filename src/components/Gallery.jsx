import React from 'react';
import { motion } from 'framer-motion';
import ReelCarousel from './ReelCarousel';
import { galleryVideos } from '../data/staticData';

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0020 0%, #1A0528 40%, #0d0020 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full blur-[120px] opacity-10 pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full blur-[120px] opacity-10 pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,16,112,0.8) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-playfair font-bold text-white">Previous Works</h2>
          <div className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Instagram Reel Style Carousel */}
        <ReelCarousel videos={galleryVideos} />
      </div>
    </section>
  );
}
