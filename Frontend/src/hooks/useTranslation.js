import { useSelector } from 'react-redux';
import { translations } from '../constants/translations';

export const useTranslation = () => {
    const language = useSelector((state) => state.ui.language);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return { t, language };
};
