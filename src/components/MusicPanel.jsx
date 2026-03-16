import { useEffect, useRef, useCallback } from 'react'
import { useMusic } from '../context/MusicContext'
import { useTranslation } from 'react-i18next'

// Hook générique pour un slider draggable
function useDraggableSlider(onChange) {
  const trackRef = useRef(null)

  const getRatio = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  }, [])

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onChange(getRatio(e))
  }, [onChange, getRatio])

  const onPointerMove = useCallback((e) => {
    if (e.buttons !== 1) return
    onChange(getRatio(e))
  }, [onChange, getRatio])

  return { trackRef, onPointerDown, onPointerMove }
}

export default function MusicPanel() {
  const {
    isPlaying, togglePlay,
    volume, changeVolume,
    currentTrack, switchTrack,
    tracks, showPanel, setShowPanel,
    progress, duration, seek, formatTime,
  } = useMusic()
  const { t } = useTranslation()
  const panelRef = useRef(null)

  const seekSlider = useDraggableSlider(seek)
  const volumeSlider = useDraggableSlider(changeVolume)

  useEffect(() => {
    if (!showPanel) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setShowPanel(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showPanel, setShowPanel])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShowPanel(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setShowPanel])

  if (!showPanel) return null

  const current = tracks.find(tr => tr.id === currentTrack) ?? tracks[0]

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-end p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPanel(false)} />

      <div
        ref={panelRef}
        className="relative z-10 w-[300px] shadow-2xl slide-in-up"
        style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-[3px] h-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i}
                  className="w-[3px] rounded-full transition-all"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    height: isPlaying ? `${[60, 100, 80, 40][i - 1]}%` : '30%',
                    animation: isPlaying ? `musicBar${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                  }}
                />
              ))}
            </div>
            <p className="text-[11px] font-mono uppercase tracking-widest font-bold"
              style={{ color: 'var(--color-text-primary)' }}>
              {t('music.title')}
            </p>
          </div>
          <button onClick={() => setShowPanel(false)}
            className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">

          {/* ── Play + titre ── */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-body font-semibold text-sm truncate"
                style={{ color: 'var(--color-text-primary)' }}>
                {current.label}
              </p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                {isPlaying ? t('music.playing') : t('music.paused')}
              </p>
            </div>
          </div>

          {/* ── Seek bar ── */}
          <div className="flex flex-col gap-1.5">
            <div
              className="seek-track-wrapper"
              ref={seekSlider.trackRef}
              onPointerDown={seekSlider.onPointerDown}
              onPointerMove={seekSlider.onPointerMove}
            >
              <div className="seek-track">
                <div className="seek-fill" style={{ width: `${progress * 100}%` }} />
                {/* calc corrige le dépassement aux extrémités : le centre du thumb reste dans la track */}
                <div className="seek-thumb" style={{ left: `calc(${progress * 100}% * (1 - 13px / 100%))` }} />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                {formatTime(progress * duration)}
              </span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* ── Volume ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}>
                {t('music.volume')}
              </span>
              <span className="text-[11px] font-mono" style={{ color: 'var(--color-accent-text)' }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Icon mute */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              </svg>

              {/* Custom volume slider */}
              <div
                className="volume-track-wrapper flex-1"
                ref={volumeSlider.trackRef}
                onPointerDown={volumeSlider.onPointerDown}
                onPointerMove={volumeSlider.onPointerMove}
              >
                <div className="volume-track">
                  <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
                  <div className="volume-thumb" style={{ left: `calc(${volume * 100}% * (1 - 14px / 100%))` }} />
                </div>
              </div>

              {/* Icon loud */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </div>
          </div>

          {/* ── Pistes ── */}
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider mb-3"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('music.tracks')}
            </p>
            <div className="flex flex-col gap-1">
              {tracks.map(track => (
                <button key={track.id}
                  onClick={() => switchTrack(track.id)}
                  className="flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200"
                  style={{
                    backgroundColor: currentTrack === track.id ? 'var(--color-accent)18' : 'transparent',
                    borderLeft: currentTrack === track.id
                      ? '2px solid var(--color-accent)'
                      : '2px solid transparent',
                  }}>
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {currentTrack === track.id && isPlaying ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                        style={{ color: 'var(--color-accent)' }}>
                        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"
                        style={{ color: currentTrack === track.id ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-body truncate"
                    style={{ color: currentTrack === track.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                    {track.label}
                  </span>
                  <span className="ml-auto text-[10px] font-mono shrink-0"
                    style={{ color: 'var(--color-text-muted)' }}>
                    {t('music.format')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes musicBar1 { from { height: 20% } to { height: 80% } }
        @keyframes musicBar2 { from { height: 60% } to { height: 100% } }
        @keyframes musicBar3 { from { height: 30% } to { height: 70% } }
        @keyframes musicBar4 { from { height: 50% } to { height: 30% } }

        /* ── Seek slider ── */
        .seek-track-wrapper {
          position: relative;
          width: 100%;
          padding: 8px 0;
          cursor: pointer;
          user-select: none;
          touch-action: none;
        }
        .seek-track {
          position: relative;
          width: 100%;
          height: 3px;
          border-radius: 99px;
          background: var(--color-border);
          overflow: visible;
          transition: height 0.15s;
        }
        .seek-fill {
          position: absolute;
          left: 0; top: 0;
          height: 100%;
          border-radius: 99px;
          background: var(--color-accent);
          pointer-events: none;
        }
        .seek-thumb {
          position: absolute;
          top: 50%;
          /* translate(-50%) centre le thumb sur le point, mais on compense déjà via calc dans le style inline */
          transform: translateY(-50%) scale(0);
          width: 13px; height: 13px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent);
          pointer-events: none;
          transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .seek-track-wrapper:hover .seek-track { height: 5px; }
        .seek-track-wrapper:hover .seek-thumb { transform: translateY(-50%) scale(1); }
        .seek-track-wrapper:active .seek-thumb { transform: translateY(-50%) scale(1.1); cursor: grabbing; }

        /* ── Volume slider ── */
        .volume-track-wrapper {
          position: relative;
          padding: 8px 0;
          cursor: pointer;
          user-select: none;
          touch-action: none;
        }
        .volume-track {
          position: relative;
          width: 100%;
          height: 3px;
          border-radius: 99px;
          background: var(--color-border);
          overflow: visible;
          transition: height 0.15s;
        }
        .volume-fill {
          position: absolute;
          left: 0; top: 0;
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 70%, white) 100%);
          pointer-events: none;
        }
        .volume-thumb {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0.8);
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--color-bg-secondary);
          border: 2.5px solid var(--color-accent);
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          pointer-events: none;
          transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s;
        }
        .volume-track-wrapper:hover .volume-track { height: 5px; }
        .volume-track-wrapper:hover .volume-thumb {
          transform: translateY(-50%) scale(1);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent) 20%, transparent), 0 1px 4px rgba(0,0,0,0.25);
        }
        .volume-track-wrapper:active .volume-thumb { transform: translateY(-50%) scale(1.1); cursor: grabbing; }
      `}</style>
    </div>
  )
}