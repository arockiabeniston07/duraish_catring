import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function ReelCarousel({ videos }) {
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState(videos[0]?.id);
  const videoRefs = useRef({});
  const [isMuted, setIsMuted] = useState(true);

  // Scroll Parallax Logic
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Sync muted state and volume directly to video elements for browser compatibility
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.muted = isMuted;
        video.volume = 1;
      }
    });
  }, [isMuted]);

  // Setup Intersection Observer to play/pause videos based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target;
          const id = Number(videoElement.dataset.id);

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveId(id);
            videoElement.play().catch(() => {
              // Ignore autoplay errors if user hasn't interacted yet
            });
          } else {
            videoElement.pause();
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Trigger when 60% of the video is visible
      }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  // Handle custom mouse drag scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div ref={sectionRef} className="relative w-full flex justify-center py-8">
      {/* Container for the Instagram Reel styling with Parallax */}
      <motion.div
        style={{ y: yParallax }}
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scale: 1.02, boxShadow: '0 30px 70px rgba(212,175,55,0.25)' }}
        className="w-full max-w-[400px] h-[80vh] md:h-[750px] relative overflow-hidden rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[8px] border-[#2A0410] transition-shadow duration-500"
        style={{ background: '#120206' }}
      >
        {/* Mute Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#2A0410] transition-all border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-105 touch-target"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } [&::-webkit-scrollbar]:hidden`}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center bg-black"
            >
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                data-id={video.id}
                src={video.src}
                className="w-full h-full object-cover pointer-events-none"
                loop
                muted={isMuted}
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
              />
              {/* Optional: Add a smooth gradient overlay to make it look premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* Pagination Dots (Optional but good for UX) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none z-10">
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeId === video.id ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
