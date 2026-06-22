import type { AITool, SearchResult } from '@/types';

/** 搜索工具——匹配名称、标语、描述、标签 */
export function searchTools(query: string, tools: AITool[]): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchResult[] = [];

  for (const tool of tools) {
    const matchedFields: string[] = [];
    let score = 0;

    // 名称匹配（权重最高）
    if (tool.name.toLowerCase().includes(trimmed)) {
      matchedFields.push('name');
      score += 10;
      // 精确匹配额外加分
      if (tool.name.toLowerCase() === trimmed) {
        score += 20;
      }
      // 以搜索词开头额外加分
      if (tool.name.toLowerCase().startsWith(trimmed)) {
        score += 10;
      }
    }

    // 标签匹配
    if (tool.tags.some((tag) => tag.toLowerCase().includes(trimmed))) {
      matchedFields.push('tags');
      score += 6;
    }

    // 标语匹配
    if (tool.tagline.toLowerCase().includes(trimmed)) {
      matchedFields.push('tagline');
      score += 4;
    }

    // 描述匹配
    if (tool.description.toLowerCase().includes(trimmed)) {
      matchedFields.push('description');
      score += 2;
    }

    if (score > 0) {
      results.push({ tool, matchedFields, score });
    }
  }

  // 按分数降序排列
  results.sort((a, b) => b.score - a.score);
  return results;
}

/** 按关键词和分类过滤工具 */
export function filterTools(
  tools: AITool[],
  options: {
    query?: string;
    categoryId?: string | null;
  }
): AITool[] {
  let filtered = tools;

  if (options.categoryId) {
    filtered = filtered.filter((t) => t.categoryId === options.categoryId);
  }

  if (options.query?.trim()) {
    const searchResults = searchTools(options.query, filtered);
    filtered = searchResults.map((r) => r.tool);
  }

  return filtered.sort((a, b) => a.order - b.order);
}
