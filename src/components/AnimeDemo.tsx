import { useEffect, useRef } from 'react';
import { fadeInUp, fadeInStagger, pearlShimmer, scaleIn, luxuryShimmer } from '../lib/anime';

/**
 * Anime.js Demo Component
 * Showcases various animation utilities for deheiyya
 */
export const AnimeDemo = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pearlRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section on mount
    if (heroRef.current) {
      fadeInUp(heroRef.current, 200);
    }

    // Animate cards with stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.demo-card');
      fadeInStagger(cards);
    }

    // Pearl shimmer effect
    if (pearlRef.current) {
      pearlShimmer(pearlRef.current);
    }

    // Luxury shimmer for badge
    if (shimmerRef.current) {
      luxuryShimmer(shimmerRef.current);
    }
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    scaleIn(e.currentTarget, 0);
  };

  return (
    <div className="min-h-screen bg-black text-[#F7F1E8] p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16 opacity-0">
          <img 
            ref={pearlRef}
            src="/brand/deheiyya_motifs-pearl-bow.png" 
            alt="Pearl Bow" 
            className="h-10 w-auto mx-auto mb-4 object-contain"
          />
          
          <div 
            ref={shimmerRef}
            className="inline-block px-4 py-1.5 rounded-full bg-[#380D12] text-[10px] tracking-[0.25em] text-[#F7F1E8] border border-[#8B0E1A]/40 uppercase font-semibold mb-4"
          >
            ANIME.JS V4 INTEGRATION DEMO
          </div>

          <h1 className="text-5xl font-serif text-[#F7F1E8] font-light mt-4">
            Luxury Animations Showcase
          </h1>
          <p className="text-sm text-[#F7F1E8]/60 mt-3 font-light">
            Click any card below to see scale animation
          </p>
        </div>

        {/* Demo Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Fade In Up', desc: 'Elegant entrance animation with vertical slide' },
            { title: 'Stagger Effect', desc: 'Sequential animations for list items' },
            { title: 'Scale In', desc: 'Smooth scale animation for cards' },
            { title: 'Pearl Shimmer', desc: 'Infinite loop shimmer for brand motifs' },
            { title: 'Progress Fill', desc: 'Animated progress bar expansion' },
            { title: 'Luxury Shimmer', desc: 'Subtle glow effect for premium elements' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={handleCardClick}
              className="demo-card p-8 rounded-3xl bg-[#131015] border border-white/10 cursor-pointer opacity-0 hover:border-[#8B0E1A]/50 transition-colors"
            >
              <div className="text-xs tracking-widest text-[#8B0E1A] uppercase font-bold mb-2">
                DEMO {idx + 1}
              </div>
              <h3 className="text-xl font-serif text-[#F7F1E8] mb-2">{item.title}</h3>
              <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Animation Info */}
        <div className="mt-16 p-8 rounded-3xl bg-[#380D12]/30 border border-white/10">
          <h2 className="text-2xl font-serif text-[#F7F1E8] mb-4">Available Animations</h2>
          <ul className="space-y-2 text-sm text-[#F7F1E8]/70">
            <li>• <code className="text-[#D9C5A0]">fadeInUp()</code> - Fade in with upward slide</li>
            <li>• <code className="text-[#D9C5A0]">fadeInStagger()</code> - Sequential fade for multiple elements</li>
            <li>• <code className="text-[#D9C5A0]">scaleIn()</code> - Scale and fade entrance</li>
            <li>• <code className="text-[#D9C5A0]">slideInLeft() / slideInRight()</code> - Horizontal slide entrances</li>
            <li>• <code className="text-[#D9C5A0]">pearlShimmer()</code> - Infinite shimmer for brand motifs</li>
            <li>• <code className="text-[#D9C5A0]">progressFill()</code> - Animated progress bars</li>
            <li>• <code className="text-[#D9C5A0]">rotateSeal()</code> - Wax seal rotation</li>
            <li>• <code className="text-[#D9C5A0]">countUp()</code> - Number counter animation</li>
            <li>• <code className="text-[#D9C5A0]">revealText()</code> - Character-by-character reveal</li>
            <li>• <code className="text-[#D9C5A0]">luxuryShimmer()</code> - Subtle glow effect</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

