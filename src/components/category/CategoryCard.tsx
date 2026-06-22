import { Link } from 'react-router';
import {
  FileText,
  Image,
  Video,
  Code2,
  Zap,
  BarChart3,
  Palette,
  Bot,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/types';
import { getToolsByCategory } from '@/data/tools';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Image,
  Video,
  Code2,
  Zap,
  BarChart3,
  Palette,
  Bot,
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || FileText;
  const toolCount = getToolsByCategory(category.id).length;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group block bg-white border border-black/[0.04] rounded-[var(--radius-lg)] p-7 card-hover hover:no-underline"
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon size={20} color={category.color} strokeWidth={2} />
        </div>
        <ArrowRight
          size={18}
          className="text-[#86868b] transition-all group-hover:translate-x-0.5 group-hover:text-[#1d1d1f]"
        />
      </div>

      <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1.5 tracking-tight leading-snug">
        {category.name}
      </h3>
      <p className="text-[14px] text-[#6e6e73] mb-4 line-clamp-2 leading-[1.43]">
        {category.description}
      </p>
      <p className="text-xs text-[#86868b] font-medium">
        {toolCount} 个工具
      </p>
    </Link>
  );
}
