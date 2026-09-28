import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const LINKS = [
  { label: 'Discover', href: '#discover' },
  { label: 'Library', href: '#library' },
  { label: 'Pricing', href: '#pricing' },
]

function BrandLockup() {
  return (
    // Scaled as one group so logo, wordmark, and subtext keep their proportions
    <div style={{ zoom: 0.52 }}>
      <div className="flex items-center gap-2.5">
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
    </div>
  )
}

export function LandingNavbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7)
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
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#top" aria-label="deheiyya home" onClick={() => setOpen(false)}>
          <BrandLockup />
        </a>

        <div className="hidden items-center gap-8 md:flex">
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

        <div className="hidden md:block">
          <button
            onClick={() => navigate('/quiz')}
            className="rounded-[10px] bg-[#A50100] px-5 py-2.5 text-xs font-medium tracking-wider text-[#EDEBDE] shadow-[0_10px_30px_rgba(165,1,0,0.35)] transition-colors hover:bg-[#7d0100]"
          >
            BEGIN YOUR JOURNEY
          </button>
        </div>

        <button
          className="p-2 md:hidden"
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
            <button
              onClick={() => navigate('/quiz')}
              className="mt-3 rounded-[10px] bg-[#A50100] px-5 py-3 text-xs font-medium tracking-wider text-[#EDEBDE]"
            >
              BEGIN YOUR JOURNEY
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
