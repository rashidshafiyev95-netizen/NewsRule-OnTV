import { NewsArticle, NewsCategory } from '../types/news';
import { MOCK_NEWS_ARTICLES } from '../data/mockNews';

interface RawGeneratedArticle {
  title: string;
  summary: string[] | string;
  source?: string;
  readTime?: string;
  fullContent?: string;
  imageUrl?: string;
}

/**
 * Port of com.newsrule.app.AIStudioClient to Web environment.
 * Dispatches summarized news requests adapted to hardware performance profile.
 */
export class AIStudioClient {
  public static async fetchSummarizedNews(
    category: NewsCategory,
    isLegacy: boolean,
    callback: {
      onSuccess: (articles: NewsArticle[]) => void;
      onFailure: (err: Error) => void;
    }
  ): Promise<void> {
    try {
      const response = await fetch('/api/news/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          isLegacy,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error Code: ${response.status}`);
      }

      const data = await response.json();

      if (data.fallback || !data.articles || data.articles.length === 0) {
        // Fallback to high-availability local wire cache filtered by category
        const fallbackList =
          category === 'All'
            ? MOCK_NEWS_ARTICLES
            : MOCK_NEWS_ARTICLES.filter((a) => a.category === category);
        callback.onSuccess(fallbackList.length > 0 ? fallbackList : MOCK_NEWS_ARTICLES);
        return;
      }

      // Map generated response into standardized NewsArticle objects
      const mappedArticles: NewsArticle[] = data.articles.map(
        (item: RawGeneratedArticle, idx: number) => {
          const summaries = Array.isArray(item.summary)
            ? item.summary
            : typeof item.summary === 'string'
            ? [item.summary]
            : ['Latest verified intelligence bulletin.'];

          return {
            id: `ai-${Date.now()}-${idx}`,
            channelNumber: 100 + (idx + 1) * 11,
            title: item.title || 'Breaking Intelligence Update',
            category: category === 'All' ? 'Breaking' : category,
            aiSummary: summaries.slice(0, 3),
            fullContent:
              item.fullContent ||
              summaries.join(' ') +
                ' Detailed editorial dispatches continue to stream over the NewsRule secure satellite network.',
            source: item.source || 'NewsRule AI Wire',
            timestamp: 'LIVE AI',
            readTime: item.readTime || '2 min read',
            imageUrl:
              !isLegacy && item.imageUrl
                ? item.imageUrl
                : isLegacy
                ? ''
                : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
            isBreaking: idx === 0,
            priorityScore: 90 - idx * 5,
            tags: [category, 'AI-Summarized', 'Proprietary'],
          };
        }
      );

      callback.onSuccess(mappedArticles);
    } catch (err: unknown) {
      console.warn('AIStudioClient fetch error, using wire cache fallback:', err);
      // Fallback gracefully so TV screen never goes blank
      const fallbackList =
        category === 'All'
          ? MOCK_NEWS_ARTICLES
          : MOCK_NEWS_ARTICLES.filter((a) => a.category === category);
      callback.onSuccess(fallbackList.length > 0 ? fallbackList : MOCK_NEWS_ARTICLES);
      callback.onFailure(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * NewsRule Weather Assistant client for Baku, Azerbaijan.
   */
  public static async fetchBakuWeather(): Promise<{ temp: number | string; condition: string; summary: string[] }> {
    try {
      const res = await fetch('/api/weather/baku');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        temp: data.temp ?? 18,
        condition: data.condition || 'Caspian Breeze',
        summary: Array.isArray(data.summary)
          ? data.summary
          : [String(data.summary || 'Fair weather across Baku peninsula.')],
      };
    } catch (err) {
      console.warn('Weather fetch fallback:', err);
      return {
        temp: 18,
        condition: 'Caspian Breeze & Partly Cloudy',
        summary: [
          'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
          'A light windbreaker or layered jacket is recommended for evening strolls by the seaside.'
        ]
      };
    }
  }
}
