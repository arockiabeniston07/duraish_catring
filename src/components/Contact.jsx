import React, { useState } from 'react';
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

const Contact = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    eventType: '',
    people: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) {
          error = 'Please enter your full name.';
        } else if (!/^[a-zA-Z\s'.]+$/.test(value)) {
          error = 'Only alphabets, spaces, apostrophes and periods are allowed.';
        } else if (trimmed.length < 3 || trimmed.length > 50) {
          error = 'Name must be between 3 and 50 characters.';
        }
        break;
      }
      case 'phone': {
        if (!value) {
          error = 'Please enter your phone number.';
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = 'Enter a valid 10-digit mobile number.';
        }
        break;
      }
      case 'date': {
        if (!value) {
          error = 'Please select an event date.';
        } else if (value < getTodayDate()) {
          error = 'Please select a future date.';
        }
        break;
      }
      case 'people': {
        if (!value) {
          error = 'Please enter the number of people.';
        } else {
          const num = Number(value);
          if (!Number.isInteger(num) || num < 100 || num > 100000) {
            error = 'Number of people must be between 100 and 100,000.';
          } else if (num % 50 !== 0) {
            error = 'Number must be a multiple of 50.';
          }
        }
        break;
      }
      case 'eventType': {
        if (!value) {
          error = 'Please select an event type.';
        }
        break;
      }
      case 'message': {
        if (value.length > 500) {
          error = 'Message cannot exceed 500 characters.';
        }
        break;
      }
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone' || name === 'people') {
      newValue = value.replace(/[^\d]/g, '');
    }
    
    if (name === 'message' && value.length > 500) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    let newValue = value;
    if (name === 'name') {
        newValue = value.trim();
        setFormData(prev => ({...prev, name: newValue}));
    } else if (name === 'people' && value !== '') {
        let num = Number(value);
        if (!isNaN(num)) {
            num = Math.round(num / 50) * 50;
            if (num < 100) num = 100;
            if (num > 100000) num = 100000;
            newValue = num.toString();
            setFormData(prev => ({...prev, people: newValue}));
        }
    }
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const isFormValid = () => {
    const fields = ['name', 'phone', 'date', 'eventType', 'people'];
    const currentErrors = fields.map(f => validateField(f, formData[f]));
    const hasErrors = currentErrors.some(err => err !== '');
    const hasEmptyRequired = fields.some(f => formData[f] === '');
    return !hasErrors && !hasEmptyRequired && errors.message === '' && !isSubmitting;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const newTouched = {};
    let firstInvalid = null;
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      newTouched[key] = true;
      if (error && !firstInvalid) {
        firstInvalid = key;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    if (firstInvalid) {
      const el = document.getElementById(firstInvalid);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const whatsappMessage = [
        `📅 *New Event Booking*`,
        ``,
        `👤 *Name:* ${formData.name}`,
        `📞 *Phone:* ${formData.phone}`,
        `📆 *Event Date:* ${formData.date}`,
        `👥 *Number of People:* ${formData.people}`,
        `🎉 *Event Type:* ${formData.eventType}`,
        `📝 *Requirements:* ${formData.message || 'None'}`
      ].join('\n');

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/918807555905?text=${encodedMessage}`, '_blank');

      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', date: '', eventType: '', people: '', message: '' });
      setTouched({});
      setErrors({});

      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const blurRevealVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const getInputClass = (name) => {
    const baseClass = "w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all";
    if (touched[name] && errors[name]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500 hover:border-red-400`;
    } else if (touched[name] && !errors[name] && formData[name]) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500 hover:border-green-400`;
    }
    return `${baseClass} border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37] hover:border-white/20`;
  };

  return (
    <section id="contact" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}>
      <div className="container mx-auto px-4">
        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="text-center mb-12"
        >
          <motion.h2 variants={textRevealVariants} className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Get in Touch</motion.h2>
          <motion.h3 variants={textRevealVariants} className="text-[clamp(2rem,6vw,3.5rem)] font-playfair font-bold text-white">Contact & Booking</motion.h3>
          <motion.div variants={textRevealVariants} className="gold-divider mx-auto mt-6" />
        </motion.div>

        {/* Meet Our Founders Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mb-16 max-w-[900px] mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
            
            <div className="text-center mb-10 relative z-10">
              <motion.h3 variants={textRevealVariants} className="text-[clamp(1.8rem,4vw,2.2rem)] font-playfair font-bold text-white tracking-wide">Meet Our Founders</motion.h3>
              <motion.div variants={textRevealVariants} className="flex items-center justify-center gap-2 mt-4">
                 <div className="w-12 h-px bg-[#D4AF37]/50" />
                 <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/50" />
                 <div className="w-12 h-px bg-[#D4AF37]/50" />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-0 relative z-10">
              {/* Vertical divider for desktop */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2"></div>
              
              {/* Founder 1 */}
              <motion.div 
                variants={blurRevealVariants}
                className="flex flex-col items-center text-center md:pr-10 group/founder"
              >
                <div className="w-[150px] h-[150px] rounded-full border border-[#D4AF37]/50 p-1 mb-5 transition-transform duration-500 group-hover/founder:scale-105 group-hover/founder:shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover/founder:border-[#D4AF37]">
                  <div className="w-full h-full rounded-full bg-white/5 overflow-hidden relative">
                    <img src="./video/contact1.jpeg" alt="Pandian" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover/founder:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <h4 className="text-[1.35rem] font-playfair font-bold text-white mb-1 group-hover/founder:text-[#D4AF37] transition-colors">Pandian</h4>
                <p className="text-[#D4AF37] font-medium text-[0.85rem] mb-1">Founder</p>
                <p className="text-gray-300 text-[0.85rem] mb-6">Operations & Event Management</p>
                
                <div className="flex flex-col gap-3 mb-8 w-max mx-auto">
                  <a href="tel:+9188075 55905" className="flex items-center gap-4 text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <Phone size={18} strokeWidth={1.5} className="opacity-80" />
                    <span className="text-[0.95rem] tracking-wide">+91 88075 55905</span>
                  </a>
                  <a href="mailto:pandiyan.durai@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <Mail size={18} strokeWidth={1.5} className="opacity-80" />
                    <span className="text-[0.95rem]">pandiyan.durai@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto justify-center">
                  <a 
                    href="https://wa.me/918807555905"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all font-medium text-[0.85rem]"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                  <a 
                    href="tel:+918807555905"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[#2A0410] font-bold text-[0.85rem] transition-all hover:brightness-110 shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #F3E5AB)' }}
                  >
                    <Phone size={15} fill="currentColor" strokeWidth={0} />
                    Call Now
                  </a>
                </div>
              </motion.div>

              {/* Founder 2 */}
              <motion.div 
                variants={blurRevealVariants}
                className="flex flex-col items-center text-center md:pl-10 group/founder pt-8 md:pt-0 border-t md:border-t-0 border-white/10"
              >
                <div className="w-[150px] h-[150px] rounded-full border border-[#D4AF37]/50 p-1 mb-5 transition-transform duration-500 group-hover/founder:scale-105 group-hover/founder:shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover/founder:border-[#D4AF37]">
                  <div className="w-full h-full rounded-full bg-white/5 overflow-hidden relative">
                    <img src="./video/contact2.jpeg" alt="Vignesh PK" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover/founder:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <h4 className="text-[1.35rem] font-playfair font-bold text-white mb-1 group-hover/founder:text-[#D4AF37] transition-colors">Vignesh PK</h4>
                <p className="text-[#D4AF37] font-medium text-[0.85rem] mb-1">Co-Founder</p>
                <p className="text-gray-300 text-[0.85rem] mb-6">Catering & Client Relations</p>
                
                <div className="flex flex-col gap-3 mb-8 w-max mx-auto">
                  <a href="tel:+918903093089" className="flex items-center gap-4 text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <Phone size={18} strokeWidth={1.5} className="opacity-80" />
                    <span className="text-[0.95rem] tracking-wide">+91 89030 93089</span>
                  </a>
                  <a href="mailto:pkvignesh255@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <Mail size={18} strokeWidth={1.5} className="opacity-80" />
                    <span className="text-[0.95rem]">pkvignesh255@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto justify-center">
                  <a 
                    href="https://wa.me/918903093089"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all font-medium text-[0.85rem]"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                  <a 
                    href="tel:+918903093089"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[#2A0410] font-bold text-[0.85rem] transition-all hover:brightness-110 shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #F3E5AB)' }}
                  >
                    <Phone size={15} fill="currentColor" strokeWidth={0} />
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start"
          >
            {/* Call Now Card */}
            <motion.a 
              variants={blurRevealVariants}
              href="tel:+918807555905" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#2A0410] transition-colors relative z-10 shadow-lg">
                <Phone size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Call Now</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10">+91 88075 55905</p>
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a 
              variants={blurRevealVariants}
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
            </motion.a>

            {/* Email Card */}
            <motion.a 
              variants={blurRevealVariants}
              href="mailto:pandiyan.durai@gmail.com" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#2A0410] transition-colors relative z-10 shadow-lg">
                <Mail size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Email</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors relative z-10 truncate">pandiyan.durai@gmail.com</p>
            </motion.a>

            {/* Location Card */}
            <motion.a 
              variants={blurRevealVariants}
              href="https://maps.google.com/?q=Duraish+Catering" 
              target="_blank" 
              rel="noreferrer" 
              className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors pointer-events-none" />
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#2A0410] transition-colors relative z-10 shadow-lg">
                <MapPin size={24} />
              </div>
              <h4 className="font-playfair font-bold text-xl mb-2 text-white relative z-10">Location</h4>
              <p className="text-gray-300 group-hover:text-white transition-colors text-sm relative z-10">
                45, New Amma Park, <br />
                Srinivasa Nagar, <br />
                Coimbatore - 641023
              </p>
            </motion.a>

            {/* Instagram Card */}
            <motion.a 
              variants={blurRevealVariants}
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
            </motion.a>

            {/* Facebook Card */}
            <motion.a 
              variants={blurRevealVariants}
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
            </motion.a>

            {/* ─── Tamil Quote ─── */}
            <motion.div
              variants={blurRevealVariants}
              className="sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center pt-10 pb-4 select-none"
            >
              <span
                aria-hidden="true"
                className="block text-[#D4AF37] opacity-30 font-serif leading-none mb-4"
                style={{ fontSize: '6rem', lineHeight: 0.7 }}
              >
                ❝
              </span>

              <div className="text-center max-w-md mx-auto">
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card p-8 rounded-3xl border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#D4AF37]/15 transition-colors duration-700" />

            <h3 className="text-3xl font-playfair font-bold text-white mb-2 relative z-10">Book Your Event</h3>
            <p className="text-gray-400 mb-8 relative z-10">Fill the details below to receive a quick quote via WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300 font-medium">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    id="name"
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('name')}
                    placeholder="Enter your name"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-400 text-xs mt-1" id="name-error">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-gray-300 font-medium">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    id="phone"
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('phone')}
                    placeholder="Enter phone number"
                    aria-invalid={touched.phone && !!errors.phone}
                    aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-400 text-xs mt-1" id="phone-error">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm text-gray-300 font-medium">Event Date <span className="text-red-500">*</span></label>
                  <input 
                    id="date"
                    type="date" 
                    name="date" 
                    required 
                    min={getTodayDate()}
                    value={formData.date} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClass('date')} [color-scheme:dark]`}
                    aria-invalid={touched.date && !!errors.date}
                    aria-describedby={touched.date && errors.date ? "date-error" : undefined}
                  />
                  {touched.date && errors.date && (
                    <p className="text-red-400 text-xs mt-1" id="date-error">{errors.date}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="people" className="text-sm text-gray-300 font-medium">Number of People <span className="text-red-500">*</span></label>
                  <input 
                    id="people"
                    type="number" 
                    name="people" 
                    required 
                    min="100"
                    max="100000"
                    step="50"
                    value={formData.people} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className={getInputClass('people')}
                    placeholder="100 - 100000 (Step: 50)"
                    aria-invalid={touched.people && !!errors.people}
                    aria-describedby={touched.people && errors.people ? "people-error" : undefined}
                  />
                  {touched.people && errors.people && (
                    <p className="text-red-400 text-xs mt-1" id="people-error">{errors.people}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="eventType" className="text-sm text-gray-300 font-medium">Event Type <span className="text-red-500">*</span></label>
                <select 
                  id="eventType"
                  name="eventType" 
                  required 
                  value={formData.eventType} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClass('eventType')} [&>option]:bg-[#2A0410]`}
                  aria-invalid={touched.eventType && !!errors.eventType}
                  aria-describedby={touched.eventType && errors.eventType ? "eventType-error" : undefined}
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Reception">Reception</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="House Warming">House Warming</option>
                  <option value="College Event">College Event</option>
                  <option value="Temple Function">Temple Function</option>
                  <option value="Other">Other</option>
                </select>
                {touched.eventType && errors.eventType && (
                  <p className="text-red-400 text-xs mt-1" id="eventType-error">{errors.eventType}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="message" className="text-sm text-gray-300 font-medium">Message / Requirements</label>
                  <span className={`text-xs ${formData.message.length >= 500 ? 'text-red-400' : 'text-gray-400'}`}>
                    {500 - formData.message.length} characters remaining
                  </span>
                </div>
                <textarea 
                  id="message"
                  name="message" 
                  rows="3" 
                  maxLength="500"
                  value={formData.message} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClass('message')} resize-none`}
                  placeholder="Any specific requests?"
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                ></textarea>
                {touched.message && errors.message && (
                  <p className="text-red-400 text-xs mt-1" id="message-error">{errors.message}</p>
                )}
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
                whileTap={{ scale: isFormValid() && !isSubmitting ? 0.97 : 1 }}
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full font-bold text-lg py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
                  isFormValid() 
                    ? 'shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] cursor-pointer btn-ripple touch-target' 
                    : 'opacity-50 cursor-not-allowed grayscale-[0.5]'
                }`}
                style={{ 
                  background: 'linear-gradient(90deg, #D4AF37, #F3E5AB)', 
                  color: '#2A0410' 
                }}
                onMouseEnter={(e) => {
                  if (isFormValid()) {
                    e.currentTarget.style.background = '#25D366';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFormValid()) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #D4AF37, #F3E5AB)';
                    e.currentTarget.style.color = '#2A0410';
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <WhatsAppIcon className="w-6 h-6" />
                )}
                {isSubmitting ? 'Opening WhatsApp...' : 'WhatsApp Booking'}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

export default Contact;
