import { useState, useMemo } from 'react';
import type { Blueprint, PersonalityTrait, QuizResponse } from '../types';
import { Card, CardBody, Badge, Button } from '../components/ui';

interface BlueprintGeneratorProps {
  quizResponses: QuizResponse[];
  onSave?: (blueprint: Blueprint) => void;
}

export const BlueprintGenerator: React.FC<BlueprintGeneratorProps> = ({
  quizResponses: _quizResponses,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'traits' | 'recommendations' | 'insights'>('traits');

  // حساب السمات بناءً على الإجابات
  const traits = useMemo(() => generateTraits(_quizResponses), [_quizResponses]);

  // توليد التوصيات
  const recommendations = useMemo(
    () => generateRecommendations(),
    []
  );

  // رؤى ثقافية
  const culturalInsights = useMemo(
    () => generateCulturalInsights(),
    []
  );

  const blueprint: Blueprint = {
    id: `blueprint-${Date.now()}`,
    userId: 'temp-user',
    name: `${traits[0]?.name || 'Personal'} Blueprint`,
    description: `Your personalized blueprint based on your unique traits and values`,
    traits,
    avatar: {
      id: `avatar-${Date.now()}`,
      baseColor: '#ffc933',
      pattern: 'mandalas',
      style: 'cultural',
    },
    recommendations,
    culturalInsights,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="container-lg mx-auto py-2xl">
      <div className="mb-2xl">
        <h1 className="text-4xl font-bold mb-md">✨ خريطتك الشخصية / Your Blueprint</h1>
        <p className="text-neutral-600">
          اكتشف ملفك الشخصي الفريد والموارد المخصصة لتطويرك / Discover your unique profile and personalized resources
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-md mb-2xl border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('traits')}
          className={`px-lg py-md font-medium transition-colors ${
            activeTab === 'traits'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          السمات / Traits
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-lg py-md font-medium transition-colors ${
            activeTab === 'recommendations'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          التوصيات / Recommendations
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-lg py-md font-medium transition-colors ${
            activeTab === 'insights'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          رؤى ثقافية / Cultural Insights
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2xl mb-2xl">
        {activeTab === 'traits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {traits.map((trait) => (
              <Card key={trait.id} hoverable>
                <CardBody>
                  <div className="flex-between mb-md">
                    <h3 className="text-lg font-semibold">{trait.name}</h3>
                    <Badge variant="primary">{trait.score}%</Badge>
                  </div>
                  <p className="text-neutral-600 text-sm mb-lg">
                    {trait.description}
                  </p>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${trait.score}%` }}
                    />
                  </div>
                  <div className="mt-md">
                    <p className="text-xs text-neutral-500 font-medium mb-md">
                      {trait.category}
                    </p>
                    {trait.recommendations && (
                      <div className="flex flex-wrap gap-xs">
                        {trait.recommendations.slice(0, 2).map((rec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {rec}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-lg">
            {recommendations.map((rec, idx) => (
              <Card key={idx}>
                <CardBody>
                  <div className="flex gap-lg">
                    <div className="text-3xl flex-shrink-0">
                      {getRecommendationIcon(rec.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-md">{rec.title}</h3>
                      <p className="text-neutral-600 mb-md">{rec.description}</p>
                      <div className="flex flex-wrap gap-md">
                        <Button variant="outline" className="flex-1">
                          اقرأ المزيد / Learn More
                        </Button>
                        {rec.link && (
                          <Button variant="primary" className="flex-1">
                            ابدأ / Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-lg">
            {culturalInsights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-primary-500">
                <CardBody>
                  <div className="flex-between mb-md">
                    <h3 className="text-lg font-semibold">{insight.title}</h3>
                    <Badge variant="primary">{insight.category}</Badge>
                  </div>
                  <p className="text-neutral-600 mb-lg leading-relaxed">
                    {insight.content}
                  </p>
                  <div className="flex items-center gap-md text-sm text-neutral-500">
                    <span>📚 {insight.source}</span>
                    <span>🌐 {insight.language === 'ar' ? 'العربية' : 'English'}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-lg">
        <Button
          variant="primary"
          onClick={() => onSave?.(blueprint)}
          className="flex-1"
        >
          💾 حفظ الخريطة / Save Blueprint
        </Button>
        <Button variant="outline" className="flex-1">
          🔗 مشاركة / Share
        </Button>
        <Button variant="outline" className="flex-1">
          📥 تحميل PDF / Download
        </Button>
      </div>
    </div>
  );
};

// Helper functions
function generateTraits(_responses: QuizResponse[]): PersonalityTrait[] {
  return [
    {
      id: 'trait-1',
      name: 'الإبداعية / Creativity',
      description: 'قدرتك على توليد أفكار جديدة وحلول مبتكرة / Your ability to generate new ideas',
      score: 85,
      category: 'الشخصية / Personality',
      recommendations: ['رسم', 'كتابة', 'تصميم'],
    },
    {
      id: 'trait-2',
      name: 'التعاطف / Empathy',
      description: 'قدرتك على فهم مشاعر الآخرين والتعاطف معهم / Understanding others emotions',
      score: 78,
      category: 'الشخصية / Personality',
      recommendations: ['التطوع', 'الاستشارة', 'القيادة'],
    },
    {
      id: 'trait-3',
      name: 'المرونة / Adaptability',
      description: 'قدرتك على التكيف مع التغييرات والتحديات / Ability to adapt to changes',
      score: 72,
      category: 'القوة / Strength',
      recommendations: ['تعلم جديد', 'تحديات', 'سفر'],
    },
    {
      id: 'trait-4',
      name: 'القيادة / Leadership',
      description: 'قدرتك على قيادة الفريق والتأثير على الآخرين / Ability to lead teams',
      score: 68,
      category: 'القوة / Strength',
      recommendations: ['إدارة مشاريع', 'توجيه الفريق', 'التطوير'],
    },
    {
      id: 'trait-5',
      name: 'التركيز / Focus',
      description: 'قدرتك على التركيز والانضباط في العمل / Ability to concentrate',
      score: 82,
      category: 'القوة / Strength',
      recommendations: ['التأمل', 'تخطيط العمل', 'الأهداف'],
    },
    {
      id: 'trait-6',
      name: 'الاتصال / Communication',
      description: 'قدرتك على التعبير الفعال والاستماع الجيد / Effective communication skills',
      score: 75,
      category: 'المهارة / Skill',
      recommendations: ['التحدث أمام الجمهور', 'الكتابة', 'الاستماع'],
    },
  ];
}

function generateRecommendations() {
  return [
    {
      title: 'استكشف مسارات التطوير / Explore Development Paths',
      description:
        'بناءً على سماتك، نوصي باستكشاف مجالات تتطلب الإبداعية والتعاطف',
      category: 'تطوير / Development',
      icon: '🎯',
      link: '/development-paths',
    },
    {
      title: 'تحسين مهارات التواصل / Improve Communication',
      description:
        'دورة تدريبية شاملة لتعزيز مهاراتك في الاتصال الفعال',
      category: 'مهارات / Skills',
      icon: '💬',
      link: '/communication-course',
    },
    {
      title: 'ممارسة التأمل واليقظة الذهنية / Mindfulness Practice',
      description:
        'برنامج شامل لتطوير التركيز والوعي الذاتي من خلال التأمل',
      category: 'رفاهية / Wellbeing',
      icon: '🧘',
      link: '/mindfulness',
    },
    {
      title: 'القيادة والإدارة / Leadership & Management',
      description:
        'برنامج متقدم لتطوير مهارات القيادة والإدارة الفعالة',
      category: 'قيادة / Leadership',
      icon: '👥',
      link: '/leadership',
    },
  ];
}

function generateCulturalInsights() {
  return [
    {
      id: 'insight-1',
      title: 'الإبداعية في التراث الإسلامي / Creativity in Islamic Heritage',
      content:
        'يُعتبر الإبداع قيمة أساسية في الثقافة الإسلامية. تشجع الآيات القرآنية على التفكير والابتكار في حل مشاكل المجتمع.',
      category: 'wisdom' as const,
      source: 'Islamic Philosophy',
      language: 'ar' as const,
    },
    {
      id: 'insight-2',
      title: 'The Balance of Empathy and Justice',
      content:
        'في الإسلام، التعاطف يجب أن يكون مرفوقاً بالعدل. الرسول الكريم علم أصحابه أن الرحمة تجب معها الحكمة والعدل.',
      category: 'value' as const,
      source: 'Islamic Ethics',
      language: 'en' as const,
    },
    {
      id: 'insight-3',
      title: 'المرونة والصبر في الحياة',
      content:
        'تعاليم الإسلام تركز على المرونة والصبر في مواجهة التحديات. المرونة تساعدك على التكيف دون فقدان مبادئك.',
      category: 'practice' as const,
      source: 'Quranic Teachings',
      language: 'ar' as const,
    },
  ];
}

function getRecommendationIcon(category: string): string {
  const icons: Record<string, string> = {
    'تطوير / Development': '📈',
    'مهارات / Skills': '🎓',
    'رفاهية / Wellbeing': '🌟',
    'قيادة / Leadership': '👑',
  };
  return icons[category] || '💡';
}
