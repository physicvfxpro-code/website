import { useState, useRef, useLayoutEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { SERVICES, PROCESS_STEPS, FAQ, UI, t } from '../data/content.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: "'MuseoSans', sans-serif", fontSize: 19, color: 'var(--text)', fontWeight: 500 }}>{q}</span>
        <span style={{
          color: 'var(--text-muted)', fontSize: 22,
          transition: 'transform 0.3s, color 0.3s',
          transform: open ? 'rotate(45deg)' : 'none',
          flexShrink: 0, marginLeft: 20,
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.45s ease' }}>
        <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--text-muted)', paddingBottom: 22 }}>{a}</p>
      </div>
    </div>
  )
}

export default function Services({ navigate }) {
  const { lang } = useApp()
  const ui = UI[lang]
  const [openSvc, setOpenSvc] = useState(null)
  const processSteps = PROCESS_STEPS[lang]
  const faq = FAQ[lang]
  const mainRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image parallax
      const heroImg = mainRef.current.querySelector('.svc-hero-img')
      if (heroImg) {
        gsap.fromTo(heroImg, { y: 0 }, {
          y: 60, ease: 'none',
          scrollTrigger: { trigger: heroImg.closest('div'), start: 'top top', end: 'bottom top', scrub: true },
        })
      }
      // Reveal all gsap-reveal elements
      const els = mainRef.current.querySelectorAll('.gsap-reveal')
      els.forEach((el, i) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }, mainRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} style={{ paddingTop: 110 }}>

      {/* Hero banner */}
      <div style={{ position: 'relative', height: '52vh', overflow: 'hidden' }}>
        <img
          className="svc-hero-img"
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80"
          alt=""
          style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.28) saturate(0.5)', willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 40%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 5vw 60px' }}>
          <p className="label" style={{ marginBottom: 14, color: 'rgba(255,255,255,0.45)' }}>{ui.svcLabel}</p>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: '#f0ece6', lineHeight: 0.92 }}>
            {ui.svcTitle} <em className="display-italic">{ui.svcTitleEm}</em>
          </h1>
        </div>
      </div>

      {/* Services accordion list */}
      <div style={{ padding: '80px 5vw', maxWidth: 1200, margin: '0 auto' }}>
        {SERVICES.map((s, i) => {
          const title = t(s.title, lang)
          const sub = t(s.sub, lang)
          const desc = t(s.desc, lang)
          const price = t(s.price, lang)
          const items = t(s.items, lang)
          return (
            <div
              key={i}
              className="service-row gsap-reveal"
              onClick={() => setOpenSvc(openSvc === i ? null : i)}
            >
              {/* Row header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4vw', flexWrap: 'wrap' }}>
                <span className="display-italic" style={{ fontSize: 12, color: 'var(--text-faint)', minWidth: 28 }}>{s.num}</span>
                <span className="display" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', color: 'var(--text)', minWidth: 200 }}>{title}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', flex: 1, minWidth: 160, fontStyle: 'italic' }}>{sub}</span>
                <span style={{ fontSize: 12, letterSpacing: '2px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 300 }}>{price}</span>
                <span style={{
                  color: 'var(--text-faint)', fontSize: 22,
                  transition: 'transform 0.35s, color 0.3s',
                  transform: openSvc === i ? 'rotate(45deg)' : 'none',
                  flexShrink: 0,
                }}>+</span>
              </div>

              {/* Expandable detail */}
              <div style={{ maxHeight: openSvc === i ? 320 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingTop: 28, paddingBottom: 8, paddingLeft: 'calc(28px + 4vw)' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: 24, maxWidth: 640 }}>{desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 40px', marginBottom: 28 }}>
                    {items.map((it, ii) => (
                      <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 18, height: 1, background: 'var(--border-hover)', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, letterSpacing: '1px', color: 'var(--text-muted)' }}>{it}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-sm"
                    onClick={(e) => { e.stopPropagation(); navigate('contact', { service: title }) }}
                  >
                    {ui.bookService}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Process steps */}
      <div className="section-dark" style={{ padding: '90px 5vw' }}>
        <div
          className="gsap-reveal"
          style={{ textAlign: 'center', marginBottom: 68 }}
        >
          <p className="label" style={{ marginBottom: 12 }}>{ui.processLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
            {ui.processTitle} <em className="display-italic">{ui.processTitleEm}</em>
          </h2>
        </div>
        <div className="grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {processSteps.map((step, i) => (
            <div
              key={i}
              className="gsap-reveal"
              style={{ textAlign: 'center' }}
            >
              <p className="display-italic" style={{ fontSize: 48, color: 'var(--shadow-num)', lineHeight: 1, marginBottom: 20 }}>{step.num}</p>
              <div style={{ width: 1, height: 30, background: 'var(--border-mid)', margin: '0 auto 20px' }} />
              <p className="display" style={{ fontSize: 20, color: 'var(--text)', marginBottom: 10 }}>{step.title}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.75 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '90px 5vw', maxWidth: 800, margin: '0 auto' }}>
        <div
          className="gsap-reveal"
          style={{ marginBottom: 56 }}
        >
          <p className="label" style={{ marginBottom: 12 }}>{ui.faqLabel}</p>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--text)' }}>
            <em className="display-italic">FAQ</em>
          </h2>
        </div>
        {faq.map((item, i) => (
          <FaqItem key={i} q={item.q} a={item.a} />
        ))}
      </div>

      {/* CTA */}
      <div className="section-dark" style={{ padding: '90px 5vw', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: 'clamp(30px, 4vw, 54px)', color: 'var(--text)', marginBottom: 36 }}>
          {ui.ctaServicesTitle} <em className="display-italic">{ui.ctaServicesTitleEm}</em>
        </h2>
        <button className="btn btn-solid" onClick={() => navigate('contact')}>{ui.ctaServicesBtn}</button>
      </div>

    </div>
  )
}
