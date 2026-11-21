export type LanguageRegion =
  | 'Global'
  | 'Europe'
  | 'Asia'
  | 'Middle East & Caucasus'
  | 'Africa'
  | 'Americas & Pacific';

export type AppLanguage = string;

export interface LanguageOption {
  id: AppLanguage;
  nativeLabel: string;
  englishName: string;
  speechLang: string;
  dir: 'ltr' | 'rtl';
  region: LanguageRegion;
  buttonId: string;
  numKey?: string;
  badge?: string;
}

export const LANGUAGE_CATALOG: LanguageOption[] = [
  // Top 9 Primary TV Broadcast Languages (Mapped to Remote Digits [1]-[9])
  { id: 'en', nativeLabel: 'English', englishName: 'English', speechLang: 'en-US', dir: 'ltr', region: 'Global', buttonId: 'btnLangEn', numKey: '1' },
  { id: 'az', nativeLabel: 'Azərbaycan', englishName: 'Azerbaijani', speechLang: 'az-AZ', dir: 'ltr', region: 'Middle East & Caucasus', buttonId: 'btnLangAz', numKey: '2' },
  { id: 'ru', nativeLabel: 'Русский', englishName: 'Russian', speechLang: 'ru-RU', dir: 'ltr', region: 'Europe', buttonId: 'btnLangRu', numKey: '3', badge: 'Для ТВ бабушки' },
  { id: 'tr', nativeLabel: 'Türkçe', englishName: 'Turkish', speechLang: 'tr-TR', dir: 'ltr', region: 'Middle East & Caucasus', buttonId: 'btnLangTr', numKey: '4' },
  { id: 'es', nativeLabel: 'Español', englishName: 'Spanish', speechLang: 'es-ES', dir: 'ltr', region: 'Global', buttonId: 'btnLangEs', numKey: '5' },
  { id: 'fr', nativeLabel: 'Français', englishName: 'French', speechLang: 'fr-FR', dir: 'ltr', region: 'Global', buttonId: 'btnLangFr', numKey: '6' },
  { id: 'de', nativeLabel: 'Deutsch', englishName: 'German', speechLang: 'de-DE', dir: 'ltr', region: 'Europe', buttonId: 'btnLangDe', numKey: '7' },
  { id: 'ar', nativeLabel: 'العربية', englishName: 'Arabic', speechLang: 'ar-SA', dir: 'rtl', region: 'Middle East & Caucasus', buttonId: 'btnLangAr', numKey: '8' },
  { id: 'zh', nativeLabel: '中文 (简体)', englishName: 'Chinese (Simplified)', speechLang: 'zh-CN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangZh', numKey: '9' },

  // Major Global & Regional Broadcast Languages (10–102)
  { id: 'zh-TW', nativeLabel: '繁體中文', englishName: 'Chinese (Traditional)', speechLang: 'zh-TW', dir: 'ltr', region: 'Asia', buttonId: 'btnLangZhTw' },
  { id: 'ja', nativeLabel: '日本語', englishName: 'Japanese', speechLang: 'ja-JP', dir: 'ltr', region: 'Asia', buttonId: 'btnLangJa' },
  { id: 'ko', nativeLabel: '한국어', englishName: 'Korean', speechLang: 'ko-KR', dir: 'ltr', region: 'Asia', buttonId: 'btnLangKo' },
  { id: 'pt', nativeLabel: 'Português', englishName: 'Portuguese', speechLang: 'pt-BR', dir: 'ltr', region: 'Global', buttonId: 'btnLangPt' },
  { id: 'it', nativeLabel: 'Italiano', englishName: 'Italian', speechLang: 'it-IT', dir: 'ltr', region: 'Europe', buttonId: 'btnLangIt' },
  { id: 'hi', nativeLabel: 'हिन्दी', englishName: 'Hindi', speechLang: 'hi-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangHi' },
  { id: 'bn', nativeLabel: 'বাংলা', englishName: 'Bengali', speechLang: 'bn-BD', dir: 'ltr', region: 'Asia', buttonId: 'btnLangBn' },
  { id: 'ur', nativeLabel: 'اردو', englishName: 'Urdu', speechLang: 'ur-PK', dir: 'rtl', region: 'Asia', buttonId: 'btnLangUr' },
  { id: 'fa', nativeLabel: 'فارسی', englishName: 'Persian', speechLang: 'fa-IR', dir: 'rtl', region: 'Middle East & Caucasus', buttonId: 'btnLangFa' },
  { id: 'he', nativeLabel: 'עברית', englishName: 'Hebrew', speechLang: 'he-IL', dir: 'rtl', region: 'Middle East & Caucasus', buttonId: 'btnLangHe' },
  { id: 'uk', nativeLabel: 'Українська', englishName: 'Ukrainian', speechLang: 'uk-UA', dir: 'ltr', region: 'Europe', buttonId: 'btnLangUk' },
  { id: 'pl', nativeLabel: 'Polski', englishName: 'Polish', speechLang: 'pl-PL', dir: 'ltr', region: 'Europe', buttonId: 'btnLangPl' },
  { id: 'nl', nativeLabel: 'Nederlands', englishName: 'Dutch', speechLang: 'nl-NL', dir: 'ltr', region: 'Europe', buttonId: 'btnLangNl' },
  { id: 'sv', nativeLabel: 'Svenska', englishName: 'Swedish', speechLang: 'sv-SE', dir: 'ltr', region: 'Europe', buttonId: 'btnLangSv' },
  { id: 'no', nativeLabel: 'Norsk', englishName: 'Norwegian', speechLang: 'nb-NO', dir: 'ltr', region: 'Europe', buttonId: 'btnLangNo' },
  { id: 'da', nativeLabel: 'Dansk', englishName: 'Danish', speechLang: 'da-DK', dir: 'ltr', region: 'Europe', buttonId: 'btnLangDa' },
  { id: 'fi', nativeLabel: 'Suomi', englishName: 'Finnish', speechLang: 'fi-FI', dir: 'ltr', region: 'Europe', buttonId: 'btnLangFi' },
  { id: 'el', nativeLabel: 'Ελληνικά', englishName: 'Greek', speechLang: 'el-GR', dir: 'ltr', region: 'Europe', buttonId: 'btnLangEl' },
  { id: 'cs', nativeLabel: 'Čeština', englishName: 'Czech', speechLang: 'cs-CZ', dir: 'ltr', region: 'Europe', buttonId: 'btnLangCs' },
  { id: 'ro', nativeLabel: 'Română', englishName: 'Romanian', speechLang: 'ro-RO', dir: 'ltr', region: 'Europe', buttonId: 'btnLangRo' },
  { id: 'hu', nativeLabel: 'Magyar', englishName: 'Hungarian', speechLang: 'hu-HU', dir: 'ltr', region: 'Europe', buttonId: 'btnLangHu' },
  { id: 'th', nativeLabel: 'ไทย', englishName: 'Thai', speechLang: 'th-TH', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTh' },
  { id: 'vi', nativeLabel: 'Tiếng Việt', englishName: 'Vietnamese', speechLang: 'vi-VN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangVi' },
  { id: 'id', nativeLabel: 'Bahasa Indonesia', englishName: 'Indonesian', speechLang: 'id-ID', dir: 'ltr', region: 'Asia', buttonId: 'btnLangId' },
  { id: 'ms', nativeLabel: 'Bahasa Melayu', englishName: 'Malay', speechLang: 'ms-MY', dir: 'ltr', region: 'Asia', buttonId: 'btnLangMs' },
  { id: 'tl', nativeLabel: 'Tagalog', englishName: 'Filipino (Tagalog)', speechLang: 'fil-PH', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTl' },
  { id: 'sw', nativeLabel: 'Kiswahili', englishName: 'Swahili', speechLang: 'sw-KE', dir: 'ltr', region: 'Africa', buttonId: 'btnLangSw' },
  { id: 'am', nativeLabel: 'አማርኛ', englishName: 'Amharic', speechLang: 'am-ET', dir: 'ltr', region: 'Africa', buttonId: 'btnLangAm' },
  { id: 'ka', nativeLabel: 'ქართული', englishName: 'Georgian', speechLang: 'ka-GE', dir: 'ltr', region: 'Middle East & Caucasus', buttonId: 'btnLangKa' },
  { id: 'hy', nativeLabel: 'Հայերեն', englishName: 'Armenian', speechLang: 'hy-AM', dir: 'ltr', region: 'Middle East & Caucasus', buttonId: 'btnLangHy' },
  { id: 'kk', nativeLabel: 'Қазақша', englishName: 'Kazakh', speechLang: 'kk-KZ', dir: 'ltr', region: 'Asia', buttonId: 'btnLangKk' },
  { id: 'uz', nativeLabel: 'Oʻzbekcha', englishName: 'Uzbek', speechLang: 'uz-UZ', dir: 'ltr', region: 'Asia', buttonId: 'btnLangUz' },
  { id: 'ky', nativeLabel: 'Кыргызча', englishName: 'Kyrgyz', speechLang: 'ky-KG', dir: 'ltr', region: 'Asia', buttonId: 'btnLangKy' },
  { id: 'tk', nativeLabel: 'Türkmençe', englishName: 'Turkmen', speechLang: 'tk-TM', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTk' },
  { id: 'tg', nativeLabel: 'Тоҷикӣ', englishName: 'Tajik', speechLang: 'tg-TJ', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTg' },
  { id: 'mn', nativeLabel: 'Монгол', englishName: 'Mongolian', speechLang: 'mn-MN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangMn' },
  { id: 'be', nativeLabel: 'Беларуская', englishName: 'Belarusian', speechLang: 'be-BY', dir: 'ltr', region: 'Europe', buttonId: 'btnLangBe' },
  { id: 'bg', nativeLabel: 'Български', englishName: 'Bulgarian', speechLang: 'bg-BG', dir: 'ltr', region: 'Europe', buttonId: 'btnLangBg' },
  { id: 'sr', nativeLabel: 'Српски', englishName: 'Serbian', speechLang: 'sr-RS', dir: 'ltr', region: 'Europe', buttonId: 'btnLangSr' },
  { id: 'hr', nativeLabel: 'Hrvatski', englishName: 'Croatian', speechLang: 'hr-HR', dir: 'ltr', region: 'Europe', buttonId: 'btnLangHr' },
  { id: 'sk', nativeLabel: 'Slovenčina', englishName: 'Slovak', speechLang: 'sk-SK', dir: 'ltr', region: 'Europe', buttonId: 'btnLangSk' },
  { id: 'sl', nativeLabel: 'Slovenščina', englishName: 'Slovenian', speechLang: 'sl-SI', dir: 'ltr', region: 'Europe', buttonId: 'btnLangSl' },
  { id: 'lt', nativeLabel: 'Lietuvių', englishName: 'Lithuanian', speechLang: 'lt-LT', dir: 'ltr', region: 'Europe', buttonId: 'btnLangLt' },
  { id: 'lv', nativeLabel: 'Latviešu', englishName: 'Latvian', speechLang: 'lv-LV', dir: 'ltr', region: 'Europe', buttonId: 'btnLangLv' },
  { id: 'et', nativeLabel: 'Eesti', englishName: 'Estonian', speechLang: 'et-EE', dir: 'ltr', region: 'Europe', buttonId: 'btnLangEt' },
  { id: 'sq', nativeLabel: 'Shqip', englishName: 'Albanian', speechLang: 'sq-AL', dir: 'ltr', region: 'Europe', buttonId: 'btnLangSq' },
  { id: 'mk', nativeLabel: 'Македонски', englishName: 'Macedonian', speechLang: 'mk-MK', dir: 'ltr', region: 'Europe', buttonId: 'btnLangMk' },
  { id: 'bs', nativeLabel: 'Bosanski', englishName: 'Bosnian', speechLang: 'bs-BA', dir: 'ltr', region: 'Europe', buttonId: 'btnLangBs' },
  { id: 'is', nativeLabel: 'Íslenska', englishName: 'Icelandic', speechLang: 'is-IS', dir: 'ltr', region: 'Europe', buttonId: 'btnLangIs' },
  { id: 'ga', nativeLabel: 'Gaeilge', englishName: 'Irish', speechLang: 'ga-IE', dir: 'ltr', region: 'Europe', buttonId: 'btnLangGa' },
  { id: 'cy', nativeLabel: 'Cymraeg', englishName: 'Welsh', speechLang: 'cy-GB', dir: 'ltr', region: 'Europe', buttonId: 'btnLangCy' },
  { id: 'gd', nativeLabel: 'Gàidhlig', englishName: 'Scottish Gaelic', speechLang: 'gd-GB', dir: 'ltr', region: 'Europe', buttonId: 'btnLangGd' },
  { id: 'eu', nativeLabel: 'Euskara', englishName: 'Basque', speechLang: 'eu-ES', dir: 'ltr', region: 'Europe', buttonId: 'btnLangEu' },
  { id: 'ca', nativeLabel: 'Català', englishName: 'Catalan', speechLang: 'ca-ES', dir: 'ltr', region: 'Europe', buttonId: 'btnLangCa' },
  { id: 'gl', nativeLabel: 'Galego', englishName: 'Galician', speechLang: 'gl-ES', dir: 'ltr', region: 'Europe', buttonId: 'btnLangGl' },
  { id: 'mt', nativeLabel: 'Malti', englishName: 'Maltese', speechLang: 'mt-MT', dir: 'ltr', region: 'Europe', buttonId: 'btnLangMt' },
  { id: 'lb', nativeLabel: 'Lëtzebuergesch', englishName: 'Luxembourgish', speechLang: 'lb-LU', dir: 'ltr', region: 'Europe', buttonId: 'btnLangLb' },
  { id: 'ta', nativeLabel: 'தமிழ்', englishName: 'Tamil', speechLang: 'ta-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTa' },
  { id: 'te', nativeLabel: 'తెలుగు', englishName: 'Telugu', speechLang: 'te-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangTe' },
  { id: 'mr', nativeLabel: 'मराठी', englishName: 'Marathi', speechLang: 'mr-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangMr' },
  { id: 'gu', nativeLabel: 'ગુજરાતી', englishName: 'Gujarati', speechLang: 'gu-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangGu' },
  { id: 'kn', nativeLabel: 'ಕನ್ನಡ', englishName: 'Kannada', speechLang: 'kn-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangKn' },
  { id: 'ml', nativeLabel: 'മലയാളം', englishName: 'Malayalam', speechLang: 'ml-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangMl' },
  { id: 'pa', nativeLabel: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', speechLang: 'pa-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangPa' },
  { id: 'or', nativeLabel: 'ଓଡ଼ିଆ', englishName: 'Odia', speechLang: 'or-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangOr' },
  { id: 'as', nativeLabel: 'অসমীয়া', englishName: 'Assamese', speechLang: 'as-IN', dir: 'ltr', region: 'Asia', buttonId: 'btnLangAs' },
  { id: 'si', nativeLabel: 'සිංහල', englishName: 'Sinhala', speechLang: 'si-LK', dir: 'ltr', region: 'Asia', buttonId: 'btnLangSi' },
  { id: 'ne', nativeLabel: 'नेपाली', englishName: 'Nepali', speechLang: 'ne-NP', dir: 'ltr', region: 'Asia', buttonId: 'btnLangNe' },
  { id: 'my', nativeLabel: 'မြန်မာ', englishName: 'Burmese', speechLang: 'my-MM', dir: 'ltr', region: 'Asia', buttonId: 'btnLangMy' },
  { id: 'km', nativeLabel: 'ខ្មែរ', englishName: 'Khmer', speechLang: 'km-KH', dir: 'ltr', region: 'Asia', buttonId: 'btnLangKm' },
  { id: 'lo', nativeLabel: 'ລາວ', englishName: 'Lao', speechLang: 'lo-LA', dir: 'ltr', region: 'Asia', buttonId: 'btnLangLo' },
  { id: 'ps', nativeLabel: 'پښتو', englishName: 'Pashto', speechLang: 'ps-AF', dir: 'rtl', region: 'Middle East & Caucasus', buttonId: 'btnLangPs' },
  { id: 'ku', nativeLabel: 'Kurdî / کوردی', englishName: 'Kurdish', speechLang: 'ku-TR', dir: 'rtl', region: 'Middle East & Caucasus', buttonId: 'btnLangKu' },
  { id: 'sd', nativeLabel: 'سنڌي', englishName: 'Sindhi', speechLang: 'sd-PK', dir: 'rtl', region: 'Asia', buttonId: 'btnLangSd' },
  { id: 'ug', nativeLabel: 'ئۇيغۇرچە', englishName: 'Uyghur', speechLang: 'ug-CN', dir: 'rtl', region: 'Asia', buttonId: 'btnLangUg' },
  { id: 'yo', nativeLabel: 'Yorùbá', englishName: 'Yoruba', speechLang: 'yo-NG', dir: 'ltr', region: 'Africa', buttonId: 'btnLangYo' },
  { id: 'ig', nativeLabel: 'Igbo', englishName: 'Igbo', speechLang: 'ig-NG', dir: 'ltr', region: 'Africa', buttonId: 'btnLangIg' },
  { id: 'ha', nativeLabel: 'Hausa', englishName: 'Hausa', speechLang: 'ha-NG', dir: 'ltr', region: 'Africa', buttonId: 'btnLangHa' },
  { id: 'zu', nativeLabel: 'isiZulu', englishName: 'Zulu', speechLang: 'zu-ZA', dir: 'ltr', region: 'Africa', buttonId: 'btnLangZu' },
  { id: 'xh', nativeLabel: 'isiXhosa', englishName: 'Xhosa', speechLang: 'xh-ZA', dir: 'ltr', region: 'Africa', buttonId: 'btnLangXh' },
  { id: 'af', nativeLabel: 'Afrikaans', englishName: 'Afrikaans', speechLang: 'af-ZA', dir: 'ltr', region: 'Africa', buttonId: 'btnLangAf' },
  { id: 'so', nativeLabel: 'Soomaali', englishName: 'Somali', speechLang: 'so-SO', dir: 'ltr', region: 'Africa', buttonId: 'btnLangSo' },
  { id: 'rw', nativeLabel: 'Kinyarwanda', englishName: 'Kinyarwanda', speechLang: 'rw-RW', dir: 'ltr', region: 'Africa', buttonId: 'btnLangRw' },
  { id: 'mg', nativeLabel: 'Malagasy', englishName: 'Malagasy', speechLang: 'mg-MG', dir: 'ltr', region: 'Africa', buttonId: 'btnLangMg' },
  { id: 'sn', nativeLabel: 'chiShona', englishName: 'Shona', speechLang: 'sn-ZW', dir: 'ltr', region: 'Africa', buttonId: 'btnLangSn' },
  { id: 'ny', nativeLabel: 'Chichewa', englishName: 'Chichewa', speechLang: 'ny-MW', dir: 'ltr', region: 'Africa', buttonId: 'btnLangNy' },
  { id: 'om', nativeLabel: 'Afaan Oromoo', englishName: 'Oromo', speechLang: 'om-ET', dir: 'ltr', region: 'Africa', buttonId: 'btnLangOm' },
  { id: 'ti', nativeLabel: 'ትግርኛ', englishName: 'Tigrinya', speechLang: 'ti-ER', dir: 'ltr', region: 'Africa', buttonId: 'btnLangTi' },
  { id: 'jv', nativeLabel: 'Basa Jawa', englishName: 'Javanese', speechLang: 'jv-ID', dir: 'ltr', region: 'Asia', buttonId: 'btnLangJv' },
  { id: 'su', nativeLabel: 'Basa Sunda', englishName: 'Sundanese', speechLang: 'su-ID', dir: 'ltr', region: 'Asia', buttonId: 'btnLangSu' },
  { id: 'ceb', nativeLabel: 'Cebuano', englishName: 'Cebuano', speechLang: 'ceb-PH', dir: 'ltr', region: 'Asia', buttonId: 'btnLangCeb' },
  { id: 'mi', nativeLabel: 'Te Reo Māori', englishName: 'Māori', speechLang: 'mi-NZ', dir: 'ltr', region: 'Americas & Pacific', buttonId: 'btnLangMi' },
  { id: 'eo', nativeLabel: 'Esperanto', englishName: 'Esperanto', speechLang: 'eo', dir: 'ltr', region: 'Global', buttonId: 'btnLangEo' },
];

export const TOTAL_SUPPORTED_LANGUAGES = LANGUAGE_CATALOG.length; // 102
