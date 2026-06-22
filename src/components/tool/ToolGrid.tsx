import type { AITool } from '@/types';
import ToolCard from './ToolCard';
import { cn } from '@/lib/utils';

interface ToolGridProps {
  tools: AITool[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ToolGrid({
  tools,
  columns = 3,
  className,
}: ToolGridProps) {
  const colClasses = {
    2: 'sm:grid-cols-2 gap-5 md:gap-6',
    3: 'sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5',
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1',
        colClasses[columns],
        className
      )}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
