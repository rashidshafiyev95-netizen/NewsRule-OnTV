import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  getLocalizedBakuWeather,
  getLocalizedNewsArticles,
  getLocalizedUiBundle,
} from './serverTranslator';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

/**
 * 102-Language UI Translation Bundle endpoint:
 * Returns localized labels, navigation strings, category titles, and ticker headlines
 * across all 102 supported languages via Gemini / Neural MT + in-memory cache.
 */
app.get('/api/i18n/bundle', async (req, res) => {
  try {
    const lang = ((req.query.lang as string) || 'en').trim();
    const langName = (req.query.langName as string) || '';
    const nativeLabel = (req.query.nativeLabel as string) || '';

    const bundle = await getLocalizedUiBundle(lang, langName, nativeLabel);
    return res.json({
      success: true,
      language: lang,
      bundle,
    });
  } catch (error: unknown) {
    console.error('Error fetching UI translation bundle:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Translation bundle error',
    });
  }
});

/**
 * Server-side AIStudioClient endpoint:
 * Mirrors com.newsrule.app.AIStudioClient.fetchSummarizedNews
 * Adapts payload to hardware profile and returns localized articles across all 102 languages.
 */
app.post('/api/news/summarize', async (req, res) => {
  try {
    const {
      category = 'World',
      isLegacy = false,
      language = 'en',
      languageName,
      nativeLabel,
    } = req.body;

    const { articles, sourceType } = await getLocalizedNewsArticles({
      category,
      isLegacy,
      language,
      languageName,
      nativeLabel,
    });

    return res.json({
      success: true,
      category,
      language,
      isLegacy,
      sourceType,
      fallback: sourceType === 'native' && articles.length === 0,
      articles,
    });
  } catch (error: unknown) {
    console.error('Error generating summarized news:', error);
    return res.status(200).json({
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown generation error',
      articles: [],
    });
  }
});

/**
 * NewsRule Weather Assistant:
 * Weather in Baku, Azerbaijan with full 102-language localization support.
 */
app.get('/api/weather/baku', async (req, res) => {
  const lang = ((req.query.lang as string) || 'en').trim();
  const languageName = (req.query.langName as string) || '';
  const nativeLabel = (req.query.nativeLabel as string) || '';

  try {
    const data = await getLocalizedBakuWeather(lang, languageName, nativeLabel);
    return res.json(data);
  } catch (error: unknown) {
    console.error('Weather Assistant generation error:', error);
    return res.json({
      temp: 18,
      condition: 'Caspian Breeze & Partly Cloudy',
      summary: [
        'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
        'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.',
      ],
    });
  }
});

// Full-stack Vite integration
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NewsRule TV Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
