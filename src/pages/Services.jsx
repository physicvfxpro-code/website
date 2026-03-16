import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data'
import { useZoomOnScroll, useReveal } from '../hooks/useGSAP'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger)

const PROCESS = [
  {
    step: '01',
    titleFr: 'Brief & Découverte', titleEn: 'Brief & Discovery',
    descFr: 'Nous discutons de vos besoins, objectifs et de la vision créative du projet.',
    descEn: 'We discuss your needs, objectives and the creative vision of the project.'
  },
  {
    step: '02',
    titleFr: 'Pré-production', titleEn: 'Pre-Production',
    descFr: "Planification, moodboard, repérages et préparation de tous les éléments.",
    descEn: 'Planning, moodboard, scouting and preparation of all elements.'
  },
  {
    step: '03',
    titleFr: 'Production', titleEn: 'Production',
    descFr: "La journée de tournage / shooting.",
    descEn: 'The shoot day.'
  },
  {
    step: '04',
    titleFr: 'Post-production', titleEn: 'Post-Production',
    descFr: 'Montage, retouche, étalonnage et livraison des fichiers finaux.',
    descEn: 'Editing, retouching, color grading and delivery of final files.'
  },
]

const FAQ = (lang) => [
  {
    q: lang === 'fr' ? 'Quels sont les délais de livraison ?' : 'What are the delivery times?',
    a: lang === 'fr'
      ? 'Photos livrées sous 4-7 jours ouvrés, vidéos sous 5-14 jours selon complexité.'
      : 'Photos delivered in 4-7 business days, videos in 5-14 days depending on complexity.',
  },
  {
    q: lang === 'fr' ? 'Vous déplacez-vous en dehors de Normandie ?' : 'Do you travel outside Normandie?',
    a: lang === 'fr'
      ? "Oui, partout en France. Frais de déplacement selon destination (0,60 € / km)."
      : 'Yes, throughout France. Travel costs may apply (0.60 € / km).',
  },
  {
    q: lang === 'fr' ? 'Comment se déroule le paiement ?' : 'How does payment work?',
    a: lang === 'fr'
      ? 'Acompte 50% à la signature, solde à la livraison des fichiers finaux.'
      : '50% deposit on signing, balance due on final delivery.',
  },
]

export default function Services() {
  const { t } = useTranslation()
  const lang = i18n.language
  const headerRef = useRef(null)
  const cardsRef = useZoomOnScroll()
  const processRef = useReveal({ stagger: 0.15 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.srv-tag', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', delay: 0.1 })
      gsap.from('.srv-title', { opacity: 0, y: 55, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.from('.srv-sub', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.4 })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>{t('services.title')} — Physic</title>
        <meta name="description" content={lang === 'fr'
          ? 'Services de photographie, vidéographie et direction artistique. Devis sur mesure.'
          : 'Photography, videography and art direction services. Custom quotes.'} />
      </Helmet>

      {/* Header */}
      <section ref={headerRef} className="pt-36 pb-20"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="srv-tag text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>Services</span>
          <h1 className="srv-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92] mb-6"
            style={{ color: 'var(--color-text-primary)' }}>
            {t('services.title')}
          </h1>
          <p className="srv-sub text-lg max-w-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Cards — zoom in */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.id} className="zoom-child">
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-24"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="gsap-reveal mb-16">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-3 block"
              style={{ color: 'var(--color-accent-text)' }}>
              {lang === 'fr' ? 'Comment ça marche' : 'How it works'}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'fr' ? 'Mon processus' : 'My process'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {PROCESS.map((step, i) => (
              <div key={i} className="gsap-reveal">
                <span className="font-mono text-6xl font-black block mb-4 leading-none"
                  style={{ color: 'var(--color-accent)', opacity: 0.2 }}>
                  {step.step}
                </span>
                <h3 className="font-display font-bold text-xl leading-tight mb-3"
                  style={{ color: 'var(--color-text-primary)' }}>
                  {lang === 'fr' ? step.titleFr : step.titleEn}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'fr' ? step.descFr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-3 block"
              style={{ color: 'var(--color-accent-text)' }}>FAQ</span>
            <h2 className="font-display font-black text-4xl tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'fr' ? 'Questions fréquentes' : 'Common questions'}
            </h2>
          </div>
          {FAQ(lang).map((item, i) => (
            <details key={i} className="group py-6 border-b"
              style={{ borderColor: 'var(--color-border)' }}>
              <summary className="flex justify-between items-center cursor-pointer list-none gap-4">
                <h3 className="font-body font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}>
                  {item.q}
                </h3>
                <svg className="shrink-0 transition-transform duration-300 group-open:rotate-45"
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ color: 'var(--color-accent)' }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </summary>
              <p className="mt-4 text-sm leading-relaxed pr-8"
                style={{ color: 'var(--color-text-muted)' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
