import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import type { LibraryContent } from '../types';
import { cn } from '../lib/utils';

const SAMPLE_LIBRARY: LibraryContent[] = [
  {
    id: '1',
    title: 'Chapter I: The Guide to Makeup & Base Prep',
    description: 'Step-by-step foundation matching for warm, cool, and neutral undertones. Precision eyeliner techniques and skin prep.',
    content: 'Full editorial guide covering prep & base, liquid liner wings, blush placement, and lip contouring...',
    category: 'wisdom',
    subcategory: 'Makeup & Beauty',
    tags: ['makeup', 'undertone', 'eyeliner', 'prep'],
    language: 'en',
    author: 'deheiyya Editorial',
    source: 'Beauty Dossier Vol. I',
    readTime: 12,
    difficulty: 'beginner',
    cultural_relevance: 98,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Chapter II: Hairstyle & Clothing Silhouette Guide',
    description: 'Face-framing cuts, refined bobs, tailored trousers, and structured blazers curated for classic modesty.',
    content: 'Full guide covering haircut geometry, high-waisted trouser styling, and professional blazers...',
    category: 'practices',
    subcategory: 'Apparel & Hair',
    tags: ['hairstyle', 'apparel', 'modest', 'blazer'],
    language: 'en',
    author: 'deheiyya Editorial',
    source: 'Beauty Dossier Vol. II',
    readTime: 10,
    difficulty: 'intermediate',
    cultural_relevance: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Chapter III: Fragrance Pyramid & Botanical Oils',
    description: 'Understanding top, middle, and base notes. The heritage of layering Oud, Musk, Rose, and Bakhoor.',
    content: 'Comprehensive fragrance guide on perfume application, pulse points, storage, and oil layering...',
    category: 'values',
    subcategory: 'Fragrance & Scent',
    tags: ['perfume', 'oud', 'musk', 'layering'],
    language: 'en',
    author: 'deheiyya Editorial',
    source: 'Beauty Dossier Vol. III',
    readTime: 15,
    difficulty: 'advanced',
    cultural_relevance: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage] = useState<string>('all');

  const filteredContent = SAMPLE_LIBRARY.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesLanguage =
      selectedLanguage === 'all' || item.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-black text-[#F7F1E8] font-sans antialiased overflow-x-hidden pb-20">
      
      {/* Header Bar */}
      <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
            <img src="/brand/deheiyya_logo.png" alt="deheiyya" className="h-4 w-auto object-contain brightness-125" />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/blueprint')}
              className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#F7F1E8] hover:bg-white/10 transition-colors"
            >
              My Blueprint
            </button>
            <button 
              onClick={() => navigate('/quiz')}
              className="px-5 py-2 rounded-full bg-[#F7F1E8] text-[#0D0D0D] font-semibold text-xs hover:bg-white transition-colors"
            >
              Take Assessment
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img src="/brand/deheiyya_motifs-pearl-bow.png" alt="Pearl Bow" className="h-10 w-auto mx-auto mb-4 object-contain" />
          
          <span className="px-4 py-1.5 rounded-full bg-[#380D12] text-[10px] tracking-[0.25em] text-[#F7F1E8] border border-[#8B0E1A]/40 uppercase font-semibold">
            THE CULTURAL BEAUTY LIBRARY
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#F7F1E8] font-light mt-4">
            Curated Hardbound Guides
          </h1>
          <p className="text-sm sm:text-base text-[#F7F1E8]/60 mt-3 font-light leading-relaxed">
            Explore 8 chapters of research-backed editorial guides covering makeup prep, hairstyle silhouettes, fragrance layering, and modest fashion.
          </p>
        </div>

        {/* Hardbound Book Covers Showcase Carousel Grid */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Book 1: Makeup */}
          <div className="rounded-3xl bg-[#131015] border border-white/10 overflow-hidden group hover:border-[#8B0E1A]/50 transition-all duration-300">
            <div className="relative h-72 overflow-hidden bg-[#F7F1E8]">
              <img src="/brand/product_design1.png" alt="Makeup Guide" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15">
                <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <span className="text-[10px] tracking-widest text-[#8B0E1A] uppercase font-bold">VOL I • MAKEUP & BASE</span>
              <h3 className="text-xl font-serif text-[#F7F1E8]">The Guide to Makeup</h3>
              <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">
                Step-by-step foundation matching, liquid eyeliner precision, contouring, and lip color harmony.
              </p>
            </div>
          </div>

          {/* Book 2: Apparel & Hair */}
          <div className="rounded-3xl bg-[#131015] border border-white/10 overflow-hidden group hover:border-[#8B0E1A]/50 transition-all duration-300">
            <div className="relative h-72 overflow-hidden bg-[#F7F1E8]">
              <img src="/brand/product_design2.png" alt="Apparel Guide" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15">
                <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <span className="text-[10px] tracking-widest text-[#8B0E1A] uppercase font-bold">VOL II • APPAREL & HAIR</span>
              <h3 className="text-xl font-serif text-[#F7F1E8]">Hairstyle & Clothing Guide</h3>
              <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">
                Refined bobs, high-waisted tapered trousers, structured blazers, and modest attire layering.
              </p>
            </div>
          </div>

          {/* Book 3: Fragrance */}
          <div className="rounded-3xl bg-[#131015] border border-white/10 overflow-hidden group hover:border-[#8B0E1A]/50 transition-all duration-300">
            <div className="relative h-72 overflow-hidden bg-[#F7F1E8]">
              <img src="/brand/product_design3.png" alt="Perfume Guide" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15">
                <img src="/brand/deheiyya_motifs-seal.png" alt="Seal" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <span className="text-[10px] tracking-widest text-[#D9C5A0] uppercase font-bold">VOL III • PERFUME & SCENT</span>
              <h3 className="text-xl font-serif text-[#F7F1E8]">Guide to Perfume & Notes</h3>
              <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">
                Fragrance pyramid, application pulse points, Bakhoor incense, and natural botanical oil layering.
              </p>
            </div>
          </div>

        </div>

        {/* Search & Filter Controls */}
        <div className="mb-10 p-6 rounded-3xl bg-[#131015] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#F7F1E8]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chapters, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs text-[#F7F1E8] placeholder-[#F7F1E8]/40 focus:outline-none focus:border-[#8B0E1A]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            <div className="flex items-center gap-2 text-xs text-[#F7F1E8]/60">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </div>
            {['all', 'wisdom', 'practices', 'values'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium tracking-wider capitalize transition-all",
                  selectedCategory === cat
                    ? "bg-[#F7F1E8] text-[#0D0D0D]"
                    : "bg-white/5 border border-white/10 text-[#F7F1E8]/70 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Library Content Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div 
              key={item.id} 
              className="p-8 rounded-3xl bg-[#131015] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#F7F1E8]/50">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-widest text-[#D9C5A0] uppercase font-semibold">
                    {item.subcategory}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8B0E1A]" />
                    <span>{item.readTime} min read</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-[#F7F1E8] group-hover:text-[#D9C5A0] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#F7F1E8]/60 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-[#F7F1E8]/50 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#F7F1E8]/40">{item.author}</span>
                <button 
                  onClick={() => navigate('/blueprint')}
                  className="text-xs font-semibold tracking-wider text-[#F7F1E8] hover:text-[#D9C5A0] transition-colors flex items-center gap-1"
                >
                  <span>READ CHAPTER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
};

