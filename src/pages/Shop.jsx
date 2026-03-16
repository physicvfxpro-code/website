import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import ProductCard from '../components/ProductCard'
import { packs } from '../data'
import { useZoomOnScroll } from '../hooks/useGSAP'
import i18n from '../i18n'

export default function Shop() {
  const { t } = useTranslation()
  const lang = i18n.language
  const gridRef = useZoomOnScroll()
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-tag', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', delay: 0.1 })
      gsap.from('.shop-title', { opacity: 0, y: 55, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.from('.shop-sub', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      gsap.from('.shop-banner', { opacity: 0, x: -28, duration: 0.7, ease: 'power3.out', delay: 0.55 })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>{t('shop.title')} — Physic</title>
        <meta name="description" content={lang === 'fr'
          ? 'Téléchargez gratuitement mes packs créatifs : presets, UI, icônes, templates vidéo.'
          : 'Download my free creative packs: presets, UI, icons, video templates.'} />
      </Helmet>

      {/* Header */}
      <section ref={headerRef} className="pt-36 pb-20"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="shop-tag text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>Shop</span>
          <h1 className="shop-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92] mb-6"
            style={{ color: 'var(--color-text-primary)' }}>
            {t('shop.title')}
          </h1>
          <p className="shop-sub text-lg max-w-lg leading-relaxed mb-10"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('shop.subtitle')}
          </p>
          <div className="shop-banner inline-flex items-center gap-4 px-6 py-4 border"
            style={{
              borderColor: 'var(--color-accent)',
              borderOpacity: 0.3,
              backgroundColor: 'var(--color-accent)',
              opacity: 1,
            }}>
            {/* workaround: use a wrapper with low-opacity bg */}
            <div className="inline-flex items-center gap-4"
              style={{
                background: 'transparent',
              }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="text-sm font-medium" style={{ color: 'var(--color-accent-text)' }}>
                {lang === 'fr'
                  ? 'Tous les packs sont 100% gratuits — aucune inscription requise.'
                  : 'All packs are 100% free — no sign-up required.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-28 pt-16" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map(p => (
              <div key={p.id} className="zoom-child">
                <ProductCard pack={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
