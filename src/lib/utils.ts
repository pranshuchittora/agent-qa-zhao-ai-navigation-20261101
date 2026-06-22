/** 合并类名 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** 获取定价标签文字 */
export function getPricingLabel(pricing: string): string {
  const labels: Record<string, string> = {
    free: '免费',
    freemium: '免费试用',
    paid: '付费',
    contact: '联系咨询',
  };
  return labels[pricing] || pricing;
}

/** 获取定价标签颜色 */
export function getPricingColor(pricing: string): string {
  const colors: Record<string, string> = {
    free: '#30d158',
    freemium: '#0071e3',
    paid: '#ff9f0a',
    contact: '#86868b',
  };
  return colors[pricing] || '#86868b';
}
