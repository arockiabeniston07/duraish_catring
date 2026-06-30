import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you provide wedding catering?",
    answer: "Yes, we specialize in grand wedding catering with traditional authentic South Indian meals, buffet options, and live counters."
  },
  {
    question: "Do you provide outdoor catering?",
    answer: "Absolutely. We have specialized equipment and trained staff to handle outdoor catering for garden parties, corporate events, and destination weddings."
  },
  {
    question: "Can the menu be customized?",
    answer: "Yes, our menu is highly customizable. You can mix and match items across different cuisines to perfectly suit your guests' preferences."
  },
  {
    question: "Do you provide event decorations?",
    answer: "Yes! We are a full-scale Event Management company. We handle stage decorations, floral arrangements, lighting, and complete venue setup."
  },
  {
    question: "How early should a booking be made?",
    answer: "For grand events like weddings, we recommend booking at least 3-6 months in advance. For smaller events, 2-4 weeks notice is preferable."
  },
  {
    question: "Do you cover the entire Coimbatore?",
    answer: "Yes, we provide catering and event management services across all districts in Tamil Nadu. Additional transport charges may apply for long distances."
  },
  {
    question: "Do you provide live food counters?",
    answer: "Yes, we provide a wide variety of live counters including Dosa, Appam, Chaat, Ice Cream, Mocktails, and more, adding an interactive experience to your event."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const blurRevealVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section id="faq" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="text-center mb-16"
        >
          <motion.h2 variants={textRevealVariants} className="text-sm uppercase tracking-[0.3em] text-[var(--secondary)] mb-4">Common Queries</motion.h2>
          <motion.h3 variants={textRevealVariants} className="text-[clamp(1.75rem,5vw,3rem)] font-playfair font-bold text-white">Frequently Asked Questions</motion.h3>
          <motion.div variants={textRevealVariants} className="w-24 h-1 bg-[var(--secondary)] mx-auto mt-6" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              variants={blurRevealVariants}
              key={`faq-${index}`}
              className="glass-card overflow-hidden border border-white/5 transition-colors duration-300 hover:border-[var(--secondary)]/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none touch-target group btn-ripple"
              >
                <span className="font-playfair text-lg md:text-xl font-bold text-white pr-8 transition-colors duration-300 group-hover:text-[var(--secondary)]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-shrink-0 text-[var(--secondary)] bg-white/5 p-2 rounded-full transition-transform duration-300 group-hover:scale-110"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
