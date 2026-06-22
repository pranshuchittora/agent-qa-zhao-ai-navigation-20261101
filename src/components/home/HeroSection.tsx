import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { heroConfig } from '@/data/featured';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f5f5f7 0%, #ffffff 100%)',
      }}
    >
      {/* 装饰性渐变背景 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,113,227,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(175,82,222,0.05) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 5% 70%, rgba(48,209,88,0.04) 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-[1080px] mx-auto px-4 md:px-6 pt-24 pb-20 md:pt-36 md:pb-28 text-center">
        {/* 标题 */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-5">
          {heroConfig.title}
        </h1>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-[#6e6e73] mb-12 max-w-2xl mx-auto leading-relaxed">
          {heroConfig.subtitle}
        </p>

        {/* 搜索框 */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
              size={20}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="搜索 AI 工具..."
              className="w-full h-14 pl-12 pr-4 rounded-[var(--radius-full)] bg-white border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-[var(--color-link)] focus:shadow-[0_4px_16px_rgba(0,113,227,0.12)] outline-none text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
