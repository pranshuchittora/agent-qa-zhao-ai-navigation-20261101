import { useParams, Link } from 'react-router';
import { ChevronLeft, ExternalLink, Check } from 'lucide-react';
import { getToolById, getRelatedTools } from '@/data/tools';
import { getCategoryById } from '@/data/categories';
import ToolLogo from '@/components/tool/ToolLogo';
import FavoriteButton from '@/components/tool/FavoriteButton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ToolGrid from '@/components/tool/ToolGrid';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getPricingLabel, getPricingColor } from '@/lib/utils';

export default function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? getToolById(toolId) : undefined;

  const isFavorited = useFavoritesStore((s) =>
    toolId ? s.favorites.includes(toolId) : false
  );
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!tool) {
    return (
      <div className="max-w-[744px] mx-auto px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">
          工具未找到
        </h1>
        <p className="text-[#6e6e73] mb-8">
          你访问的工具不存在或已下线
        </p>
        <Button to="/" variant="primary">
          返回首页
        </Button>
      </div>
    );
  }

  const category = getCategoryById(tool.categoryId);
  const relatedTools = getRelatedTools(tool.id, 3);

  return (
    <div className="min-h-screen">
      {/* 返回按钮 */}
      <div className="max-w-[744px] mx-auto px-5 pt-8">
        <Link
          to={category ? `/category/${category.id}` : '/category'}
          className="inline-flex items-center gap-1 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
        >
          <ChevronLeft size={16} />
          {category ? category.name : '返回分类'}
        </Link>
      </div>

      {/* 工具信息卡片 */}
      <section className="py-8">
        <div className="max-w-[744px] mx-auto px-5">
          <div className="bg-[#f5f5f7] rounded-[var(--radius-xl)] p-8 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <ToolLogo
                logo={tool.logo}
                background={tool.logoBackground}
                size="lg"
              />
              <FavoriteButton
                isFavorited={isFavorited}
                onClick={() => toggleFavorite(tool.id)}
                size="lg"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              {tool.name}
            </h1>
            <p className="text-lg md:text-xl text-[#6e6e73] mb-6">
              {tool.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button href={tool.website} variant="primary" size="md">
                访问官网
                <ExternalLink size={15} />
              </Button>
              {category && (
                <Link
                  to={`/category/${category.id}`}
                  className="text-[var(--color-link)] hover:underline text-base"
                >
                  {category.name}
                </Link>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                label={getPricingLabel(tool.pricing)}
                color={getPricingColor(tool.pricing)}
                size="md"
              />
              {tool.tags.map((tag) => (
                <Badge key={tag} label={tag} size="md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 详细描述 */}
      <section className="py-8">
        <div className="max-w-[744px] mx-auto px-5">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            关于
          </h2>
          <p className="text-[17px] text-[#424245] leading-relaxed mb-4">
            {tool.description}
          </p>
          {tool.longDescription && (
            <p className="text-[17px] text-[#424245] leading-relaxed">
              {tool.longDescription}
            </p>
          )}
        </div>
      </section>

      {/* 核心特性 */}
      {tool.features.length > 0 && (
        <section className="py-8">
          <div className="max-w-[744px] mx-auto px-5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
              核心特性
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 bg-[#f5f5f7] rounded-[var(--radius-md)] p-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#30d158]/15 flex items-center justify-center flex-shrink-0">
                    <Check size={14} color="#30d158" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] text-[#1d1d1f]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1024px] mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
              相关工具
            </h2>
            <ToolGrid tools={relatedTools} columns={3} />
          </div>
        </section>
      )}
    </div>
  );
}
