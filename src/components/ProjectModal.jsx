import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation()
  const lang = i18n.language

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null
  const title = lang === 'fr' ? project.titleFr : project.title
  const desc  = lang === 'fr' ? project.descriptionFr : project.description

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"/>
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
        style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Hero */}
        <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
          <img src={project.image} alt={title}
            className="w-full h-full object-cover"
            onError={e => {
              e.target.src = `https://placehold.co/1200x675/0d0d18/4c54ea?text=${encodeURIComponent(title)}`
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag}
                className="text-[10px] font-mono uppercase tracking-wider px-3 py-1"
                style={{ color: 'var(--color-accent-text)', backgroundColor: 'var(--color-accent)', opacity: 0.15 }}>
                {/* inline wrapper */}
              </span>
            ))}
            {project.tags.map(tag => (
              <span key={`t-${tag}`}
                className="text-[10px] font-mono uppercase tracking-wider px-3 py-1"
                style={{ color: 'var(--color-accent-text)', border: '1px solid var(--color-accent)', opacity: 0.8 }}>
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4 tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h2>
          <p className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--color-text-muted)' }}>
            {desc}
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t"
            style={{ borderColor: 'var(--color-border)' }}>
            {[
              { label: 'Client', value: project.client },
              { label: lang === 'fr' ? 'Année' : 'Year', value: project.year },
              { label: lang === 'fr' ? 'Type' : 'Category', value: project.category },
            ].map(item => (
              <div key={item.label}>
                <span className="text-[10px] font-mono uppercase tracking-widest block mb-1"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {item.label}
                </span>
                <span className="font-body font-semibold capitalize"
                  style={{ color: 'var(--color-text-primary)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
