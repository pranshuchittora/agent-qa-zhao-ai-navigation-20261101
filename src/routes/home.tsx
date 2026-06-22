import HeroSection from '@/components/home/HeroSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import CategoryCard from '@/components/category/CategoryCard';
import ToolGrid from '@/components/tool/ToolGrid';
import { categories } from '@/data/categories';
import { getPopularTools } from '@/data/tools';

export default function Home() {
  const popularTools = getPopularTools();

  return (
    <div>
      <HeroSection />

      {/* 分类探索 */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1024px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-3">
              探索分类
            </h2>
            <p className="text-lg md:text-xl text-[#6e6e73]">
              按类别浏览，找到最适合你的 AI 工具
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 精选工具 */}
      <FeaturedSection />

      {/* 热门工具 */}
      <section className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="max-w-[1024px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-3">
              热门工具
            </h2>
            <p className="text-lg md:text-xl text-[#6e6e73]">
              大家都在用的 AI 工具
            </p>
          </div>

          <ToolGrid tools={popularTools} columns={4} />
        </div>
      </section>
    </div>
  );
}
