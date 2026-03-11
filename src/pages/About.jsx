import { useRef, useLayoutEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { TIMELINE, GEAR, UI } from '../data/content.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ navigate }) {
  const { lang } = useApp()
  const ui = UI[lang]
  const timeline = TIMELINE[lang]
  const gear = GEAR[lang]
  const mainRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero image parallax ──
      const heroImg = mainRef.current.querySelector('.about-hero-img')
      if (heroImg) {
        gsap.fromTo(heroImg, { y: 0 }, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImg.closest('div'),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // ── Story section reveal ──
      const storyEls = mainRef.current.querySelectorAll('.gsap-reveal')
      storyEls.forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      // ── Photo grid parallax ──
      const photos = mainRef.current.querySelectorAll('.about-photo')
      photos.forEach((photo, i) => {
        gsap.fromTo(photo, { y: 40 + i * 20 }, {
          y: -(30 + i * 15),
          ease: 'none',
          scrollTrigger: {
            trigger: photo,
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
    <div ref={mainRef} style={{ paddingTop: 110 }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '78vh', overflow: 'hidden' }}>
        <img
          className="about-hero-img"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
          alt="Physic VFX"
          style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.22) saturate(0.45)', willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 38%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 5vw 80px' }}>
          <p className="label" style={{ marginBottom: 14, color: 'rgba(255,255,255,0.4)' }}>{ui.aboutHeroLabel}</p>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 108px)', color: '#f0ece6', lineHeight: 0.9 }}>
            {ui.aboutHeroTitle1}<br /><em className="display-italic" style={{ fontSize: '75%' }}>{ui.aboutHeroTitle2}</em>
          </h1>
        </div>
      </div>

      {/* Story section */}
      <section style={{ padding: '100px 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          <div>
            <p className="label gsap-reveal" style={{ marginBottom: 14 }}>{ui.aboutWhoLabel}</p>
            <h2 className="display gsap-reveal" style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', color: 'var(--text)', marginBottom: 24, lineHeight: 1.1 }}>
              {ui.aboutWhoTitle1}<br /><em className="display-italic">{ui.aboutWhoTitle2}</em>
            </h2>
            <div className="divider gsap-reveal" style={{ marginBottom: 30 }} />
            {[ui.aboutP1, ui.aboutP2, ui.aboutP3].map((text, i) => (
              <p key={i} className="gsap-reveal" style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-muted)', marginBottom: 18 }}>{text}</p>
            ))}
            <button className="btn gsap-reveal" style={{ marginTop: 24 }} onClick={() => navigate('contact')}>{ui.aboutBtn}</button>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <div className="photo-card about-photo" style={{ height: 320, gridColumn: '1 / -1' }}>
                <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80" alt="" style={{ filter: 'saturate(0.45) brightness(0.7)' }} />
              </div>
              <div className="photo-card about-photo" style={{ height: 200 }}>
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80" alt="" style={{ filter: 'saturate(0.45) brightness(0.7)' }} />
              </div>
              <div className="photo-card about-photo" style={{ height: 200 }}>
                <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80" alt="" style={{ filter: 'saturate(0.45) brightness(0.7)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark" style={{ padding: '96px 5vw' }}>
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 68 }}>
          <p className="label" style={{ marginBottom: 12 }}>{ui.aboutValuesLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
            {ui.aboutValuesTitle} <em className="display-italic">{ui.aboutValuesTitleEm}</em>
          </h2>
        </div>
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, maxWidth: 1200, margin: '0 auto' }}>
          {ui.aboutValues.map((v, i) => (
            <div
              key={i}
              className="gsap-reveal"
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                padding: '44px 36px', transition: 'border-color .4s, transform .4s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
            >
              <p className="display-italic" style={{ fontSize: 42, color: 'var(--shadow-num)', lineHeight: 1, marginBottom: 20 }}>0{i + 1}</p>
              <h3 className="display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 14, letterSpacing: 0 }}>{v.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--text-muted)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '96px 5vw', maxWidth: 820, margin: '0 auto' }}>
        <div className="gsap-reveal" style={{ marginBottom: 56 }}>
          <p className="label" style={{ marginBottom: 12 }}>{ui.aboutTimelineLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
            <em className="display-italic">Timeline</em>
          </h2>
        </div>
        {timeline.map((item, i) => (
          <div
            key={i}
            className="gsap-reveal"
            style={{ display: 'flex', gap: 28 }}
          >
            <div style={{ textAlign: 'right', minWidth: 52, paddingTop: 2 }}>
              <span className="display-italic" style={{ fontSize: 15, color: 'var(--text-faint)' }}>{item.year}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 1, height: 6, background: 'var(--border)' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', border: '1px solid var(--border-hover)', background: 'var(--bg)', flexShrink: 0 }} />
              <div style={{ width: 1, flex: 1, background: i < timeline.length - 1 ? 'var(--border)' : 'transparent', minHeight: 36 }} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.85, paddingBottom: 24, paddingTop: 1 }}>{item.event}</p>
          </div>
        ))}
      </section>

      {/* Gear */}
      <section className="section-dark" style={{ padding: '80px 5vw' }}>
        <div className="gsap-reveal" style={{ marginBottom: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>{ui.aboutGearLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--text)' }}>
            {ui.aboutGearTitle} <em className="display-italic">{ui.aboutGearTitleEm}</em>
          </h2>
        </div>
        <div className="grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, maxWidth: 960 }}>
          {gear.map((g, i) => (
            <div
              key={i}
              className="gsap-reveal"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '32px 28px' }}
            >
              <p className="label" style={{ fontSize: 9, marginBottom: 18 }}>{g.cat}</p>
              {g.items.map((it, ii) => (
                <p key={ii} style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '1px' }}>{it}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
