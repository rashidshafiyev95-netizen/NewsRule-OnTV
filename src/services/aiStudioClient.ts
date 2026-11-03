import { NewsArticle, NewsCategory } from '../types/news';
import { getMockArticlesForLanguage } from '../data/mockNews';
import { AppLanguage, getInitialAppLanguage } from './i18n';

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
 * Dispatches summarized news requests adapted to hardware performance profile and active language.
 */
export class AIStudioClient {
  public static async fetchSummarizedNews(
    category: NewsCategory,
    isLegacy: boolean,
    language: AppLanguage,
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
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error Code: ${response.status}`);
      }

      const data = await response.json();

      if (data.fallback || !data.articles || data.articles.length === 0) {
        // Fallback to high-availability localized wire cache filtered by category
        const localizedPool = getMockArticlesForLanguage(language);
        const fallbackList =
          category === 'All'
            ? localizedPool
            : localizedPool.filter((a) => a.category === category);
        callback.onSuccess(fallbackList.length > 0 ? fallbackList : localizedPool);
        return;
      }

      // Map generated response into standardized NewsArticle objects
      const mappedArticles: NewsArticle[] = data.articles.map(
        (item: RawGeneratedArticle, idx: number) => {
          const summaries = Array.isArray(item.summary)
            ? item.summary
            : typeof item.summary === 'string'
            ? [item.summary]
            : [language === 'ru' ? 'Свежая проверенная сводка.' : language === 'az' ? 'Ən son təsdiqlənmiş bülleten.' : 'Latest verified intelligence bulletin.'];

          const defaultSource =
            language === 'ru'
              ? 'Лента NewsRule'
              : language === 'az'
              ? 'NewsRule Xəbər Xətti'
              : 'NewsRule AI Wire';

          return {
            id: `ai-${language}-${Date.now()}-${idx}`,
            channelNumber: 100 + (idx + 1) * 11,
            title: item.title || (language === 'ru' ? 'Срочный выпуск новостей' : language === 'az' ? 'Təcili Xəbər Buraxılışı' : 'Breaking Intelligence Update'),
            category: category === 'All' ? 'Breaking' : category,
            aiSummary: summaries.slice(0, 3),
            fullContent:
              item.fullContent ||
              summaries.join(' ') +
                (language === 'ru'
                  ? ' Подробные редакторские репортажи транслируются через защищенную спутниковую сеть NewsRule.'
                  : language === 'az'
                  ? ' Ətraflı redaksiya xəbərləri NewsRule peyk şəbəkəsi vasitəsilə yayımlanır.'
                  : ' Detailed editorial dispatches continue to stream over the NewsRule secure satellite network.'),
            source: item.source || defaultSource,
            timestamp: language === 'ru' ? 'ПРЯМОЙ ЭФИР' : language === 'az' ? 'CANLI YAYIM' : 'LIVE AI',
            readTime: item.readTime || (language === 'ru' ? '2 мин' : language === 'az' ? '2 dəq' : '2 min read'),
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
      console.warn('AIStudioClient fetch error, using localized wire cache fallback:', err);
      // Fallback gracefully so TV screen never goes blank
      const localizedPool = getMockArticlesForLanguage(language);
      const fallbackList =
        category === 'All'
          ? localizedPool
          : localizedPool.filter((a) => a.category === category);
      callback.onSuccess(fallbackList.length > 0 ? fallbackList : localizedPool);
      callback.onFailure(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * NewsRule Weather Assistant client for Baku, Azerbaijan with language parameter.
   */
  public static async fetchBakuWeather(
    lang?: AppLanguage
  ): Promise<{ temp: number | string; condition: string; summary: string[] }> {
    const activeLang = lang || getInitialAppLanguage();
    try {
      const res = await fetch(`/api/weather/baku?lang=${encodeURIComponent(activeLang)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        temp: data.temp ?? 18,
        condition: data.condition || (activeLang === 'ru' ? 'Каспийский бриз' : activeLang === 'az' ? 'Xəzri Mehi' : 'Caspian Breeze'),
        summary: Array.isArray(data.summary)
          ? data.summary
          : [String(data.summary || (activeLang === 'ru' ? 'Ясная погода на Апшеронском полуострове.' : activeLang === 'az' ? 'Bakı yarımadasında mülayim hava.' : 'Fair weather across Baku peninsula.'))],
      };
    } catch (err) {
      console.warn('Weather fetch fallback:', err);
      if (activeLang === 'ru') {
        return {
          temp: 18,
          condition: 'Каспийский бриз, переменная облачность',
          summary: [
            'Умеренный ветер Хазри вдоль Бакинского бульвара, дневная температура около 18°C.',
            'Для вечерней прогулки по набережной рекомендуется ветровка или легкая куртка.'
          ]
        };
      } else if (activeLang === 'az') {
        return {
          temp: 18,
          condition: 'Xəzri Meh və Qismən Buludlu',
          summary: [
            'Bakı bulvarı boyunca mülayim Xəzri küləyi, gündüz temperatur təxminən 18°C.',
            'Dənizkənarı axşam gəzintiləri üçün yüngül pencək və ya gödəkcə tövsiyə olunur.'
          ]
        };
      }
      return {
        temp: 18,
        condition: 'Caspian Breeze & Partly Cloudy',
        summary: [
          'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
          'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.'
        ]
      };
    }
  }
}
