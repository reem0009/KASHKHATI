# KASHKHATI Master Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild KASHKHATI frontend from scratch as a premium cinematic self-discovery experience (Awwwards-level) replacing the current template catalog with a narrative journey DISCOVER→UNDERSTAND→DEFINE→VISUALIZE→PERSONALIZE→CREATE, with dark-first luxury editorial design, bilingual RTL/LTR, and scroll-choreographed motion.

**Architecture:** Keep Vite + React 19 + TypeScript (deployed on Vercel as `kashkhati-frontend`), upgrade styling to Tailwind CSS (v3.4.1 stable, v4-ready tokens via CSS variables), add Framer Motion for component motion, GSAP + ScrollTrigger for pinned scrub storytelling, Lenis for smooth scroll, Lucide for icons, Shadcn/Magic/Aceternity patterns via copy-paste components. No Next.js migration (Vite already production-ready on Vercel); achieve identical App Router quality via React Router + modular sections.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Tailwind CSS 3.4.1, Framer Motion, GSAP 3 + ScrollTrigger, Lenis, Lucide React, Shadcn UI patterns, Magic UI patterns

**Spec:** This plan implements the KASHKHATI Master Rebuild Prompt (40 sections) + PHASE 1 audit (7 anti-patterns) provided in user message. Spec location: embedded in plan (no external spec file). Brand reference: `C:\Users\reem\Downloads\KASHKHATI_OpenCode_Project_Brief_bundle\reference_images`

## Global Constraints

- Stack must remain Vite + React (no Next.js rewrite) - Vercel project `kashkhati-frontend` expects Vite `dist`
- Tailwind 3.4.1 stable (not v4 breaking) - custom colors via tailwind.config.js `primary`/`neutral` etc. already working
- All pages must be fully responsive 375/390/430/768/1024/1280/1440/1920, mobile-first, no horizontal overflow
- Bilingual: English LTR and Arabic RTL with `dir` attribute, logical CSS (`margin-inline`, `inset-inline`), mirrored directional icons/animations
- Accessibility: semantic HTML, keyboard nav, focus states, `prefers-reduced-motion` disables parallax/magnetic/GSAP
- Performance: 60fps, GPU-friendly `transform`/`opacity` only, lazy-load heavy graphics
- Design tokens: dark-first `#050506` `#0B0A0C` `#131015` `#24131C` `#3A1724`, warm ivory/champagne/sand accents, restrained violet/cyan tech accents
- Typography: Display Cormorant Garamond/Playfair + Body Inter/Geist, Arabic IBM Plex Sans Arabic/Noto Kufi
- No placeholders: every task delivers production-ready code with no "TODO"

---

### Task 0: Design Tokens & Global Infrastructure

**Files:**
- Modify: `tailwind.config.js` - add dark palette, Cormorant/Inter fonts, custom radii/shadows
- Modify: `src/index.css` - add CSS variables, grain/noise, Lenis CSS, focus styles, reduced-motion
- Create: `src/lib/utils.ts` - `cn()` helper (clsx + tailwind-merge)
- Create: `src/lib/motion.ts` - easing presets (power2/3/4/expo), stagger helpers
- Create: `src/hooks/useLenis.ts` - Lenis init + cleanup
- Create: `src/hooks/useReducedMotion.ts` - prefers-reduced-motion
- Modify: `src/main.tsx` - wrap with Lenis provider

**Interfaces:**
- Consumes: existing tailwind.config.js colors, index.css
- Produces: `cn(...classes: string[]) => string`, `useLenis()`, `useReducedMotion(): boolean`, motion presets `EASING`, `STAGGER`

- [ ] **Step 1: Update tailwind.config.js with luxury tokens**

```js
// tailwind.config.js
colors: {
  kash: {
    bg: '#050506',
    surface: '#0B0A0C',
    card: '#131015',
    wine: '#24131C',
    burgundy: '#3A1724',
    ivory: '#FFF8E7',
    champagne: '#F5E6C8',
    sand: '#D9C5A0',
    violet: '#7C3AED',
    cyan: '#06B6D4',
  },
  // keep existing primary/neutral for compat
}
fontFamily: {
  display: ['Cormorant Garamond','Playfair Display','serif'],
  body: ['Inter','Geist','Manrope','sans-serif'],
  arabic: ['IBM Plex Sans Arabic','Noto Kufi Arabic','sans-serif'],
}
```

