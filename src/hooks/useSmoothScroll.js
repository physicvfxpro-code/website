// useSmoothScroll.js — version corrigée
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisRef.current = lenis

        // Expose globalement pour ScrollToTop
        window.__lenis = lenis

        lenis.on('scroll', ScrollTrigger.update)

        // RAF loop propre
        const rafId = { current: null }
        function raf(time) {
            lenis.raf(time)
            rafId.current = requestAnimationFrame(raf)
        }
        rafId.current = requestAnimationFrame(raf)

        gsap.ticker.lagSmoothing(0)

        return () => {
            cancelAnimationFrame(rafId.current)
            lenis.destroy()
            window.__lenis = null
        }
    }, [])
}