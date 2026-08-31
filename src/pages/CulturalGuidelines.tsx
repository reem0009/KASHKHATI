import { useState } from 'react';
import { Card, CardBody, Badge, Button } from '../components/ui';

export const CulturalGuidelines: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('wisdom');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const guidelines = getCulturalGuidelines();
  const filteredGuidelines = guidelines.filter(g => g.category === selectedCategory);

  const categories = [
    { id: 'wisdom', label: 'الحكمة / Wisdom', icon: '🧠' },
    { id: 'values', label: 'القيم / Values', icon: '💎' },
    { id: 'practices', label: 'الممارسات / Practices', icon: '🙏' },
    { id: 'heritage', label: 'التراث / Heritage', icon: '🏛️' },
  ];

  return (
    <div className="container-lg mx-auto py-2xl">
      {/* Header */}
      <div className="mb-3xl">
        <h1 className="text-4xl font-bold mb-md">
          🌏 المبادئ الثقافية / Cultural Guidelines
        </h1>
        <p className="text-neutral-600 text-lg">
          استكشف المبادئ والقيم الثقافية التي تشكل هويتك وتوجه قراراتك /
          Explore cultural principles and values that shape your identity
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-3xl">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-lg rounded-lg border-2 transition-all text-center ${
              selectedCategory === category.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-3xl mb-md">{category.icon}</div>
            <p className="font-semibold text-neutral-900">{category.label}</p>
          </button>
        ))}
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl mb-3xl">
        {filteredGuidelines.map(guideline => (
          <Card
            key={guideline.id}
            hoverable
            onClick={() => setExpandedInsight(expandedInsight === guideline.id ? null : guideline.id)}
            className="cursor-pointer"
          >
            <CardBody>
              <div className="flex-between mb-md">
                <h3 className="text-lg font-semibold pr-lg">{guideline.title}</h3>
                <span className="text-2xl flex-shrink-0">{guideline.icon}</span>
              </div>

              <p className="text-neutral-600 text-sm mb-lg line-clamp-2">
                {guideline.shortDescription}
              </p>

              {expandedInsight === guideline.id && (
                <div className="mt-lg pt-lg border-t border-neutral-200 space-y-md">
                  <p className="text-neutral-700 leading-relaxed">
                    {guideline.fullDescription}
                  </p>

                  {guideline.islamicReference && (
                    <div className="bg-primary-50 p-md rounded-lg">
                      <p className="text-sm font-semibold text-primary-900 mb-md">
                        📖 المرجع الإسلامي / Islamic Reference:
                      </p>
                      <p className="text-sm text-primary-800">
                        {guideline.islamicReference}
                      </p>
                    </div>
                  )}

                  {guideline.practicalTips && (
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 mb-md">
                        💡 نصائح عملية / Practical Tips:
                      </p>
                      <ul className="space-y-sm">
                        {guideline.practicalTips.map((tip, idx) => (
                          <li key={idx} className="flex gap-md text-sm text-neutral-700">
                            <span className="text-primary-600">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {guideline.relatedValues && (
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 mb-md">
                        🔗 قيم ذات صلة / Related Values:
                      </p>
                      <div className="flex flex-wrap gap-md">
                        {guideline.relatedValues.map(value => (
                          <Badge key={value} variant="primary">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {expandedInsight !== guideline.id && (
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  اقرأ المزيد ↓ / Read More ↓
                </button>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Integration Section */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardBody>
          <h2 className="text-2xl font-bold mb-lg">
            🎯 تطبيق هذه المبادئ / Apply These Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div>
              <h3 className="font-semibold mb-md">في حياتك الشخصية</h3>
              <ul className="space-y-sm text-sm text-neutral-700">
                <li>• تأمل يومي عن القيم</li>
                <li>• ممارسة الصبر والحكمة</li>
                <li>• بناء علاقات قوية</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-md">في عملك</h3>
              <ul className="space-y-sm text-sm text-neutral-700">
                <li>• قيادة أخلاقية</li>
                <li>• احترام الآخرين</li>
                <li>• العمل بنزاهة</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-md">في مجتمعك</h3>
              <ul className="space-y-sm text-sm text-neutral-700">
                <li>• التطوع والمساعدة</li>
                <li>• نشر المعرفة</li>
                <li>• خدمة الآخرين</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* CTA */}
      <div className="flex gap-lg justify-center mt-3xl">
        <Button variant="primary" className="px-2xl">
          🎓 الدورة التدريبية / Take Course
        </Button>
        <Button variant="outline" className="px-2xl">
          📚 استكشف المزيد / Explore More
        </Button>
      </div>
    </div>
  );
};

function getCulturalGuidelines(): Array<{
  id: string;
  title: string;
  icon: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  islamicReference?: string;
  practicalTips?: string[];
  relatedValues?: string[];
  source: string;
  language: string;
}> {
  return [
    {
      id: 'wisdom-1',
      title: 'الحكمة والعقل / Wisdom & Intellect',
      icon: '🧠',
      category: 'wisdom',
      shortDescription: 'استخدام العقل والتفكير النقدي في اتخاذ القرارات',
      fullDescription:
        'الحكمة هي جزء أساسي من الثقافة الإسلامية. تشجع على استخدام العقل والتفكير النقدي. الله يطلب منا أن نتدبر ونتفكر في آياته. الحكماء يتخذون قرارات بناءً على المعرفة والخبرة والتأمل.',
      islamicReference:
        'قال تعالى: "قل هذه سبيلي أدعو إلى الله على بصيرة" - يوسف 108',
      practicalTips: [
        'اقرأ وتعلم باستمرار',
        'استمع لآراء الآخرين بانفتاح',
        'فكر قبل أن تتخذ قرارات مهمة',
        'ابحث عن النصيحة من الحكماء',
      ],
      relatedValues: ['المعرفة', 'التعلم', 'التفكير النقدي'],
      source: 'Islamic Philosophy',
      language: 'ar',
    },
    {
      id: 'wisdom-2',
      title: 'Compassion & Mercy / الرحمة والعطف',
      icon: '❤️',
      category: 'wisdom',
      shortDescription: 'Treating others with kindness and understanding',
      fullDescription:
        'The Prophet Muhammad taught that compassion is a fundamental value. He showed mercy to all creatures, from the least to the greatest. Compassion brings people together and creates harmony in society.',
      islamicReference:
        'The Prophet said: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on earth, and the One in the heavens will have mercy upon you."',
      practicalTips: [
        'Practice active listening',
        'Show kindness without expectation',
        'Help those in need',
        'Forgive mistakes and shortcomings',
      ],
      relatedValues: ['الرحمة', 'اللطف', 'العطف'],
      source: 'Hadith',
      language: 'en',
    },
    {
      id: 'values-1',
      title: 'العدل والإنصاف / Justice & Fairness',
      icon: '⚖️',
      category: 'values',
      shortDescription: 'المعاملة العادلة والإنصاف مع الجميع',
      fullDescription:
        'العدل قيمة أساسية في الإسلام. تطلب منا أن نعامل الناس بعدل وإنصاف، بغض النظر عن انتماءاتهم. العدل يشمل المعاملة، الحكم، والتوزيع العادل للموارد.',
      islamicReference:
        'قال تعالى: "إن الله يأمر بالعدل والإحسان" - النحل 90',
      practicalTips: [
        'استمع لجميع الأطراف قبل الحكم',
        'لا تفضل أحد على آخر بسبب النسب أو المال',
        'ادعم القضايا العادلة',
        'تجنب الظلم بكل أشكاله',
      ],
      relatedValues: ['الإنصاف', 'المساواة', 'الحق'],
      source: 'Quranic Teachings',
      language: 'ar',
    },
    {
      id: 'values-2',
      title: 'Integrity & Honesty / الصدق والأمانة',
      icon: '✨',
      category: 'values',
      shortDescription: 'Being truthful and trustworthy in all dealings',
      fullDescription:
        'The Prophet Muhammad was known as "Al-Amin" (the Trustworthy) even before his prophethood. Integrity is the foundation of all good relationships and successful societies.',
      islamicReference:
        'The Prophet said: "The best of you are those with the best character and the most truthful of tongue."',
      practicalTips: [
        'Always tell the truth, even when difficult',
        'Keep your promises and commitments',
        'Be reliable and responsible',
        'Admit mistakes and make amends',
      ],
      relatedValues: ['الصدق', 'الأمانة', 'المسؤولية'],
      source: 'Hadith',
      language: 'en',
    },
    {
      id: 'practices-1',
      title: 'التأمل والتفكر / Reflection & Mindfulness',
      icon: '🧘',
      category: 'practices',
      shortDescription: 'الممارسة المنتظمة للتأمل والتفكر',
      fullDescription:
        'التأمل جزء من الممارسة الإسلامية. يساعد على تصفية الذهن وفهم النفس بشكل أعمق. التفكر في آيات الله وحكمته يعمق الإيمان ويحسن من حالتك النفسية.',
      islamicReference:
        'قال تعالى: "أفلا يتدبرون القرآن أم على قلوب أقفالها" - محمد 24',
      practicalTips: [
        'خذ وقتاً يومياً للتأمل',
        'اجلس في هدوء واستمع لأفكارك',
        'فكر في آيات قرآنية أو أحاديث',
        'اكتب أفكارك ومشاعرك',
      ],
      relatedValues: ['الهدوء', 'الوعي الذاتي', 'السلام'],
      source: 'Islamic Practice',
      language: 'ar',
    },
  ];
}
