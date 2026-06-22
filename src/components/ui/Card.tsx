import { Link } from 'react-router';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  to?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = false,
  to,
  onClick,
}: CardProps) {
  const baseClass = cn(
    'bg-white rounded-[var(--radius-lg)] overflow-hidden',
    hover && 'card-hover cursor-pointer',
    className
  );

  if (to) {
    return (
      <Link to={to} className={cn(baseClass, 'block')}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClass} onClick={onClick}>
      {children}
    </div>
  );
}
