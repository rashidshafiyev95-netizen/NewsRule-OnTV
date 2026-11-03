import { AppLanguage, getInitialAppLanguage } from './i18n';

/**
 * Speech Synthesis TV News Anchor service.
 * Delivers broadcast audio reading of news articles and AI bullet points in English, Azerbaijani, and Russian.
 */
class SpeechAnchorService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private listeners: Set<(isSpeaking: boolean) => void> = new Set();
  private currentLang: AppLanguage = getInitialAppLanguage();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setLanguage(lang: AppLanguage) {
    this.currentLang = lang;
    if (this.isSpeakingState) {
      this.stop();
    }
  }

  public subscribe(cb: (isSpeaking: boolean) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(state: boolean) {
    this.isSpeakingState = state;
    this.listeners.forEach((cb) => cb(state));
  }

  public speakArticle(
    title: string,
    bulletPoints: string[],
    fullContent?: string,
    lang?: AppLanguage
  ) {
    if (!this.synth) return;
    this.stop();

    const activeLang = lang || this.currentLang;
    let textToSpeak = '';

    if (activeLang === 'ru') {
      textToSpeak = `Эфир NewsRule. Главная новость: ${title}. Ключевые пункты: ${bulletPoints.join('. ')}. Подробный репортаж: ${fullContent ? fullContent.slice(0, 300) : ''}`;
    } else if (activeLang === 'az') {
      textToSpeak = `NewsRule Yayımı. Başlıq: ${title}. Əsas məqamlar: ${bulletPoints.join('. ')}. Ətraflı hesabat: ${fullContent ? fullContent.slice(0, 300) : ''}`;
    } else {
      textToSpeak = `NewsRule Broadcast. Headline: ${title}. Key takeaways: ${bulletPoints.join('. ')}. Detailed report: ${fullContent ? fullContent.slice(0, 300) : ''}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick appropriate localized voice
    const voices = this.synth.getVoices();
    let anchorVoice: SpeechSynthesisVoice | undefined;

    if (activeLang === 'ru') {
      anchorVoice =
        voices.find((v) => v.lang.startsWith('ru') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Yuri') || v.name.includes('Milena'))) ||
        voices.find((v) => v.lang.startsWith('ru'));
      utterance.lang = 'ru-RU';
    } else if (activeLang === 'az') {
      anchorVoice =
        voices.find((v) => v.lang.startsWith('az')) ||
        voices.find((v) => v.lang.startsWith('tr')); // Turkish is closely phonetically compatible fallback
      utterance.lang = anchorVoice?.lang || 'az-AZ';
    } else {
      anchorVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('News'))) ||
        voices.find((v) => v.lang.startsWith('en'));
      utterance.lang = 'en-US';
    }

    if (anchorVoice) {
      utterance.voice = anchorVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
    };

    utterance.onerror = () => {
      this.notify(false);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify(false);
  }

  public toggle(
    title: string,
    bulletPoints: string[],
    fullContent?: string,
    lang?: AppLanguage
  ) {
    if (this.isSpeakingState) {
      this.stop();
    } else {
      this.speakArticle(title, bulletPoints, fullContent, lang);
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechAnchor = new SpeechAnchorService();
