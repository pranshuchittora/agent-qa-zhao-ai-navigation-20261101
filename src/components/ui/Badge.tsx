import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  label,
  color,
  size = 'sm',
  className,
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        className
      )}
      style={
        color
          ? { backgroundColor: `${color}15`, color }
          : { backgroundColor: '#f5f5f7', color: '#6e6e73' }
      }
    >
      {label}
    </span>
  );
}
