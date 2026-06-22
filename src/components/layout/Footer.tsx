import { Link } from 'react-router';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/5">
      <div className="max-w-[1024px] mx-auto px-5 py-8">
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
