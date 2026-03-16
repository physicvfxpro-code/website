import { useEffect, useCallback } from 'react'

export default function PhotoLightbox({ src, alt, onClose, onPrev, onNext, hasNext, hasPrev }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight' && hasNext) onNext()
    if (e.key === 'ArrowLeft' && hasPrev) onPrev()
  }, [onClose, onNext, onPrev, hasNext, hasPrev])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center"
      onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/96 backdrop-blur-xl" />

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain shadow-2xl select-none"
          style={{ userDrag: 'none' }}
          onError={e => {
            e.target.src = `https://placehold.co/1200x800/0d0d18/4c54ea?text=${encodeURIComponent(alt)}`
          }}
        />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center
          bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Fermer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center
            bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center
            bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Caption */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono uppercase tracking-widest">
        {alt}
      </div>
    </div>
  )
}
