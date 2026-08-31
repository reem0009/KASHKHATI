import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Save, Crown, ShieldCheck, Check } from 'lucide-react';
import type { AvatarConfig } from '../types';
import { cn } from '../lib/utils';

interface AvatarGeneratorProps {
  onSave?: (config: AvatarConfig) => void;
}

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ onSave }) => {
  const navigate = useNavigate();
  const [activeAvatar, setActiveAvatar] = useState<'curly' | 'sleek' | 'report'>('curly');

  const [config, setConfig] = useState<AvatarConfig>({
    id: `avatar-${Date.now()}`,
    baseColor: '#380D12',
    pattern: 'mandalas',
    style: 'cultural',
    accessories: [],
  });

  const handleRandomize = () => {
    const avatars: ('curly' | 'sleek' | 'report')[] = ['curly', 'sleek', 'report'];
    const next = avatars[Math.floor(Math.random() * avatars.length)];
    setActiveAvatar(next);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F7F1E8] font-sans antialiased overflow-x-hidden pb-20">
      
      {/* Header Bar */}
      <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/brand/kashkhati_motifs-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
            <img src="/brand/kashkhati_logo.png" alt="KASHKHATI" className="h-4 w-auto object-contain brightness-125" />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/blueprint')}
              className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#F7F1E8] hover:bg-white/10 transition-colors"
            >
              My Blueprint
            </button>
            <button 
              onClick={() => onSave?.(config)}
              className="px-5 py-2 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-semibold text-xs hover:bg-white transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Avatar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-32">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img src="/brand/kashkhati_motifs-pearl-bow.png" alt="Pearl Bow" className="h-10 w-auto mx-auto mb-4 object-contain" />
          
          <span className="px-4 py-1.5 rounded-full bg-[#380D12] text-[10px] tracking-[0.25em] text-[#F7F1E8] border border-[#8B0E1A]/40 uppercase font-semibold">
            AVATAR & DOSSIER VISUALIZER
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#F7F1E8] font-light mt-4">
            Personalized Beauty Portrait
          </h1>
          <p className="text-sm sm:text-base text-[#F7F1E8]/60 mt-3 font-light leading-relaxed">
            Configure hair texture, skin undertone, modesty hijab wrap, and aesthetic archetype to generate your personal dossier portrait.
          </p>
        </div>

        {/* Generator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Preview Canvas (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#131015] border border-white/10 p-8 sm:p-12 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl">
            
            <div className="w-full flex items-center justify-between text-xs text-[#F7F1E8]/60 mb-6">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B0E1A]" />
                <span>AUTHENTICATED PORTRAIT</span>
              </span>
              <span className="tracking-widest uppercase text-[10px] text-[#D9C5A0]">HIGH RESOLUTION</span>
            </div>

            {/* Avatar Frame Display */}
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/15 bg-[#F7F1E8] shadow-2xl flex items-center justify-center p-2">
              
              {activeAvatar === 'curly' && (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src="/brand/avatar_reference_1_curly_hair.png" 
                  alt="Curly Hair Portrait" 
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              )}

              {activeAvatar === 'sleek' && (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src="/brand/avatar_reference_2_sleek_hair.png" 
                  alt="Sleek Hair Portrait" 
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              )}

              {activeAvatar === 'report' && (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src="/brand/avatar_reference_3_full_details_report.jpg" 
                  alt="Full Details Report Sheet" 
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              )}

              {/* Wax Seal Overlay Badge */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15 shadow-xl">
                <img src="/brand/kashkhati_motifs-seal.png" alt="Seal" className="w-7 h-7 object-contain" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 w-full">
              <button 
                onClick={handleRandomize}
                className="flex-1 py-3.5 rounded-full border border-white/15 text-xs text-[#F7F1E8] hover:bg-white/10 transition-colors font-semibold tracking-wider flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RANDOMIZE PROFILE</span>
              </button>

              <button 
                onClick={() => onSave?.(config)}
                className="flex-1 py-3.5 rounded-full bg-[#F7F1E8] text-[#0D0D0D] text-xs font-semibold tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>APPLY TO DOSSIER</span>
              </button>
            </div>

          </div>

          {/* Right Controls Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Style Preset Selectors */}
            <div className="p-6 rounded-3xl bg-[#131015] border border-white/10 space-y-4">
              <span className="text-[10px] tracking-widest text-[#8B0E1A] uppercase font-bold">SELECT PORTRAIT TYPE</span>
              <h3 className="text-lg font-serif text-[#F7F1E8]">Hair & Modesty Silhouette</h3>

              <div className="grid gap-3">
                {[
                  { id: 'curly', label: 'Natural Curly Volume', sub: 'Defined textured curls' },
                  { id: 'sleek', label: 'Sleek Minimal Contour', sub: 'Polished face-framing' },
                  { id: 'report', label: 'Full Character Dossier Sheet', sub: 'Detailed outfit & expression breakdown' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveAvatar(item.id as any)}
                    className={cn(
                      "p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between",
                      activeAvatar === item.id
                        ? "bg-[#380D12]/60 border-[#8B0E1A] text-white"
                        : "bg-white/5 border-white/10 text-[#F7F1E8]/70 hover:bg-white/10"
                    )}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-[#F7F1E8]/50 mt-0.5">{item.sub}</div>
                    </div>
                    {activeAvatar === item.id && <Check className="w-4 h-4 text-[#D9C5A0]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette Controls */}
            <div className="p-6 rounded-3xl bg-[#131015] border border-white/10 space-y-4">
              <span className="text-[10px] tracking-widest text-[#D9C5A0] uppercase font-bold">ACCENT PALETTE</span>
              <h3 className="text-lg font-serif text-[#F7F1E8]">Underlying Complexion Hue</h3>

              <div className="flex gap-3">
                {['#380D12', '#8B0E1A', '#0D0D0D', '#F7F1E8', '#D9C5A0', '#8A7A6E'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setConfig({ ...config, baseColor: color })}
                    className={cn(
                      "w-9 h-9 rounded-full border-2 transition-transform",
                      config.baseColor === color ? "scale-110 border-white shadow-lg" : "border-white/20 hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* AI Studio Banner CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#380D12] to-[#0D0D0D] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D9C5A0]">
                <Crown className="w-4 h-4" />
                <span>AI STUDIO STYLIST</span>
              </div>
              <p className="text-xs text-[#F7F1E8]/70 font-light">
                Generate 3D clothing silhouettes, silk scarves, and complete wardrobe pairings with AI.
              </p>
              <button 
                onClick={() => navigate('/studio')}
                className="w-full py-2.5 rounded-full bg-white text-[#0D0D0D] text-xs font-semibold tracking-wider hover:bg-white/90 transition-colors"
              >
                ENTER STYLIST STUDIO
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
