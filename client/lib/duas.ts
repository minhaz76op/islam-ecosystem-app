export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  context: string;
}

export const DAILY_DUAS: Dua[] = [
  {
    id: "morning",
    title: "Morning Dua",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah",
    translation:
      "We have entered the morning and so has the dominion of Allah",
    context: "Say this when you wake up in the morning",
  },
  {
    id: "evening",
    title: "Evening Dua",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillah",
    translation:
      "We have entered the evening and so has the dominion of Allah",
    context: "Say this in the evening",
  },
  {
    id: "before_eating",
    title: "Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah",
    context: "Say this before eating",
  },
  {
    id: "after_eating",
    title: "After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
    transliteration: "Alhamdulillahil-ladhi at'amana wa saqana",
    translation: "All praise is for Allah who fed us and gave us drink",
    context: "Say this after eating",
  },
  {
    id: "leaving_home",
    title: "Leaving Home",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallah",
    translation: "In the name of Allah, I place my trust in Allah",
    context: "Say this when leaving your home",
  },
  {
    id: "entering_home",
    title: "Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna",
    translation: "In the name of Allah we enter, and in the name of Allah we leave",
    context: "Say this when entering your home",
  },
  {
    id: "before_sleep",
    title: "Before Sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live",
    context: "Say this before going to sleep",
  },
  {
    id: "waking_up",
    title: "Upon Waking",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
    transliteration: "Alhamdulillahil-ladhi ahyana ba'da ma amatana",
    translation: "All praise is for Allah who gave us life after death",
    context: "Say this when waking up",
  },
];

export function getDuaForTimeOfDay(): Dua {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return DAILY_DUAS.find((d) => d.id === "morning") || DAILY_DUAS[0];
  } else if (hour >= 12 && hour < 17) {
    return DAILY_DUAS.find((d) => d.id === "leaving_home") || DAILY_DUAS[0];
  } else if (hour >= 17 && hour < 20) {
    return DAILY_DUAS.find((d) => d.id === "evening") || DAILY_DUAS[0];
  } else {
    return DAILY_DUAS.find((d) => d.id === "before_sleep") || DAILY_DUAS[0];
  }
}
