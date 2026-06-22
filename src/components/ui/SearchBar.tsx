import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = '搜索 AI 工具...',
  autoFocus = false,
  className,
  onSubmit,
}: SearchBarProps) {
  return (
    <form
      className={cn('relative', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
        size={20}
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full h-12 pl-12 pr-12 rounded-[var(--radius-full)] bg-[#f5f5f7] border border-transparent focus:border-[var(--color-link)] focus:bg-white outline-none text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
}
