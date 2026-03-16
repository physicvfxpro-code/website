import { useTranslation } from 'react-i18next'

export function useLangOptions() {
    const { t, i18n } = useTranslation()
    return {
        lang: i18n.language,
        setLang: i18n.changeLanguage,
        options: [
            { code: 'fr', label: t('lang.fr') },
            { code: 'en', label: t('lang.en') },
        ],
    }
}
