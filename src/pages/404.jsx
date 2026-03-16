import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function NotFound() {
    const { t } = useTranslation()
    const lang = i18n.language
    const pageRef = useRef(null)



    return (
        <div ref={pageRef} className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-16">
            <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>{t('notFound.title')}</h1>
            <p className="text-lg leading-relaxed max-w-3xl text-center" style={{ color: 'var(--color-text-muted)' }}>
                trest
            </p>
        </div>

    )
}