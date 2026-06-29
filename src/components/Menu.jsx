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

// ─── Single Menu Category Card ────────────────────────────────
function MenuCategoryCard({ categoryData, index }) {
  return (
    <motion.div
      className="menu-cat-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
    >
      {/* Card Glow */}
      <div className="menu-cat-card-glow" aria-hidden="true" />

      {/* Category Title */}
      <h3 className="menu-cat-title">{categoryData.category}</h3>

      {/* Divider */}
      <div className="menu-cat-divider" aria-hidden="true" />

      {/* Food Item List */}
      <ul className="menu-cat-list" role="list">
        {categoryData.items.map((foodName, i) => (
          <motion.li
            key={`${categoryData.category}-${foodName}-${i}`}
            className="menu-cat-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 + i * 0.03 }}
          >
            <div className="menu-cat-item-btn">
              <span className="menu-cat-item-dot" aria-hidden="true" />
              <span className="menu-cat-item-name">{foodName}</span>
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
        style={{ background: 'linear-gradient(180deg, #0d0020 0%, #1A0528 50%, #0d0020 100%)' }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(74,16,112,0.8) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-label">Discover Our</p>
            <h2 
              className="font-playfair font-bold text-white"
              style={{
                whiteSpace: 'nowrap',
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontSize: 'clamp(2rem, 7vw, 3rem)'
              }}
            >
              Exquisite Menu
            </h2>
            <div className="gold-divider mx-auto mt-6" />
          </motion.div>

          {/* ── Meal Category Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            {MEAL_CATEGORIES.map((meal) => {
              const isActive = activeMeal === meal;
              return (
                <button
                  key={meal}
                  onClick={() => handleMealChange(meal)}
                  className={`menu-tab-btn ${isActive ? 'menu-tab-btn--active' : ''}`}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
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
