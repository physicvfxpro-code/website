import { useState, useRef, useEffect } from 'react'

export default function AmbientSound() {
  const [playing, setPlaying] = useState(false)
  const [hover, setHover] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}media/audio/ambient.mp3`)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
<button
  onClick={toggle}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
  style={{
    position: 'fixed',
    bottom: 28,
    left: 28,
    zIndex: 350,
    width: 42,
    height: 42,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: hover ? 'var(--accent)' : 'rgba(0,0,0,0.5)',
    border: '1px solid var(--border-mid)',
    color: hover ? 'var(--accent-inv)' : playing ? 'var(--text)' : 'var(--text-faint)',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all .3s',
    backdropFilter: 'blur(8px)',
  }}
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      )}
    </button>
  )
}

