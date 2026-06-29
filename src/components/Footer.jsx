import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

// Official WhatsApp brand SVG icon
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Facebook brand SVG icon
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Instagram SVG icon
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#gallery' },
    { name: 'Exquisite Menu', href: '#menu' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Duraish-catering-service/100095079982386',
      icon: <FacebookIcon size={20} />,
      hoverColor: 'hover:text-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/duraish_catering/',
      icon: <InstagramIcon size={20} />,
      hoverColor: 'hover:text-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/918807555905',
      icon: <WhatsAppIcon size={20} />,
      hoverColor: 'hover:text-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]',
    },
    {
      name: 'Email',
      href: 'mailto:Pandiyandurai@gmail.com',
      icon: <Mail size={20} />,
      hoverColor: 'hover:text-[var(--secondary)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]',
    },
  ];

  return (
    <footer className="border-t border-white/5 pt-20 pb-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0020 0%, #0a0018 100%)' }}>
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Tamil Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 pb-16 border-b border-white/10"
        >
          <div className="inline-block border-y border-[var(--secondary)]/50 py-6 px-8">
            <p className="text-[var(--secondary)] text-xl md:text-2xl tamil-font italic tracking-wide">
              "உண்ணும் உணவை வீண் செய்யாமல் இருப்பதே நாம் செய்யும் முதல் அன்னதானம்"
            </p>
          </div>
        </motion.div>

        {/* ── 4-Column Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Section 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.jpeg" alt="Duraish Catering Logo" className="w-12 h-12 rounded-full object-cover border-2 border-[var(--secondary)]/40 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              <div>
                <h3 className="font-playfair font-bold text-xl text-[var(--secondary)]">DURAISH</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Catering &amp; Events</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting unforgettable culinary experiences for every occasion. From traditional feasts to grand gala events across Tamil Nadu since 2012.
            </p>
          </motion.div>

          {/* Section 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-playfair font-bold text-lg text-[var(--secondary)] mb-6 after:block after:w-10 after:h-0.5 after:bg-[var(--secondary)] after:mt-2">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={`footer-link-${index}`}>
                  <a href={link.href} className="text-gray-400 hover:text-[var(--secondary)] transition-colors duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]/40 group-hover:bg-[var(--secondary)] transition-colors duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Section 3: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-playfair font-bold text-lg text-[var(--secondary)] mb-6 after:block after:w-10 after:h-0.5 after:bg-[var(--secondary)] after:mt-2">Contact Information</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:Pandiyandurai@gmail.com" className="flex items-start gap-3 group cursor-pointer hover:translate-x-1 transition-all duration-300">
                  <Mail size={16} className="text-[var(--secondary)] shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Email</span>
                    <span className="text-gray-300 group-hover:text-[var(--secondary)] transition-colors duration-300 text-sm">
                      Pandiyandurai@gmail.com
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://wa.me/918807555905" target="_blank" rel="noreferrer" className="flex items-start gap-3 group cursor-pointer hover:translate-x-1 transition-all duration-300">
                  <span className="text-[var(--secondary)] shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <WhatsAppIcon size={16} />
                  </span>
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">WhatsApp</span>
                    <span className="text-gray-300 group-hover:text-[#25D366] transition-colors duration-300 text-sm">
                      +91 88075 55905
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/duraish_catering/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group cursor-pointer hover:translate-x-1 transition-all duration-300">
                  <span className="text-[var(--secondary)] shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <InstagramIcon size={16} />
                  </span>
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Instagram</span>
                    <span className="text-gray-300 group-hover:text-[#E1306C] transition-colors duration-300 text-sm">
                      @duraish_catering
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/people/Duraish-catering-service/100095079982386/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group cursor-pointer hover:translate-x-1 transition-all duration-300">
                  <span className="text-[var(--secondary)] shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <FacebookIcon size={16} />
                  </span>
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Facebook</span>
                    <span className="text-gray-300 group-hover:text-[#1877F2] transition-colors duration-300 text-sm">
                      Duraish Catering Service
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=45+New+Amma+Park+Srinivasa+Nagar+Podanur+Coimbatore+641023" target="_blank" rel="noreferrer" className="flex items-start gap-3 group cursor-pointer hover:translate-x-1 transition-all duration-300">
                  <MapPin size={16} className="text-[var(--secondary)] shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Location</span>
                    <span className="text-gray-300 group-hover:text-[var(--secondary)] transition-colors duration-300 text-sm leading-relaxed block">
                      45, New Amma Park,<br />
                      Srinivasa Nagar, Podanur,<br />
                      Coimbatore - 641023
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Section 4: Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-playfair font-bold text-lg text-[var(--secondary)] mb-6 after:block after:w-10 after:h-0.5 after:bg-[var(--secondary)] after:mt-2">Follow Us</h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={`social-${index}`}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noreferrer' : undefined}
                  className={`flex items-center gap-4 glass-card p-4 rounded-xl border border-white/5 text-gray-400 transition-all duration-300 hover:scale-105 ${social.hoverColor}`}
                  aria-label={social.name}
                >
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                    {social.icon}
                  </div>
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Working Hours Card */}
            <div className="mt-6 p-4 glass rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Working Hours</p>
              <p className="text-gray-300 text-sm">Mon – Sun: 6:00 AM – 10:00 PM</p>
              <p className="text-[var(--secondary)] text-xs mt-1">Available for 24/7 event emergencies</p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Duraish Catering &amp; Event Management. All Rights Reserved.</p>
          <p className="text-center">
            Designed with ❤️ for <span className="text-[var(--secondary)]">Coimbatore's Finest Caterers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
