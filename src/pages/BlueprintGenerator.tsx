import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Blueprint, PersonalityTrait, QuizResponse } from '../types';
import { cn } from '../lib/utils';

interface BlueprintGeneratorProps {
  quizResponses?: QuizResponse[];
  onSave?: (blueprint: Blueprint) => void;
}

export const BlueprintGenerator: React.FC<BlueprintGeneratorProps> = ({
  quizResponses = [],
  onSave,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'blueprint' | 'dossier' | 'recommendations' | 'insights'>('blueprint');

  const traits = useMemo(() => generateTraits(quizResponses), [quizResponses]);
  const recommendations = useMemo(() => generateRecommendations(), []);
  const culturalInsights = useMemo(() => generateCulturalInsights(), []);

  const blueprint: Blueprint = {
    id: `blueprint-${Date.now()}`,
    userId: 'temp-user',
    name: 'Personal Beauty & Style Dossier',
    description: 'Your tailored blueprint based on facial geometry, undertones, and cultural elegance',
    traits,
    avatar: {
      id: `avatar-${Date.now()}`,
      baseColor: '#380D12',
      pattern: 'heritage',
      style: 'cultural',
    },
    recommendations,
    culturalInsights,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F7F1E8] font-sans antialiased overflow-x-hidden pb-20">
      
      {/* Top Floating Bar */}
      <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/brand/kashkhati_motifs-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
            <img src="/brand/kashkhati_logo.png" alt="KASHKHATI" className="h-4 w-auto object-contain brightness-125" />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/library')}
              className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#F7F1E8] hover:bg-white/10 transition-colors"
            >
              Explore Library
            </button>
            <button 
              onClick={() => onSave?.(blueprint)}
              className="px-5 py-2 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-semibold text-xs hover:bg-white transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Blueprint</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dossier Content */}
      <main className="max-w-6xl mx-auto px-6 pt-32">
        
        {/* Dossier Header Banner */}
        <div className="text-center relative mb-12">
          <img src="/brand/kashkhati_motifs-pearl-bow.png" alt="Bow" className="h-10 w-auto mx-auto mb-4 object-contain" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#380D12] text-[10px] tracking-[0.25em] text-[#F7F1E8] border border-[#8B0E1A]/40 uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9C5A0]" />
            <span>AUTHENTICATED BEAUTY BLUEPRINT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#F7F1E8] leading-tight font-light">
            Your Personal Beauty Dossier
          </h1>
          <p className="text-sm sm:text-base text-[#F7F1E8]/60 mt-3 max-w-xl mx-auto font-light">
            An 8-dimensional analysis mapping facial proportions, skin undertones, hair texture, fragrance notes, and modest attire elegance.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: 'blueprint', label: 'OVERVIEW' },
            { id: 'dossier', label: 'AVATAR & REPORT' },
            { id: 'recommendations', label: 'RECOMMENDATIONS' },
            { id: 'insights', label: 'CULTURAL INSIGHTS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-[#F7F1E8] text-[#0D0D0D] shadow-lg"
                  : "text-[#F7F1E8]/60 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Blueprint Overview */}
        {activeTab === 'blueprint' && (
          <div className="space-y-8">
            {/* Visual Header Summary Card */}
            <div className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#131015] border border-white/10 p-8 sm:p-12 relative overflow-hidden">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] tracking-[0.25em] text-[#8B0E1A] uppercase font-semibold">YOUR UNIQUE HARMONY</span>
                <h2 className="text-3xl font-serif text-[#F7F1E8]">Warm Autumn • Classic Modest</h2>
                <p className="text-xs sm:text-sm text-[#F7F1E8]/70 leading-relaxed font-light">
                  You possess rich golden undertones with soft facial contrast. Terracotta, deep maroon, and warm olive shades naturally complement your complexion and hair depth.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-[#F7F1E8]/40 tracking-widest uppercase">UNDERTONE</div>
                    <div className="text-xs font-semibold text-[#F7F1E8] mt-1">Warm Golden</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-[#F7F1E8]/40 tracking-widest uppercase">FACE SHAPE</div>
                    <div className="text-xs font-semibold text-[#F7F1E8] mt-1">Soft Oval</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-[#F7F1E8]/40 tracking-widest uppercase">HAIR TYPE</div>
                    <div className="text-xs font-semibold text-[#F7F1E8] mt-1">Curly / Textured</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-[#F7F1E8]/40 tracking-widest uppercase">STYLE</div>
                    <div className="text-xs font-semibold text-[#F7F1E8] mt-1">Classic Hijab</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                  <img src="/brand/avatar_reference_1_curly_hair.png" alt="Avatar Preview" className="w-full h-80 object-cover object-top bg-[#F7F1E8]" />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15">
                    <img src="/brand/kashkhati_motifs-seal.png" alt="Seal" className="w-6 h-6 object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Trait Dimension Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {traits.map((trait) => (
                <div key={trait.id} className="p-6 rounded-3xl bg-[#131015] border border-white/10 space-y-4 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-medium text-[#F7F1E8]">{trait.name}</h3>
                    <span className="text-xs font-bold text-[#D9C5A0] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {trait.score}%
                    </span>
                  </div>
                  <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">{trait.description}</p>
                  
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#8B0E1A] to-[#D9C5A0] h-full rounded-full" style={{ width: `${trait.score}%` }} />
                  </div>

                  {trait.recommendations && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {trait.recommendations.map((rec, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-[#F7F1E8]/70 border border-white/10">
                          {rec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Full Avatar & Detailed Report */}
        {activeTab === 'dossier' && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-[#F7F1E8] text-[#0D0D0D] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#0D0D0D]/10">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#380D12] uppercase font-bold">FULL DETAILS DOSSIER</span>
                  <h2 className="text-3xl font-serif font-bold text-[#0D0D0D] mt-1">Report & Character Archetype</h2>
                </div>
                <img src="/brand/kashkhati_motifs-seal.png" alt="Seal Stamp" className="w-12 h-12 object-contain" />
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#0D0D0D]/10 shadow-lg">
                  <img src="/brand/avatar_reference_3_full_details_report.jpg" alt="Report Sheet" className="w-full h-auto object-cover" />
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8B0E1A]">CHARACTER VIBE & STYLE</div>
                    <h3 className="text-2xl font-serif text-[#0D0D0D]">Graceful, Modest & Timeless</h3>
                    <p className="text-xs text-[#0D0D0D]/80 leading-relaxed font-light">
                      Layered silk silhouettes, warm earth swatches, subtle rose blush, and structured blazers.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#0D0D0D]/10">
                    <div className="flex items-center gap-3 text-xs text-[#0D0D0D]">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0E1A]" />
                      <span>Custom color palette: Terracotta, Deep Burgundy, Warm Cream, Gold</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#0D0D0D]">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0E1A]" />
                      <span>Hair & Hijab framing suited for soft oval facial proportions</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#0D0D0D]">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0E1A]" />
                      <span>Fragrance pyramid: Oud, Musk, Bergamot, Warm Vanilla</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/library')}
                    className="mt-6 px-8 py-3.5 rounded-full bg-[#380D12] text-[#F7F1E8] text-xs font-semibold tracking-wider hover:bg-[#8B0E1A] transition-colors"
                  >
                    EXPLORE MATCHING LIBRARY GUIDES
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#131015] border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{rec.icon}</span>
                    <span className="text-[10px] tracking-widest text-[#D9C5A0] uppercase font-semibold">{rec.category}</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#F7F1E8]">{rec.title}</h3>
                  <p className="text-xs text-[#F7F1E8]/60 mt-2 leading-relaxed font-light">{rec.description}</p>
                </div>

                <button 
                  onClick={() => navigate(rec.link)}
                  className="mt-6 w-full py-3 rounded-full border border-white/15 text-xs text-[#F7F1E8] hover:bg-white hover:text-[#0D0D0D] transition-colors font-medium"
                >
                  EXPLORE RECOMMENDATION
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Cultural Insights */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {culturalInsights.map((insight) => (
              <div key={insight.id} className="p-8 rounded-3xl bg-[#131015] border-l-4 border-l-[#8B0E1A] border-y border-r border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif text-[#F7F1E8]">{insight.title}</h3>
                  <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D9C5A0] uppercase tracking-widest">
                    {insight.source}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#F7F1E8]/70 leading-relaxed font-light">{insight.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Bar Bottom */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/10 pt-8">
          <button 
            onClick={() => onSave?.(blueprint)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-semibold text-xs tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE BLUEPRINT TO PROFILE</span>
          </button>

          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 text-[#F7F1E8] text-xs font-semibold tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>SHARE DOSSIER</span>
          </button>

          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 text-[#F7F1E8] text-xs font-semibold tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF DOSSIER</span>
          </button>
        </div>

      </main>

    </div>
  );
};

// Helper Generators
function generateTraits(_responses: QuizResponse[]): PersonalityTrait[] {
  return [
    {
      id: 'trait-1',
      name: 'Facial Harmony & Proportions',
      description: 'Soft oval geometry with gentle arch features and warm golden balance',
      score: 88,
      category: 'Facial Geometry',
      recommendations: ['Contour jawline gently', 'Soft wing eyeliner'],
    },
    {
      id: 'trait-[#2]',
      name: 'Undertone & Color Spectrum',
      description: 'Warm Autumn with golden olive hues complementing rich burgundy and saffron',
      score: 92,
      category: 'Color Analysis',
      recommendations: ['Warm terracotta blush', 'Gold accents'],
    },
    {
      id: 'trait-3',
      name: 'Hair Texture & Framing',
      description: 'Defined natural curl volume suited for face-framing layers and breathable wrap',
      score: 84,
      category: 'Hair Care',
      recommendations: ['Hydrating argan oil', 'Silk scarf lining'],
    },
    {
      id: 'trait-4',
      name: 'Fragrance Architecture',
      description: 'Resinous base notes with Oud, Musk, and subtle Bergamot top notes',
      score: 90,
      category: 'Perfume Profile',
      recommendations: ['Oud layering', 'Pulse point application'],
    },
  ];
}

function generateRecommendations() {
  return [
    {
      title: 'Chapter I: The Guide to Makeup & Base Prep',
      description: 'Master step-by-step foundation matching for warm golden undertones.',
      category: 'Makeup Guide',
      icon: '💄',
      link: '/library',
    },
    {
      title: 'Chapter III: Modest Apparel & Structured Blazers',
      description: 'Explore tailored trousers, silk scarves, and classic silhouette pairings.',
      category: 'Style & Apparel',
      icon: '👔',
      link: '/library',
    },
    {
      title: 'Chapter V: Traditional Perfume & Fragrance Layering',
      description: 'Combine Bakhoor, Musk, and Rose oils for lasting warmth and projection.',
      category: 'Perfume Guide',
      icon: '✨',
      link: '/library',
    },
    {
      title: 'AI Studio Stylist & Wardrobe Generator',
      description: 'Create personalized daily outfits mapped to your style blueprint.',
      category: 'AI Studio',
      icon: '👑',
      link: '/studio',
    },
  ];
}

function generateCulturalInsights() {
  return [
    {
      id: 'insight-1',
      title: 'Modesty as High Fashion Elegance',
      content: 'True luxury lies in intentional tailoring, flowing fabrics, and harmonious color palettes that honor personal values without compromising sophistication.',
      category: 'wisdom' as const,
      source: 'KASHKHATI Philosophy',
      language: 'en' as const,
    },
    {
      id: 'insight-2',
      title: 'The Heritage of Botanical Perfumery & Bakhoor',
      content: 'Fragrance in Eastern culture is an art form of hospitality and self-care. Layering natural oils with incense creates a signature scent projection.',
      category: 'practice' as const,
      source: 'Cultural Studies',
      language: 'en' as const,
    },
  ];
}
