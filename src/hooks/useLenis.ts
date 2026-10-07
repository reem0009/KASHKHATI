import { useEffect, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    ;(window as unknown as { __lenis?: Lenis }).__lenis = instance
    setLenis(instance)

    // Single driver for Lenis: GSAP's ticker owns the clock.
    // No requestAnimationFrame loop here — useSceneSnap assumes
    // Lenis is already being driven and only adds snap logic.
    const update = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      instance.destroy()
      if ((window as unknown as { __lenis?: Lenis }).__lenis === instance) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis
      }
      setLenis(null)
    }
  }, [])

  return lenis
}
