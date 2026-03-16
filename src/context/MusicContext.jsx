import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'

const DEFAULT_TRACKS = [
  { id: 'ambient', label: 'Fireflies', file: './audio/Fireflies.mp3' },
  { id: 'cinematic', label: 'Like a Tattoo', file: './audio/Sade - Like a Tattoo (Audio).mp3' },
  { id: 'electronic', label: 'The Path Less Traveled', file: './audio/Vegyn - The Path Less Traveled.mp3' },
  { id: 'rap', label: 'Mysëlf', file: './audio/Mysëlf [Official Audio].mp3' },
]

function loadMusicPrefs() {
  try {
    const s = localStorage.getItem('musicPrefs')
    if (s) return JSON.parse(s)
  } catch { }
  return { enabled: false, trackId: 'cinematic', volume: 0.35 }
}

const MusicContext = createContext()

export function MusicProvider({ children }) {
  const saved = loadMusicPrefs()
  // isPlaying reflects the *desired* state; actual audio may be blocked by browser
  const [isPlaying, setIsPlaying] = useState(false)
  // pendingPlay: user wanted to play but browser blocked it — resume on first interaction
  const pendingPlay = useRef(saved.enabled ?? false)
  const [volume, setVolume] = useState(saved.volume ?? 0.35)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    () => Math.max(0, DEFAULT_TRACKS.findIndex(t => t.id === (saved.trackId ?? 'cinematic')))
  )
  const [showPanel, setShowPanel] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef(null)
  const rafRef = useRef(null)
  const currentTrackIndexRef = useRef(currentTrackIndex)

  // Keep ref in sync for use inside event handlers
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex
  }, [currentTrackIndex])

  // ── RAF progress loop ────────────────────────────────────────────
  const startProgressLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const tick = () => {
      const a = audioRef.current
      if (a && a.duration && !isNaN(a.duration)) {
        setProgress(a.currentTime / a.duration)
        setDuration(a.duration)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const stopProgressLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Build audio element for a given index ────────────────────────
  const buildAudio = useCallback((index, vol) => {
    const track = DEFAULT_TRACKS[index] ?? DEFAULT_TRACKS[0]
    const audio = new Audio(track.file)
    audio.volume = vol
    return audio
  }, [])

  // ── Go to next track (called on 'ended') ─────────────────────────
  const playNext = useCallback(() => {
    const nextIndex = (currentTrackIndexRef.current + 1) % DEFAULT_TRACKS.length
    currentTrackIndexRef.current = nextIndex
    setCurrentTrackIndex(nextIndex)

    const audio = audioRef.current
    if (audio) { audio.pause(); audio.src = '' }

    const newAudio = buildAudio(nextIndex, audioRef.current?.volume ?? 0.35)
    audioRef.current = newAudio
    setProgress(0)
    setDuration(0)

    newAudio.addEventListener('loadedmetadata', () => setDuration(newAudio.duration))
    newAudio.addEventListener('ended', playNext)

    newAudio.play()
      .then(() => { setIsPlaying(true); startProgressLoop() })
      .catch(() => setIsPlaying(false))
  }, [buildAudio, startProgressLoop])

  // ── Init audio on mount ──────────────────────────────────────────
  useEffect(() => {
    const idx = currentTrackIndexRef.current
    const audio = buildAudio(idx, volume)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', playNext)

    const wantsPlay = pendingPlay.current

    if (wantsPlay) {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          pendingPlay.current = false
          startProgressLoop()
        })
        .catch(() => {
          // Browser blocked autoplay — will resume on first user interaction
          setIsPlaying(false)
        })
    }

    // Resume on first user interaction if blocked
    const resumeOnInteraction = () => {
      if (pendingPlay.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            pendingPlay.current = false
            startProgressLoop()
          })
          .catch(() => { })
        document.removeEventListener('click', resumeOnInteraction)
        document.removeEventListener('keydown', resumeOnInteraction)
      }
    }

    if (wantsPlay) {
      document.addEventListener('click', resumeOnInteraction)
      document.addEventListener('keydown', resumeOnInteraction)
    }

    return () => {
      stopProgressLoop()
      audio.pause()
      audio.src = ''
      document.removeEventListener('click', resumeOnInteraction)
      document.removeEventListener('keydown', resumeOnInteraction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Persist prefs ────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
    localStorage.setItem('musicPrefs', JSON.stringify({
      enabled: isPlaying,
      trackId: DEFAULT_TRACKS[currentTrackIndex]?.id ?? 'cinematic',
      volume,
    }))
  }, [volume, isPlaying, currentTrackIndex])

  // ── Toggle play / pause ──────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      stopProgressLoop()
      pendingPlay.current = false
    } else {
      audio.play()
        .then(() => { setIsPlaying(true); startProgressLoop() })
        .catch(() => { })
    }
  }, [isPlaying, startProgressLoop, stopProgressLoop])

  // ── Switch track by ID ───────────────────────────────────────────
  const switchTrack = useCallback((trackId) => {
    const idx = DEFAULT_TRACKS.findIndex(t => t.id === trackId)
    if (idx === -1) return

    const audio = audioRef.current
    const wasPlaying = isPlaying

    stopProgressLoop()
    if (audio) {
      audio.removeEventListener('ended', playNext)
      audio.pause()
      audio.src = ''
    }

    const newAudio = buildAudio(idx, volume)
    audioRef.current = newAudio
    currentTrackIndexRef.current = idx
    setCurrentTrackIndex(idx)
    setProgress(0)
    setDuration(0)

    newAudio.addEventListener('loadedmetadata', () => setDuration(newAudio.duration))
    newAudio.addEventListener('ended', playNext)

    if (wasPlaying) {
      newAudio.play()
        .then(() => { setIsPlaying(true); startProgressLoop() })
        .catch(() => setIsPlaying(false))
    }
  }, [isPlaying, volume, buildAudio, startProgressLoop, stopProgressLoop, playNext])

  // ── Seek (0–1) ───────────────────────────────────────────────────
  const seek = useCallback((ratio) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
  }, [])

  const changeVolume = useCallback((v) => {
    setVolume(Math.max(0, Math.min(1, v)))
  }, [])

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const currentTrack = DEFAULT_TRACKS[currentTrackIndex]?.id ?? DEFAULT_TRACKS[0].id

  return (
    <MusicContext.Provider value={{
      isPlaying, togglePlay,
      volume, changeVolume,
      currentTrack, switchTrack,
      tracks: DEFAULT_TRACKS,
      showPanel, setShowPanel,
      progress, duration, seek, formatTime,
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => useContext(MusicContext)