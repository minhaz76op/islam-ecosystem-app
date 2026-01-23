export interface IslamicName {
  id: string;
  name: string;
  arabic: string;
  gender: "male" | "female";
  meaning: string;
  meaningBengali: string;
  origin: string;
}

export const ISLAMIC_NAMES: IslamicName[] = [
  { id: "m1", name: "Muhammad", arabic: "مُحَمَّد", gender: "male", meaning: "Praised, Praiseworthy", meaningBengali: "প্রশংসিত", origin: "Arabic" },
  { id: "m2", name: "Ahmad", arabic: "أَحْمَد", gender: "male", meaning: "Most Praiseworthy", meaningBengali: "সর্বাধিক প্রশংসিত", origin: "Arabic" },
  { id: "m3", name: "Abdullah", arabic: "عَبْدُ اللَّه", gender: "male", meaning: "Servant of Allah", meaningBengali: "আল্লাহর বান্দা", origin: "Arabic" },
  { id: "m4", name: "Ibrahim", arabic: "إِبْرَاهِيم", gender: "male", meaning: "Father of Many", meaningBengali: "অনেকের পিতা", origin: "Arabic" },
  { id: "m5", name: "Yusuf", arabic: "يُوسُف", gender: "male", meaning: "God Increases", meaningBengali: "আল্লাহ বৃদ্ধি করেন", origin: "Arabic" },
  { id: "m6", name: "Omar", arabic: "عُمَر", gender: "male", meaning: "Long-Lived", meaningBengali: "দীর্ঘজীবী", origin: "Arabic" },
  { id: "m7", name: "Ali", arabic: "عَلِيّ", gender: "male", meaning: "Elevated, Noble", meaningBengali: "উচ্চ, মহান", origin: "Arabic" },
  { id: "m8", name: "Hassan", arabic: "حَسَن", gender: "male", meaning: "Handsome, Good", meaningBengali: "সুন্দর, ভালো", origin: "Arabic" },
  { id: "m9", name: "Hussein", arabic: "حُسَيْن", gender: "male", meaning: "Handsome, Beautiful", meaningBengali: "সুদর্শন", origin: "Arabic" },
  { id: "m10", name: "Khalid", arabic: "خَالِد", gender: "male", meaning: "Eternal, Immortal", meaningBengali: "চিরন্তন, অমর", origin: "Arabic" },
  { id: "m11", name: "Hamza", arabic: "حَمْزَة", gender: "male", meaning: "Lion, Strong", meaningBengali: "সিংহ, শক্তিশালী", origin: "Arabic" },
  { id: "m12", name: "Bilal", arabic: "بِلَال", gender: "male", meaning: "Moistness, Freshness", meaningBengali: "সতেজতা", origin: "Arabic" },
  { id: "m13", name: "Tariq", arabic: "طَارِق", gender: "male", meaning: "Morning Star", meaningBengali: "শুকতারা", origin: "Arabic" },
  { id: "m14", name: "Zaid", arabic: "زَيْد", gender: "male", meaning: "Growth, Abundance", meaningBengali: "বৃদ্ধি, প্রাচুর্য", origin: "Arabic" },
  { id: "m15", name: "Imran", arabic: "عِمْرَان", gender: "male", meaning: "Prosperity", meaningBengali: "সমৃদ্ধি", origin: "Arabic" },
  { id: "m16", name: "Ismail", arabic: "إِسْمَاعِيل", gender: "male", meaning: "God Will Hear", meaningBengali: "আল্লাহ শুনবেন", origin: "Arabic" },
  { id: "m17", name: "Salman", arabic: "سَلْمَان", gender: "male", meaning: "Safe, Peaceful", meaningBengali: "নিরাপদ, শান্তিপূর্ণ", origin: "Arabic" },
  { id: "m18", name: "Amir", arabic: "أَمِير", gender: "male", meaning: "Prince, Leader", meaningBengali: "আমীর, নেতা", origin: "Arabic" },
  { id: "m19", name: "Faisal", arabic: "فَيْصَل", gender: "male", meaning: "Judge, Decisive", meaningBengali: "বিচারক, সিদ্ধান্তকারী", origin: "Arabic" },
  { id: "m20", name: "Rashid", arabic: "رَشِيد", gender: "male", meaning: "Rightly Guided", meaningBengali: "সঠিক পথপ্রাপ্ত", origin: "Arabic" },
  { id: "m21", name: "Saad", arabic: "سَعْد", gender: "male", meaning: "Happiness, Good Fortune", meaningBengali: "সুখ, সৌভাগ্য", origin: "Arabic" },
  { id: "m22", name: "Jamal", arabic: "جَمَال", gender: "male", meaning: "Beauty", meaningBengali: "সৌন্দর্য", origin: "Arabic" },
  { id: "m23", name: "Kareem", arabic: "كَرِيم", gender: "male", meaning: "Generous, Noble", meaningBengali: "দানশীল, মহান", origin: "Arabic" },
  { id: "m24", name: "Nabil", arabic: "نَبِيل", gender: "male", meaning: "Noble", meaningBengali: "মহান", origin: "Arabic" },
  { id: "m25", name: "Rahim", arabic: "رَحِيم", gender: "male", meaning: "Merciful", meaningBengali: "দয়ালু", origin: "Arabic" },
  { id: "m26", name: "Shakir", arabic: "شَاكِر", gender: "male", meaning: "Grateful", meaningBengali: "কৃতজ্ঞ", origin: "Arabic" },
  { id: "m27", name: "Walid", arabic: "وَلِيد", gender: "male", meaning: "Newborn", meaningBengali: "নবজাতক", origin: "Arabic" },
  { id: "m28", name: "Yahya", arabic: "يَحْيَى", gender: "male", meaning: "God is Gracious", meaningBengali: "আল্লাহ দয়ালু", origin: "Arabic" },
  { id: "m29", name: "Zakaria", arabic: "زَكَرِيَّا", gender: "male", meaning: "Remembrance of Allah", meaningBengali: "আল্লাহর স্মরণ", origin: "Arabic" },
  { id: "m30", name: "Anas", arabic: "أَنَس", gender: "male", meaning: "Friendliness", meaningBengali: "বন্ধুত্ব", origin: "Arabic" },
  { id: "f1", name: "Fatima", arabic: "فَاطِمَة", gender: "female", meaning: "One Who Abstains", meaningBengali: "যে বিরত থাকে", origin: "Arabic" },
  { id: "f2", name: "Aisha", arabic: "عَائِشَة", gender: "female", meaning: "Living, Prosperous", meaningBengali: "জীবন্ত, সমৃদ্ধ", origin: "Arabic" },
  { id: "f3", name: "Khadija", arabic: "خَدِيجَة", gender: "female", meaning: "Premature Child", meaningBengali: "অকালজাত শিশু", origin: "Arabic" },
  { id: "f4", name: "Maryam", arabic: "مَرْيَم", gender: "female", meaning: "Beloved, Wished-for Child", meaningBengali: "প্রিয়, কাঙ্ক্ষিত সন্তান", origin: "Arabic" },
  { id: "f5", name: "Zainab", arabic: "زَيْنَب", gender: "female", meaning: "Fragrant Flower", meaningBengali: "সুগন্ধি ফুল", origin: "Arabic" },
  { id: "f6", name: "Hafsa", arabic: "حَفْصَة", gender: "female", meaning: "Young Lioness", meaningBengali: "বাঘিনী", origin: "Arabic" },
  { id: "f7", name: "Amina", arabic: "آمِنَة", gender: "female", meaning: "Trustworthy, Faithful", meaningBengali: "বিশ্বস্ত", origin: "Arabic" },
  { id: "f8", name: "Ruqaiya", arabic: "رُقَيَّة", gender: "female", meaning: "Rise, Ascend", meaningBengali: "উত্থান", origin: "Arabic" },
  { id: "f9", name: "Layla", arabic: "لَيْلَى", gender: "female", meaning: "Night", meaningBengali: "রাত", origin: "Arabic" },
  { id: "f10", name: "Safiya", arabic: "صَفِيَّة", gender: "female", meaning: "Pure, Sincere", meaningBengali: "বিশুদ্ধ, আন্তরিক", origin: "Arabic" },
  { id: "f11", name: "Sumaya", arabic: "سُمَيَّة", gender: "female", meaning: "Elevated, High", meaningBengali: "উন্নত, উচ্চ", origin: "Arabic" },
  { id: "f12", name: "Noor", arabic: "نُور", gender: "female", meaning: "Light", meaningBengali: "আলো", origin: "Arabic" },
  { id: "f13", name: "Sara", arabic: "سَارَة", gender: "female", meaning: "Princess", meaningBengali: "রাজকুমারী", origin: "Arabic" },
  { id: "f14", name: "Hana", arabic: "هَنَاء", gender: "female", meaning: "Happiness, Bliss", meaningBengali: "সুখ, আনন্দ", origin: "Arabic" },
  { id: "f15", name: "Asma", arabic: "أَسْمَاء", gender: "female", meaning: "Supreme, Exalted", meaningBengali: "সর্বোচ্চ, মহান", origin: "Arabic" },
  { id: "f16", name: "Zahra", arabic: "زَهْرَاء", gender: "female", meaning: "Radiant, Shining", meaningBengali: "উজ্জ্বল, দীপ্তিময়", origin: "Arabic" },
  { id: "f17", name: "Yasmin", arabic: "يَاسَمِين", gender: "female", meaning: "Jasmine Flower", meaningBengali: "জুঁই ফুল", origin: "Arabic" },
  { id: "f18", name: "Iman", arabic: "إِيمَان", gender: "female", meaning: "Faith, Belief", meaningBengali: "ঈমান, বিশ্বাস", origin: "Arabic" },
  { id: "f19", name: "Salma", arabic: "سَلْمَى", gender: "female", meaning: "Peaceful", meaningBengali: "শান্তিপূর্ণ", origin: "Arabic" },
  { id: "f20", name: "Huda", arabic: "هُدَى", gender: "female", meaning: "Guidance", meaningBengali: "হেদায়েত", origin: "Arabic" },
  { id: "f21", name: "Jamila", arabic: "جَمِيلَة", gender: "female", meaning: "Beautiful", meaningBengali: "সুন্দরী", origin: "Arabic" },
  { id: "f22", name: "Rania", arabic: "رَانِيَة", gender: "female", meaning: "Gazing, Looking", meaningBengali: "তাকানো", origin: "Arabic" },
  { id: "f23", name: "Samira", arabic: "سَمِيرَة", gender: "female", meaning: "Entertaining Companion", meaningBengali: "মনোরঞ্জক সঙ্গী", origin: "Arabic" },
  { id: "f24", name: "Naima", arabic: "نَعِيمَة", gender: "female", meaning: "Blissful, Delicate", meaningBengali: "আনন্দময়, কোমল", origin: "Arabic" },
  { id: "f25", name: "Dalia", arabic: "دَالِيَا", gender: "female", meaning: "Dahlia Flower", meaningBengali: "ডালিয়া ফুল", origin: "Arabic" },
  { id: "f26", name: "Farida", arabic: "فَرِيدَة", gender: "female", meaning: "Unique, Precious", meaningBengali: "অনন্য, মূল্যবান", origin: "Arabic" },
  { id: "f27", name: "Reem", arabic: "رِيم", gender: "female", meaning: "White Antelope", meaningBengali: "সাদা হরিণ", origin: "Arabic" },
  { id: "f28", name: "Tasnim", arabic: "تَسْنِيم", gender: "female", meaning: "Fountain in Paradise", meaningBengali: "জান্নাতের ঝর্ণা", origin: "Arabic" },
  { id: "f29", name: "Shifa", arabic: "شِفَاء", gender: "female", meaning: "Healing, Cure", meaningBengali: "আরোগ্য, নিরাময়", origin: "Arabic" },
  { id: "f30", name: "Rahma", arabic: "رَحْمَة", gender: "female", meaning: "Mercy", meaningBengali: "রহমত, দয়া", origin: "Arabic" },
];

export function getNamesByGender(gender: "male" | "female"): IslamicName[] {
  return ISLAMIC_NAMES.filter((n) => n.gender === gender);
}

export function searchNames(query: string): IslamicName[] {
  const q = query.toLowerCase();
  return ISLAMIC_NAMES.filter(
    (n) =>
      n.name.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q) ||
      n.meaningBengali.includes(q)
  );
}
