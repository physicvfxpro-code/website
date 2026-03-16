import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PortfolioCard from '../components/PortfolioCard'
import PhotoLightbox from '../components/PhotoLightbox'
import { projects } from '../data'
import i18n from '../i18n'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const CATS = ['all', 'photo', 'video', 'brand']



const SKILLS_EDITING = [
  { label: 'After Effects', value: 100 },
  { label: 'Lightroom', value: 85 },
  { label: 'Blender', value: 70 },
  { label: 'Illustrator', value: 70 },
  { label: 'Premiere Pro', value: 60 },
  { label: 'DaVinci Resolve', value: 45 },
]

const SKILLS_CODE = [
  { label: 'Création de documentation technique', value: 100 },
  { label: 'CSS / Tailwind', value: 95 },
  { label: 'Python', value: 90 },
  { label: 'SQL', value: 85 },
  { label: 'JavaScript / React', value: 80 },
  { label: 'Git', value: 75 },
  { label: 'ExtendScript', value: 65 },
]


const TABS = [
  { id: 'editing', labelFr: 'Montage & Photo', labelEn: 'Editing & Photo' },
  { id: 'code', labelFr: 'Code', labelEn: 'Code' },
]

export default function Portfolio() {
  const { t } = useTranslation()
  const lang = i18n.language

  // ── Nav links (inside component so t() is available) ────────────────────
  const links = [
    ['/', t('nav.home')],
    ['/portfolio', t('nav.portfolio')],
    ['/shop', t('nav.shop')],
    ['/services', t('nav.services')],
    ['/tools', t('nav.tools')],
    ['/contact', t('nav.contact')],
  ]

  // ── Portfolio state ──────────────────────────────────────────────────────
  const [active, setActive] = useState('all')
  const [lightboxProject, setLightboxProject] = useState(null)
  const [lightboxImgIdx, setLightboxImgIdx] = useState(0)
  const gridRef = useRef(null)

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  const openLightbox = (project, imgIdx = 0) => {
    setLightboxProject(project)
    setLightboxImgIdx(imgIdx)
  }
  const closeLightbox = () => setLightboxProject(null)
  const allImages = lightboxProject?.images ?? (lightboxProject ? [lightboxProject.image] : [])
  const lightboxPrev = () => setLightboxImgIdx(i => Math.max(0, i - 1))
  const lightboxNext = () => setLightboxImgIdx(i => Math.min(allImages.length - 1, i + 1))

  // ── About state ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('editing')
  const barsRef = useRef(null)
  const skills = activeTab === 'editing' ? SKILLS_EDITING : SKILLS_CODE

  // ── Portfolio animations ─────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-h-title', { opacity: 0, y: 55, duration: 0.9, ease: 'power3.out', delay: 0.1 })
      gsap.from('.port-h-sub', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.3 })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.port-card')
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.82, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'back.out(1.4)' }
    )
  }, [active])

  // ── About animations ─────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-h-eyebrow', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-h-eyebrow', start: 'top 85%' }
      })
      gsap.from('.about-h-title', {
        opacity: 0, y: 55, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-h-title', start: 'top 85%' }
      })
      gsap.from('.about-h-sub', {
        opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-h-sub', start: 'top 85%' }
      })
      gsap.from('.about-img-wrap', {
        opacity: 0, x: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-img-wrap', start: 'top 85%' }
      })
      gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 36, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.skill-fill')
    if (!bars) return
    bars.forEach((bar, i) => {
      const target = bar.dataset.value
      gsap.fromTo(bar,
        { width: '0%' },
        { width: `${target}%`, duration: 1.0, ease: 'power3.out', delay: i * 0.05 }
      )
    })
  }, [activeTab])

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>Portfolio — Physic</title>
        <meta name="description" content={lang === 'fr'
          ? 'Découvrez mes projets de photographie, vidéographie et direction artistique.'
          : 'Explore my photography, videography and art direction projects.'} />
      </Helmet>

      {/* ─── Portfolio Header ─── */}
      <section className="pt-36 pb-16 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>
            Portfolio
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="port-h-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92]"
              style={{ color: 'var(--color-text-primary)' }}>
              {t('portfolio.title')}
            </h1>
            <p className="port-h-sub text-sm leading-relaxed pb-2 max-w-sm"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('portfolio.subtitle')}
            </p>
          </div>
          <div className="h-px mt-12" style={{ background: `linear-gradient(to right, var(--color-accent), transparent)` }} />
        </div>
      </section>

      {/* ─── Filter bar ─── */}
      <div className="sticky top-[60px] z-30 backdrop-blur-xl border-b"
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-2 py-3 overflow-x-auto">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="shrink-0 text-[11px] font-mono font-bold uppercase tracking-widest px-5 py-2.5 transition-all duration-250"
              style={{
                backgroundColor: active === cat ? 'var(--color-accent)' : 'transparent',
                color: active === cat ? '#fff' : 'var(--color-text-muted)',
                border: `1px solid ${active === cat ? 'var(--color-accent)' : 'var(--color-border)'}`,
              }}>
              {t(`portfolio.${cat}`)}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono shrink-0"
            style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length}
          </span>
        </div>
      </div>

      {/* ─── Grid ─── */}
      <section className="py-12" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="port-card" style={{ aspectRatio: '4/3' }}>
                <PortfolioCard project={p} onClick={(proj) => openLightbox(proj, 0)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightboxProject && (
        <PhotoLightbox
          src={allImages[lightboxImgIdx] ?? lightboxProject.image}
          alt={lang === 'fr' ? lightboxProject.titleFr : lightboxProject.title}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
          hasPrev={lightboxImgIdx > 0}
          hasNext={lightboxImgIdx < allImages.length - 1}
        />
      )}

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════════════ */}

      {/* ─── About Hero ─── */}
      <section className="pt-36 pb-16 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <span className="about-h-eyebrow text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>
            {lang === 'fr' ? 'À propos' : 'About'}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="about-h-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92]"
              style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'fr' ? 'Créer avec\nintention.' : 'Creating with\nintention.'}
            </h1>
            <p className="about-h-sub text-sm leading-relaxed pb-2 max-w-sm"
              style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'fr'
                ? 'Photographe, vidéaste et directeur artistique basé en France. Je transforme les idées en images qui racontent.'
                : 'Photographer, videographer & art director based in France. I turn ideas into images that tell stories.'}
            </p>
          </div>
          <div className="h-px mt-12"
            style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)' }} />
        </div>
      </section>

      {/* ─── About Me split ─── */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Portrait */}
            <div className="about-img-wrap relative">
              <div className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', border: '1px solid var(--color-border)' }}>
                <img
                  src="/images/about-portrait.jpg"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.05) saturate(0.9)' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.style.background = 'var(--color-bg-secondary)'
                  }}
                />
                <div className="absolute bottom-0 left-0 w-16 h-16"
                  style={{ background: 'var(--color-accent)', opacity: 0.9 }} />

              </div>
              <div className="absolute -right-4 top-8 text-[10px] font-mono uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-text-muted)', writingMode: 'vertical-rl' }}>
                {lang === 'fr' ? 'Photographe · Vidéaste' : 'Photographer · Videographer'}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-8">
              <div className="reveal-up">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-3 block"
                  style={{ color: 'var(--color-accent-text)' }}>
                  01 — {lang === 'fr' ? 'Mon histoire' : 'My story'}
                </span>
                <p className="text-base leading-loose" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'fr'
                    ? 'Je m\'appelle Khylian — photographe et vidéaste passionné par la composition et transformer un rush brute et histoire dynamique. Depuis plus de 10 ans, je collabore avec des particuliers pour mettre en scène des visuels qui marquent les esprits.'
                    : 'My name is Khylian — a photographer and videographer passionate about composition and transforming raw footage into dynamic stories. For over 10 years I\'ve collaborated with clients, to create visuals that leave a lasting impression.'}
                </p>
              </div>

              <div className="reveal-up">
                <p className="text-base leading-loose" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'fr'
                    ? 'Mon approche est méthodique, je cherche à la fois a melange la vlonté et la créativité demander par les personnes avec qui je travaille mais aussi à préserver une histoire, une identité. Mon but n\'est pas seulement de faire une une video qui accroche mais qui donne envie de la revoir, de s\'y replonger, de découvrir de nouveaux détails à chaque visionnage.'
                    : 'My approach is methodical, I aim to blend the will and creativity of the people I work with while preserving a story, an identity. My goal is not just to make a video that hooks but one that makes you want to watch it again, to dive back in, to discover new details with each viewing.'}
                </p>
              </div>

              <div className="reveal-up h-px" style={{ background: 'var(--color-border)' }} />

              <div className="reveal-up flex items-center gap-4">
                <Link to="/contact"
                  className="text-[11px] font-mono font-bold uppercase tracking-widest px-6 py-3 transition-all duration-250"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#fff', border: '1px solid var(--color-accent)' }}>
                  {lang === 'fr' ? 'Travailler ensemble' : 'Work together'}
                </Link>
                <Link to="/services"
                  className="text-[11px] font-mono font-bold uppercase tracking-widest px-6 py-3 transition-all duration-250"
                  style={{ backgroundColor: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                  {lang === 'fr' ? 'Voir les services' : 'See services'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — title + tab switcher */}
            <div className="reveal-up flex flex-col gap-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
                  style={{ color: 'var(--color-accent-text)' }}>
                  02 — {lang === 'fr' ? 'Compétences' : 'Skills'}
                </span>
                <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.95]"
                  style={{ color: 'var(--color-text-primary)' }}>
                  {lang === 'fr' ? 'Ce que je\nmaîtrise.' : 'What I\nmaster.'}
                </h2>
                <div className="h-px mt-8 w-24" style={{ backgroundColor: 'var(--color-accent)' }} />
              </div>

              <div className="flex items-center gap-2">
                {TABS.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className="shrink-0 text-[11px] font-mono font-bold uppercase tracking-widest px-5 py-2.5 transition-all duration-250"
                    style={{
                      backgroundColor: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
                      color: activeTab === tab.id ? '#fff' : 'var(--color-text-muted)',
                      border: `1px solid ${activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    }}>
                    {lang === 'fr' ? tab.labelFr : tab.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — animated bars */}
            <div ref={barsRef} className="flex flex-col gap-6 self-center">
              {skills.map((sk, i) => (
                <div key={`${activeTab}-${i}`}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest"
                      style={{ color: 'var(--color-text-primary)' }}>
                      {sk.label}
                    </span>
                    <span className="text-[11px] font-mono"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {sk.value}%
                    </span>
                  </div>
                  <div className="relative" style={{ height: '2px', backgroundColor: 'var(--color-border)' }}>
                    <div
                      className="skill-fill absolute top-0 left-0"
                      data-value={sk.value}
                      style={{ width: '0%', height: '2px', backgroundColor: 'var(--color-accent)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="py-24 border-y" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal-up max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] mb-6 block"
              style={{ color: 'var(--color-accent-text)' }}>
              03 — {lang === 'fr' ? 'Ma philosophie' : 'My philosophy'}
            </span>
            <blockquote className="font-display font-black text-3xl md:text-5xl tracking-tight leading-[1.05]"
              style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'fr'
                ? '« Une image ne vaut pas mille mots, elle vaut une histoire. »'
                : '"A picture is not worth a thousand words, it\'s worth a story."'}
            </blockquote>
          </div>
        </div>
      </section>

    </main>
  )
}