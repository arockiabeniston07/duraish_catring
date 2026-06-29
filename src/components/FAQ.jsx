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

  return (
    <section id="faq" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0d0020 0%, #1A0528 50%, #0d0020 100%)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--secondary)] mb-4">Common Queries</h2>
          <h3 className="text-4xl md:text-5xl font-playfair font-bold">Frequently Asked Questions</h3>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mt-6" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={`faq-${index}`}
              className="glass-card overflow-hidden border border-white/5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-playfair text-lg md:text-xl font-bold text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-[var(--secondary)] bg-white/5 p-2 rounded-full"
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
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
