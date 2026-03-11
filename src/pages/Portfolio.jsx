import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { PORTFOLIO_ITEMS, PORTFOLIO_CATS, t } from '../data/content.js'
import { UI } from '../data/content.js'

export default function Portfolio() {
  const { lang } = useApp()
  const ui = UI[lang]
  const cats = PORTFOLIO_CATS[lang]
  const [cat, setCat] = useState(cats[0])
  const [lightboxItem, setLightboxItem] = useState(null)
  const [vis, setVis] = useState({})
  const [unmutedId, setUnmutedId] = useState(null)
  const refs = useRef({})
  const videoRefs = useRef({})

  // Reset filter when language changes
  useEffect(() => {
    setCat(PORTFOLIO_CATS[lang][0])
  }, [lang])

  // Memoize filtered list to prevent infinite re-render loop
  const filtered = useMemo(() => {
    if (cat === cats[0]) return PORTFOLIO_ITEMS
    return PORTFOLIO_ITEMS.filter((p) => t(p.cat, lang) === cat)
  }, [cat, cats, lang])

  useEffect(() => {
    setVis({})
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVis((v) => ({ ...v, [e.target.dataset.k]: true })) }),
      { threshold: 0.08 }
    )
    Object.values(refs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  // Toggle sound: only one video plays sound at a time
  const toggleSound = useCallback((id) => {
    setUnmutedId((prev) => {
      const newId = prev === id ? null : id
      // Mute all, then unmute the target
      Object.entries(videoRefs.current).forEach(([vid, el]) => {
        if (el) el.muted = Number(vid) !== newId
      })
      return newId
    })
  }, [])

  return (
    <div className="page-enter" style={{ paddingTop: 110 }}>

      {/* Header */}
      <div style={{ padding: '48px 5vw 56px', borderBottom: '1px solid var(--border)' }}>
        <p className="label" style={{ marginBottom: 14 }}>{ui.portfolioLabel}</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--text)', lineHeight: 0.92 }}>
            {ui.portfolioTitle1}<br /><em className="display-italic">{ui.portfolioTitle2}</em>
          </h1>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', paddingBottom: 4 }}>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: 10,
                  letterSpacing: '3px', textTransform: 'uppercase',
                  padding: '8px 18px', background: 'transparent', cursor: 'pointer',
                  border: `1px solid ${c === cat ? 'var(--border-strong)' : 'var(--border-mid)'}`,
                  color: c === cat ? 'var(--text)' : 'var(--text-muted)',
                  transition: 'all .3s',
                }}
                onMouseEnter={(e) => { if (c !== cat) e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={(e) => { if (c !== cat) e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Media grid */}
      <div className="photo-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: 2 }}>
        {filtered.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => { refs.current[p.id] = el }}
            data-k={p.id}
            className={`photo-card fade-in ${vis[p.id] ? 'visible' : ''}`}
            style={{
              height: p.tall ? '56vh' : i % 7 === 2 ? '44vh' : '36vh',
              cursor: 'pointer',
              transitionDelay: `${(i % 3) * 0.06}s`,
            }}
            onClick={() => setLightboxItem(p)}
          >
            {p.type === 'video' ? (
              <>
                <video
                  ref={(el) => { videoRefs.current[p.id] = el }}
                  src={p.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--img-filter)' }}
                />
                {/* Sound toggle badge */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSound(p.id) }}
                  style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 3,
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)',
                    color: unmutedId === p.id ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontSize: 14, cursor: 'pointer',
                    transition: 'all .3s', borderRadius: 0,
                  }}
                  title={unmutedId === p.id ? 'Mute' : 'Unmute'}
                >
                  {unmutedId === p.id ? '🔊' : '🔇'}
                </button>
                {/* Video badge */}
                <span style={{
                  position: 'absolute', top: 12, left: 12, zIndex: 3,
                  padding: '3px 8px',
                  fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'MuseoSans', sans-serif", fontWeight: 300,
                }}>▶ VIDEO</span>
              </>
            ) : (
              <img src={p.src} alt={t(p.title, lang)} loading="lazy" />
            )}
            <div className="photo-caption">
              <p className="label" style={{ fontSize: 9, marginBottom: 6 }}>{t(p.cat, lang)}</p>
              <p className="display" style={{ fontSize: 22, color: '#f0ece6' }}>{t(p.title, lang)}</p>
            </div>
          </div>
        ))}
      </div>

      {lightboxItem && (
        <Lightbox item={lightboxItem} items={filtered} onClose={() => setLightboxItem(null)} lang={lang} />
      )}
    </div>
  )
}
