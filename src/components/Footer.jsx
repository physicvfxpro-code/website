import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const links = [
    ['/', t('nav.home')],
    ['/portfolio', t('nav.portfolio')],
    ['/shop', t('nav.shop')],
    ['/services', t('nav.services')],
    ['/tools', t('nav.tools')],
    ['/contact', t('nav.contact')],
  ]

  return (
    <footer style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <Link to="/" className="inline-flex items-center mb-4">
              <span className="font-display font-black text-2xl tracking-[-0.04em]"
                style={{ color: 'var(--color-text-primary)' }}>CREATIVE</span>
              <span className="font-display font-black text-2xl"
                style={{ color: 'var(--color-accent)' }}>.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: 'https://instagram.com', label: 'Instagram',
                  icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>
                },
                {
                  href: 'https://youtube.com', label: 'YouTube',
                  icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></>
                },
                {
                  href: 'https://linkedin.com', label: 'LinkedIn',
                  icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border transition-all duration-300"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent-text)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-text-primary)' }}>
              {t('footer.links')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm transition-colors duration-250"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-text-primary)' }}>
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm"
                style={{ color: 'var(--color-text-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:khylian.griffon-nicolas@hotmail.com"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                  khylian.griffon-nicolas@hotmail.com

                </a>
              </li>
              <li className="flex items-center gap-3 text-sm"
                style={{ color: 'var(--color-text-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Normandie, France
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t text-xs"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
          <span>© {year} Khylian Griffon-Nicolas - all rights reserved</span>
          <div className="flex gap-5">


            <Link to="/legal" onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
              style={{ color: 'var(--color-text-muted)' }} className="transition-colors">
              {t('footer.legal')}
            </Link>


            <Link to="/privacy" onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
              style={{ color: 'var(--color-text-muted)' }} className="transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
