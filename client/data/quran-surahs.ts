export interface Surah {
  number: number;
  name: string;
  arabic: string;
  verses: number;
  revelation: "Meccan" | "Medinan";
  translation: string;
  bengali: string;
  transliteration: string;
  transliterationBengali: string;
  audioUrl: string;
}

// Audio from QuranicAudio.com - Sheikh Mishary Rashid Alafasy
const getAudioUrl = (num: number) => {
  const padded = String(num).padStart(3, "0");
  return `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${padded}.mp3`;
};

export const SURAHS: Surah[] = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, revelation: "Meccan", translation: "The Opening", bengali: "প্রারম্ভিকা", transliteration: "Al-Faatihah", transliterationBengali: "আল-ফাতিহা", audioUrl: getAudioUrl(1) },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, revelation: "Medinan", translation: "The Cow", bengali: "গাভী", transliteration: "Al-Baqarah", transliterationBengali: "আল-বাকারাহ", audioUrl: getAudioUrl(2) },
  { number: 3, name: "Al-Imran", arabic: "آل عمران", verses: 200, revelation: "Medinan", translation: "The Family of Imran", bengali: "ইমরানের পরিবার", transliteration: "Aal-i-Imraan", transliterationBengali: "আল-ইমরান", audioUrl: getAudioUrl(3) },
  { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176, revelation: "Medinan", translation: "The Women", bengali: "নারী", transliteration: "An-Nisaa", transliterationBengali: "আন-নিসা", audioUrl: getAudioUrl(4) },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, revelation: "Medinan", translation: "The Table Spread", bengali: "খাদ্য পরিবেশিত টেবিল", transliteration: "Al-Maaidah", transliterationBengali: "আল-মায়িদাহ", audioUrl: getAudioUrl(5) },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, revelation: "Meccan", translation: "The Cattle", bengali: "গবাদি পশু", transliteration: "Al-An'aam", transliterationBengali: "আল-আনআম", audioUrl: getAudioUrl(6) },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, revelation: "Meccan", translation: "The Heights", bengali: "উচ্চ স্থানসমূহ", transliteration: "Al-A'raaf", transliterationBengali: "আল-আরাফ", audioUrl: getAudioUrl(7) },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, revelation: "Medinan", translation: "The Spoils of War", bengali: "যুদ্ধলব্ধ সম্পদ", transliteration: "Al-Anfaal", transliterationBengali: "আল-আনফাল", audioUrl: getAudioUrl(8) },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, revelation: "Medinan", translation: "The Repentance", bengali: "তওবা", transliteration: "At-Tawbah", transliterationBengali: "আত-তাওবাহ", audioUrl: getAudioUrl(9) },
  { number: 10, name: "Yunus", arabic: "يونس", verses: 109, revelation: "Meccan", translation: "Jonah", bengali: "ইউনুস", transliteration: "Yunus", transliterationBengali: "ইউনুস", audioUrl: getAudioUrl(10) },
  { number: 11, name: "Hud", arabic: "هود", verses: 123, revelation: "Meccan", translation: "Hud", bengali: "হূদ", transliteration: "Huud", transliterationBengali: "হুদ", audioUrl: getAudioUrl(11) },
  { number: 12, name: "Yusuf", arabic: "يوسف", verses: 111, revelation: "Meccan", translation: "Joseph", bengali: "ইউসুফ", transliteration: "Yusuf", transliterationBengali: "ইউসুফ", audioUrl: getAudioUrl(12) },
  { number: 13, name: "Ar-Ra'd", arabic: "الرعد", verses: 43, revelation: "Medinan", translation: "The Thunder", bengali: "বজ্রপাত", transliteration: "Ar-Ra'd", transliterationBengali: "আর-রাদ", audioUrl: getAudioUrl(13) },
  { number: 14, name: "Ibrahim", arabic: "إبراهيم", verses: 52, revelation: "Meccan", translation: "Abraham", bengali: "ইব্রাহীম", transliteration: "Ibraaheem", transliterationBengali: "ইব্রাহিম", audioUrl: getAudioUrl(14) },
  { number: 15, name: "Al-Hijr", arabic: "الحجر", verses: 99, revelation: "Meccan", translation: "The Rocky Tract", bengali: "পাথুরে উপত্যকা", transliteration: "Al-Hijr", transliterationBengali: "আল-হিজর", audioUrl: getAudioUrl(15) },
  { number: 16, name: "An-Nahl", arabic: "النحل", verses: 128, revelation: "Meccan", translation: "The Bee", bengali: "মৌমাছি", transliteration: "An-Nahl", transliterationBengali: "আন-নাহল", audioUrl: getAudioUrl(16) },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", verses: 111, revelation: "Meccan", translation: "The Night Journey", bengali: "রাত্রি ভ্রমণ", transliteration: "Al-Israa", transliterationBengali: "আল-ইসরা", audioUrl: getAudioUrl(17) },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110, revelation: "Meccan", translation: "The Cave", bengali: "গুহা", transliteration: "Al-Kahf", transliterationBengali: "আল-কাহফ", audioUrl: getAudioUrl(18) },
  { number: 19, name: "Maryam", arabic: "مريم", verses: 98, revelation: "Meccan", translation: "Mary", bengali: "মারইয়াম", transliteration: "Maryam", transliterationBengali: "মারইয়াম", audioUrl: getAudioUrl(19) },
  { number: 20, name: "Ta-Ha", arabic: "طه", verses: 135, revelation: "Meccan", translation: "Ta-Ha", bengali: "ত্ব-হা", transliteration: "Taa-Haa", transliterationBengali: "ত্বা-হা", audioUrl: getAudioUrl(20) },
  { number: 21, name: "Al-Anbiya", arabic: "الأنبياء", verses: 112, revelation: "Meccan", translation: "The Prophets", bengali: "নবীগণ", transliteration: "Al-Anbiyaa", transliterationBengali: "আল-আম্বিয়া", audioUrl: getAudioUrl(21) },
  { number: 22, name: "Al-Hajj", arabic: "الحج", verses: 78, revelation: "Medinan", translation: "The Pilgrimage", bengali: "হজ", transliteration: "Al-Hajj", transliterationBengali: "আল-হাজ্জ", audioUrl: getAudioUrl(22) },
  { number: 23, name: "Al-Mu'minun", arabic: "المؤمنون", verses: 118, revelation: "Meccan", translation: "The Believers", bengali: "মু'মিনগণ", transliteration: "Al-Mu'minuun", transliterationBengali: "আল-মু'মিনুন", audioUrl: getAudioUrl(23) },
  { number: 24, name: "An-Nur", arabic: "النور", verses: 64, revelation: "Medinan", translation: "The Light", bengali: "আলো", transliteration: "An-Nuur", transliterationBengali: "আন-নূর", audioUrl: getAudioUrl(24) },
  { number: 25, name: "Al-Furqan", arabic: "الفرقان", verses: 77, revelation: "Meccan", translation: "The Criterion", bengali: "মানদণ্ড", transliteration: "Al-Furqaan", transliterationBengali: "আল-ফুরকান", audioUrl: getAudioUrl(25) },
  { number: 26, name: "Ash-Shu'ara", arabic: "الشعراء", verses: 227, revelation: "Meccan", translation: "The Poets", bengali: "কবিগণ", transliteration: "Ash-Shu'araa", transliterationBengali: "আশ-শুআরা", audioUrl: getAudioUrl(26) },
  { number: 27, name: "An-Naml", arabic: "النمل", verses: 93, revelation: "Meccan", translation: "The Ant", bengali: "পিপীলিকা", transliteration: "An-Naml", transliterationBengali: "আন-নামল", audioUrl: getAudioUrl(27) },
  { number: 28, name: "Al-Qasas", arabic: "القصص", verses: 88, revelation: "Meccan", translation: "The Stories", bengali: "কাহিনী", transliteration: "Al-Qasas", transliterationBengali: "আল-কাসাস", audioUrl: getAudioUrl(28) },
  { number: 29, name: "Al-Ankabut", arabic: "العنكبوت", verses: 69, revelation: "Meccan", translation: "The Spider", bengali: "মাকড়সা", transliteration: "Al-'Ankabuut", transliterationBengali: "আল-আনকাবুত", audioUrl: getAudioUrl(29) },
  { number: 30, name: "Ar-Rum", arabic: "الروم", verses: 60, revelation: "Meccan", translation: "The Romans", bengali: "রোমানগণ", transliteration: "Ar-Ruum", transliterationBengali: "আর-রূম", audioUrl: getAudioUrl(30) },
  { number: 31, name: "Luqman", arabic: "لقمان", verses: 34, revelation: "Meccan", translation: "Luqman", bengali: "লোকমান", transliteration: "Luqmaan", transliterationBengali: "লুকমান", audioUrl: getAudioUrl(31) },
  { number: 32, name: "As-Sajdah", arabic: "السجدة", verses: 30, revelation: "Meccan", translation: "The Prostration", bengali: "সিজদা", transliteration: "As-Sajdah", transliterationBengali: "আস-সাজদাহ", audioUrl: getAudioUrl(32) },
  { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", verses: 73, revelation: "Medinan", translation: "The Combined Forces", bengali: "সম্মিলিত বাহিনী", transliteration: "Al-Ahzaab", transliterationBengali: "আল-আহযাব", audioUrl: getAudioUrl(33) },
  { number: 34, name: "Saba", arabic: "سبأ", verses: 54, revelation: "Meccan", translation: "Sheba", bengali: "সাবা", transliteration: "Saba", transliterationBengali: "সাবা", audioUrl: getAudioUrl(34) },
  { number: 35, name: "Fatir", arabic: "فاطر", verses: 45, revelation: "Meccan", translation: "The Originator", bengali: "সৃষ্টিকর্তা", transliteration: "Faatir", transliterationBengali: "ফাতির", audioUrl: getAudioUrl(35) },
  { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83, revelation: "Meccan", translation: "Ya-Sin", bengali: "ইয়াসীন", transliteration: "Yaa-Seen", transliterationBengali: "ইয়াসীন", audioUrl: getAudioUrl(36) },
  { number: 37, name: "As-Saffat", arabic: "الصافات", verses: 182, revelation: "Meccan", translation: "Those Ranged in Ranks", bengali: "সারিবদ্ধ", transliteration: "As-Saaffaat", transliterationBengali: "আস-সাফফাত", audioUrl: getAudioUrl(37) },
  { number: 38, name: "Sad", arabic: "ص", verses: 88, revelation: "Meccan", translation: "Sad", bengali: "সোয়াদ", transliteration: "Saad", transliterationBengali: "সোয়াদ", audioUrl: getAudioUrl(38) },
  { number: 39, name: "Az-Zumar", arabic: "الزمر", verses: 75, revelation: "Meccan", translation: "The Groups", bengali: "দলসমূহ", transliteration: "Az-Zumar", transliterationBengali: "আয-যুমার", audioUrl: getAudioUrl(39) },
  { number: 40, name: "Ghafir", arabic: "غافر", verses: 85, revelation: "Meccan", translation: "The Forgiver", bengali: "ক্ষমাশীল", transliteration: "Ghaafir", transliterationBengali: "গাফির", audioUrl: getAudioUrl(40) },
  { number: 41, name: "Fussilat", arabic: "فصلت", verses: 54, revelation: "Meccan", translation: "Expounded", bengali: "বিস্তারিত বিবরণ", transliteration: "Fussilat", transliterationBengali: "ফুসসিলাত", audioUrl: getAudioUrl(41) },
  { number: 42, name: "Ash-Shura", arabic: "الشورى", verses: 53, revelation: "Meccan", translation: "The Consultation", bengali: "পরামর্শ", transliteration: "Ash-Shuuraa", transliterationBengali: "আশ-শূরা", audioUrl: getAudioUrl(42) },
  { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", verses: 89, revelation: "Meccan", translation: "The Gold Adornments", bengali: "সোনালী অলঙ্কার", transliteration: "Az-Zukhruf", transliterationBengali: "আয-যুখরুফ", audioUrl: getAudioUrl(43) },
  { number: 44, name: "Ad-Dukhan", arabic: "الدخان", verses: 59, revelation: "Meccan", translation: "The Smoke", bengali: "ধোঁয়া", transliteration: "Ad-Dukhaan", transliterationBengali: "আদ-দুখান", audioUrl: getAudioUrl(44) },
  { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", verses: 37, revelation: "Meccan", translation: "The Crouching", bengali: "নতজানু", transliteration: "Al-Jaathiyah", transliterationBengali: "আল-জাসিয়াহ", audioUrl: getAudioUrl(45) },
  { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", verses: 35, revelation: "Meccan", translation: "The Sand Dunes", bengali: "বালুর পাহাড়", transliteration: "Al-Ahqaaf", transliterationBengali: "আল-আহকাফ", audioUrl: getAudioUrl(46) },
  { number: 47, name: "Muhammad", arabic: "محمد", verses: 38, revelation: "Medinan", translation: "Muhammad", bengali: "মুহাম্মাদ", transliteration: "Muhammad", transliterationBengali: "মুহাম্মাদ", audioUrl: getAudioUrl(47) },
  { number: 48, name: "Al-Fath", arabic: "الفتح", verses: 29, revelation: "Medinan", translation: "The Victory", bengali: "বিজয়", transliteration: "Al-Fath", transliterationBengali: "আল-ফাতহ", audioUrl: getAudioUrl(48) },
  { number: 49, name: "Al-Hujurat", arabic: "الحجرات", verses: 18, revelation: "Medinan", translation: "The Rooms", bengali: "কক্ষসমূহ", transliteration: "Al-Hujuraat", transliterationBengali: "আল-হুজুরাত", audioUrl: getAudioUrl(49) },
  { number: 50, name: "Qaf", arabic: "ق", verses: 45, revelation: "Meccan", translation: "Qaf", bengali: "ক্বাফ", transliteration: "Qaaf", transliterationBengali: "ক্বাফ", audioUrl: getAudioUrl(50) },
  { number: 51, name: "Adh-Dhariyat", arabic: "الذاريات", verses: 60, revelation: "Meccan", translation: "The Winnowing Winds", bengali: "বিক্ষেপকারী বাতাস", transliteration: "Adh-Dhaariyaat", transliterationBengali: "আয-যারিয়াত", audioUrl: getAudioUrl(51) },
  { number: 52, name: "At-Tur", arabic: "الطور", verses: 49, revelation: "Meccan", translation: "The Mount", bengali: "পর্বত", transliteration: "At-Tuur", transliterationBengali: "আত-তূর", audioUrl: getAudioUrl(52) },
  { number: 53, name: "An-Najm", arabic: "النجم", verses: 62, revelation: "Meccan", translation: "The Star", bengali: "তারা", transliteration: "An-Najm", transliterationBengali: "আন-নাজম", audioUrl: getAudioUrl(53) },
  { number: 54, name: "Al-Qamar", arabic: "القمر", verses: 55, revelation: "Meccan", translation: "The Moon", bengali: "চাঁদ", transliteration: "Al-Qamar", transliterationBengali: "আল-কামার", audioUrl: getAudioUrl(54) },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, revelation: "Medinan", translation: "The Beneficent", bengali: "করুণাময়", transliteration: "Ar-Rahmaan", transliterationBengali: "আর-রাহমান", audioUrl: getAudioUrl(55) },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", verses: 96, revelation: "Meccan", translation: "The Inevitable", bengali: "অবশ্যম্ভাবী", transliteration: "Al-Waaqi'ah", transliterationBengali: "আল-ওয়াকিয়াহ", audioUrl: getAudioUrl(56) },
  { number: 57, name: "Al-Hadid", arabic: "الحديد", verses: 29, revelation: "Medinan", translation: "The Iron", bengali: "লোহা", transliteration: "Al-Hadeed", transliterationBengali: "আল-হাদীদ", audioUrl: getAudioUrl(57) },
  { number: 58, name: "Al-Mujadila", arabic: "المجادلة", verses: 22, revelation: "Medinan", translation: "The Pleading Woman", bengali: "তর্ককারিণী", transliteration: "Al-Mujaadilah", transliterationBengali: "আল-মুজাদালাহ", audioUrl: getAudioUrl(58) },
  { number: 59, name: "Al-Hashr", arabic: "الحشر", verses: 24, revelation: "Medinan", translation: "The Exile", bengali: "সমাবেশ", transliteration: "Al-Hashr", transliterationBengali: "আল-হাশর", audioUrl: getAudioUrl(59) },
  { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", verses: 13, revelation: "Medinan", translation: "The Examined One", bengali: "পরীক্ষিতা", transliteration: "Al-Mumtahanah", transliterationBengali: "আল-মুমতাহিনাহ", audioUrl: getAudioUrl(60) },
  { number: 61, name: "As-Saff", arabic: "الصف", verses: 14, revelation: "Medinan", translation: "The Ranks", bengali: "সারি", transliteration: "As-Saff", transliterationBengali: "আস-সাফ", audioUrl: getAudioUrl(61) },
  { number: 62, name: "Al-Jumu'ah", arabic: "الجمعة", verses: 11, revelation: "Medinan", translation: "Friday", bengali: "জুমুআ", transliteration: "Al-Jumu'ah", transliterationBengali: "আল-জুমুআহ", audioUrl: getAudioUrl(62) },
  { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", verses: 11, revelation: "Medinan", translation: "The Hypocrites", bengali: "মুনাফিক", transliteration: "Al-Munaafiquun", transliterationBengali: "আল-মুনাফিকুন", audioUrl: getAudioUrl(63) },
  { number: 64, name: "At-Taghabun", arabic: "التغابن", verses: 18, revelation: "Medinan", translation: "The Mutual Disillusion", bengali: "মোহভঙ্গ", transliteration: "At-Taghaabun", transliterationBengali: "আত-তাগাবুন", audioUrl: getAudioUrl(64) },
  { number: 65, name: "At-Talaq", arabic: "الطلاق", verses: 12, revelation: "Medinan", translation: "The Divorce", bengali: "তালাক", transliteration: "At-Talaaq", transliterationBengali: "আত-তালাক", audioUrl: getAudioUrl(65) },
  { number: 66, name: "At-Tahrim", arabic: "التحريم", verses: 12, revelation: "Medinan", translation: "The Prohibition", bengali: "নিষেধাজ্ঞা", transliteration: "At-Tahreem", transliterationBengali: "আত-তাহরীম", audioUrl: getAudioUrl(66) },
  { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30, revelation: "Meccan", translation: "The Sovereignty", bengali: "সার্বভৌমত্ব", transliteration: "Al-Mulk", transliterationBengali: "আল-মুলক", audioUrl: getAudioUrl(67) },
  { number: 68, name: "Al-Qalam", arabic: "القلم", verses: 52, revelation: "Meccan", translation: "The Pen", bengali: "কলম", transliteration: "Al-Qalam", transliterationBengali: "আল-কালাম", audioUrl: getAudioUrl(68) },
  { number: 69, name: "Al-Haqqah", arabic: "الحاقة", verses: 52, revelation: "Meccan", translation: "The Reality", bengali: "বাস্তবতা", transliteration: "Al-Haaqqah", transliterationBengali: "আল-হাক্কাহ", audioUrl: getAudioUrl(69) },
  { number: 70, name: "Al-Ma'arij", arabic: "المعارج", verses: 44, revelation: "Meccan", translation: "The Ascending Stairways", bengali: "উর্ধ্বগামী সিঁড়ি", transliteration: "Al-Ma'aarij", transliterationBengali: "আল-মাআরিজ", audioUrl: getAudioUrl(70) },
  { number: 71, name: "Nuh", arabic: "نوح", verses: 28, revelation: "Meccan", translation: "Noah", bengali: "নূহ", transliteration: "Nuuh", transliterationBengali: "নূহ", audioUrl: getAudioUrl(71) },
  { number: 72, name: "Al-Jinn", arabic: "الجن", verses: 28, revelation: "Meccan", translation: "The Jinn", bengali: "জ্বিন", transliteration: "Al-Jinn", transliterationBengali: "আল-জিন", audioUrl: getAudioUrl(72) },
  { number: 73, name: "Al-Muzzammil", arabic: "المزمل", verses: 20, revelation: "Meccan", translation: "The Enshrouded One", bengali: "বস্ত্রাবৃত", transliteration: "Al-Muzzammil", transliterationBengali: "আল-মুযযাম্মিল", audioUrl: getAudioUrl(73) },
  { number: 74, name: "Al-Muddaththir", arabic: "المدثر", verses: 56, revelation: "Meccan", translation: "The Cloaked One", bengali: "চাদরাবৃত", transliteration: "Al-Muddaththir", transliterationBengali: "আল-মুদ্দাসসির", audioUrl: getAudioUrl(74) },
  { number: 75, name: "Al-Qiyamah", arabic: "القيامة", verses: 40, revelation: "Meccan", translation: "The Resurrection", bengali: "পুনরুত্থান", transliteration: "Al-Qiyaamah", transliterationBengali: "আল-কিয়ামাহ", audioUrl: getAudioUrl(75) },
  { number: 76, name: "Al-Insan", arabic: "الإنسان", verses: 31, revelation: "Medinan", translation: "The Human", bengali: "মানুষ", transliteration: "Al-Insaan", transliterationBengali: "আল-ইনসান", audioUrl: getAudioUrl(76) },
  { number: 77, name: "Al-Mursalat", arabic: "المرسلات", verses: 50, revelation: "Meccan", translation: "The Emissaries", bengali: "প্রেরিত", transliteration: "Al-Mursalaat", transliterationBengali: "আল-মুরসালাত", audioUrl: getAudioUrl(77) },
  { number: 78, name: "An-Naba", arabic: "النبأ", verses: 40, revelation: "Meccan", translation: "The Tidings", bengali: "সংবাদ", transliteration: "An-Naba", transliterationBengali: "আন-নাবা", audioUrl: getAudioUrl(78) },
  { number: 79, name: "An-Nazi'at", arabic: "النازعات", verses: 46, revelation: "Meccan", translation: "Those Who Drag Forth", bengali: "আকর্ষণকারী", transliteration: "An-Naazi'aat", transliterationBengali: "আন-নাযিআত", audioUrl: getAudioUrl(79) },
  { number: 80, name: "Abasa", arabic: "عبس", verses: 42, revelation: "Meccan", translation: "He Frowned", bengali: "ভ্রুকুটি", transliteration: "'Abasa", transliterationBengali: "আবাসা", audioUrl: getAudioUrl(80) },
  { number: 81, name: "At-Takwir", arabic: "التكوير", verses: 29, revelation: "Meccan", translation: "The Overthrowing", bengali: "গুটিয়ে নেওয়া", transliteration: "At-Takwiir", transliterationBengali: "আত-তাকভীর", audioUrl: getAudioUrl(81) },
  { number: 82, name: "Al-Infitar", arabic: "الانفطار", verses: 19, revelation: "Meccan", translation: "The Cleaving", bengali: "বিদীর্ণ হওয়া", transliteration: "Al-Infitaar", transliterationBengali: "আল-ইনফিতার", audioUrl: getAudioUrl(82) },
  { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", verses: 36, revelation: "Meccan", translation: "The Defrauding", bengali: "প্রতারণাকারী", transliteration: "Al-Mutaffifiin", transliterationBengali: "আল-মুতাফফিফীন", audioUrl: getAudioUrl(83) },
  { number: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", verses: 25, revelation: "Meccan", translation: "The Sundering", bengali: "বিদীর্ণ হওয়া", transliteration: "Al-Inshiqaaq", transliterationBengali: "আল-ইনশিকাক", audioUrl: getAudioUrl(84) },
  { number: 85, name: "Al-Buruj", arabic: "البروج", verses: 22, revelation: "Meccan", translation: "The Mansions of the Stars", bengali: "রাশিচক্র", transliteration: "Al-Buruuj", transliterationBengali: "আল-বুরূজ", audioUrl: getAudioUrl(85) },
  { number: 86, name: "At-Tariq", arabic: "الطارق", verses: 17, revelation: "Meccan", translation: "The Nightcomer", bengali: "রাত্রি আগন্তুক", transliteration: "At-Taariq", transliterationBengali: "আত-তারিক", audioUrl: getAudioUrl(86) },
  { number: 87, name: "Al-A'la", arabic: "الأعلى", verses: 19, revelation: "Meccan", translation: "The Most High", bengali: "সর্বোচ্চ", transliteration: "Al-A'laa", transliterationBengali: "আল-আলা", audioUrl: getAudioUrl(87) },
  { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", verses: 26, revelation: "Meccan", translation: "The Overwhelming", bengali: "আচ্ছন্নকারী", transliteration: "Al-Ghaashiyah", transliterationBengali: "আল-গাশিয়াহ", audioUrl: getAudioUrl(88) },
  { number: 89, name: "Al-Fajr", arabic: "الفجر", verses: 30, revelation: "Meccan", translation: "The Dawn", bengali: "ভোর", transliteration: "Al-Fajr", transliterationBengali: "আল-ফজর", audioUrl: getAudioUrl(89) },
  { number: 90, name: "Al-Balad", arabic: "البلد", verses: 20, revelation: "Meccan", translation: "The City", bengali: "শহর", transliteration: "Al-Balad", transliterationBengali: "আল-বালাদ", audioUrl: getAudioUrl(90) },
  { number: 91, name: "Ash-Shams", arabic: "الشمس", verses: 15, revelation: "Meccan", translation: "The Sun", bengali: "সূর্য", transliteration: "Ash-Shams", transliterationBengali: "আশ-শামস", audioUrl: getAudioUrl(91) },
  { number: 92, name: "Al-Layl", arabic: "الليل", verses: 21, revelation: "Meccan", translation: "The Night", bengali: "রাত", transliteration: "Al-Layl", transliterationBengali: "আল-লাইল", audioUrl: getAudioUrl(92) },
  { number: 93, name: "Ad-Duha", arabic: "الضحى", verses: 11, revelation: "Meccan", translation: "The Morning Hours", bengali: "পূর্বাহ্ন", transliteration: "Ad-Duhaa", transliterationBengali: "আদ-দুহা", audioUrl: getAudioUrl(93) },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", verses: 8, revelation: "Meccan", translation: "The Relief", bengali: "বক্ষ প্রশস্তকরণ", transliteration: "Ash-Sharh", transliterationBengali: "আশ-শারহ", audioUrl: getAudioUrl(94) },
  { number: 95, name: "At-Tin", arabic: "التين", verses: 8, revelation: "Meccan", translation: "The Fig", bengali: "ডুমুর", transliteration: "At-Tiin", transliterationBengali: "আত-তীন", audioUrl: getAudioUrl(95) },
  { number: 96, name: "Al-Alaq", arabic: "العلق", verses: 19, revelation: "Meccan", translation: "The Clot", bengali: "জমাট রক্ত", transliteration: "Al-'Alaq", transliterationBengali: "আল-আলাক", audioUrl: getAudioUrl(96) },
  { number: 97, name: "Al-Qadr", arabic: "القدر", verses: 5, revelation: "Meccan", translation: "The Power", bengali: "মহিমান্বিত রাত", transliteration: "Al-Qadr", transliterationBengali: "আল-কদর", audioUrl: getAudioUrl(97) },
  { number: 98, name: "Al-Bayyinah", arabic: "البينة", verses: 8, revelation: "Medinan", translation: "The Clear Proof", bengali: "সুস্পষ্ট প্রমাণ", transliteration: "Al-Bayyinah", transliterationBengali: "আল-বায়্যিনাহ", audioUrl: getAudioUrl(98) },
  { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", verses: 8, revelation: "Medinan", translation: "The Earthquake", bengali: "ভূমিকম্প", transliteration: "Az-Zalzalah", transliterationBengali: "আয-যালযালাহ", audioUrl: getAudioUrl(99) },
  { number: 100, name: "Al-Adiyat", arabic: "العاديات", verses: 11, revelation: "Meccan", translation: "The Courser", bengali: "অশ্বারোহী", transliteration: "Al-'Aadiyaat", transliterationBengali: "আল-আদিয়াত", audioUrl: getAudioUrl(100) },
  { number: 101, name: "Al-Qari'ah", arabic: "القارعة", verses: 11, revelation: "Meccan", translation: "The Calamity", bengali: "মহাবিপদ", transliteration: "Al-Qaari'ah", transliterationBengali: "আল-কারিয়াহ", audioUrl: getAudioUrl(101) },
  { number: 102, name: "At-Takathur", arabic: "التكاثر", verses: 8, revelation: "Meccan", translation: "The Rivalry in World Increase", bengali: "প্রাচুর্যের প্রতিযোগিতা", transliteration: "At-Takaathur", transliterationBengali: "আত-তাকাসুর", audioUrl: getAudioUrl(102) },
  { number: 103, name: "Al-Asr", arabic: "العصر", verses: 3, revelation: "Meccan", translation: "The Declining Day", bengali: "সময়", transliteration: "Al-'Asr", transliterationBengali: "আল-আসর", audioUrl: getAudioUrl(103) },
  { number: 104, name: "Al-Humazah", arabic: "الهمزة", verses: 9, revelation: "Meccan", translation: "The Traducer", bengali: "পরনিন্দাকারী", transliteration: "Al-Humazah", transliterationBengali: "আল-হুমাযাহ", audioUrl: getAudioUrl(104) },
  { number: 105, name: "Al-Fil", arabic: "الفيل", verses: 5, revelation: "Meccan", translation: "The Elephant", bengali: "হাতি", transliteration: "Al-Fiil", transliterationBengali: "আল-ফীল", audioUrl: getAudioUrl(105) },
  { number: 106, name: "Quraysh", arabic: "قريش", verses: 4, revelation: "Meccan", translation: "Quraysh", bengali: "কুরাইশ", transliteration: "Quraysh", transliterationBengali: "কুরাইশ", audioUrl: getAudioUrl(106) },
  { number: 107, name: "Al-Ma'un", arabic: "الماعون", verses: 7, revelation: "Meccan", translation: "The Small Kindnesses", bengali: "সাধারণ প্রয়োজনীয় বস্তু", transliteration: "Al-Maa'uun", transliterationBengali: "আল-মাউন", audioUrl: getAudioUrl(107) },
  { number: 108, name: "Al-Kawthar", arabic: "الكوثر", verses: 3, revelation: "Meccan", translation: "The Abundance", bengali: "প্রাচুর্য", transliteration: "Al-Kawthar", transliterationBengali: "আল-কাওসার", audioUrl: getAudioUrl(108) },
  { number: 109, name: "Al-Kafirun", arabic: "الكافرون", verses: 6, revelation: "Meccan", translation: "The Disbelievers", bengali: "অবিশ্বাসীরা", transliteration: "Al-Kaafiruun", transliterationBengali: "আল-কাফিরুন", audioUrl: getAudioUrl(109) },
  { number: 110, name: "An-Nasr", arabic: "النصر", verses: 3, revelation: "Medinan", translation: "The Divine Support", bengali: "সাহায্য", transliteration: "An-Nasr", transliterationBengali: "আন-নাসর", audioUrl: getAudioUrl(110) },
  { number: 111, name: "Al-Masad", arabic: "المسد", verses: 5, revelation: "Meccan", translation: "The Palm Fiber", bengali: "পাকানো রশি", transliteration: "Al-Masad", transliterationBengali: "আল-মাসাদ", audioUrl: getAudioUrl(111) },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, revelation: "Meccan", translation: "The Sincerity", bengali: "একনিষ্ঠতা", transliteration: "Al-Ikhlaas", transliterationBengali: "আল-ইখলাস", audioUrl: getAudioUrl(112) },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, revelation: "Meccan", translation: "The Daybreak", bengali: "ভোরের আলো", transliteration: "Al-Falaq", transliterationBengali: "আল-ফালাক", audioUrl: getAudioUrl(113) },
  { number: 114, name: "An-Nas", arabic: "الناس", verses: 6, revelation: "Meccan", translation: "Mankind", bengali: "মানবজাতি", transliteration: "An-Naas", transliterationBengali: "আন-নাস", audioUrl: getAudioUrl(114) },
];

export function getSurahByNumber(number: number): Surah | undefined {
  return SURAHS.find(s => s.number === number);
}

export function searchSurahs(query: string): Surah[] {
  const q = query.toLowerCase();
  return SURAHS.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.arabic.includes(query) ||
    s.translation.toLowerCase().includes(q) ||
    s.bengali.includes(query) ||
    s.transliteration.toLowerCase().includes(q) ||
    s.transliterationBengali.includes(query)
  );
}
