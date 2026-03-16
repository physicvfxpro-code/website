import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { useMusic } from '../context/MusicContext'
import i18n from '../i18n'

export default function Navbar() {
  const { t } = useTranslation()
  const { setShowPanel: setThemePanel } = useTheme()
  const { isPlaying, togglePlay, setShowPanel: setMusicPanel } = useMusic()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const lang = i18n.language

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/services', label: t('nav.services') },
    { to: '/tools', label: t('nav.tools') },
    { to: '/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const switchLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  // Toujours dark — indépendant du thème et du scroll
  const textCol = 'rgba(255,255,255,0.65)'
  const textHover = '#ffffff'
  const navBg = scrolled ? 'rgba(15,17,23,0.96)' : 'transparent'
  const navBorder = scrolled ? 'rgba(31,33,51,0.8)' : 'transparent'

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-[60] transition-all duration-500"
        style={{
          backgroundColor: navBg,
          borderBottom: `1px solid ${navBorder}`,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          paddingTop: scrolled ? '10px' : '18px',
          paddingBottom: scrolled ? '10px' : '18px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

          <Link to="/" className="flex items-center group shrink-0">
            <span
              className="font-display font-black text-xl tracking-[-0.04em] transition-colors duration-300"
              style={{ color: '#ffffff' }}
            >
              PHYSIC
            </span>
            <span
              className="font-display font-black text-xl transition-transform duration-300 group-hover:rotate-12 inline-block"
              style={{ color: 'var(--color-accent)' }}
            >.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="relative px-3.5 py-2 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-accent-text)' : textCol,
                })}
                onMouseEnter={e => e.currentTarget.style.color = textHover}
                onMouseLeave={e => {
                  const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
                  e.currentTarget.style.color = isActive ? 'var(--color-accent-text)' : textCol
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {/* Lang */}
            <button
              onClick={switchLang}
              className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 border transition-all duration-250 hover:scale-105"
              style={{
                color: textCol,
                borderColor: 'rgba(255,255,255,0.15)',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.color = 'var(--color-accent-text)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.color = textCol }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <button
              onClick={() => setThemePanel(true)}
              title="Thème"
              className="w-9 h-9 flex items-center justify-center transition-all duration-250 hover:scale-110"
              style={{ color: textCol }}
              onMouseEnter={e => e.target.style.color = 'var(--color-accent-text)'}
              onMouseLeave={e => e.target.style.color = textCol}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>

            <button
              onClick={() => setMusicPanel(true)}
              title="Musique"
              className="w-9 h-9 flex items-center justify-center transition-all duration-250 hover:scale-110 relative"
              style={{ color: isPlaying ? 'var(--color-accent-text)' : textCol }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent-text)'}
              onMouseLeave={e => e.currentTarget.style.color = isPlaying ? 'var(--color-accent-text)' : textCol}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              )}
              {isPlaying && (
                <span
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              )}
            </button>

            <Link
              to="/contact"
              className="ml-2 px-5 py-2.5 text-[11px] font-body font-bold uppercase tracking-widest transition-all duration-300"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {t('nav.contact')}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            style={{ color: '#ffffff', position: 'relative', zIndex: 60 }}
          >
            <span className={`block w-6 h-[1.5px] bg-current origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>

        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0" style={{ backgroundColor: '#07070e' }} />

        <div
          className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: 'var(--color-accent)', opacity: 0.12 }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between px-8 pt-28 pb-10">
          <nav className="flex flex-col gap-1">
            {links.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="flex items-center gap-4 py-3.5 border-b transition-all duration-300"
                style={{
                  borderColor: 'rgba(255,255,255,0.06)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.4s ease ${i * 55}ms, transform 0.4s ease ${i * 55}ms`,
                }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={e => e.currentTarget.querySelector('.menu-label').style.color = 'var(--color-accent-text)'}
                onMouseLeave={e => e.currentTarget.querySelector('.menu-label').style.color = 'rgba(255,255,255,0.85)'}
              >
                <span className="font-mono text-xs w-5 shrink-0" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
                  0{i + 1}
                </span>
                <span
                  className="menu-label font-display font-black text-3xl tracking-tight transition-colors duration-250"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div
            className="flex items-center gap-3 pt-6"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.4s ease 380ms, transform 0.4s ease 380ms',
            }}
          >
            <button
              onClick={switchLang}
              className="text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 border text-white/60 hover:text-white transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={() => { setMenuOpen(false); setThemePanel(true) }}
              className="w-10 h-10 flex items-center justify-center border text-white/50 hover:text-white transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M12 2v2M12 20v2" />
              </svg>
            </button>
            <button
              onClick={() => { setMenuOpen(false); setMusicPanel(true) }}
              className="w-10 h-10 flex items-center justify-center border text-white/50 hover:text-white transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}