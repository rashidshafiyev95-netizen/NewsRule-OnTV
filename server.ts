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
    const { category = 'World', isLegacy = false } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'No GEMINI_API_KEY configured in environment. Using high-availability wire cache.',
        articles: [],
      });
    }

    // Craft the optimization instructions for the model payload (matches user Java code)
    const systemInstruction =
      `You are NewsRule, a strict text aggregator. Return a JSON array of 5 recent news stories for the category: ${category}. ` +
      `Each item must have: ` +
      `'title' (string, journalistic headline), ` +
      `'summary' (array of 3 punchy, factual bullet points), ` +
      `'source' (string, e.g. "NewsRule Wire", "Global Bureau"), ` +
      `'readTime' (string, e.g. "3 min read"), ` +
      `'fullContent' (string, 2 paragraphs of detailed reporting), ` +
      (isLegacy
        ? `Do not include any image fields or media links.`
        : `'imageUrl' (valid high quality image url from unsplash e.g. https://images.unsplash.com/photo-...).`);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate breaking news summaries for category: ${category}`,
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
      isLegacy,
      articles: Array.isArray(parsed) ? parsed : [],
    });
  } catch (error: unknown) {
    console.error('Error generating summarized news:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown generation error',
    });
  }
});

/**
 * NewsRule Weather Assistant:
 * System: "You are NewsRule Weather Assistant. Return a clean JSON object for the current weather in Baku, Azerbaijan.
 * Include fields for: 'temp' (Celsius), 'condition' (e.g., Sunny, Rainy), and a 'summary' array containing 2 short, punchy bullet points detailing today's forecast and any active clothing recommendations.
 * Do not include any markdown styling."
 */
app.get('/api/weather/baku', async (_req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        temp: 18,
        condition: 'Caspian Breeze & Partly Cloudy',
        summary: [
          'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
          'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.'
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Provide current weather conditions and clothing advice for Baku, Azerbaijan.',
      config: {
        systemInstruction:
          "You are NewsRule Weather Assistant. Return a clean JSON object for the current weather in Baku, Azerbaijan. Include fields for: 'temp' (Celsius), 'condition' (e.g., Sunny, Rainy), and a 'summary' array containing 2 short, punchy bullet points detailing today's forecast and any active clothing recommendations. Do not include any markdown styling.",
        responseMimeType: 'application/json',
      },
    });

    const raw = response.text || '{}';
    const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const weatherData = JSON.parse(clean);
    return res.json(weatherData);
  } catch (error: unknown) {
    console.error('Weather Assistant generation error, delivering fallback:', error);
    return res.json({
      temp: 18,
      condition: 'Caspian Breeze & Partly Cloudy',
      summary: [
        'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
        'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.'
      ]
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
