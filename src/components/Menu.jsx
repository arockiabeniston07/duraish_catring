import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../data/menuData';

// ─── Constants ───────────────────────────────────────────────
const MEAL_CATEGORIES = ['Morning Tiffin', 'Afternoon Lunch', 'Evening Dinner'];

const TAMIL_LABELS = {
  'Morning Tiffin': 'காலை டிபன்',
  'Afternoon Lunch': 'மதிய விருந்து',
  'Evening Dinner': 'இரவு விருந்து'
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

// ─── Single Menu Category Card ────────────────────────────────
function MenuCategoryCard({ categoryData, index }) {
  return (
    <motion.div
      className="menu-cat-card"
      initial={{ opacity: 0, scale: 0.95, y: 100, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -5, scale: 1.02, boxShadow: '0 20px 40px rgba(212,175,55,0.2)' }}
    >
      {/* Card Glow */}
      <div className="menu-cat-card-glow opacity-0 transition-opacity duration-300" aria-hidden="true" />

      {/* Category Title */}
      <h3 className="menu-cat-title">{categoryData.category}</h3>

      {/* Divider */}
      <div className="menu-cat-divider" aria-hidden="true" />

      {/* Food Item List */}
      <ul className="menu-cat-list" role="list">
        {categoryData.items.map((foodName, i) => (
          <motion.li
            key={`${categoryData.category}-${foodName}-${i}`}
            className="menu-cat-item group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
          >
            <div className="menu-cat-item-btn touch-target">
              <span className="menu-cat-item-dot transition-transform duration-300 group-hover:rotate-90 group-hover:scale-150" aria-hidden="true" />
              <span className="menu-cat-item-name transition-colors duration-300 group-hover:text-[var(--secondary)]">{foodName}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Main Menu Section ────────────────────────────────────────
export default function Menu() {
  const [activeMeal, setActiveMeal] = useState(MEAL_CATEGORIES[0]);

  const handleMealChange = (meal) => {
    setActiveMeal(meal);
  };

  const activeCategories = menuData[activeMeal] || [];

  return (
    <>

      <section
        id="menu"
        className="menu-section py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #120206 0%, #2A0410 50%, #120206 100%)' }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(106,15,36,0.8) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          {/* ── Section Header ── */}
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
            <motion.p variants={textRevealVariants} className="section-label">Discover Our</motion.p>
            <motion.h2 
              variants={textRevealVariants}
              className="font-playfair font-bold text-white"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontSize: 'clamp(2rem, 7vw, 3rem)'
              }}
            >
              Exquisite Menu
            </motion.h2>
            <motion.div variants={textRevealVariants} className="gold-divider mx-auto mt-6" />
          </motion.div>

          {/* ── Meal Category Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            {MEAL_CATEGORIES.map((meal) => {
              const isActive = activeMeal === meal;
              return (
                <button
                  key={meal}
                  onClick={() => handleMealChange(meal)}
                  className={`menu-tab-btn touch-target btn-ripple hover:scale-105 transition-transform duration-300 ${isActive ? 'menu-tab-btn--active scale-105' : ''}`}
                  aria-pressed={isActive}
                >
                  {TAMIL_LABELS[meal]}
                </button>
              );
            })}
          </motion.div>

          {/* ── Category Cards Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMeal}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="menu-cards-grid"
            >
              {activeCategories.map((catData, index) => (
                <MenuCategoryCard
                  key={`${catData.category}-${index}`}
                  categoryData={catData}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