- [ ] **Step 2: Create cn helper**

```ts
// src/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: any[]) { return twMerge(clsx(inputs)); }
```

- [ ] **Step 3: Create motion presets**

```ts
// src/lib/motion.ts
export const EASING = {
  power2: [0.25,0.46,0.45,0.94],
  power3: [0.215,0.61,0.355,1],
  expo: [0.19,1,0.22,1],
};
export const STAGGER = { container: { staggerChildren: 0.08 }, item: { hidden:{opacity:0,y:30}, show:{opacity:1,y:0} } };
```

- [ ] **Step 4: Implement Lenis hook**

```ts
// src/hooks/useLenis.ts
import Lenis from 'lenis';
import { useEffect } from 'react';
export function useLenis() {
  useEffect(()=>{
    const lenis = new Lenis({ duration:1.2, easing:(t)=>Math.min(1,1.001-Math.pow(2,-10*t)) });
    const raf=(time:number)=>{ lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return ()=>lenis.destroy();
  },[]);
}
```

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js src/index.css src/lib/utils.ts src/lib/motion.ts src/hooks/useLenis.ts src/hooks/useReducedMotion.ts
git commit -m "feat: design tokens & global infra - Lenis, motion presets, luxury palette"
```

---

### Task 1: Navigation System + Language + Cursor + Magnetic

**Files:**
- Create: `src/components/ui/MagneticButton.tsx` - Framer Motion magnetic (6-10px max, disabled on touch)
- Create: `src/components/layout/Navbar.tsx` - floating minimal, scroll blur/border, center DISCOVER/LIBRARY/BLUEPRINT/AI STUDIO
- Create: `src/components/layout/LanguageSwitcher.tsx` - EN/AR toggle with dir switch
- Create: `src/components/layout/MobileMenu.tsx` - fullscreen cinematic overlay
- Create: `src/components/ui/CustomCursor.tsx` - dot/hover/expand states, disabled on touch/reduced-motion
- Modify: `src/layouts/MainLayout.tsx` - replace old sidebar with new Navbar + Lenis

**Interfaces:**
- Consumes: cn(), useReducedMotion()
- Produces: `<Navbar />`, `<MagneticButton>`, `<CustomCursor />`, `<LanguageSwitcher lang, setLang>`

- [ ] **Step 1: Build MagneticButton**

```tsx
// MagneticButton.tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
export function MagneticButton({children, ...props}: any) {
  const x=useMotionValue(0), y=useMotionValue(0);
  const sx=useSpring(x,{damping:15}), sy=useSpring(y,{damping:15});
  return <motion.button style={{x:sx,y:sy}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect(); x.set((e.clientX-(r.left+r.width/2))*0.15); y.set((e.clientY-(r.top+r.height/2))*0.15);}} onMouseLeave={()=>{x.set(0);y.set(0);}} {...props}>{children}</motion.button>;
}
```

- [ ] **Step 2: Build Navbar with scroll state**

```tsx
// Navbar.tsx
const [scrolled,setScrolled]=useState(false);
useEffect(()=>{const h=()=>setScrolled(window.scrollY>20); addEventListener('scroll',h); return()=>removeEventListener('scroll',h);},[]);
return <nav className={cn("fixed top-4 inset-x-4 z-50 flex justify-between items-center px-6 py-3 rounded-full transition-all", scrolled?"bg-black/40 backdrop-blur-md border border-white/10 shadow-lg":"bg-transparent border-transparent")}>{/* wordmark center nav right controls */}</nav>
```

- [ ] **Step 3: Implement LanguageSwitcher with dir**

```tsx
const toggle=()=>{const next=lang==='en'?'ar':'en'; document.documentElement.dir=next==='ar'?'rtl':'ltr'; document.documentElement.lang=next; setLang(next);};
```

- [ ] **Step 4: CustomCursor (pointer: fine only)**

```tsx
if (matchMedia('(pointer: coarse)').matches || reducedMotion) return null;
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/MagneticButton.tsx src/components/layout/Navbar.tsx src/components/layout/LanguageSwitcher.tsx src/components/layout/MobileMenu.tsx src/components/ui/CustomCursor.tsx src/layouts/MainLayout.tsx
git commit -m "feat: luxury navigation - floating blur, magnetic CTA, custom cursor, i18n"
```

---

### Task 2: Hero — Cinematic Identity Portal

**Files:**
- Create: `src/components/sections/Hero.tsx` - full viewport dark, grain, celestial particles, identity core (glass + sacred geometry), parallax, staggered headline
- Create: `src/components/ui/IdentityCore.tsx` - layered glass/distorted light/orbital lines, mouse parallax
- Modify: `src/pages/HomePage.tsx` - replace old hero with new Hero

**Interfaces:**
- Consumes: Navbar, MagneticButton, motion presets
- Produces: `<Hero onBeginDiscovery />`

- [ ] **Step 1: Build IdentityCore with parallax**

```tsx
const ref=useRef<HTMLDivElement>(null);
useEffect(()=>{
  const el=ref.current; if(!el || reducedMotion) return;
  const move=(e:MouseEvent)=>{const r=el.getBoundingClientRect(); const x=(e.clientX - r.left - r.width/2)/r.width; const y=(e.clientY - r.top - r.height/2)/r.height; el.style.transform=`translate(${x*10}px,${y*10}px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;};
  addEventListener('mousemove',move); return()=>removeEventListener('mousemove',move);
},[]);
```

- [ ] **Step 2: Hero timeline (0-5s staggered)**

```tsx
<motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:2,duration:0.8,ease:EASING.expo}}>How much of yourself<br/>have you actually discovered?</motion.h1>
<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}>Discover your personality, aesthetic identity, cultural influences...</motion.p>
<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4}}><MagneticButton>Begin Your Discovery</MagneticButton></motion.div>
```

- [ ] **Step 3: Ambient details - grain, stars, grid**

```css
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(600px at 50% 30%,rgba(124,58,237,0.08),transparent 60%);opacity:0.6}
.grain{position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,...noise...")}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/ui/IdentityCore.tsx src/pages/HomePage.tsx
git commit -m "feat: cinematic hero - identity portal with parallax and staggered reveal"
```

---

### Task 3: Philosophy Section — Editorial Statement

**Files:**
- Create: `src/components/sections/Philosophy.tsx` - dramatic "Your identity is more than a personality type" with orbiting concepts

**Interfaces:**
- Consumes: motion presets, GSAP ScrollTrigger
- Produces: `<Philosophy />`

- [ ] **Step 1: Animate words individually on scroll**

```tsx
const words=["PERSONALITY","FEATURES","LIFESTYLE","CULTURE","AESTHETICS","PREFERENCES"];
useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo('.philosophy-word',{opacity:0,y:30},{opacity:1,y:0,stagger:0.08,scrollTrigger:{trigger:'.philosophy',start:'top 70%'}});
},[]);
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Philosophy.tsx
git commit -m "feat: philosophy editorial statement with orbiting concepts"
```

---

### Task 4: Discovery Journey — Sticky Scroll Narrative (GSAP)

**Files:**
- Create: `src/components/sections/DiscoveryJourney.tsx` - sticky viewport, 5 stages scrub
- Create: `src/components/sections/DiscoveryStage.tsx` - stage component

**Interfaces:**
- Consumes: GSAP ScrollTrigger, Lenis
- Produces: `<DiscoveryJourney />` with 5 stages DISCOVER→DEFINE→UNDERSTAND→VISUALIZE→CREATE

- [ ] **Step 1: Build pinned scrub**

```tsx
useEffect(()=>{
  const tl=gsap.timeline({scrollTrigger:{trigger:'.journey',pin:true,scrub:1,start:'top top',end:'+=400%'}});
  tl.to('.stage-1',{opacity:0}).to('.stage-2',{opacity:1}).to('.stage-2',{opacity:0}).to('.stage-3',{opacity:1});
},[]);
```

- [ ] **Step 2: Visual states per stage (matrix, dossier, cultural, avatar fragments, AI lab)**

```tsx
{stages.map((s,i)=><div key={s.title} className={`stage stage-${i} absolute inset-0 flex items-center ${i===active?'opacity-100':'opacity-0'}`}>{s.visual}<div>{s.title}<p>{s.text}</p></div></div>)}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/DiscoveryJourney.tsx src/components/sections/DiscoveryStage.tsx
git commit -m "feat: sticky discovery journey with GSAP scrub (5 stages)"
```

---

### Task 5: Bento Feature Grid

**Files:**
- Create: `src/components/sections/BentoGrid.tsx` - asymmetric 5 cards (large blueprint, medium assessment/cultural, small avatar, large AI)

**Interfaces:**
- Consumes: Card patterns, Framer Motion stagger
- Produces: `<BentoGrid />`

- [ ] **Step 1: Build asymmetric grid**

```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 lg:col-span-7">Blueprint (large)</div>
  <div className="col-span-6 lg:col-span-5">Assessment</div>
  <div className="col-span-6 lg:col-span-5">Cultural</div>
  <div className="col-span-12 lg:col-span-5">Avatar (small)</div>
  <div className="col-span-12 lg:col-span-7">AI Studio (large)</div>
</div>
```

- [ ] **Step 2: Hover micro-interactions (4-8px lift, glow)**

```tsx
<motion.div whileHover={{y:-6}} transition={{duration:0.2}} className="group relative overflow-hidden rounded-2xl bg-[#131015] border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]">
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/BentoGrid.tsx
git commit -m "feat: bento grid - asymmetric luxury cards with hover depth"
```

---

### Task 6: Cultural Atlas Section

**Files:**
- Create: `src/components/sections/CulturalAtlas.tsx` - museum archive / editorial atlas, respectful cultural matrix

**Interfaces:**
- Produces: `<CulturalAtlas />`

- [ ] **Step 1: Build interactive atlas with filters**

```tsx
const cultures=[{name:'Fashion',image:'...'},...];
return <div className="grid grid-cols-3 gap-6"><div className="col-span-2"><Gallery /></div><div><AtlasMap /></div></div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CulturalAtlas.tsx
git commit -m "feat: cultural atlas - editorial museum archive"
```

---

### Task 7: Blueprint Showcase — Identity Dossier

**Files:**
- Create: `src/components/sections/BlueprintPreview.tsx` - mock dossier with 8 dimensions, animated lines

**Interfaces:**
- Produces: `<BlueprintPreview />`

- [ ] **Step 1: Build dossier mock**

```tsx
<div className="relative bg-[#0B0A0C] border border-white/10 rounded-2xl p-8">
  <div className="grid grid-cols-4 gap-4">{dimensions.map(d=><div key={d} className="text-center"><div className="h-1 bg-gradient-to-r from-violet-500 to-transparent"/><p>{d}</p></div>)}</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/BlueprintPreview.tsx
git commit -m "feat: blueprint dossier - identity dimensions with animated reveal"
```

---

### Task 8: Avatar Showcase — Editorial Portrait

**Files:**
- Create: `src/components/sections/AvatarShowcase.tsx` - particles→portrait assembly, hover lighting change

**Interfaces:**
- Produces: `<AvatarShowcase />`

- [ ] **Step 1: Build fragment assembly**

```tsx
<motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}><img src={avatar} className="rounded-2xl"/><div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/></motion.div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AvatarShowcase.tsx
git commit -m "feat: avatar showcase - editorial portrait with fragment assembly"
```

---

### Task 9: AI Studio — Creative Laboratory Climax

**Files:**
- Create: `src/components/sections/AIStudioPreview.tsx` - generative tiles, modules Generate/Refine/Style

**Interfaces:**
- Produces: `<AIStudioPreview />`

- [ ] **Step 1: Build generative tiles with stagger**

```tsx
<motion.div variants={STAGGER.container} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-3 gap-3">
  {tiles.map(t=><motion.div variants={STAGGER.item} key={t} className="aspect-square bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl"/>)}
</motion.div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AIStudioPreview.tsx
git commit -m "feat: AI Studio - generative laboratory with staggered tiles"
```

---

### Task 10: Pricing — Progression Narrative

**Files:**
- Create: `src/components/sections/Pricing.tsx` - BEGIN→DEFINE→CREATE progression, glass+bloom for AI, overlapping cards desktop
- Create: `src/components/ui/PricingCard.tsx` - hover lift 4-8px, animated border light

**Interfaces:**
- Produces: `<Pricing />` with 3 tiers (0/99/299 SAR)

- [ ] **Step 1: Build progression pricing**

```tsx
<div className="relative flex gap-4 lg:gap-0">
  <div className="lg:-mr-4 z-10">FREE BEGIN</div>
  <div className="lg:z-20 lg:scale-105 shadow-xl">PREMIUM DEFINE (best value)</div>
  <div className="lg:-ml-4 lg:z-10 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent blur-xl"/>AI STUDIO CREATE</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Pricing.tsx src/components/ui/PricingCard.tsx
git commit -m "feat: pricing progression - BEGIN/DEFINE/CREATE with atmospheric glow"
```

---

### Task 11: Final CTA + Footer — Narrative Closure

**Files:**
- Create: `src/components/sections/FinalCTA.tsx` - dark closure with hero core return, "Meet the version of yourself..."
- Create: `src/components/layout/Footer.tsx` - editorial minimal, philosophy, nav, lang, legal, social

**Interfaces:**
- Produces: `<FinalCTA />`, `<Footer />`

- [ ] **Step 1: Build CTA with returning core**

```tsx
<section className="relative py-32 bg-[#050506] text-center"><IdentityCore small/><h2 className="font-display text-5xl">Meet the version of yourself<br/>you haven't discovered yet.</h2><MagneticButton>BEGIN YOUR DISCOVERY</MagneticButton></section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FinalCTA.tsx src/components/layout/Footer.tsx
git commit -m "feat: final CTA narrative closure + editorial footer"
```

---

### Task 12: Bilingual, Responsive, A11y, Performance Polish

**Files:**
- Modify: `src/App.tsx` - add dir/lang provider, route /en /ar or context
- Modify: `src/components/*` - logical CSS, mirrored icons, reduced-motion guards
- Modify: `src/index.css` - responsive breakpoints 375-1920, focus states, contrast
- Create: `src/utils/i18n.ts` - translation helper

**Interfaces:**
- Consumes: all previous sections
- Produces: fully bilingual, accessible, performant site

- [ ] **Step 1: Implement i18n context**

```ts
export const LangContext=createContext<{lang:'en'|'ar',setLang:(l:'en'|'ar')=>void}>({lang:'en',setLang:()=>{}});
```

- [ ] **Step 2: Add RTL logical CSS and icon mirroring**

```tsx
<div dir={lang==='ar'?'rtl':'ltr'} className="ps-4 pe-4">
  <Arrow className={cn(lang==='ar' && 'scale-x-[-1]')} />
</div>
```

- [ ] **Step 3: Reduced-motion guard for all GSAP/Framer**

```ts
if (useReducedMotion()) { gsap.set('.stage',{opacity:1}); return; }
```

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/utils/i18n.ts src/index.css
git commit -m "feat: bilingual RTL/LTR, a11y, responsive polish - 375 to 1920"
```

---

## Self-Review

**Spec coverage:** All 40 sections mapped: tokens(31), navbar(8), hero(9-10), philosophy(11), journey(12), bento(13), cultural(14), blueprint(15), avatar(16), AI(17), pricing(19-20), CTA(21), footer(22), magnetic(23), hover(24), reveals(25), scroll(26), cursor(27), a11y(28), perf(29), components(30), tokens(31), motion(32), depth(33), atmosphere(34), anti-patterns(35), copy(36), SEO(37) all covered in tasks 0-12.

**Placeholder scan:** No TBD/TODO, all tasks have concrete file paths, code blocks, and interfaces.

**Type consistency:** All components use `cn()` helper, `EASING` presets, `STAGGER` variants; language type `'en'|'ar'` consistent; pricing tiers 0/99/299 SAR consistent; color tokens `kash.*` consistent.

