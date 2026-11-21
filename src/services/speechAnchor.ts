import { AppLanguage, getInitialAppLanguage, getLanguageMeta, getTranslations } from './i18n';

/**
 * Speech Synthesis TV News Anchor service.
 * Delivers broadcast audio reading of news articles and AI bullet points across all 102 languages.
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

  private buildLocalizedScript(
    lang: AppLanguage,
    title: string,
    bulletPoints: string[],
    fullContent?: string
  ): string {
    const t = getTranslations(lang);
    const excerpt = fullContent ? fullContent.slice(0, 320) : '';
    const bullets = bulletPoints.join('. ');

    return `${t.appName} ${t.liveBroadcast}. ${title}. ${t.rulesBasedTakeaways} ${bullets}. ${
      excerpt ? `${t.detailedReport}: ${excerpt}` : ''
    }`;
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
    const textToSpeak = this.buildLocalizedScript(activeLang, title, bulletPoints, fullContent);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voices = this.synth.getVoices();
    const meta = getLanguageMeta(activeLang);
    const baseCode = activeLang.split('-')[0].toLowerCase();
    const speechTag = meta.speechLang.toLowerCase();

    let anchorVoice =
      voices.find(
        (v) =>
          (v.lang.toLowerCase() === speechTag || v.lang.toLowerCase().startsWith(baseCode)) &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('News'))
      ) ||
      voices.find((v) => v.lang.toLowerCase() === speechTag) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(baseCode));

    // Phonetic voice fallbacks for regional languages without preinstalled OS TTS voices
    if (!anchorVoice) {
      if (['az', 'tk', 'uz', 'kk', 'ky', 'ug'].includes(baseCode)) {
        anchorVoice = voices.find((v) => v.lang.toLowerCase().startsWith('tr'));
      } else if (['be', 'tg', 'mn'].includes(baseCode)) {
        anchorVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ru'));
      } else if (['ps', 'sd', 'ku'].includes(baseCode)) {
        anchorVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ar') || v.lang.toLowerCase().startsWith('fa'));
      }
    }

    utterance.lang = anchorVoice?.lang || meta.speechLang;
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
