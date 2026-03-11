import { useState, useEffect, useRef } from 'react'

/**
 * useFadeIn — Intersection Observer hook for scroll-triggered fade animations.
 * Usage:
 *   const { ref, vis } = useFadeIn()
 *   <div ref={ref('my-key')} data-k="my-key" className={`fade-in ${vis['my-key'] ? 'visible' : ''}`} />
 */
export function useFadeIn(threshold = 0.12) {
  const refs = useRef({})
  const [vis, setVis] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVis((v) => ({ ...v, [e.target.dataset.k]: true }))
          }
        })
      },
      { threshold }
    )

    const current = refs.current
    Object.values(current).forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
  })

  const ref = (key) => (el) => {
    refs.current[key] = el
  }

  return { ref, vis }
}
