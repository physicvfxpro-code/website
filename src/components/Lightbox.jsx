import { useState, useRef, useEffect } from 'react'
import { t } from '../data/content.js'

export default function Lightbox({ item, items, onClose, lang = 'fr' }) {
  const [cur, setCur] = useState(() => items.findIndex((i) => i.id === item?.id))
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  if (!item) return null

  const media = items[cur]
  const hasPrev = cur > 0
  const hasNext = cur < items.length - 1
  const isVideo = media.type === 'video'

  const btnStyle = {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(232,228,222,0.6)',
    width: 44, height: 44,
    fontSize: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color .3s, color .3s',
  }

  const changeCur = (next) => {
    setCur(next)
    setMuted(true)
  }

  return (
    <div className="lightbox" onClick={onClose}>
      {/* Prev */}
      <button
        style={{ ...btnStyle, position: 'absolute', left: 28, opacity: hasPrev ? 1 : 0.2 }}
        onClick={(e) => { e.stopPropagation(); if (hasPrev) changeCur(cur - 1) }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e8e4de'; e.currentTarget.style.color = '#e8e4de' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(232,228,222,0.6)' }}
      >‹</button>

      {/* Media */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '88vw', maxHeight: '90vh' }}>
        {isVideo ? (
          <video
            key={media.id}
            ref={videoRef}
            src={media.src}
            autoPlay
            loop
            muted={muted}
            playsInline
            style={{ maxWidth: '88vw', maxHeight: '84vh', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <img
            src={media.src}
            alt={media.title}
            style={{ maxWidth: '88vw', maxHeight: '84vh', objectFit: 'contain', display: 'block' }}
          />
        )}

        {/* Sound toggle for video */}
        {isVideo && (
          <button
            onClick={() => {
              setMuted((m) => !m)
              if (videoRef.current) videoRef.current.muted = !videoRef.current.muted
            }}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)',
              color: muted ? 'rgba(255,255,255,0.5)' : '#fff',
              fontSize: 16, cursor: 'pointer', transition: 'all .3s',
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        )}

        {/* Caption */}
        <div style={{
          position: 'absolute', bottom: -46, left: 0,
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <span className="label" style={{ fontSize: 9 }}>{t(media.cat, lang)}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ fontFamily: "'MuseoSans', sans-serif", fontSize: 18, color: '#e8e4de', fontWeight: 500 }}>{t(media.title, lang)}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span className="label" style={{ fontSize: 9 }}>{cur + 1} / {items.length}</span>
          {isVideo && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>▶ VIDEO</span>}
        </div>
      </div>

      {/* Next */}
      <button
        style={{ ...btnStyle, position: 'absolute', right: 28, opacity: hasNext ? 1 : 0.2 }}
        onClick={(e) => { e.stopPropagation(); if (hasNext) changeCur(cur + 1) }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e8e4de'; e.currentTarget.style.color = '#e8e4de' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(232,228,222,0.6)' }}
      >›</button>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 24, right: 36,
          background: 'none', border: 'none',
          color: 'rgba(255,255,255,0.35)', fontSize: 30,
          cursor: 'pointer', lineHeight: 1,
          transition: 'color .3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e4de')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
      >×</button>
    </div>
  )
}
