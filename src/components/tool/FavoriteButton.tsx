import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  isFavorited: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteButton({
  isFavorited,
  onClick,
  size = 'md',
  className,
}: FavoriteButtonProps) {
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        'flex items-center justify-center rounded-full transition-colors',
        'hover:bg-[#f5f5f7] active:scale-90',
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-10 h-10',
        size === 'lg' && 'w-12 h-12',
        className
      )}
      aria-label={isFavorited ? '取消收藏' : '添加收藏'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isFavorited ? 'filled' : 'outline'}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <Heart
            size={iconSize[size]}
            fill={isFavorited ? '#0071e3' : 'none'}
            color={isFavorited ? '#0071e3' : '#86868b'}
            strokeWidth={2}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
