import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

// Official WhatsApp brand SVG icon
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Navbar = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Previous Works', href: '#gallery', id: 'gallery' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer for active nav links
    const observer = new IntersectionObserver((entries) => {
      // Find the entry that is most visible
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio to get the most visible section
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    }, {
      rootMargin: '-20% 0px -60% 0px', // Triggers when section is in upper middle of viewport
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    navLinks.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[var(--primary)]/80 backdrop-blur-md py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-[var(--secondary)]/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer touch-target" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Duraish Catering Logo" className="w-12 h-12 rounded-full object-cover border-2 border-[var(--secondary)]/40 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-500 hover:scale-105" />
              <div className="hidden sm:block">
                <span className="text-xl font-bold font-playfair text-[var(--secondary)] tracking-wider block leading-tight">DURAISH</span>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Catering & Events</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`text-sm uppercase tracking-widest transition-all duration-300 relative py-2 touch-target ${
                      activeSection === link.id ? 'text-[var(--secondary)] font-bold' : 'text-gray-300 hover:text-[var(--secondary)]'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--secondary)] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a href="tel:8807555905" className="flex items-center gap-2 text-sm font-medium border border-[var(--secondary)] text-[var(--secondary)] px-4 py-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--primary)] transition-all touch-target">
                <Phone size={16} />
                Call Now
              </a>
              <a href="https://wa.me/918807555905" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#1da851] hover:scale-105 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] touch-target">
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--secondary)] touch-target p-2 -mr-2"
              aria-label="Toggle Menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:hidden absolute top-full left-0 right-0 bg-[var(--primary)]/95 backdrop-blur-xl border-b border-[var(--secondary)]/20 shadow-2xl m-4 p-6 rounded-2xl"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={`mobile-${link.id}`}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg py-3 px-4 rounded-xl transition-all touch-target ${
                    activeSection === link.id 
                      ? 'bg-[var(--secondary)]/10 text-[var(--secondary)] font-bold' 
                      : 'text-gray-300 hover:text-[var(--secondary)] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <div className="h-px bg-white/10 my-4" />
            <div className="flex flex-col gap-3">
              <a href="tel:8807555905" className="flex items-center justify-center gap-2 font-medium border border-[var(--secondary)] text-[var(--secondary)] px-4 py-3 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--primary)] transition-all touch-target">
                <Phone size={18} />
                Call Now
              </a>
              <a href="https://wa.me/918807555905" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 font-medium bg-[#25D366] text-white px-4 py-3 rounded-full hover:scale-105 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] touch-target">
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
            </div>
          </ul>
        </motion.div>
      )}
    </nav>
  );
});

export default Navbar;
