import { useApp } from '../context/AppContext.jsx'
import { NAV_LINKS, SERVICES, CONTACT_INFO, UI, t } from '../data/content.js'

export default function Footer({ navigate }) {
  const { lang } = useApp()
  const ui = UI[lang]
  const links = NAV_LINKS[lang]
  const contactInfo = CONTACT_INFO[lang]

  const serviceLinks = SERVICES.map((s) => ({
    label: t(s.title, lang),
    action: () => navigate('services'),
  }))

  const cols = [
    {
      heading: ui.footerNav,
      links: links.map((l) => ({ label: l.label, action: () => navigate(l.id) })),
    },
    {
      heading: ui.footerServices,
      links: serviceLinks,
    },
    {
      heading: ui.footerContact,
      links: contactInfo.map((c) => ({ label: c.value, action: null })),
    },
  ]

  return (
    <footer style={{ background: 'var(--bg-footer)', borderTop: '1px solid var(--border)', padding: '80px 5vw 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '48px',
          paddingBottom: '60px',
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Brand col */}
          <div>
            <button
              onClick={() => navigate('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span style={{
                fontFamily: "'MuseoSans', sans-serif", fontWeight: 700,
                fontSize: '28px', color: 'var(--text)', display: 'block', marginBottom: '18px',
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>
                Physic<span style={{ fontWeight: 300, opacity: 0.5 }}>.VFX</span>
              </span>
            </button>
            <p style={{ fontSize: '12px', lineHeight: 1.9, color: 'var(--text-faint)', maxWidth: 220, marginBottom: '28px' }}>
              {ui.footerDesc}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['IG', 'TK', 'YT'].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 34, height: 34, border: '1px solid var(--border-mid)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', letterSpacing: '1px', color: 'var(--text-faint)',
                    cursor: 'pointer', transition: 'all .3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.color = 'var(--text)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-faint)' }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="label" style={{ marginBottom: '22px', fontSize: '9px' }}>{col.heading}</p>
              {col.links.map((l, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '12px', fontWeight: 300, letterSpacing: '1px',
                    color: 'var(--text-faint)', marginBottom: '12px',
                    cursor: l.action ? 'pointer' : 'default',
                    transition: 'color .3s',
                  }}
                  onClick={l.action}
                  onMouseEnter={(e) => l.action && (e.currentTarget.style.color = 'var(--text-muted)')}
                  onMouseLeave={(e) => l.action && (e.currentTarget.style.color = 'var(--text-faint)')}
                >
                  {l.label}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '28px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-faint)' }}>
            {ui.footerCopyright}
          </p>
          <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-faint)', display: 'flex', gap: '6px' }}>
            <span
              style={{ cursor: 'pointer', transition: 'color .3s' }}
              onClick={() => navigate('legal')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
            >
              {lang === 'fr' ? 'Mentions légales' : 'Legal notice'}
            </span>
            <span>·</span>
            <span
              style={{ cursor: 'pointer', transition: 'color .3s' }}
              onClick={() => navigate('privacy')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
            >
              {lang === 'fr' ? 'Confidentialité' : 'Privacy'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
