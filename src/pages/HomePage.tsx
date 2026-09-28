import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import { ArrowRight, Compass, Layers, BookOpen, Crown, Check } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/utils'

type HeroRevealState = 'notStarted' | 'inProgress' | 'completed'

const REVEAL_LOCK_MS = 900

const MOTIF_FADE_DELAY_MS = 500

type MotifCallout = {
  src: string
  alt: string
  label: string
  top: string
  right: string
}

const MOTIF_CALLOUTS: MotifCallout[] = [
  {
    src: '/brand/scene2/Cypress%20Tree%20Ramallah.png',
    alt: 'Cypress Tree embroidery motif from Ramallah',
    label: 'Cypress Tree Ramallah',
    top: 'top-[8%]',
    right: 'md:right-[calc(67.3vh+6px)]',
  },
  {
    src: '/brand/scene2/Sarwa%20%20Cypress%20Tree%20Hebron.png',
    alt: 'Sarwa Cypress Tree embroidery motif from Hebron',
    label: 'Cypress Tree Hebron',
    top: 'top-[62%]',
    right: 'md:right-[calc(72.4vh+6px)]',
  },
]

function Scene2Callouts({ visible }: { visible: boolean }) {
  return (
    <>
      {MOTIF_CALLOUTS.map((c) => (
        <div
          key={c.label}
          className={`absolute left-3 md:left-auto ${c.right} ${c.top} z-40 pointer-events-none transition-opacity duration-500 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <img
                src={c.src}
                alt={c.alt}
                draggable={false}
                className="block h-[5.5vh] min-h-[36px] w-auto object-contain md:h-[6.5vh]"
              />
              <p className="mt-2 whitespace-nowrap text-center font-body text-[10px] uppercase tracking-[0.18em] text-black md:text-[11px]">
                {c.label}
              </p>
            </div>
            <div aria-hidden="true" className="ml-2 hidden h-px w-10 bg-black md:block" />
          </div>
        </div>
      ))}
    </>
  )
}

export const HomePage = () => {
  const navigate = useNavigate()
  useLenis()
  const reduced = useReducedMotion()
  const [lang] = useState<'en' | 'ar'>('en')
  const heroRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scene1IllusRef = useRef<HTMLDivElement>(null)
  const scene2Ref = useRef<HTMLDivElement>(null)
  const scene2Done = useRef(false)
  const motifTimer = useRef<number | null>(null)
  const [motifsVisible, setMotifsVisible] = useState(false)
  const [revealState, setRevealState] = useState<HeroRevealState>(() =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'completed'
      : 'notStarted',
  )
  const revealRef = useRef<HeroRevealState>(revealState)
  const lockTimer = useRef<number | null>(null)
  const mx = useMotionValue(0)

  useLayoutEffect(() => {
    if (reduced) return
    const setHidden = () => {
      if (revealRef.current !== 'notStarted') return
      mx.set(0.15 * (frameRef.current?.clientWidth ?? 0))
    }
    setHidden()
    window.addEventListener('resize', setHidden)
    return () => window.removeEventListener('resize', setHidden)
  }, [reduced, mx])

  useEffect(() => {
    revealRef.current = revealState
  }, [revealState])

  useEffect(() => {
    if (reduced && revealRef.current === 'notStarted') {
      revealRef.current = 'completed'
      setRevealState('completed')
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    const getLenis = () =>
      (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis

    const lockScroll = () => {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      getLenis()?.stop()
    }

    const unlockScroll = () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }

    const heroPinnedInView = () => {
      const el = heroRef.current
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top <= 8 && rect.bottom > window.innerHeight * 0.4
    }

    const heroScrolledPast = () => {
      const el = heroRef.current
      if (!el) return false
      return el.getBoundingClientRect().bottom < window.innerHeight * 0.5
    }

    const finish = () => {
      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current)
        lockTimer.current = null
      }
      if (revealRef.current === 'notStarted') mx.set(0)
      revealRef.current = 'completed'
      setRevealState('completed')
      unlockScroll()
    }

    const start = () => {
      if (revealRef.current !== 'notStarted') return
      revealRef.current = 'inProgress'
      setRevealState('inProgress')
      animate(mx, 0, { duration: 0.8, ease: [0.16, 1, 0.3, 1] })
      lockScroll()
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current)
      lockTimer.current = window.setTimeout(finish, REVEAL_LOCK_MS)
    }

    const onWheel = (e: WheelEvent) => {
      if (revealRef.current === 'inProgress') {
        e.preventDefault()
        return
      }
      if (revealRef.current !== 'notStarted') return
      if (e.deltaY <= 0) return
      if (heroScrolledPast()) {
        finish()
        return
      }
      if (!heroPinnedInView()) return
      e.preventDefault()
      start()
    }

    let lastTouchY: number | null = null
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) lastTouchY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (revealRef.current === 'inProgress') {
        e.preventDefault()
        return
      }
      if (revealRef.current !== 'notStarted' || lastTouchY === null) return
      const currentY = e.touches.length > 0 ? e.touches[0].clientY : lastTouchY
      const swipedUp = lastTouchY - currentY
      lastTouchY = currentY
      if (swipedUp <= 8) return
      if (heroScrolledPast()) {
        finish()
        return
      }
      if (!heroPinnedInView()) return
      e.preventDefault()
      start()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key !== 'ArrowDown' &&
        e.key !== 'PageDown' &&
        e.key !== ' ' &&
        e.key !== 'End'
      ) {
        return
      }
      if (revealRef.current === 'inProgress') {
        e.preventDefault()
        return
      }
      if (revealRef.current !== 'notStarted') return
      if (heroScrolledPast()) {
        finish()
        return
      }
      if (!heroPinnedInView()) return
      e.preventDefault()
      start()
    }

    const onScroll = () => {
      if (revealRef.current !== 'notStarted') return
      if (window.scrollY <= 4) return
      if (heroScrolledPast()) {
        finish()
        return
      }
      start()
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
    window.addEventListener('keydown', onKeyDown, { capture: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current)
        lockTimer.current = null
      }
      mx.stop()
      unlockScroll()
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove, { capture: true })
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced, mx])

  // Scene 1 illustration ⇄ Scene 2: pinned, scroll-driven, translateX-only.
  // ONLY the right-side illustration group moves (Scene 1 wall/character/hand
  // 0 → +100vw out right; Scene 2 +100vw → 0 in from right). Static hero
  // content (logo, text, buttons) is never transformed. One-way latch.
  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    const s1 = scene1IllusRef.current
    const s2 = scene2Ref.current
    if (!track || !s1 || !s2) return

    let raf = 0
    let current = 0

    const scheduleMotifs = () => {
      if (motifTimer.current !== null) return
      motifTimer.current = window.setTimeout(() => setMotifsVisible(true), MOTIF_FADE_DELAY_MS)
    }

    const apply = (p: number) => {
      // translateX only — final sizes established in CSS (Scene2 img h-full w-auto)
      s1.style.transform = `translate3d(${(p * 100).toFixed(3)}vw, 0, 0)`
      s2.style.transform = `translate3d(${((1 - p) * 100).toFixed(3)}vw, 0, 0)`
    }

    const measure = () => {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return scene2Done.current ? 1 : 0
      if (scene2Done.current) return 1
      const p = Math.min(1, Math.max(0, -rect.top / total))
      if (p >= 0.999) {
        scene2Done.current = true
        scheduleMotifs()
        return 1
      }
      return p
    }

    const update = () => {
      raf = 0
      const target = measure()
      // Subtle interpolation for smoothness; snap when close. Still scroll-driven.
      current += (target - current) * 0.22
      if (Math.abs(target - current) < 0.001) current = target
      apply(current)
      if (current !== target && !scene2Done.current) {
        raf = requestAnimationFrame(update)
      }
    }

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    apply(0)
    requestUpdate()

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (motifTimer.current !== null) {
        window.clearTimeout(motifTimer.current)
        motifTimer.current = null
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [reduced])

  const completeReveal = () => {
    if (revealRef.current === 'completed') return
    if (lockTimer.current !== null) {
      window.clearTimeout(lockTimer.current)
      lockTimer.current = null
    }
    mx.set(0)
    revealRef.current = 'completed'
    setRevealState('completed')
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    ;(window as unknown as { __lenis?: { start: () => void } }).__lenis?.start()
  }

  const revealed = revealState !== 'notStarted'

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="w-full min-h-screen bg-black text-[#EDEBDE] selection:bg-[#A50100] selection:text-white font-body antialiased overflow-x-clip">
      {/* Background Ambient Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A50100] via-black to-black" />

      {/* HERO — Scene 1 → Scene 2 scroll sequence (pinned, translateX-only) */}
      <div ref={trackRef} className="relative bg-[#EDEBDE]" style={reduced ? undefined : { height: '160vh' }}>
      <section
        ref={heroRef}
        className={reduced
          ? "relative min-h-screen pb-16 flex items-center justify-center overflow-hidden z-10 bg-[#EDEBDE] text-black"
          : "sticky top-0 h-screen overflow-hidden z-10 bg-[#EDEBDE] text-black"}
      >
        <div
          className={reduced ? "w-full" : "absolute inset-0 flex items-center justify-center pb-16"}
        >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          {/* Wordmark + Star Lockup — section top-left */}
          <div className="flex items-center gap-2.5 mb-8">
            <img 
              src="/brand/logo/logolightmode.svg" 
              alt="deheiyya star mark" 
                  className="h-[46px] w-[46px] object-contain shrink-0" 
            />
                <div className="flex flex-col justify-center">
                  <img 
                    src="/brand/wordmark/wordmarkblack.svg" 
                    alt="deheiyya" 
                    className="h-auto w-[171.3%] max-w-none -ml-[35.3%] -mr-[36%] object-contain shrink-0" 
                  />
                  <div className="-mt-[18px] flex w-fit items-center justify-between gap-[0.35em] text-[13px] tracking-[0.07em] text-black/60">
                    <span className="whitespace-nowrap">CULTURE</span>
                    <span className="text-[10px] text-[#A50100]">✦</span>
                    <span className="whitespace-nowrap">SELF-EXPRESSION</span>
                    <span className="text-[10px] text-[#A50100]">✦</span>
                    <span className="whitespace-nowrap">YOU</span>
                  </div>
                </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
            
            {/* Left Copy — Screenshot Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} 
              className="lg:col-span-6 text-center lg:text-start flex flex-col items-center lg:items-start self-center"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-display font-light tracking-tight leading-[1.08] text-black">
                {t('You were never meant to look like everyone else.', 'لم تُخلقي لتشبهي الجميع.')}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-black/70 max-w-xl font-light leading-relaxed">
                {t(
                  'Discover beauty through your features, your lifestyle, your culture, and what feels authentically yours.',
                  'اكتشفي الجمال عبر ملامحكِ، نمط حياتكِ، ثقافتكِ، وما يشبهكِ حقاً.'
                )}
              </p>

              {/* CTA */}
              <div className="mt-10">
                <motion.button
                  onClick={() => navigate('/quiz')}
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  className="px-8 py-4 rounded-[10px] bg-[#A50100] text-[#EDEBDE] font-medium text-sm tracking-wider shadow-[0_10px_30px_rgba(165,1,0,0.35)] hover:bg-[#7d0100] transition-colors flex items-center justify-center gap-3 group"
                >
                  <span>{t('BEGIN YOUR JOURNEY', 'ابدئي رحلتكِ')}</span>
                  <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", lang === 'ar' && "rotate-180 group-hover:-translate-x-1")} />
                </motion.button>
              </div>

              {/* Scroll Cue */}
              <div className="mt-14 flex w-fit flex-col items-center lg:items-start">
                <img
                  src="/brand/dividers/dividersmall.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-auto w-[143%] max-w-none -ml-[9%] -mr-[34%] object-contain py-[5px]"
                />
                <a href="#philosophy" onClick={completeReveal} className="text-[11px] tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors">
                {t('SCROLL TO DISCOVER ↓', 'مرري للاكتشاف ↓')}
              </a>
              </div>
            </motion.div>

            {/* Right illustration column — the ONLY Scene 1 element that scroll-translates.
                lg:absolute keeps the frame geometry identical to the previous full-hero
                offset box while the grid cell stays in flow on mobile. */}
            {/* full.svg ground truth: character shifted +(173.58,-11.09); wall matrix(1.6816,+980.46,-7.62); hand crop +(159.49,-21.40) */}
            <div ref={scene1IllusRef} className="lg:col-span-6 min-h-[480px] lg:absolute lg:inset-0 will-change-transform">
               <div ref={frameRef} className="relative h-[70vh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-[-4%] lg:h-auto lg:w-[44vw]">
                  {/* Character layer: stays behind the wall */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ x: mx, willChange: 'transform' }}
                  >
                    {/* Character: full.svg-mapped height so the abaya touches the frame bottom */}
                    <img
                      src="/brand/hero/hero-character-profile.svg"
                      alt="Woman in black abaya with red embroidered trim peeking from behind a wall"
                      className="absolute bottom-[-3%] left-[10%] z-10 h-[105%] w-auto max-w-none object-contain"
                    />
                  </motion.div>
                  {/* Wall: static, utmost right, full height */}
                  <img 
                    src="/brand/hero/hero-wall.svg" 
                    alt="Beige wall panel" 
                    className="absolute right-0 top-[-25%] z-20 h-[150%] w-auto object-contain pointer-events-none" 
                  />
                  {/* Hand layer: above the wall so the fingers show */}
                  {/* Positioning shim with wall-identical geometry; hand % stays aligned on every viewport */}
                  <div className="absolute right-0 top-[-25%] h-[150%] aspect-[648/2014.462] pointer-events-none">
                    {/* Hand: full.svg-mapped size/position, fingertips over the wall edge */}
                    <motion.img
                      src="/brand/hero/hero-hand.svg"
                      alt=""
                      aria-hidden="true"
                      style={{ x: mx }}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: reduced || revealed ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-[-14.7%] top-[66.1%] z-30 h-[32.9%] w-auto max-w-none object-contain pointer-events-none"
                    />
                  </div>
               </div>
            </div>

          </div>
        </div>
        </div>
        {!reduced && (
          <div
            ref={scene2Ref}
            aria-hidden={false}
            className="absolute inset-0 z-30 flex items-stretch justify-end will-change-transform pointer-events-none"
            style={{ transform: 'translate3d(100vw, 0, 0)' }}
          >
            <img
              src="/brand/scene2/torso-closeup.svg"
              alt="Close-up illustration of the woman's torso with red embroidered abaya trim"
              draggable={false}
              className="block h-full w-auto max-w-none object-contain"
            />
            <Scene2Callouts visible={motifsVisible} />
          </div>
        )}
      </section>
      {reduced && (
        <section aria-label="Torso close-up" className="relative h-screen overflow-hidden bg-[#EDEBDE] flex items-stretch justify-end">
          <img
            src="/brand/scene2/torso-closeup.svg"
            alt="Close-up illustration of the woman's torso with red embroidered abaya trim"
            className="block h-full w-auto max-w-none object-contain"
          />
          <Scene2Callouts visible />
        </section>
      )}
      </div>

      {/* PHILOSOPHY SECTION — Quiet Luxury & Restraint */}
      <section id="philosophy" className="py-24 bg-black/30 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.25em] text-[#EDEBDE]/70 uppercase mb-8">
            <img src="/brand/seals/sealblack.svg" alt="Seal" className="w-4 h-4 object-contain" />
            <span>{t('BRAND PHILOSOPHY', 'فلسفة كشختي')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-light text-[#EDEBDE] leading-tight">
            {t('Beauty emerges from knowledge,', 'الجمال ينبع من المعرفة،')}<br />
            <span className="italic font-normal text-[#A50100]">
              {t('not standard trends.', 'وليس من الصيحات العابرة.')}
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#EDEBDE]/70 max-w-2xl mx-auto font-light leading-relaxed">
            {t(
              'deheiyya maps the intricate interplay between your facial features, skin undertones, lifestyle, modesty preferences, and heritage. A quiet luxury library created around who you truly are.',
              'كشختي ترسم التناغم الدقيق بين ملامح وجهكِ، درجات بشرتكِ، نمط حياتكِ، وأصالة هويتكِ. مكتبة فخمة ومصممة بعناية حول جوهركِ الحقيقي.'
            )}
          </p>

          {/* 5 Pillars of deheiyya */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            {[
              { title: 'ELEGANT', sub: 'Luxury through restraint' },
              { title: 'INTELLIGENT', sub: 'Beauty backed by knowledge' },
              { title: 'TIMELESS', sub: 'Classic over trends' },
              { title: 'PERSONAL', sub: 'Tailored to you' },
              { title: 'REFINED', sub: 'Feminine & sophisticated' },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                <div className="text-xs font-bold tracking-widest text-[#EDEBDE]">{p.title}</div>
                <div className="text-[10px] text-[#EDEBDE]/50 mt-1 font-light">{p.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS — 4-Step Discovery Path */}
      <section id="discover" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#EDEBDE]">
              {t('How Your Journey Unfolds', 'كيف تسير رحلة استكشافكِ')}
            </h2>
            <p className="text-xs tracking-[0.2em] uppercase text-[#EDEBDE]/50 mt-2">
              {t('FROM DISCOVERY TO SELF-EXPRESSION', 'من الاكتشاف إلى التعبير عن الذات')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: t('Discover', 'اكتشفي'),
                desc: t('Take our 2-minute illustrated quiz covering features, undertone, hair texture, and style preferences.', 'أجيبي عن اختبار بدقيقتين للملامح والأسلوب.'),
                icon: Compass,
              },
              {
                step: '02',
                title: t('Understand', 'افهمي'),
                desc: t('Receive your Personalized Beauty Blueprint — a custom dossier analyzing your unique harmony.', 'احصلي على خريطة جمالكِ المُخصصة.'),
                icon: Layers,
              },
              {
                step: '03',
                title: t('Explore', 'استكشفي'),
                desc: t('Unlock our 8-chapter cultural library with expert guides for makeup, hair, hijab, and fragrance.', 'افتحي مكتبة الفصول الـ ٨ المتخصصة.'),
                icon: BookOpen,
              },
              {
                step: '04',
                title: t('Create', 'أبدعي'),
                desc: t('Use AI Studio to generate personalized outfit looks, color palettes, and daily routines.', 'استخدمي استوديو الذكاء الاصطناعي للإطلالات.'),
                icon: Crown,
              },
            ].map((s, idx) => (
              <div 
                key={s.step} 
                className="group relative p-8 rounded-3xl bg-black border border-white/10 hover:border-[#A50100]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-display text-[#A50100] font-bold">{s.step}</span>
                  <s.icon className="w-5 h-5 text-[#EDEBDE]" />
                </div>
                <h3 className="text-xl font-display font-medium text-[#EDEBDE] mb-2">{s.title}</h3>
                <p className="text-xs text-[#EDEBDE]/60 leading-relaxed font-light">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] tracking-widest text-[#EDEBDE]/40 group-hover:text-[#EDEBDE] transition-colors">
                  <span>STEP {idx + 1} OF 4</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BENTO GRID — Real Product & Avatar Showcase */}
      <section id="library" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#A50100] uppercase font-semibold">
                {t('THE CULTURAL BEAUTY DOSSIER', 'ملف المكتبة الثقافية')}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-light text-[#EDEBDE] mt-2">
                {t('Curated Around You.', 'مُصممة ومُنتقاة حولكِ.')}
              </h2>
            </div>
            <p className="text-sm text-[#EDEBDE]/60 max-w-md font-light">
              {t(
                'Explore hardbound editorial guides, avatar visualization reports, and step-by-step routines crafted for your culture and lifestyle.',
                'استكشفي أدلة حريرية مطبوعة، تقارير الصورة الرمزية، وخطوات عملية مصممة لثقافتكِ.'
              )}
            </p>
          </div>

          {/* Bento Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Hardbound Editorial Guides (Large 7 Cols) */}
            <div className="md:col-span-7 rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="relative z-10 max-w-md">
                <span className="px-3 py-1 rounded-full bg-black border border-[#A50100]/40 text-[10px] tracking-widest text-[#EDEBDE]">
                  BOOK GUIDES
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-[#EDEBDE] mt-4">
                  {t('The Guide to Makeup & Cosmetics', 'دليل المكياج والتجميل المتكامل')}
                </h3>
                <p className="text-xs text-[#EDEBDE]/60 mt-2 leading-relaxed">
                  {t('Step-by-step illustrated instructions for prep & base, precision eyeliner, lip contouring, and color harmony based on warm & cool undertones.', 'خطوات مصورة لتأسيس البشرة، رسم الكحل، وتناغم الألوان.')}
                </p>
              </div>

              {/* Product Cover Image Preview */}
              <div className="mt-8 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/brand/product_design1.png" 
                  alt="Guide to Makeup Book" 
                  className="w-full h-64 object-cover object-top transform transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </div>

            {/* Bento Card 2: Avatar & Beauty Report (5 Cols) */}
            <div className="md:col-span-5 rounded-3xl bg-[#EDEBDE] text-black p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black text-[#EDEBDE] text-[10px] tracking-widest">
                    PERSONAL REPORT
                  </span>
                   <img src="/brand/seals/sealblack.svg" alt="Seal" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-2xl font-display font-bold mt-4 text-black">
                  {t('Avatar & Style Report', 'تقرير الصورة الرمزية والأسلوب')}
                </h3>
                <p className="text-xs text-black/70 mt-2 leading-relaxed">
                  {t('Full details report with personalized hair texture, outfit details, expressions, and color palette swatches.', 'تقرير شامل بالألوان، شعر الكيرلي/الأملس، وإطلالات الموضة.')}
                </p>
              </div>

              {/* Avatar Report Image Preview */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-black/10 shadow-lg max-h-56">
                <img 
                  src="/brand/avatar_reference_3_full_details_report.jpg" 
                  alt="Full Avatar Details Report" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
            </div>

            {/* Bento Card 3: Perfume & Aesthetic Pyramid (6 Cols) */}
            <div className="md:col-span-6 rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] tracking-widest text-[#D9C5A0] uppercase font-semibold">CHAPTER V • FRAGRANCE</span>
                <h3 className="text-2xl font-display text-[#EDEBDE] mt-2">
                  {t('Fragrance Pyramid & Layering', 'هرم العطور وتنسيق البخور')}
                </h3>
                <p className="text-xs text-[#EDEBDE]/60 mt-1">
                  {t('Discover top, middle, and base notes. Learn traditional layering with Oud, Musk, and Rose.', 'اكتشفي النوتات العطرية وطرق دمج العود والمسك.')}
                </p>
              </div>

              <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl max-h-48">
                <img 
                  src="/brand/product_design3.png" 
                  alt="Fragrance & Undertone Guide" 
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            </div>

            {/* Bento Card 4: Step-by-Step Routines & Clothing (6 Cols) */}
            <div className="md:col-span-6 rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] tracking-widest text-[#A50100] uppercase font-semibold">CHAPTER III • APPAREL</span>
                <h3 className="text-2xl font-display text-[#EDEBDE] mt-2">
                  {t('Hairstyle & Clothing Guides', 'أدلة تسريحات الشعر والملابس')}
                </h3>
                <p className="text-xs text-[#EDEBDE]/60 mt-1">
                  {t('Refined bob, tapered trousers, structured blazers, and modest attire pairings.', 'تسريحات كلاسيكية وبدل رسمية تناسب أسلوبكِ.')}
                </p>
              </div>

              <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl max-h-48">
                <img 
                  src="/brand/product_design2.png" 
                  alt="Step by step makeup & apparel" 
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING & EXPERIENCE TIERS — BEGIN / DEFINE / CREATE */}
      <section id="pricing" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <img src="/brand/seals/sealred.svg" alt="Seal" className="w-10 h-10 mx-auto mb-4 object-contain" />
            <h2 className="text-3xl sm:text-5xl font-display font-light text-[#EDEBDE]">
              {t('Choose Your Path', 'اختاري مستوى رحلتكِ')}
            </h2>
            <p className="text-xs tracking-[0.2em] text-[#EDEBDE]/50 uppercase mt-2">
              {t('TRANSPARENT VALUE • NO UNWANTED SUBSCRIPTIONS', 'قيمة واضحة • بدون اشتراكات مخفية')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: BEGIN (Free) */}
            <div className="rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#EDEBDE]/40 uppercase font-semibold">TIER 01 • BEGIN</span>
                <h3 className="text-2xl font-display text-[#EDEBDE] mt-2">{t('Discovery Profile', 'ملف الاكتشاف')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display text-[#EDEBDE]">0</span>
                  <span className="text-xs text-[#EDEBDE]/50">SAR</span>
                </div>
                <p className="text-xs text-[#EDEBDE]/50 mt-2">{t('Free forever access to assessment quiz and basic profile.', 'مجاناً للأبد لاختبار الملامح والملف الأساسي.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-[#EDEBDE]/80">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('2-minute beauty profile quiz', 'اختبار ملامح الوجه')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Basic face shape & undertone match', 'تحديد شكل الوجه ودرجة البشرة')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Sample library chapter preview', 'معاينة من المكتبة')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full border border-white/20 text-[#EDEBDE] hover:bg-white hover:text-black transition-colors text-xs font-semibold tracking-wider"
              >
                {t('START FREE QUIZ', 'ابدئي التقييم المجاني')}
              </button>
            </div>

            {/* Tier 2: DEFINE (Premium 99 SAR - Featured) */}
            <div className="relative rounded-3xl bg-[#EDEBDE] text-black p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(165,1,0,0.2)] md:-translate-y-2 border-2 border-[#A50100]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-[#EDEBDE] text-[9px] tracking-widest font-semibold uppercase border border-[#A50100]">
                MOST POPULAR
              </div>

              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#A50100] uppercase font-semibold">TIER 02 • DEFINE</span>
                <h3 className="text-2xl font-display text-black mt-2">{t('Full Beauty Blueprint', 'الخريطة والمكتبة الكاملة')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display text-black font-bold">99</span>
                  <span className="text-xs text-black/60 font-medium">SAR</span>
                </div>
                <p className="text-xs text-black/70 mt-2">{t('One-time unlock for complete 8-chapter library & personalized report.', 'فتح كامل لمكتبة الفصول الـ ٨ والتقرير.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-black">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Complete 8-Chapter Editorial Library', 'المكتبة الشاملة (٨ فصول)')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Personalized Avatar & Style Report PDF', 'تقرير الصورة الرمزية والأسلوب PDF')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Makeup, Hair, Fragrance & Hijab Guides', 'أدلة المكياج، الشعر، العطور، والحجاب')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#A50100]" /> {t('Lifetime Access & Updates', 'وصول مدى الحياة مع التحديثات')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full bg-black text-[#EDEBDE] hover:bg-[#A50100] transition-colors text-xs font-semibold tracking-wider shadow-lg"
              >
                {t('UNLOCK FULL DOSSIER', 'افتحي الملف الكامل')}
              </button>
            </div>

            {/* Tier 3: CREATE (AI Studio 299 SAR) */}
            <div className="rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#EDEBDE] uppercase font-semibold">TIER 03 • CREATE</span>
                <h3 className="text-2xl font-display text-[#EDEBDE] mt-2">{t('AI Studio Experience', 'استوديو الذكاء الاصطناعي')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display text-[#EDEBDE]">299</span>
                  <span className="text-xs text-[#EDEBDE]/50">SAR</span>
                </div>
                <p className="text-xs text-[#EDEBDE]/50 mt-2">{t('Generative AI stylist for custom outfit creation & wardrobe planning.', 'منسق الذكاء الاصطناعي للإطلالات والأسلوب.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-[#EDEBDE]/80">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#EDEBDE]" /> {t('Everything in Premium Blueprint', 'كل مزايا البريميوم')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#EDEBDE]" /> {t('Generative AI Personal Stylist', 'منسق أزياء بالذكاء الاصطناعي')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#EDEBDE]" /> {t('Virtual Wardrobe & Outfit Generation', 'توليد إطلالات للخزانة والأسلوب')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full bg-gradient-to-r from-[#EDEBDE] to-white text-black hover:brightness-110 transition-all text-xs font-semibold tracking-wider"
              >
                {t('ENTER AI STUDIO', 'ادخلي الاستوديو')}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-28 bg-gradient-to-b from-black via-black/40 to-black text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <h2 className="text-3xl sm:text-6xl font-display font-light text-[#EDEBDE] leading-tight">
            {t('Reveal the version of yourself', 'اكتشفي النسخة الأجمل من نفسكِ')}<br />
            <span className="italic font-normal text-[#A50100]">
              {t('that was always waiting.', 'التي طالما انتظرتِ ظهورها.')}
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#EDEBDE]/70 max-w-xl mx-auto font-light">
            {t(
              'Your journey begins with a 2-minute assessment. Step into a library curated around your unique beauty.',
              'تبدأ رحلتكِ بتقييم بسيط بدقيقتين. ادخلي مكتبة صُممت خصيصاً لجمالكِ.'
            )}
          </p>

          <motion.button
            onClick={() => navigate('/quiz')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 px-10 py-4 rounded-full bg-[#EDEBDE] text-black font-semibold text-sm tracking-wider shadow-[0_10px_40px_rgba(237,235,222,0.2)] hover:bg-white transition-all inline-flex items-center gap-3"
          >
            <span>{t('BEGIN DISCOVERY', 'ابدئي الاكتشاف الآن')}</span>
            <ArrowRight className={cn("w-4 h-4", lang === 'ar' && "rotate-180")} />
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src="/brand/wordmark/wordmarkred.svg" alt="deheiyya" className="h-6 w-auto object-contain brightness-125" />
              <p className="text-xs text-[#EDEBDE]/50 font-light">
                {t('Personalized Cultural Beauty Library', 'مكتبة الجمال الثقافية المخصصة')}
              </p>
            </div>

            <div className="flex items-center gap-8 text-xs text-[#EDEBDE]/60 tracking-wider">
              <a href="#discover" className="hover:text-white transition-colors">{t('Discover', 'الاكتشاف')}</a>
              <a href="#library" className="hover:text-white transition-colors">{t('Library', 'المكتبة')}</a>
              <a href="#pricing" className="hover:text-white transition-colors">{t('Pricing', 'الباقات')}</a>
            </div>

            <div className="text-[11px] text-[#EDEBDE]/40">
              © 2026 deheiyya • كشختي. All rights reserved.
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}

