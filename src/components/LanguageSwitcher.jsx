import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} className="language-switcher" title="Switch Language">
      <span className="lang-icon">🌐</span>
      <span className="lang-text">{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};

export default LanguageSwitcher;
