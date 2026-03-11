import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { NAV_LINKS } from '../data/content.js'

export default function Navbar({ page, navigate, scrolled }) {
  const { lang, toggleLang, theme, toggleTheme } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = NAV_LINKS[lang]

  const go = (id) => {
    navigate(id)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── TOP BAR ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
          padding: scrolled ? '16px 5vw' : '26px 5vw',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'padding .4s, background .45s, border-color .45s',
          background: scrolled ? 'var(--overlay)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => go('home')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <span style={{
            fontFamily: "'MuseoSans', sans-serif",
            fontWeight: 700,
            fontSize: '22px',
            color: 'var(--text)',
            letterSpacing: '1px',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Physic<span style={{ fontWeight: 300, opacity: 0.5 }}>.VFX</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {links.slice(1).map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="hide-mobile"
              style={{
                background: 'none', border: 'none', padding: '2px 0', cursor: 'pointer',
                fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: '10px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: page === l.id ? 'var(--text)' : 'var(--text-muted)',
                borderBottom: page === l.id ? '1px solid var(--text)' : '1px solid transparent',
                transition: 'color .3s, border-color .3s',
              }}
              onMouseEnter={(e) => { if (page !== l.id) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { if (page !== l.id) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {l.label}
            </button>
          ))}

          {/* Language toggle */}
          <button className="toggle-btn hide-mobile" onClick={toggleLang}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Theme toggle */}
          <button className="toggle-btn hide-mobile" onClick={toggleTheme}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          style={{ marginLeft: '20px' }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── FULLSCREEN OVERLAY MENU ── */}
      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        {/* Close button */}
        <div style={{ position: 'absolute', top: '26px', right: '5vw' }}>
          <button
            className="hamburger is-open"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`menu-link ${page === l.id ? 'active' : ''}`}
              style={{
                animation: menuOpen
                  ? `menuItemIn 0.5s ease ${i * 0.07}s both`
                  : 'none',
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Bottom controls */}
        <div style={{
          position: 'absolute', bottom: '40px', left: '8vw',
          display: 'flex', gap: '16px', alignItems: 'center',
        }}>
          {['Instagram', 'TikTok', 'YouTube'].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'MuseoSans', sans-serif", fontWeight: 300,
                fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-faint)', cursor: 'pointer', transition: 'color .3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              {s}
            </span>
          ))}
          <span style={{ color: 'var(--border-mid)', margin: '0 4px' }}>|</span>
          <button className="toggle-btn" onClick={toggleLang}>{lang === 'fr' ? 'EN' : 'FR'}</button>
          <button className="toggle-btn" onClick={toggleTheme}>{theme === 'dark' ? '☀' : '☾'}</button>
        </div>

        {/* Contact info */}
        <div style={{ position: 'absolute', bottom: '40px', right: '8vw', textAlign: 'right' }}>
          <p style={{ fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: '12px', color: 'var(--text-faint)', lineHeight: 2 }}>
            contact@physic-vfx.com<br />
            @physic.vfx
          </p>
        </div>
      </div>
    </>
  )
}
