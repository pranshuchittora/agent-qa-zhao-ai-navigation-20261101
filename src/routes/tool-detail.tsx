import { useParams, Link } from 'react-router';
import {
  ChevronLeft, ExternalLink, Image, ImageIcon, Video, Music, Mic,
  Code2, MessageSquare, Search, Globe, FileText, Eye, Brain, Palette,
  User, Shield, Sparkles, Cpu, Zap, Layers, PenTool, Type, Wand2,
  Maximize2, DollarSign, Scissors, Users, Play, Radio, Settings,
} from 'lucide-react';
import { getToolById, getRelatedTools } from '@/data/tools';
import { getCategoryById } from '@/data/categories';
import ToolLogo from '@/components/tool/ToolLogo';
import FavoriteButton from '@/components/tool/FavoriteButton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ToolGrid from '@/components/tool/ToolGrid';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getPricingLabel, getPricingColor } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const FEATURE_ICON_MAP: [string[], LucideIcon][] = [
  // 图像生成
  [['文生图'], Image],
  [['图生图', '变体'], ImageIcon],
  // 视频
  [['视频', '帧'], Video],
  // 音乐
  [['歌曲', '音乐'], Music],
  // 语音
  [['语音', '人声', '说话'], Mic],
  // 代码
  [['代码', '调试', '编程'], Code2],
  // 对话
  [['对话', '聊天', '自然语言'], MessageSquare],
  // 搜索
  [['搜索', '联网', '网络搜索'], Search],
  // 集成/生态
  [['集成', '生态', 'Google'], Globe],
  // 文档
  [['文档', '文件', '上传'], FileText],
  // 识别/视觉
  [['识别', '图像识别', '视觉'], Eye],
  // 推理/智能
  [['推理', '理解', '多模态', '智能'], Brain],
  // 风格/调色
  [['风格', '调色'], Palette],
  // 一致性/角色
  [['一致性', '角色'], User],
  // 安全
  [['安全', '对齐', '隐私'], Shield],
  // 部署/开源
  [['部署', '开源', '本地'], Cpu],
  // 速度/性能
  [['极速', '快速', '高效'], Zap],
  // 批量/多
  [['批量', '多种', '多语言', '多分辨率', '画幅'], Layers],
  // 写作
  [['写作', '文案', '创作'], PenTool],
  // 文字渲染
  [['文字渲染', '文字'], Type],
  // 编辑/修改
  [['重绘', '填充', '消除', '修改', '编辑', '扩展'], Wand2],
  // 放大/增强
  [['放大', '超分', '高清', '质量'], Maximize2],
  // 价格
  [['价格', '低价', '免费', 'API'], DollarSign],
  // 微调/控制
  [['微调', 'ControlNet', '控制', '定制', '语调'], Settings],
  // 裁剪/选择
  [['裁剪', '选择', '区域'], Scissors],
  // 协作
  [['协作', '团队'], Users],
  // 音频
  [['音频', '声音'], Radio],
  // 运动/动画
  [['运动', '动画', '插值'], Play],
];

function getFeatureIcon(feature: string): LucideIcon {
  for (const [keywords, Icon] of FEATURE_ICON_MAP) {
    if (keywords.some(kw => feature.includes(kw))) return Icon;
  }
  return Sparkles;
}

export default function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? getToolById(toolId) : undefined;

  const isFavorited = useFavoritesStore((s) =>
    toolId ? s.favorites.includes(toolId) : false
  );
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!tool) {
    return (
      <div className="max-w-[744px] mx-auto px-4 md:px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">
          工具未找到
        </h1>
        <p className="text-[#6e6e73] mb-8">
          你访问的工具不存在或已下线
        </p>
        <Button to="/" variant="primary">
          返回首页
        </Button>
      </div>
    );
  }

  const category = getCategoryById(tool.categoryId);
  const relatedTools = getRelatedTools(tool.id, 3);

  return (
    <div className="min-h-screen">
      {/* 返回按钮 */}
      <div className="max-w-[744px] mx-auto px-4 md:px-6 pt-10">
        <Link
          to={category ? `/category/${category.id}` : '/category'}
          className="inline-flex items-center gap-1 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
        >
          <ChevronLeft size={16} />
          {category ? category.name : '返回分类'}
        </Link>
      </div>

      {/* 工具信息卡片 */}
      <section className="py-10 md:py-12">
        <div className="max-w-[744px] mx-auto px-4 md:px-6">
          <div className="bg-[#f5f5f7] rounded-[var(--radius-xl)] p-8 md:p-12">
            <div className="flex items-start justify-between mb-7">
              <ToolLogo
                logo={tool.logo}
                background={tool.logoBackground}
                size="lg"
              />
              <FavoriteButton
                isFavorited={isFavorited}
                onClick={() => toggleFavorite(tool.id)}
                size="lg"
              />
            </div>

            <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-[#1d1d1f] mb-3 leading-tight">
              {tool.name}
            </h1>
            <p className="text-lg md:text-xl text-[#6e6e73] mb-7 leading-relaxed">
              {tool.tagline}
            </p>

            <div className="mb-7">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full btn-primary text-base py-3.5"
              >
                访问官网
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                label={getPricingLabel(tool.pricing)}
                color={getPricingColor(tool.pricing)}
                size="md"
              />
              {tool.tags.map((tag) => (
                <Badge key={tag} label={tag} size="md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 详细描述 */}
      <section className="py-10 md:py-12">
        <div className="max-w-[744px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-5">
            关于
          </h2>
          <p className="text-[17px] text-[#424245] leading-relaxed mb-5">
            {tool.description}
          </p>
          {tool.longDescription && (
            <p className="text-[17px] text-[#424245] leading-relaxed">
              {tool.longDescription}
            </p>
          )}
        </div>
      </section>

      {/* 核心特性 */}
      {tool.features.length > 0 && (
        <section className="py-10 md:py-12">
          <div className="max-w-[744px] mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-7">
              核心特性
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.features.map((feature) => {
                const Icon = getFeatureIcon(feature);
                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 bg-[#f5f5f7] rounded-[var(--radius-md)] p-5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-link)]/8 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} color="var(--color-link)" strokeWidth={1.75} />
                    </div>
                    <span className="text-[15px] text-[#1d1d1f]">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8">
              相关工具
            </h2>
            <ToolGrid tools={relatedTools} columns={3} />
          </div>
        </section>
      )}
    </div>
  );
}
