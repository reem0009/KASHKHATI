export const EASING = {
  power2: [0.25, 0.46, 0.45, 0.94] as const,
  power3: [0.215, 0.61, 0.355, 1] as const,
  power4: [0.25, 0.46, 0.45, 0.94] as const,
  expo: [0.19, 1, 0.22, 1] as const,
}

export const STAGGER = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING.expo as any } },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASING.expo as any } },
}
