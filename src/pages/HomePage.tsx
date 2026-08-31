import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowRight, Compass, Layers, Palette, Crown, FlaskConical, BookOpen, Gem } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/utils'

export const HomePage = () => {
  const navigate = useNavigate()
  useLenis()
  const reduced = useReducedMotion()
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 20, stiffness: 100 })
  const sy = useSpring(y, { damping: 20, stiffness: 100 })

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.08)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.08)
  }

  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="w-full bg-[#050506] text-[#FFF8E7] selection:bg-[#380D12] selection:text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap');`}</style>

      {/* Floating Navbar */}
      <nav className={cn(
        "fixed top-4 inset-x-4 md:inset-x-8 z-50 flex items-center justify-between px-5 md:px-8 py-3 rounded-full transition-all duration-500",
        scrolled ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border border-transparent"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#380D12] to-[#8B0E1A] flex items-center justify-center border border-white/10">
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Cormorant Garamond' }}>ك</span>
          </div>
          <span className="font-bold tracking-[0.2em] text-sm" style={{ fontFamily: 'Cormorant Garamond' }}>KASHKHATI</span>
          <span className="hidden md:inline text-white/30 text-xs tracking-widest">كشختي</span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.15em] text-white/60">
          <a href="#discover" className="hover:text-white transition-colors">DISCOVER</a>
          <a href="#library" className="hover:text-white transition-colors">LIBRARY</a>
          <a href="#blueprint" className="hover:text-white transition-colors">BLUEPRINT</a>
          <a href="#studio" className="hover:text-white transition-colors">AI STUDIO</a>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-xs tracking-widest px-4 py-2 rounded-full border border-white/15 hover:bg-white/10 transition-colors">
            {lang === 'en' ? 'العربية' : 'ENGLISH'}
          </button>
          <button onClick={() => navigate('/quiz')} className="hidden md:inline text-xs tracking-widest text-white/70 hover:text-white px-4">
            {t('Sign in', 'تسجيل الدخول')}
          </button>
          <motion.button
            onClick={() => navigate('/quiz')}
            className="bg-[#F7F1E8] text-[#0D0D0D] px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest hover:bg-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('Begin Discovery', 'ابدئي الاكتشاف')}
          </motion.button>
        </div>
      </nav>

      {/* HERO — Cinematic Portal */}
      <section ref={heroRef} onMouseMove={handleMove} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#050506]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0 bg-radial from-[#3A1724]/20 via-transparent to-transparent" style={{ background: 'radial-gradient(800px at 50% 30%, rgba(139,14,26,0.15), transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.04] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.02] rounded-full" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center lg:text-start">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.18em] text-white/60 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A] animate-pulse" />
                {t('PERSONALIZED CULTURAL BEAUTY LIBRARY', 'مكتبة الجمال الثقافية المخصصة')}
              </motion.div>

              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-light leading-[0.9] tracking-[-0.03em]" style={{ fontFamily: 'Cormorant Garamond' }}>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="block text-white">{t('How much of yourself', 'كم اكتشفتِ')}</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }} className="block text-white/40 italic" style={{ fontFamily: 'Cormorant Garamond' }}>{t('have you actually', 'من نفسكِ حقاً؟')}</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }} className="block text-white">{t('discovered?', '')}</motion.span>
              </h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-6 text-[15px] leading-relaxed text-white/50 max-w-xl mx-auto lg:mx-0" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic' : 'Inter' }}>
                {t('Discover the beauty that genuinely suits you — through your features, lifestyle, and cultural identity. Not trends. Not one standard. You.', 'اكتشفي الجمال الذي يناسبكِ حقاً — عبر ملامحكِ، أسلوب حياتكِ، وهويتكِ الثقافية. ليس صيحة. ليس معياراً واحداً. أنتِ.')}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button onClick={() => navigate('/quiz')} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="group relative inline-flex items-center justify-center gap-3 bg-[#F7F1E8] text-[#0D0D0D] px-8 py-4 rounded-full font-semibold text-sm tracking-wide overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {t('Discover My Beauty Profile', 'اكتشفي ملامح جمالك')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <button onClick={() => navigate('/library')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm">
                  <BookOpen className="w-4 h-4" />
                  {t('Explore the Library', 'استكشفي المكتبة')}
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-[11px] tracking-widest text-white/30">
                <span className="flex items-center gap-2"><span className="w-6 h-[1px] bg-white/20" />{t('SCROLL TO ENTER', 'مرري للدخول')}</span>
                <span className="hidden sm:inline">• {t('2 min quiz', 'اختبار بدقيقتين')}</span>
                <span className="hidden sm:inline">• {t('Free blueprint', 'خريطة مجانية')}</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ x: sx, y: sy }} className="relative flex items-center justify-center lg:h-[520px]">
              <div className="relative w-[320px] md:w-[420px] aspect-[4/5]">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(500px at 30% 20%, rgba(139,14,26,0.3), transparent 60%)' }} />
                  {/* Sacred geometry */}
                  <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-30">
                    <circle cx="200" cy="250" r="180" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
                    <circle cx="200" cy="250" r="120" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                    <path d="M200 70 L340 250 L200 430 L60 250 Z" fill="none" stroke="white" strokeOpacity="0.07" strokeWidth="1" />
                    <circle cx="200" cy="250" r="4" fill="#8B0E1A" />
                  </svg>
                  {/* Central pearl */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#F7F1E8] to-[#D9C5A0] shadow-[0_0_60px_rgba(247,241,232,0.3)] flex items-center justify-center">
                    <span className="text-4xl" style={{ fontFamily: 'Cormorant Garamond' }}>ك</span>
                  </div>
                  <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#8B0E1A] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{t('Your Beauty Blueprint', 'خريطتك الجمالية')}</div>
                        <div className="text-[11px] text-white/50">{t('Curated around you', 'مُصممة حولكِ')}</div>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-[#131015] border border-white/10 p-3 hidden md:block">
                  <div className="text-[10px] tracking-widest text-white/40">UNDERTONE</div>
                  <div className="mt-2 flex gap-1">
                    <span className="w-6 h-6 rounded-full bg-[#D9A679] border border-white/20" />
                    <span className="w-6 h-6 rounded-full bg-[#E8C4A8] border border-white/20" />
                    <span className="w-6 h-6 rounded-full bg-[#8B5A3C] border border-white/20" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-28 h-20 rounded-2xl bg-[#131015] border border-white/10 p-3 hidden md:block">
                  <div className="text-[10px] tracking-widest text-white/40">STYLE</div>
                  <div className="text-xs text-white mt-1">Classic • Modest</div>
                  <div className="text-[10px] text-white/40">Hot/Humid • Hijab</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-[0.2em]">DISCOVER</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="relative py-24 md:py-32 border-t border-white/[0.06] bg-[#0B0A0C]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] tracking-[0.15em] text-white/50 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#8B0E1A]" /> PHILOSOPHY
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[32px] md:text-[48px] font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond' }}>
            {t('Your identity is', 'هويتكِ أكثر من')}<br />
            <span className="italic text-white/60">{t('more than a personality type.', 'مجرد نمط شخصية.')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 text-white/40 max-w-2xl mx-auto leading-relaxed">
            {t('Beauty emerges from the interplay of features, lifestyle, culture, and personal preference. KASHKHATI maps that interplay — so you know what genuinely suits you.', 'الجمال يتشكل من تفاعل الملامح وأسلوب الحياة والثقافة والذوق الشخصي. كشختي ترسم هذه الخريطة — لتعرفي ما يناسبكِ حقاً.')}
          </motion.p>
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-[11px] tracking-[0.14em]">
            {['PERSONALITY', 'FEATURES', 'LIFESTYLE', 'CULTURE', 'AESTHETICS', 'PREFERENCES'].map((w, i) => (
              <motion.span key={w} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 + 0.3 }} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
                {w}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - 4 steps */}
      <section className="py-20 md:py-28 bg-[#050506] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', t: t('Discover', 'اكتشفي'), d: t('Take the 2-min quiz', 'أجيبي عن اختبار دقيقتين'), icon: Compass },
              { n: '02', t: t('Understand', 'افهمي'), d: t('Your Beauty Blueprint', 'خريطتك الجمالية'), icon: Layers },
              { n: '03', t: t('Explore', 'استكشفي'), d: t('Curated library', 'مكتبة مُنتقاة'), icon: BookOpen },
              { n: '04', t: t('Apply', 'طبقي'), d: t('In your daily life', 'في حياتك اليومية'), icon: Sparkles },
            ].map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative p-6 rounded-2xl bg-[#0B0A0C] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs tracking-[0.2em] text-white/20">{s.n}</span>
                  <s.icon className="w-5 h-5 text-white/30 group-hover:text-[#8B0E1A] transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond' }}>{s.t}</h3>
                <p className="text-sm text-white/40 mt-1">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Journey */}
      <section id="discover" className="py-20 bg-[#0B0A0C] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] tracking-[0.15em] text-white/50 mb-4">JOURNEY</div>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond' }}>{t('From discovery to creation', 'من الاكتشاف إلى الإبداع')}</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { title: 'DISCOVER', desc: 'Assessment', color: '#380D12' },
              { title: 'DEFINE', desc: 'Blueprint', color: '#24131C' },
              { title: 'UNDERSTAND', desc: 'Culture', color: '#3A1724' },
              { title: 'VISUALIZE', desc: 'Avatar', color: '#131015' },
              { title: 'CREATE', desc: 'AI Studio', color: '#0B0A0C' },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative p-6 rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors" style={{ background: s.color }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(400px at 50% 0%, white, transparent)` }} />
                <div className="text-[10px] tracking-[0.2em] text-white/30">0{i + 1}</div>
                <div className="text-sm font-semibold text-white mt-2 tracking-wide">{s.title}</div>
                <div className="text-xs text-white/40 mt-1">{s.desc}</div>
                <div className="mt-6 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${60 + i * 8}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} className="h-full bg-[#8B0E1A]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento */}
      <section className="py-20 bg-[#050506] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-4 auto-rows-[220px]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="col-span-12 lg:col-span-7 relative rounded-[24px] bg-[#131015] border border-white/10 overflow-hidden p-8 flex flex-col justify-between group hover:border-white/15 transition-colors">
              <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(600px at 20% 0%, rgba(139,14,26,0.2), transparent 60%)' }} />
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] text-white/40"><Gem className="w-3 h-3" /> BLUEPRINT</div>
                <h3 className="text-2xl font-light mt-3" style={{ fontFamily: 'Cormorant Garamond' }}>{t('Your personal dossier', 'ملفكِ الشخصي الفاخر')}</h3>
                <p className="text-sm text-white/40 mt-2 max-w-md">{t('8 dimensions — colors, features, style, fragrance, culture. A map curated around you.', '٨ أبعاد — ألوان، ملامح، أسلوب، عطر، ثقافة. خريطة مُفصلة حولكِ.')}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">Oval • Warm</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">Curly • Modest</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="col-span-6 lg:col-span-5 rounded-[24px] bg-[#0B0A0C] border border-white/10 p-6 relative overflow-hidden hover:border-white/15 transition-colors">
              <Palette className="w-6 h-6 text-white/40" />
              <h3 className="text-lg font-semibold mt-3 text-white">{t('Assessment', 'التقييم')}</h3>
              <p className="text-xs text-white/40 mt-1">{t('9 illustrated cards, 2-min', '٩ بطاقات مصورة بدقيقتين')}</p>
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-xs text-white/30">02:00</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="col-span-6 lg:col-span-5 rounded-[24px] bg-white text-[#0D0D0D] p-6 relative overflow-hidden">
              <BookOpen className="w-6 h-6 text-[#380D12]" />
              <h3 className="text-lg font-semibold mt-3" style={{ fontFamily: 'Cormorant Garamond' }}>{t('Cultural Library', 'المكتبة الثقافية')}</h3>
              <p className="text-xs text-[#8A7A6E] mt-1">{t('8 chapters, researched resources', '٨ فصول، موارد موثوقة')}</p>
              <div className="mt-4 flex gap-1">
                <span className="px-2 py-1 rounded-full bg-[#F7F1E8] border text-[10px]">Hijab</span>
                <span className="px-2 py-1 rounded-full bg-[#F7F1E8] border text-[10px]">Heritage</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="col-span-12 lg:col-span-7 rounded-[24px] bg-gradient-to-br from-[#380D12] to-[#0B0A0C] border border-white/10 p-8 relative overflow-hidden text-white">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <FlaskConical className="w-6 h-6 text-white/60" />
              <h3 className="text-xl font-light mt-3" style={{ fontFamily: 'Cormorant Garamond' }}>AI Studio</h3>
              <p className="text-sm text-white/50 mt-1 max-w-md">{t('Generate personalized looks, palettes, and routines. Your creative laboratory.', 'ولّدي إطلالات ولوحات وأنماط مخصصة. مختبركِ الإبداعي.')}</p>
              <div className="mt-6 grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white/10 border border-white/10" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing — BEGIN / DEFINE / CREATE */}
      <section className="py-20 md:py-28 bg-[#0B0A0C] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond' }}>{t('Choose how deeply', 'اختاري عمق')}<br /><span className="italic text-white/60">{t('you want to explore.', 'رحلة استكشافكِ.')}</span></h2>
            <p className="text-sm text-white/40 mt-3">{t('Upgrade feels like progression, not payment.', 'الترقية تطور، ليست مجرد دفع.')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* FREE — BEGIN */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] bg-[#131015] border border-white/10 p-8">
              <div className="text-[11px] tracking-[0.2em] text-white/30">BEGIN</div>
              <h3 className="text-xl font-semibold mt-2 text-white">FREE</h3>
              <div className="text-3xl font-light mt-2 text-white">0 <span className="text-sm text-white/40">SAR</span></div>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li>✓ {t('Beauty Profile Quiz', 'اختبار الملامح')}</li>
                <li>✓ {t('Basic Blueprint', 'خريطة أساسية')}</li>
                <li>✓ {t('Sample guides', 'أدلة تجريبية')}</li>
                <li className="text-white/20">✕ {t('Full library', 'المكتبة الكاملة')}</li>
              </ul>
              <button onClick={() => navigate('/quiz')} className="mt-8 w-full py-3 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition-colors text-sm font-semibold">
                {t('Start Free', 'ابدئي مجاناً')}
              </button>
            </motion.div>

            {/* PREMIUM — DEFINE (best value) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="relative rounded-[24px] bg-[#F7F1E8] text-[#0D0D0D] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:scale-[1.03] md:-mt-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#380D12] text-white text-[10px] tracking-[0.15em]">BEST VALUE</div>
              <div className="text-[11px] tracking-[0.2em] text-[#8A7A6E]">DEFINE</div>
              <h3 className="text-xl font-semibold mt-2" style={{ fontFamily: 'Cormorant Garamond' }}>PREMIUM</h3>
              <div className="text-3xl font-light mt-2">99 <span className="text-sm text-[#8A7A6E]">SAR</span></div>
              <ul className="mt-6 space-y-3 text-sm text-[#0D0D0D]/70">
                <li>✓ {t('Full Library (8 chapters)', 'المكتبة الكاملة (٨ فصول)')}</li>
                <li>✓ {t('Personalized Blueprint', 'خريطة مخصصة')}</li>
                <li>✓ {t('Cultural resources', 'موارد ثقافية')}</li>
                <li>✓ {t('Workbooks & cards', 'أدوات وكروت')}</li>
              </ul>
              <button onClick={() => navigate('/quiz')} className="mt-8 w-full py-3 rounded-full bg-[#380D12] text-white hover:bg-[#4A0F1A] transition-colors text-sm font-semibold">
                {t('Unlock Premium', 'افتحي البريميوم')}
              </button>
            </motion.div>

            {/* AI STUDIO — CREATE */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="relative rounded-[24px] bg-[#0B0A0C] border border-white/10 p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(400px at 50% 0%, rgba(124,58,237,0.15), transparent 60%)' }} />
              <div className="relative">
                <div className="text-[11px] tracking-[0.2em] text-white/30">CREATE</div>
                <h3 className="text-xl font-semibold mt-2 text-white flex items-center gap-2" style={{ fontFamily: 'Cormorant Garamond' }}><Crown className="w-4 h-4 text-[#D9C5A0]" /> AI STUDIO</h3>
                <div className="text-3xl font-light mt-2 text-white">299 <span className="text-sm text-white/40">SAR</span></div>
                <ul className="mt-6 space-y-3 text-sm text-white/60">
                  <li>✓ {t('Everything in Premium', 'كل مزايا البريميوم')}</li>
                  <li>✓ {t('AI stylist & wardrobe', 'منسق أزياء بالذكاء الاصطناعي')}</li>
                  <li>✓ {t('Outfit generation', 'توليد إطلالات')}</li>
                  <li>✓ {t('Future shopping help', 'مساعد تسوق مستقبلي')}</li>
                </ul>
                <button onClick={() => navigate('/quiz')} className="mt-8 w-full py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm font-semibold">
                  {t('Enter Studio', 'ادخلي الاستوديو')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 bg-[#050506] border-t border-white/[0.06] overflow-hidden text-center">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(600px at 50% 50%, rgba(56,13,18,0.2), transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[44px] font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond' }}>
            {t('Meet the version of yourself', 'قابلي نسخة من نفسكِ')}<br />
            <span className="italic text-white/60">{t("you haven't discovered yet.", 'لم تكتشفيها بعد.')}</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            {t('Your Blueprint is only the beginning. Continue into a library curated around you.', 'خريطتكِ مجرد البداية. تابعي إلى مكتبة مُنتقاة حولكِ.')}
          </p>
          <motion.button onClick={() => navigate('/quiz')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-flex items-center gap-3 bg-[#F7F1E8] text-[#0D0D0D] px-10 py-4 rounded-full font-semibold tracking-wide">
            {t('BEGIN YOUR DISCOVERY', 'ابدئي اكتشافكِ')}
            <ArrowRight className={cn("w-4 h-4", lang === 'ar' && "rotate-180")} />
          </motion.button>
          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] text-white/20">
            <span className="w-8 h-[1px] bg-white/10" /> {t('QUIET LUXURY • CULTURALLY AWARE • PERSONAL', 'فخامة هادئة • واعية ثقافياً • شخصية')} <span className="w-8 h-[1px] bg-white/10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0B0A0C] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="font-bold tracking-[0.2em] text-sm" style={{ fontFamily: 'Cormorant Garamond' }}>KASHKHATI — كشختي</div>
              <div className="text-xs text-white/40 mt-2 max-w-sm">Beauty, rooted in who you are. A library curated around you.</div>
              <div className="text-[11px] text-white/20 mt-3">© 2026 KASHKHATI. All rights reserved.</div>
            </div>
            <div className="flex gap-12 text-xs">
              <div>
                <div className="tracking-[0.15em] text-white/60 mb-3">EXPLORE</div>
                <div className="space-y-2 text-white/40">
                  <div><a href="#" className="hover:text-white">Library</a></div>
                  <div><a href="#" className="hover:text-white">Culture & Identity</a></div>
                  <div><a href="#" className="hover:text-white">Blueprint</a></div>
                </div>
              </div>
              <div>
                <div className="tracking-[0.15em] text-white/60 mb-3">SUPPORT</div>
                <div className="space-y-2 text-white/40">
                  <div><a href="#" className="hover:text-white">About</a></div>
                  <div><a href="#" className="hover:text-white">Contact</a></div>
                  <div><a href="#" className="hover:text-white">Privacy</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
