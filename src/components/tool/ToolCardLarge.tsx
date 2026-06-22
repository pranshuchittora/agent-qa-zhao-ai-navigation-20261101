import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { AITool } from '@/types';
import ToolLogo from './ToolLogo';
import FavoriteButton from './FavoriteButton';
import { useFavoritesStore } from '@/store/favoritesStore';
import { cn } from '@/lib/utils';

interface ToolCardLargeProps {
  tool: AITool;
  background?: 'light' | 'dark';
}

export default function ToolCardLarge({
  tool,
  background = 'light',
}: ToolCardLargeProps) {
  const isFavorited = useFavoritesStore((s) => s.favorites.includes(tool.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const isDark = background === 'dark';

  return (
    <Link
      to={`/tool/${tool.id}`}
      className={cn(
        'group relative block rounded-[var(--radius-xl)] p-8 md:p-12 overflow-hidden card-hover hover:no-underline',
        isDark ? 'bg-[#1d1d1f] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'
      )}
    >
      {/* 收藏按钮 */}
      <div className="absolute top-5 right-5">
        <FavoriteButton
          isFavorited={isFavorited}
          onClick={() => toggleFavorite(tool.id)}
          size="sm"
          className={isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}
        />
      </div>

      {/* Logo */}
      <div className="mb-6">
        <ToolLogo
          logo={tool.logo}
          background={tool.logoBackground}
          size="lg"
        />
      </div>

      {/* 标题 */}
      <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tool.name}
      </h3>

      {/* 标语 */}
      <p
        className={cn(
          'text-lg md:text-xl mb-6 max-w-md',
          isDark ? 'text-[#a1a1a6]' : 'text-[#6e6e73]'
        )}
      >
        {tool.tagline}
      </p>

      {/* CTA */}
      <span
        className={cn(
          'inline-flex items-center gap-1 text-base font-medium',
          isDark ? 'text-[#2997ff]' : 'text-[var(--color-link)]'
        )}
      >
        了解更多
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
