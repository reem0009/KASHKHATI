import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Sparkles, ArrowRight, Compass, Layers, BookOpen, Gem, Crown, Check, ShieldCheck } from 'lucide-react'
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
  const sx = useSpring(x, { damping: 25, stiffness: 120 })
  const sy = useSpring(y, { damping: 25, stiffness: 120 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.05)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.05)
  }

  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="w-full min-h-screen bg-black text-[#F7F1E8] selection:bg-[#8B0E1A] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Ambient Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#380D12] via-black to-black" />

      {/* Floating Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-8 transition-all duration-500">
        <nav className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500",
          scrolled 
            ? "bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]" 
            : "bg-transparent border border-white/5"
        )}>
          {/* Logo Brand Emblem */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/brand/deheiyya_motifs-seal.png" 
              alt="deheiyya Wax Seal" 
              className="w-9 h-9 object-contain drop-shadow-[0_2px_10px_rgba(139,14,26,0.5)] transition-transform duration-300 hover:scale-105" 
            />
            <div className="flex flex-col">
              <img 
                src="/brand/deheiyya_logo.png" 
                alt="deheiyya" 
                className="h-4 sm:h-5 w-auto object-contain brightness-125" 
              />
              <span className="text-[9px] tracking-[0.25em] text-[#F7F1E8]/50 uppercase font-light">كشختي • Cultural Beauty</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] text-[#F7F1E8]/70">
            <a href="#discover" className="hover:text-[#F7F1E8] transition-colors">{t('DISCOVER', 'اكتشفي')}</a>
            <a href="#philosophy" className="hover:text-[#F7F1E8] transition-colors">{t('PHILOSOPHY', 'الفلسفة')}</a>
            <a href="#library" className="hover:text-[#F7F1E8] transition-colors">{t('LIBRARY', 'المكتبة')}</a>
            <a href="#blueprint" className="hover:text-[#F7F1E8] transition-colors">{t('BLUEPRINT', 'الخريطة')}</a>
            <a href="#pricing" className="hover:text-[#F7F1E8] transition-colors">{t('EXPERIENCE', 'الرحلة')}</a>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[11px] tracking-widest text-[#F7F1E8] transition-all"
            >
              {lang === 'en' ? 'العربية' : 'ENGLISH'}
            </button>

            <motion.button
              onClick={() => navigate('/quiz')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#8B0E1A] to-[#380D12] px-6 py-2.5 text-xs font-semibold tracking-wider text-[#F7F1E8] shadow-[0_4px_20px_rgba(139,14,26,0.4)] border border-[#8B0E1A]/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('Begin Discovery', 'ابدئي الاكتشاف')}
                <ArrowRight className={cn("w-3.5 h-3.5 transition-transform group-hover:translate-x-1", lang === 'ar' && "rotate-180 group-hover:-translate-x-1")} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8B0E1A] via-white/20 to-[#8B0E1A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION — Cinematic Editorial Portal */}
      <section 
        ref={heroRef} 
        onMouseMove={handleMouseMove} 
        className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy & Brand Narrative */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} 
              className="lg:col-span-6 text-center lg:text-start flex flex-col items-center lg:items-start"
            >
              {/* Pearl Bow Emblem Divider */}
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/brand/deheiyya_motifs-pearl-bow.png" 
                  alt="Pearl Bow Motif" 
                  className="h-7 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(247,241,232,0.3)] animate-pulse" 
                />
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#F7F1E8]/60 font-medium">
                  {t('PERSONALIZED CULTURAL BEAUTY DOSSIER', 'ملف الجمال الثقافي الشخصي')}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.05] text-[#F7F1E8]">
                {t('Discover the beauty that', 'اكتشفي الجمال الذي')}{' '}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F7F1E8] via-[#D9C5A0] to-[#8B0E1A]">
                  {t('suits you', 'يناسبكِ حقاً')}
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#F7F1E8]/70 max-w-xl font-light leading-relaxed">
                {t(
                  'Expert guides on makeup, hair, skincare, fragrance, and style — tailored to your unique features, lifestyle, and cultural identity. Not trends. You.',
                  'أدلة متخصصة في المكياج، الشعر، العناية، العطور، والأسلوب — مُصممة خصيصاً لملامحكِ الفريدة، نمط حياتكِ، وهويتكِ الثقافية.'
                )}
              </p>

              {/* CTA Buttons & Social Proof */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <motion.button
                  onClick={() => navigate('/quiz')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-medium text-sm tracking-wide shadow-[0_10px_30px_rgba(247,241,232,0.15)] hover:bg-white transition-all flex items-center justify-center gap-3 group"
                >
                  <span>{t('Start Your Beauty Profile', 'ابدئي ملفكِ الجمالي')}</span>
                  <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", lang === 'ar' && "rotate-180 group-hover:-translate-x-1")} />
                </motion.button>

                <button
                  onClick={() => navigate('/library')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-sm text-[#F7F1E8] transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#8B0E1A]" />
                  <span>{t('Explore The Library', 'استكشفي المكتبة')}</span>
                </button>
              </div>

              {/* Cultural Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-6 text-xs text-[#F7F1E8]/50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B0E1A]" />
                  <span>{t('Culture-Aware & Respectful', 'واعية ومُحترمة للثقافة')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9C5A0]" />
                  <span>{t('8 Personal Dimensions', '٨ أبعاد شخصية')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Showcase Frame — Diverse Cultural Women & Editorial Book */}
            <motion.div 
              style={{ x: sx, y: sy }}
              className="lg:col-span-6 relative flex justify-center items-center"
            >
              <div className="relative w-full max-w-lg aspect-[4/5] rounded-[32px] overflow-hidden p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                
                {/* Background Cultural Hero Showcase Image */}
                <div className="relative w-full h-full rounded-[26px] overflow-hidden group">
                  <img 
                    src="/brand/deheiyya_brand_in_action2.png" 
                    alt="deheiyya Cultural Diversity Showcase" 
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Vignette & Gold Frame Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30" />
                  
                  {/* Floating Wax Seal Stamp Emblem */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#0D0D0D]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-xl">
                    <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] tracking-widest uppercase text-[#F7F1E8]">AUTHENTICATED DOSSIER</span>
                  </div>

                  {/* Bottom Overlay Info Card */}
                  <div className="absolute bottom-6 inset-x-6 p-5 rounded-2xl bg-[#0D0D0D]/85 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#380D12] border border-[#8B0E1A]/50 flex items-center justify-center">
                        <Gem className="w-5 h-5 text-[#D9C5A0]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#F7F1E8]">{t('Your Beauty Blueprint', 'خريطتكِ الجمالية')}</h4>
                        <p className="text-[11px] text-[#F7F1E8]/60">{t('Features • Undertone • Hijab • Style', 'الملامح • البشرة • الحجاب • النمط')}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#8B0E1A]/20 border border-[#8B0E1A]/40 text-[10px] tracking-widest text-[#F7F1E8]">
                      PRO
                    </span>
                  </div>
                </div>

                {/* Floating Pearl Bow Accent Top Left */}
                <img 
                  src="/brand/deheiyya_motifs-pearl-bow.png" 
                  alt="Pearl Bow" 
                  className="absolute -top-4 -left-4 w-16 h-16 object-contain drop-shadow-[0_4px_20px_rgba(247,241,232,0.4)] pointer-events-none"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION — Quiet Luxury & Restraint */}
      <section id="philosophy" className="py-24 bg-[#380D12]/30 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.25em] text-[#F7F1E8]/70 uppercase mb-8">
            <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-4 h-4 object-contain" />
            <span>{t('BRAND PHILOSOPHY', 'فلسفة كشختي')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F1E8] leading-tight">
            {t('Beauty emerges from knowledge,', 'الجمال ينبع من المعرفة،')}<br />
            <span className="italic font-normal text-[#D9C5A0]">
              {t('not standard trends.', 'وليس من الصيحات العابرة.')}
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#F7F1E8]/70 max-w-2xl mx-auto font-light leading-relaxed">
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
              <div key={p.title} className="p-4 rounded-2xl bg-[#0D0D0D]/60 border border-white/10 backdrop-blur-md">
                <div className="text-xs font-bold tracking-widest text-[#F7F1E8]">{p.title}</div>
                <div className="text-[10px] text-[#F7F1E8]/50 mt-1 font-light">{p.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS — 4-Step Discovery Path */}
      <section id="discover" className="py-24 bg-[#0D0D0D] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <img src="/brand/deheiyya_motifs-pearl-bow.png" alt="Bow" className="h-8 w-auto mx-auto mb-4 object-contain" />
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#F7F1E8]">
              {t('How Your Journey Unfolds', 'كيف تسير رحلة استكشافكِ')}
            </h2>
            <p className="text-xs tracking-[0.2em] uppercase text-[#F7F1E8]/50 mt-2">
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
                className="group relative p-8 rounded-3xl bg-[#131015] border border-white/10 hover:border-[#8B0E1A]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif text-[#8B0E1A] font-bold">{s.step}</span>
                  <s.icon className="w-5 h-5 text-[#D9C5A0]" />
                </div>
                <h3 className="text-xl font-serif font-medium text-[#F7F1E8] mb-2">{s.title}</h3>
                <p className="text-xs text-[#F7F1E8]/60 leading-relaxed font-light">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] tracking-widest text-[#F7F1E8]/40 group-hover:text-[#F7F1E8] transition-colors">
                  <span>STEP {idx + 1} OF 4</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BENTO GRID — Real Product & Avatar Showcase */}
      <section id="library" className="py-24 bg-[#050506] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#8B0E1A] uppercase font-semibold">
                {t('THE CULTURAL BEAUTY DOSSIER', 'ملف المكتبة الثقافية')}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F1E8] mt-2">
                {t('Curated Around You.', 'مُصممة ومُنتقاة حولكِ.')}
              </h2>
            </div>
            <p className="text-sm text-[#F7F1E8]/60 max-w-md font-light">
              {t(
                'Explore hardbound editorial guides, avatar visualization reports, and step-by-step routines crafted for your culture and lifestyle.',
                'استكشفي أدلة حريرية مطبوعة، تقارير الصورة الرمزية، وخطوات عملية مصممة لثقافتكِ.'
              )}
            </p>
          </div>

          {/* Bento Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Hardbound Editorial Guides (Large 7 Cols) */}
            <div className="md:col-span-7 rounded-3xl bg-[#131015] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="relative z-10 max-w-md">
                <span className="px-3 py-1 rounded-full bg-[#380D12] text-[10px] tracking-widest text-[#F7F1E8] border border-[#8B0E1A]/40">
                  BOOK GUIDES
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F1E8] mt-4">
                  {t('The Guide to Makeup & Cosmetics', 'دليل المكياج والتجميل المتكامل')}
                </h3>
                <p className="text-xs text-[#F7F1E8]/60 mt-2 leading-relaxed">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              </div>
            </div>

            {/* Bento Card 2: Avatar & Beauty Report (5 Cols) */}
            <div className="md:col-span-5 rounded-3xl bg-[#F7F1E8] text-[#0D0D0D] p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#380D12] text-[#F7F1E8] text-[10px] tracking-widest">
                    PERSONAL REPORT
                  </span>
                  <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-2xl font-serif font-bold mt-4 text-[#0D0D0D]">
                  {t('Avatar & Style Report', 'تقرير الصورة الرمزية والأسلوب')}
                </h3>
                <p className="text-xs text-[#0D0D0D]/70 mt-2 leading-relaxed">
                  {t('Full details report with personalized hair texture, outfit details, expressions, and color palette swatches.', 'تقرير شامل بالألوان، شعر الكيرلي/الأملس، وإطلالات الموضة.')}
                </p>
              </div>

              {/* Avatar Report Image Preview */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-[#0D0D0D]/10 shadow-lg max-h-56">
                <img 
                  src="/brand/avatar_reference_3_full_details_report.jpg" 
                  alt="Full Avatar Details Report" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
            </div>

            {/* Bento Card 3: Perfume & Aesthetic Pyramid (6 Cols) */}
            <div className="md:col-span-6 rounded-3xl bg-[#131015] border border-white/10 p-8 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] tracking-widest text-[#D9C5A0] uppercase font-semibold">CHAPTER V • FRAGRANCE</span>
                <h3 className="text-2xl font-serif text-[#F7F1E8] mt-2">
                  {t('Fragrance Pyramid & Layering', 'هرم العطور وتنسيق البخور')}
                </h3>
                <p className="text-xs text-[#F7F1E8]/60 mt-1">
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
            <div className="md:col-span-6 rounded-3xl bg-[#131015] border border-white/10 p-8 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] tracking-widest text-[#8B0E1A] uppercase font-semibold">CHAPTER III • APPAREL</span>
                <h3 className="text-2xl font-serif text-[#F7F1E8] mt-2">
                  {t('Hairstyle & Clothing Guides', 'أدلة تسريحات الشعر والملابس')}
                </h3>
                <p className="text-xs text-[#F7F1E8]/60 mt-1">
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
      <section id="pricing" className="py-24 bg-[#0D0D0D] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-10 h-10 mx-auto mb-4 object-contain" />
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F1E8]">
              {t('Choose Your Path', 'اختاري مستوى رحلتكِ')}
            </h2>
            <p className="text-xs tracking-[0.2em] text-[#F7F1E8]/50 uppercase mt-2">
              {t('TRANSPARENT VALUE • NO UNWANTED SUBSCRIPTIONS', 'قيمة واضحة • بدون اشتراكات مخفية')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: BEGIN (Free) */}
            <div className="rounded-3xl bg-[#131015] border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#F7F1E8]/40 uppercase font-semibold">TIER 01 • BEGIN</span>
                <h3 className="text-2xl font-serif text-[#F7F1E8] mt-2">{t('Discovery Profile', 'ملف الاكتشاف')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-serif text-[#F7F1E8]">0</span>
                  <span className="text-xs text-[#F7F1E8]/50">SAR</span>
                </div>
                <p className="text-xs text-[#F7F1E8]/50 mt-2">{t('Free forever access to assessment quiz and basic profile.', 'مجاناً للأبد لاختبار الملامح والملف الأساسي.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-[#F7F1E8]/80">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('2-minute beauty profile quiz', 'اختبار ملامح الوجه')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Basic face shape & undertone match', 'تحديد شكل الوجه ودرجة البشرة')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Sample library chapter preview', 'معاينة من المكتبة')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full border border-white/20 text-[#F7F1E8] hover:bg-white hover:text-[#0D0D0D] transition-colors text-xs font-semibold tracking-wider"
              >
                {t('START FREE QUIZ', 'ابدئي التقييم المجاني')}
              </button>
            </div>

            {/* Tier 2: DEFINE (Premium 99 SAR - Featured) */}
            <div className="relative rounded-3xl bg-[#F7F1E8] text-[#0D0D0D] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(139,14,26,0.2)] md:-translate-y-2 border-2 border-[#8B0E1A]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#380D12] text-[#F7F1E8] text-[9px] tracking-widest font-semibold uppercase border border-[#8B0E1A]">
                MOST POPULAR
              </div>

              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#8B0E1A] uppercase font-semibold">TIER 02 • DEFINE</span>
                <h3 className="text-2xl font-serif text-[#0D0D0D] mt-2">{t('Full Beauty Blueprint', 'الخريطة والمكتبة الكاملة')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-serif text-[#0D0D0D] font-bold">99</span>
                  <span className="text-xs text-[#0D0D0D]/60 font-medium">SAR</span>
                </div>
                <p className="text-xs text-[#0D0D0D]/70 mt-2">{t('One-time unlock for complete 8-chapter library & personalized report.', 'فتح كامل لمكتبة الفصول الـ ٨ والتقرير.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-[#0D0D0D]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Complete 8-Chapter Editorial Library', 'المكتبة الشاملة (٨ فصول)')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Personalized Avatar & Style Report PDF', 'تقرير الصورة الرمزية والأسلوب PDF')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Makeup, Hair, Fragrance & Hijab Guides', 'أدلة المكياج، الشعر، العطور، والحجاب')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8B0E1A]" /> {t('Lifetime Access & Updates', 'وصول مدى الحياة مع التحديثات')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full bg-[#380D12] text-[#F7F1E8] hover:bg-[#8B0E1A] transition-colors text-xs font-semibold tracking-wider shadow-lg"
              >
                {t('UNLOCK FULL DOSSIER', 'افتحي الملف الكامل')}
              </button>
            </div>

            {/* Tier 3: CREATE (AI Studio 299 SAR) */}
            <div className="rounded-3xl bg-[#131015] border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#D9C5A0] uppercase font-semibold">TIER 03 • CREATE</span>
                <h3 className="text-2xl font-serif text-[#F7F1E8] mt-2">{t('AI Studio Experience', 'استوديو الذكاء الاصطناعي')}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-serif text-[#F7F1E8]">299</span>
                  <span className="text-xs text-[#F7F1E8]/50">SAR</span>
                </div>
                <p className="text-xs text-[#F7F1E8]/50 mt-2">{t('Generative AI stylist for custom outfit creation & wardrobe planning.', 'منسق الذكاء الاصطناعي للإطلالات والأسلوب.')}</p>

                <ul className="mt-8 space-y-3 text-xs text-[#F7F1E8]/80">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9C5A0]" /> {t('Everything in Premium Blueprint', 'كل مزايا البريميوم')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9C5A0]" /> {t('Generative AI Personal Stylist', 'منسق أزياء بالذكاء الاصطناعي')}</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9C5A0]" /> {t('Virtual Wardrobe & Outfit Generation', 'توليد إطلالات للخزانة والأسلوب')}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/quiz')}
                className="mt-10 w-full py-3.5 rounded-full bg-gradient-to-r from-[#D9C5A0] to-[#F7F1E8] text-[#0D0D0D] hover:brightness-110 transition-all text-xs font-semibold tracking-wider"
              >
                {t('ENTER AI STUDIO', 'ادخلي الاستوديو')}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-28 bg-gradient-to-b from-[#0D0D0D] via-[#380D12]/40 to-[#0D0D0D] text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <img src="/brand/deheiyya_motifs-pearl-bow.png" alt="Pearl Bow" className="h-10 w-auto mx-auto mb-6 object-contain" />
          
          <h2 className="text-3xl sm:text-6xl font-serif font-light text-[#F7F1E8] leading-tight">
            {t('Reveal the version of yourself', 'اكتشفي النسخة الأجمل من نفسكِ')}<br />
            <span className="italic font-normal text-[#D9C5A0]">
              {t('that was always waiting.', 'التي طالما انتظرتِ ظهورها.')}
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#F7F1E8]/70 max-w-xl mx-auto font-light">
            {t(
              'Your journey begins with a 2-minute assessment. Step into a library curated around your unique beauty.',
              'تبدأ رحلتكِ بتقييم بسيط بدقيقتين. ادخلي مكتبة صُممت خصيصاً لجمالكِ.'
            )}
          </p>

          <motion.button
            onClick={() => navigate('/quiz')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 px-10 py-4 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-semibold text-sm tracking-wider shadow-[0_10px_40px_rgba(247,241,232,0.2)] hover:bg-white transition-all inline-flex items-center gap-3"
          >
            <span>{t('BEGIN DISCOVERY', 'ابدئي الاكتشاف الآن')}</span>
            <ArrowRight className={cn("w-4 h-4", lang === 'ar' && "rotate-180")} />
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src="/brand/deheiyya_logo.png" alt="deheiyya" className="h-6 w-auto object-contain brightness-125" />
              <p className="text-xs text-[#F7F1E8]/50 font-light">
                {t('Personalized Cultural Beauty Library', 'مكتبة الجمال الثقافية المخصصة')}
              </p>
            </div>

            <div className="flex items-center gap-8 text-xs text-[#F7F1E8]/60 tracking-wider">
              <a href="#discover" className="hover:text-white transition-colors">{t('Discover', 'الاكتشاف')}</a>
              <a href="#library" className="hover:text-white transition-colors">{t('Library', 'المكتبة')}</a>
              <a href="#pricing" className="hover:text-white transition-colors">{t('Pricing', 'الباقات')}</a>
            </div>

            <div className="text-[11px] text-[#F7F1E8]/40">
              © 2026 deheiyya • كشختي. All rights reserved.
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}

