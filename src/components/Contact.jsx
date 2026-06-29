import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

// WhatsApp Official SVG Icon
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// Instagram SVG Icon
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

// Facebook SVG Icon
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    eventType: '',
    people: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build WhatsApp message
    const whatsappMessage = [
      `*New Booking Enquiry — Duraish Catering*`,
      `-----------------------------------`,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Event Date:* ${formData.date}`,
      `*Event Type:* ${formData.eventType}`,
      `*People Count:* ${formData.people}`,
      `*Message:* ${formData.message || 'N/A'}`,
    ].join('\n');

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/918807555905?text=${encodedMessage}`, '_blank');

    // Show success state and reset
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', date: '', eventType: '', people: '', message: '' });

    // Auto-hide success message after 6 seconds
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0d0020 0%, #1A0528 50%, #0d0020 100%)' }}>
      <div className="container mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Get in Touch</h2>
          <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-playfair font-bold text-white">Contact & Booking</h3>
          <div className="gold-divider mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start"
          >
            {/* Call Now Card */}
            <a 
              href="tel:+918807555905" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#1A0528] transition-colors relative z-10 shadow-lg">
                <Phone size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Call Now</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10">+91 88075 55905</p>
            </a>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/918807555905" 
              target="_blank" 
              rel="noreferrer" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#25D366]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-[40px] group-hover:bg-[#25D366]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">WhatsApp</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10">Chat with us</p>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:iduraish@gmail.com" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#1A0528] transition-colors relative z-10 shadow-lg">
                <Mail size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Email</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10 truncate">iduraish@gmail.com</p>
            </a>

            {/* Location Card */}
            <a 
              href="https://maps.google.com/?q=Duraish+Catering" 
              target="_blank" 
              rel="noreferrer" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#1A0528] transition-colors relative z-10 shadow-lg">
                <MapPin size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Location</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors text-sm relative z-10">
                45, New Amma Park, <br />
                Srinivasa Nagar, <br />
                Coimbatore - 641023
              </p>
            </a>

            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/duraish_catering/" 
              target="_blank" 
              rel="noreferrer" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#E1306C]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(225,48,108,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E1306C]/10 rounded-full blur-[40px] group-hover:bg-[#E1306C]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#E1306C]/10 rounded-full flex items-center justify-center text-[#E1306C] mb-4 group-hover:bg-[#E1306C] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Instagram</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10">Follow us</p>
            </a>

            {/* Facebook Card */}
            <a 
              href="https://www.facebook.com/people/Duraish-catering-service/100095079982386/" 
              target="_blank" 
              rel="noreferrer" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#1877F2]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(24,119,242,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-full blur-[40px] group-hover:bg-[#1877F2]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#1877F2]/10 rounded-full flex items-center justify-center text-[#1877F2] mb-4 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Facebook</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10">Join our community</p>
            </a>

            {/* ─── Tamil Quote ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center pt-10 pb-4 select-none"
            >
              {/* Opening decorative quote mark */}
              <span
                aria-hidden="true"
                className="block text-[#D4AF37] opacity-30 font-serif leading-none mb-4"
                style={{ fontSize: '6rem', lineHeight: 0.7 }}
              >
                ❝
              </span>

              <div className="text-center max-w-md mx-auto">
                {/* Line 1 */}
                <p
                  className="leading-snug mb-2"
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
                    textShadow: '0 0 18px rgba(212,175,55,0.25), 0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  <span className="text-white">Taste-க்கு நாங்க </span>
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #D4AF37 0%, #F3E5AB 55%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
                    }}
                  >
                    Guarantee
                  </span>
                  <span className="text-white"> ...</span>
                </p>

                {/* Line 2 */}
                <p
                  className="leading-snug"
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
                    textShadow: '0 0 18px rgba(212,175,55,0.25), 0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  <span className="text-white">Order-க்கு நீங்க </span>
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #D4AF37 0%, #F3E5AB 55%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
                    }}
                  >
                    Guarantee
                  </span>
                  <span className="text-white">-யா ??</span>
                </p>

                {/* Signature */}
                <p
                  className="mt-8 text-right"
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    fontStyle: 'italic',
                    color: '#D4AF37',
                    opacity: 0.85,
                    letterSpacing: '0.05em',
                    textShadow: '0 0 12px rgba(212,175,55,0.4)',
                  }}
                >
                  — Pandiyan
                </p>
              </div>

              {/* Closing decorative quote mark */}
              <span
                aria-hidden="true"
                className="block text-[#D4AF37] opacity-30 font-serif leading-none mt-4"
                style={{ fontSize: '6rem', lineHeight: 0.7 }}
              >
                ❞
              </span>
            </motion.div>

          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group"
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#D4AF37]/15 transition-colors duration-700" />

            <h3 className="text-3xl font-playfair font-bold text-white mb-2 relative z-10">Book Your Event</h3>
            <p className="text-gray-400 mb-8 relative z-10">Fill the details below to receive a quick quote via WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Event Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20 [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Number of People</label>
                  <input 
                    type="number" 
                    name="people" 
                    required 
                    value={formData.people} 
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20"
                    placeholder="Estimated count"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Event Type</label>
                <select 
                  name="eventType" 
                  required 
                  value={formData.eventType} 
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20 [&>option]:bg-[#1A0528]"
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Outdoor Party">Outdoor Party</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Message / Requirements</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  value={formData.message} 
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:border-white/20 resize-none"
                  placeholder="Any specific requests?"
                ></textarea>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-green-400/30 bg-green-400/10"
                  >
                    <CheckCircle size={22} className="text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-300 font-semibold text-sm">Booking request sent!</p>
                      <p className="text-green-400/70 text-xs">WhatsApp has opened. We'll confirm shortly.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full font-bold text-lg py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ 
                  background: 'linear-gradient(90deg, #D4AF37, #F3E5AB)', 
                  color: '#1A0528' 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#25D366';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #D4AF37, #F3E5AB)';
                  e.currentTarget.style.color = '#1A0528';
                }}
              >
                <WhatsAppIcon className="w-6 h-6" />
                {isSubmitting ? 'Opening WhatsApp...' : 'WhatsApp Booking'}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
