import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLangOptions } from '../hooks/useLangOptions'
import { useTranslation } from 'react-i18next'

const ACCENTS = [
  { label: 'Indigo', accent: '#4c54ea', text: '#8098fb' },
  { label: 'Violet', accent: '#7c3aed', text: '#a78bfa' },
  { label: 'Rose', accent: '#e11d48', text: '#fb7185' },
  { label: 'Emerald', accent: '#059669', text: '#34d399' },
  { label: 'Orange', accent: '#ea580c', text: '#fb923c' },
  { label: 'Cyan', accent: '#0891b2', text: '#22d3ee' },
  { label: 'Gold', accent: '#d97706', text: '#fbbf24' },
  { label: 'Blanc', accent: '#9ca3af', text: '#e5e7eb' },
]

function ColorRow({ label, propKey }) {
  const { prefs, setProp } = useTheme()
  const value = prefs[propKey] ?? '#ffffff'
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b"
      style={{ borderColor: 'var(--color-border)' }}>
      <span className="text-[11px] font-mono uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7 border cursor-pointer overflow-hidden"
          style={{ backgroundColor: value, borderColor: 'var(--color-border)' }}>
          <input type="color" value={value}
            onChange={e => setProp(propKey, e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-[10px] font-mono w-[58px] text-right"
          style={{ color: 'var(--color-text-muted)' }}>
          {value.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default function ThemePanel() {
  const { prefs, setMode, setProp, showPanel, setShowPanel, resetDefaults } = useTheme()
  const { t } = useTranslation()
  const panelRef = useRef(null)
  const { lang, setLang, options } = useLangOptions()

  // Ferme au clic extérieur
  useEffect(() => {
    if (!showPanel) return
    const close = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setShowPanel(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [showPanel, setShowPanel])

  // Ferme à Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowPanel(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setShowPanel])

  // Bloque le scroll du body pendant que le panel est ouvert
  useEffect(() => {
    if (!showPanel) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [showPanel])

  if (!showPanel) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-end">
      {/* Overlay visuel : pointer-events none pour ne pas capturer le scroll du panel */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ pointerEvents: 'none' }} />

      {/* Zone de clic pour fermer — derrière le panel */}
      <div className="absolute inset-0" onClick={() => setShowPanel(false)} />

      <div
        ref={panelRef}
        className="relative z-10 h-full w-[300px] overflow-y-auto flex flex-col shadow-2xl slide-in-left"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderLeft: '1px solid var(--color-border)',
          // Isole le scroll : empêche la propagation vers le body
          overscrollBehavior: 'contain',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 z-10"
          style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--color-accent-text)' }}>
              {t('theme.title')}
            </p>
            <h2 className="font-display font-bold text-xl"
              style={{ color: 'var(--color-text-primary)' }}>
              {t('theme.subtitle')}
            </h2>
          </div>
          <button onClick={() => setShowPanel(false)}
            className="w-9 h-9 flex items-center justify-center hover:opacity-50 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-7">

          {/* Light / Dark toggle */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-muted)' }}>Mode</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'light', label: '☀ Clair' },
                { id: 'dark', label: '☾ Sombre' },
              ].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className="py-3 text-[11px] font-mono uppercase tracking-widest font-bold border transition-all duration-200"
                  style={{
                    backgroundColor: prefs.mode === m.id ? 'var(--color-accent)' : 'transparent',
                    color: prefs.mode === m.id ? '#fff' : 'var(--color-text-muted)',
                    borderColor: prefs.mode === m.id ? 'var(--color-accent)' : 'var(--color-border)',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accent presets */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('theme.accent')}
            </p>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map(p => (
                <button key={p.label} title={p.label}
                  onClick={() => { setProp('accent', p.accent); setProp('accentText', p.text) }}
                  className="w-8 h-8 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: p.accent,
                    border: `2px solid ${prefs.accent === p.accent ? '#fff' : 'transparent'}`,
                    borderRadius: '2px',
                    boxShadow: prefs.accent === p.accent ? '0 0 0 1px ' + p.accent : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Granular color pickers */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-1"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('theme.detailed')}
            </p>
            <ColorRow label={t('theme.labelMainAccent')} propKey="bgPrimary" />
            <ColorRow label={t('theme.labelSecondaryAccent')} propKey="bgSecondary" />
            <ColorRow label={t('theme.labelCardAccent')} propKey="bgCard" />
            <ColorRow label={t('theme.labelPrimaryText')} propKey="textPrimary" />
            <ColorRow label={t('theme.labelMutedText')} propKey="textMuted" />
            <ColorRow label={t('theme.labelAccent')} propKey="accent" />
            <ColorRow label={t('theme.labelAccentText')} propKey="accentText" />
            <ColorRow label={t('theme.labelBorder')} propKey="border" />
          </div>

          {/* Reset */}
          <button onClick={resetDefaults}
            className="w-full py-3 text-[11px] font-mono uppercase tracking-widest font-bold border transition-opacity hover:opacity-60"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}