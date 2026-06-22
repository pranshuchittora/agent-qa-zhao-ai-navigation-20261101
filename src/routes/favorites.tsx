import { Heart, ArrowRight } from 'lucide-react';
import ToolGrid from '@/components/tool/ToolGrid';
import Button from '@/components/ui/Button';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getToolsByIds } from '@/data/tools';

export default function Favorites() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const favoritedTools = getToolsByIds(favorites);

  return (
    <div className="min-h-screen">
      {/* 标题区 */}
      <section
        className="relative overflow-hidden py-20 md:py-24"
        style={{
          background: 'linear-gradient(to bottom, #f5f5f7 0%, #ffffff 100%)',
        }}
      >
        {/* 装饰性渐变背景 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,45,85,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 90%, rgba(255,149,0,0.04) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-[1080px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            我的收藏
          </h1>
          <p className="text-lg md:text-xl text-[#6e6e73] max-w-2xl mx-auto leading-relaxed">
            {favorites.length > 0
              ? `你收藏了 ${favorites.length} 个 AI 工具`
              : '收藏你喜欢的 AI 工具，方便随时查看'}
          </p>
        </div>
      </section>

      {/* 收藏列表 */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          {favorites.length > 0 ? (
            <ToolGrid tools={favoritedTools} columns={3} />
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                <Heart size={36} className="text-[#86868b]" />
              </div>
              <p className="text-xl text-[#1d1d1f] mb-2 font-medium">
                还没有收藏任何工具
              </p>
              <p className="text-[#6e6e73] mb-8">
                浏览工具列表，点击心形图标收藏你喜欢的工具
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button to="/" variant="primary">
                  去首页探索
                </Button>
                <Button to="/category" variant="secondary">
                  浏览分类
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
