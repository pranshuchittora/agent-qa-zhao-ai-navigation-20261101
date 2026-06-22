import { Link } from 'react-router';
import type { AITool } from '@/types';
import ToolLogo from './ToolLogo';
import FavoriteButton from './FavoriteButton';
import Badge from '@/components/ui/Badge';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getPricingLabel, getPricingColor } from '@/lib/utils';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const isFavorited = useFavoritesStore((s) => s.favorites.includes(tool.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="group block bg-white border border-black/5 rounded-[var(--radius-lg)] p-5 card-hover hover:no-underline"
    >
      <div className="flex items-start justify-between mb-4">
        <ToolLogo logo={tool.logo} background={tool.logoBackground} size="md" />
        <FavoriteButton
          isFavorited={isFavorited}
          onClick={() => toggleFavorite(tool.id)}
          size="sm"
        />
      </div>

      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1 tracking-tight">
        {tool.name}
      </h3>
      <p className="text-sm text-[#6e6e73] mb-3 line-clamp-2 leading-relaxed">
        {tool.tagline}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge label={getPricingLabel(tool.pricing)} color={getPricingColor(tool.pricing)} />
        {tool.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
    </Link>
  );
}
