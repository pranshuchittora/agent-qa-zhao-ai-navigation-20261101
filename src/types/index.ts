/** 定价类型 */
export type PricingType = 'free' | 'freemium' | 'paid' | 'contact';

/** AI 工具分类 */
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

/** AI 工具 */
export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  logo: string;
  logoBackground?: string;
  website: string;
  categoryId: string;
  tags: string[];
  pricing: PricingType;
  features: string[];
  rating?: number;
  isFeatured?: boolean;
  isPopular: boolean;
  launchDate?: string;
  order: number;
}

/** 搜索结果 */
export interface SearchResult {
  tool: AITool;
  matchedFields: string[];
  score: number;
}
