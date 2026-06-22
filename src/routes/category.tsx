import { useParams, Link } from 'react-router';
import CategoryNav from '@/components/category/CategoryNav';
import ToolGrid from '@/components/tool/ToolGrid';
import { categories, getCategoryById } from '@/data/categories';
import { getAllTools, getToolsByCategory } from '@/data/tools';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = categoryId ? getCategoryById(categoryId) : null;

  // 获取工具列表
  const tools = categoryId
    ? getToolsByCategory(categoryId)
    : getAllTools();

  // 如果 URL 中的 categoryId 无效，显示所有工具
  const isValidCategory = !categoryId || categories.some((c) => c.id === categoryId);

  return (
    <div className="min-h-screen">
      {/* 标题区 */}
      <section className="bg-[#f5f5f7] py-16 md:py-20">
        <div className="max-w-[1024px] mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-3">
            {category ? category.name : '全部分类'}
          </h1>
          <p className="text-lg md:text-xl text-[#6e6e73] max-w-2xl mx-auto">
            {category ? category.description : '浏览所有 AI 工具分类，发现你需要的工具'}
          </p>
        </div>
      </section>

      {/* 分类标签栏 */}
      <div className="sticky top-12 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1024px] mx-auto px-5 py-4">
          <CategoryNav activeCategory={categoryId || null} />
        </div>
      </div>

      {/* 工具列表 */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1024px] mx-auto px-5">
          {isValidCategory && tools.length > 0 ? (
            <>
              <p className="text-sm text-[#86868b] mb-6">
                共 {tools.length} 个工具
              </p>
              <ToolGrid tools={tools} columns={3} />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#6e6e73] mb-4">
                该分类下暂无工具
              </p>
              <Link
                to="/category"
                className="text-[var(--color-link)] hover:underline"
              >
                查看全部分类
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
