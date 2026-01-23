export interface Dua {
  id: string;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
  source: string;
}

export const DUAS: Dua[] = [
  {
    id: "morning-1",
    category: "Morning & Evening",
    title: "Morning Remembrance",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
    english: "We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner.",
    bengali: "আমরা সকালে উপনীত হয়েছি এবং এই সময়ে সকল সার্বভৌমত্ব আল্লাহর। সকল প্রশংসা আল্লাহর জন্য। আল্লাহ ব্যতীত কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই।",
    source: "Abu Dawud"
  },
  {
    id: "morning-2",
    category: "Morning & Evening",
    title: "Seeking Protection in the Morning",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor",
    english: "O Allah, by Your leave we have reached the morning, by Your leave we have reached the evening, by Your leave we live, by Your leave we die, and unto You is our resurrection.",
    bengali: "হে আল্লাহ, তোমার অনুগ্রহে আমরা সকালে উপনীত হয়েছি, তোমার অনুগ্রহে আমরা সন্ধ্যায় উপনীত হই, তোমার অনুগ্রহে আমরা জীবিত থাকি, তোমার অনুগ্রহে আমরা মৃত্যুবরণ করি এবং তোমার কাছেই আমাদের পুনরুত্থান।",
    source: "Tirmidhi"
  },
  {
    id: "evening-1",
    category: "Morning & Evening",
    title: "Evening Remembrance",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
    english: "We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner.",
    bengali: "আমরা সন্ধ্যায় উপনীত হয়েছি এবং এই সময়ে সকল সার্বভৌমত্ব আল্লাহর। সকল প্রশংসা আল্লাহর জন্য।",
    source: "Abu Dawud"
  },
  {
    id: "sleep-1",
    category: "Sleep",
    title: "Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amootu wa ahya",
    english: "In Your name O Allah, I die and I live.",
    bengali: "হে আল্লাহ, তোমার নামে আমি মৃত্যুবরণ করি এবং জীবিত হই।",
    source: "Bukhari"
  },
  {
    id: "sleep-2",
    category: "Sleep",
    title: "Seeking Protection Before Sleep",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
    english: "O Allah, protect me from Your punishment on the day Your servants are resurrected.",
    bengali: "হে আল্লাহ, যেদিন তুমি তোমার বান্দাদের পুনরুত্থিত করবে সেদিন আমাকে তোমার শাস্তি থেকে রক্ষা কর।",
    source: "Abu Dawud"
  },
  {
    id: "wakeup-1",
    category: "Waking Up",
    title: "Upon Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor",
    english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের মৃত্যুর পর জীবন দান করেছেন এবং তাঁর কাছেই পুনরুত্থান।",
    source: "Bukhari"
  },
  {
    id: "bathroom-1",
    category: "Bathroom",
    title: "Entering the Bathroom",
    arabic: "بِسْمِ اللَّهِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Bismillahi Allahumma inni a'udhu bika minal khubuthi wal khaba'ith",
    english: "In the name of Allah. O Allah, I seek refuge in You from all evil and evil-doers.",
    bengali: "আল্লাহর নামে। হে আল্লাহ, আমি তোমার কাছে সকল অপবিত্রতা ও অপবিত্র জিনিস থেকে আশ্রয় চাই।",
    source: "Bukhari, Muslim"
  },
  {
    id: "bathroom-2",
    category: "Bathroom",
    title: "Leaving the Bathroom",
    arabic: "غُفْرَانَكَ",
    transliteration: "Ghufranaka",
    english: "I seek Your forgiveness.",
    bengali: "আমি তোমার ক্ষমা প্রার্থনা করছি।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "wudu-1",
    category: "Wudu (Ablution)",
    title: "Before Wudu",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    english: "In the name of Allah.",
    bengali: "আল্লাহর নামে।",
    source: "Abu Dawud"
  },
  {
    id: "wudu-2",
    category: "Wudu (Ablution)",
    title: "After Wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la shareeka lah, wa ashhadu anna Muhammadan 'abduhu wa rasooluh",
    english: "I bear witness that none has the right to be worshipped except Allah, alone, without any partner, and I bear witness that Muhammad is His slave and Messenger.",
    bengali: "আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে মুহাম্মাদ তাঁর বান্দা ও রাসূল।",
    source: "Muslim"
  },
  {
    id: "mosque-1",
    category: "Mosque",
    title: "Entering the Mosque",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaf-tahli abwaba rahmatik",
    english: "O Allah, open the gates of Your mercy for me.",
    bengali: "হে আল্লাহ, আমার জন্য তোমার রহমতের দরজা খুলে দাও।",
    source: "Muslim"
  },
  {
    id: "mosque-2",
    category: "Mosque",
    title: "Leaving the Mosque",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadlik",
    english: "O Allah, I ask You for Your favor.",
    bengali: "হে আল্লাহ, আমি তোমার অনুগ্রহ প্রার্থনা করছি।",
    source: "Muslim"
  },
  {
    id: "food-1",
    category: "Food & Drink",
    title: "Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    english: "In the name of Allah.",
    bengali: "আল্লাহর নামে।",
    source: "Abu Dawud"
  },
  {
    id: "food-2",
    category: "Food & Drink",
    title: "After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimeen",
    english: "All praise is for Allah who fed us, gave us drink, and made us Muslims.",
    bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানালেন।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "food-3",
    category: "Food & Drink",
    title: "When Forgetting Bismillah",
    arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
    transliteration: "Bismillahi awwalahu wa akhirah",
    english: "In the name of Allah at the beginning and at the end.",
    bengali: "শুরুতে এবং শেষে আল্লাহর নামে।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "travel-1",
    category: "Travel",
    title: "Travel Supplication",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon",
    english: "Glory to Him who has subjected this to us, and we could never have it by our efforts. And to our Lord we shall surely return.",
    bengali: "পবিত্র সেই সত্তা যিনি এটি আমাদের বশীভূত করে দিয়েছেন, অন্যথায় আমরা এটি বশ করতে সক্ষম ছিলাম না। এবং আমরা অবশ্যই আমাদের প্রভুর কাছে প্রত্যাবর্তন করব।",
    source: "Muslim"
  },
  {
    id: "travel-2",
    category: "Travel",
    title: "When Entering a Town",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهَا",
    transliteration: "Allahumma barik lana fiha",
    english: "O Allah, bless us in it.",
    bengali: "হে আল্লাহ, এতে আমাদের জন্য বরকত দাও।",
    source: "Tabarani"
  },
  {
    id: "dress-1",
    category: "Clothing",
    title: "When Wearing New Clothes",
    arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ",
    transliteration: "Allahumma lakal-hamdu anta kasawtanihi, as'aluka min khayrihi wa khayri ma suni'a lah",
    english: "O Allah, for You is all praise, You have clothed me with it. I ask You for its good and the good of that for which it was made.",
    bengali: "হে আল্লাহ, সমস্ত প্রশংসা তোমার, তুমি আমাকে এটি পরিয়েছ। আমি তোমার কাছে এর কল্যাণ এবং যে উদ্দেশ্যে এটি তৈরি হয়েছে তার কল্যাণ প্রার্থনা করছি।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "home-1",
    category: "Home",
    title: "Entering the Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi Rabbina tawakkalna",
    english: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend.",
    bengali: "আল্লাহর নামে আমরা প্রবেশ করি, আল্লাহর নামে আমরা বের হই এবং আমাদের প্রভুর উপর আমরা নির্ভর করি।",
    source: "Abu Dawud"
  },
  {
    id: "home-2",
    category: "Home",
    title: "Leaving the Home",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
    english: "In the name of Allah, I place my trust in Allah, there is no might and no power except with Allah.",
    bengali: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করি, আল্লাহ ছাড়া কোনো শক্তি ও ক্ষমতা নেই।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "distress-1",
    category: "Distress & Anxiety",
    title: "When in Distress",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "La ilaha illallahul-'Adheemul-Haleem, la ilaha illallahu Rabbul-'Arshil-'Adheem",
    english: "There is none worthy of worship except Allah, the Mighty, the Forbearing. There is none worthy of worship except Allah, the Lord of the Magnificent Throne.",
    bengali: "আল্লাহ ছাড়া কোনো ইলাহ নেই, মহান ও সহনশীল। আল্লাহ ছাড়া কোনো ইলাহ নেই, মহান আরশের প্রভু।",
    source: "Bukhari, Muslim"
  },
  {
    id: "distress-2",
    category: "Distress & Anxiety",
    title: "For Anxiety and Sorrow",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal",
    english: "O Allah, I seek refuge in You from anxiety and sorrow, and from inability and laziness.",
    bengali: "হে আল্লাহ, আমি তোমার কাছে দুশ্চিন্তা ও দুঃখ থেকে এবং অক্ষমতা ও অলসতা থেকে আশ্রয় চাই।",
    source: "Bukhari"
  },
  {
    id: "forgiveness-1",
    category: "Forgiveness",
    title: "Seeking Forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullahal-'Adheema alladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh",
    english: "I seek forgiveness from Allah, the Mighty, whom there is none worthy of worship except Him, the Living, the Eternal, and I repent to Him.",
    bengali: "আমি মহান আল্লাহর কাছে ক্ষমা প্রার্থনা করছি, তিনি ছাড়া কোনো ইলাহ নেই, চিরজীবী, সর্বসত্তার ধারক এবং আমি তাঁর কাছে তওবা করছি।",
    source: "Tirmidhi"
  },
  {
    id: "forgiveness-2",
    category: "Forgiveness",
    title: "Master Supplication for Forgiveness",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka",
    english: "O Allah, You are my Lord. There is no god except You. You created me and I am Your servant.",
    bengali: "হে আল্লাহ, তুমি আমার প্রভু। তুমি ছাড়া কোনো ইলাহ নেই। তুমি আমাকে সৃষ্টি করেছ এবং আমি তোমার বান্দা।",
    source: "Bukhari"
  },
  {
    id: "rain-1",
    category: "Weather",
    title: "When It Rains",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    transliteration: "Allahumma sayyiban nafi'a",
    english: "O Allah, make it a beneficial rain.",
    bengali: "হে আল্লাহ, একে উপকারী বৃষ্টি বানাও।",
    source: "Bukhari"
  },
  {
    id: "thunder-1",
    category: "Weather",
    title: "When Hearing Thunder",
    arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
    transliteration: "Subhanal-ladhi yusabbihur-ra'du bihamdihi wal-mala'ikatu min khifatih",
    english: "Glory to Him whom the thunder glorifies with His praise, as do the angels out of fear of Him.",
    bengali: "পবিত্র সেই সত্তা যার প্রশংসাসহ বজ্র তসবীহ পাঠ করে এবং ফেরেশতারা তাঁর ভয়ে।",
    source: "Muwatta Malik"
  },
  {
    id: "wind-1",
    category: "Weather",
    title: "When the Wind Blows",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا",
    transliteration: "Allahumma inni as'aluka khayraha, wa a'udhu bika min sharriha",
    english: "O Allah, I ask You for its good, and I seek refuge in You from its evil.",
    bengali: "হে আল্লাহ, আমি তোমার কাছে এর কল্যাণ চাই এবং এর অনিষ্ট থেকে আশ্রয় চাই।",
    source: "Abu Dawud"
  },
  {
    id: "sick-1",
    category: "Sickness",
    title: "When Visiting the Sick",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa tahoorun in sha Allah",
    english: "No worry, it is a purification, if Allah wills.",
    bengali: "চিন্তার কিছু নেই, ইনশাআল্লাহ এটি পবিত্রতা।",
    source: "Bukhari"
  },
  {
    id: "sick-2",
    category: "Sickness",
    title: "Supplication for the Sick",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِهِ وَأَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma Rabban-nasi adhhibil-ba'sa ishfihi wa antash-shafi la shifa'a illa shifa'uka shifa'an la yughadiru saqama",
    english: "O Allah, Lord of mankind, remove the affliction and send down healing as You are the Healer. There is no cure but Your cure, a cure that leaves no illness behind.",
    bengali: "হে আল্লাহ, মানবজাতির প্রভু, কষ্ট দূর কর এবং সুস্থতা দান কর, কারণ তুমিই সুস্থতাদানকারী। তোমার শিফা ছাড়া কোনো শিফা নেই, এমন শিফা যা কোনো রোগ ছেড়ে যায় না।",
    source: "Bukhari, Muslim"
  },
  {
    id: "parent-1",
    category: "Parents",
    title: "Supplication for Parents",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
    transliteration: "Rabbighfir li wa liwalidayya wa liman dakhala baytiya mu'minan wa lilmu'mineena wal-mu'minaat",
    english: "My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and believing women.",
    bengali: "হে আমার প্রভু, আমাকে, আমার পিতামাতাকে এবং যারা মু'মিন হিসেবে আমার ঘরে প্রবেশ করে তাদের এবং মু'মিন পুরুষ ও মু'মিন নারীদের ক্ষমা কর।",
    source: "Quran 71:28"
  },
  {
    id: "parent-2",
    category: "Parents",
    title: "Mercy for Parents",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbir-hamhuma kama rabbayani sagheera",
    english: "My Lord, have mercy upon them as they brought me up when I was small.",
    bengali: "হে আমার প্রভু, তাদের প্রতি রহম কর যেমন তারা আমাকে ছোটবেলায় লালন-পালন করেছেন।",
    source: "Quran 17:24"
  },
  {
    id: "marriage-1",
    category: "Marriage",
    title: "For the Newlywed Couple",
    arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration: "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fi khayr",
    english: "May Allah bless you, shower His blessings upon you, and join you together in goodness.",
    bengali: "আল্লাহ তোমাকে বরকত দান করুন, তোমার উপর বরকত বর্ষণ করুন এবং তোমাদের দুজনকে কল্যাণের মধ্যে একত্রিত করুন।",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "knowledge-1",
    category: "Knowledge",
    title: "Seeking Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    english: "My Lord, increase me in knowledge.",
    bengali: "হে আমার প্রভু, আমার জ্ঞান বৃদ্ধি করে দাও।",
    source: "Quran 20:114"
  },
  {
    id: "knowledge-2",
    category: "Knowledge",
    title: "Beneficial Knowledge",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbala",
    english: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
    bengali: "হে আল্লাহ, আমি তোমার কাছে উপকারী জ্ঞান, ভালো রিজিক এবং গ্রহণযোগ্য আমল প্রার্থনা করছি।",
    source: "Ibn Majah"
  },
  {
    id: "protection-1",
    category: "Protection",
    title: "Seeking Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    bengali: "আমি আল্লাহর পরিপূর্ণ কালামের আশ্রয় নিচ্ছি তাঁর সৃষ্টির অনিষ্ট থেকে।",
    source: "Muslim"
  },
  {
    id: "protection-2",
    category: "Protection",
    title: "Ayatul Kursi",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration: "Allahu la ilaha illa huwal-Hayyul-Qayyum, la ta'khudhuhu sinatun wa la nawm",
    english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    bengali: "আল্লাহ - তিনি ছাড়া কোনো ইলাহ নেই, চিরজীবী, সর্বসত্তার ধারক। তাঁকে তন্দ্রা স্পর্শ করে না এবং নিদ্রাও না।",
    source: "Quran 2:255"
  },
  {
    id: "guidance-1",
    category: "Guidance",
    title: "Seeking Guidance (Istikhara)",
    arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
    transliteration: "Allahumma inni astakhiruka bi'ilmika, wa astaqdiruka biqudratika, wa as'aluka min fadlikal-'adheem",
    english: "O Allah, I seek Your guidance by virtue of Your knowledge, and I seek ability by virtue of Your power, and I ask You of Your great bounty.",
    bengali: "হে আল্লাহ, আমি তোমার জ্ঞানের দ্বারা তোমার নির্দেশনা চাই, তোমার ক্ষমতার দ্বারা সামর্থ্য চাই এবং তোমার মহান অনুগ্রহ প্রার্থনা করি।",
    source: "Bukhari"
  },
  {
    id: "debt-1",
    category: "Debt & Provision",
    title: "Relief from Debt",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration: "Allahummak-fini bihalalika 'an haramik, wa aghnini bifadlika 'amman siwak",
    english: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and enrich me with Your favor instead of all others.",
    bengali: "হে আল্লাহ, তোমার হারামের বদলে তোমার হালাল দিয়ে আমাকে যথেষ্ট কর এবং তোমার অনুগ্রহে অন্যদের থেকে আমাকে অমুখাপেক্ষী কর।",
    source: "Tirmidhi"
  },
  {
    id: "death-1",
    category: "Death & Afterlife",
    title: "Good End",
    arabic: "اللَّهُمَّ أَحْسِنْ عَاقِبَتَنَا فِي الْأُمُورِ كُلِّهَا، وَأَجِرْنَا مِنْ خِزْيِ الدُّنْيَا وَعَذَابِ الْآخِرَةِ",
    transliteration: "Allahumma ahsin 'aqibatana fil-umuri kulliha, wa ajirna min khizyid-dunya wa 'adhabil-akhirah",
    english: "O Allah, make good our end in all matters, and save us from the disgrace of this world and the punishment of the Hereafter.",
    bengali: "হে আল্লাহ, সব বিষয়ে আমাদের পরিণাম ভালো কর এবং আমাদের দুনিয়ার লজ্জা ও আখিরাতের শাস্তি থেকে রক্ষা কর।",
    source: "Ahmad"
  },
  {
    id: "fasting-1",
    category: "Fasting",
    title: "Breaking the Fast",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahaba-dhama' wab-tallati al-'urooqu wa thabatal-ajru in sha Allah",
    english: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
    bengali: "তৃষ্ণা দূর হয়েছে, শিরা সিক্ত হয়েছে এবং ইনশাআল্লাহ প্রতিদান নিশ্চিত হয়েছে।",
    source: "Abu Dawud"
  },
  {
    id: "hajj-1",
    category: "Hajj & Umrah",
    title: "Talbiyah",
    arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    transliteration: "Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak",
    english: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace, and sovereignty belong to You. You have no partner.",
    bengali: "আমি হাজির হে আল্লাহ, আমি হাজির। আমি হাজির, তোমার কোনো শরীক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, নেয়ামত ও সার্বভৌমত্ব তোমার। তোমার কোনো শরীক নেই।",
    source: "Bukhari, Muslim"
  },
  {
    id: "morning-3",
    category: "Morning & Evening",
    title: "SubhanAllah, Alhamdulillah, Allahu Akbar",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
    transliteration: "Subhanallahi wa bihamdihi 'adada khalqihi wa rida nafsihi wa zinata 'arshihi wa midada kalimatih",
    english: "Glory be to Allah and His is the praise, as many times as the number of His creatures, in accordance with His pleasure, and as much as the weight of His Throne, and as much as the ink used in His words.",
    bengali: "আল্লাহ পবিত্র এবং তাঁর প্রশংসা, তাঁর সৃষ্টির সংখ্যার সমান, তাঁর সন্তুষ্টি অনুযায়ী, তাঁর আরশের ওজনের সমান এবং তাঁর কালামের কালির সমান।",
    source: "Muslim"
  },
  {
    id: "dua-anger",
    category: "Character",
    title: "When Angry",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahi minash-shaytanir-rajeem",
    english: "I seek refuge in Allah from Satan, the outcast.",
    bengali: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় নিচ্ছি।",
    source: "Bukhari, Muslim"
  },
  {
    id: "gratitude-1",
    category: "Gratitude",
    title: "Thanks to Allah",
    arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ",
    transliteration: "Alhamdulillahi 'ala kulli hal",
    english: "All praise is for Allah in all circumstances.",
    bengali: "সর্বাবস্থায় আল্লাহর জন্য সমস্ত প্রশংসা।",
    source: "Ibn Majah"
  },
  {
    id: "mirror-1",
    category: "Daily Life",
    title: "Looking in the Mirror",
    arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    transliteration: "Allahumma anta hassanta khalqi fahassin khuluqi",
    english: "O Allah, as You have made my outward form beautiful, make my character beautiful too.",
    bengali: "হে আল্লাহ, তুমি আমার বাহ্যিক গঠন সুন্দর করেছ, আমার চরিত্রও সুন্দর করে দাও।",
    source: "Ahmad"
  },
  {
    id: "gathering-1",
    category: "Gatherings",
    title: "Leaving a Gathering",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    transliteration: "Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa anta, astaghfiruka wa atubu ilayk",
    english: "Glory is to You, O Allah, and praise. I bear witness that there is none worthy of worship but You. I seek Your forgiveness and repent to You.",
    bengali: "হে আল্লাহ, তুমি পবিত্র এবং তোমার প্রশংসা। আমি সাক্ষ্য দিচ্ছি যে তুমি ছাড়া কোনো ইলাহ নেই। আমি তোমার কাছে ক্ষমা চাই এবং তোমার কাছে তওবা করি।",
    source: "Tirmidhi"
  },
];

export function getDuasByCategory(): { category: string; duas: Dua[] }[] {
  const categories = [...new Set(DUAS.map((d) => d.category))];
  return categories.map((category) => ({
    category,
    duas: DUAS.filter((d) => d.category === category),
  }));
}

export function searchDuas(query: string): Dua[] {
  const q = query.toLowerCase();
  return DUAS.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.english.toLowerCase().includes(q)
  );
}
