import { useLanguage } from '../contexts/language-context';
import { translations } from '../locales';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    if (!translations || !translations[language]) {
      return key;
    }

    return translations[language]?.[key] || key;
  };

  return { t, language };
};
