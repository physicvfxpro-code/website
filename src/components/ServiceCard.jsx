import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

const ICONS = {
  camera: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  brand: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  event: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
}

export default function ServiceCard({ service }) {
  const { t } = useTranslation()
  const lang = i18n.language
  const title = lang === 'fr' ? service.titleFr : service.title
  const desc = lang === 'fr' ? service.descriptionFr : service.description
  return (
    <article
      className="group flex flex-col h-full p-8 transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
    >
      {/* Icon */}
      <div className="w-11 h-11 flex items-center justify-center mb-6 border transition-all duration-300"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        ref={el => {
          if (!el) return
          const parent = el.closest('article')
          parent?.addEventListener('mouseenter', () => {
            el.style.borderColor = 'var(--color-accent)'
            el.style.color = 'var(--color-accent-text)'
            el.style.backgroundColor = 'var(--color-accent)' + '18'
          })
          parent?.addEventListener('mouseleave', () => {
            el.style.borderColor = 'var(--color-border)'
            el.style.color = 'var(--color-text-muted)'
            el.style.backgroundColor = 'transparent'
          })
        }}>
        {ICONS[service.icon]}
      </div>

      <h3 className="font-display font-bold text-xl leading-tight mb-3"
        style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-6 flex-1"
        style={{ color: 'var(--color-text-muted)' }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />

      <div className="flex items-end justify-between pt-5 border-t mt-auto"
        style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('services.starting')}
          </p>
          <p className="font-display font-black text-3xl tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}>
            {service.price}€
          </p>
        </div>
        <Link to="/contact"
          className="text-[11px] font-body font-bold uppercase tracking-widest px-5 py-2.5 border transition-all duration-250"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-text-muted)'
          }}>
          {t('services.contact_cta')}
        </Link>
      </div>
    </article>
  )
}
