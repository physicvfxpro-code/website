import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toolCategories } from '../data'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Tools() {
  const { t } = useTranslation()
  const lang = i18n.language
  const [activeTab, setActiveTab] = useState('all')
  const contentRef = useRef(null)
  const headerRef = useRef(null)

  const activeCategory = toolCategories.find(c => c.id === activeTab)

  // Header entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tools-tag', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', delay: 0.1 })
      gsap.from('.tools-title', { opacity: 0, y: 55, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.from('.tools-sub', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.4 })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  // Animate cards on tab change
  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { opacity: 0, scale: 0.82, y: 28 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'back.out(1.4)' }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [activeTab])

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>{lang === 'fr' ? 'Équipement' : 'Equipment'} — Physic</title>
        <meta name="description" content={lang === 'fr'
          ? "Découvrez le matériel photo et vidéo que j'utilise : caméras, stabilisateurs, éclairage, audio et logiciels."
          : 'Explore the photo and video equipment I use: cameras, stabilizers, lighting, audio and software.'} />
      </Helmet>

      {/* Header */}
      <section ref={headerRef} className="pt-36 pb-20"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="tools-tag text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>
            {lang === 'fr' ? 'Équipement' : 'Equipment'}
          </span>
          <h1 className="tools-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92] mb-6"
            style={{ color: 'var(--color-text-primary)' }}>
            {t('tools.title')}
          </h1>
          <p className="tools-sub text-lg max-w-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('tools.subtitle')}
          </p>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-[60px] z-30 backdrop-blur-xl border-b"
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-1 py-3 overflow-x-auto">
          {toolCategories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              className="shrink-0 text-[11px] font-mono font-bold uppercase tracking-widest px-5 py-2.5 transition-all duration-250"
              style={{
                backgroundColor: activeTab === cat.id ? 'var(--color-accent)' : 'transparent',
                color: activeTab === cat.id ? '#fff' : 'var(--color-text-muted)',
                border: `1px solid ${activeTab === cat.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
              }}>
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 min-h-[60vh]" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl"
              style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'fr' ? activeCategory?.labelFr : activeCategory?.labelEn}
            </h2>
          </div>
          <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeCategory?.items.map((item, i) => (
              <article key={i} className="tool-card group overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>

                {/* Image container : hauteur fixe + object-contain pour tout voir */}
                <div style={{
                  height: '220px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-[1.06]"
                    onError={e => {
                      e.target.src = `https://placehold.co/800x450/0d0d18/4c54ea?text=${encodeURIComponent(item.name)}`
                    }}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-body font-semibold mb-1"
                    style={{ color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'fr' ? item.descFr : item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main >
  )
}