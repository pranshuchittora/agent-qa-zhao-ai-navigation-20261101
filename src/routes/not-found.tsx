import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#1d1d1f] mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-[#6e6e73] mb-8">
          页面未找到
        </p>
        <p className="text-[#86868b] mb-10 max-w-md mx-auto">
          你访问的页面不存在或已被移动。返回首页继续探索 AI 工具。
        </p>
        <Button to="/" variant="primary" size="md">
          返回首页
        </Button>
      </div>
    </div>
  );
}
