// Quiz Categories & Questions
export const QUIZ_CATEGORIES = {
  PERSONALITY: 'personality',
  VALUES: 'values',
  STRENGTHS: 'strengths',
  ASPIRATIONS: 'aspirations',
  CHALLENGES: 'challenges',
} as const;

export const INITIAL_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'كيف تصف نفسك عادة؟ / How would you typically describe yourself?',
    options: [
      { id: 'o1', text: 'متفائل وإيجابي / Optimistic and positive', value: 'optimistic', traits: ['positivity'] },
      { id: 'o2', text: 'تحليلي وتأملي / Analytical and reflective', value: 'analytical', traits: ['thoughtfulness'] },
      { id: 'o3', text: 'عملي وفعال / Practical and action-oriented', value: 'practical', traits: ['pragmatism'] },
      { id: 'o4', text: 'إبداعي وخيالي / Creative and imaginative', value: 'creative', traits: ['creativity'] },
    ],
    type: 'single',
    category: QUIZ_CATEGORIES.PERSONALITY,
    required: true,
  },
  {
    id: 'q2',
    question: 'ما أهم قيمة لديك؟ / What is your most important value?',
    options: [
      { id: 'o1', text: 'العائلة والعلاقات / Family and relationships', value: 'family', traits: ['connection'] },
      { id: 'o2', text: 'المعرفة والتعلم / Knowledge and learning', value: 'knowledge', traits: ['growth'] },
      { id: 'o3', text: 'الحرية والاستقلالية / Freedom and independence', value: 'freedom', traits: ['autonomy'] },
      { id: 'o4', text: 'الإنجاز والنجاح / Achievement and success', value: 'achievement', traits: ['ambition'] },
    ],
    type: 'single',
    category: QUIZ_CATEGORIES.VALUES,
    required: true,
  },
  {
    id: 'q3',
    question: 'اختر أقوى نقاطك / Select your greatest strengths (multiple)',
    options: [
      { id: 'o1', text: 'القيادة / Leadership', value: 'leadership', traits: ['leadership'] },
      { id: 'o2', text: 'التعاطف / Empathy', value: 'empathy', traits: ['empathy'] },
      { id: 'o3', text: 'الإبداع / Creativity', value: 'creativity', traits: ['creativity'] },
      { id: 'o4', text: 'المرونة / Adaptability', value: 'adaptability', traits: ['flexibility'] },
      { id: 'o5', text: 'التركيز / Focus', value: 'focus', traits: ['discipline'] },
    ],
    type: 'multiple',
    category: QUIZ_CATEGORIES.STRENGTHS,
    required: true,
  },
];

// Color Palettes
export const COLOR_PALETTE = {
  PRIMARY: {
    50: '#fffbf0',
    100: '#fff7e6',
    200: '#ffecc0',
    300: '#ffe0a0',
    400: '#ffd966',
    500: '#ffc933',
    600: '#e6b300',
    700: '#cc9900',
    800: '#997300',
    900: '#664d00',
  },
  SECONDARY: {
    50: '#f0fdfb',
    100: '#e0fbf7',
    200: '#b3f5ed',
    300: '#80ede0',
    400: '#4de8d9',
    500: '#1ae0c6',
    600: '#0db8a0',
    700: '#0a9a87',
    800: '#077c6f',
    900: '#055856',
  },
  ACCENT: {
    50: '#fef2f3',
    100: '#fde8eb',
    200: '#fbd5db',
    300: '#f8b8c6',
    400: '#f38ba6',
    500: '#e85d82',
    600: '#d63e68',
    700: '#b8285a',
    800: '#94234d',
    900: '#7a1f44',
  },
  NEUTRAL: {
    50: '#fafaf9',
    100: '#f5f5f3',
    200: '#ede8e3',
    300: '#ddd4cc',
    400: '#c4b5a0',
    500: '#a8957f',
    600: '#8b7666',
    700: '#6d5e52',
    800: '#4a3f39',
    900: '#2d2620',
  },
};

// Avatar Styles
export const AVATAR_STYLES = {
  GEOMETRIC: 'geometric',
  ABSTRACT: 'abstract',
  CULTURAL: 'cultural',
} as const;

export const AVATAR_PATTERNS = [
  'circles',
  'squares',
  'triangles',
  'waves',
  'spirals',
  'mandalas',
  'geometric-blend',
  'nature-inspired',
];

// Content Categories
export const CONTENT_CATEGORIES = {
  WISDOM: 'wisdom',
  PRACTICES: 'practices',
  VALUES: 'values',
  HISTORY: 'history',
  ART: 'art',
  SCIENCE: 'science',
  WELLBEING: 'wellbeing',
  EDUCATION: 'education',
} as const;

// Subscription Plans
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Take personality quiz',
      'View basic blueprint',
      'Access library (limited)',
      'Basic avatar',
    ],
    limitations: [
      'Max 5 library items/month',
      'Basic analytics',
      'No premium content',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 99, // in cents
    features: [
      'Unlimited library access',
      'Advanced analytics',
      'Personalized recommendations',
      'Premium avatar customization',
      'Ad-free experience',
      'Offline mode',
    ],
    limitations: ['No AI Studio access'],
  },
  STUDIO: {
    name: 'AI Studio',
    price: 299, // in cents
    features: [
      'All Premium features',
      'AI-powered content generation',
      'Custom blueprint creation',
      'Advanced personalization',
      'Export & sharing',
      'Priority support',
    ],
    limitations: [],
  },
};

// Language Options
export const LANGUAGES = {
  AR: 'ar',
  EN: 'en',
} as const;

// Default Routes
export const ROUTES = {
  HOME: '/',
  QUIZ: '/quiz',
  RESULT: '/result',
  LIBRARY: '/library',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  STUDIO: '/studio',
  PRICING: '/pricing',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'حدث خطأ في الاتصال / Network error occurred',
  QUIZ_INCOMPLETE: 'يرجى الإجابة على جميع الأسئلة / Please answer all questions',
  INVALID_EMAIL: 'البريد الإلكتروني غير صحيح / Invalid email address',
  PASSWORD_WEAK: 'كلمة المرور ضعيفة جداً / Password is too weak',
  UNAUTHORIZED: 'غير مرخص / Unauthorized access',
  NOT_FOUND: 'لم يتم العثور عليه / Not found',
  SERVER_ERROR: 'خطأ في الخادم / Server error',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  QUIZ_COMPLETED: 'تم إكمال الاختبار بنجاح / Quiz completed successfully',
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي / Profile updated successfully',
  UPGRADE_SUCCESS: 'تم ترقية الاشتراك بنجاح / Subscription upgraded successfully',
} as const;

// Animations
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 200,
  SLOW: 300,
  EXTRA_SLOW: 500,
} as const;

// API Endpoints - uses VITE_API_URL from Vercel env, falls back to localhost for dev
export const API_ENDPOINTS = {
  BASE_URL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api',
  QUIZ: '/quiz',
  RESULTS: '/results',
  LIBRARY: '/library',
  USERS: '/users',
  AUTH: '/auth',
} as const;
