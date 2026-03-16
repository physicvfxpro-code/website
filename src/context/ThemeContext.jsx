import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const DEFAULTS_DARK = {
  mode: 'dark',
  bgPrimary: '#07070e',
  bgSecondary: '#0f1117',
  bgCard: '#13151f',
  textPrimary: '#f1f1f5',
  textMuted: '#6b7280',
  accent: '#4c54ea',
  accentText: '#8098fb',
  border: '#1f2133',
}

const DEFAULTS_LIGHT = {
  mode: 'light',
  bgPrimary: '#ffffff',
  bgSecondary: '#f8f9fc',
  bgCard: '#ffffff',
  textPrimary: '#111118',
  textMuted: '#6b7280',
  accent: '#4c54ea',
  accentText: '#4c54ea',
  border: '#e5e7eb',
}

function loadPrefs() {
  try {
    const saved = localStorage.getItem('themePrefs')
    if (saved) return JSON.parse(saved)
  } catch { }
  return DEFAULTS_LIGHT
}

function applyVars(prefs) {
  const root = document.documentElement
  if (prefs.mode === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')

  root.style.setProperty('--color-bg-primary', prefs.bgPrimary)
  root.style.setProperty('--color-bg-secondary', prefs.bgSecondary)
  root.style.setProperty('--color-bg-card', prefs.bgCard)
  root.style.setProperty('--color-text-primary', prefs.textPrimary)
  root.style.setProperty('--color-text-muted', prefs.textMuted)
  root.style.setProperty('--color-accent', prefs.accent)
  root.style.setProperty('--color-accent-text', prefs.accentText)
  root.style.setProperty('--color-border', prefs.border)

  // Hero suit le thème
  root.style.setProperty('--color-hero-bg', prefs.bgPrimary)

  document.body.style.backgroundColor = prefs.bgPrimary
  document.body.style.color = prefs.textPrimary
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [prefs, setPrefs] = useState(loadPrefs)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    applyVars(prefs)
    localStorage.setItem('themePrefs', JSON.stringify(prefs))
  }, [prefs])

  const setMode = useCallback((mode) => {
    const defaults = mode === 'dark' ? DEFAULTS_DARK : DEFAULTS_LIGHT
    setPrefs(p => ({ ...defaults, accent: p.accent, accentText: p.accentText }))
  }, [])

  const setProp = useCallback((key, value) => {
    setPrefs(p => ({ ...p, [key]: value }))
  }, [])

  const resetDefaults = useCallback(() => {
    const d = prefs.mode === 'dark' ? DEFAULTS_DARK : DEFAULTS_LIGHT
    setPrefs(d)
  }, [prefs.mode])

  return (
    <ThemeContext.Provider value={{ prefs, setMode, setProp, showPanel, setShowPanel, resetDefaults, DEFAULTS_DARK, DEFAULTS_LIGHT }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)