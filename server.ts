import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * Server-side AIStudioClient endpoint:
 * Mirrors com.newsrule.app.AIStudioClient.fetchSummarizedNews
 * Adapts model payload instructions based on HardwareDetector.DeviceProfile (LEGACY vs MODERN)
 */
app.post('/api/news/summarize', async (req, res) => {
  try {
    const { category = 'World', isLegacy = false, language = 'en' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        language,
        message: 'No GEMINI_API_KEY configured in environment. Using high-availability wire cache.',
        articles: [],
      });
    }

    let langInstruction = 'Respond strictly in English.';
    if (language === 'ru') {
      langInstruction = 'CRITICAL: Respond STRICTLY in RUSSIAN (Русский язык). All titles, summaries, sources, readTimes, and fullContent MUST be in natural, professional Russian journalism.';
    } else if (language === 'az') {
      langInstruction = 'CRITICAL: Respond STRICTLY in AZERBAIJANI (Azərbaycan dili). All titles, summaries, sources, readTimes, and fullContent MUST be in natural, professional Azerbaijani journalism.';
    }

    // Craft the optimization instructions for the model payload
    const systemInstruction =
      `You are NewsRule, a strict text aggregator designed for TV broadcast displays. ` +
      `${langInstruction} ` +
      `Return a JSON array of 5 recent news stories for the category: ${category}. ` +
      `Each item must have: ` +
      `'title' (string, journalistic headline in selected language), ` +
      `'summary' (array of 3 punchy, factual bullet points in selected language), ` +
      `'source' (string, e.g. "NewsRule Wire", "Лента NewsRule", "NewsRule Xəbər Xətti"), ` +
      `'readTime' (string, e.g. "3 min read", "3 мин", "3 dəq"), ` +
      `'fullContent' (string, 2 paragraphs of detailed reporting in selected language), ` +
      (isLegacy
        ? `Do not include any image fields or media links.`
        : `'imageUrl' (valid high quality image url from unsplash e.g. https://images.unsplash.com/photo-...).`);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate breaking news summaries for category: ${category} in language: ${language}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '[]';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return res.json({
      success: true,
      category,
      language,
      isLegacy,
      articles: Array.isArray(parsed) ? parsed : [],
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
 * Weather in Baku, Azerbaijan with language localization support (?lang=en|az|ru).
 */
app.get('/api/weather/baku', async (req, res) => {
  const lang = (req.query.lang as string) || 'en';

  const defaultWeather: Record<string, { temp: number; condition: string; summary: string[] }> = {
    en: {
      temp: 18,
      condition: 'Caspian Breeze & Partly Cloudy',
      summary: [
        'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
        'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.'
      ]
    },
    az: {
      temp: 18,
      condition: 'Xəzri Meh və Qismən Buludlu',
      summary: [
        'Bakı bulvarı boyunca mülayim Xəzri küləyi, gündüz temperatur təxminən 18°C.',
        'Dənizkənarı axşam gəzintiləri üçün yüngül pencək və ya gödəkcə tövsiyə olunur.'
      ]
    },
    ru: {
      temp: 18,
      condition: 'Каспийский бриз, переменная облачность',
      summary: [
        'Умеренный ветер Хазри вдоль Бакинского бульвара, дневная температура около 18°C.',
        'Для вечерней прогулки по набережной рекомендуется ветровка или легкая куртка.'
      ]
    }
  };

  const selectedFallback = defaultWeather[lang] || defaultWeather.en;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json(selectedFallback);
    }

    let langDirective = 'Respond in English.';
    if (lang === 'ru') {
      langDirective = 'Respond strictly in Russian (condition and summary in fluent Russian).';
    } else if (lang === 'az') {
      langDirective = 'Respond strictly in Azerbaijani (condition and summary in fluent Azerbaijani).';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide current weather conditions and clothing advice for Baku, Azerbaijan in language: ${lang}.`,
      config: {
        systemInstruction:
          `You are NewsRule Weather Assistant. ${langDirective} Return a clean JSON object for the current weather in Baku, Azerbaijan. ` +
          `Include fields for: 'temp' (Celsius number), 'condition' (string, e.g. Sunny, Caspian Breeze), and a 'summary' array containing 2 short bullet points detailing today's forecast and active clothing recommendations. Do not include any markdown styling.`,
        responseMimeType: 'application/json',
      },
    });

    const raw = response.text || '{}';
    const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const weatherData = JSON.parse(clean);
    return res.json({
      temp: weatherData.temp ?? selectedFallback.temp,
      condition: weatherData.condition || selectedFallback.condition,
      summary: Array.isArray(weatherData.summary) ? weatherData.summary : selectedFallback.summary,
    });
  } catch (error: unknown) {
    console.error('Weather Assistant generation error, delivering localized fallback:', error);
    return res.json(selectedFallback);
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
