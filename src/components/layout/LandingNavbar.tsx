import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const LINKS = [
  { label: 'Discover', href: '#discover' },
  { label: 'Library', href: '#library' },
  { label: 'Pricing', href: '#pricing' },
]

function BrandLockup() {
  return (
    // Explicit compact sizing (same proportions as the hero lockup at ~0.52
    // scale). No zoom: it breaks the percentage coupling between the
    // wordmark image and the subtext that anchors the column width.
    <div>
      <div className="flex items-center gap-[5px]">
        <img
          src="/brand/logo/logolightmode.svg"
          alt="deheiyya star mark"
          className="h-[24px] w-[24px] object-contain shrink-0"
        />
        <div className="flex flex-col justify-center w-[148px]">
          <img
            src="/brand/wordmark/wordmarkblack.svg"
            alt="deheiyya"
            className="h-auto w-[254px] max-w-none -ml-[52px] object-contain shrink-0"
          />
          <div className="-mt-[9px] flex w-full items-center justify-between gap-[0.35em] text-[7px] tracking-[0.07em] text-black/60">
            <span className="whitespace-nowrap">CULTURE</span>
            <span className="text-[5px] text-[#A50100]">✦</span>
            <span className="whitespace-nowrap">SELF-EXPRESSION</span>
            <span className="text-[5px] text-[#A50100]">✦</span>
            <span className="whitespace-nowrap">YOU</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Show the cream bar once Scene 2 is halfway out of view: the hero
    // section's top has scrolled half a viewport past the top edge.
    const onScroll = () => {
      const hero = document.getElementById('hero-sequence')
      if (!hero) {
        setScrolled(window.scrollY > window.innerHeight * 0.7)
        return
      }
      setScrolled(hero.getBoundingClientRect().top <= -window.innerHeight * 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 text-black transition-colors duration-300',
        scrolled
          ? 'border-b border-black/10 bg-[#EDEBDE]/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-start px-6 lg:px-8">
        <a href="#top" aria-label="deheiyya home" onClick={() => setOpen(false)}>
          <BrandLockup />
        </a>

        <div className="hidden items-center gap-8 md:flex md:ml-12">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.22em] opacity-70 transition-opacity hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="ml-auto p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          className="border-t border-black/10 bg-[#EDEBDE] px-6 pb-6 pt-2 shadow-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-xs font-medium uppercase tracking-[0.22em] opacity-80"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
