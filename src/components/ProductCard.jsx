import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

export default function ProductCard({ pack }) {
  const { t } = useTranslation()
  const lang  = i18n.language
  const title = lang === 'fr' ? pack.titleFr : pack.title
  const desc  = lang === 'fr' ? pack.descriptionFr : pack.description

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = pack.file
    a.download = pack.file.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <article
      className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-accent)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={pack.image} alt={title} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
          onError={e => {
            e.target.src = `https://placehold.co/800x450/0d0d18/4c54ea?text=${encodeURIComponent(title)}`
          }}
        />
        {/* Free badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}>
          {t('shop.free')}
        </div>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur-sm">
          {pack.items} {t('shop.items')}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-lg leading-tight mb-2"
          style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-4 line-clamp-2"
          style={{ color: 'var(--color-text-muted)' }}>
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pack.tags.map(tag => (
            <span key={tag}
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-1"
              style={{
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Download btn */}
        <button onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 text-[11px] font-body font-bold uppercase tracking-widest transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-text-primary)',
            color: 'var(--color-bg-primary)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-text-primary)'
            e.currentTarget.style.color = 'var(--color-bg-primary)'
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {t('shop.download')}
        </button>
      </div>
    </article>
  )
}
