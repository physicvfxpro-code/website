import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('physic-lang') || 'fr')
  const [theme, setTheme] = useState(() => localStorage.getItem('physic-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('physic-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    localStorage.setItem('physic-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
