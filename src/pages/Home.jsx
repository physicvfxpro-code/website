import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal, useZoomOnScroll } from '../hooks/useGSAP'
import PortfolioCard from '../components/PortfolioCard'
import ServiceCard from '../components/ServiceCard'
import ProductCard from '../components/ProductCard'
import { projects, services, packs } from '../data'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { t } = useTranslation()
  const lang = i18n.language
  const pageRef = useRef(null)

  const statsRef = useReveal({ stagger: 0.15 })
  const servicesLabelRef = useReveal({ stagger: 0.12 })
  const shopLabelRef = useReveal({ stagger: 0.1 })
  const servicesZoomRef = useZoomOnScroll()
  const portfolioZoomRef = useZoomOnScroll()
  const shopZoomRef = useZoomOnScroll()
  const ctaZoomRef = useZoomOnScroll()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('.hero-tag', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
        .from('.hero-line', { opacity: 0, y: 70, stagger: 0.12, duration: 0.9, ease: 'power3.out' }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.2')

      // Hero bg parallax
      gsap.to('.hero-bg-img', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Stat count-up
      document.querySelectorAll('.stat-number').forEach(el => {
        const raw = el.dataset.value
        const suffix = el.dataset.suffix || ''
        if (!raw) return
        const end = parseInt(raw)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() { el.textContent = Math.round(obj.val) + suffix },
        })
      })

      // Section title scale-in
      document.querySelectorAll('.section-zoom-title').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.82, y: 20 },
          {
            opacity: 1, scale: 1, y: 0, duration: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })

      // Horizontal scroll
      const hTrack = document.querySelector('.h-scroll-track')
      const hWrap = document.querySelector('.h-scroll-wrap')
      if (hTrack && hWrap) {
        ScrollTrigger.refresh()
        const totalWidth = hTrack.scrollWidth - hWrap.offsetWidth
        if (totalWidth > 0) {
          gsap.to(hTrack, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: hWrap,
              start: 'top top',
              end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
              scrub: 1.2,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
        }
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '100', suffix: '+', label: t('home.stats_projects') },
    { value: '3', suffix: 'M+', label: t('home.stats_clients') },
    { value: '10', suffix: '+', label: t('home.stats_years') },
    { value: '50', suffix: '+', label: t('home.stats_awards') },
  ]

  return (
    <main ref={pageRef} style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Helmet>
        <title>Physic — {lang === 'fr' ? 'Photographe & Vidéaste' : 'Photographer & Videographer'}</title>
        <meta name="description" content={lang === 'fr'
          ? 'Studio créatif professionnel — photographie, vidéographie et direction artistique.'
          : 'Professional creative studio — photography, videography and art direction.'} />
      </Helmet>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero-section relative h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: '#07070e' }}>

        {/* ── Vidéo plein fond — mobile uniquement (cachée sur lg+) ── */}
        <video
          autoPlay muted loop playsInline
          className="hero-bg-img lg:hidden absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
          style={{ zIndex: 0 }}
          onError={e => e.target.style.display = 'none'}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/showreel.webm" type="video/webm" />
        </video>

        {/* ── Téléphone — desktop uniquement (caché sur mobile) ── */}
        <div className="hidden lg:flex absolute z-20 hero-phone" style={{ right: '12%', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{
            width: '270px',
            height: '540px',
            borderRadius: '38px',
            boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)',
            background: '#111',
            border: '4px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <video autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '34px' }}
              onError={e => e.target.style.display = 'none'}>
              <source src="/video/hero.mp4" type="video/mp4" />
              <source src="/video/showreel.webm" type="video/webm" />
            </video>
            {/* Encoche */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 48, height: 8, background: '#222', borderRadius: 8, opacity: 0.5 }} />
            {/* Bouton home */}
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: 36, height: 36, background: '#222', borderRadius: '50%', opacity: 0.3 }} />
          </div>
        </div>

        {/* Gradients et décor */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(7,7,14,0.55) 0%, transparent 40%, rgba(7,7,14,0.9) 100%)', zIndex: 1 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(7,7,14,0.65) 0%, transparent 60%)', zIndex: 1 }} />

        {/* Vertical label */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-5 pointer-events-none" style={{ zIndex: 2 }}>
          <div className="w-px h-14" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <span style={{
            writingMode: 'vertical-rl',
            fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
          }}>
            Normandie — France
          </span>
          <div className="w-px h-14" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10 w-full flex flex-col justify-start">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="hero-tag inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--color-accent-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}>
                {t('home.hero_tag')}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              fontSize: 'clamp(52px, 10vw, 120px)',
              marginBottom: '2rem',
            }}>
              {t('home.hero_title').split('\n').map((line, i) => (
                <span key={i} className="hero-line block"
                  style={{ marginTop: i > 0 ? '-0.30em' : 0, paddingBottom: '0.15em', overflow: 'hidden' }}>
                  <span className="block" style={{
                    paddingBottom: '0.1em',
                    marginBottom: '-0.1em',
                    color: i === 1 ? 'var(--color-accent)' : '#ffffff',
                  }}>{line}</span>
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="hero-sub" style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '17px',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '2.5rem',
              fontFamily: 'DM Sans, sans-serif',
            }}
              dangerouslySetInnerHTML={{ __html: t('home.hero_subtitle') }}
            />

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap gap-4">
              <Link to="/portfolio"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white transition-opacity duration-300 hover:opacity-85"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  fontSize: '11px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}>
                {t('home.hero_cta')}

                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white transition-all duration-300 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontSize: '11px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}>
                {t('home.hero_cta2')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 2 }}>
          <div className="w-5 h-8 flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }}>
            <div className="w-0.5 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      <section ref={statsRef} className="py-16" style={{ backgroundColor: 'var(--color-accent)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="gsap-reveal">
                <p className="font-display font-black leading-none mb-2"
                  style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#ffffff' }}>
                  <span className="stat-number" data-value={s.value} data-suffix={s.suffix}>
                    {s.value}{s.suffix}
                  </span>
                </p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={servicesLabelRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="gsap-reveal block text-[11px] font-mono uppercase tracking-[0.18em] mb-3"
                style={{ color: 'var(--color-accent-text)' }}>Services</span>
              <h2 className="section-zoom-title font-display font-black tracking-tight leading-[0.92]"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--color-text-primary)' }}>
                {t('home.services_title')}
              </h2>
            </div>
            <p className="gsap-reveal max-w-xs text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('home.services_sub')}
            </p>
          </div>
          <div ref={servicesZoomRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.id} className="zoom-child"><ServiceCard service={s} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HORIZONTAL SCROLL STRIP
      ═══════════════════════════════════════════ */}
      <div className="h-scroll-wrap overflow-hidden" style={{ backgroundColor: '#07070e' }}>
        <div className="h-scroll-track flex will-change-transform">

          {/* Intro panel */}
          <div className="w-screen min-h-screen shrink-0 flex items-center px-6 lg:px-24 relative">
            <div className="relative z-10 max-w-lg">
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent-text)', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '1rem' }}>
                Portfolio
              </span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(48px, 7vw, 88px)', color: '#ffffff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                {t('home.portfolio_title')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.7, marginBottom: '2rem' }}>
                {t('home.portfolio_sub')}
              </p>
              <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
                Scroll to explore
              </div>
            </div>
          </div>

          {/* Project panels */}
          {projects.slice(0, 4).map(project => (
            <div key={project.id}
              className="w-[85vw] sm:w-[65vw] lg:w-[48vw] min-h-screen shrink-0 relative overflow-hidden">
              <img
                src={project.image}
                alt={lang === 'fr' ? project.titleFr : project.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => {
                  e.target.src = `https://placehold.co/900x1200/0d0d18/4c54ea?text=${encodeURIComponent(project.title)}`
                }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 inset-x-0 p-10">
                <span style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent-text)', textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block', marginBottom: '0.5rem' }}>
                  {project.category} — {project.year}
                </span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#ffffff', lineHeight: 1.2 }}>
                  {lang === 'fr' ? project.titleFr : project.title}
                </h3>
              </div>
            </div>
          ))}

          {/* CTA panel */}
          <div className="w-screen min-h-screen shrink-0 flex items-center justify-center px-6"
            style={{ backgroundColor: '#07070e' }}>
            <div className="text-center">
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1rem' }}>
                {projects.length} projets
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '2rem' }}>
                {t('home.portfolio_cta')}
              </h3>
              <Link to="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 text-white transition-all duration-400 hover:bg-white hover:text-gray-900"
                style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {t('home.portfolio_cta')}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PORTFOLIO GRID (zoom-in)
      ═══════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="section-zoom-title inline-block text-[11px] font-mono uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-accent-text)' }}>
              {lang === 'fr' ? 'Projets récents' : 'Recent projects'}
            </span>
          </div>
          <div ref={portfolioZoomRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p.id} className="zoom-child" style={{ aspectRatio: '4/3' }}>
                <PortfolioCard project={p} onClick={() => { }} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-3.5 transition-all duration-300"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                fontSize: '11px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent-text)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}>
              {t('home.portfolio_cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SHOP TEASER
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={shopLabelRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="gsap-reveal block text-[11px] font-mono uppercase tracking-[0.18em] mb-3"
                style={{ color: 'var(--color-accent-text)' }}>Shop</span>
              <h2 className="section-zoom-title font-display font-black tracking-tight leading-[0.92]"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--color-text-primary)' }}>
                {t('home.shop_title')}
              </h2>
            </div>
            <Link to="/shop"
              className="gsap-reveal self-start lg:self-end inline-flex items-center gap-2 px-6 py-3 transition-all duration-300"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent-text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
              {t('home.shop_cta')}
            </Link>
          </div>
          <div ref={shopZoomRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.slice(0, 3).map(p => (
              <div key={p.id} className="zoom-child"><ProductCard pack={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: 'var(--color-accent)' }}>
        <img src="./images/cta-bg.jpg" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.15 }}
          onError={e => e.target.style.display = 'none'}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }} />
        <div ref={ctaZoomRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="zoom-child">
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 88px)', color: '#ffffff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {lang === 'fr' ? 'Prêt à créer ?' : 'Ready to create?'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
              {lang === 'fr' ? 'Discutons de votre prochain projet créatif.' : "Let's talk about your next creative project."}
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 transition-colors duration-300"
              style={{ backgroundColor: '#ffffff', color: 'var(--color-accent)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
              {t('nav.contact')}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}