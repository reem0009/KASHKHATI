// User & Profile Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: SubscriptionType;
}

export type SubscriptionType = 'free' | 'premium' | 'studio';

// Quiz & Assessment Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  type: 'single' | 'multiple' | 'scale';
  category: string;
  required: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
  traits?: string[];
}

export interface QuizResponse {
  userId: string;
  questionId: string;
  answer: string | string[];
  timestamp: Date;
}

export interface QuizResult {
  userId: string;
  completedAt: Date;
  traits: PersonalityTrait[];
  blueprint: Blueprint;
}

// Personality & Traits
export interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
  score: number; // 0-100
  category: string;
  recommendations?: string[];
}

// Blueprint Types
export interface Blueprint {
  id: string;
  userId: string;
  name: string;
  description: string;
  traits: PersonalityTrait[];
  avatar: AvatarConfig;
  recommendations: Array<{
    title: string;
    description: string;
    category: string;
    icon: string;
    link: string;
  }>;
  culturalInsights: CulturalInsight[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CulturalInsight {
  id: string;
  title: string;
  content: string;
  source: string;
  category: 'wisdom' | 'practice' | 'value';
  language: string;
}

// Avatar Types
export interface AvatarConfig {
  id: string;
  baseColor: string;
  pattern: string;
  style: 'geometric' | 'abstract' | 'cultural';
  accessories?: AvatarAccessory[];
  emotionalState?: string;
}

export interface AvatarAccessory {
  id: string;
  name: string;
  type: 'shape' | 'symbol' | 'pattern';
  color: string;
  position: {
    x: number;
    y: number;
  };
}

// Library Types
export interface LibraryContent {
  id: string;
  title: string;
  description: string;
  content: string;
  category: ContentCategory;
  subcategory: string;
  tags: string[];
  language: 'ar' | 'en';
  author: string;
  source: string;
  readTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cultural_relevance: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export type ContentCategory = 
  | 'wisdom'
  | 'practices'
  | 'values'
  | 'history'
  | 'art'
  | 'science'
  | 'wellbeing'
  | 'education';

export interface LibrarySection {
  id: string;
  title: string;
  description: string;
  contents: LibraryContent[];
  order: number;
}

// Personalization Types
export interface PersonalizationPreference {
  userId: string;
  language: 'ar' | 'en';
  theme: 'light' | 'dark' | 'auto';
  contentDifficulty: 'beginner' | 'intermediate' | 'advanced';
  notificationsEnabled: boolean;
  privacyLevel: 'private' | 'shared' | 'public';
}

// Monetization Types
export interface MonetizationFlow {
  userId: string;
  currentTier: SubscriptionType;
  upgradePrompts: UpgradePrompt[];
  purchases: Purchase[];
}

export interface UpgradePrompt {
  id: string;
  type: 'feature' | 'content' | 'ai';
  message: string;
  targetTier: SubscriptionType;
  condition: string;
  triggerCount: number;
}

export interface Purchase {
  id: string;
  userId: string;
  item: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

// UI State Types
export interface UIState {
  loading: boolean;
  error: string | null;
  success: string | null;
  sidebarOpen: boolean;
  currentPage: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  isDark: boolean;
}
