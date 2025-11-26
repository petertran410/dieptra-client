import { useLanguage } from '../contexts/language-context';
import { translations } from '../locales';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { t, language };
};
