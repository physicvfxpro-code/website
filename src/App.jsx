import { useState, useEffect, useCallback } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AppProvider } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AmbientSound from './components/AmbientSound.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Services from './pages/Services.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import Privacy from './pages/Privacy.jsx'

/* ── Loader component ── */
function Loader({ lang, fading }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--bg, #0a0a0a)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity .6s ease',
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '2px solid var(--border-mid, #333)',
        borderTop: '2px solid var(--text, #fff)',
        borderRadius: '50%',
        animation: 'loaderSpin .8s linear infinite',
        marginBottom: 22,
      }} />
      <p style={{
        fontFamily: "'MuseoSans', sans-serif",
        fontWeight: 300, fontSize: 10,
        letterSpacing: '4px', textTransform: 'uppercase',
        color: 'var(--text-muted, #888)',
      }}>
        {lang === 'fr' ? 'Chargement...' : 'Loading...'}
      </p>
    </div>
  )
}

function AppInner() {
  const [page, setPage] = useState('home')
  const [pageKey, setPageKey] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [loading, setLoading] = useState(true)
  const [fading, setFading] = useState(false)
  const lang = typeof localStorage !== 'undefined' ? (localStorage.getItem('physic-lang') || 'fr') : 'fr'

  // Initial loader only — fade out then remove
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200)
    const removeTimer = setTimeout(() => setLoading(false), 1800)
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = useCallback((id, data) => {
    if (id === page && !data) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage(id)
    setPageKey((k) => k + 1)
    if (data?.service) {
      setSelectedService(data.service)
    } else if (id !== 'contact') {
      setSelectedService('')
    }
  }, [page])

  const renderPage = () => {
    const props = { navigate }
    switch (page) {
      case 'home':      return <Home key={pageKey} {...props} />
      case 'portfolio': return <Portfolio key={pageKey} {...props} />
      case 'services':  return <Services key={pageKey} {...props} />
      case 'shop':      return <Shop key={pageKey} {...props} />
      case 'about':     return <About key={pageKey} {...props} />
      case 'contact':   return <Contact key={pageKey} {...props} selectedService={selectedService} />
      case 'legal':     return <Legal key={pageKey} {...props} />
      case 'privacy':   return <Privacy key={pageKey} {...props} />
      default:          return <Home key={pageKey} {...props} />
    }
  }

  return (
    <>
      {loading && <Loader lang={lang} fading={fading} />}
      <Navbar page={page} navigate={navigate} scrolled={scrolled} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <AmbientSound />
    </>
  )
}

const PAYPAL_OPTIONS = {
  clientId: 'AXprhdLGyMMdcYyQrchKWwr4w50pivOiQ9gwNN9AlJwnWVHl69eiDP--SZO1k42WLLapq_owwL29cWR9',
  currency: 'EUR',
  intent: 'capture',
}

export default function App() {
  return (
    <PayPalScriptProvider options={PAYPAL_OPTIONS}>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </PayPalScriptProvider>
  )
}