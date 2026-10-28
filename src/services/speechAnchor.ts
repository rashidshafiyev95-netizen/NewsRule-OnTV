/**
 * Speech Synthesis TV News Anchor service.
 * Delivers broadcast audio reading of news articles and AI bullet points.
 */
class SpeechAnchorService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private listeners: Set<(isSpeaking: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
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

  public speakArticle(title: string, bulletPoints: string[], fullContent?: string) {
    if (!this.synth) return;
    this.stop();

    const textToSpeak = `NewsRule Broadcast. Headline: ${title}. Key takeaways: ${bulletPoints.join('. ')}. Detailed report: ${fullContent ? fullContent.slice(0, 300) : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick clear English anchor voice if available
    const voices = this.synth.getVoices();
    const anchorVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('News')));
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

  public toggle(title: string, bulletPoints: string[], fullContent?: string) {
    if (this.isSpeakingState) {
      this.stop();
    } else {
      this.speakArticle(title, bulletPoints, fullContent);
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechAnchor = new SpeechAnchorService();
