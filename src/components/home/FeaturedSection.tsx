import { featuredLargeCards } from '@/data/featured';
import { getToolById } from '@/data/tools';
import ToolCardLarge from '@/components/tool/ToolCardLarge';

export default function FeaturedSection() {
  const featuredTools = featuredLargeCards
    .map((config) => {
      const tool = getToolById(config.toolId);
      return tool ? { tool, background: config.background } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1080px] mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            精选推荐
          </h2>
          <p className="text-lg md:text-xl text-[#6e6e73]">
            最受欢迎的 AI 工具，值得一试
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {featuredTools.map(({ tool, background }) => (
            <ToolCardLarge
              key={tool.id}
              tool={tool}
              background={background}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
