export interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
}

export interface SurahVerses {
  surahNumber: number;
  verses: Verse[];
}

export const SURAH_VERSES: SurahVerses[] = [
  {
    surahNumber: 1,
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillahir Rahmanir Raheem", english: "In the name of Allah, the Most Gracious, the Most Merciful", bengali: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে" },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Alhamdu lillahi Rabbil 'aalameen", english: "All praise is due to Allah, Lord of the worlds", bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি সকল সৃষ্টির প্রতিপালক" },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-Rahmanir-Raheem", english: "The Most Gracious, the Most Merciful", bengali: "পরম করুণাময়, অতি দয়ালু" },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Maaliki Yawmid-Deen", english: "Master of the Day of Judgment", bengali: "বিচার দিবসের মালিক" },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyaka na'budu wa iyyaka nasta'een", english: "You alone we worship, and You alone we ask for help", bengali: "আমরা শুধু তোমারই ইবাদত করি এবং শুধু তোমারই কাছে সাহায্য চাই" },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdinas-Siraatal-Mustaqeem", english: "Guide us to the straight path", bengali: "আমাদেরকে সরল পথ দেখাও" },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Siraatal-lazeena an'amta 'alaihim ghairil-maghdoobi 'alaihim wa lad-daaalleen", english: "The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray", bengali: "তাদের পথ যাদের তুমি অনুগ্রহ করেছ, তাদের নয় যাদের প্রতি গজব নাযিল হয়েছে এবং তাদেরও নয় যারা পথভ্রষ্ট" }
    ]
  },
  {
    surahNumber: 112,
    verses: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwal laahu ahad", english: "Say, He is Allah, the One", bengali: "বলুন, তিনি আল্লাহ, এক" },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allahus-samad", english: "Allah, the Eternal Refuge", bengali: "আল্লাহ অমুখাপেক্ষী" },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yoolad", english: "He neither begets nor is born", bengali: "তিনি কাউকে জন্ম দেননি এবং কেউ তাঁকে জন্ম দেয়নি" },
      { number: 4, arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahu kufuwan ahad", english: "Nor is there to Him any equivalent", bengali: "এবং তাঁর সমতুল্য কেউ নেই" }
    ]
  },
  {
    surahNumber: 113,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'oozu bi rabbil-falaq", english: "Say, I seek refuge in the Lord of daybreak", bengali: "বলুন, আমি আশ্রয় চাই ভোরের প্রভুর" },
      { number: 2, arabic: "مِنْ شَرِّ مَا خَلَقَ", transliteration: "Min sharri ma khalaq", english: "From the evil of that which He created", bengali: "তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে" },
      { number: 3, arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min sharri ghasiqin iza waqab", english: "And from the evil of darkness when it settles", bengali: "এবং অন্ধকার রাতের অনিষ্ট থেকে যখন তা গভীর হয়" },
      { number: 4, arabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min sharrin-naffaasaati fil 'uqad", english: "And from the evil of the blowers in knots", bengali: "এবং গিরায় ফুঁক দেওয়া জাদুকরদের অনিষ্ট থেকে" },
      { number: 5, arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min sharri haasidin iza hasad", english: "And from the evil of an envier when he envies", bengali: "এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে" }
    ]
  },
  {
    surahNumber: 114,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'oozu bi rabbin-naas", english: "Say, I seek refuge in the Lord of mankind", bengali: "বলুন, আমি আশ্রয় চাই মানুষের প্রভুর" },
      { number: 2, arabic: "مَلِكِ النَّاسِ", transliteration: "Malikin-naas", english: "The Sovereign of mankind", bengali: "মানুষের অধিপতির" },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilaahin-naas", english: "The God of mankind", bengali: "মানুষের মা'বুদের" },
      { number: 4, arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min sharril waswaasil khannaas", english: "From the evil of the retreating whisperer", bengali: "কুমন্ত্রণাদাতা পিছু হটে যাওয়া শয়তানের অনিষ্ট থেকে" },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Allazee yuwaswisu fee sudoorin-naas", english: "Who whispers in the breasts of mankind", bengali: "যে মানুষের অন্তরে কুমন্ত্রণা দেয়" },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal-jinnati wannaas", english: "From among the jinn and mankind", bengali: "জ্বিন ও মানুষের মধ্য থেকে" }
    ]
  },
  {
    surahNumber: 110,
    verses: [
      { number: 1, arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", transliteration: "Iza jaa'a nasrul-laahi wal-fath", english: "When the victory of Allah has come and the conquest", bengali: "যখন আল্লাহর সাহায্য ও বিজয় আসবে" },
      { number: 2, arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", transliteration: "Wa ra-aytan naasa yadkhuloona fee deenil-laahi afwaaja", english: "And you see the people entering into the religion of Allah in multitudes", bengali: "এবং তুমি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবে" },
      { number: 3, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", transliteration: "Fasabbih bihamdi rabbika wastaghfirh, innahu kaana tawwaaba", english: "Then exalt with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance", bengali: "তখন তোমার প্রভুর প্রশংসাসহ তাঁর পবিত্রতা ঘোষণা কর এবং তাঁর কাছে ক্ষমা প্রার্থনা কর। নিশ্চয়ই তিনি অত্যন্ত তওবা কবুলকারী" }
    ]
  },
  {
    surahNumber: 108,
    verses: [
      { number: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", transliteration: "Innaa a'taynakal kawthar", english: "Indeed, We have granted you al-Kawthar", bengali: "নিশ্চয়ই আমি আপনাকে কাওসার দান করেছি" },
      { number: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", transliteration: "Fasalli li rabbika wanhar", english: "So pray to your Lord and sacrifice", bengali: "অতএব আপনার প্রভুর জন্য নামাজ পড়ুন এবং কুরবানি করুন" },
      { number: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", transliteration: "Inna shaani-aka huwal abtar", english: "Indeed, your enemy is the one cut off", bengali: "নিশ্চয়ই আপনার শত্রুই নির্বংশ" }
    ]
  },
  {
    surahNumber: 103,
    verses: [
      { number: 1, arabic: "وَالْعَصْرِ", transliteration: "Wal-'asr", english: "By time", bengali: "সময়ের শপথ" },
      { number: 2, arabic: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", transliteration: "Innal-insaana lafee khusr", english: "Indeed, mankind is in loss", bengali: "নিশ্চয়ই মানুষ ক্ষতির মধ্যে আছে" },
      { number: 3, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", transliteration: "Illal-lazeena aamanu wa 'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr", english: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience", bengali: "কিন্তু তারা ছাড়া যারা ঈমান এনেছে, সৎকর্ম করেছে, একে অপরকে সত্যের উপদেশ দিয়েছে এবং ধৈর্যের উপদেশ দিয়েছে" }
    ]
  },
  {
    surahNumber: 109,
    verses: [
      { number: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", transliteration: "Qul yaa ayyuhal-kaafiruun", english: "Say, O disbelievers", bengali: "বলুন, হে কাফিরগণ" },
      { number: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", transliteration: "Laa a'budu maa ta'buduun", english: "I do not worship what you worship", bengali: "আমি তার ইবাদত করি না যার ইবাদত তোমরা কর" },
      { number: 3, arabic: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa laa antum 'aabiduuna maa a'bud", english: "Nor are you worshippers of what I worship", bengali: "এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি" },
      { number: 4, arabic: "وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ", transliteration: "Wa laa ana 'aabidun maa 'abadtum", english: "Nor will I be a worshipper of what you worship", bengali: "এবং আমি ইবাদতকারী নই তার যার ইবাদত তোমরা কর" },
      { number: 5, arabic: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa laa antum 'aabiduuna maa a'bud", english: "Nor will you be worshippers of what I worship", bengali: "এবং তোমরা ইবাদতকারী নও তাঁর যাঁর ইবাদত আমি করি" },
      { number: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", transliteration: "Lakum deenukum wa liya deen", english: "For you is your religion, and for me is my religion", bengali: "তোমাদের জন্য তোমাদের ধর্ম এবং আমার জন্য আমার ধর্ম" }
    ]
  },
  {
    surahNumber: 111,
    verses: [
      { number: 1, arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", transliteration: "Tabbat yadaa abee lahabin wa tabb", english: "May the hands of Abu Lahab be ruined, and ruined is he", bengali: "আবু লাহাবের দুই হাত ধ্বংস হোক এবং সে ধ্বংস হোক" },
      { number: 2, arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", transliteration: "Maa aghnaa 'anhu maaluhu wa maa kasab", english: "His wealth will not avail him or that which he gained", bengali: "তার সম্পদ ও তার উপার্জন তার কোন কাজে আসেনি" },
      { number: 3, arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", transliteration: "Sayaslaa naaran zaata lahab", english: "He will burn in a Fire of blazing flame", bengali: "সে অচিরেই লেলিহান আগুনে প্রবেশ করবে" },
      { number: 4, arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", transliteration: "Wamra-atuhu hammaalatal-hatab", english: "And his wife, the carrier of firewood", bengali: "এবং তার স্ত্রীও, যে কাঠ বহনকারী" },
      { number: 5, arabic: "فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ", transliteration: "Fee jeediha hablum mim-masad", english: "Around her neck is a rope of palm fiber", bengali: "তার গলায় থাকবে খেজুরের আঁশের রশি" }
    ]
  },
  {
    surahNumber: 105,
    verses: [
      { number: 1, arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", transliteration: "Alam tara kayfa fa'ala rabbuka bi-ashaabil-feel", english: "Have you not considered how your Lord dealt with the companions of the elephant?", bengali: "তুমি কি দেখনি তোমার প্রভু হাতির অধিপতিদের সাথে কীরূপ আচরণ করেছিলেন?" },
      { number: 2, arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", transliteration: "Alam yaj'al kaydahum fee tadleel", english: "Did He not make their plan into misguidance?", bengali: "তিনি কি তাদের ষড়যন্ত্র ব্যর্থ করে দেননি?" },
      { number: 3, arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", transliteration: "Wa arsala 'alayhim tayran abaabeel", english: "And He sent against them birds in flocks", bengali: "এবং তিনি তাদের উপর ঝাঁকে ঝাঁকে পাখি পাঠিয়েছিলেন" },
      { number: 4, arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", transliteration: "Tarmeehim bihijaaratim min sijjeel", english: "Striking them with stones of hard clay", bengali: "তারা তাদের উপর পোড়ামাটির পাথর নিক্ষেপ করছিল" },
      { number: 5, arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ", transliteration: "Faja'alahum ka'asfim ma'kool", english: "And He made them like eaten straw", bengali: "অতঃপর তিনি তাদেরকে ভক্ষিত তৃণের মত করে দিলেন" }
    ]
  },
  {
    surahNumber: 106,
    verses: [
      { number: 1, arabic: "لِإِيلَافِ قُرَيْشٍ", transliteration: "Li-eelaafi Quraysh", english: "For the accustomed security of the Quraysh", bengali: "কুরাইশের সুরক্ষার জন্য" },
      { number: 2, arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", transliteration: "Eelaafihim rihlatash-shitaa'i was-sayf", english: "Their accustomed security in the caravan of winter and summer", bengali: "তাদের শীত ও গ্রীষ্মকালীন ভ্রমণের সুরক্ষা" },
      { number: 3, arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", transliteration: "Falya'budoo rabba haazal-bayt", english: "Let them worship the Lord of this House", bengali: "সুতরাং তারা যেন এই ঘরের প্রভুর ইবাদত করে" },
      { number: 4, arabic: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", transliteration: "Allazeee at'amahum min joo'in wa aamanahum min khawf", english: "Who has fed them against hunger and made them safe from fear", bengali: "যিনি তাদেরকে ক্ষুধায় অন্ন দিয়েছেন এবং ভয় থেকে নিরাপত্তা দিয়েছেন" }
    ]
  },
  {
    surahNumber: 107,
    verses: [
      { number: 1, arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", transliteration: "Ara'aytal-lazee yukaz-zibu bid-deen", english: "Have you seen the one who denies the Recompense?", bengali: "তুমি কি তাকে দেখেছ যে দ্বীনকে অস্বীকার করে?" },
      { number: 2, arabic: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", transliteration: "Fazaalikal-lazee yadu'-'ul-yateem", english: "For that is the one who drives away the orphan", bengali: "সে সেই ব্যক্তি যে এতিমকে ধাক্কা দেয়" },
      { number: 3, arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", transliteration: "Wa laa yahuddu 'alaa ta'aamil-miskeen", english: "And does not encourage the feeding of the poor", bengali: "এবং মিসকীনকে খাওয়ানোর জন্য উৎসাহিত করে না" },
      { number: 4, arabic: "فَوَيْلٌ لِلْمُصَلِّينَ", transliteration: "Fa waylul-lil-musalleen", english: "So woe to those who pray", bengali: "সুতরাং ধ্বংস সেই নামাজীদের জন্য" },
      { number: 5, arabic: "الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ", transliteration: "Allazeena hum 'an salaatihim saahuun", english: "Who are heedless of their prayer", bengali: "যারা তাদের নামাজ সম্পর্কে উদাসীন" },
      { number: 6, arabic: "الَّذِينَ هُمْ يُرَاءُونَ", transliteration: "Allazeena hum yuraa'uun", english: "Those who make show of their deeds", bengali: "যারা লোক দেখানোর জন্য কাজ করে" },
      { number: 7, arabic: "وَيَمْنَعُونَ الْمَاعُونَ", transliteration: "Wa yamna'uunal-maa'uun", english: "And withhold simple assistance", bengali: "এবং সামান্য সাহায্য দানেও বিরত থাকে" }
    ]
  },
  {
    surahNumber: 97,
    verses: [
      { number: 1, arabic: "إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", transliteration: "Innaa anzalnaahu fee laylatil-qadr", english: "Indeed, We sent it down during the Night of Decree", bengali: "নিশ্চয়ই আমি একে নাযিল করেছি লাইলাতুল কদরে" },
      { number: 2, arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", transliteration: "Wa maa adraaka maa laylatul-qadr", english: "And what can make you know what is the Night of Decree?", bengali: "এবং তুমি কি জান লাইলাতুল কদর কী?" },
      { number: 3, arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ", transliteration: "Laylatul-qadri khayrum-min alfi shahr", english: "The Night of Decree is better than a thousand months", bengali: "লাইলাতুল কদর হাজার মাসের চেয়ে উত্তম" },
      { number: 4, arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ", transliteration: "Tanazzalul-malaa'ikatu war-ruuhu feeha bi-izni rabbihim min kulli amr", english: "The angels and the Spirit descend therein by permission of their Lord for every matter", bengali: "এতে ফেরেশতাগণ ও রূহ তাদের প্রভুর অনুমতিক্রমে প্রতিটি বিষয়ে অবতীর্ণ হন" },
      { number: 5, arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", transliteration: "Salaamun hiya hattaa matla'il-fajr", english: "Peace it is until the emergence of dawn", bengali: "শান্তি, এটা ফজরের উদয় পর্যন্ত" }
    ]
  },
  {
    surahNumber: 102,
    verses: [
      { number: 1, arabic: "أَلْهَاكُمُ التَّكَاثُرُ", transliteration: "Alhaakumut-takaathur", english: "Competition in worldly increase diverts you", bengali: "প্রাচুর্যের প্রতিযোগিতা তোমাদের মোহাচ্ছন্ন করে রেখেছে" },
      { number: 2, arabic: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", transliteration: "Hattaa zurtumul-maqaabir", english: "Until you visit the graveyards", bengali: "যতক্ষণ না তোমরা কবরে পৌঁছাও" },
      { number: 3, arabic: "كَلَّا سَوْفَ تَعْلَمُونَ", transliteration: "Kallaa sawfa ta'lamuun", english: "No! You are going to know", bengali: "কখনো না! তোমরা শীঘ্রই জানতে পারবে" },
      { number: 4, arabic: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", transliteration: "Thumma kallaa sawfa ta'lamuun", english: "Then no! You are going to know", bengali: "আবারও না! তোমরা শীঘ্রই জানতে পারবে" },
      { number: 5, arabic: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", transliteration: "Kallaa law ta'lamuuna 'ilmal-yaqeen", english: "No! If you only knew with knowledge of certainty", bengali: "কখনো না! যদি তোমরা নিশ্চিত জ্ঞান রাখতে" },
      { number: 6, arabic: "لَتَرَوُنَّ الْجَحِيمَ", transliteration: "Latarawunnal-jaheem", english: "You will surely see the Hellfire", bengali: "তাহলে অবশ্যই তোমরা জাহান্নাম দেখতে পাবে" },
      { number: 7, arabic: "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ", transliteration: "Thumma latarawunnaha 'aynal-yaqeen", english: "Then you will surely see it with the eye of certainty", bengali: "তারপর তোমরা অবশ্যই তা নিশ্চিত চোখে দেখবে" },
      { number: 8, arabic: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ", transliteration: "Thumma latus'alunna yawma'izin 'anin-na'eem", english: "Then you will surely be asked that Day about pleasure", bengali: "তারপর সেদিন তোমাদেরকে অবশ্যই নেয়ামত সম্পর্কে জিজ্ঞাসা করা হবে" }
    ]
  },
  {
    surahNumber: 104,
    verses: [
      { number: 1, arabic: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ", transliteration: "Waylul-li-kulli humazatil-lumaza", english: "Woe to every scorner and mocker", bengali: "ধ্বংস প্রত্যেক পরনিন্দাকারী ও দোষারোপকারীর জন্য" },
      { number: 2, arabic: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", transliteration: "Allazee jama'a maalaw-wa 'addadah", english: "Who collects wealth and continuously counts it", bengali: "যে সম্পদ জমা করে এবং তা গণনা করে" },
      { number: 3, arabic: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", transliteration: "Yahsabu anna maalahu akhladah", english: "He thinks that his wealth will make him immortal", bengali: "সে মনে করে তার সম্পদ তাকে অমর করে দেবে" },
      { number: 4, arabic: "كَلَّا ۖ لَيُنْبَذَنَّ فِي الْحُطَمَةِ", transliteration: "Kallaa! Layunbazanna fil-hutamah", english: "No! He will surely be thrown into the Crusher", bengali: "কখনো না! সে অবশ্যই হুতামায় নিক্ষিপ্ত হবে" },
      { number: 5, arabic: "وَمَا أَدْرَاكَ مَا الْحُطَمَةُ", transliteration: "Wa maa adraaka mal-hutamah", english: "And what can make you know what is the Crusher?", bengali: "এবং তুমি কি জান হুতামা কী?" },
      { number: 6, arabic: "نَارُ اللَّهِ الْمُوقَدَةُ", transliteration: "Naaarul-laahil-mooqadah", english: "It is the fire of Allah, kindled", bengali: "এটা আল্লাহর প্রজ্বলিত আগুন" },
      { number: 7, arabic: "الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ", transliteration: "Allatee tattali'u 'alal-af'idah", english: "Which mounts directed at the hearts", bengali: "যা অন্তর পর্যন্ত পৌঁছে যাবে" },
      { number: 8, arabic: "إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ", transliteration: "Innahaa 'alayhim mu'sadah", english: "Indeed, it will be closed down upon them", bengali: "নিশ্চয়ই তা তাদের উপর বন্ধ করে দেওয়া হবে" },
      { number: 9, arabic: "فِي عَمَدٍ مُمَدَّدَةٍ", transliteration: "Fee 'amadim-mumaddadah", english: "In extended columns", bengali: "দীর্ঘ স্তম্ভসমূহে" }
    ]
  },
  {
    surahNumber: 101,
    verses: [
      { number: 1, arabic: "الْقَارِعَةُ", transliteration: "Al-Qaari'ah", english: "The Striking Calamity", bengali: "মহাবিপদ" },
      { number: 2, arabic: "مَا الْقَارِعَةُ", transliteration: "Mal-Qaari'ah", english: "What is the Striking Calamity?", bengali: "মহাবিপদ কী?" },
      { number: 3, arabic: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", transliteration: "Wa maa adraaka mal-Qaari'ah", english: "And what can make you know what is the Striking Calamity?", bengali: "এবং তুমি কি জান মহাবিপদ কী?" },
      { number: 4, arabic: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", transliteration: "Yawma yakoonun-naasu kal-faraashil-mabthooth", english: "It is the Day when people will be like moths, dispersed", bengali: "সেদিন মানুষ হবে বিক্ষিপ্ত পতঙ্গের মত" },
      { number: 5, arabic: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ", transliteration: "Wa takoonul-jibaalu kal-'ihnil-manfoosh", english: "And the mountains will be like wool, fluffed up", bengali: "এবং পাহাড়সমূহ হবে ধুনিত পশমের মত" },
      { number: 6, arabic: "فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ", transliteration: "Fa-amma man thaqulat mawazeenuh", english: "Then as for one whose scales are heavy", bengali: "অতঃপর যার পাল্লা ভারী হবে" },
      { number: 7, arabic: "فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ", transliteration: "Fahuwa fee 'eeshatir-raadiyah", english: "He will be in a pleasant life", bengali: "সে সুখী জীবনে থাকবে" },
      { number: 8, arabic: "وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ", transliteration: "Wa amma man khaffat mawazeenuh", english: "But as for one whose scales are light", bengali: "কিন্তু যার পাল্লা হালকা হবে" },
      { number: 9, arabic: "فَأُمُّهُ هَاوِيَةٌ", transliteration: "Fa-ummuhoo haawiyah", english: "His refuge will be an abyss", bengali: "তার আশ্রয়স্থল হবে হাবিয়া (গভীর গর্ত)" },
      { number: 10, arabic: "وَمَا أَدْرَاكَ مَا هِيَهْ", transliteration: "Wa maa adraaka maa hiyah", english: "And what can make you know what that is?", bengali: "এবং তুমি কি জান সেটা কী?" },
      { number: 11, arabic: "نَارٌ حَامِيَةٌ", transliteration: "Naarun haamiyah", english: "It is a Fire, intensely hot", bengali: "এটা প্রজ্বলিত আগুন" }
    ]
  },
  {
    surahNumber: 99,
    verses: [
      { number: 1, arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", transliteration: "Iza zulzilatil-ardu zilzaalaha", english: "When the earth is shaken with its final earthquake", bengali: "যখন পৃথিবী তার কম্পনে প্রকম্পিত হবে" },
      { number: 2, arabic: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", transliteration: "Wa akhrajatil-ardu athqaalaha", english: "And the earth discharges its burdens", bengali: "এবং পৃথিবী তার ভার বের করে দেবে" },
      { number: 3, arabic: "وَقَالَ الْإِنْسَانُ مَا لَهَا", transliteration: "Wa qaalal-insaanu maa lahaa", english: "And man says, What is wrong with it?", bengali: "এবং মানুষ বলবে, এর কী হয়েছে?" },
      { number: 4, arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", transliteration: "Yawma'izin tuhad-dithu akhbaaraha", english: "That Day, it will report its news", bengali: "সেদিন সে তার সংবাদ বর্ণনা করবে" },
      { number: 5, arabic: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", transliteration: "Bi-anna rabbaka awhaa laha", english: "Because your Lord has commanded it", bengali: "কেননা তোমার প্রভু তাকে আদেশ করেছেন" },
      { number: 6, arabic: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ", transliteration: "Yawma'izin yasdrun-naasu ashtaatal-liyuraw a'maalahum", english: "That Day, the people will depart separated to be shown their deeds", bengali: "সেদিন মানুষ বিভিন্ন দলে বের হবে তাদের কাজ দেখানোর জন্য" },
      { number: 7, arabic: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", transliteration: "Fa man ya'mal mithqaala zarratin khayran yarah", english: "So whoever does an atom's weight of good will see it", bengali: "যে অণু পরিমাণ ভালো কাজ করবে সে তা দেখবে" },
      { number: 8, arabic: "وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", transliteration: "Wa man ya'mal mithqaala zarratin sharran yarah", english: "And whoever does an atom's weight of evil will see it", bengali: "এবং যে অণু পরিমাণ মন্দ কাজ করবে সে তাও দেখবে" }
    ]
  },
  {
    surahNumber: 100,
    verses: [
      { number: 1, arabic: "وَالْعَادِيَاتِ ضَبْحًا", transliteration: "Wal-'aadiyaati dabha", english: "By the racers, panting", bengali: "শপথ হাঁপাতে হাঁপাতে ধাবমান অশ্বসমূহের" },
      { number: 2, arabic: "فَالْمُورِيَاتِ قَدْحًا", transliteration: "Fal-mooriyaati qadha", english: "And the producers of sparks when striking", bengali: "অতঃপর যারা স্ফুলিঙ্গ বের করে" },
      { number: 3, arabic: "فَالْمُغِيرَاتِ صُبْحًا", transliteration: "Fal-mugheeraati subha", english: "And the chargers at dawn", bengali: "অতঃপর যারা ভোরে আক্রমণ করে" },
      { number: 4, arabic: "فَأَثَرْنَ بِهِ نَقْعًا", transliteration: "Fa-atharna bihi naq'a", english: "Stirring up thereby clouds of dust", bengali: "অতঃপর ধূলা উড়িয়ে দেয়" },
      { number: 5, arabic: "فَوَسَطْنَ بِهِ جَمْعًا", transliteration: "Fawasatna bihi jam'a", english: "Arriving thereby in the center collectively", bengali: "অতঃপর শত্রুদলের মধ্যে ঢুকে পড়ে" },
      { number: 6, arabic: "إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ", transliteration: "Innal-insaana li-rabbihee lakanood", english: "Indeed mankind, to his Lord, is ungrateful", bengali: "নিশ্চয়ই মানুষ তার প্রভুর প্রতি অকৃতজ্ঞ" },
      { number: 7, arabic: "وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ", transliteration: "Wa innahu 'alaa zaalika la-shaheed", english: "And indeed, he is to that a witness", bengali: "এবং সে নিজেই তার সাক্ষী" },
      { number: 8, arabic: "وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ", transliteration: "Wa innahu li-hubbil-khayri la-shadeed", english: "And indeed he is, in love of wealth, intense", bengali: "এবং সে সম্পদের ভালোবাসায় অতিশয় কঠোর" },
      { number: 9, arabic: "أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ", transliteration: "Afalaa ya'lamu izaa bu'thira maa fil-quboor", english: "But does he not know that when the contents of the graves are scattered", bengali: "সে কি জানে না যখন কবরে যা আছে তা বের করা হবে" },
      { number: 10, arabic: "وَحُصِّلَ مَا فِي الصُّدُورِ", transliteration: "Wa hussila maa fis-sudoor", english: "And that within the breasts is obtained", bengali: "এবং অন্তরে যা আছে তা প্রকাশ করা হবে" },
      { number: 11, arabic: "إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ", transliteration: "Inna rabbahum bihim yawma'izil-la-khabeer", english: "Indeed, their Lord with them, that Day, is fully Aware", bengali: "নিশ্চয়ই সেদিন তাদের প্রভু তাদের সম্পর্কে পূর্ণ অবহিত" }
    ]
  },
  {
    surahNumber: 36,
    verses: [
      { number: 1, arabic: "يس", transliteration: "Yaa-Seen", english: "Ya, Seen", bengali: "ইয়াসীন" },
      { number: 2, arabic: "وَالْقُرْآنِ الْحَكِيمِ", transliteration: "Wal-Qur'aanil-Hakeem", english: "By the wise Qur'an", bengali: "প্রজ্ঞাপূর্ণ কুরআনের শপথ" },
      { number: 3, arabic: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", transliteration: "Innaka laminal-mursaleen", english: "Indeed you are from among the messengers", bengali: "নিশ্চয়ই তুমি রাসূলগণের একজন" },
      { number: 4, arabic: "عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ", transliteration: "'Alaa siraatim-mustaqeem", english: "On a straight path", bengali: "সরল পথের উপর প্রতিষ্ঠিত" },
      { number: 5, arabic: "تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ", transliteration: "Tanzeelal-'Azeezir-Raheem", english: "Sent down by the Exalted in Might, the Merciful", bengali: "মহাপরাক্রমশালী, পরম দয়ালুর অবতীর্ণ" }
    ]
  },
  {
    surahNumber: 55,
    verses: [
      { number: 1, arabic: "الرَّحْمَٰنُ", transliteration: "Ar-Rahman", english: "The Most Merciful", bengali: "পরম করুণাময়" },
      { number: 2, arabic: "عَلَّمَ الْقُرْآنَ", transliteration: "'Allamal-Qur'aan", english: "Taught the Qur'an", bengali: "কুরআন শিক্ষা দিয়েছেন" },
      { number: 3, arabic: "خَلَقَ الْإِنْسَانَ", transliteration: "Khalaqal-insaan", english: "Created man", bengali: "মানুষ সৃষ্টি করেছেন" },
      { number: 4, arabic: "عَلَّمَهُ الْبَيَانَ", transliteration: "'Allamahul-bayaan", english: "And taught him eloquence", bengali: "তাকে বর্ণনা শিক্ষা দিয়েছেন" },
      { number: 5, arabic: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ", transliteration: "Ash-shamsu wal-qamaru bi-husbaan", english: "The sun and the moon move by precise calculation", bengali: "সূর্য ও চন্দ্র হিসাব অনুযায়ী চলে" },
      { number: 6, arabic: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ", transliteration: "Wan-najmu wash-shajaru yasjudaan", english: "And the stars and trees prostrate", bengali: "তারকারাজি ও বৃক্ষরাজি সিজদা করে" },
      { number: 7, arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ", transliteration: "Was-samaa'a rafa'aha wa wada'al-meezaan", english: "And the heaven He raised and imposed the balance", bengali: "এবং আকাশকে তিনি উচ্চ করেছেন এবং ভারসাম্য স্থাপন করেছেন" },
      { number: 8, arabic: "أَلَّا تَطْغَوْا فِي الْمِيزَانِ", transliteration: "Allaa tatghaw fil-meezaan", english: "That you not transgress within the balance", bengali: "যাতে তোমরা ভারসাম্যে সীমালঙ্ঘন না কর" },
      { number: 9, arabic: "وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ", transliteration: "Wa aqeemul-wazna bil-qisti wa laa tukhsirul-meezaan", english: "And establish weight in justice and do not make deficient the balance", bengali: "এবং ন্যায়সঙ্গতভাবে ওজন কায়েম কর এবং ভারসাম্যে কমতি করো না" },
      { number: 10, arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ", transliteration: "Wal-arda wada'aha lil-anaam", english: "And the earth He laid out for the creatures", bengali: "এবং পৃথিবী তিনি স্থাপন করেছেন সৃষ্টিকুলের জন্য" }
    ]
  },
  {
    surahNumber: 67,
    verses: [
      { number: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "Tabaarakal-lazee biyadihil-mulku wa huwa 'alaa kulli shay'in Qadeer", english: "Blessed is He in whose hand is dominion, and He is over all things competent", bengali: "মহান সেই সত্তা যার হাতে সার্বভৌমত্ব, এবং তিনি সব কিছুর উপর সর্বশক্তিমান" },
      { number: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", transliteration: "Allazee khalaqal-mawta wal-hayaata liyabluwakum ayyukum ahsanu 'amalaa, wa huwal-'Azeezul-Ghafoor", english: "He who created death and life to test you as to which of you is best in deed - and He is the Exalted in Might, the Forgiving", bengali: "যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করতে কে তোমাদের মধ্যে কর্মে উত্তম। তিনি মহাপরাক্রমশালী, ক্ষমাশীল" },
      { number: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِنْ تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِنْ فُطُورٍ", transliteration: "Allazee khalaqa sab'a samaawaatin tibaaqaa, maa taraa fee khalqir-Rahmaani min tafaawut, farji'il-basara hal taraa min futoor", english: "He created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return your vision; do you see any breaks?", bengali: "যিনি সাত আকাশ স্তরে স্তরে সৃষ্টি করেছেন। তুমি করুণাময়ের সৃষ্টিতে কোন অসামঞ্জস্য দেখতে পাবে না। আবার তাকাও, কোন ফাটল দেখতে পাও?" },
      { number: 4, arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنْقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", transliteration: "Thummar-ji'il-basara karratayni yanqalib ilaykal-basaru khaasi'aw-wa huwa haseer", english: "Then return your vision twice again. Your vision will return to you humbled while it is fatigued", bengali: "তারপর বারবার তাকাও, তোমার দৃষ্টি ব্যর্থ ও ক্লান্ত হয়ে তোমার কাছে ফিরে আসবে" },
      { number: 5, arabic: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ", transliteration: "Wa laqad zayyannnas-samaa'ad-dunyaa bimasaabeeh, wa ja'alnaaha rujoomal-lish-shayaateen, wa a'tadnaa lahum 'azaabas-sa'eer", english: "And We have certainly beautified the nearest heaven with stars and have made them missiles to drive away the devils, and We have prepared for them the punishment of the Blaze", bengali: "এবং আমি নিকটবর্তী আকাশকে প্রদীপমালা দিয়ে সুসজ্জিত করেছি এবং এগুলোকে শয়তানদের জন্য নিক্ষেপাস্ত্র বানিয়েছি। এবং তাদের জন্য প্রস্তুত রেখেছি জ্বলন্ত আগুনের শাস্তি" }
    ]
  }
];

export function getVersesBySurah(surahNumber: number): Verse[] | undefined {
  const surah = SURAH_VERSES.find(s => s.surahNumber === surahNumber);
  return surah?.verses;
}

export function hasVerses(surahNumber: number): boolean {
  return SURAH_VERSES.some(s => s.surahNumber === surahNumber);
}
