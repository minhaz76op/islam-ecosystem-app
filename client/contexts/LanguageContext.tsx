import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getLanguagePreference, setLanguagePreference, LanguagePreference } from "@/lib/settings";

const translations = {
  en: {
    greeting: "As-salamu alaykum",
    home: "Home",
    salah: "Salah",
    tasbih: "Tasbih",
    settings: "Settings",
    menu: "Menu",
    darkMode: "Dark Mode",
    language: "Language",
    editProfile: "Edit Profile",
    signIn: "Sign In",
    signOut: "Sign Out",
    welcome: "Welcome",
    today: "Today",
    nextPrayer: "Next Prayer",
    sunnahHabits: "Sunnah Habits",
    dailySalah: "Daily Salah",
    duaOfDay: "Dua of the Day",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    duas: "Duas",
    quran: "Quran",
    learnQuran: "Learn Quran",
    articles: "Islamic Articles",
    quiz: "Islamic Quiz",
    mosqueLocator: "Mosque Locator",
    rozaTimetable: "Roza Timetable",
    sehri: "Sehri",
    iftar: "Iftar",
    enabled: "Enabled",
    disabled: "Disabled",
  },
  ar: {
    greeting: "السلام عليكم",
    home: "الرئيسية",
    salah: "الصلاة",
    tasbih: "التسبيح",
    settings: "الإعدادات",
    menu: "القائمة",
    darkMode: "الوضع الداكن",
    language: "اللغة",
    editProfile: "تعديل الملف",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    welcome: "أهلاً",
    today: "اليوم",
    nextPrayer: "الصلاة القادمة",
    sunnahHabits: "عادات السنة",
    dailySalah: "صلاة اليوم",
    duaOfDay: "دعاء اليوم",
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    duas: "الأدعية",
    quran: "القرآن",
    learnQuran: "تعلم القرآن",
    articles: "مقالات إسلامية",
    quiz: "اختبار إسلامي",
    mosqueLocator: "محدد المساجد",
    rozaTimetable: "مواقيت الصيام",
    sehri: "السحور",
    iftar: "الإفطار",
    enabled: "مفعّل",
    disabled: "معطّل",
  },
  bn: {
    greeting: "আসসালামু আলাইকুম",
    home: "হোম",
    salah: "নামাজ",
    tasbih: "তাসবীহ",
    settings: "সেটিংস",
    menu: "মেনু",
    darkMode: "ডার্ক মোড",
    language: "ভাষা",
    editProfile: "প্রোফাইল সম্পাদনা",
    signIn: "সাইন ইন",
    signOut: "সাইন আউট",
    welcome: "স্বাগতম",
    today: "আজ",
    nextPrayer: "পরবর্তী নামাজ",
    sunnahHabits: "সুন্নাহ অভ্যাস",
    dailySalah: "দৈনিক নামাজ",
    duaOfDay: "আজকের দোয়া",
    fajr: "ফজর",
    dhuhr: "যোহর",
    asr: "আসর",
    maghrib: "মাগরিব",
    isha: "এশা",
    duas: "দোয়া",
    quran: "কুরআন",
    learnQuran: "কুরআন শিখুন",
    articles: "ইসলামী প্রবন্ধ",
    quiz: "ইসলামী কুইজ",
    mosqueLocator: "মসজিদ খুঁজুন",
    rozaTimetable: "রোজার সময়সূচী",
    sehri: "সেহরি",
    iftar: "ইফতার",
    enabled: "সক্রিয়",
    disabled: "নিষ্ক্রিয়",
  },
};

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: LanguagePreference;
  setLanguage: (lang: LanguagePreference) => Promise<void>;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<LanguagePreference>("en");

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await getLanguagePreference();
    setLang(saved);
  };

  const setLanguage = async (lang: LanguagePreference) => {
    setLang(lang);
    await setLanguagePreference(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
