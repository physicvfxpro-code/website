import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { HERO_SLIDES, PORTFOLIO_ITEMS, SERVICES, TESTIMONIALS, UI, t } from '../data/content.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home({ navigate }) {
  const { lang } = useApp()
  const ui = UI[lang]
  const [slide, setSlide] = useState(0)
  const testimonials = TESTIMONIALS[lang] || []

  const mainRef = useRef(null)
  const heroImgRefs = useRef([])
  const heroContentRef = useRef(null)
  const introImgRef = useRef(null)
  const introTextRef = useRef(null)
  const hScrollRef = useRef(null)
  const hScrollInnerRef = useRef(null)
  const statsRef = useRef(null)
  const svcHeaderRef = useRef(null)
  const svcRowRefs = useRef([])
  const testHeaderRef = useRef(null)
  const testCardRefs = useRef([])
  const quoteRef = useRef(null)
  const ctaRef = useRef(null)
  const zoomImgRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  // ─── GSAP ANIMATIONS ───
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero parallax on slide images ──
      heroImgRefs.current.forEach((img) => {
        if (!img) return
        gsap.to(img, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section'),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // ── Hero content fade out on scroll ──
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroContentRef.current.closest('section'),
            start: '60% top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // ── Intro image parallax ──
      if (introImgRef.current) {
        gsap.fromTo(introImgRef.current, { y: 80 }, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: introImgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // ── Intro text reveal ──
      if (introTextRef.current) {
        const els = introTextRef.current.querySelectorAll('.gsap-reveal')
        gsap.fromTo(els, { y: 50, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introTextRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // ── Zoom image section ──
      if (zoomImgRef.current) {
        gsap.fromTo(zoomImgRef.current, { scale: 0.85, borderRadius: '16px' }, {
          scale: 1,
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: zoomImgRef.current.closest('section'),
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      }

      // ── Horizontal scroll gallery ──
      if (hScrollRef.current && hScrollInnerRef.current) {
        const totalWidth = hScrollInnerRef.current.scrollWidth - window.innerWidth
        gsap.to(hScrollInnerRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: hScrollRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      // ── Stats counter / reveal ──
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll('.gsap-stat')
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // ── Services header ──
      if (svcHeaderRef.current) {
        gsap.fromTo(svcHeaderRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: svcHeaderRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
      }

      // ── Service rows stagger ──
      svcRowRefs.current.forEach((row, i) => {
        if (!row) return
        gsap.fromTo(row, { x: -50, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      // ── Testimonials header ──
      if (testHeaderRef.current) {
        gsap.fromTo(testHeaderRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: testHeaderRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
      }

      // ── Testimonial cards stagger ──
      testCardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card, { y: 60, opacity: 0, scale: 0.97 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      // ── Quote zoom-in from small ──
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current, { scale: 0.7, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: true,
          },
        })
      }

      // ── CTA reveal ──
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      // ── Parallax split image background ──
      const parallaxBgs = mainRef.current.querySelectorAll('.gsap-parallax-bg')
      parallaxBgs.forEach((bg) => {
        gsap.fromTo(bg, { y: -60 }, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: bg.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef}>

      {/* ─── HERO FULLSCREEN SLIDESHOW ─── */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1.4s ease',
              zIndex: i === slide ? 1 : 0,
            }}
          >
            <img
              ref={(el) => (heroImgRefs.current[i] = el)}
              src={s.src} alt=""
              style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'var(--hero-filter)', willChange: 'transform' }}
            />
          </div>
        ))}

        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' }} />

        <div ref={heroContentRef} style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <p
            className="label-light"
            style={{ marginBottom: 24, animation: 'heroReveal 0.9s ease 0.4s both', color: 'rgba(255,255,255,0.5)' }}
          >
            {ui.heroSub}
          </p>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(64px, 10vw, 128px)',
              color: '#f0ece6',
              animation: 'heroReveal 0.9s ease 0.65s both',
              lineHeight: 0.92, letterSpacing: '-3px',
            }}
          >
            PHYSIC<br />
            <em className="display-italic" style={{ fontSize: '84%' }}>.VFX</em>
          </h1>
          <p style={{
            fontFamily: "'MuseoSans', sans-serif", fontWeight: 200,
            fontSize: 'clamp(12px, 1.4vw, 15px)', letterSpacing: '3.5px',
            color: 'rgba(255,255,255,0.38)',
            marginTop: 32, marginBottom: 52,
            animation: 'heroReveal 0.9s ease 0.9s both',
          }}>
            {ui.heroTagline}
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', animation: 'heroReveal 0.9s ease 1.1s both' }}>
            <button className="btn btn-solid" onClick={() => navigate('portfolio')} style={{ background: '#e8e4de', color: '#0c0c0c', borderColor: '#e8e4de' }}>{ui.heroCtaPortfolio}</button>
            <button className="btn" onClick={() => navigate('contact')} style={{ color: '#e8e4de', borderColor: 'rgba(255,255,255,0.3)' }}>{ui.heroCtaContact}</button>
          </div>
        </div>

        {/* Slide indicator dots */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          zIndex: 4, display: 'flex', gap: 8,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 28 : 6, height: 2,
                background: i === slide ? '#e8e4de' : 'rgba(255,255,255,0.22)',
                border: 'none', padding: 0,
                transition: 'all 0.45s', cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Vertical label — right side */}
        <div style={{
          position: 'absolute', top: '50%', right: '4vw',
          transform: 'translateY(-50%)',
          zIndex: 4, writingMode: 'vertical-rl',
        }}>
          <span className="label" style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
            {t(HERO_SLIDES[slide].label, lang)} · 0{slide + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>
      </section>

      {/* ─── INTRO SPLIT — photo à côté du texte ─── */}
      <section style={{ padding: '140px 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden' }}>
            <div ref={introImgRef} className="photo-card" style={{ height: '72vh', willChange: 'transform' }}>
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85" alt="Physic VFX" />
            </div>
          </div>
          <div ref={introTextRef}>
            <p className="label gsap-reveal" style={{ marginBottom: 18 }}>{ui.introLabel}</p>
            <h2 className="display gsap-reveal" style={{ fontSize: 'clamp(34px, 3.8vw, 54px)', color: 'var(--text)', marginBottom: 24, lineHeight: 1.1 }}>
              {ui.introTitle1}<br /><em className="display-italic">{ui.introTitle2}</em>
            </h2>
            <div className="divider gsap-reveal" style={{ marginBottom: 30 }} />
            <p className="gsap-reveal" style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-muted)', marginBottom: 18 }}>
              {ui.introP1}
            </p>
            <p className="gsap-reveal" style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-muted)', marginBottom: 40 }}>
              {ui.introP2}
            </p>
            <button className="btn gsap-reveal" onClick={() => navigate('about')}>{ui.introBtn}</button>
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH ZOOM IMAGE ─── */}
      <section style={{ overflow: 'hidden' }}>
        <div
          ref={zoomImgRef}
          style={{
            width: '100%', height: '70vh',
            overflow: 'hidden',
            willChange: 'transform',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=90"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--img-filter)' }}
          />
        </div>
      </section>

      {/* ─── HORIZONTAL SCROLL GALLERY (vertical scroll zone) ─── */}
      <section
        ref={hScrollRef}
        style={{ overflow: 'hidden', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div
          ref={hScrollInnerRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: '100vh',
            padding: '0 5vw',
            willChange: 'transform',
          }}
        >
          {/* Header card */}
          <div style={{
            minWidth: '35vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '4vw',
            flexShrink: 0,
          }}>
            <p className="label" style={{ marginBottom: 12 }}>{ui.recentLabel}</p>
            <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 54px)', color: 'var(--text)', marginBottom: 24 }}>
              {ui.recentTitle}<br /><em className="display-italic">{ui.recentTitleEm}</em>
            </h2>
            <button className="btn btn-sm" onClick={() => navigate('portfolio')}>{ui.recentBtn}</button>
          </div>
          {/* Portfolio items */}
          {PORTFOLIO_ITEMS.slice(0, 8).map((p) => (
            <div
              key={p.id}
              className="photo-card"
              style={{
                minWidth: '30vw',
                height: '70vh',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onClick={() => navigate('portfolio')}
            >
              <img src={p.src} alt={t(p.title, lang)} />
              <div className="photo-caption">
                <p className="label" style={{ fontSize: 9, marginBottom: 6 }}>{t(p.cat, lang)}</p>
                <p className="display" style={{ fontSize: 20, color: '#f0ece6' }}>{t(p.title, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-dark" style={{ padding: '60px 5vw' }}>
        <div
          ref={statsRef}
          className="stats-grid"
          style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
        >
          {[
            { n: '5+', l: ui.statsYears },
            { n: '200+', l: ui.statsProjects },
            { n: '15+', l: ui.statsBrands },
            { n: '10+', l: ui.statsCountries },
          ].map((s, i) => (
            <div key={i} className="gsap-stat" style={{ textAlign: 'center' }}>
              <p className="display" style={{ fontSize: 'clamp(40px, 5vw, 58px)', color: 'var(--text)', lineHeight: 1 }}>{s.n}</p>
              <p className="label" style={{ marginTop: 8, fontSize: 9 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section style={{ padding: '120px 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <div
          ref={svcHeaderRef}
          style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
        >
          <div>
            <p className="label" style={{ marginBottom: 12 }}>{ui.svcLabel}</p>
            <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
              {ui.svcTitle} <em className="display-italic">{ui.svcTitleEm}</em>
            </h2>
          </div>
          <button className="btn btn-sm" onClick={() => navigate('services')}>{ui.svcBtn}</button>
        </div>

        {SERVICES.slice(0, 4).map((s, i) => (
          <div
            key={i}
            ref={(el) => (svcRowRefs.current[i] = el)}
            className="service-row"
            onClick={() => navigate('services')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4vw', flexWrap: 'wrap' }}>
              <span className="display-italic" style={{ fontSize: 12, color: 'var(--text-faint)', minWidth: 28 }}>{s.num}</span>
              <span className="display" style={{ fontSize: 'clamp(22px, 2.8vw, 38px)', color: 'var(--text)', minWidth: 200 }}>{t(s.title, lang)}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', flex: 1, minWidth: 160, fontStyle: 'italic' }}>{t(s.sub, lang)}</span>
              <span style={{ fontSize: 12, letterSpacing: '2px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 300 }}>{t(s.price, lang)}</span>
              <span style={{ color: 'var(--text-faint)', fontSize: 18, marginLeft: 'auto' }}>→</span>
            </div>
          </div>
        ))}
      </section>

      {/* ─── PARALLAX SPLIT IMAGE ─── */}
      <section style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <div
          className="gsap-parallax-bg"
          style={{
            position: 'absolute', inset: '-20% 0', width: '100%', height: '140%',
            willChange: 'transform',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1800&q=90"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.5)' }}
          />
        </div>
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 5vw',
        }}>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 5vw, 64px)', color: '#f0ece6', lineHeight: 1.1 }}>
            {lang === 'fr' ? "L'automobile, sublimée" : 'Automotive, elevated'}
            <br />
            <em className="display-italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {lang === 'fr' ? 'image par image.' : 'frame by frame.'}
            </em>
          </h2>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-dark" style={{ padding: '100px 5vw' }}>
        <div
          ref={testHeaderRef}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p className="label" style={{ marginBottom: 12 }}>{ui.testimonialsLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
            {ui.testimonialsTitle} <em className="display-italic">{ui.testimonialsTitleEm}</em>
          </h2>
        </div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, maxWidth: 1200, margin: '0 auto' }}>
          {testimonials.map((item, i) => (
            <div
              key={i}
              ref={(el) => (testCardRefs.current[i] = el)}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                padding: '44px 36px',
              }}
            >
              <p style={{ fontSize: 40, color: 'var(--shadow-num)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 20 }}>"</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 28 }}>{item.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <img src={item.avatar} alt={item.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', filter: 'saturate(0.4) brightness(0.65)' }} />
                <div>
                  <p style={{ fontSize: 14, color: 'var(--text)', fontFamily: "'MuseoSans', sans-serif", fontWeight: 500 }}>{item.name}</p>
                  <p className="label" style={{ fontSize: 8, marginTop: 2 }}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE (zoom-in on scroll) ─── */}
      <section style={{ padding: '140px 5vw', textAlign: 'center', overflow: 'hidden' }}>
        <div ref={quoteRef}>
          <p style={{
            fontFamily: "'MuseoSans', sans-serif", fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.8vw, 30px)', fontWeight: 400,
            color: 'var(--text-muted)', maxWidth: 680, margin: '0 auto 20px',
            lineHeight: 1.65,
          }}>
            {ui.quote}
          </p>
          <p className="label" style={{ fontSize: 9 }}>{ui.quoteAuthor}</p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-dark" style={{ padding: '110px 5vw', textAlign: 'center' }}>
        <div ref={ctaRef}>
          <p className="label" style={{ marginBottom: 20 }}>{ui.ctaLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 6vw, 78px)', color: 'var(--text)', marginBottom: 44, lineHeight: 1 }}>
            {ui.ctaTitle}<br /><em className="display-italic">{ui.ctaTitleEm}</em>
          </h2>
          <button className="btn btn-solid" onClick={() => navigate('contact')}>{ui.ctaBtn}</button>
        </div>
      </section>

    </div>
  )
}
