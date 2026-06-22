import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f7] to-white">
      <div className="max-w-[1024px] mx-auto px-5 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        {/* 标题 */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-4">
          {heroConfig.title}
        </h1>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-[#6e6e73] mb-10 max-w-2xl mx-auto leading-relaxed">
          {heroConfig.subtitle}
        </p>

        {/* 搜索框 */}
        <div className="max-w-xl mx-auto mb-8">
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
              className="w-full h-14 pl-12 pr-4 rounded-[var(--radius-full)] bg-white border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] focus:border-[var(--color-link)] outline-none text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all"
            />
          </div>
        </div>

        {/* CTA 按钮 */}
        <div className="flex items-center justify-center gap-4">
          <Button to={heroConfig.primaryCta.to} variant="primary" size="md">
            {heroConfig.primaryCta.label}
          </Button>
          <Button to={heroConfig.secondaryCta.to} variant="secondary" size="md">
            {heroConfig.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
