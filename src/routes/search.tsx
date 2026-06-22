import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Search as SearchIcon } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import ToolCard from '@/components/tool/ToolCard';
import { getAllTools } from '@/data/tools';
import { searchTools } from '@/lib/search';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const allTools = getAllTools();

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchTools(debouncedQuery, allTools);
  }, [debouncedQuery, allTools]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen">
      {/* 搜索区 */}
      <section className="bg-[#f5f5f7] py-12 md:py-16">
        <div className="max-w-[744px] mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-6 text-center">
            搜索 AI 工具
          </h1>
          <SearchBar
            value={query}
            onChange={handleSearch}
            placeholder="输入工具名称、标签或关键词..."
            autoFocus={!initialQuery}
            className="w-full"
          />
        </div>
      </section>

      {/* 搜索结果 */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1024px] mx-auto px-5">
          {debouncedQuery.trim() ? (
            <>
              <p className="text-sm text-[#86868b] mb-6">
                "{debouncedQuery}" 的搜索结果 · 共 {results.length} 个
              </p>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {results.map(({ tool }) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                    <SearchIcon size={28} className="text-[#86868b]" />
                  </div>
                  <p className="text-xl text-[#1d1d1f] mb-2 font-medium">
                    未找到相关工具
                  </p>
                  <p className="text-[#6e6e73] mb-8">
                    试试其他关键词，或浏览全部分类
                  </p>
                  <Link
                    to="/category"
                    className="text-[var(--color-link)] hover:underline"
                  >
                    浏览全部分类
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                <SearchIcon size={28} className="text-[#86868b]" />
              </div>
              <p className="text-xl text-[#1d1d1f] mb-2 font-medium">
                搜索你感兴趣的 AI 工具
              </p>
              <p className="text-[#6e6e73]">
                输入工具名称、功能或关键词开始搜索
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
