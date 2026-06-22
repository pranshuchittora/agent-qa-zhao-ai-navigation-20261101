/** 首页精选配置 */

/** 首页 Hero 区域配置 */
export const heroConfig = {
  title: 'AI 工具导航',
  subtitle: '发现并探索最好的 AI 工具，一站式探索人工智能的无限可能。',
};

/** 首页精选大卡片配置（交替深色/浅色背景） */
export const featuredLargeCards = [
  {
    toolId: 'chatgpt',
    background: 'dark' as const,
  },
  {
    toolId: 'midjourney',
    background: 'light' as const,
  },
  {
    toolId: 'cursor',
    background: 'light' as const,
  },
  {
    toolId: 'suno',
    background: 'dark' as const,
  },
];
