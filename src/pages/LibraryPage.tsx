import { useState } from 'react';
import type { LibraryContent } from '../types';
import { Button, Card, CardBody, Badge, Input } from '../components/ui';
import { CONTENT_CATEGORIES } from '../constants';

const SAMPLE_LIBRARY: LibraryContent[] = [
  {
    id: '1',
    title: 'حكمة الأجداد / Wisdom of Ancestors',
    description: 'استكشف الحكمة التقليدية والقيم العريقة',
    content: 'محتوى عميق حول الحكمة التقليدية...',
    category: 'wisdom',
    subcategory: 'تقاليد / Traditions',
    tags: ['heritage', 'wisdom', 'culture'],
    language: 'ar',
    author: 'محمد الحكيم / Mohammed Al-Hakim',
    source: 'Traditional Knowledge',
    readTime: 8,
    difficulty: 'intermediate',
    cultural_relevance: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Modern Practices in Islamic Context',
    description: 'Bridging traditional values with contemporary life',
    content: 'Deep content about modern practices...',
    category: 'practices',
    subcategory: 'Daily Life',
    tags: ['practices', 'modern', 'lifestyle'],
    language: 'en',
    author: 'Fatima Ahmed',
    source: 'Contemporary Studies',
    readTime: 10,
    difficulty: 'beginner',
    cultural_relevance: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'قيم العدالة والإنصاف / Values of Justice',
    description: 'فهم أعمق لمبادئ العدالة في التراث الإسلامي',
    content: 'محتوى شامل عن قيم العدالة...',
    category: 'values',
    subcategory: 'أخلاقيات / Ethics',
    tags: ['justice', 'values', 'ethics'],
    language: 'ar',
    author: 'د. علي الدين / Dr. Ali Al-Din',
    source: 'Islamic Philosophy',
    readTime: 12,
    difficulty: 'advanced',
    cultural_relevance: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const LibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en' | null>(null);
  const [selectedContent, setSelectedContent] = useState<LibraryContent | null>(null);

  const filteredContent = SAMPLE_LIBRARY.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesLanguage = !selectedLanguage || item.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="container-lg mx-auto py-2xl">
      <div className="mb-2xl">
        <h1 className="text-4xl font-bold mb-md">📚 المكتبة / Library</h1>
        <p className="text-neutral-600">استكشف كنزاً من المعرفة والحكمة الثقافية / Explore a treasury of cultural knowledge and wisdom</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2xl">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <Card className="sticky top-lg">
            <CardBody>
              <h3 className="text-lg font-semibold mb-lg">المرشحات / Filters</h3>

              {/* Search */}
              <div className="mb-lg">
                <Input
                  placeholder="ابحث / Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Language Filter */}
              <div className="mb-lg">
                <h4 className="text-sm font-semibold mb-md">اللغة / Language</h4>
                <div className="space-y-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLanguage === 'ar'}
                      onChange={() => setSelectedLanguage(selectedLanguage === 'ar' ? null : 'ar')}
                      className="mr-md"
                    />
                    <span className="text-sm">العربية / Arabic</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLanguage === 'en'}
                      onChange={() => setSelectedLanguage(selectedLanguage === 'en' ? null : 'en')}
                      className="mr-md"
                    />
                    <span className="text-sm">English</span>
                  </label>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-semibold mb-md">التصنيف / Category</h4>
                <div className="space-y-sm">
                  {Object.entries(CONTENT_CATEGORIES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(selectedCategory === value ? null : value)}
                      className={`block w-full text-left text-sm px-md py-sm rounded-md transition-colors ${
                        selectedCategory === value
                          ? 'bg-primary-100 text-primary-900'
                          : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedContent ? (
            // Detail View
            <Card>
              <CardBody>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-primary-600 hover:text-primary-700 mb-lg font-medium"
                >
                  ← عودة / Back
                </button>
                <h2 className="text-3xl font-bold mb-md">{selectedContent.title}</h2>
                <div className="flex flex-wrap gap-md mb-lg">
                  <Badge variant="primary">{selectedContent.category}</Badge>
                  <Badge variant="secondary">{selectedContent.difficulty}</Badge>
                   <Badge variant="primary">⏱ {selectedContent.readTime} min</Badge>
                </div>
                <p className="text-neutral-600 mb-lg">{selectedContent.author}</p>
                <div className="prose max-w-none">
                  <p>{selectedContent.content}</p>
                </div>
                <div className="mt-lg pt-lg border-t border-neutral-200">
                  <Button variant="primary" className="w-full">
                    ✓ تم القراءة / Mark as Read
                  </Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            // Grid View
            <div className="space-y-lg">
              <div className="text-sm text-neutral-600">
                {filteredContent.length} من {SAMPLE_LIBRARY.length} مقالة / articles found
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                {filteredContent.map((item) => (
                  <Card
                    key={item.id}
                    hoverable
                    className="cursor-pointer"
                    onClick={() => setSelectedContent(item)}
                  >
                    <CardBody>
                      <div className="flex items-start justify-between mb-md">
                        <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                        <Badge variant="primary" className="ml-md flex-shrink-0">
                          {item.cultural_relevance}%
                        </Badge>
                      </div>
                      <p className="text-neutral-600 text-sm mb-md line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-xs mb-md">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 pt-md border-t border-neutral-100">
                        <span>📖 {item.readTime} min read</span>
                        <span>{item.difficulty}</span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
