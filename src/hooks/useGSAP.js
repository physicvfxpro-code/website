import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useReveal — animates children with .gsap-reveal / .gsap-reveal-left / .gsap-reveal-right / .gsap-scale
 * when they enter the viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll(
      '.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right, .gsap-scale, .gsap-zoom'
    )
    if (!targets.length) return

    const triggers = []

    targets.forEach((target, i) => {
      const isLeft  = target.classList.contains('gsap-reveal-left')
      const isRight = target.classList.contains('gsap-reveal-right')
      const isScale = target.classList.contains('gsap-scale')
      const isZoom  = target.classList.contains('gsap-zoom')

      let from = { opacity: 0, y: 50 }
      let to   = { opacity: 1, y: 0 }

      if (isLeft)  { from = { opacity: 0, x: -60 }; to = { opacity: 1, x: 0 } }
      if (isRight) { from = { opacity: 0, x:  60 }; to = { opacity: 1, x: 0 } }
      if (isScale) { from = { opacity: 0, scale: 0.88, y: 20 }; to = { opacity: 1, scale: 1, y: 0 } }
      if (isZoom)  { from = { opacity: 0, scale: 0.72 }; to = { opacity: 1, scale: 1 } }

      const st = ScrollTrigger.create({
        trigger: target,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(target, from, {
            ...to,
            duration: isZoom ? 1.1 : (options.duration || 0.85),
            delay: i * (options.stagger || 0.1),
            ease: isZoom ? 'back.out(1.3)' : 'power3.out',
          })
        },
        once: true,
      })
      triggers.push(st)
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return ref
}

/**
 * useParallax — simple vertical parallax on the ref element.
 * speed = 0.3 means element moves at 30% the scroll speed.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const st = gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => st.scrollTrigger?.kill()
  }, [speed])

  return ref
}

/**
 * useZoomOnScroll — zooms element FROM small TO normal as it enters viewport.
 * Attach the returned ref to a wrapper div.
 * Affects direct children with className "zoom-child".
 */
export function useZoomOnScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('.zoom-child')
    if (!children.length) {
      // fallback: animate the element itself
      gsap.fromTo(el,
        { opacity: 0, scale: 0.75 },
        {
          opacity: 1, scale: 1,
          duration: 1.2,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
      return
    }

    const triggers = []
    children.forEach((child, i) => {
      const st = ScrollTrigger.create({
        trigger: child,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(child,
            { opacity: 0, scale: 0.7, y: 30 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 1,
              delay: i * 0.12,
              ease: 'back.out(1.5)',
            }
          )
        },
      })
      triggers.push(st)
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return ref
}

export { gsap, ScrollTrigger }
