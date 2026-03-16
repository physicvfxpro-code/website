import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { MusicProvider } from './context/MusicContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemePanel from './components/ThemePanel'
import MusicPanel from './components/MusicPanel'
import Loader from './components/Loader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Shop from './pages/Shop'
import Services from './pages/Services'
import Tools from './pages/Tools'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Privacy from './pages/privacy'
import NotFound from './pages/404'
import { useSmoothScroll } from './hooks/useSmoothScroll'



function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' })
    document.body.scrollTo({ top: 0, behavior: 'instant' })
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}


function AppLayout() {
  useSmoothScroll()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ThemePanel />
      <MusicPanel />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const hideTimer = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(hideTimer)
    }
  }, [loading])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <MusicProvider>
          <BrowserRouter>
            {visible && <Loader fading={!loading} />}
            <AppLayout />
          </BrowserRouter>
        </MusicProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
