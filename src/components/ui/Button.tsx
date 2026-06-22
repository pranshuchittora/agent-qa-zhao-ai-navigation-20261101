import { Link } from 'react-router';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  to,
  href,
  fullWidth = false,
  className,
  type = 'button',
}: ButtonProps) {
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-[17px] px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    link: 'text-[var(--color-link)] hover:text-[var(--color-link-hover)] hover:underline bg-transparent border-0 p-0',
  };

  const classes = cn(
    variantClasses[variant],
    variant !== 'link' && sizeClasses[size],
    fullWidth && 'w-full',
    'cursor-pointer',
    className
  );

  // 内部路由链接
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // 外部链接
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // 普通按钮
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
