import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'it' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 inline-flex items-center justify-center rounded-full bg-primary/10 backdrop-blur border border-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/15 transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      {i18n.language === 'en' ? 'IT' : 'EN'}
    </motion.button>
  );
}
