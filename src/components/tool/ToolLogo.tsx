import { cn } from '@/lib/utils';

interface ToolLogoProps {
  logo: string;
  background?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ToolLogo({
  logo,
  background = '#f5f5f7',
  size = 'md',
  className,
}: ToolLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base rounded-lg',
    md: 'w-12 h-12 text-2xl rounded-xl',
    lg: 'w-16 h-16 text-3xl rounded-2xl',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: background }}
    >
      <span>{logo}</span>
    </div>
  );
}
