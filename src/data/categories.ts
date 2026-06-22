import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'text-generation',
    name: '文本生成',
    nameEn: 'Text Generation',
    description: '对话、写作、翻译、摘要等文本类 AI 工具',
    icon: 'FileText',
    color: '#0071e3',
    order: 1,
  },
  {
    id: 'image-processing',
    name: '图像处理',
    nameEn: 'Image Processing',
    description: 'AI 绘画、图片编辑、设计等视觉创作工具',
    icon: 'Image',
    color: '#5e5ce6',
    order: 2,
  },
  {
    id: 'audio-video',
    name: '音频视频',
    nameEn: 'Audio & Video',
    description: 'AI 音乐生成、视频创作、语音合成工具',
    icon: 'Video',
    color: '#bf5af2',
    order: 3,
  },
  {
    id: 'code-assistant',
    name: '编程辅助',
    nameEn: 'Code Assistant',
    description: 'AI 代码补全、代码审查、开发效率工具',
    icon: 'Code2',
    color: '#30d158',
    order: 4,
  },
  {
    id: 'productivity',
    name: '效率工具',
    nameEn: 'Productivity',
    description: 'AI 驱动的办公、笔记、自动化工具',
    icon: 'Zap',
    color: '#ff9f0a',
    order: 5,
  },
  {
    id: 'data-analysis',
    name: '数据分析',
    nameEn: 'Data Analysis',
    description: 'AI 数据处理、图表生成、洞察分析工具',
    icon: 'BarChart3',
    color: '#64d2ff',
    order: 6,
  },
  {
    id: 'design-creative',
    name: '设计创意',
    nameEn: 'Design & Creative',
    description: 'AI 辅助 UI 设计、品牌创意、排版工具',
    icon: 'Palette',
    color: '#ff375f',
    order: 7,
  },
  {
    id: 'agent-platform',
    name: '智能体平台',
    nameEn: 'Agent Platform',
    description: 'AI Agent 构建平台、工作流自动化工具',
    icon: 'Bot',
    color: '#ac8e68',
    order: 8,
  },
];

/** 根据 ID 获取分类 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
