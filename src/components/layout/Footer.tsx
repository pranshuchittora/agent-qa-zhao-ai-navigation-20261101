import { Link } from 'react-router';
import { categories } from '@/data/categories';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/5">
      <div className="max-w-[1024px] mx-auto px-5 py-10">
        {/* 分类链接 */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider mb-4">
            探索分类
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="text-sm text-[#424245] hover:text-[#1d1d1f] hover:underline"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-black/10 mb-6" />

        {/* 底部信息 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#86868b]">
            © {year} AI 导航. 发现并探索最好的 AI 工具.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-[#424245] hover:text-[#1d1d1f] hover:underline">
              关于
            </Link>
            <Link to="/" className="text-xs text-[#424245] hover:text-[#1d1d1f] hover:underline">
              隐私
            </Link>
            <Link to="/" className="text-xs text-[#424245] hover:text-[#1d1d1f] hover:underline">
              条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
