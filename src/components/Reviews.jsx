import React from 'react';
import { motion } from 'framer-motion';
import ReelCarousel from './ReelCarousel';
import { reviewVideos } from '../data/staticData';

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="section-label">Testimonials</p>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-playfair font-bold text-white">Client Reviews</h2>
          <div className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Instagram Reel Style Carousel */}
        <ReelCarousel videos={reviewVideos} />
      </div>
    </section>
  );
}
