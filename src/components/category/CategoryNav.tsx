import { Link } from 'react-router';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CategoryNavProps {
  activeCategory: string | null;
}

export default function CategoryNav({ activeCategory }: CategoryNavProps) {
  return (
    <div className="no-scrollbar overflow-x-auto -mx-5 px-5">
      <div className="flex items-center gap-2 min-w-max pb-1">
        <Link
          to="/category"
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            activeCategory === null
              ? 'bg-[#1d1d1f] text-white'
              : 'bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]'
          )}
        >
          全部
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              activeCategory === cat.id
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]'
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
