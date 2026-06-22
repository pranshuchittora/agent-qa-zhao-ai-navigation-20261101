import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Search, Heart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function Navbar() {
  const scrollY = useScrollPosition();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  const navLinks = [
    { label: '首页', to: '/' },
    { label: '分类', to: '/category' },
    { label: '收藏', to: '/favorites' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrollY > 10 ? 'glass-nav' : 'bg-transparent'
        )}
      >
        <nav className="max-w-[1024px] mx-auto px-5 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[#1d1d1f] hover:no-underline"
          >
            <span className="text-xl font-bold tracking-tight">AI</span>
            <span className="text-xl font-light tracking-tight text-[#6e6e73]">导航</span>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'text-sm transition-colors hover:no-underline',
                  isActive(link.to)
                    ? 'text-[#1d1d1f] font-medium'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center gap-4">
            {/* 收藏图标（带计数） */}
            <Link
              to="/favorites"
              className="relative text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              <Heart size={18} fill={favoritesCount > 0 ? '#0071e3' : 'none'} color={favoritesCount > 0 ? '#0071e3' : 'currentColor'} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0071e3] text-white text-[10px] flex items-center justify-center font-medium">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* 搜索图标 */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              <Search size={18} />
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* 搜索展开区域 */}
        {searchOpen && (
          <div className="border-t border-black/5 bg-white/80 backdrop-blur-xl">
            <div className="max-w-[1024px] mx-auto px-5 py-3">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
                  size={18}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  placeholder="搜索 AI 工具..."
                  autoFocus
                  className="w-full h-10 pl-11 pr-4 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[var(--color-link)] focus:bg-white outline-none text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-12 z-40 bg-black/20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-12 left-0 right-0 z-50 glass-nav md:hidden">
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-[var(--radius-md)] text-base transition-colors hover:no-underline',
                    isActive(link.to)
                      ? 'text-[#1d1d1f] font-medium bg-[#f5f5f7]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
