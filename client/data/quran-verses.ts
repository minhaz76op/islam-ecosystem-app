export interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
  audioUrl: string;
}

export interface SurahVerses {
  surahNumber: number;
  verses: Verse[];
}

function getVerseAudioUrl(surahNumber: number, verseNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const versePadded = String(verseNumber).padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${surahPadded}${versePadded}.mp3`;
}

export const SURAH_VERSES: SurahVerses[] = [
  {
    surahNumber: 1,
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillahir Rahmanir Raheem", english: "In the name of Allah, the Most Gracious, the Most Merciful", bengali: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে", audioUrl: getVerseAudioUrl(1, 1) },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Alhamdu lillahi Rabbil 'aalameen", english: "All praise is due to Allah, Lord of the worlds", bengali: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি সকল সৃষ্টির প্রতিপালক", audioUrl: getVerseAudioUrl(1, 2) },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-Rahmanir-Raheem", english: "The Most Gracious, the Most Merciful", bengali: "পরম করুণাময়, অতি দয়ালু", audioUrl: getVerseAudioUrl(1, 3) },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Maaliki Yawmid-Deen", english: "Master of the Day of Judgment", bengali: "বিচার দিবসের মালিক", audioUrl: getVerseAudioUrl(1, 4) },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyaka na'budu wa iyyaka nasta'een", english: "You alone we worship, and You alone we ask for help", bengali: "আমরা শুধু তোমারই ইবাদত করি এবং শুধু তোমারই কাছে সাহায্য চাই", audioUrl: getVerseAudioUrl(1, 5) },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdinas-Siraatal-Mustaqeem", english: "Guide us to the straight path", bengali: "আমাদেরকে সরল পথ দেখাও", audioUrl: getVerseAudioUrl(1, 6) },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Siraatal-lazeena an'amta 'alaihim ghairil-maghdoobi 'alaihim wa lad-daaalleen", english: "The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray", bengali: "তাদের পথ যাদের তুমি অনুগ্রহ করেছ, তাদের নয় যাদের প্রতি গজব নাযিল হয়েছে এবং তাদেরও নয় যারা পথভ্রষ্ট", audioUrl: getVerseAudioUrl(1, 7) }
    ]
  },
  {
    surahNumber: 2,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(2, 1) },
      { number: 2, arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", transliteration: "Zaalikal kitaabu laa rayba feeh, hudal lilmuttaqeen", english: "This is the Book about which there is no doubt, a guidance for those conscious of Allah", bengali: "এই সেই কিতাব যাতে কোন সন্দেহ নেই, মুত্তাকীদের জন্য পথনির্দেশ", audioUrl: getVerseAudioUrl(2, 2) },
      { number: 3, arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", transliteration: "Allazeena yu'minoona bilghaybi wa yuqeemoonas salaata wa mimmaa razaqnaahum yunfiqoon", english: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them", bengali: "যারা অদৃশ্যে বিশ্বাস করে, নামাজ কায়েম করে এবং আমি তাদের যা দিয়েছি তা থেকে ব্যয় করে", audioUrl: getVerseAudioUrl(2, 3) },
      { number: 4, arabic: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", transliteration: "Wallazeena yu'minoona bimaa unzila ilayka wa maa unzila min qablika wa bil aakhirati hum yooqinoon", english: "And who believe in what has been revealed to you and what was revealed before you, and of the Hereafter they are certain", bengali: "এবং যারা তোমার প্রতি যা অবতীর্ণ হয়েছে ও তোমার পূর্বে যা অবতীর্ণ হয়েছে তাতে বিশ্বাস করে এবং আখিরাতে নিশ্চিত বিশ্বাস রাখে", audioUrl: getVerseAudioUrl(2, 4) },
      { number: 5, arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", transliteration: "Ulaaa'ika 'alaa hudam mir rabbihim wa ulaaa'ika humul muflihoon", english: "Those are upon guidance from their Lord, and it is those who are the successful", bengali: "তারাই তাদের প্রভুর পক্ষ থেকে সঠিক পথে আছে এবং তারাই সফলকাম", audioUrl: getVerseAudioUrl(2, 5) },
      { number: 255, arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", transliteration: "Allahu laaa ilaaha illaa Huwal Haiyul Qayyoom, laa ta'khuzuhoo sinatunw wa laa nawm, lahoo maa fissamaawaati wa maa fil ard, man zal lazee yashfa'u 'indahooo illaa bi iznih, ya'lamu maa baina aydeehim wa maa khalfahum wa laa yuheetoona bishai'im min 'ilmihee illaa bimaa shaaa', wasi'a Kursiyyuhus samaawaati wal arda wa laa ya'ooduhoo hifzuhumaa wa Huwal 'Aliyyul 'Azeem", english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.", bengali: "আল্লাহ, তিনি ছাড়া কোন উপাস্য নেই, তিনি চিরঞ্জীব, সব কিছুর ধারক। তাঁকে তন্দ্রাও স্পর্শ করে না, নিদ্রাও নয়। আকাশ ও পৃথিবীতে যা কিছু আছে সব তাঁরই। কে আছে যে তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করতে পারে? তাদের সামনে ও পেছনে যা আছে তা তিনি জানেন। তাঁর জ্ঞানের কোন কিছুই তারা আয়ত্ত করতে পারে না, তবে তিনি যা ইচ্ছা করেন তা ছাড়া। তাঁর কুরসী আকাশ ও পৃথিবীকে পরিব্যাপ্ত করে আছে। এগুলোর রক্ষণাবেক্ষণ তাঁকে ক্লান্ত করে না। তিনি সর্বোচ্চ, মহান।", audioUrl: getVerseAudioUrl(2, 255) },
      { number: 285, arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ", transliteration: "Aamanar Rasoolu bimaaa unzila ilaihi mir Rabbihee walmu'minoon, kullun aamana billaahi wa Malaaa'ikatihee wa Kutubihee wa Rusulih, laa nufarriqu baina ahadim mir Rusulih, wa qaaloo sami'naa wa ata'naa ghufraanaka Rabbanaa wa ilaikal maseer", english: "The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah and His angels and His books and His messengers, saying, We make no distinction between any of His messengers. And they say, We hear and we obey. Your forgiveness, our Lord, and to You is the final destination.", bengali: "রাসূল তাঁর প্রভুর পক্ষ থেকে যা অবতীর্ণ হয়েছে তাতে বিশ্বাস করেছেন এবং মুমিনরাও। প্রত্যেকেই আল্লাহ, তাঁর ফেরেশতা, তাঁর কিতাবসমূহ ও তাঁর রাসূলগণে বিশ্বাস করে। তারা বলে, আমরা তাঁর রাসূলগণের মধ্যে কোন পার্থক্য করি না। এবং তারা বলে, আমরা শুনলাম ও মানলাম। হে আমাদের প্রভু! তোমার ক্ষমা চাই এবং তোমারই দিকে প্রত্যাবর্তন।", audioUrl: getVerseAudioUrl(2, 285) },
      { number: 286, arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", transliteration: "Laa yukalliful laahu nafsan illaa wus'ahaa, lahaa maa kasabat wa 'alaihaa mak tasabat, Rabbanaa laa tu'aakhiznaaa in naseenaaa aw akhtaanaa, Rabbanaa wa laa tahmil 'alainaaa isran kamaa hamaltahoo 'alal lazeena min qablinaa, Rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bih, wa'fu 'annaa waghfir lanaa warhamnaa, Anta mawlaanaa fansurnaa 'alal qawmil kaafireen", english: "Allah does not charge a soul except with that within its capacity. It will have what good it has gained, and it will bear what evil it has earned. Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.", bengali: "আল্লাহ কোন ব্যক্তিকে তার সাধ্যের বাইরে দায়িত্ব দেন না। সে যা উপার্জন করে তা তার জন্য এবং যা সে অর্জন করে তা তার বিরুদ্ধে। হে আমাদের প্রভু! আমরা ভুলে গেলে বা ভুল করলে আমাদের পাকড়াও করো না। হে আমাদের প্রভু! আমাদের পূর্ববর্তীদের উপর যেমন বোঝা চাপিয়েছ তেমন বোঝা আমাদের উপর চাপিও না। হে আমাদের প্রভু! যা বহন করার সামর্থ্য আমাদের নেই তা আমাদের উপর চাপিও না। আমাদের ক্ষমা কর, আমাদের মার্জনা কর এবং আমাদের প্রতি দয়া কর। তুমি আমাদের অভিভাবক। সুতরাং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য কর।", audioUrl: getVerseAudioUrl(2, 286) }
    ]
  },
  {
    surahNumber: 3,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(3, 1) },
      { number: 2, arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", transliteration: "Allahu laaa ilaaha illaa Huwal Haiyul Qayyoom", english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence", bengali: "আল্লাহ, তিনি ছাড়া কোন উপাস্য নেই, তিনি চিরঞ্জীব, সব কিছুর ধারক", audioUrl: getVerseAudioUrl(3, 2) },
      { number: 3, arabic: "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ", transliteration: "Nazzala 'alaikal Kitaaba bilhaqqi musaddiqal limaa baina yadaihi wa anzalat Tawraata wal Injeel", english: "He has sent down upon you the Book in truth, confirming what was before it. And He revealed the Torah and the Gospel", bengali: "তিনি তোমার উপর সত্যসহ কিতাব অবতীর্ণ করেছেন, এর পূর্বে যা ছিল তার সত্যায়নকারী। এবং তিনি তাওরাত ও ইঞ্জিল অবতীর্ণ করেছেন", audioUrl: getVerseAudioUrl(3, 3) },
      { number: 4, arabic: "مِن قَبْلُ هُدًى لِّلنَّاسِ وَأَنزَلَ الْفُرْقَانَ ۗ إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ ۗ وَاللَّهُ عَزِيزٌ ذُو انتِقَامٍ", transliteration: "Min qablu hudal linnaasi wa anzalal Furqaan, innal lazeena kafaroo bi Aayaatil laahi lahum 'azaabun shadeed, wallaahu 'Azeezun Zuntiqaam", english: "Before, as guidance for the people. And He revealed the Criterion. Indeed, those who disbelieve in the verses of Allah will have a severe punishment, and Allah is exalted in Might, the Owner of Retribution", bengali: "এর আগে মানুষের জন্য পথনির্দেশ হিসেবে। এবং তিনি ফুরকান অবতীর্ণ করেছেন। নিশ্চয়ই যারা আল্লাহর আয়াতসমূহ অস্বীকার করে তাদের জন্য রয়েছে কঠোর শাস্তি। আল্লাহ পরাক্রমশালী, প্রতিশোধ গ্রহণকারী", audioUrl: getVerseAudioUrl(3, 4) },
      { number: 5, arabic: "إِنَّ اللَّهَ لَا يَخْفَىٰ عَلَيْهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ", transliteration: "Innal laaha laa yakhfaa 'alaihi shai'un fil ardi wa laa fis samaaa'", english: "Indeed, from Allah nothing is hidden in the earth nor in the heaven", bengali: "নিশ্চয়ই আল্লাহর কাছে পৃথিবী বা আকাশের কোন কিছুই গোপন নেই", audioUrl: getVerseAudioUrl(3, 5) }
    ]
  },
  {
    surahNumber: 4,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً", transliteration: "Yaaa ayyuhan naasut taqoo Rabbakumul lazee khalaqakum min nafsinw waahidatinw wa khalaqa minhaa zawjahaa wa baththa minhumaa rijaalan kaseeranw wa nisaaa'", english: "O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women", bengali: "হে মানুষ! তোমরা তোমাদের প্রভুকে ভয় কর, যিনি তোমাদের এক ব্যক্তি থেকে সৃষ্টি করেছেন এবং তার থেকে তার জোড়া সৃষ্টি করেছেন এবং তাদের দুজন থেকে বহু নর-নারী ছড়িয়ে দিয়েছেন", audioUrl: getVerseAudioUrl(4, 1) },
      { number: 2, arabic: "وَآتُوا الْيَتَامَىٰ أَمْوَالَهُمْ ۖ وَلَا تَتَبَدَّلُوا الْخَبِيثَ بِالطَّيِّبِ ۖ وَلَا تَأْكُلُوا أَمْوَالَهُمْ إِلَىٰ أَمْوَالِكُمْ ۚ إِنَّهُ كَانَ حُوبًا كَبِيرًا", transliteration: "Wa aatul yataamaaa amwaalahum wa laa tatabaddalul khabeesa bittaiyibi wa laa ta'kulooo amwaalahum ilaaa amwaalikum, innahoo kaana hooban kabeeraa", english: "And give to the orphans their properties and do not substitute the defective for the good. And do not consume their properties into your own. Indeed, that is ever a great sin", bengali: "এতিমদের তাদের সম্পদ দিয়ে দাও এবং খারাপ জিনিসকে ভালো জিনিসের বদলে নিও না। এবং তাদের সম্পদ তোমাদের সম্পদের সাথে মিশিয়ে খেয়ো না। নিশ্চয়ই এটা মহাপাপ", audioUrl: getVerseAudioUrl(4, 2) },
      { number: 3, arabic: "وَإِنْ خِفْتُمْ أَلَّا تُقْسِطُوا فِي الْيَتَامَىٰ فَانكِحُوا مَا طَابَ لَكُم مِّنَ النِّسَاءِ مَثْنَىٰ وَثُلَاثَ وَرُبَاعَ", transliteration: "Wa in khiftum allaa tuqsitoo fil yataamaa fankihoo maa taaba lakum minan nisaaa'i masnaa wa sulaasa wa rubaa'", english: "And if you fear that you will not deal justly with the orphan girls, then marry those that please you of other women, two or three or four", bengali: "যদি তোমরা আশঙ্কা কর যে, এতিম মেয়েদের প্রতি সুবিচার করতে পারবে না, তবে অন্য নারীদের মধ্যে যাদের তোমাদের পছন্দ হয় তাদের বিয়ে কর, দুই, তিন বা চার", audioUrl: getVerseAudioUrl(4, 3) }
    ]
  },
  {
    surahNumber: 5,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ", transliteration: "Yaaa ayyuhal lazeena aamanoo awfoo bil'uqood", english: "O you who have believed, fulfill all contracts", bengali: "হে মুমিনগণ! তোমরা চুক্তিসমূহ পূর্ণ কর", audioUrl: getVerseAudioUrl(5, 1) },
      { number: 2, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحِلُّوا شَعَائِرَ اللَّهِ", transliteration: "Yaaa ayyuhal lazeena aamanoo laa tuhilloo sha'aaa'iral laah", english: "O you who have believed, do not violate the rites of Allah", bengali: "হে মুমিনগণ! আল্লাহর নিদর্শনসমূহ অবমাননা করো না", audioUrl: getVerseAudioUrl(5, 2) },
      { number: 3, arabic: "حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنزِيرِ وَمَا أُهِلَّ لِغَيْرِ اللَّهِ بِهِ", transliteration: "Hurrimat 'alaikumul maitatu waddamu wa lahmul khinzeeri wa maaa uhilla lighairil laahi bih", english: "Prohibited to you are dead animals, blood, the flesh of swine, and that which has been dedicated to other than Allah", bengali: "তোমাদের জন্য হারাম করা হয়েছে মৃত জন্তু, রক্ত, শূকরের মাংস এবং যা আল্লাহ ছাড়া অন্যের নামে জবাই করা হয়েছে", audioUrl: getVerseAudioUrl(5, 3) }
    ]
  },
  {
    surahNumber: 6,
    verses: [
      { number: 1, arabic: "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ ۖ ثُمَّ الَّذِينَ كَفَرُوا بِرَبِّهِمْ يَعْدِلُونَ", transliteration: "Alhamdu lillaahil lazee khalaqas samaawaati wal arda wa ja'alaz zulumaati wannoor, summal lazeena kafaroo bi Rabbihim ya'diloon", english: "All praise is due to Allah, who created the heavens and the earth and made the darkness and the light. Then those who disbelieve equate others with their Lord.", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আকাশমণ্ডলী ও পৃথিবী সৃষ্টি করেছেন এবং অন্ধকার ও আলো বানিয়েছেন। তারপরও কাফিররা তাদের প্রভুর সাথে অন্যকে সমকক্ষ করে।", audioUrl: getVerseAudioUrl(6, 1) },
      { number: 2, arabic: "هُوَ الَّذِي خَلَقَكُم مِّن طِينٍ ثُمَّ قَضَىٰ أَجَلًا ۖ وَأَجَلٌ مُّسَمًّى عِندَهُ ۖ ثُمَّ أَنتُمْ تَمْتَرُونَ", transliteration: "Huwal lazee khalaqakum min teenin summa qadaaa ajalaa, wa ajalum musamman 'indahoo summa antum tamtaroon", english: "It is He who created you from clay and then decreed a term and a specified time known to Him; then still you are in dispute.", bengali: "তিনিই তোমাদের মাটি থেকে সৃষ্টি করেছেন, তারপর একটি সময়সীমা নির্ধারণ করেছেন এবং তাঁর কাছে আরেকটি নির্দিষ্ট সময় আছে; তারপরও তোমরা সন্দেহ কর।", audioUrl: getVerseAudioUrl(6, 2) },
      { number: 3, arabic: "وَهُوَ اللَّهُ فِي السَّمَاوَاتِ وَفِي الْأَرْضِ ۖ يَعْلَمُ سِرَّكُمْ وَجَهْرَكُمْ وَيَعْلَمُ مَا تَكْسِبُونَ", transliteration: "Wa Huwal laahu fis samaawaati wa fil ard, ya'lamu sirrakum wa jahrakum wa ya'lamu maa taksiboon", english: "And He is Allah, in the heavens and on the earth. He knows your secret and what you make public, and He knows what you earn.", bengali: "তিনিই আল্লাহ আকাশে ও পৃথিবীতে। তিনি তোমাদের গোপন ও প্রকাশ্য সব জানেন এবং তোমরা যা অর্জন কর তাও জানেন।", audioUrl: getVerseAudioUrl(6, 3) },
      { number: 4, arabic: "وَمَا تَأْتِيهِم مِّنْ آيَةٍ مِّنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ", transliteration: "Wa maa ta'teehim min aayatim min aayaati Rabbihim illaa kaanoo 'anhaa mu'rideen", english: "And no sign comes to them from the signs of their Lord except that they turn away from it.", bengali: "তাদের প্রভুর নিদর্শনসমূহ থেকে কোন নিদর্শন তাদের কাছে আসে না যা থেকে তারা মুখ ফিরিয়ে নেয় না।", audioUrl: getVerseAudioUrl(6, 4) },
      { number: 5, arabic: "فَقَدْ كَذَّبُوا بِالْحَقِّ لَمَّا جَاءَهُمْ ۖ فَسَوْفَ يَأْتِيهِمْ أَنبَاءُ مَا كَانُوا بِهِ يَسْتَهْزِئُونَ", transliteration: "Faqad kazzaboo bilhaqqi lammaa jaaa'ahum, fasawfa ya'teehim ambaaa'u maa kaanoo bihee yastahzi'oon", english: "For they had denied the truth when it came to them, but there will come to them the news of what they used to ridicule.", bengali: "তারা সত্য যখন তাদের কাছে এল তখন তা অস্বীকার করল। শীঘ্রই তাদের কাছে সে সংবাদ আসবে যা নিয়ে তারা ঠাট্টা করত।", audioUrl: getVerseAudioUrl(6, 5) }
    ]
  },
  {
    surahNumber: 7,
    verses: [
      { number: 1, arabic: "المص", transliteration: "Alif-Laam-Meem-Saad", english: "Alif, Lam, Meem, Sad", bengali: "আলিফ লাম মীম সাদ", audioUrl: getVerseAudioUrl(7, 1) },
      { number: 2, arabic: "كِتَابٌ أُنزِلَ إِلَيْكَ فَلَا يَكُن فِي صَدْرِكَ حَرَجٌ مِّنْهُ لِتُنذِرَ بِهِ وَذِكْرَىٰ لِلْمُؤْمِنِينَ", transliteration: "Kitaabun unzila ilayka falaa yakun fee sadrika harajum minhu litunzira bihee wa zikraa lilmu'mineen", english: "This is a Book revealed to you - so let there not be in your breast distress therefrom - that you may warn thereby and as a reminder to the believers.", bengali: "এটি একটি কিতাব যা তোমার প্রতি অবতীর্ণ হয়েছে, তাই এর থেকে তোমার অন্তরে কোন সংকীর্ণতা যেন না থাকে, যাতে তুমি এর দ্বারা সতর্ক করতে পার এবং এটি মুমিনদের জন্য উপদেশ।", audioUrl: getVerseAudioUrl(7, 2) },
      { number: 3, arabic: "اتَّبِعُوا مَا أُنزِلَ إِلَيْكُم مِّن رَّبِّكُمْ وَلَا تَتَّبِعُوا مِن دُونِهِ أَوْلِيَاءَ ۗ قَلِيلًا مَّا تَذَكَّرُونَ", transliteration: "Ittabi'oo maaa unzila ilaikum mir Rabbikum wa laa tattabi'oo min doonihee awliyaaa', qaleelam maa tazakkaroon", english: "Follow what has been revealed to you from your Lord and do not follow other than Him any allies. Little do you remember.", bengali: "তোমাদের প্রভুর পক্ষ থেকে যা অবতীর্ণ হয়েছে তা অনুসরণ কর এবং তাঁকে ছাড়া অন্য কোন অভিভাবক অনুসরণ করো না। তোমরা খুব কমই উপদেশ গ্রহণ কর।", audioUrl: getVerseAudioUrl(7, 3) },
      { number: 4, arabic: "وَكَم مِّن قَرْيَةٍ أَهْلَكْنَاهَا فَجَاءَهَا بَأْسُنَا بَيَاتًا أَوْ هُمْ قَائِلُونَ", transliteration: "Wa kam min qaryatin ahlaknaahaa fajaaa'ahaa ba'sunaa bayaatan aw hum qaaa'iloon", english: "And how many cities have We destroyed, and Our punishment came to them at night or while they were sleeping at noon.", bengali: "আমি কত জনপদ ধ্বংস করেছি! আমার শাস্তি তাদের উপর রাতে অথবা দুপুরে বিশ্রামের সময় এসেছিল।", audioUrl: getVerseAudioUrl(7, 4) },
      { number: 5, arabic: "فَمَا كَانَ دَعْوَاهُمْ إِذْ جَاءَهُم بَأْسُنَا إِلَّا أَن قَالُوا إِنَّا كُنَّا ظَالِمِينَ", transliteration: "Famaa kaana da'waahum iz jaaa'ahum ba'sunaaa illaaa an qaalooo innaa kunnaa zaalimeen", english: "And their declaration when Our punishment came to them was only that they said, Indeed, we were wrongdoers.", bengali: "যখন আমার শাস্তি তাদের কাছে আসল তখন তাদের বক্তব্য এই ছিল যে, আমরা অবশ্যই জালিম ছিলাম।", audioUrl: getVerseAudioUrl(7, 5) }
    ]
  },
  {
    surahNumber: 8,
    verses: [
      { number: 1, arabic: "يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ ۖ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ إِن كُنتُم مُّؤْمِنِينَ", transliteration: "Yas'aloonaka 'anil anfaal, qulil anfaalu lillaahi war Rasool, fattaqul laaha wa aslihoo zaata bainikum wa atee'ul laaha wa Rasoolahooo in kuntum mu'mineen", english: "They ask you about the bounties of war. Say, The bounties are for Allah and the Messenger. So fear Allah and amend that which is between you and obey Allah and His Messenger, if you should be believers.", bengali: "তারা তোমাকে গনীমতের মাল সম্পর্কে জিজ্ঞেস করে। বল, গনীমতের মাল আল্লাহ ও রাসূলের। তাই আল্লাহকে ভয় কর এবং নিজেদের মধ্যে সংশোধন কর এবং আল্লাহ ও তাঁর রাসূলের আনুগত্য কর যদি তোমরা মুমিন হও।", audioUrl: getVerseAudioUrl(8, 1) },
      { number: 2, arabic: "إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آيَاتُهُ زَادَتْهُمْ إِيمَانًا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ", transliteration: "Innamal mu'minoonal lazeena izaa zukiral laahu wajilat quloobuhum wa izaa tuliyat 'alaihim aayaatuhoo zaadathum eemaananw wa 'alaa Rabbihim yatawakkaloon", english: "The believers are only those who, when Allah is mentioned, their hearts become fearful, and when His verses are recited to them, it increases them in faith; and upon their Lord they rely.", bengali: "প্রকৃত মুমিন তারাই যাদের অন্তর ভয়ে কেঁপে ওঠে যখন আল্লাহকে স্মরণ করা হয় এবং যখন তাঁর আয়াত তাদের কাছে তেলাওয়াত করা হয় তখন তা তাদের ঈমান বৃদ্ধি করে এবং তারা তাদের প্রভুর উপর ভরসা করে।", audioUrl: getVerseAudioUrl(8, 2) },
      { number: 3, arabic: "الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", transliteration: "Allazeena yuqeemoonas Salaata wa mimmaa razaqnaahum yunfiqoon", english: "The ones who establish prayer, and from what We have provided them, they spend.", bengali: "যারা নামাজ কায়েম করে এবং আমি তাদের যা দিয়েছি তা থেকে ব্যয় করে।", audioUrl: getVerseAudioUrl(8, 3) },
      { number: 4, arabic: "أُولَٰئِكَ هُمُ الْمُؤْمِنُونَ حَقًّا ۚ لَّهُمْ دَرَجَاتٌ عِندَ رَبِّهِمْ وَمَغْفِرَةٌ وَرِزْقٌ كَرِيمٌ", transliteration: "Ulaaa'ika humul mu'minoona haqqaa, lahum darajaatun 'inda Rabbihim wa maghfiratunw wa rizqun kareem", english: "Those are the believers, truly. For them are degrees of high position with their Lord and forgiveness and noble provision.", bengali: "তারাই প্রকৃত মুমিন। তাদের জন্য তাদের প্রভুর কাছে রয়েছে উচ্চ মর্যাদা, ক্ষমা এবং সম্মানজনক রিজিক।", audioUrl: getVerseAudioUrl(8, 4) },
      { number: 5, arabic: "كَمَا أَخْرَجَكَ رَبُّكَ مِن بَيْتِكَ بِالْحَقِّ وَإِنَّ فَرِيقًا مِّنَ الْمُؤْمِنِينَ لَكَارِهُونَ", transliteration: "Kamaaa akhrajaka Rabbuka mim baitika bilhaqqi wa inna fareeqam minal mu'mineena lakarihoon", english: "Just as your Lord brought you out of your home in truth, while indeed, a party among the believers were unwilling.", bengali: "যেমন তোমার প্রভু তোমাকে তোমার ঘর থেকে সত্যসহ বের করেছিলেন, অথচ মুমিনদের একদল অবশ্যই অপছন্দ করছিল।", audioUrl: getVerseAudioUrl(8, 5) }
    ]
  },
  {
    surahNumber: 9,
    verses: [
      { number: 1, arabic: "بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدتُّم مِّنَ الْمُشْرِكِينَ", transliteration: "Baraaa'atum minal laahi wa Rasoolihee ilal lazeena 'aahattum minal mushrikeen", english: "This is a declaration of disassociation, from Allah and His Messenger, to those with whom you had made a treaty among the polytheists.", bengali: "আল্লাহ ও তাঁর রাসূলের পক্ষ থেকে সম্পর্কচ্ছেদের ঘোষণা সেই মুশরিকদের প্রতি যাদের সাথে তোমরা চুক্তি করেছিলে।", audioUrl: getVerseAudioUrl(9, 1) },
      { number: 2, arabic: "فَسِيحُوا فِي الْأَرْضِ أَرْبَعَةَ أَشْهُرٍ وَاعْلَمُوا أَنَّكُمْ غَيْرُ مُعْجِزِي اللَّهِ ۙ وَأَنَّ اللَّهَ مُخْزِي الْكَافِرِينَ", transliteration: "Faseehoo fil ardi arba'ata ashhurinw wa'lamooo annakum ghairu mu'jizil laahi wa annal laaha mukhzil kaafireen", english: "So travel freely throughout the land during four months but know that you cannot escape Allah and that Allah will disgrace the disbelievers.", bengali: "অতঃপর তোমরা চার মাস পৃথিবীতে বিচরণ কর এবং জেনে রাখ যে তোমরা আল্লাহকে পরাজিত করতে পারবে না এবং আল্লাহ কাফিরদের অপমানিত করবেন।", audioUrl: getVerseAudioUrl(9, 2) },
      { number: 3, arabic: "وَأَذَانٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى النَّاسِ يَوْمَ الْحَجِّ الْأَكْبَرِ أَنَّ اللَّهَ بَرِيءٌ مِّنَ الْمُشْرِكِينَ ۙ وَرَسُولُهُ", transliteration: "Wa azaanum minal laahi wa Rasoolihee ilan naasi yawmal Hajjil Akbari annal laaha bareee'um minal mushrikeena wa Rasooluh", english: "And an announcement from Allah and His Messenger to the people on the day of the greater pilgrimage that Allah is disassociated from the disbelievers, and so is His Messenger.", bengali: "এবং হজ্জে আকবরের দিনে আল্লাহ ও তাঁর রাসূলের পক্ষ থেকে মানুষের প্রতি ঘোষণা যে, আল্লাহ মুশরিকদের থেকে দায়মুক্ত এবং তাঁর রাসূলও।", audioUrl: getVerseAudioUrl(9, 3) },
      { number: 4, arabic: "إِلَّا الَّذِينَ عَاهَدتُّم مِّنَ الْمُشْرِكِينَ ثُمَّ لَمْ يَنقُصُوكُمْ شَيْئًا وَلَمْ يُظَاهِرُوا عَلَيْكُمْ أَحَدًا فَأَتِمُّوا إِلَيْهِمْ عَهْدَهُمْ إِلَىٰ مُدَّتِهِمْ", transliteration: "Illal lazeena 'aahattum minal mushrikeena summa lam yanqusookum shai'anw wa lam yuzaahiroo 'alaikum ahadan fa atimmooo ilaihim 'ahdahum ilaa muddatihim", english: "Excepted are those with whom you made a treaty among the polytheists and then they have not been deficient toward you in anything or supported anyone against you; so complete for them their treaty until their term has ended.", bengali: "তবে মুশরিকদের মধ্যে যাদের সাথে তোমরা চুক্তি করেছ, তারপর তারা তোমাদের সাথে কোন ক্ষতি করেনি এবং তোমাদের বিরুদ্ধে কাউকে সাহায্য করেনি, তাদের সাথে তাদের মেয়াদ পূর্ণ হওয়া পর্যন্ত চুক্তি পূর্ণ কর।", audioUrl: getVerseAudioUrl(9, 4) },
      { number: 5, arabic: "فَإِذَا انسَلَخَ الْأَشْهُرُ الْحُرُمُ فَاقْتُلُوا الْمُشْرِكِينَ حَيْثُ وَجَدتُّمُوهُمْ وَخُذُوهُمْ وَاحْصُرُوهُمْ وَاقْعُدُوا لَهُمْ كُلَّ مَرْصَدٍ", transliteration: "Fa izas salakhal Ashhurul Hurumu faqtulul mushrikeena haisu wajattumoohum wa khuzoohum wahsuroohum waq'udoo lahum kulla marsad", english: "And when the sacred months have passed, then kill the polytheists wherever you find them and capture them and besiege them and sit in wait for them at every place of ambush.", bengali: "অতঃপর নিষিদ্ধ মাসগুলো অতিবাহিত হলে মুশরিকদের যেখানে পাও হত্যা কর, তাদের বন্দী কর, অবরোধ কর এবং তাদের জন্য প্রতিটি ঘাঁটিতে ওঁৎ পেতে বস।", audioUrl: getVerseAudioUrl(9, 5) }
    ]
  },
  {
    surahNumber: 10,
    verses: [
      { number: 1, arabic: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ", transliteration: "Alif-Laam-Raa, tilka Aayaatul Kitaabil Hakeem", english: "Alif, Lam, Ra. These are the verses of the wise Book.", bengali: "আলিফ লাম রা। এগুলো হিকমতপূর্ণ কিতাবের আয়াত।", audioUrl: getVerseAudioUrl(10, 1) },
      { number: 2, arabic: "أَكَانَ لِلنَّاسِ عَجَبًا أَنْ أَوْحَيْنَا إِلَىٰ رَجُلٍ مِّنْهُمْ أَنْ أَنذِرِ النَّاسَ وَبَشِّرِ الَّذِينَ آمَنُوا أَنَّ لَهُمْ قَدَمَ صِدْقٍ عِندَ رَبِّهِمْ", transliteration: "Akaana linnaasi 'ajaban an awhainaaa ilaa rajulim minhum an anzitin naasa wa bashshiril lazeena aamanoo anna lahum qadama sidqin 'inda Rabbihim", english: "Have the people been amazed that We revealed to a man from among them, saying, Warn mankind and give good tidings to those who believe that they will have a firm precedence of honor with their Lord?", bengali: "মানুষের কাছে কি আশ্চর্য লেগেছে যে, আমি তাদের মধ্য থেকে একজনের কাছে ওহী পাঠিয়েছি যে, মানুষদের সতর্ক কর এবং মুমিনদের সুসংবাদ দাও যে তাদের জন্য তাদের প্রভুর কাছে সত্যের মর্যাদা রয়েছে?", audioUrl: getVerseAudioUrl(10, 2) },
      { number: 3, arabic: "إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۖ يُدَبِّرُ الْأَمْرَ", transliteration: "Inna Rabbakumul laahul lazee khalaqas samaawaati wal arda fee sittati ayyaamin summas tawaa 'alal 'Arshi yudabbirul amr", english: "Indeed, your Lord is Allah, who created the heavens and the earth in six days and then established Himself above the Throne, arranging the matter of His creation.", bengali: "নিশ্চয়ই তোমাদের প্রভু আল্লাহ যিনি আকাশমণ্ডলী ও পৃথিবী ছয় দিনে সৃষ্টি করেছেন, তারপর আরশে সমাসীন হয়েছেন, তিনি সব বিষয় পরিচালনা করেন।", audioUrl: getVerseAudioUrl(10, 3) },
      { number: 4, arabic: "إِلَيْهِ مَرْجِعُكُمْ جَمِيعًا ۖ وَعْدَ اللَّهِ حَقًّا ۚ إِنَّهُ يَبْدَأُ الْخَلْقَ ثُمَّ يُعِيدُهُ لِيَجْزِيَ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ بِالْقِسْطِ", transliteration: "Ilaihi marji'ukum jamee'aa, wa'dal laahi haqqaa, innahoo yabda'ul khalqa summa yu'eeduhoo liyajziyal lazeena aamanoo wa 'amilus saalihaati bilqist", english: "To Him is your return all together. It is the promise of Allah which is true. Indeed, He begins the creation and then repeats it that He may reward those who have believed and done righteous deeds, in justice.", bengali: "তাঁরই কাছে তোমাদের সকলের প্রত্যাবর্তন। আল্লাহর প্রতিশ্রুতি সত্য। তিনিই সৃষ্টির সূচনা করেন, তারপর তাকে পুনরায় সৃষ্টি করেন, যাতে যারা ঈমান এনেছে ও সৎকর্ম করেছে তাদের ন্যায়সঙ্গতভাবে পুরস্কৃত করেন।", audioUrl: getVerseAudioUrl(10, 4) },
      { number: 5, arabic: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ", transliteration: "Huwal lazee ja'alash shamsa diyaaa'anw walqamara nooranw wa qaddarahoo manaazila lita'lamoo 'adadas sineena wal hisaab", english: "It is He who made the sun a shining light and the moon a derived light and determined for it phases - that you may know the number of years and account of time.", bengali: "তিনিই সূর্যকে দীপ্তিময় এবং চাঁদকে আলোকময় বানিয়েছেন এবং এর জন্য মনজিল নির্ধারণ করেছেন যাতে তোমরা বছরের সংখ্যা ও হিসাব জানতে পার।", audioUrl: getVerseAudioUrl(10, 5) }
    ]
  },
  {
    surahNumber: 11,
    verses: [
      { number: 1, arabic: "الر ۚ كِتَابٌ أُحْكِمَتْ آيَاتُهُ ثُمَّ فُصِّلَتْ مِن لَّدُنْ حَكِيمٍ خَبِيرٍ", transliteration: "Alif-Laam-Raa, Kitaabun uhkimat Aayaatuhoo summa fussilat mil ladun Hakeemin Khabeer", english: "Alif, Lam, Ra. This is a Book whose verses are perfected and then presented in detail from One who is Wise and Acquainted.", bengali: "আলিফ লাম রা। এটি এমন একটি কিতাব যার আয়াতসমূহ সুদৃঢ় করা হয়েছে, তারপর বিশদভাবে বর্ণনা করা হয়েছে প্রজ্ঞাময় সর্বজ্ঞের পক্ষ থেকে।", audioUrl: getVerseAudioUrl(11, 1) },
      { number: 2, arabic: "أَلَّا تَعْبُدُوا إِلَّا اللَّهَ ۚ إِنَّنِي لَكُم مِّنْهُ نَذِيرٌ وَبَشِيرٌ", transliteration: "Allaa ta'budooo illal laah, innanee lakum minhu nazeerunw wa basheer", english: "You worship not except Allah. Indeed, I am to you from Him a warner and a bringer of good tidings.", bengali: "যেন তোমরা আল্লাহ ছাড়া কারো ইবাদত না কর। নিশ্চয়ই আমি তাঁর পক্ষ থেকে তোমাদের জন্য সতর্ককারী ও সুসংবাদদাতা।", audioUrl: getVerseAudioUrl(11, 2) },
      { number: 3, arabic: "وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ يُمَتِّعْكُم مَّتَاعًا حَسَنًا إِلَىٰ أَجَلٍ مُّسَمًّى وَيُؤْتِ كُلَّ ذِي فَضْلٍ فَضْلَهُ", transliteration: "Wa anis taghfiroo Rabbakum summa toobooo ilaihi yumatti'kum mataa'an hasanan ilaaa ajalim musammanw wa yu'ti kulla zee fadlin fadlah", english: "And seek forgiveness of your Lord and repent to Him, and He will let you enjoy a good provision for a specified term and give every doer of favor his favor.", bengali: "এবং তোমাদের প্রভুর কাছে ক্ষমা প্রার্থনা কর, তারপর তাঁর কাছে তওবা কর। তিনি তোমাদের একটি নির্দিষ্ট সময় পর্যন্ত উত্তম জীবনোপকরণ ভোগ করাবেন এবং প্রত্যেক অনুগ্রহশীলকে তার অনুগ্রহ দান করবেন।", audioUrl: getVerseAudioUrl(11, 3) },
      { number: 4, arabic: "وَإِن تَوَلَّوْا فَإِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ كَبِيرٍ", transliteration: "Wa in tawallaw fa inneee akhaafu 'alaikum 'azaaba Yawmin Kabeer", english: "But if you turn away, then indeed, I fear for you the punishment of a great Day.", bengali: "আর যদি তোমরা মুখ ফিরিয়ে নাও, তবে আমি তোমাদের জন্য এক মহাদিবসের শাস্তির আশঙ্কা করি।", audioUrl: getVerseAudioUrl(11, 4) },
      { number: 5, arabic: "إِلَى اللَّهِ مَرْجِعُكُمْ ۖ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "Ilal laahi marji'ukum wa Huwa 'alaa kulli shai'in Qadeer", english: "To Allah is your return, and He is over all things competent.", bengali: "আল্লাহর কাছেই তোমাদের প্রত্যাবর্তন এবং তিনি সব কিছুর উপর ক্ষমতাবান।", audioUrl: getVerseAudioUrl(11, 5) }
    ]
  },
  {
    surahNumber: 12,
    verses: [
      { number: 1, arabic: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ", transliteration: "Alif-Laam-Raa, tilka Aayaatul Kitaabil Mubeen", english: "Alif, Lam, Ra. These are the verses of the clear Book.", bengali: "আলিফ লাম রা। এগুলো সুস্পষ্ট কিতাবের আয়াত।", audioUrl: getVerseAudioUrl(12, 1) },
      { number: 2, arabic: "إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ", transliteration: "Innaaa anzalnaahu Quraanan 'Arabiyyal la'allakum ta'qiloon", english: "Indeed, We have sent it down as an Arabic Quran that you might understand.", bengali: "নিশ্চয়ই আমি এটি আরবি কুরআন হিসেবে অবতীর্ণ করেছি যাতে তোমরা বুঝতে পার।", audioUrl: getVerseAudioUrl(12, 2) },
      { number: 3, arabic: "نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ وَإِن كُنتَ مِن قَبْلِهِ لَمِنَ الْغَافِلِينَ", transliteration: "Nahnu naqussu 'alaika ahsanal qasasi bimaaa awhainaaa ilaika haazal Qur'aana wa in kunta min qablihee laminal ghaafileen", english: "We relate to you the best of stories in what We have revealed to you of this Quran, although you were, before it, among the unaware.", bengali: "আমি তোমার কাছে উত্তম কাহিনী বর্ণনা করছি এই কুরআন যা তোমার প্রতি ওহী করেছি তার মাধ্যমে, যদিও এর আগে তুমি অবশ্যই অজ্ঞদের অন্তর্ভুক্ত ছিলে।", audioUrl: getVerseAudioUrl(12, 3) },
      { number: 4, arabic: "إِذْ قَالَ يُوسُفُ لِأَبِيهِ يَا أَبَتِ إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالْقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ", transliteration: "Iz qaala Yoosufu li abeehi yaaa abati innee ra aytu ahada 'ashara kawkabanw wash shamsa walqamara ra aytuhum lee saajideen", english: "When Joseph said to his father, O my father, indeed I have seen eleven stars and the sun and the moon; I saw them prostrating to me.", bengali: "স্মরণ কর, যখন ইউসুফ তার পিতাকে বলল, হে আমার পিতা! আমি এগারোটি তারা এবং সূর্য ও চাঁদকে দেখেছি, দেখেছি তারা আমাকে সিজদা করছে।", audioUrl: getVerseAudioUrl(12, 4) },
      { number: 5, arabic: "قَالَ يَا بُنَيَّ لَا تَقْصُصْ رُؤْيَاكَ عَلَىٰ إِخْوَتِكَ فَيَكِيدُوا لَكَ كَيْدًا ۖ إِنَّ الشَّيْطَانَ لِلْإِنسَانِ عَدُوٌّ مُّبِينٌ", transliteration: "Qaala yaa bunayya laa taqsus ru'yaaka 'alaaa ikhwatika fa yakeedoo laka kaidaa, innash Shaitaana lil insaani 'aduwwum mubeen", english: "He said, O my son, do not relate your vision to your brothers or they will contrive against you a plan. Indeed Satan, to man, is a manifest enemy.", bengali: "তিনি বললেন, হে আমার পুত্র! তোমার স্বপ্ন তোমার ভাইদের কাছে বলো না, তাহলে তারা তোমার বিরুদ্ধে ষড়যন্ত্র করবে। নিশ্চয়ই শয়তান মানুষের প্রকাশ্য শত্রু।", audioUrl: getVerseAudioUrl(12, 5) }
    ]
  },
  {
    surahNumber: 13,
    verses: [
      { number: 1, arabic: "المر ۚ تِلْكَ آيَاتُ الْكِتَابِ ۗ وَالَّذِي أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يُؤْمِنُونَ", transliteration: "Alif-Laam-Meem-Raa, tilka Aayaatul Kitaab, wallazee unzila ilaika mir Rabbikal haqqu wa laakinna aksaran naasi laa yu'minoon", english: "Alif, Lam, Meem, Ra. These are the verses of the Book; and what has been revealed to you from your Lord is the truth, but most of the people do not believe.", bengali: "আলিফ লাম মীম রা। এগুলো কিতাবের আয়াত। তোমার প্রভুর পক্ষ থেকে যা তোমার প্রতি অবতীর্ণ হয়েছে তা সত্য, কিন্তু অধিকাংশ মানুষ বিশ্বাস করে না।", audioUrl: getVerseAudioUrl(13, 1) },
      { number: 2, arabic: "اللَّهُ الَّذِي رَفَعَ السَّمَاوَاتِ بِغَيْرِ عَمَدٍ تَرَوْنَهَا ۖ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۖ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ يَجْرِي لِأَجَلٍ مُّسَمًّى", transliteration: "Allaahul lazee rafa'as samaawaati bighayri 'amadin tarawnahaa summas tawaa 'alal 'Arshi wa sakhkharash shamsa walqamara kullun yajree li ajalim musammaa", english: "It is Allah who erected the heavens without pillars that you can see; then He established Himself above the Throne and made subject the sun and the moon, each running its course for a specified term.", bengali: "আল্লাহ তিনি যিনি আকাশমণ্ডলী স্থাপন করেছেন কোন স্তম্ভ ছাড়া যা তোমরা দেখতে পাও, তারপর তিনি আরশে সমাসীন হয়েছেন এবং সূর্য ও চাঁদকে নিয়ন্ত্রণাধীন করেছেন, প্রত্যেকটি একটি নির্দিষ্ট সময় পর্যন্ত চলমান।", audioUrl: getVerseAudioUrl(13, 2) },
      { number: 3, arabic: "وَهُوَ الَّذِي مَدَّ الْأَرْضَ وَجَعَلَ فِيهَا رَوَاسِيَ وَأَنْهَارًا ۖ وَمِن كُلِّ الثَّمَرَاتِ جَعَلَ فِيهَا زَوْجَيْنِ اثْنَيْنِ", transliteration: "Wa Huwal lazee maddal arda wa ja'ala feehaa rawaasiya wa anhaaraa, wa min kullis samaraati ja'ala feehaa zawjaynis nayn", english: "And it is He who spread the earth and placed therein firmly set mountains and rivers; and from all of the fruits He made therein two mates.", bengali: "এবং তিনিই পৃথিবীকে বিস্তৃত করেছেন এবং তাতে পর্বতমালা ও নদ-নদী স্থাপন করেছেন এবং সকল ফলের জোড়া জোড়া সৃষ্টি করেছেন।", audioUrl: getVerseAudioUrl(13, 3) },
      { number: 4, arabic: "وَفِي الْأَرْضِ قِطَعٌ مُّتَجَاوِرَاتٌ وَجَنَّاتٌ مِّنْ أَعْنَابٍ وَزَرْعٌ وَنَخِيلٌ صِنْوَانٌ وَغَيْرُ صِنْوَانٍ يُسْقَىٰ بِمَاءٍ وَاحِدٍ", transliteration: "Wa fil ardi qita'um mutajaawiraatunw wa jannaatum min a'naabinw wa zar'unw wa nakheelun sinwaanunw wa ghairu sinwaanin yusqaa bimaaa'inw waahid", english: "And within the land are neighboring plots and gardens of grapevines and crops and palm trees, growing several from a root or otherwise, watered with one water.", bengali: "পৃথিবীতে পরস্পর সংলগ্ন ভূখণ্ড রয়েছে এবং আঙ্গুরের বাগান, শস্যক্ষেত এবং খেজুর গাছ—একই মূল থেকে বা ভিন্ন ভিন্ন, একই পানি দ্বারা সিক্ত।", audioUrl: getVerseAudioUrl(13, 4) },
      { number: 5, arabic: "وَإِن تَعْجَبْ فَعَجَبٌ قَوْلُهُمْ أَإِذَا كُنَّا تُرَابًا أَإِنَّا لَفِي خَلْقٍ جَدِيدٍ", transliteration: "Wa in ta'jab fa'ajabun qawluhum 'a-izaa kunnaa turaaban 'a-innaa lafee khalqin jadeed", english: "And if you are astonished, then astonishing is their saying, When we are dust, will we indeed be brought into a new creation?", bengali: "যদি তুমি আশ্চর্য হও, তবে তাদের এ কথা আশ্চর্যের: আমরা যখন মাটি হয়ে যাব তখন কি আমরা পুনরায় সৃষ্টি হব?", audioUrl: getVerseAudioUrl(13, 5) }
    ]
  },
  {
    surahNumber: 14,
    verses: [
      { number: 1, arabic: "الر ۚ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ بِإِذْنِ رَبِّهِمْ إِلَىٰ صِرَاطِ الْعَزِيزِ الْحَمِيدِ", transliteration: "Alif-Laam-Raa, Kitaabun anzalnaahu ilaika litukhrijan naasa minaz zulumaati ilan noori bi izni Rabbihim ilaa Siraatil 'Azeezil Hameed", english: "Alif, Lam, Ra. This is a Book which We have revealed to you that you might bring mankind out of darknesses into the light by permission of their Lord - to the path of the Exalted in Might, the Praiseworthy.", bengali: "আলিফ লাম রা। এটি একটি কিতাব যা আমি তোমার প্রতি অবতীর্ণ করেছি যাতে তুমি মানুষকে অন্ধকার থেকে আলোতে বের করে আন তাদের প্রভুর অনুমতিক্রমে, পরাক্রমশালী প্রশংসিতের পথে।", audioUrl: getVerseAudioUrl(14, 1) },
      { number: 2, arabic: "اللَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ وَوَيْلٌ لِّلْكَافِرِينَ مِنْ عَذَابٍ شَدِيدٍ", transliteration: "Allaahil lazee lahoo maa fis samaawaati wa maa fil ard, wa wailul lilkaafireena min 'azaabin shadeed", english: "Allah, to whom belongs whatever is in the heavens and whatever is on the earth. And woe to the disbelievers from a severe punishment.", bengali: "আল্লাহ, যাঁর জন্যই আকাশমণ্ডলী ও পৃথিবীতে যা কিছু আছে। কঠোর শাস্তি থেকে কাফিরদের জন্য ধ্বংস।", audioUrl: getVerseAudioUrl(14, 2) },
      { number: 3, arabic: "الَّذِينَ يَسْتَحِبُّونَ الْحَيَاةَ الدُّنْيَا عَلَى الْآخِرَةِ وَيَصُدُّونَ عَن سَبِيلِ اللَّهِ وَيَبْغُونَهَا عِوَجًا ۚ أُولَٰئِكَ فِي ضَلَالٍ بَعِيدٍ", transliteration: "Allazeena yastahibboonal hayaatad dunyaa 'alal Aakhirati wa yasuddoona 'an sabeelil laahi wa yabghoonahaa 'iwajaa, ulaaa'ika fee dalaalim ba'eed", english: "The ones who prefer the worldly life over the Hereafter and avert people from the way of Allah, seeking to make it crooked. Those are in extreme error.", bengali: "যারা আখিরাতের চেয়ে দুনিয়ার জীবনকে বেশি পছন্দ করে এবং মানুষকে আল্লাহর পথ থেকে বিরত রাখে ও তাতে বক্রতা খোঁজে, তারা চরম বিভ্রান্তিতে।", audioUrl: getVerseAudioUrl(14, 3) },
      { number: 4, arabic: "وَمَا أَرْسَلْنَا مِن رَّسُولٍ إِلَّا بِلِسَانِ قَوْمِهِ لِيُبَيِّنَ لَهُمْ", transliteration: "Wa maaa arsalnaa mir Rasoolin illaa bilisaani qawmihee liyubaiyina lahum", english: "And We did not send any messenger except speaking in the language of his people to state clearly for them.", bengali: "আমি প্রত্যেক রাসূলকে তার জাতির ভাষায় পাঠিয়েছি যাতে তাদের কাছে স্পষ্টভাবে বর্ণনা করতে পারে।", audioUrl: getVerseAudioUrl(14, 4) },
      { number: 5, arabic: "وَلَقَدْ أَرْسَلْنَا مُوسَىٰ بِآيَاتِنَا أَنْ أَخْرِجْ قَوْمَكَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَذَكِّرْهُم بِأَيَّامِ اللَّهِ", transliteration: "Wa laqad arsalnaa Moosaa bi Aayaatinaaa an akhrij qawmaka minaz zulumaati ilan noori wa zakkir hum bi ayyaamil laah", english: "And We certainly sent Moses with Our signs, saying, Bring out your people from darknesses into the light and remind them of the days of Allah.", bengali: "এবং আমি মূসাকে আমার নিদর্শনসমূহ দিয়ে পাঠিয়েছিলাম এই বলে যে, তোমার জাতিকে অন্ধকার থেকে আলোতে বের করে আন এবং তাদের আল্লাহর দিনগুলোর কথা স্মরণ করিয়ে দাও।", audioUrl: getVerseAudioUrl(14, 5) }
    ]
  },
  {
    surahNumber: 15,
    verses: [
      { number: 1, arabic: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُّبِينٍ", transliteration: "Alif-Laam-Raa, tilka Aayaatul Kitaabi wa Qur'aanim Mubeen", english: "Alif, Lam, Ra. These are the verses of the Book and a clear Quran.", bengali: "আলিফ লাম রা। এগুলো কিতাব ও সুস্পষ্ট কুরআনের আয়াত।", audioUrl: getVerseAudioUrl(15, 1) },
      { number: 2, arabic: "رُّبَمَا يَوَدُّ الَّذِينَ كَفَرُوا لَوْ كَانُوا مُسْلِمِينَ", transliteration: "Rubamaa yawaddul lazeena kafaroo law kaanoo muslimeen", english: "Perhaps those who disbelieve will wish that they had been Muslims.", bengali: "কাফিররা হয়তো কামনা করবে যে তারা যদি মুসলিম হত।", audioUrl: getVerseAudioUrl(15, 2) },
      { number: 3, arabic: "ذَرْهُمْ يَأْكُلُوا وَيَتَمَتَّعُوا وَيُلْهِهِمُ الْأَمَلُ ۖ فَسَوْفَ يَعْلَمُونَ", transliteration: "Zarhum ya'kuloo wa yatamatta'oo wa yulhihimul amal, fasawfa ya'lamoon", english: "Let them eat and enjoy themselves and be diverted by false hope, for they are going to know.", bengali: "তাদের ছেড়ে দাও, তারা খাক ও ভোগ করুক এবং মিথ্যা আশা তাদের উদাসীন রাখুক; শীঘ্রই তারা জানতে পারবে।", audioUrl: getVerseAudioUrl(15, 3) },
      { number: 4, arabic: "وَمَا أَهْلَكْنَا مِن قَرْيَةٍ إِلَّا وَلَهَا كِتَابٌ مَّعْلُومٌ", transliteration: "Wa maaa ahlaknaa min qaryatin illaa wa lahaa kitaabum ma'loom", english: "And We did not destroy any city but that for it was a known decree.", bengali: "আমি কোন জনপদ ধ্বংস করিনি যার একটি নির্ধারিত সময় ছিল না।", audioUrl: getVerseAudioUrl(15, 4) },
      { number: 5, arabic: "مَّا تَسْبِقُ مِنْ أُمَّةٍ أَجَلَهَا وَمَا يَسْتَأْخِرُونَ", transliteration: "Maa tasbiqu min ummatin ajalahaa wa maa yasta'khiroon", english: "No nation will precede its term, nor will they remain thereafter.", bengali: "কোন জাতি তার নির্ধারিত সময়ের আগে যেতে পারে না এবং তার পরেও থাকতে পারে না।", audioUrl: getVerseAudioUrl(15, 5) }
    ]
  },
  {
    surahNumber: 16,
    verses: [
      { number: 1, arabic: "أَتَىٰ أَمْرُ اللَّهِ فَلَا تَسْتَعْجِلُوهُ ۚ سُبْحَانَهُ وَتَعَالَىٰ عَمَّا يُشْرِكُونَ", transliteration: "Ataaa amrul laahi falaa tasta'jilooh, Subhaanahoo wa Ta'aalaa 'ammaa yushrikoon", english: "The command of Allah is coming, so be not impatient for it. Exalted is He and high above what they associate with Him.", bengali: "আল্লাহর নির্দেশ আসছে, সুতরাং এর জন্য তাড়াহুড়ো করো না। তিনি পবিত্র এবং তারা যা শরীক করে তার অনেক ঊর্ধ্বে।", audioUrl: getVerseAudioUrl(16, 1) },
      { number: 2, arabic: "يُنَزِّلُ الْمَلَائِكَةَ بِالرُّوحِ مِنْ أَمْرِهِ عَلَىٰ مَن يَشَاءُ مِنْ عِبَادِهِ أَنْ أَنذِرُوا أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاتَّقُونِ", transliteration: "Yunazzilul malaaa'ikata bir roohi min amrihee 'alaa mai yashaaa'u min 'ibaadihee an anzirooo annahoo laaa ilaaha illaaa Ana fattaqoon", english: "He sends down the angels, with the inspiration of His command, upon whom He wills of His servants, telling them, Warn that there is no deity except Me; so fear Me.", bengali: "তিনি তাঁর ইচ্ছামত বান্দাদের উপর ফেরেশতাদের পাঠান রূহসহ তাঁর নির্দেশে এই বলে যে, সতর্ক কর যে আমি ছাড়া কোন উপাস্য নেই, সুতরাং আমাকে ভয় কর।", audioUrl: getVerseAudioUrl(16, 2) },
      { number: 3, arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۚ تَعَالَىٰ عَمَّا يُشْرِكُونَ", transliteration: "Khalaqas samaawaati wal arda bilhaqq, Ta'aalaa 'ammaa yushrikoon", english: "He created the heavens and earth in truth. High is He above what they associate with Him.", bengali: "তিনি আকাশমণ্ডলী ও পৃথিবী সত্যসহ সৃষ্টি করেছেন। তারা যা শরীক করে তার অনেক ঊর্ধ্বে তিনি।", audioUrl: getVerseAudioUrl(16, 3) },
      { number: 4, arabic: "خَلَقَ الْإِنسَانَ مِن نُّطْفَةٍ فَإِذَا هُوَ خَصِيمٌ مُّبِينٌ", transliteration: "Khalaqal insaana min nutfatin fa izaa huwa khaseemum mubeen", english: "He created man from a sperm-drop; then at once, he is a clear adversary.", bengali: "তিনি মানুষকে শুক্রবিন্দু থেকে সৃষ্টি করেছেন, অথচ সে হয়ে যায় প্রকাশ্য বিতণ্ডাকারী।", audioUrl: getVerseAudioUrl(16, 4) },
      { number: 5, arabic: "وَالْأَنْعَامَ خَلَقَهَا ۗ لَكُمْ فِيهَا دِفْءٌ وَمَنَافِعُ وَمِنْهَا تَأْكُلُونَ", transliteration: "Wal an'aama khalaqahaa, lakum feehaa dif'unw wa manaafi'u wa minhaa ta'kuloon", english: "And the grazing livestock He has created for you; in them is warmth and numerous benefits, and from them you eat.", bengali: "এবং তিনি গবাদি পশু সৃষ্টি করেছেন; তোমাদের জন্য তাতে উষ্ণতা ও বহু উপকারিতা আছে এবং তা থেকে তোমরা খাও।", audioUrl: getVerseAudioUrl(16, 5) }
    ]
  },
  {
    surahNumber: 17,
    verses: [
      { number: 1, arabic: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا", transliteration: "Subhaanal lazee asraa bi'abdihee lailam minal Masjidil Haraami ilal Masjidil Aqsal lazee baaraknaa hawlahoo linuriyahoo min Aayaatinaa", english: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs.", bengali: "পবিত্র তিনি যিনি তাঁর বান্দাকে রাতে মসজিদুল হারাম থেকে মসজিদুল আকসায় নিয়ে গেলেন, যার চারপাশ আমি বরকতময় করেছি, যাতে আমি তাকে আমার নিদর্শনসমূহ দেখাই।", audioUrl: getVerseAudioUrl(17, 1) },
      { number: 2, arabic: "وَآتَيْنَا مُوسَى الْكِتَابَ وَجَعَلْنَاهُ هُدًى لِّبَنِي إِسْرَائِيلَ أَلَّا تَتَّخِذُوا مِن دُونِي وَكِيلًا", transliteration: "Wa aatainaa Moosal Kitaaba wa ja'alnaahu hudal li Baneee Israaa'eela allaa tattakhizoo min doonee wakeelaa", english: "And We gave Moses the Scripture and made it a guidance for the Children of Israel that you not take other than Me as Disposer of affairs.", bengali: "এবং আমি মূসাকে কিতাব দিয়েছিলাম এবং বনী ইসরাঈলের জন্য পথনির্দেশ করেছিলাম এই বলে যে, আমাকে ছাড়া অন্য কাউকে কর্মবিধায়ক গ্রহণ করো না।", audioUrl: getVerseAudioUrl(17, 2) },
      { number: 3, arabic: "ذُرِّيَّةَ مَنْ حَمَلْنَا مَعَ نُوحٍ ۚ إِنَّهُ كَانَ عَبْدًا شَكُورًا", transliteration: "Zurriyyata man hamalnaa ma'a Nooh, innahoo kaana 'abdan shakooraa", english: "O descendants of those We carried in the ship with Noah. Indeed, he was a grateful servant.", bengali: "হে তাদের বংশধর যাদের আমি নূহের সাথে জাহাজে বহন করেছিলাম। নিশ্চয়ই তিনি ছিলেন কৃতজ্ঞ বান্দা।", audioUrl: getVerseAudioUrl(17, 3) },
      { number: 4, arabic: "وَقَضَيْنَا إِلَىٰ بَنِي إِسْرَائِيلَ فِي الْكِتَابِ لَتُفْسِدُنَّ فِي الْأَرْضِ مَرَّتَيْنِ وَلَتَعْلُنَّ عُلُوًّا كَبِيرًا", transliteration: "Wa qadainaaa ilaa Baneee Israaa'eela fil Kitaabi latufsidunna fil ardi marratayni wa lata'lunna 'uluwwan kabeeraa", english: "And We conveyed to the Children of Israel in the Scripture that you will surely cause corruption on the earth twice, and you will surely reach great haughtiness.", bengali: "এবং আমি কিতাবে বনী ইসরাঈলকে জানিয়ে দিয়েছিলাম যে, তোমরা অবশ্যই পৃথিবীতে দুইবার বিপর্যয় সৃষ্টি করবে এবং অবশ্যই চরম অহংকারী হবে।", audioUrl: getVerseAudioUrl(17, 4) },
      { number: 5, arabic: "فَإِذَا جَاءَ وَعْدُ أُولَاهُمَا بَعَثْنَا عَلَيْكُمْ عِبَادًا لَّنَا أُولِي بَأْسٍ شَدِيدٍ فَجَاسُوا خِلَالَ الدِّيَارِ ۚ وَكَانَ وَعْدًا مَّفْعُولًا", transliteration: "Fa izaa jaaa'a wa'du oolaahumaa ba'asnaa 'alaikum 'ibaadal lanaaa ulee ba'sin shadeedin fajaasoo khilaalad diyaar, wa kaana wa'dam maf'oolaa", english: "So when the time for the first of them came, We sent against you servants of Ours - those of great military might, and they probed even into the homes, and it was a promise fulfilled.", bengali: "যখন এর প্রথমটির সময় আসল, আমি তোমাদের বিরুদ্ধে আমার এমন বান্দাদের পাঠালাম যারা ছিল কঠোর যুদ্ধবাজ। তারা ঘরে ঘরে ঢুকে অনুসন্ধান করল। এটি ছিল পূর্ণ হওয়া প্রতিশ্রুতি।", audioUrl: getVerseAudioUrl(17, 5) }
    ]
  },
  {
    surahNumber: 18,
    verses: [
      { number: 1, arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا", transliteration: "Alhamdu lillaahil lazee anzala 'alaa 'abdihil Kitaaba wa lam yaj'al lahoo 'iwajaa", english: "All praise is due to Allah, who has sent down upon His Servant the Book and has not made therein any deviance", bengali: "সমস্ত প্রশংসা আল্লাহর যিনি তাঁর বান্দার উপর কিতাব অবতীর্ণ করেছেন এবং তাতে কোন বক্রতা রাখেননি", audioUrl: getVerseAudioUrl(18, 1) },
      { number: 2, arabic: "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا", transliteration: "Qaiyimal liyunzira ba'san shadeedam mil ladunhu wa yubashshiral mu'mineenal lazeena ya'maloonas saalihaati anna lahum ajran hasanaa", english: "He has made it straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward", bengali: "একে সুপ্রতিষ্ঠিত করেছেন, যাতে তাঁর পক্ষ থেকে কঠোর শাস্তি সম্পর্কে সতর্ক করে এবং সৎকর্মশীল মুমিনদের সুসংবাদ দেয় যে তাদের জন্য রয়েছে উত্তম পুরস্কার", audioUrl: getVerseAudioUrl(18, 2) },
      { number: 10, arabic: "إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", transliteration: "Iz awal fityatu ilal kahfi faqaaloo Rabbanaaa aatinaa mil ladunka rahmatanw wa haiyi' lanaa min amrinaa rashadaa", english: "Mention when the youths retreated to the cave and said, Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance", bengali: "স্মরণ কর, যখন যুবকরা গুহায় আশ্রয় নিল এবং বলল, হে আমাদের প্রভু! আমাদের তোমার পক্ষ থেকে রহমত দান কর এবং আমাদের কাজ সঠিকভাবে পরিচালিত কর", audioUrl: getVerseAudioUrl(18, 10) },
      { number: 109, arabic: "قُل لَّوْ كَانَ الْبَحْرُ مِدَادًا لِّكَلِمَاتِ رَبِّي لَنَفِدَ الْبَحْرُ قَبْلَ أَن تَنفَدَ كَلِمَاتُ رَبِّي وَلَوْ جِئْنَا بِمِثْلِهِ مَدَدًا", transliteration: "Qul law kaanal bahru midaadal li Kalimaati Rabbee lanafidal bahru qabla an tanfada Kalimaatu Rabbee wa law ji'naa bimislihee madadaa", english: "Say, If the sea were ink for the words of my Lord, the sea would be exhausted before the words of my Lord were exhausted, even if We brought the like of it as a supplement", bengali: "বল, আমার প্রভুর বাণী লেখার জন্য সমুদ্র যদি কালি হত, তাহলে আমার প্রভুর বাণী শেষ হওয়ার আগে সমুদ্র নিঃশেষ হয়ে যেত, এমনকি এর সমপরিমাণ আরও কালি আনা হলেও", audioUrl: getVerseAudioUrl(18, 109) },
      { number: 110, arabic: "قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا", transliteration: "Qul innamaaa ana basharum mislukum yoohaaa ilaiya annamaa ilaahukum Ilaahunw Waahid, faman kaana yarjoo liqaaa'a Rabbihee falya'mal 'amalan saalihaw wa laa yushrik bi'ibaadati Rabbiheee ahadaa", english: "Say, I am only a man like you, to whom has been revealed that your god is one God. So whoever would hope for the meeting with his Lord - let him do righteous work and not associate in the worship of his Lord anyone", bengali: "বল, আমি তোমাদের মতই একজন মানুষ। আমার কাছে ওহী আসে যে, তোমাদের উপাস্য একমাত্র উপাস্য। সুতরাং যে তার প্রভুর সাক্ষাৎ কামনা করে, সে যেন সৎকর্ম করে এবং তার প্রভুর ইবাদতে কাউকে শরীক না করে", audioUrl: getVerseAudioUrl(18, 110) }
    ]
  },
  {
    surahNumber: 19,
    verses: [
      { number: 1, arabic: "كهيعص", transliteration: "Kaaf-Haa-Yaa-'Ain-Saad", english: "Kaf, Ha, Ya, 'Ain, Sad", bengali: "কাফ হা ইয়া আইন সাদ", audioUrl: getVerseAudioUrl(19, 1) },
      { number: 2, arabic: "ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا", transliteration: "Zikru rahmati Rabbika 'abdahoo Zakariyyaa", english: "This is a mention of the mercy of your Lord to His servant Zechariah", bengali: "এটা তোমার প্রভুর অনুগ্রহের উল্লেখ তাঁর বান্দা যাকারিয়ার প্রতি", audioUrl: getVerseAudioUrl(19, 2) },
      { number: 3, arabic: "إِذْ نَادَىٰ رَبَّهُ نِدَاءً خَفِيًّا", transliteration: "Iz naadaa Rabbahoo nidaaa'an khafiyyaa", english: "When he called to his Lord a private supplication", bengali: "যখন সে তার প্রভুকে গোপনে ডাকল", audioUrl: getVerseAudioUrl(19, 3) },
      { number: 4, arabic: "قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا", transliteration: "Qaala Rabbi innee wahanal 'azmu minnee washta'alar ra'su shaybaa, wa lam akun bidu'aaa'ika Rabbi shaqiyyaa", english: "He said, My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy", bengali: "সে বলল, হে আমার প্রভু! আমার হাড় দুর্বল হয়ে গেছে এবং আমার মাথা পাকা চুলে ভরে গেছে। এবং হে আমার প্রভু! তোমাকে ডেকে আমি কখনও ব্যর্থ হইনি", audioUrl: getVerseAudioUrl(19, 4) },
      { number: 5, arabic: "وَإِنِّي خِفْتُ الْمَوَالِيَ مِن وَرَائِي وَكَانَتِ امْرَأَتِي عَاقِرًا فَهَبْ لِي مِن لَّدُنكَ وَلِيًّا", transliteration: "Wa innee khiftul mawaaliya minw waraaa'ee wa kaanatim ra'atee 'aaqiran fahab lee mil ladunka waliyyaa", english: "And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir", bengali: "এবং আমি আমার পরে আত্মীয়দের ব্যাপারে আশঙ্কিত এবং আমার স্ত্রী বন্ধ্যা। সুতরাং তোমার পক্ষ থেকে আমাকে এমন উত্তরাধিকারী দান কর", audioUrl: getVerseAudioUrl(19, 5) }
    ]
  },
  {
    surahNumber: 20,
    verses: [
      { number: 1, arabic: "طه", transliteration: "Taa-Haa", english: "Ta, Ha", bengali: "তা হা", audioUrl: getVerseAudioUrl(20, 1) },
      { number: 2, arabic: "مَا أَنزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَىٰ", transliteration: "Maaa anzalnaa 'alaikal Qur'aana litashqaa", english: "We have not sent down to you the Quran that you be distressed", bengali: "আমি তোমার উপর কুরআন অবতীর্ণ করিনি যাতে তুমি কষ্ট পাও", audioUrl: getVerseAudioUrl(20, 2) },
      { number: 3, arabic: "إِلَّا تَذْكِرَةً لِّمَن يَخْشَىٰ", transliteration: "Illaa tazkiratal limany yakhshaa", english: "But only as a reminder for those who fear Allah", bengali: "বরং যারা ভয় করে তাদের জন্য উপদেশ হিসেবে", audioUrl: getVerseAudioUrl(20, 3) },
      { number: 4, arabic: "تَنزِيلًا مِّمَّنْ خَلَقَ الْأَرْضَ وَالسَّمَاوَاتِ الْعُلَى", transliteration: "Tanzeelam mimman khalaqal arda wassamaawaatil 'ulaa", english: "A revelation from He who created the earth and highest heavens", bengali: "অবতীর্ণ তাঁর পক্ষ থেকে যিনি পৃথিবী ও সুউচ্চ আকাশমণ্ডলী সৃষ্টি করেছেন", audioUrl: getVerseAudioUrl(20, 4) },
      { number: 5, arabic: "الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَىٰ", transliteration: "Ar-Rahmaanu 'alal 'Arshis tawaa", english: "The Most Merciful who is above the Throne established", bengali: "পরম করুণাময় আরশে সমাসীন", audioUrl: getVerseAudioUrl(20, 5) }
    ]
  },
  {
    surahNumber: 21,
    verses: [
      { number: 1, arabic: "اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُّعْرِضُونَ", transliteration: "Iqtaraba linnaasi hisaabuhum wa hum fee ghaflatim mu'ridoon", english: "The time of their account has approached for the people, while they are in heedlessness turning away", bengali: "মানুষের হিসাবের সময় নিকটবর্তী হয়েছে অথচ তারা উদাসীনতায় মুখ ফিরিয়ে আছে", audioUrl: getVerseAudioUrl(21, 1) },
      { number: 2, arabic: "مَا يَأْتِيهِم مِّن ذِكْرٍ مِّن رَّبِّهِم مُّحْدَثٍ إِلَّا اسْتَمَعُوهُ وَهُمْ يَلْعَبُونَ", transliteration: "Maa ya'teehim min zikrim mir Rabbihim muhdasin illas tama'oohu wa hum yal'aboon", english: "No mention comes to them anew from their Lord except that they listen to it while they are at play", bengali: "তাদের প্রভুর পক্ষ থেকে কোন নতুন উপদেশ তাদের কাছে আসে না যা তারা খেলার ছলে শোনে", audioUrl: getVerseAudioUrl(21, 2) },
      { number: 3, arabic: "لَاهِيَةً قُلُوبُهُمْ ۗ وَأَسَرُّوا النَّجْوَى الَّذِينَ ظَلَمُوا هَلْ هَٰذَا إِلَّا بَشَرٌ مِّثْلُكُمْ", transliteration: "Laahiyatan quloobuhum, wa asarrun najwal lazeena zalamoo hal haazaaa illaa basharum mislukum", english: "With their hearts distracted. And those who do wrong conceal their private conversation, saying, Is this except a human being like you?", bengali: "তাদের অন্তর অমনোযোগী। আর যালিমরা গোপনে পরামর্শ করে বলে, এ তো তোমাদের মতই একজন মানুষ", audioUrl: getVerseAudioUrl(21, 3) },
      { number: 4, arabic: "قَالَ رَبِّي يَعْلَمُ الْقَوْلَ فِي السَّمَاءِ وَالْأَرْضِ ۖ وَهُوَ السَّمِيعُ الْعَلِيمُ", transliteration: "Qaala Rabbee ya'lamul qawla fis samaaa'i wal ardi wa Huwas Samee'ul 'Aleem", english: "He said, My Lord knows every word spoken in the heaven and earth. And He is the Hearing, the Knowing", bengali: "বলুন, আমার প্রভু আকাশ ও পৃথিবীর সকল কথা জানেন এবং তিনি সর্বশ্রোতা, সর্বজ্ঞ", audioUrl: getVerseAudioUrl(21, 4) },
      { number: 5, arabic: "بَلْ قَالُوا أَضْغَاثُ أَحْلَامٍ بَلِ افْتَرَاهُ بَلْ هُوَ شَاعِرٌ فَلْيَأْتِنَا بِآيَةٍ كَمَا أُرْسِلَ الْأَوَّلُونَ", transliteration: "Bal qaalooo adghaasu ahlaamim balif taraahu bal huwa shaa'irun falya'tinaa bi Aayatin kamaaa ursilal awwaloon", english: "But they say, These are confused dreams; rather, he has invented it; rather, he is a poet. So let him bring us a sign just as the previous messengers were sent", bengali: "বরং তারা বলে, এগুলো অলীক স্বপ্ন; বরং সে এটা বানিয়েছে; বরং সে একজন কবি। সুতরাং সে আমাদের কাছে কোন নিদর্শন নিয়ে আসুক যেমন পূর্ববর্তী রাসূলগণ প্রেরিত হয়েছিলেন", audioUrl: getVerseAudioUrl(21, 5) }
    ]
  },
  {
    surahNumber: 22,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ ۚ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ", transliteration: "Yaaa ayyuhan naasut taqoo Rabbakum inna zalzalatas Saa'ati shai'un 'azeem", english: "O mankind, fear your Lord. Indeed, the convulsion of the Hour is a terrible thing", bengali: "হে মানুষ! তোমরা তোমাদের প্রভুকে ভয় কর। নিশ্চয়ই কিয়ামতের প্রকম্পন এক ভয়ংকর বিষয়", audioUrl: getVerseAudioUrl(22, 1) },
      { number: 2, arabic: "يَوْمَ تَرَوْنَهَا تَذْهَلُ كُلُّ مُرْضِعَةٍ عَمَّا أَرْضَعَتْ وَتَضَعُ كُلُّ ذَاتِ حَمْلٍ حَمْلَهَا وَتَرَى النَّاسَ سُكَارَىٰ وَمَا هُم بِسُكَارَىٰ وَلَٰكِنَّ عَذَابَ اللَّهِ شَدِيدٌ", transliteration: "Yawma tarawnahaa tazhalu kullu murdi'atin 'ammaaa arda'at wa tada'u kullu zaati hamlin hamlahaa wa taran naasa sukaaraa wa maa hum bisukaaraa wa laakinna 'azaabal laahi shadeed", english: "On the Day you see it every nursing mother will be distracted from that child she was nursing, and every pregnant woman will abort her pregnancy, and you will see the people appearing intoxicated while they are not intoxicated; but the punishment of Allah is severe", bengali: "যেদিন তোমরা তা দেখবে সেদিন প্রত্যেক স্তন্যদাত্রী তার দুগ্ধপোষ্য শিশুকে ভুলে যাবে এবং প্রত্যেক গর্ভবতী তার গর্ভপাত করবে এবং তুমি মানুষকে মাতাল দেখবে অথচ তারা মাতাল নয়; বরং আল্লাহর শাস্তি কঠিন", audioUrl: getVerseAudioUrl(22, 2) },
      { number: 3, arabic: "وَمِنَ النَّاسِ مَن يُجَادِلُ فِي اللَّهِ بِغَيْرِ عِلْمٍ وَيَتَّبِعُ كُلَّ شَيْطَانٍ مَّرِيدٍ", transliteration: "Wa minan naasi many yujaadilu fil laahi bighairi 'ilminw wa yattabi'u kulla Shaitaanim mareed", english: "And of the people is he who disputes about Allah without knowledge and follows every rebellious devil", bengali: "এবং মানুষের মধ্যে কেউ কেউ জ্ঞান ছাড়াই আল্লাহ সম্পর্কে বিতর্ক করে এবং প্রত্যেক বিদ্রোহী শয়তানের অনুসরণ করে", audioUrl: getVerseAudioUrl(22, 3) },
      { number: 4, arabic: "كُتِبَ عَلَيْهِ أَنَّهُ مَن تَوَلَّاهُ فَأَنَّهُ يُضِلُّهُ وَيَهْدِيهِ إِلَىٰ عَذَابِ السَّعِيرِ", transliteration: "Kutiba 'alaihi annahoo man tawallaahu fa annahoo yudilluhoo wa yahdeehi ilaa 'azaabis sa'eer", english: "It has been decreed for every devil that whoever turns to him - he will misguide him and will lead him to the punishment of the Blaze", bengali: "তার জন্য লিখে দেওয়া হয়েছে যে, যে তার অনুসরণ করবে সে তাকে পথভ্রষ্ট করবে এবং তাকে জাহান্নামের শাস্তির দিকে নিয়ে যাবে", audioUrl: getVerseAudioUrl(22, 4) },
      { number: 5, arabic: "يَا أَيُّهَا النَّاسُ إِن كُنتُمْ فِي رَيْبٍ مِّنَ الْبَعْثِ فَإِنَّا خَلَقْنَاكُم مِّن تُرَابٍ ثُمَّ مِن نُّطْفَةٍ ثُمَّ مِنْ عَلَقَةٍ ثُمَّ مِن مُّضْغَةٍ", transliteration: "Yaaa ayyuhan naasu in kuntum fee raibim minal ba'si fa innaa khalaqnaakum min turaabin summa min nutfatin summa min 'alaqatin summa mim mudghatin", english: "O People, if you should be in doubt about the Resurrection, then consider that indeed, We created you from dust, then from a sperm-drop, then from a clinging clot, then from a lump of flesh", bengali: "হে মানুষ! যদি তোমরা পুনরুত্থান সম্পর্কে সন্দেহে থাক, তবে জেনে রাখ আমি তোমাদের মাটি থেকে সৃষ্টি করেছি, তারপর শুক্রবিন্দু থেকে, তারপর জমাট রক্ত থেকে, তারপর গোশতপিণ্ড থেকে", audioUrl: getVerseAudioUrl(22, 5) }
    ]
  },
  {
    surahNumber: 23,
    verses: [
      { number: 1, arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", transliteration: "Qad aflahal mu'minoon", english: "Certainly will the believers have succeeded", bengali: "অবশ্যই সফলকাম হয়েছে মুমিনগণ", audioUrl: getVerseAudioUrl(23, 1) },
      { number: 2, arabic: "الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ", transliteration: "Allazeena hum fee salaatihim khaashi'oon", english: "They who are during their prayer humbly submissive", bengali: "যারা তাদের নামাজে বিনয়ী", audioUrl: getVerseAudioUrl(23, 2) },
      { number: 3, arabic: "وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ", transliteration: "Wallazeena hum 'anil laghwi mu'ridoon", english: "And they who turn away from ill speech", bengali: "এবং যারা অনর্থক কথা-কাজ থেকে বিরত থাকে", audioUrl: getVerseAudioUrl(23, 3) },
      { number: 4, arabic: "وَالَّذِينَ هُمْ لِلزَّكَاةِ فَاعِلُونَ", transliteration: "Wallazeena hum liz Zakaati faa'iloon", english: "And they who are observant of zakah", bengali: "এবং যারা যাকাত প্রদান করে", audioUrl: getVerseAudioUrl(23, 4) },
      { number: 5, arabic: "وَالَّذِينَ هُمْ لِفُرُوجِهِمْ حَافِظُونَ", transliteration: "Wallazeena hum lifuroojihim haafizoon", english: "And they who guard their private parts", bengali: "এবং যারা তাদের লজ্জাস্থান হেফাজত করে", audioUrl: getVerseAudioUrl(23, 5) }
    ]
  },
  {
    surahNumber: 24,
    verses: [
      { number: 1, arabic: "سُورَةٌ أَنزَلْنَاهَا وَفَرَضْنَاهَا وَأَنزَلْنَا فِيهَا آيَاتٍ بَيِّنَاتٍ لَّعَلَّكُمْ تَذَكَّرُونَ", transliteration: "Sooratun anzalnaahaa wa faradnaahaa wa anzalnaa feehaaa Aayaatim baiyinaatil la'allakum tazakkaroon", english: "This is a surah which We have sent down and made obligatory and revealed therein verses of clear evidence that you might remember", bengali: "এটি একটি সূরা যা আমি অবতীর্ণ করেছি এবং ফরজ করেছি এবং এতে স্পষ্ট আয়াত অবতীর্ণ করেছি যাতে তোমরা উপদেশ গ্রহণ কর", audioUrl: getVerseAudioUrl(24, 1) },
      { number: 2, arabic: "الزَّانِيَةُ وَالزَّانِي فَاجْلِدُوا كُلَّ وَاحِدٍ مِّنْهُمَا مِائَةَ جَلْدَةٍ", transliteration: "Az zaaniyatu waz zaanee fajlidoo kulla waahidim minhumaa mi'ata jaldah", english: "The woman or man found guilty of sexual misconduct - lash each one of them with a hundred lashes", bengali: "ব্যভিচারিণী ও ব্যভিচারী - তাদের প্রত্যেককে একশত বেত্রাঘাত কর", audioUrl: getVerseAudioUrl(24, 2) },
      { number: 3, arabic: "الزَّانِي لَا يَنكِحُ إِلَّا زَانِيَةً أَوْ مُشْرِكَةً وَالزَّانِيَةُ لَا يَنكِحُهَا إِلَّا زَانٍ أَوْ مُشْرِكٌ ۚ وَحُرِّمَ ذَٰلِكَ عَلَى الْمُؤْمِنِينَ", transliteration: "Az zaanee laa yankihu illaa zaaniyatan aw mushrikatanw waz zaaniyatu laa yankihuhaaa illaa zaanin aw mushrik, wa hurrima zaalika 'alal mu'mineen", english: "The fornicator does not marry except a fornicatress or polytheist, and none marries her except a fornicator or a polytheist, and that has been made unlawful to the believers", bengali: "ব্যভিচারী কেবল ব্যভিচারিণী অথবা মুশরিক নারীকে বিয়ে করে এবং ব্যভিচারিণীকে কেবল ব্যভিচারী অথবা মুশরিক বিয়ে করে; মুমিনদের জন্য এটা হারাম করা হয়েছে", audioUrl: getVerseAudioUrl(24, 3) },
      { number: 4, arabic: "وَالَّذِينَ يَرْمُونَ الْمُحْصَنَاتِ ثُمَّ لَمْ يَأْتُوا بِأَرْبَعَةِ شُهَدَاءَ فَاجْلِدُوهُمْ ثَمَانِينَ جَلْدَةً وَلَا تَقْبَلُوا لَهُمْ شَهَادَةً أَبَدًا", transliteration: "Wallazeena yarmoonal muhsanaati summa lam ya'too bi arba'ati shuhadaaa'a fajlidoohum samaaneena jaldatanw wa laa taqbaloo lahum shahaadatan abadaa", english: "And those who accuse chaste women and then do not produce four witnesses - lash them with eighty lashes and do not accept from them testimony ever after", bengali: "এবং যারা সতী-সাধ্বী নারীর প্রতি অপবাদ আরোপ করে, অতঃপর চারজন সাক্ষী উপস্থিত করে না, তাদেরকে আশিটি বেত্রাঘাত কর এবং তাদের সাক্ষ্য কখনো গ্রহণ করো না", audioUrl: getVerseAudioUrl(24, 4) },
      { number: 5, arabic: "إِلَّا الَّذِينَ تَابُوا مِن بَعْدِ ذَٰلِكَ وَأَصْلَحُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", transliteration: "Illal lazeena taaboo mim ba'di zaalika wa aslahoo fa innal laaha Ghafoorur Raheem", english: "Except for those who repent thereafter and reform, for indeed, Allah is Forgiving and Merciful", bengali: "তবে যারা এরপর তওবা করে এবং সংশোধন হয়, তাহলে নিশ্চয়ই আল্লাহ ক্ষমাশীল, পরম দয়ালু", audioUrl: getVerseAudioUrl(24, 5) }
    ]
  },
  {
    surahNumber: 25,
    verses: [
      { number: 1, arabic: "تَبَارَكَ الَّذِي نَزَّلَ الْفُرْقَانَ عَلَىٰ عَبْدِهِ لِيَكُونَ لِلْعَالَمِينَ نَذِيرًا", transliteration: "Tabaarakal lazee nazzalal Furqaana 'alaa 'abdihee li yakoona lil'aalameena nazeeraa", english: "Blessed is He who sent down the Criterion upon His Servant that he may be to the worlds a warner", bengali: "বরকতময় তিনি যিনি তাঁর বান্দার উপর ফুরকান অবতীর্ণ করেছেন যাতে সে বিশ্বজগতের জন্য সতর্ককারী হয়", audioUrl: getVerseAudioUrl(25, 1) },
      { number: 2, arabic: "الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَلَمْ يَتَّخِذْ وَلَدًا وَلَمْ يَكُن لَّهُ شَرِيكٌ فِي الْمُلْكِ وَخَلَقَ كُلَّ شَيْءٍ فَقَدَّرَهُ تَقْدِيرًا", transliteration: "Allazee lahoo mulkus samaawaati wal ardi wa lam yattakhiz waladanw wa lam yakul lahoo shareekun fil mulki wa khalaqa kulla shai'in faqaddarahoo taqdeeraa", english: "He to whom belongs the dominion of the heavens and the earth and who has not taken a son and has not had a partner in dominion and has created each thing and determined it with precise determination", bengali: "তিনি যাঁর রয়েছে আকাশমণ্ডলী ও পৃথিবীর সার্বভৌমত্ব এবং তিনি কোন সন্তান গ্রহণ করেননি এবং তাঁর রাজত্বে কোন শরীক নেই এবং তিনি সব কিছু সৃষ্টি করেছেন এবং তাকে যথাযথভাবে নির্ধারণ করেছেন", audioUrl: getVerseAudioUrl(25, 2) },
      { number: 3, arabic: "وَاتَّخَذُوا مِن دُونِهِ آلِهَةً لَّا يَخْلُقُونَ شَيْئًا وَهُمْ يُخْلَقُونَ وَلَا يَمْلِكُونَ لِأَنفُسِهِمْ ضَرًّا وَلَا نَفْعًا وَلَا يَمْلِكُونَ مَوْتًا وَلَا حَيَاةً وَلَا نُشُورًا", transliteration: "Wattakhazoo min dooniheee aalihatal laa yakhluqoona shai'anw wa hum yukhlaqoona wa laa yamlikoona li anfusihim darranw wa laa naf'anw wa laa yamlikoona mawtanw wa laa hayaatanw wa laa nushooraa", english: "But they have taken besides Him gods which create nothing, while they are created, and possess not for themselves any harm or benefit and possess not power to cause death or life or resurrection", bengali: "তারা তাঁকে ছেড়ে এমন উপাস্য গ্রহণ করেছে যারা কিছুই সৃষ্টি করে না, বরং তারা নিজেরাই সৃষ্ট এবং তারা নিজেদের জন্য কোন ক্ষতি বা উপকারের মালিক নয় এবং তারা মৃত্যু, জীবন বা পুনরুত্থানের মালিক নয়", audioUrl: getVerseAudioUrl(25, 3) },
      { number: 4, arabic: "وَقَالَ الَّذِينَ كَفَرُوا إِنْ هَٰذَا إِلَّا إِفْكٌ افْتَرَاهُ وَأَعَانَهُ عَلَيْهِ قَوْمٌ آخَرُونَ", transliteration: "Wa qaalal lazeena kafarooo in haazaaa illaaa ifkunif taraahu wa a'aanahoo 'alaihi qawmun aakharoon", english: "And those who disbelieve say, This Quran is not but a falsehood he invented, and another people assisted him in it", bengali: "এবং কাফিররা বলে, এটা মিথ্যা ছাড়া কিছু নয় যা সে বানিয়েছে এবং অন্য লোকেরা তাকে সাহায্য করেছে", audioUrl: getVerseAudioUrl(25, 4) },
      { number: 5, arabic: "فَقَدْ جَاءُوا ظُلْمًا وَزُورًا", transliteration: "Faqad jaaa'oo zulmanw wa zooraa", english: "And they have produced an injustice and a lie", bengali: "তারা তো জুলুম ও মিথ্যা নিয়ে এসেছে", audioUrl: getVerseAudioUrl(25, 5) }
    ]
  },
  {
    surahNumber: 26,
    verses: [
      { number: 1, arabic: "طسم", transliteration: "Taa-Seen-Meem", english: "Ta, Seen, Meem", bengali: "তা সীন মীম", audioUrl: getVerseAudioUrl(26, 1) },
      { number: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ", transliteration: "Tilka Aayaatul Kitaabil Mubeen", english: "These are the verses of the clear Book", bengali: "এগুলো সুস্পষ্ট কিতাবের আয়াত", audioUrl: getVerseAudioUrl(26, 2) },
      { number: 3, arabic: "لَعَلَّكَ بَاخِعٌ نَّفْسَكَ أَلَّا يَكُونُوا مُؤْمِنِينَ", transliteration: "La'allaka baakhi'un nafsaka allaa yakoonoo mu'mineen", english: "Perhaps you would kill yourself with grief that they will not be believers", bengali: "সম্ভবত তুমি তোমার প্রাণ বিনাশ করবে এই দুঃখে যে তারা মুমিন হচ্ছে না", audioUrl: getVerseAudioUrl(26, 3) },
      { number: 4, arabic: "إِن نَّشَأْ نُنَزِّلْ عَلَيْهِم مِّنَ السَّمَاءِ آيَةً فَظَلَّتْ أَعْنَاقُهُمْ لَهَا خَاضِعِينَ", transliteration: "In nashaa nunazzil 'alaihim minas samaaa'i Aayatan fazallat a'naaquhum lahaa khaadi'een", english: "If We willed, We could send down to them from the sky a sign for which their necks would remain humbled", bengali: "যদি আমি চাই তাহলে আকাশ থেকে তাদের উপর এমন নিদর্শন নাযিল করতে পারি যার সামনে তাদের ঘাড় নত হয়ে যাবে", audioUrl: getVerseAudioUrl(26, 4) },
      { number: 5, arabic: "وَمَا يَأْتِيهِم مِّن ذِكْرٍ مِّنَ الرَّحْمَٰنِ مُحْدَثٍ إِلَّا كَانُوا عَنْهُ مُعْرِضِينَ", transliteration: "Wa maa ya'teehim min zikrim minar Rahmaani muhdasin illaa kaanoo 'anhu mu'rideen", english: "And no revelation comes to them anew from the Most Merciful except that they turn away from it", bengali: "রহমানের পক্ষ থেকে কোন নতুন উপদেশ তাদের কাছে আসে না যা থেকে তারা মুখ ফিরিয়ে নেয় না", audioUrl: getVerseAudioUrl(26, 5) }
    ]
  },
  {
    surahNumber: 27,
    verses: [
      { number: 1, arabic: "طس ۚ تِلْكَ آيَاتُ الْقُرْآنِ وَكِتَابٍ مُّبِينٍ", transliteration: "Taa Seeen, tilka Aayaatul Qur'aani wa Kitaabim Mubeen", english: "Ta, Seen. These are the verses of the Quran and a clear Book", bengali: "তা সীন। এগুলো কুরআন ও স্পষ্ট কিতাবের আয়াত", audioUrl: getVerseAudioUrl(27, 1) },
      { number: 2, arabic: "هُدًى وَبُشْرَىٰ لِلْمُؤْمِنِينَ", transliteration: "Hudanw wa bushraa lilmu'mineen", english: "As guidance and good tidings for the believers", bengali: "মুমিনদের জন্য পথনির্দেশ ও সুসংবাদ", audioUrl: getVerseAudioUrl(27, 2) },
      { number: 3, arabic: "الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُم بِالْآخِرَةِ هُمْ يُوقِنُونَ", transliteration: "Allazeena yuqeemoonas Salaata wa yu'toonaz Zakaata wa hum bil Aakhirati hum yooqinoon", english: "Who establish prayer and give zakah, and of the Hereafter they are certain in faith", bengali: "যারা নামাজ কায়েম করে ও যাকাত দেয় এবং তারা আখিরাতে দৃঢ় বিশ্বাস রাখে", audioUrl: getVerseAudioUrl(27, 3) },
      { number: 4, arabic: "إِنَّ الَّذِينَ لَا يُؤْمِنُونَ بِالْآخِرَةِ زَيَّنَّا لَهُمْ أَعْمَالَهُمْ فَهُمْ يَعْمَهُونَ", transliteration: "Innal lazeena laa yu'minoona bil Aakhirati zaiyannaa lahum a'maalahum fahum ya'mahoon", english: "Indeed, for those who do not believe in the Hereafter, We have made pleasing to them their deeds, so they wander blindly", bengali: "নিশ্চয়ই যারা আখিরাতে বিশ্বাস করে না, আমি তাদের কাজকে তাদের কাছে সুশোভিত করে দিয়েছি, তাই তারা উদভ্রান্ত হয়ে ঘুরে বেড়ায়", audioUrl: getVerseAudioUrl(27, 4) },
      { number: 5, arabic: "أُولَٰئِكَ الَّذِينَ لَهُمْ سُوءُ الْعَذَابِ وَهُمْ فِي الْآخِرَةِ هُمُ الْأَخْسَرُونَ", transliteration: "Ulaaa'ikal lazeena lahum sooo'ul 'azaabi wa hum fil Aakhirati humul akhsaroon", english: "Those are the ones for whom there will be the worst of punishment, and in the Hereafter they are the greatest losers", bengali: "তারাই সেই লোক যাদের জন্য রয়েছে কঠিন শাস্তি এবং আখিরাতে তারাই সবচেয়ে বেশি ক্ষতিগ্রস্ত", audioUrl: getVerseAudioUrl(27, 5) }
    ]
  },
  {
    surahNumber: 28,
    verses: [
      { number: 1, arabic: "طسم", transliteration: "Taa-Seen-Meem", english: "Ta, Seen, Meem", bengali: "তা সীন মীম", audioUrl: getVerseAudioUrl(28, 1) },
      { number: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ", transliteration: "Tilka Aayaatul Kitaabil Mubeen", english: "These are the verses of the clear Book", bengali: "এগুলো সুস্পষ্ট কিতাবের আয়াত", audioUrl: getVerseAudioUrl(28, 2) },
      { number: 3, arabic: "نَتْلُو عَلَيْكَ مِن نَّبَإِ مُوسَىٰ وَفِرْعَوْنَ بِالْحَقِّ لِقَوْمٍ يُؤْمِنُونَ", transliteration: "Natloo 'alaika min naba'i Moosaa wa Fir'awna bilhaqqi liqawminy yu'minoon", english: "We recite to you from the news of Moses and Pharaoh in truth for a people who believe", bengali: "আমি তোমার কাছে মূসা ও ফিরাউনের সংবাদ সত্যসহ বর্ণনা করছি সেই সম্প্রদায়ের জন্য যারা বিশ্বাস করে", audioUrl: getVerseAudioUrl(28, 3) },
      { number: 4, arabic: "إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ وَجَعَلَ أَهْلَهَا شِيَعًا يَسْتَضْعِفُ طَائِفَةً مِّنْهُمْ يُذَبِّحُ أَبْنَاءَهُمْ وَيَسْتَحْيِي نِسَاءَهُمْ ۚ إِنَّهُ كَانَ مِنَ الْمُفْسِدِينَ", transliteration: "Inna Fir'awna 'alaa fil ardi wa ja'ala ahlahaa shiya'any yastad'ifu taaa'ifatam minhum yuzabbihu abnaaa'ahum wa yastahyee nisaaa'ahum, innahoo kaana minal mufsideen", english: "Indeed, Pharaoh exalted himself in the land and made its people into factions, oppressing a sector among them, slaughtering their newborn sons and keeping their females alive. Indeed, he was of the corrupters", bengali: "নিশ্চয়ই ফিরাউন পৃথিবীতে ঔদ্ধত্য করেছিল এবং তার অধিবাসীদের বিভিন্ন দলে বিভক্ত করেছিল। তাদের একটি দলকে সে দুর্বল করে রাখত, তাদের পুত্রদের হত্যা করত এবং তাদের নারীদের জীবিত রাখত। নিশ্চয়ই সে ছিল বিপর্যয় সৃষ্টিকারীদের অন্তর্ভুক্ত", audioUrl: getVerseAudioUrl(28, 4) },
      { number: 5, arabic: "وَنُرِيدُ أَن نَّمُنَّ عَلَى الَّذِينَ اسْتُضْعِفُوا فِي الْأَرْضِ وَنَجْعَلَهُمْ أَئِمَّةً وَنَجْعَلَهُمُ الْوَارِثِينَ", transliteration: "Wa nureedu an namunna 'alal lazeenas tud'ifoo fil ardi wa naj'alahum a'immatanw wa naj'alahumul waariseen", english: "And We wanted to confer favor upon those who were oppressed in the land and make them leaders and make them inheritors", bengali: "এবং আমি চেয়েছিলাম পৃথিবীতে যাদের দুর্বল করে রাখা হয়েছিল তাদের প্রতি অনুগ্রহ করতে এবং তাদের নেতা বানাতে এবং তাদের উত্তরাধিকারী করতে", audioUrl: getVerseAudioUrl(28, 5) }
    ]
  },
  {
    surahNumber: 29,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(29, 1) },
      { number: 2, arabic: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ", transliteration: "Ahasiban naasu any yutrakoo any yaqooloo aamannaa wa hum laa yuftanoon", english: "Do the people think that they will be left to say, We believe and they will not be tried?", bengali: "মানুষ কি মনে করে যে, 'আমরা বিশ্বাস করলাম' বললেই তাদের ছেড়ে দেওয়া হবে এবং তাদের পরীক্ষা করা হবে না?", audioUrl: getVerseAudioUrl(29, 2) },
      { number: 3, arabic: "وَلَقَدْ فَتَنَّا الَّذِينَ مِن قَبْلِهِمْ ۖ فَلَيَعْلَمَنَّ اللَّهُ الَّذِينَ صَدَقُوا وَلَيَعْلَمَنَّ الْكَاذِبِينَ", transliteration: "Wa laqad fatannal lazeena min qablihim falaya'lamannal laahul lazeena sadaqoo wa laya'lamannal kaazibeen", english: "And We certainly tried those before them. And Allah will surely make evident those who are truthful, and He will surely make evident the liars", bengali: "আমি তাদের পূর্ববর্তীদেরও পরীক্ষা করেছি। আল্লাহ অবশ্যই জেনে নেবেন কারা সত্যবাদী এবং অবশ্যই জেনে নেবেন কারা মিথ্যাবাদী", audioUrl: getVerseAudioUrl(29, 3) },
      { number: 4, arabic: "أَمْ حَسِبَ الَّذِينَ يَعْمَلُونَ السَّيِّئَاتِ أَن يَسْبِقُونَا ۚ سَاءَ مَا يَحْكُمُونَ", transliteration: "Am hasibal lazeena ya'maloonas sayyi aati any yasbiqoonaa, saaa'a maa yahkumoon", english: "Or do those who do evil deeds think they can outrun Us? Evil is what they judge", bengali: "যারা মন্দ কাজ করে তারা কি মনে করে যে তারা আমাদের হাত থেকে বেঁচে যাবে? তাদের ধারণা কতই না মন্দ", audioUrl: getVerseAudioUrl(29, 4) },
      { number: 5, arabic: "مَن كَانَ يَرْجُو لِقَاءَ اللَّهِ فَإِنَّ أَجَلَ اللَّهِ لَآتٍ ۚ وَهُوَ السَّمِيعُ الْعَلِيمُ", transliteration: "Man kaana yarjoo liqaaa'al laahi fa inna ajalal laahi la aat, wa Huwas Samee'ul 'Aleem", english: "Whoever should hope for the meeting with Allah - indeed, the term decreed by Allah is coming. And He is the Hearing, the Knowing", bengali: "যে ব্যক্তি আল্লাহর সাক্ষাতের আশা করে, নিশ্চয়ই আল্লাহর নির্ধারিত সময় আসবেই। এবং তিনি সর্বশ্রোতা, সর্বজ্ঞ", audioUrl: getVerseAudioUrl(29, 5) }
    ]
  },
  {
    surahNumber: 30,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(30, 1) },
      { number: 2, arabic: "غُلِبَتِ الرُّومُ", transliteration: "Ghulibatir Room", english: "The Romans have been defeated", bengali: "রোমানরা পরাজিত হয়েছে", audioUrl: getVerseAudioUrl(30, 2) },
      { number: 3, arabic: "فِي أَدْنَى الْأَرْضِ وَهُم مِّن بَعْدِ غَلَبِهِمْ سَيَغْلِبُونَ", transliteration: "Feee adnal ardi wa hum mim ba'di ghalabihim sa yaghliboon", english: "In the nearest land. But they, after their defeat, will overcome", bengali: "নিকটবর্তী ভূমিতে। কিন্তু তারা তাদের পরাজয়ের পর বিজয়ী হবে", audioUrl: getVerseAudioUrl(30, 3) },
      { number: 4, arabic: "فِي بِضْعِ سِنِينَ ۗ لِلَّهِ الْأَمْرُ مِن قَبْلُ وَمِن بَعْدُ ۚ وَيَوْمَئِذٍ يَفْرَحُ الْمُؤْمِنُونَ", transliteration: "Fee bid'i sineen, lillaahil amru min qablu wa mim ba'd, wa Yawma'iziny yafrahul mu'minoon", english: "Within a few years. To Allah belongs the command before and after. And that day the believers will rejoice", bengali: "কয়েক বছরের মধ্যে। আগে ও পরে সকল বিষয় আল্লাহর হাতে। সেদিন মুমিনরা আনন্দিত হবে", audioUrl: getVerseAudioUrl(30, 4) },
      { number: 5, arabic: "بِنَصْرِ اللَّهِ ۚ يَنصُرُ مَن يَشَاءُ ۖ وَهُوَ الْعَزِيزُ الرَّحِيمُ", transliteration: "Binasril laah, yansuru many yashaaa', wa Huwal 'Azeezur Raheem", english: "In the victory of Allah. He gives victory to whom He wills, and He is the Exalted in Might, the Merciful", bengali: "আল্লাহর সাহায্যে। তিনি যাকে ইচ্ছা সাহায্য করেন এবং তিনি পরাক্রমশালী, পরম দয়ালু", audioUrl: getVerseAudioUrl(30, 5) }
    ]
  },
  {
    surahNumber: 31,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(31, 1) },
      { number: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ", transliteration: "Tilka Aayaatul Kitaabil Hakeem", english: "These are verses of the wise Book", bengali: "এগুলো হিকমতপূর্ণ কিতাবের আয়াত", audioUrl: getVerseAudioUrl(31, 2) },
      { number: 3, arabic: "هُدًى وَرَحْمَةً لِّلْمُحْسِنِينَ", transliteration: "Hudanw wa rahmatal lilmuhsineen", english: "As guidance and mercy for the doers of good", bengali: "সৎকর্মশীলদের জন্য পথনির্দেশ ও রহমত", audioUrl: getVerseAudioUrl(31, 3) },
      { number: 4, arabic: "الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُم بِالْآخِرَةِ هُمْ يُوقِنُونَ", transliteration: "Allazeena yuqeemoonas Salaata wa yu'toonaz Zakaata wa hum bil Aakhirati hum yooqinoon", english: "Who establish prayer and give zakah, and they are certain of the Hereafter", bengali: "যারা নামাজ কায়েম করে, যাকাত দেয় এবং তারা আখিরাতে দৃঢ় বিশ্বাস রাখে", audioUrl: getVerseAudioUrl(31, 4) },
      { number: 5, arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", transliteration: "Ulaaa'ika 'alaa hudam mir Rabbihim wa ulaaa'ika humul muflihoon", english: "Those are on right guidance from their Lord, and it is those who are the successful", bengali: "তারাই তাদের প্রভুর পক্ষ থেকে সৎপথে আছে এবং তারাই সফলকাম", audioUrl: getVerseAudioUrl(31, 5) }
    ]
  },
  {
    surahNumber: 32,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(32, 1) },
      { number: 2, arabic: "تَنزِيلُ الْكِتَابِ لَا رَيْبَ فِيهِ مِن رَّبِّ الْعَالَمِينَ", transliteration: "Tanzeelul Kitaabi laa raiba feehi mir Rabbil 'aalameen", english: "The revelation of the Book about which there is no doubt is from the Lord of the worlds", bengali: "এই কিতাবের অবতরণ বিশ্বজগতের প্রভুর পক্ষ থেকে, এতে কোন সন্দেহ নেই", audioUrl: getVerseAudioUrl(32, 2) },
      { number: 3, arabic: "أَمْ يَقُولُونَ افْتَرَاهُ ۚ بَلْ هُوَ الْحَقُّ مِن رَّبِّكَ لِتُنذِرَ قَوْمًا مَّا أَتَاهُم مِّن نَّذِيرٍ مِّن قَبْلِكَ لَعَلَّهُمْ يَهْتَدُونَ", transliteration: "Am yaqooloonaf taraah, bal huwal haqqu mir Rabbika litunzira qawmam maaa ataahum min nazeerim min qablika la'allahum yahtadoon", english: "Or do they say, He invented it? Rather, it is the truth from your Lord, that you may warn a people to whom no warner has come before you that they might be guided", bengali: "তারা কি বলে যে, সে এটা বানিয়েছে? বরং এটা তোমার প্রভুর পক্ষ থেকে সত্য, যাতে তুমি এমন এক জাতিকে সতর্ক কর যাদের কাছে তোমার আগে কোন সতর্ককারী আসেনি, যাতে তারা সৎপথ পায়", audioUrl: getVerseAudioUrl(32, 3) }
    ]
  },
  {
    surahNumber: 33,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا النَّبِيُّ اتَّقِ اللَّهَ وَلَا تُطِعِ الْكَافِرِينَ وَالْمُنَافِقِينَ ۗ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا", transliteration: "Yaaa ayyuhan Nabiyyut taqil laaha wa laa tuti'il kaafireena walmunaa fiqeen; innal laaha kaana 'Aleeman Hakeemaa", english: "O Prophet, fear Allah and do not obey the disbelievers and the hypocrites. Indeed, Allah is ever Knowing and Wise", bengali: "হে নবী! আল্লাহকে ভয় কর এবং কাফির ও মুনাফিকদের আনুগত্য করো না। নিশ্চয়ই আল্লাহ সর্বজ্ঞ, প্রজ্ঞাময়", audioUrl: getVerseAudioUrl(33, 1) },
      { number: 2, arabic: "وَاتَّبِعْ مَا يُوحَىٰ إِلَيْكَ مِن رَّبِّكَ ۚ إِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا", transliteration: "Wattabi' maa yoohaaa ilaika mir Rabbik; innal laaha kaana bimaa ta'maloona Khabeeraa", english: "And follow that which is revealed to you from your Lord. Indeed Allah is ever, with what you do, Acquainted", bengali: "এবং তোমার প্রভুর পক্ষ থেকে তোমার প্রতি যা অবতীর্ণ হয় তার অনুসরণ কর। তোমরা যা কর আল্লাহ সে সম্পর্কে সম্যক অবগত", audioUrl: getVerseAudioUrl(33, 2) },
      { number: 3, arabic: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا", transliteration: "Wa tawakkal 'alal laah; wa kafaa billaahi Wakeelaa", english: "And rely upon Allah; and sufficient is Allah as Disposer of affairs", bengali: "এবং আল্লাহর উপর ভরসা কর। কার্যনির্বাহী হিসেবে আল্লাহই যথেষ্ট", audioUrl: getVerseAudioUrl(33, 3) },
      { number: 4, arabic: "مَّا جَعَلَ اللَّهُ لِرَجُلٍ مِّن قَلْبَيْنِ فِي جَوْفِهِ", transliteration: "Maa ja'alal laahu lirajulim min qalbaini fee jawfih", english: "Allah has not made for a man two hearts in his interior", bengali: "আল্লাহ কোন মানুষের অভ্যন্তরে দুটি হৃদয় সৃষ্টি করেননি", audioUrl: getVerseAudioUrl(33, 4) },
      { number: 5, arabic: "ادْعُوهُمْ لِآبَائِهِمْ هُوَ أَقْسَطُ عِندَ اللَّهِ ۚ فَإِن لَّمْ تَعْلَمُوا آبَاءَهُمْ فَإِخْوَانُكُمْ فِي الدِّينِ وَمَوَالِيكُمْ", transliteration: "Ud'oohum li aabaaa'ihim huwa aqsatu 'indal laah; fa il lam ta'lamooo aabaaa'ahum fa ikhwaanukum fid deeni wa mawaaleekum", english: "Call them by the names of their fathers; it is more just in the sight of Allah. But if you do not know their fathers - then they are still your brothers in religion and those entrusted to you", bengali: "তাদেরকে তাদের পিতৃপরিচয়ে ডাক, এটাই আল্লাহর কাছে অধিক ন্যায়সঙ্গত। যদি তাদের পিতাদের না জান, তবে তারা তোমাদের দ্বীনি ভাই ও বন্ধু", audioUrl: getVerseAudioUrl(33, 5) }
    ]
  },
  {
    surahNumber: 34,
    verses: [
      { number: 1, arabic: "الْحَمْدُ لِلَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَلَهُ الْحَمْدُ فِي الْآخِرَةِ ۚ وَهُوَ الْحَكِيمُ الْخَبِيرُ", transliteration: "Alhamdu lillaahil lazee lahoo maa fis samaawaati wa maa fil ardi wa lahul hamdu fil Aakhirah; wa Huwal Hakeemul Khabeer", english: "All praise is due to Allah, to whom belongs whatever is in the heavens and whatever is in the earth, and to Him belongs all praise in the Hereafter. And He is the Wise, the Acquainted", bengali: "সমস্ত প্রশংসা আল্লাহর, আকাশ ও পৃথিবীতে যা কিছু আছে সব তাঁরই এবং আখিরাতেও সমস্ত প্রশংসা তাঁরই। তিনি প্রজ্ঞাময়, সর্ববিষয়ে অবহিত", audioUrl: getVerseAudioUrl(34, 1) },
      { number: 2, arabic: "يَعْلَمُ مَا يَلِجُ فِي الْأَرْضِ وَمَا يَخْرُجُ مِنْهَا وَمَا يَنزِلُ مِنَ السَّمَاءِ وَمَا يَعْرُجُ فِيهَا ۚ وَهُوَ الرَّحِيمُ الْغَفُورُ", transliteration: "Ya'lamu maa yaliju fil ardi wa maa yakhruju minhaa wa maa yanzilu minas samaaa'i wa maa ya'ruju feehaa; wa Huwar Raheemul Ghafoor", english: "He knows what penetrates into the earth and what emerges from it and what descends from the heaven and what ascends therein. And He is the Merciful, the Forgiving", bengali: "তিনি জানেন যা ভূমিতে প্রবেশ করে ও যা তা থেকে বের হয়, যা আকাশ থেকে অবতীর্ণ হয় ও যা তাতে উত্থিত হয়। তিনি পরম দয়ালু, ক্ষমাশীল", audioUrl: getVerseAudioUrl(34, 2) },
      { number: 3, arabic: "وَقَالَ الَّذِينَ كَفَرُوا لَا تَأْتِينَا السَّاعَةُ ۖ قُلْ بَلَىٰ وَرَبِّي لَتَأْتِيَنَّكُمْ عَالِمِ الْغَيْبِ", transliteration: "Wa qaalal lazeena kafaroo laa ta'teenas Saa'ah; qul balaa wa Rabbee lata'tiyannakum 'Aalimil Ghaib", english: "But those who disbelieve say, The Hour will not come to us. Say, Yes, by my Lord, it will surely come to you. Allah is the Knower of the unseen", bengali: "কাফিররা বলে, কিয়ামত আমাদের কাছে আসবে না। বল, অবশ্যই, আমার প্রভুর শপথ, তা তোমাদের কাছে আসবেই। তিনি অদৃশ্যের জ্ঞাতা", audioUrl: getVerseAudioUrl(34, 3) },
      { number: 4, arabic: "لَا يَعْزُبُ عَنْهُ مِثْقَالُ ذَرَّةٍ فِي السَّمَاوَاتِ وَلَا فِي الْأَرْضِ وَلَا أَصْغَرُ مِن ذَٰلِكَ وَلَا أَكْبَرُ إِلَّا فِي كِتَابٍ مُّبِينٍ", transliteration: "Laa ya'zubu 'anhu misqaalu zarratin fis samaawaati wa laa fil ardi wa laaa asgharu min zaalika wa laaa akbaru illaa fee Kitaabim Mubeen", english: "Not absent from Him is an atom's weight within the heavens or within the earth or what is smaller than that or greater, except that it is in a clear register", bengali: "আকাশ ও পৃথিবীতে অণু পরিমাণও তাঁর অগোচরে নয়, এর চেয়ে ছোট বা বড় কিছুই নেই যা সুস্পষ্ট কিতাবে নেই", audioUrl: getVerseAudioUrl(34, 4) },
      { number: 5, arabic: "لِّيَجْزِيَ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ ۚ أُولَٰئِكَ لَهُم مَّغْفِرَةٌ وَرِزْقٌ كَرِيمٌ", transliteration: "Liyajziyal lazeena aamanoo wa 'amilus saalihaaat; ulaaa'ika lahum maghfiratunw wa rizqun kareem", english: "That He may reward those who believe and do righteous deeds. Those will have forgiveness and noble provision", bengali: "যাতে তিনি মুমিনদের ও সৎকর্মশীলদের পুরস্কৃত করেন। তাদের জন্য রয়েছে ক্ষমা ও সম্মানজনক রিজিক", audioUrl: getVerseAudioUrl(34, 5) }
    ]
  },
  {
    surahNumber: 35,
    verses: [
      { number: 1, arabic: "الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ جَاعِلِ الْمَلَائِكَةِ رُسُلًا أُولِي أَجْنِحَةٍ مَّثْنَىٰ وَثُلَاثَ وَرُبَاعَ", transliteration: "Alhamdu lillaahi faatiris samaawaati wal ardi jaa'ilil malaaa'ikati rusulан ulee ajnihatim masnaa wa sulaasa wa rubaa'", english: "All praise is due to Allah, Creator of the heavens and the earth, who made the angels messengers having wings, two or three or four", bengali: "সমস্ত প্রশংসা আল্লাহর, যিনি আকাশ ও পৃথিবীর স্রষ্টা, যিনি ফেরেশতাদের বার্তাবাহক করেছেন দুই, তিন ও চার পাখাবিশিষ্ট", audioUrl: getVerseAudioUrl(35, 1) },
      { number: 2, arabic: "مَّا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا ۖ وَمَا يُمْسِكْ فَلَا مُرْسِلَ لَهُ مِن بَعْدِهِ ۚ وَهُوَ الْعَزِيزُ الْحَكِيمُ", transliteration: "Maa yaftahil laahu linnaasi mir rahmatin falaa mumsika lahaa wa maa yumsik falaa mursila lahoo mim ba'dih; wa Huwal 'Azeezul Hakeem", english: "Whatever mercy Allah grants to people - none can withhold it; and whatever He withholds - none can release it thereafter. And He is the Exalted in Might, the Wise", bengali: "আল্লাহ মানুষের জন্য যে রহমত উন্মুক্ত করেন তা রোধ করার কেউ নেই এবং যা তিনি রোধ করেন তা পরে প্রেরণ করার কেউ নেই। তিনি পরাক্রমশালী, প্রজ্ঞাময়", audioUrl: getVerseAudioUrl(35, 2) },
      { number: 3, arabic: "يَا أَيُّهَا النَّاسُ اذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ ۚ هَلْ مِنْ خَالِقٍ غَيْرُ اللَّهِ يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ", transliteration: "Yaaa ayyuhan naasuz kuroo ni'matal laahi 'alaikum; hal min khaaliqin ghairul laahi yarzuqukum minas samaaa'i wal ard", english: "O mankind, remember the favor of Allah upon you. Is there any creator other than Allah who provides for you from the heaven and earth?", bengali: "হে মানুষ! তোমাদের প্রতি আল্লাহর অনুগ্রহ স্মরণ কর। আল্লাহ ছাড়া এমন কোন স্রষ্টা আছে কি যে তোমাদের আকাশ ও পৃথিবী থেকে রিজিক দেয়?", audioUrl: getVerseAudioUrl(35, 3) },
      { number: 4, arabic: "وَإِن يُكَذِّبُوكَ فَقَدْ كُذِّبَتْ رُسُلٌ مِّن قَبْلِكَ ۗ وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ", transliteration: "Wa iny yukazzibooka faqad kuzzibat rusulum min qablik; wa ilal laahi turja'ul umoor", english: "And if they deny you - then already were messengers denied before you. And to Allah are returned all matters", bengali: "তারা যদি তোমাকে অস্বীকার করে, তবে তোমার পূর্বে অনেক রাসূলকে অস্বীকার করা হয়েছে। সব বিষয় আল্লাহর কাছেই প্রত্যাবর্তিত হবে", audioUrl: getVerseAudioUrl(35, 4) },
      { number: 5, arabic: "يَا أَيُّهَا النَّاسُ إِنَّ وَعْدَ اللَّهِ حَقٌّ ۖ فَلَا تَغُرَّنَّكُمُ الْحَيَاةُ الدُّنْيَا ۖ وَلَا يَغُرَّنَّكُم بِاللَّهِ الْغَرُورُ", transliteration: "Yaaa ayyuhan naasu inna wa'dal laahi haqqun falaa taghurran nakumul hayaatud dunyaa wa laa yaghurrannakum billaahil gharoor", english: "O mankind, indeed the promise of Allah is truth, so let not the worldly life delude you and be not deceived about Allah by the Deceiver", bengali: "হে মানুষ! নিশ্চয়ই আল্লাহর প্রতিশ্রুতি সত্য। সুতরাং পার্থিব জীবন যেন তোমাদের প্রতারিত না করে এবং প্রতারক যেন আল্লাহ সম্পর্কে তোমাদের প্রতারিত না করে", audioUrl: getVerseAudioUrl(35, 5) }
    ]
  },
  {
    surahNumber: 36,
    verses: [
      { number: 1, arabic: "يس", transliteration: "Yaa-Seen", english: "Ya, Seen", bengali: "ইয়াসীন", audioUrl: getVerseAudioUrl(36, 1) },
      { number: 2, arabic: "وَالْقُرْآنِ الْحَكِيمِ", transliteration: "Wal-Qur'aanil-Hakeem", english: "By the wise Quran", bengali: "প্রজ্ঞাপূর্ণ কুরআনের শপথ", audioUrl: getVerseAudioUrl(36, 2) },
      { number: 3, arabic: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", transliteration: "Innaka laminal-mursaleen", english: "Indeed you are from among the messengers", bengali: "নিশ্চয়ই তুমি রাসূলগণের একজন", audioUrl: getVerseAudioUrl(36, 3) },
      { number: 4, arabic: "عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ", transliteration: "'Alaa siraatim-mustaqeem", english: "On a straight path", bengali: "সরল পথের উপর প্রতিষ্ঠিত", audioUrl: getVerseAudioUrl(36, 4) },
      { number: 5, arabic: "تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ", transliteration: "Tanzeelal-'Azeezir-Raheem", english: "Sent down by the Exalted in Might, the Merciful", bengali: "মহাপরাক্রমশালী, পরম দয়ালুর অবতীর্ণ", audioUrl: getVerseAudioUrl(36, 5) },
      { number: 6, arabic: "لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ", transliteration: "Litunzira qawmam maaa unzira aabaaa'uhum fahum ghaafiloon", english: "That you may warn a people whose forefathers were not warned, so they are unaware", bengali: "যাতে তুমি এমন এক জাতিকে সতর্ক কর যাদের পূর্বপুরুষদের সতর্ক করা হয়নি, তাই তারা অসচেতন", audioUrl: getVerseAudioUrl(36, 6) },
      { number: 7, arabic: "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ", transliteration: "Laqad haqqal qawlu 'alaaa aksarihim fahum laa yu'minoon", english: "Already the word has come into effect upon most of them, so they do not believe", bengali: "তাদের অধিকাংশের উপর বাণী সত্য হয়ে গেছে, তাই তারা ঈমান আনে না", audioUrl: getVerseAudioUrl(36, 7) },
      { number: 8, arabic: "إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ", transliteration: "Innaa ja'alnaa feee a'naaqihim aghlaalan fahiya ilal azqaani fahum muqmahoon", english: "Indeed, We have put shackles on their necks, and they are to their chins, so they are with heads raised up", bengali: "আমি তাদের গলায় শৃঙ্খল পরিয়ে দিয়েছি যা থুতনি পর্যন্ত পৌঁছে গেছে, ফলে তাদের মাথা উপরে উঠে আছে", audioUrl: getVerseAudioUrl(36, 8) }
    ]
  },
  {
    surahNumber: 37,
    verses: [
      { number: 1, arabic: "وَالصَّافَّاتِ صَفًّا", transliteration: "Wassaaffaati saffaa", english: "By those lined up in rows", bengali: "শপথ সারিবদ্ধভাবে দণ্ডায়মানদের", audioUrl: getVerseAudioUrl(37, 1) },
      { number: 2, arabic: "فَالزَّاجِرَاتِ زَجْرًا", transliteration: "Fazzaajiraati zajraa", english: "And those who drive the clouds", bengali: "অতঃপর ধমক দিয়ে নিবারণকারীদের", audioUrl: getVerseAudioUrl(37, 2) },
      { number: 3, arabic: "فَالتَّالِيَاتِ ذِكْرًا", transliteration: "Fattaaliyaati zikraa", english: "And those who recite the message", bengali: "অতঃপর যিকির পাঠকারীদের", audioUrl: getVerseAudioUrl(37, 3) },
      { number: 4, arabic: "إِنَّ إِلَٰهَكُمْ لَوَاحِدٌ", transliteration: "Inna ilaahakum la Waahid", english: "Indeed, your God is One", bengali: "নিশ্চয়ই তোমাদের উপাস্য এক", audioUrl: getVerseAudioUrl(37, 4) },
      { number: 5, arabic: "رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا وَرَبُّ الْمَشَارِقِ", transliteration: "Rabbus samaawaati wal ardi wa maa bainahumaa wa Rabbul mashaariq", english: "Lord of the heavens and the earth and that between them and Lord of the sunrises", bengali: "আকাশমণ্ডলী ও পৃথিবী এবং এদের মধ্যবর্তী সবকিছুর প্রভু এবং সকল উদয়স্থলের প্রভু", audioUrl: getVerseAudioUrl(37, 5) }
    ]
  },
  {
    surahNumber: 38,
    verses: [
      { number: 1, arabic: "ص ۚ وَالْقُرْآنِ ذِي الذِّكْرِ", transliteration: "Saaad; wal Qur'aani ziz zikr", english: "Sad. By the Quran containing reminder", bengali: "সা-দ। উপদেশপূর্ণ কুরআনের শপথ", audioUrl: getVerseAudioUrl(38, 1) },
      { number: 2, arabic: "بَلِ الَّذِينَ كَفَرُوا فِي عِزَّةٍ وَشِقَاقٍ", transliteration: "Balil lazeena kafaroo fee 'izzatinw wa shiqaaq", english: "But those who disbelieve are in pride and dissension", bengali: "বরং কাফিররা অহংকার ও বিরোধিতায় লিপ্ত", audioUrl: getVerseAudioUrl(38, 2) },
      { number: 3, arabic: "كَمْ أَهْلَكْنَا مِن قَبْلِهِم مِّن قَرْنٍ فَنَادَوْا وَلَاتَ حِينَ مَنَاصٍ", transliteration: "Kam ahlaknaa min qablihim min qarnin fanaadaw wa laata heena manaas", english: "How many a generation We destroyed before them, and they cried out but there was no more time for escape", bengali: "তাদের পূর্বে আমি কত প্রজন্মকে ধ্বংস করেছি। তারা আর্তনাদ করেছিল কিন্তু তখন পলায়নের সময় ছিল না", audioUrl: getVerseAudioUrl(38, 3) },
      { number: 4, arabic: "وَعَجِبُوا أَن جَاءَهُم مُّنذِرٌ مِّنْهُمْ ۖ وَقَالَ الْكَافِرُونَ هَٰذَا سَاحِرٌ كَذَّابٌ", transliteration: "Wa 'ajibooo an jaaa'ahum munzirum minhum wa qaalal kaafiroona haazaa saahirun kazzaab", english: "And they wonder that a warner has come to them from among themselves, and the disbelievers say, This is a magician and a liar", bengali: "তারা বিস্মিত যে, তাদের মধ্য থেকে একজন সতর্ককারী এসেছে এবং কাফিররা বলে, এ তো এক মিথ্যাবাদী জাদুকর", audioUrl: getVerseAudioUrl(38, 4) },
      { number: 5, arabic: "أَجَعَلَ الْآلِهَةَ إِلَٰهًا وَاحِدًا ۖ إِنَّ هَٰذَا لَشَيْءٌ عُجَابٌ", transliteration: "A ja'alal aalihata Ilaahanw Waahidaa; inna haazaa la shai'un 'ujaab", english: "Has he made the gods only one God? Indeed, this is a curious thing", bengali: "সে কি সব উপাস্যকে এক উপাস্য বানিয়ে দিয়েছে? এটা তো এক আশ্চর্য ব্যাপার", audioUrl: getVerseAudioUrl(38, 5) }
    ]
  },
  {
    surahNumber: 39,
    verses: [
      { number: 1, arabic: "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ", transliteration: "Tanzeelul Kitaabi minal laahil 'Azeezil Hakeem", english: "The revelation of the Quran is from Allah, the Exalted in Might, the Wise", bengali: "এই কিতাব অবতীর্ণ হয়েছে পরাক্রমশালী, প্রজ্ঞাময় আল্লাহর পক্ষ থেকে", audioUrl: getVerseAudioUrl(39, 1) },
      { number: 2, arabic: "إِنَّا أَنزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ فَاعْبُدِ اللَّهَ مُخْلِصًا لَّهُ الدِّينَ", transliteration: "Innaaa anzalnaaa ilaikal Kitaaba bilhaqqi fa'budil laaha mukhlisan lahud deen", english: "Indeed, We have sent down to you the Book in truth. So worship Allah, being sincere to Him in religion", bengali: "নিশ্চয়ই আমি তোমার প্রতি সত্যসহ কিতাব অবতীর্ণ করেছি। অতএব তুমি আল্লাহর ইবাদত কর, তাঁর আনুগত্যে একনিষ্ঠ হয়ে", audioUrl: getVerseAudioUrl(39, 2) },
      { number: 3, arabic: "أَلَا لِلَّهِ الدِّينُ الْخَالِصُ", transliteration: "Alaa lillaahid deenul khaalis", english: "Unquestionably, for Allah is the pure religion", bengali: "জেনে রাখ, খাঁটি আনুগত্য একমাত্র আল্লাহরই প্রাপ্য", audioUrl: getVerseAudioUrl(39, 3) },
      { number: 4, arabic: "لَوْ أَرَادَ اللَّهُ أَن يَتَّخِذَ وَلَدًا لَّاصْطَفَىٰ مِمَّا يَخْلُقُ مَا يَشَاءُ ۚ سُبْحَانَهُ ۖ هُوَ اللَّهُ الْوَاحِدُ الْقَهَّارُ", transliteration: "Law araadal laahu any yattakhiza waladal lastafaa mimmaa yakhluqu maa yashaaa'; Subhaanahoo Huwal laahul Waahidul Qahhaar", english: "If Allah had intended to take a son, He could have chosen from what He creates whatever He willed. Exalted is He; He is Allah, the One, the Prevailing", bengali: "আল্লাহ সন্তান গ্রহণ করতে চাইলে তাঁর সৃষ্টি থেকে যা ইচ্ছা বেছে নিতেন। তিনি পবিত্র, তিনিই আল্লাহ, এক, পরাক্রমশালী", audioUrl: getVerseAudioUrl(39, 4) },
      { number: 5, arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ يُكَوِّرُ اللَّيْلَ عَلَى النَّهَارِ وَيُكَوِّرُ النَّهَارَ عَلَى اللَّيْلِ", transliteration: "Khalaqas samaawaati wal arda bilhaqq; yukawwirul laila 'alan nahaari wa yukawwirun nahaara 'alal lail", english: "He created the heavens and earth in truth. He wraps the night over the day and wraps the day over the night", bengali: "তিনি আকাশমণ্ডলী ও পৃথিবী সৃষ্টি করেছেন যথাযথভাবে। তিনি রাতকে দিনের উপর এবং দিনকে রাতের উপর জড়িয়ে দেন", audioUrl: getVerseAudioUrl(39, 5) }
    ]
  },
  {
    surahNumber: 40,
    verses: [
      { number: 1, arabic: "حم", transliteration: "Haa Meem", english: "Ha, Meem", bengali: "হা-মীম", audioUrl: getVerseAudioUrl(40, 1) },
      { number: 2, arabic: "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْعَلِيمِ", transliteration: "Tanzeelul Kitaabi minal laahil 'Azeezil 'Aleem", english: "The revelation of the Book is from Allah, the Exalted in Might, the Knowing", bengali: "এই কিতাব অবতীর্ণ হয়েছে পরাক্রমশালী, সর্বজ্ঞ আল্লাহর পক্ষ থেকে", audioUrl: getVerseAudioUrl(40, 2) },
      { number: 3, arabic: "غَافِرِ الذَّنبِ وَقَابِلِ التَّوْبِ شَدِيدِ الْعِقَابِ ذِي الطَّوْلِ ۖ لَا إِلَٰهَ إِلَّا هُوَ ۖ إِلَيْهِ الْمَصِيرُ", transliteration: "Ghaafiriz zambi wa qaabilit tawbi shadeedil 'iqaabi zit tawl; laaa ilaaha illaa Hoo; ilaihil maseer", english: "The Forgiver of sin, Acceptor of repentance, Severe in punishment, Owner of abundance. There is no deity except Him; to Him is the destination", bengali: "পাপ ক্ষমাকারী, তওবা কবুলকারী, কঠোর শাস্তিদাতা, অনুগ্রহশীল। তিনি ছাড়া কোন উপাস্য নেই; তাঁরই দিকে প্রত্যাবর্তন", audioUrl: getVerseAudioUrl(40, 3) },
      { number: 4, arabic: "مَا يُجَادِلُ فِي آيَاتِ اللَّهِ إِلَّا الَّذِينَ كَفَرُوا فَلَا يَغْرُرْكَ تَقَلُّبُهُمْ فِي الْبِلَادِ", transliteration: "Maa yujaadilu fee Aayaatil laahi illal lazeena kafaroo falaa yaghrurka taqallubuhum fil bilaad", english: "No one disputes concerning the signs of Allah except those who disbelieve, so be not deceived by their movement about in the land", bengali: "যারা কাফির তারা ছাড়া আল্লাহর আয়াত নিয়ে কেউ বিতর্ক করে না। দেশে তাদের চলাফেরা যেন তোমাকে প্রতারিত না করে", audioUrl: getVerseAudioUrl(40, 4) },
      { number: 5, arabic: "كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ وَالْأَحْزَابُ مِن بَعْدِهِمْ ۖ وَهَمَّتْ كُلُّ أُمَّةٍ بِرَسُولِهِمْ لِيَأْخُذُوهُ", transliteration: "Kazzabat qablahum qawmu Noohinw wal ahzaabu mim ba'dihim wa hammat kullu ummatim bi Rasoolihim liya'khuzoohu", english: "The people of Noah denied before them and the factions after them, and every nation intended to seize their messenger", bengali: "তাদের পূর্বে নূহের সম্প্রদায় এবং তাদের পরে বহু দল অস্বীকার করেছিল এবং প্রতিটি উম্মত তাদের রাসূলকে পাকড়াও করতে চেয়েছিল", audioUrl: getVerseAudioUrl(40, 5) }
    ]
  },
  {
    surahNumber: 41,
    verses: [
      { number: 1, arabic: "حم", transliteration: "Haa Meem", english: "Ha, Meem", bengali: "হা-মীম", audioUrl: getVerseAudioUrl(41, 1) },
      { number: 2, arabic: "تَنزِيلٌ مِّنَ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Tanzeelum minar Rahmaanir Raheem", english: "A revelation from the Entirely Merciful, the Especially Merciful", bengali: "এটি পরম করুণাময়, অতি দয়ালুর পক্ষ থেকে অবতীর্ণ", audioUrl: getVerseAudioUrl(41, 2) },
      { number: 3, arabic: "كِتَابٌ فُصِّلَتْ آيَاتُهُ قُرْآنًا عَرَبِيًّا لِّقَوْمٍ يَعْلَمُونَ", transliteration: "Kitaabun fussilat aayaatuhoo Qur-aanan 'Arabiyyal liqawminy ya'lamoon", english: "A Book whose verses have been detailed, an Arabic Quran for a people who know", bengali: "এমন কিতাব যার আয়াতসমূহ বিশদ বিবৃত হয়েছে, আরবি কুরআন এমন জাতির জন্য যারা জ্ঞানী", audioUrl: getVerseAudioUrl(41, 3) },
      { number: 4, arabic: "بَشِيرًا وَنَذِيرًا فَأَعْرَضَ أَكْثَرُهُمْ فَهُمْ لَا يَسْمَعُونَ", transliteration: "Basheeranw wa nazeeran fa a'rada aksaruhum fahum laa yasma'oon", english: "As a giver of good tidings and a warner; but most of them turn away, so they do not hear", bengali: "সুসংবাদদাতা ও সতর্ককারীরূপে। কিন্তু তাদের অধিকাংশ মুখ ফিরিয়ে নিয়েছে, তাই তারা শোনে না", audioUrl: getVerseAudioUrl(41, 4) },
      { number: 5, arabic: "وَقَالُوا قُلُوبُنَا فِي أَكِنَّةٍ مِّمَّا تَدْعُونَا إِلَيْهِ وَفِي آذَانِنَا وَقْرٌ وَمِن بَيْنِنَا وَبَيْنِكَ حِجَابٌ", transliteration: "Wa qaaloo quloobunaa feee akinnatim mimmaa tad'oonaaa ilaihi wa feee aazaaninaa waqrunw wa mim baininaa wa bainika hijaab", english: "And they say, Our hearts are within coverings from that to which you invite us, and in our ears is deafness, and between us and you is a partition", bengali: "তারা বলে, তুমি যার দিকে আমাদের আহ্বান কর তা থেকে আমাদের অন্তর আবরণে আছে, আমাদের কানে বধিরতা এবং তোমার ও আমাদের মধ্যে পর্দা রয়েছে", audioUrl: getVerseAudioUrl(41, 5) }
    ]
  },
  {
    surahNumber: 42,
    verses: [
      { number: 1, arabic: "حم", transliteration: "Haa Meem", english: "Ha, Meem", bengali: "হা-মীম", audioUrl: getVerseAudioUrl(42, 1) },
      { number: 2, arabic: "عسق", transliteration: "'Ain-Seen-Qaaf", english: "Ain, Seen, Qaf", bengali: "আইন-সীন-কাফ", audioUrl: getVerseAudioUrl(42, 2) },
      { number: 3, arabic: "كَذَٰلِكَ يُوحِي إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ اللَّهُ الْعَزِيزُ الْحَكِيمُ", transliteration: "Kazaalika yooheee ilaika wa ilal lazeena min qablikal laahul 'Azeezul Hakeem", english: "Thus has He revealed to you and to those before you - Allah, the Exalted in Might, the Wise", bengali: "এভাবেই পরাক্রমশালী, প্রজ্ঞাময় আল্লাহ তোমার প্রতি এবং তোমার পূর্ববর্তীদের প্রতি ওহী প্রেরণ করেন", audioUrl: getVerseAudioUrl(42, 3) },
      { number: 4, arabic: "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۖ وَهُوَ الْعَلِيُّ الْعَظِيمُ", transliteration: "Lahoo maa fis samaawaati wa maa fil ard; wa Huwal 'Aliyyul 'Azeem", english: "To Him belongs whatever is in the heavens and whatever is in the earth, and He is the Most High, the Most Great", bengali: "আকাশ ও পৃথিবীতে যা কিছু আছে সব তাঁরই। তিনি সুউচ্চ, মহান", audioUrl: getVerseAudioUrl(42, 4) },
      { number: 5, arabic: "تَكَادُ السَّمَاوَاتُ يَتَفَطَّرْنَ مِن فَوْقِهِنَّ ۚ وَالْمَلَائِكَةُ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ وَيَسْتَغْفِرُونَ لِمَن فِي الْأَرْضِ", transliteration: "Takaadus samaawaatu yatafat tarna min fawqihinn; walmalaaa'ikatu yusabbihoona bihamdi Rabbihim wa yastaghfiroona liman fil ard", english: "The heavens almost break apart from above them, and the angels exalt with praise of their Lord and ask forgiveness for those on earth", bengali: "আকাশসমূহ তাদের উপর থেকে প্রায় ভেঙ্গে পড়তে চায়। ফেরেশতারা তাদের প্রভুর প্রশংসাসহ তাসবীহ পাঠ করে এবং পৃথিবীবাসীদের জন্য ক্ষমা প্রার্থনা করে", audioUrl: getVerseAudioUrl(42, 5) }
    ]
  },
  {
    surahNumber: 43,
    verses: [
      { number: 1, arabic: "حم", transliteration: "Haa Meem", english: "Ha, Meem", bengali: "হা-মীম", audioUrl: getVerseAudioUrl(43, 1) },
      { number: 2, arabic: "وَالْكِتَابِ الْمُبِينِ", transliteration: "Wal Kitaabil Mubeen", english: "By the clear Book", bengali: "সুস্পষ্ট কিতাবের শপথ", audioUrl: getVerseAudioUrl(43, 2) },
      { number: 3, arabic: "إِنَّا جَعَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ", transliteration: "Innaa ja'alnaahu Qur-aanan 'Arabiyyal la'allakum ta'qiloon", english: "Indeed, We have made it an Arabic Quran that you might understand", bengali: "নিশ্চয়ই আমি এটিকে আরবি কুরআন করেছি যাতে তোমরা বুঝতে পার", audioUrl: getVerseAudioUrl(43, 3) },
      { number: 4, arabic: "وَإِنَّهُ فِي أُمِّ الْكِتَابِ لَدَيْنَا لَعَلِيٌّ حَكِيمٌ", transliteration: "Wa innahoo feee Ummil Kitaabi ladainaa la'Aliyyun Hakeem", english: "And indeed it is, in the Mother of the Book with Us, exalted and full of wisdom", bengali: "নিশ্চয়ই এটি আমাদের কাছে উম্মুল কিতাবে সমুচ্চ, প্রজ্ঞাপূর্ণ", audioUrl: getVerseAudioUrl(43, 4) },
      { number: 5, arabic: "أَفَنَضْرِبُ عَنكُمُ الذِّكْرَ صَفْحًا أَن كُنتُمْ قَوْمًا مُّسْرِفِينَ", transliteration: "Afanadribu 'ankumuz Zikra safhan an kuntum qawmam musrifeen", english: "Then should We turn the message away, from you, because you are a transgressing people?", bengali: "তোমরা সীমালঙ্ঘনকারী বলে আমি কি তোমাদের থেকে এই উপদেশ সরিয়ে নেব?", audioUrl: getVerseAudioUrl(43, 5) }
    ]
  },
  {
    surahNumber: 44,
    verses: [
      { number: 1, arabic: "حم", transliteration: "Haa-Meem", english: "Ha, Meem", bengali: "হা মীম", audioUrl: getVerseAudioUrl(44, 1) },
      { number: 2, arabic: "وَالْكِتَابِ الْمُبِينِ", transliteration: "Wal-Kitaabil-Mubeen", english: "By the clear Book", bengali: "শপথ সুস্পষ্ট কিতাবের", audioUrl: getVerseAudioUrl(44, 2) },
      { number: 3, arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ ۚ إِنَّا كُنَّا مُنذِرِينَ", transliteration: "Innaaa anzalnaahu fee lailatim mubaarakah, innaa kunnaa munzireen", english: "Indeed, We sent it down during a blessed night. Indeed, We were to warn mankind", bengali: "নিশ্চয়ই আমি এটি এক বরকতময় রাতে অবতীর্ণ করেছি। নিশ্চয়ই আমি সতর্ককারী", audioUrl: getVerseAudioUrl(44, 3) },
      { number: 4, arabic: "فِيهَا يُفْرَقُ كُلُّ أَمْرٍ حَكِيمٍ", transliteration: "Feehaa yufraqu kullu amrin hakeem", english: "On that night is made distinct every precise matter", bengali: "এই রাতে প্রতিটি প্রজ্ঞাপূর্ণ বিষয় স্থিরীকৃত হয়", audioUrl: getVerseAudioUrl(44, 4) },
      { number: 5, arabic: "أَمْرًا مِّنْ عِندِنَا ۚ إِنَّا كُنَّا مُرْسِلِينَ", transliteration: "Amram min 'indinaa, innaa kunnaa mursileen", english: "As a command from Us. Indeed, We were to send a messenger", bengali: "আমাদের পক্ষ থেকে আদেশ হিসেবে। নিশ্চয়ই আমি রাসূল প্রেরণকারী", audioUrl: getVerseAudioUrl(44, 5) }
    ]
  },
  {
    surahNumber: 48,
    verses: [
      { number: 1, arabic: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا", transliteration: "Innaa fatahnaa laka fat-ham mubeenaa", english: "Indeed, We have given you a clear conquest", bengali: "নিশ্চয়ই আমি তোমাকে সুস্পষ্ট বিজয় দান করেছি", audioUrl: getVerseAudioUrl(48, 1) },
      { number: 2, arabic: "لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ وَيُتِمَّ نِعْمَتَهُ عَلَيْكَ وَيَهْدِيَكَ صِرَاطًا مُّسْتَقِيمًا", transliteration: "Liyaghfira lakal laahu maa taqaddama min zanbika wa maa ta akh-khara wa yutimma ni'matahoo 'alaika wa yahdiyaka siraatam mustaqeemaa", english: "That Allah may forgive for you what preceded of your sin and what will follow and complete His favor upon you and guide you to a straight path", bengali: "যাতে আল্লাহ তোমার পূর্ববর্তী ও পরবর্তী সকল ত্রুটি মার্জনা করেন এবং তোমার প্রতি তাঁর অনুগ্রহ পূর্ণ করেন এবং তোমাকে সরল পথে পরিচালিত করেন", audioUrl: getVerseAudioUrl(48, 2) },
      { number: 3, arabic: "وَيَنصُرَكَ اللَّهُ نَصْرًا عَزِيزًا", transliteration: "Wa yansurakal laahu nasran 'azeezaa", english: "And that Allah may aid you with a mighty victory", bengali: "এবং আল্লাহ তোমাকে মহা সাহায্যে সাহায্য করেন", audioUrl: getVerseAudioUrl(48, 3) }
    ]
  },
  {
    surahNumber: 55,
    verses: [
      { number: 1, arabic: "الرَّحْمَٰنُ", transliteration: "Ar-Rahman", english: "The Most Merciful", bengali: "পরম করুণাময়", audioUrl: getVerseAudioUrl(55, 1) },
      { number: 2, arabic: "عَلَّمَ الْقُرْآنَ", transliteration: "'Allamal-Qur'aan", english: "Taught the Quran", bengali: "কুরআন শিক্ষা দিয়েছেন", audioUrl: getVerseAudioUrl(55, 2) },
      { number: 3, arabic: "خَلَقَ الْإِنْسَانَ", transliteration: "Khalaqal-insaan", english: "Created man", bengali: "মানুষ সৃষ্টি করেছেন", audioUrl: getVerseAudioUrl(55, 3) },
      { number: 4, arabic: "عَلَّمَهُ الْبَيَانَ", transliteration: "'Allamahul-bayaan", english: "And taught him eloquence", bengali: "তাকে বর্ণনা শিক্ষা দিয়েছেন", audioUrl: getVerseAudioUrl(55, 4) },
      { number: 5, arabic: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ", transliteration: "Ash-shamsu wal-qamaru bi-husbaan", english: "The sun and the moon move by precise calculation", bengali: "সূর্য ও চন্দ্র হিসাব অনুযায়ী চলে", audioUrl: getVerseAudioUrl(55, 5) },
      { number: 6, arabic: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ", transliteration: "Wan-najmu wash-shajaru yasjudaan", english: "And the stars and trees prostrate", bengali: "তারকারাজি ও বৃক্ষরাজি সিজদা করে", audioUrl: getVerseAudioUrl(55, 6) },
      { number: 7, arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ", transliteration: "Was-samaa'a rafa'aha wa wada'al-meezaan", english: "And the heaven He raised and imposed the balance", bengali: "এবং আকাশকে তিনি উচ্চ করেছেন এবং ভারসাম্য স্থাপন করেছেন", audioUrl: getVerseAudioUrl(55, 7) },
      { number: 8, arabic: "أَلَّا تَطْغَوْا فِي الْمِيزَانِ", transliteration: "Allaa tatghaw fil-meezaan", english: "That you not transgress within the balance", bengali: "যাতে তোমরা ভারসাম্যে সীমালঙ্ঘন না কর", audioUrl: getVerseAudioUrl(55, 8) },
      { number: 9, arabic: "وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ", transliteration: "Wa aqeemul-wazna bil-qisti wa laa tukhsirul-meezaan", english: "And establish weight in justice and do not make deficient the balance", bengali: "এবং ন্যায়সঙ্গতভাবে ওজন কায়েম কর এবং ভারসাম্যে কমতি করো না", audioUrl: getVerseAudioUrl(55, 9) },
      { number: 10, arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ", transliteration: "Wal-arda wada'aha lil-anaam", english: "And the earth He laid out for the creatures", bengali: "এবং পৃথিবী তিনি স্থাপন করেছেন সৃষ্টিকুলের জন্য", audioUrl: getVerseAudioUrl(55, 10) },
      { number: 13, arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", transliteration: "Fabi ayyi aalaaa'i Rabbikumaa tukazzibaan", english: "So which of the favors of your Lord would you deny?", bengali: "তোমরা উভয়ে তোমাদের প্রভুর কোন অনুগ্রহকে অস্বীকার করবে?", audioUrl: getVerseAudioUrl(55, 13) }
    ]
  },
  {
    surahNumber: 56,
    verses: [
      { number: 1, arabic: "إِذَا وَقَعَتِ الْوَاقِعَةُ", transliteration: "Izaa waqa'atil waaqi'ah", english: "When the Occurrence occurs", bengali: "যখন মহাঘটনা সংঘটিত হবে", audioUrl: getVerseAudioUrl(56, 1) },
      { number: 2, arabic: "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ", transliteration: "Laisa liwaq'atihaa kaazibah", english: "There is, at its occurrence, no denial", bengali: "এর সংঘটন অস্বীকার করার উপায় নেই", audioUrl: getVerseAudioUrl(56, 2) },
      { number: 3, arabic: "خَافِضَةٌ رَّافِعَةٌ", transliteration: "Khaaafidatur raafi'ah", english: "It will bring down some and raise up others", bengali: "এটা কাউকে নীচু করবে, কাউকে উঁচু করবে", audioUrl: getVerseAudioUrl(56, 3) },
      { number: 4, arabic: "إِذَا رُجَّتِ الْأَرْضُ رَجًّا", transliteration: "Izaa rujjatil ardu rajjaa", english: "When the earth is shaken with convulsion", bengali: "যখন পৃথিবী প্রবলভাবে কম্পিত হবে", audioUrl: getVerseAudioUrl(56, 4) },
      { number: 5, arabic: "وَبُسَّتِ الْجِبَالُ بَسًّا", transliteration: "Wa bussatil jibaalu bassaa", english: "And the mountains are broken down, crumbling", bengali: "এবং পাহাড়সমূহ চূর্ণ-বিচূর্ণ হবে", audioUrl: getVerseAudioUrl(56, 5) }
    ]
  },
  {
    surahNumber: 67,
    verses: [
      { number: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "Tabaarakal-lazee biyadihil-mulku wa huwa 'alaa kulli shay'in Qadeer", english: "Blessed is He in whose hand is dominion, and He is over all things competent", bengali: "মহান সেই সত্তা যার হাতে সার্বভৌমত্ব, এবং তিনি সব কিছুর উপর সর্বশক্তিমান", audioUrl: getVerseAudioUrl(67, 1) },
      { number: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", transliteration: "Allazee khalaqal-mawta wal-hayaata liyabluwakum ayyukum ahsanu 'amalaa, wa huwal-'Azeezul-Ghafoor", english: "He who created death and life to test you as to which of you is best in deed - and He is the Exalted in Might, the Forgiving", bengali: "যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করতে কে তোমাদের মধ্যে কর্মে উত্তম। তিনি মহাপরাক্রমশালী, ক্ষমাশীল", audioUrl: getVerseAudioUrl(67, 2) },
      { number: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِنْ فُطُورٍ", transliteration: "Allazee khalaqa sab'a samaawaatin tibaaqaa, maa taraa fee khalqir-Rahmaani min tafaawut, farji'il-basara hal taraa min futoor", english: "He created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return your vision; do you see any breaks?", bengali: "যিনি সাত আকাশ স্তরে স্তরে সৃষ্টি করেছেন। তুমি করুণাময়ের সৃষ্টিতে কোন অসামঞ্জস্য দেখতে পাবে না। আবার তাকাও, কোন ফাটল দেখতে পাও?", audioUrl: getVerseAudioUrl(67, 3) },
      { number: 4, arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنْقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", transliteration: "Thummar-ji'il-basara karratayni yanqalib ilaykal-basaru khaasi'aw-wa huwa haseer", english: "Then return your vision twice again. Your vision will return to you humbled while it is fatigued", bengali: "তারপর বারবার তাকাও, তোমার দৃষ্টি ব্যর্থ ও ক্লান্ত হয়ে তোমার কাছে ফিরে আসবে", audioUrl: getVerseAudioUrl(67, 4) },
      { number: 5, arabic: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ", transliteration: "Wa laqad zayyannnas-samaa'ad-dunyaa bimasaabeeh, wa ja'alnaaha rujoomal-lish-shayaateen, wa a'tadnaa lahum 'azaabas-sa'eer", english: "And We have certainly beautified the nearest heaven with stars and have made them missiles to drive away the devils, and We have prepared for them the punishment of the Blaze", bengali: "এবং আমি নিকটবর্তী আকাশকে প্রদীপমালা দিয়ে সুসজ্জিত করেছি এবং এগুলোকে শয়তানদের জন্য নিক্ষেপাস্ত্র বানিয়েছি। এবং তাদের জন্য প্রস্তুত রেখেছি জ্বলন্ত আগুনের শাস্তি", audioUrl: getVerseAudioUrl(67, 5) }
    ]
  },
  {
    surahNumber: 72,
    verses: [
      { number: 1, arabic: "قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ فَقَالُوا إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا", transliteration: "Qul oohiya ilaiya annahustama'a nafarum minal jinni faqaaloo innaa sami'naa Qur'aanan 'ajabaa", english: "Say, It has been revealed to me that a group of the jinn listened and said, Indeed, we have heard an amazing Quran", bengali: "বল, আমার কাছে ওহী করা হয়েছে যে, জিনদের একটি দল মনোযোগ দিয়ে শুনেছে এবং বলেছে, আমরা এক বিস্ময়কর কুরআন শুনেছি", audioUrl: getVerseAudioUrl(72, 1) },
      { number: 2, arabic: "يَهْدِي إِلَى الرُّشْدِ فَآمَنَّا بِهِ ۖ وَلَن نُّشْرِكَ بِرَبِّنَا أَحَدًا", transliteration: "Yahdeee ilar rushdi fa aamannaa bih, wa lan nushrika bi Rabbinaaa ahadaa", english: "It guides to the right course, and we have believed in it. And we will never associate with our Lord anyone", bengali: "এটা সঠিক পথের দিকে পরিচালিত করে, তাই আমরা এতে বিশ্বাস করেছি। এবং আমরা কখনো আমাদের প্রভুর সাথে কাউকে শরীক করব না", audioUrl: getVerseAudioUrl(72, 2) },
      { number: 3, arabic: "وَأَنَّهُ تَعَالَىٰ جَدُّ رَبِّنَا مَا اتَّخَذَ صَاحِبَةً وَلَا وَلَدًا", transliteration: "Wa annahoo Ta'aalaa jaddu Rabbinaa mat-takhaza saahibatanw wa laa waladaa", english: "And exalted is the nobleness of our Lord; He has not taken a wife or a son", bengali: "এবং আমাদের প্রভুর মর্যাদা সুউচ্চ; তিনি স্ত্রী বা সন্তান গ্রহণ করেননি", audioUrl: getVerseAudioUrl(72, 3) }
    ]
  },
  {
    surahNumber: 73,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا الْمُزَّمِّلُ", transliteration: "Yaaa ayyuhal muzzammil", english: "O you who wraps himself in clothing", bengali: "হে বস্ত্রাবৃত", audioUrl: getVerseAudioUrl(73, 1) },
      { number: 2, arabic: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا", transliteration: "Qumil laila illaa qaleelaa", english: "Arise to pray the night, except for a little", bengali: "রাতে জাগ, সামান্য অংশ ছাড়া", audioUrl: getVerseAudioUrl(73, 2) },
      { number: 3, arabic: "نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا", transliteration: "Nisfahooo awin qus minhu qaleelaa", english: "Half of it, or subtract from it a little", bengali: "অর্ধেক অথবা তার চেয়ে সামান্য কম", audioUrl: getVerseAudioUrl(73, 3) },
      { number: 4, arabic: "أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", transliteration: "Aw zid 'alaihi wa rattilil Qur'aana tarteelaa", english: "Or add to it, and recite the Quran with measured recitation", bengali: "অথবা তার চেয়ে বাড়াও এবং কুরআন তিলাওয়াত কর ধীরে ধীরে সুন্দরভাবে", audioUrl: getVerseAudioUrl(73, 4) }
    ]
  },
  {
    surahNumber: 74,
    verses: [
      { number: 1, arabic: "يَا أَيُّهَا الْمُدَّثِّرُ", transliteration: "Yaaa ayyuhal muddassir", english: "O you who covers himself with a garment", bengali: "হে চাদরাবৃত", audioUrl: getVerseAudioUrl(74, 1) },
      { number: 2, arabic: "قُمْ فَأَنذِرْ", transliteration: "Qum fa anzir", english: "Arise and warn", bengali: "উঠ, সতর্ক কর", audioUrl: getVerseAudioUrl(74, 2) },
      { number: 3, arabic: "وَرَبَّكَ فَكَبِّرْ", transliteration: "Wa rabbaka fakabbir", english: "And your Lord glorify", bengali: "এবং তোমার প্রভুর শ্রেষ্ঠত্ব ঘোষণা কর", audioUrl: getVerseAudioUrl(74, 3) },
      { number: 4, arabic: "وَثِيَابَكَ فَطَهِّرْ", transliteration: "Wa siyaabaka fatah-hir", english: "And your clothing purify", bengali: "এবং তোমার পোশাক পবিত্র রাখ", audioUrl: getVerseAudioUrl(74, 4) },
      { number: 5, arabic: "وَالرُّجْزَ فَاهْجُرْ", transliteration: "War rujza fahjur", english: "And uncleanliness avoid", bengali: "এবং অপবিত্রতা বর্জন কর", audioUrl: getVerseAudioUrl(74, 5) }
    ]
  },
  {
    surahNumber: 75,
    verses: [
      { number: 1, arabic: "لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ", transliteration: "Laaa uqsimu bi yawmil qiyaamah", english: "I swear by the Day of Resurrection", bengali: "আমি শপথ করছি কিয়ামত দিবসের", audioUrl: getVerseAudioUrl(75, 1) },
      { number: 2, arabic: "وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ", transliteration: "Wa laaa uqsimu bin nafsil lawwaamah", english: "And I swear by the reproaching soul", bengali: "এবং শপথ করছি আত্মসমালোচক আত্মার", audioUrl: getVerseAudioUrl(75, 2) },
      { number: 3, arabic: "أَيَحْسَبُ الْإِنسَانُ أَلَّن نَّجْمَعَ عِظَامَهُ", transliteration: "Ayahsabul insaanu allan najma'a 'izaamah", english: "Does man think that We will not assemble his bones?", bengali: "মানুষ কি মনে করে যে আমি তার হাড়গুলো একত্র করতে পারব না?", audioUrl: getVerseAudioUrl(75, 3) },
      { number: 4, arabic: "بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ", transliteration: "Balaa qaadireena 'alaaa an nusawwiya banaanah", english: "Yes. We are able even to proportion his fingertips", bengali: "অবশ্যই! আমি তার আঙ্গুলের ডগা পর্যন্ত পুনর্গঠন করতে সক্ষম", audioUrl: getVerseAudioUrl(75, 4) }
    ]
  },
  {
    surahNumber: 76,
    verses: [
      { number: 1, arabic: "هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ لَمْ يَكُن شَيْئًا مَّذْكُورًا", transliteration: "Hal ataa 'alal insaani heenum minad dahri lam yakun shai'am mazkooraa", english: "Has there not come upon man a period of time when he was not a thing even mentioned?", bengali: "মানুষের উপর কি এমন সময় আসেনি যখন সে উল্লেখযোগ্য কিছুই ছিল না?", audioUrl: getVerseAudioUrl(76, 1) },
      { number: 2, arabic: "إِنَّا خَلَقْنَا الْإِنسَانَ مِن نُّطْفَةٍ أَمْشَاجٍ نَّبْتَلِيهِ فَجَعَلْنَاهُ سَمِيعًا بَصِيرًا", transliteration: "Innaa khalaqnal insaana min nutfatin amshaajin nabtaleehi faja'alnaahu samee'am baseeraa", english: "Indeed, We created man from a sperm-drop mixture that We may try him; and We made him hearing and seeing", bengali: "নিশ্চয়ই আমি মানুষকে মিশ্র শুক্র থেকে সৃষ্টি করেছি তাকে পরীক্ষা করতে; এবং তাকে শ্রবণ ও দৃষ্টিশক্তি দিয়েছি", audioUrl: getVerseAudioUrl(76, 2) },
      { number: 3, arabic: "إِنَّا هَدَيْنَاهُ السَّبِيلَ إِمَّا شَاكِرًا وَإِمَّا كَفُورًا", transliteration: "Innaa hadainaahus sabeela immaa shaakiran wa immaa kafooraa", english: "Indeed, We guided him to the way, be he grateful or be he ungrateful", bengali: "নিশ্চয়ই আমি তাকে পথ দেখিয়েছি, হয় সে কৃতজ্ঞ হবে নতুবা অকৃতজ্ঞ", audioUrl: getVerseAudioUrl(76, 3) }
    ]
  },
  {
    surahNumber: 77,
    verses: [
      { number: 1, arabic: "وَالْمُرْسَلَاتِ عُرْفًا", transliteration: "Wal mursalaati 'urfaa", english: "By those winds sent forth in gusts", bengali: "শপথ ধারাবাহিকভাবে প্রেরিত বায়ুর", audioUrl: getVerseAudioUrl(77, 1) },
      { number: 2, arabic: "فَالْعَاصِفَاتِ عَصْفًا", transliteration: "Fal'aasifaati 'asfaa", english: "And the winds that blow violently", bengali: "অতঃপর প্রবল ঝড়ের", audioUrl: getVerseAudioUrl(77, 2) },
      { number: 3, arabic: "وَالنَّاشِرَاتِ نَشْرًا", transliteration: "Wan naashiraati nashraa", english: "And those winds that spread clouds", bengali: "এবং বিস্তারকারীদের", audioUrl: getVerseAudioUrl(77, 3) },
      { number: 4, arabic: "فَالْفَارِقَاتِ فَرْقًا", transliteration: "Fal faariqaati farqaa", english: "And those angels that bring criterion", bengali: "অতঃপর পার্থক্যকারীদের", audioUrl: getVerseAudioUrl(77, 4) },
      { number: 5, arabic: "فَالْمُلْقِيَاتِ ذِكْرًا", transliteration: "Fal mulqiyaati zikraa", english: "And those angels that deliver a message", bengali: "অতঃপর যারা উপদেশ পৌঁছায়", audioUrl: getVerseAudioUrl(77, 5) }
    ]
  },
  {
    surahNumber: 78,
    verses: [
      { number: 1, arabic: "عَمَّ يَتَسَاءَلُونَ", transliteration: "'Amma yatasaaa'aloon", english: "About what are they asking one another?", bengali: "তারা কী সম্পর্কে একে অপরকে জিজ্ঞাসা করছে?", audioUrl: getVerseAudioUrl(78, 1) },
      { number: 2, arabic: "عَنِ النَّبَإِ الْعَظِيمِ", transliteration: "'Anin naba'il 'azeem", english: "About the great news", bengali: "মহা সংবাদ সম্পর্কে", audioUrl: getVerseAudioUrl(78, 2) },
      { number: 3, arabic: "الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ", transliteration: "Allazee hum feehi mukhtalifoon", english: "That over which they are in disagreement", bengali: "যে বিষয়ে তারা মতভেদ করছে", audioUrl: getVerseAudioUrl(78, 3) },
      { number: 4, arabic: "كَلَّا سَيَعْلَمُونَ", transliteration: "Kallaa saya'lamoon", english: "No! They are going to know", bengali: "কখনো না! তারা শীঘ্রই জানতে পারবে", audioUrl: getVerseAudioUrl(78, 4) },
      { number: 5, arabic: "ثُمَّ كَلَّا سَيَعْلَمُونَ", transliteration: "Thumma kallaa saya'lamoon", english: "Then, no! They are going to know", bengali: "আবারও না! তারা শীঘ্রই জানতে পারবে", audioUrl: getVerseAudioUrl(78, 5) }
    ]
  },
  {
    surahNumber: 79,
    verses: [
      { number: 1, arabic: "وَالنَّازِعَاتِ غَرْقًا", transliteration: "Wan naazi'aati gharqaa", english: "By those angels who extract with violence", bengali: "শপথ তাদের যারা সজোরে টেনে বের করে", audioUrl: getVerseAudioUrl(79, 1) },
      { number: 2, arabic: "وَالنَّاشِطَاتِ نَشْطًا", transliteration: "Wan naashitaati nashtaa", english: "And those who remove with ease", bengali: "এবং তাদের যারা আলতোভাবে বের করে", audioUrl: getVerseAudioUrl(79, 2) },
      { number: 3, arabic: "وَالسَّابِحَاتِ سَبْحًا", transliteration: "Was saabihaati sabhaa", english: "And those who glide as if swimming", bengali: "এবং তাদের যারা সাঁতার কাটতে কাটতে চলে", audioUrl: getVerseAudioUrl(79, 3) },
      { number: 4, arabic: "فَالسَّابِقَاتِ سَبْقًا", transliteration: "Fas saabiqaati sabqaa", english: "And those who race each other in a race", bengali: "অতঃপর তাদের যারা প্রতিযোগিতায় এগিয়ে যায়", audioUrl: getVerseAudioUrl(79, 4) },
      { number: 5, arabic: "فَالْمُدَبِّرَاتِ أَمْرًا", transliteration: "Fal mudabbiraati amraa", english: "And those who arrange each matter", bengali: "অতঃপর তাদের যারা কাজ পরিচালনা করে", audioUrl: getVerseAudioUrl(79, 5) }
    ]
  },
  {
    surahNumber: 80,
    verses: [
      { number: 1, arabic: "عَبَسَ وَتَوَلَّىٰ", transliteration: "'Abasa wa tawallaa", english: "The Prophet frowned and turned away", bengali: "সে ভ্রুকুঞ্চিত করল এবং মুখ ফিরিয়ে নিল", audioUrl: getVerseAudioUrl(80, 1) },
      { number: 2, arabic: "أَن جَاءَهُ الْأَعْمَىٰ", transliteration: "An jaaa'ahul a'maa", english: "Because there came to him the blind man", bengali: "কারণ তার কাছে এক অন্ধ ব্যক্তি এসেছিল", audioUrl: getVerseAudioUrl(80, 2) },
      { number: 3, arabic: "وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ", transliteration: "Wa maa yudreeka la'allahoo yazzakkaa", english: "But what would make you perceive that perhaps he might be purified", bengali: "এবং তুমি কি জান, সে হয়তো পরিশুদ্ধ হতে পারে", audioUrl: getVerseAudioUrl(80, 3) },
      { number: 4, arabic: "أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ", transliteration: "Aw yazzakkaru fatanfa'ahuz zikraa", english: "Or be reminded and the remembrance would benefit him", bengali: "অথবা উপদেশ গ্রহণ করতে পারে এবং উপদেশ তাকে উপকৃত করতে পারে", audioUrl: getVerseAudioUrl(80, 4) }
    ]
  },
  {
    surahNumber: 81,
    verses: [
      { number: 1, arabic: "إِذَا الشَّمْسُ كُوِّرَتْ", transliteration: "Izash shamsu kuwwirat", english: "When the sun is wrapped up in darkness", bengali: "যখন সূর্য আলোহীন হয়ে যাবে", audioUrl: getVerseAudioUrl(81, 1) },
      { number: 2, arabic: "وَإِذَا النُّجُومُ انكَدَرَتْ", transliteration: "Wa izan nujoomun kadarat", english: "And when the stars fall, dispersing", bengali: "এবং যখন তারকারাজি খসে পড়বে", audioUrl: getVerseAudioUrl(81, 2) },
      { number: 3, arabic: "وَإِذَا الْجِبَالُ سُيِّرَتْ", transliteration: "Wa izal jibaalu suyyirat", english: "And when the mountains are removed", bengali: "এবং যখন পর্বতসমূহ সঞ্চালিত হবে", audioUrl: getVerseAudioUrl(81, 3) },
      { number: 4, arabic: "وَإِذَا الْعِشَارُ عُطِّلَتْ", transliteration: "Wa izal 'ishaaru 'uttilat", english: "And when full-term she-camels are neglected", bengali: "এবং যখন গর্ভবতী উষ্ট্রী উপেক্ষিত হবে", audioUrl: getVerseAudioUrl(81, 4) },
      { number: 5, arabic: "وَإِذَا الْوُحُوشُ حُشِرَتْ", transliteration: "Wa izal wuhooshu hushirat", english: "And when the wild beasts are gathered", bengali: "এবং যখন বন্য পশুরা একত্রিত হবে", audioUrl: getVerseAudioUrl(81, 5) }
    ]
  },
  {
    surahNumber: 82,
    verses: [
      { number: 1, arabic: "إِذَا السَّمَاءُ انفَطَرَتْ", transliteration: "Izas samaaa'un fatarat", english: "When the sky breaks apart", bengali: "যখন আকাশ বিদীর্ণ হবে", audioUrl: getVerseAudioUrl(82, 1) },
      { number: 2, arabic: "وَإِذَا الْكَوَاكِبُ انتَثَرَتْ", transliteration: "Wa izal kawaakibun tasarat", english: "And when the stars fall, scattering", bengali: "এবং যখন তারকারাজি ঝরে পড়বে", audioUrl: getVerseAudioUrl(82, 2) },
      { number: 3, arabic: "وَإِذَا الْبِحَارُ فُجِّرَتْ", transliteration: "Wa izal bihaaru fujjirat", english: "And when the seas are erupted", bengali: "এবং যখন সমুদ্রসমূহ উত্থিত হবে", audioUrl: getVerseAudioUrl(82, 3) },
      { number: 4, arabic: "وَإِذَا الْقُبُورُ بُعْثِرَتْ", transliteration: "Wa izal qubooru bu'sirat", english: "And when the graves are scattered", bengali: "এবং যখন কবরসমূহ উন্মোচিত হবে", audioUrl: getVerseAudioUrl(82, 4) },
      { number: 5, arabic: "عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ", transliteration: "'Alimat nafsum maa qaddamat wa akhkharat", english: "A soul will then know what it has put forth and kept back", bengali: "তখন প্রত্যেকে জানতে পারবে সে কী অগ্রে পাঠিয়েছে এবং কী পেছনে রেখে গেছে", audioUrl: getVerseAudioUrl(82, 5) }
    ]
  },
  {
    surahNumber: 83,
    verses: [
      { number: 1, arabic: "وَيْلٌ لِّلْمُطَفِّفِينَ", transliteration: "Wailul lil mutaffifeen", english: "Woe to those who give less in measure and weight", bengali: "ধ্বংস যারা মাপে কম দেয় তাদের জন্য", audioUrl: getVerseAudioUrl(83, 1) },
      { number: 2, arabic: "الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ", transliteration: "Allazeena izak taaloo 'alan naasi yastawfoon", english: "Who, when they take a measure from people, take in full", bengali: "যারা মানুষের কাছ থেকে মাপ নেওয়ার সময় পূর্ণ নেয়", audioUrl: getVerseAudioUrl(83, 2) },
      { number: 3, arabic: "وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ", transliteration: "Wa izaa kaaloohum aw wazanoohum yukhsiroon", english: "But if they give by measure or by weight to them, they cause loss", bengali: "কিন্তু যখন তাদের মেপে বা ওজন করে দেয় তখন কম দেয়", audioUrl: getVerseAudioUrl(83, 3) },
      { number: 4, arabic: "أَلَا يَظُنُّ أُولَٰئِكَ أَنَّهُم مَّبْعُوثُونَ", transliteration: "Alaa yazunnu ulaaa'ika annahum mab'oosoon", english: "Do they not think that they will be resurrected", bengali: "তারা কি মনে করে না যে তারা পুনরুত্থিত হবে", audioUrl: getVerseAudioUrl(83, 4) },
      { number: 5, arabic: "لِيَوْمٍ عَظِيمٍ", transliteration: "Li Yawmin 'Azeem", english: "For a tremendous Day", bengali: "এক মহাদিবসে", audioUrl: getVerseAudioUrl(83, 5) }
    ]
  },
  {
    surahNumber: 84,
    verses: [
      { number: 1, arabic: "إِذَا السَّمَاءُ انشَقَّتْ", transliteration: "Izas samaaa'un shaqqat", english: "When the sky has split open", bengali: "যখন আকাশ বিদীর্ণ হবে", audioUrl: getVerseAudioUrl(84, 1) },
      { number: 2, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", transliteration: "Wa azinat li Rabbihaa wa huqqat", english: "And has responded to its Lord and was obligated to do so", bengali: "এবং তার প্রভুর আদেশ পালন করবে, যা তার কর্তব্য", audioUrl: getVerseAudioUrl(84, 2) },
      { number: 3, arabic: "وَإِذَا الْأَرْضُ مُدَّتْ", transliteration: "Wa izal ardu muddat", english: "And when the earth has been extended", bengali: "এবং যখন পৃথিবী বিস্তৃত হবে", audioUrl: getVerseAudioUrl(84, 3) },
      { number: 4, arabic: "وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ", transliteration: "Wa alqat maa feehaa wa takhallat", english: "And has cast out that within it and relinquished it", bengali: "এবং তার মধ্যে যা আছে তা বের করে দেবে এবং খালি হয়ে যাবে", audioUrl: getVerseAudioUrl(84, 4) },
      { number: 5, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", transliteration: "Wa azinat li Rabbihaa wa huqqat", english: "And has responded to its Lord and was obligated", bengali: "এবং তার প্রভুর আদেশ পালন করবে, যা তার কর্তব্য", audioUrl: getVerseAudioUrl(84, 5) }
    ]
  },
  {
    surahNumber: 85,
    verses: [
      { number: 1, arabic: "وَالسَّمَاءِ ذَاتِ الْبُرُوجِ", transliteration: "Wassamaaa'i zaatil burooj", english: "By the sky containing great stars", bengali: "শপথ নক্ষত্রখচিত আকাশের", audioUrl: getVerseAudioUrl(85, 1) },
      { number: 2, arabic: "وَالْيَوْمِ الْمَوْعُودِ", transliteration: "Wal yawmil maw'ood", english: "And by the promised Day", bengali: "এবং প্রতিশ্রুত দিবসের", audioUrl: getVerseAudioUrl(85, 2) },
      { number: 3, arabic: "وَشَاهِدٍ وَمَشْهُودٍ", transliteration: "Wa shaahidinw wa mashhood", english: "And by the witness and what is witnessed", bengali: "এবং সাক্ষী ও যার সাক্ষ্য দেওয়া হবে তার", audioUrl: getVerseAudioUrl(85, 3) },
      { number: 4, arabic: "قُتِلَ أَصْحَابُ الْأُخْدُودِ", transliteration: "Qutila as haabul ukhdood", english: "Cursed were the companions of the trench", bengali: "ধ্বংস হয়েছে গর্তওয়ালারা", audioUrl: getVerseAudioUrl(85, 4) },
      { number: 5, arabic: "النَّارِ ذَاتِ الْوَقُودِ", transliteration: "Annaari zaatil waqood", english: "Containing the fire full of fuel", bengali: "যে আগুন ছিল ইন্ধনে পরিপূর্ণ", audioUrl: getVerseAudioUrl(85, 5) }
    ]
  },
  {
    surahNumber: 86,
    verses: [
      { number: 1, arabic: "وَالسَّمَاءِ وَالطَّارِقِ", transliteration: "Wassamaaa'i wattaariq", english: "By the sky and the night comer", bengali: "শপথ আকাশের এবং রাত্রিতে আগমনকারীর", audioUrl: getVerseAudioUrl(86, 1) },
      { number: 2, arabic: "وَمَا أَدْرَاكَ مَا الطَّارِقُ", transliteration: "Wa maaa adraaka mattaariq", english: "And what can make you know what is the night comer?", bengali: "এবং তুমি কি জান রাত্রিতে আগমনকারী কী?", audioUrl: getVerseAudioUrl(86, 2) },
      { number: 3, arabic: "النَّجْمُ الثَّاقِبُ", transliteration: "Annajmus saaqib", english: "It is the piercing star", bengali: "এটা উজ্জ্বল তারকা", audioUrl: getVerseAudioUrl(86, 3) },
      { number: 4, arabic: "إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ", transliteration: "In kullu nafsil lammaa 'alaihaa haafiz", english: "There is no soul but that it has over it a protector", bengali: "প্রত্যেক আত্মার উপরই একজন তত্ত্বাবধায়ক আছে", audioUrl: getVerseAudioUrl(86, 4) }
    ]
  },
  {
    surahNumber: 87,
    verses: [
      { number: 1, arabic: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", transliteration: "Sabbihisma Rabbikal A'laa", english: "Exalt the name of your Lord, the Most High", bengali: "তোমার মহান প্রভুর নামের পবিত্রতা ঘোষণা কর", audioUrl: getVerseAudioUrl(87, 1) },
      { number: 2, arabic: "الَّذِي خَلَقَ فَسَوَّىٰ", transliteration: "Allazee khalaqa fasawwaa", english: "Who created and proportioned", bengali: "যিনি সৃষ্টি করেছেন এবং সুঠাম করেছেন", audioUrl: getVerseAudioUrl(87, 2) },
      { number: 3, arabic: "وَالَّذِي قَدَّرَ فَهَدَىٰ", transliteration: "Wallazee qaddara fahadaa", english: "And who destined and then guided", bengali: "এবং যিনি পরিমাণ নির্ধারণ করেছেন এবং পথ দেখিয়েছেন", audioUrl: getVerseAudioUrl(87, 3) },
      { number: 4, arabic: "وَالَّذِي أَخْرَجَ الْمَرْعَىٰ", transliteration: "Wallazee akhrajal mar'aa", english: "And who brings out the pasture", bengali: "এবং যিনি তৃণভূমি বের করেন", audioUrl: getVerseAudioUrl(87, 4) },
      { number: 5, arabic: "فَجَعَلَهُ غُثَاءً أَحْوَىٰ", transliteration: "Faja'alahoo ghusaaa'an ahwaa", english: "And then makes it black stubble", bengali: "অতঃপর তা কালো আবর্জনা করে দেন", audioUrl: getVerseAudioUrl(87, 5) }
    ]
  },
  {
    surahNumber: 88,
    verses: [
      { number: 1, arabic: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ", transliteration: "Hal ataaka hadeesul ghaashiyah", english: "Has there reached you the report of the Overwhelming?", bengali: "তোমার কাছে কি সর্বগ্রাসী ঘটনার সংবাদ পৌঁছেছে?", audioUrl: getVerseAudioUrl(88, 1) },
      { number: 2, arabic: "وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ", transliteration: "Wujoohuny yawma'izin khaashi'ah", english: "Some faces, that Day, will be humbled", bengali: "সেদিন অনেক মুখমণ্ডল হবে অবনত", audioUrl: getVerseAudioUrl(88, 2) },
      { number: 3, arabic: "عَامِلَةٌ نَّاصِبَةٌ", transliteration: "'Aamilatun naasibah", english: "Working hard and exhausted", bengali: "পরিশ্রান্ত, ক্লান্ত", audioUrl: getVerseAudioUrl(88, 3) },
      { number: 4, arabic: "تَصْلَىٰ نَارًا حَامِيَةً", transliteration: "Taslaa naaran haamiyah", english: "They will enter to burn in an intensely hot Fire", bengali: "তারা প্রবেশ করবে উত্তপ্ত আগুনে", audioUrl: getVerseAudioUrl(88, 4) },
      { number: 5, arabic: "تُسْقَىٰ مِنْ عَيْنٍ آنِيَةٍ", transliteration: "Tusqaa min 'aynin aaniyah", english: "They will be given drink from a boiling spring", bengali: "তাদের পান করানো হবে ফুটন্ত ঝরনা থেকে", audioUrl: getVerseAudioUrl(88, 5) }
    ]
  },
  {
    surahNumber: 89,
    verses: [
      { number: 1, arabic: "وَالْفَجْرِ", transliteration: "Wal-Fajr", english: "By the dawn", bengali: "শপথ ভোরের", audioUrl: getVerseAudioUrl(89, 1) },
      { number: 2, arabic: "وَلَيَالٍ عَشْرٍ", transliteration: "Wa layaalin 'ashr", english: "And by ten nights", bengali: "এবং দশ রাত্রির", audioUrl: getVerseAudioUrl(89, 2) },
      { number: 3, arabic: "وَالشَّفْعِ وَالْوَتْرِ", transliteration: "Wash shaf'i wal watr", english: "And by the even and the odd", bengali: "এবং জোড় ও বেজোড়ের", audioUrl: getVerseAudioUrl(89, 3) },
      { number: 4, arabic: "وَاللَّيْلِ إِذَا يَسْرِ", transliteration: "Wallaili izaa yasr", english: "And by the night when it passes", bengali: "এবং রাত্রির যখন তা বিদায় নেয়", audioUrl: getVerseAudioUrl(89, 4) },
      { number: 5, arabic: "هَلْ فِي ذَٰلِكَ قَسَمٌ لِّذِي حِجْرٍ", transliteration: "Hal fee zaalika qasamul lizee hijr", english: "Is there not in all that an oath sufficient for one of perception?", bengali: "এতে কি বিবেকবানদের জন্য যথেষ্ট শপথ নেই?", audioUrl: getVerseAudioUrl(89, 5) }
    ]
  },
  {
    surahNumber: 90,
    verses: [
      { number: 1, arabic: "لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ", transliteration: "Laaa uqsimu bihaazal balad", english: "I swear by this city, Makkah", bengali: "আমি শপথ করছি এই নগরীর", audioUrl: getVerseAudioUrl(90, 1) },
      { number: 2, arabic: "وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ", transliteration: "Wa anta hillum bihaazal balad", english: "And you, O Muhammad, are free of restriction in this city", bengali: "এবং তুমি এই নগরীতে অবস্থানকারী", audioUrl: getVerseAudioUrl(90, 2) },
      { number: 3, arabic: "وَوَالِدٍ وَمَا وَلَدَ", transliteration: "Wa waalidinw wa maa walad", english: "And by the father and that which was born of him", bengali: "এবং জনক ও তার সন্তানের", audioUrl: getVerseAudioUrl(90, 3) },
      { number: 4, arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي كَبَدٍ", transliteration: "Laqad khalaqnal insaana fee kabad", english: "We have certainly created man into hardship", bengali: "নিশ্চয়ই আমি মানুষকে কষ্টের মধ্যে সৃষ্টি করেছি", audioUrl: getVerseAudioUrl(90, 4) }
    ]
  },
  {
    surahNumber: 91,
    verses: [
      { number: 1, arabic: "وَالشَّمْسِ وَضُحَاهَا", transliteration: "Wash shamsi wa duhaahaa", english: "By the sun and its brightness", bengali: "শপথ সূর্যের ও তার উজ্জ্বলতার", audioUrl: getVerseAudioUrl(91, 1) },
      { number: 2, arabic: "وَالْقَمَرِ إِذَا تَلَاهَا", transliteration: "Wal qamari izaa talaahaa", english: "And by the moon when it follows it", bengali: "এবং চন্দ্রের যখন তা অনুসরণ করে", audioUrl: getVerseAudioUrl(91, 2) },
      { number: 3, arabic: "وَالنَّهَارِ إِذَا جَلَّاهَا", transliteration: "Wannahaari izaa jallaahaa", english: "And by the day when it displays it", bengali: "এবং দিবসের যখন তা প্রকাশ করে", audioUrl: getVerseAudioUrl(91, 3) },
      { number: 4, arabic: "وَاللَّيْلِ إِذَا يَغْشَاهَا", transliteration: "Wallaili izaa yaghshaahaa", english: "And by the night when it covers it", bengali: "এবং রাত্রির যখন তা আচ্ছন্ন করে", audioUrl: getVerseAudioUrl(91, 4) },
      { number: 5, arabic: "وَالسَّمَاءِ وَمَا بَنَاهَا", transliteration: "Wassamaaa'i wa maa banaahaa", english: "And by the sky and He who constructed it", bengali: "এবং আকাশের ও যিনি তা নির্মাণ করেছেন তাঁর", audioUrl: getVerseAudioUrl(91, 5) }
    ]
  },
  {
    surahNumber: 92,
    verses: [
      { number: 1, arabic: "وَاللَّيْلِ إِذَا يَغْشَىٰ", transliteration: "Wallaili izaa yaghshaa", english: "By the night when it covers", bengali: "শপথ রাত্রির যখন তা আচ্ছন্ন করে", audioUrl: getVerseAudioUrl(92, 1) },
      { number: 2, arabic: "وَالنَّهَارِ إِذَا تَجَلَّىٰ", transliteration: "Wannahaari izaa tajallaa", english: "And by the day when it appears", bengali: "এবং দিবসের যখন তা উদ্ভাসিত হয়", audioUrl: getVerseAudioUrl(92, 2) },
      { number: 3, arabic: "وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ", transliteration: "Wa maa khalaqaz zakara wal unsaa", english: "And by He who created male and female", bengali: "এবং যিনি পুরুষ ও নারী সৃষ্টি করেছেন তাঁর", audioUrl: getVerseAudioUrl(92, 3) },
      { number: 4, arabic: "إِنَّ سَعْيَكُمْ لَشَتَّىٰ", transliteration: "Inna sa'yakum lashattaa", english: "Indeed, your efforts are diverse", bengali: "নিশ্চয়ই তোমাদের প্রচেষ্টা বিভিন্ন ধরনের", audioUrl: getVerseAudioUrl(92, 4) }
    ]
  },
  {
    surahNumber: 93,
    verses: [
      { number: 1, arabic: "وَالضُّحَىٰ", transliteration: "Wad duhaa", english: "By the morning brightness", bengali: "শপথ পূর্বাহ্নের", audioUrl: getVerseAudioUrl(93, 1) },
      { number: 2, arabic: "وَاللَّيْلِ إِذَا سَجَىٰ", transliteration: "Wallaili izaa sajaa", english: "And by the night when it covers with darkness", bengali: "এবং রাত্রির যখন তা নিঝুম হয়", audioUrl: getVerseAudioUrl(93, 2) },
      { number: 3, arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", transliteration: "Maa wadda'aka rabbuka wa maa qalaa", english: "Your Lord has not taken leave of you, nor has He detested you", bengali: "তোমার প্রভু তোমাকে ত্যাগ করেননি এবং তোমাকে অপছন্দও করেননি", audioUrl: getVerseAudioUrl(93, 3) },
      { number: 4, arabic: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", transliteration: "Wa lal-aakhiratu khairul laka minal oolaa", english: "And the Hereafter is better for you than the first life", bengali: "এবং পরকাল তোমার জন্য ইহকাল অপেক্ষা উত্তম", audioUrl: getVerseAudioUrl(93, 4) },
      { number: 5, arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", transliteration: "Wa lasawfa yu'teeka rabbuka fatardaa", english: "And your Lord is going to give you, and you will be satisfied", bengali: "এবং তোমার প্রভু অচিরেই তোমাকে এত দেবেন যে তুমি সন্তুষ্ট হয়ে যাবে", audioUrl: getVerseAudioUrl(93, 5) }
    ]
  },
  {
    surahNumber: 94,
    verses: [
      { number: 1, arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", transliteration: "Alam nashrah laka sadrak", english: "Did We not expand for you your breast?", bengali: "আমি কি তোমার বুক খুলে দিইনি?", audioUrl: getVerseAudioUrl(94, 1) },
      { number: 2, arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", transliteration: "Wa wada'naa 'anka wizrak", english: "And We removed from you your burden", bengali: "এবং তোমার থেকে সেই বোঝা নামিয়ে দিয়েছি", audioUrl: getVerseAudioUrl(94, 2) },
      { number: 3, arabic: "الَّذِي أَنقَضَ ظَهْرَكَ", transliteration: "Allazee anqada zahrak", english: "Which had weighed upon your back", bengali: "যা তোমার পিঠ ভেঙে দিচ্ছিল", audioUrl: getVerseAudioUrl(94, 3) },
      { number: 4, arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", transliteration: "Wa raf'anaa laka zikrak", english: "And raised high for you your repute", bengali: "এবং তোমার খ্যাতি উচ্চ করেছি", audioUrl: getVerseAudioUrl(94, 4) },
      { number: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", transliteration: "Fa inna ma'al 'usri yusraa", english: "For indeed, with hardship will be ease", bengali: "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে", audioUrl: getVerseAudioUrl(94, 5) },
      { number: 6, arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", transliteration: "Inna ma'al 'usri yusraa", english: "Indeed, with hardship will be ease", bengali: "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে", audioUrl: getVerseAudioUrl(94, 6) },
      { number: 7, arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", transliteration: "Fa izaa faraghta fansab", english: "So when you have finished your duties, then stand up for worship", bengali: "সুতরাং যখন তুমি অবসর পাও, তখন ইবাদতে রত হও", audioUrl: getVerseAudioUrl(94, 7) },
      { number: 8, arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", transliteration: "Wa ilaa rabbika farghab", english: "And to your Lord direct your longing", bengali: "এবং তোমার প্রভুর প্রতি মনোযোগী হও", audioUrl: getVerseAudioUrl(94, 8) }
    ]
  },
  {
    surahNumber: 95,
    verses: [
      { number: 1, arabic: "وَالتِّينِ وَالزَّيْتُونِ", transliteration: "Watteeni wazzaytoon", english: "By the fig and the olive", bengali: "শপথ ডুমুর ও যয়তুনের", audioUrl: getVerseAudioUrl(95, 1) },
      { number: 2, arabic: "وَطُورِ سِينِينَ", transliteration: "Wa toori sineen", english: "And by Mount Sinai", bengali: "এবং সিনাই পর্বতের", audioUrl: getVerseAudioUrl(95, 2) },
      { number: 3, arabic: "وَهَٰذَا الْبَلَدِ الْأَمِينِ", transliteration: "Wa haazal baladil ameen", english: "And by this secure city Makkah", bengali: "এবং এই নিরাপদ নগরীর", audioUrl: getVerseAudioUrl(95, 3) },
      { number: 4, arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ", transliteration: "Laqad khalaqnal insaana fee ahsani taqweem", english: "We have certainly created man in the best of stature", bengali: "নিশ্চয়ই আমি মানুষকে সর্বোত্তম আকৃতিতে সৃষ্টি করেছি", audioUrl: getVerseAudioUrl(95, 4) },
      { number: 5, arabic: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", transliteration: "Summa ra dad naahu asfala saafileen", english: "Then We return him to the lowest of the low", bengali: "তারপর তাকে নিম্নতম অবস্থানে ফিরিয়ে দিই", audioUrl: getVerseAudioUrl(95, 5) },
      { number: 6, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", transliteration: "Illal lazeena aamanoo wa 'amilus saalihaati falahum ajrun ghairu mamnoon", english: "Except for those who believe and do righteous deeds, for they will have a reward uninterrupted", bengali: "তবে যারা ঈমান আনে ও সৎকর্ম করে, তাদের জন্য রয়েছে অশেষ পুরস্কার", audioUrl: getVerseAudioUrl(95, 6) },
      { number: 7, arabic: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", transliteration: "Famaa yukazzibuka ba'du biddeen", english: "So what yet causes you to deny the Recompense?", bengali: "তাহলে এরপরও কোন জিনিস তোমাকে বিচার দিবসে মিথ্যারোপ করায়?", audioUrl: getVerseAudioUrl(95, 7) },
      { number: 8, arabic: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", transliteration: "Alaisal laahu bi-ahkamil haakimeen", english: "Is not Allah the most just of judges?", bengali: "আল্লাহ কি সর্বশ্রেষ্ঠ বিচারক নন?", audioUrl: getVerseAudioUrl(95, 8) }
    ]
  },
  {
    surahNumber: 96,
    verses: [
      { number: 1, arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", transliteration: "Iqra' bismi Rabbikal lazee khalaq", english: "Read in the name of your Lord who created", bengali: "পড় তোমার প্রভুর নামে যিনি সৃষ্টি করেছেন", audioUrl: getVerseAudioUrl(96, 1) },
      { number: 2, arabic: "خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ", transliteration: "Khalaqal insaana min 'alaq", english: "Created man from a clinging substance", bengali: "মানুষকে সৃষ্টি করেছেন জমাট রক্ত থেকে", audioUrl: getVerseAudioUrl(96, 2) },
      { number: 3, arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ", transliteration: "Iqra' wa rabbukal akram", english: "Read, and your Lord is the Most Generous", bengali: "পড়, তোমার প্রভু মহা সম্মানিত", audioUrl: getVerseAudioUrl(96, 3) },
      { number: 4, arabic: "الَّذِي عَلَّمَ بِالْقَلَمِ", transliteration: "Allazee 'allama bil qalam", english: "Who taught by the pen", bengali: "যিনি কলমের সাহায্যে শিক্ষা দিয়েছেন", audioUrl: getVerseAudioUrl(96, 4) },
      { number: 5, arabic: "عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ", transliteration: "'Allamal insaana maa lam ya'lam", english: "Taught man that which he knew not", bengali: "মানুষকে শিক্ষা দিয়েছেন যা সে জানত না", audioUrl: getVerseAudioUrl(96, 5) }
    ]
  },
  {
    surahNumber: 97,
    verses: [
      { number: 1, arabic: "إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", transliteration: "Innaa anzalnaahu fee laylatil-qadr", english: "Indeed, We sent it down during the Night of Decree", bengali: "নিশ্চয়ই আমি একে নাযিল করেছি লাইলাতুল কদরে", audioUrl: getVerseAudioUrl(97, 1) },
      { number: 2, arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", transliteration: "Wa maa adraaka maa laylatul-qadr", english: "And what can make you know what is the Night of Decree?", bengali: "এবং তুমি কি জান লাইলাতুল কদর কী?", audioUrl: getVerseAudioUrl(97, 2) },
      { number: 3, arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ", transliteration: "Laylatul-qadri khayrum-min alfi shahr", english: "The Night of Decree is better than a thousand months", bengali: "লাইলাতুল কদর হাজার মাসের চেয়ে উত্তম", audioUrl: getVerseAudioUrl(97, 3) },
      { number: 4, arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ", transliteration: "Tanazzalul-malaa'ikatu war-ruuhu feeha bi-izni rabbihim min kulli amr", english: "The angels and the Spirit descend therein by permission of their Lord for every matter", bengali: "এতে ফেরেশতাগণ ও রূহ তাদের প্রভুর অনুমতিক্রমে প্রতিটি বিষয়ে অবতীর্ণ হন", audioUrl: getVerseAudioUrl(97, 4) },
      { number: 5, arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", transliteration: "Salaamun hiya hattaa matla'il-fajr", english: "Peace it is until the emergence of dawn", bengali: "শান্তি, এটা ফজরের উদয় পর্যন্ত", audioUrl: getVerseAudioUrl(97, 5) }
    ]
  },
  {
    surahNumber: 98,
    verses: [
      { number: 1, arabic: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ", transliteration: "Lam yakunil lazeena kafaroo min ahlil kitaabi wal mushrikeena munfakkeena hattaa ta'tiyahumul bayyinah", english: "Those who disbelieved among the People of the Scripture and the polytheists were not to be parted from misbelief until there came to them clear evidence", bengali: "আহলে কিতাব ও মুশরিকদের মধ্যে যারা কুফরি করেছে, তারা বিরত হওয়ার নয় যতক্ষণ না তাদের কাছে সুস্পষ্ট প্রমাণ আসে", audioUrl: getVerseAudioUrl(98, 1) },
      { number: 2, arabic: "رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً", transliteration: "Rasoolum minal laahi yatloo suhufam mutahharah", english: "A Messenger from Allah, reciting purified scriptures", bengali: "আল্লাহর পক্ষ থেকে একজন রাসূল, যিনি পবিত্র সহীফাসমূহ তিলাওয়াত করেন", audioUrl: getVerseAudioUrl(98, 2) },
      { number: 3, arabic: "فِيهَا كُتُبٌ قَيِّمَةٌ", transliteration: "Feehaa kutubun qaiyimah", english: "Within which are correct writings", bengali: "এতে রয়েছে সুপ্রতিষ্ঠিত বিধান", audioUrl: getVerseAudioUrl(98, 3) }
    ]
  },
  {
    surahNumber: 99,
    verses: [
      { number: 1, arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", transliteration: "Iza zulzilatil-ardu zilzaalaha", english: "When the earth is shaken with its final earthquake", bengali: "যখন পৃথিবী তার কম্পনে প্রকম্পিত হবে", audioUrl: getVerseAudioUrl(99, 1) },
      { number: 2, arabic: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", transliteration: "Wa akhrajatil-ardu athqaalaha", english: "And the earth discharges its burdens", bengali: "এবং পৃথিবী তার ভার বের করে দেবে", audioUrl: getVerseAudioUrl(99, 2) },
      { number: 3, arabic: "وَقَالَ الْإِنْسَانُ مَا لَهَا", transliteration: "Wa qaalal-insaanu maa lahaa", english: "And man says, What is wrong with it?", bengali: "এবং মানুষ বলবে, এর কী হয়েছে?", audioUrl: getVerseAudioUrl(99, 3) },
      { number: 4, arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", transliteration: "Yawma'izin tuhad-dithu akhbaaraha", english: "That Day, it will report its news", bengali: "সেদিন সে তার সংবাদ বর্ণনা করবে", audioUrl: getVerseAudioUrl(99, 4) },
      { number: 5, arabic: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", transliteration: "Bi-anna rabbaka awhaa laha", english: "Because your Lord has commanded it", bengali: "কেননা তোমার প্রভু তাকে আদেশ করেছেন", audioUrl: getVerseAudioUrl(99, 5) },
      { number: 6, arabic: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ", transliteration: "Yawma'izin yasdrun-naasu ashtaatal-liyuraw a'maalahum", english: "That Day, the people will depart separated to be shown their deeds", bengali: "সেদিন মানুষ বিভিন্ন দলে বের হবে তাদের কাজ দেখানোর জন্য", audioUrl: getVerseAudioUrl(99, 6) },
      { number: 7, arabic: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", transliteration: "Fa man ya'mal mithqaala zarratin khayran yarah", english: "So whoever does an atom's weight of good will see it", bengali: "যে অণু পরিমাণ ভালো কাজ করবে সে তা দেখবে", audioUrl: getVerseAudioUrl(99, 7) },
      { number: 8, arabic: "وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", transliteration: "Wa man ya'mal mithqaala zarratin sharran yarah", english: "And whoever does an atom's weight of evil will see it", bengali: "এবং যে অণু পরিমাণ মন্দ কাজ করবে সে তাও দেখবে", audioUrl: getVerseAudioUrl(99, 8) }
    ]
  },
  {
    surahNumber: 100,
    verses: [
      { number: 1, arabic: "وَالْعَادِيَاتِ ضَبْحًا", transliteration: "Wal-'aadiyaati dabha", english: "By the racers, panting", bengali: "শপথ হাঁপাতে হাঁপাতে ধাবমান অশ্বসমূহের", audioUrl: getVerseAudioUrl(100, 1) },
      { number: 2, arabic: "فَالْمُورِيَاتِ قَدْحًا", transliteration: "Fal-mooriyaati qadha", english: "And the producers of sparks when striking", bengali: "অতঃপর যারা স্ফুলিঙ্গ বের করে", audioUrl: getVerseAudioUrl(100, 2) },
      { number: 3, arabic: "فَالْمُغِيرَاتِ صُبْحًا", transliteration: "Fal-mugheeraati subha", english: "And the chargers at dawn", bengali: "অতঃপর যারা ভোরে আক্রমণ করে", audioUrl: getVerseAudioUrl(100, 3) },
      { number: 4, arabic: "فَأَثَرْنَ بِهِ نَقْعًا", transliteration: "Fa-atharna bihi naq'a", english: "Stirring up thereby clouds of dust", bengali: "অতঃপর ধূলা উড়িয়ে দেয়", audioUrl: getVerseAudioUrl(100, 4) },
      { number: 5, arabic: "فَوَسَطْنَ بِهِ جَمْعًا", transliteration: "Fawasatna bihi jam'a", english: "Arriving thereby in the center collectively", bengali: "অতঃপর শত্রুদলের মধ্যে ঢুকে পড়ে", audioUrl: getVerseAudioUrl(100, 5) },
      { number: 6, arabic: "إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ", transliteration: "Innal-insaana li-rabbihee lakanood", english: "Indeed mankind, to his Lord, is ungrateful", bengali: "নিশ্চয়ই মানুষ তার প্রভুর প্রতি অকৃতজ্ঞ", audioUrl: getVerseAudioUrl(100, 6) },
      { number: 7, arabic: "وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ", transliteration: "Wa innahu 'alaa zaalika la-shaheed", english: "And indeed, he is to that a witness", bengali: "এবং সে নিজেই তার সাক্ষী", audioUrl: getVerseAudioUrl(100, 7) },
      { number: 8, arabic: "وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ", transliteration: "Wa innahu li-hubbil-khayri la-shadeed", english: "And indeed he is, in love of wealth, intense", bengali: "এবং সে সম্পদের ভালোবাসায় অতিশয় কঠোর", audioUrl: getVerseAudioUrl(100, 8) },
      { number: 9, arabic: "أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ", transliteration: "Afalaa ya'lamu izaa bu'thira maa fil-quboor", english: "But does he not know that when the contents of the graves are scattered", bengali: "সে কি জানে না যখন কবরে যা আছে তা বের করা হবে", audioUrl: getVerseAudioUrl(100, 9) },
      { number: 10, arabic: "وَحُصِّلَ مَا فِي الصُّدُورِ", transliteration: "Wa hussila maa fis-sudoor", english: "And that within the breasts is obtained", bengali: "এবং অন্তরে যা আছে তা প্রকাশ করা হবে", audioUrl: getVerseAudioUrl(100, 10) },
      { number: 11, arabic: "إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ", transliteration: "Inna rabbahum bihim yawma'izil-la-khabeer", english: "Indeed, their Lord with them, that Day, is fully Aware", bengali: "নিশ্চয়ই সেদিন তাদের প্রভু তাদের সম্পর্কে পূর্ণ অবহিত", audioUrl: getVerseAudioUrl(100, 11) }
    ]
  },
  {
    surahNumber: 101,
    verses: [
      { number: 1, arabic: "الْقَارِعَةُ", transliteration: "Al-Qaari'ah", english: "The Striking Calamity", bengali: "মহাবিপদ", audioUrl: getVerseAudioUrl(101, 1) },
      { number: 2, arabic: "مَا الْقَارِعَةُ", transliteration: "Mal-Qaari'ah", english: "What is the Striking Calamity?", bengali: "মহাবিপদ কী?", audioUrl: getVerseAudioUrl(101, 2) },
      { number: 3, arabic: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", transliteration: "Wa maa adraaka mal-Qaari'ah", english: "And what can make you know what is the Striking Calamity?", bengali: "এবং তুমি কি জান মহাবিপদ কী?", audioUrl: getVerseAudioUrl(101, 3) },
      { number: 4, arabic: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", transliteration: "Yawma yakoonun-naasu kal-faraashil-mabthooth", english: "It is the Day when people will be like moths, dispersed", bengali: "সেদিন মানুষ হবে বিক্ষিপ্ত পতঙ্গের মত", audioUrl: getVerseAudioUrl(101, 4) },
      { number: 5, arabic: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ", transliteration: "Wa takoonul-jibaalu kal-'ihnil-manfoosh", english: "And the mountains will be like wool, fluffed up", bengali: "এবং পাহাড়সমূহ হবে ধুনিত পশমের মত", audioUrl: getVerseAudioUrl(101, 5) },
      { number: 6, arabic: "فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ", transliteration: "Fa-amma man thaqulat mawazeenuh", english: "Then as for one whose scales are heavy", bengali: "অতঃপর যার পাল্লা ভারী হবে", audioUrl: getVerseAudioUrl(101, 6) },
      { number: 7, arabic: "فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ", transliteration: "Fahuwa fee 'eeshatir-raadiyah", english: "He will be in a pleasant life", bengali: "সে সুখী জীবনে থাকবে", audioUrl: getVerseAudioUrl(101, 7) },
      { number: 8, arabic: "وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ", transliteration: "Wa amma man khaffat mawazeenuh", english: "But as for one whose scales are light", bengali: "কিন্তু যার পাল্লা হালকা হবে", audioUrl: getVerseAudioUrl(101, 8) },
      { number: 9, arabic: "فَأُمُّهُ هَاوِيَةٌ", transliteration: "Fa-ummuhoo haawiyah", english: "His refuge will be an abyss", bengali: "তার আশ্রয়স্থল হবে হাবিয়া", audioUrl: getVerseAudioUrl(101, 9) },
      { number: 10, arabic: "وَمَا أَدْرَاكَ مَا هِيَهْ", transliteration: "Wa maa adraaka maa hiyah", english: "And what can make you know what that is?", bengali: "এবং তুমি কি জান সেটা কী?", audioUrl: getVerseAudioUrl(101, 10) },
      { number: 11, arabic: "نَارٌ حَامِيَةٌ", transliteration: "Naarun haamiyah", english: "It is a Fire, intensely hot", bengali: "এটা প্রজ্বলিত আগুন", audioUrl: getVerseAudioUrl(101, 11) }
    ]
  },
  {
    surahNumber: 102,
    verses: [
      { number: 1, arabic: "أَلْهَاكُمُ التَّكَاثُرُ", transliteration: "Alhaakumut-takaathur", english: "Competition in worldly increase diverts you", bengali: "প্রাচুর্যের প্রতিযোগিতা তোমাদের মোহাচ্ছন্ন করে রেখেছে", audioUrl: getVerseAudioUrl(102, 1) },
      { number: 2, arabic: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", transliteration: "Hattaa zurtumul-maqaabir", english: "Until you visit the graveyards", bengali: "যতক্ষণ না তোমরা কবরে পৌঁছাও", audioUrl: getVerseAudioUrl(102, 2) },
      { number: 3, arabic: "كَلَّا سَوْفَ تَعْلَمُونَ", transliteration: "Kallaa sawfa ta'lamuun", english: "No! You are going to know", bengali: "কখনো না! তোমরা শীঘ্রই জানতে পারবে", audioUrl: getVerseAudioUrl(102, 3) },
      { number: 4, arabic: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", transliteration: "Thumma kallaa sawfa ta'lamuun", english: "Then no! You are going to know", bengali: "আবারও না! তোমরা শীঘ্রই জানতে পারবে", audioUrl: getVerseAudioUrl(102, 4) },
      { number: 5, arabic: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", transliteration: "Kallaa law ta'lamuuna 'ilmal-yaqeen", english: "No! If you only knew with knowledge of certainty", bengali: "কখনো না! যদি তোমরা নিশ্চিত জ্ঞান রাখতে", audioUrl: getVerseAudioUrl(102, 5) },
      { number: 6, arabic: "لَتَرَوُنَّ الْجَحِيمَ", transliteration: "Latarawunnal-jaheem", english: "You will surely see the Hellfire", bengali: "তাহলে অবশ্যই তোমরা জাহান্নাম দেখতে পাবে", audioUrl: getVerseAudioUrl(102, 6) },
      { number: 7, arabic: "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ", transliteration: "Thumma latarawunnaha 'aynal-yaqeen", english: "Then you will surely see it with the eye of certainty", bengali: "তারপর তোমরা অবশ্যই তা নিশ্চিত চোখে দেখবে", audioUrl: getVerseAudioUrl(102, 7) },
      { number: 8, arabic: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ", transliteration: "Thumma latus'alunna yawma'izin 'anin-na'eem", english: "Then you will surely be asked that Day about pleasure", bengali: "তারপর সেদিন তোমাদের অবশ্যই নেয়ামত সম্পর্কে জিজ্ঞাসা করা হবে", audioUrl: getVerseAudioUrl(102, 8) }
    ]
  },
  {
    surahNumber: 103,
    verses: [
      { number: 1, arabic: "وَالْعَصْرِ", transliteration: "Wal-'asr", english: "By time", bengali: "সময়ের শপথ", audioUrl: getVerseAudioUrl(103, 1) },
      { number: 2, arabic: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", transliteration: "Innal-insaana lafee khusr", english: "Indeed, mankind is in loss", bengali: "নিশ্চয়ই মানুষ ক্ষতির মধ্যে আছে", audioUrl: getVerseAudioUrl(103, 2) },
      { number: 3, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", transliteration: "Illal-lazeena aamanu wa 'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr", english: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience", bengali: "কিন্তু তারা ছাড়া যারা ঈমান এনেছে, সৎকর্ম করেছে, একে অপরকে সত্যের উপদেশ দিয়েছে এবং ধৈর্যের উপদেশ দিয়েছে", audioUrl: getVerseAudioUrl(103, 3) }
    ]
  },
  {
    surahNumber: 104,
    verses: [
      { number: 1, arabic: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ", transliteration: "Waylul-li-kulli humazatil-lumaza", english: "Woe to every scorner and mocker", bengali: "ধ্বংস প্রত্যেক পরনিন্দাকারী ও দোষারোপকারীর জন্য", audioUrl: getVerseAudioUrl(104, 1) },
      { number: 2, arabic: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", transliteration: "Allazee jama'a maalaw-wa 'addadah", english: "Who collects wealth and continuously counts it", bengali: "যে সম্পদ জমা করে এবং তা গণনা করে", audioUrl: getVerseAudioUrl(104, 2) },
      { number: 3, arabic: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", transliteration: "Yahsabu anna maalahu akhladah", english: "He thinks that his wealth will make him immortal", bengali: "সে মনে করে তার সম্পদ তাকে অমর করে দেবে", audioUrl: getVerseAudioUrl(104, 3) },
      { number: 4, arabic: "كَلَّا ۖ لَيُنْبَذَنَّ فِي الْحُطَمَةِ", transliteration: "Kallaa! Layunbazanna fil-hutamah", english: "No! He will surely be thrown into the Crusher", bengali: "কখনো না! সে অবশ্যই হুতামায় নিক্ষিপ্ত হবে", audioUrl: getVerseAudioUrl(104, 4) },
      { number: 5, arabic: "وَمَا أَدْرَاكَ مَا الْحُطَمَةُ", transliteration: "Wa maa adraaka mal-hutamah", english: "And what can make you know what is the Crusher?", bengali: "এবং তুমি কি জান হুতামা কী?", audioUrl: getVerseAudioUrl(104, 5) },
      { number: 6, arabic: "نَارُ اللَّهِ الْمُوقَدَةُ", transliteration: "Naaarul-laahil-mooqadah", english: "It is the fire of Allah, kindled", bengali: "এটা আল্লাহর প্রজ্বলিত আগুন", audioUrl: getVerseAudioUrl(104, 6) },
      { number: 7, arabic: "الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ", transliteration: "Allatee tattali'u 'alal-af'idah", english: "Which mounts directed at the hearts", bengali: "যা অন্তর পর্যন্ত পৌঁছে যাবে", audioUrl: getVerseAudioUrl(104, 7) },
      { number: 8, arabic: "إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ", transliteration: "Innahaa 'alayhim mu'sadah", english: "Indeed, it will be closed down upon them", bengali: "নিশ্চয়ই তা তাদের উপর বন্ধ করে দেওয়া হবে", audioUrl: getVerseAudioUrl(104, 8) },
      { number: 9, arabic: "فِي عَمَدٍ مُمَدَّدَةٍ", transliteration: "Fee 'amadim-mumaddadah", english: "In extended columns", bengali: "দীর্ঘ স্তম্ভসমূহে", audioUrl: getVerseAudioUrl(104, 9) }
    ]
  },
  {
    surahNumber: 105,
    verses: [
      { number: 1, arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", transliteration: "Alam tara kayfa fa'ala rabbuka bi-ashaabil-feel", english: "Have you not considered how your Lord dealt with the companions of the elephant?", bengali: "তুমি কি দেখনি তোমার প্রভু হাতির অধিপতিদের সাথে কীরূপ আচরণ করেছিলেন?", audioUrl: getVerseAudioUrl(105, 1) },
      { number: 2, arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", transliteration: "Alam yaj'al kaydahum fee tadleel", english: "Did He not make their plan into misguidance?", bengali: "তিনি কি তাদের ষড়যন্ত্র ব্যর্থ করে দেননি?", audioUrl: getVerseAudioUrl(105, 2) },
      { number: 3, arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", transliteration: "Wa arsala 'alayhim tayran abaabeel", english: "And He sent against them birds in flocks", bengali: "এবং তিনি তাদের উপর ঝাঁকে ঝাঁকে পাখি পাঠিয়েছিলেন", audioUrl: getVerseAudioUrl(105, 3) },
      { number: 4, arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", transliteration: "Tarmeehim bihijaaratim min sijjeel", english: "Striking them with stones of hard clay", bengali: "তারা তাদের উপর পোড়ামাটির পাথর নিক্ষেপ করছিল", audioUrl: getVerseAudioUrl(105, 4) },
      { number: 5, arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ", transliteration: "Faja'alahum ka'asfim ma'kool", english: "And He made them like eaten straw", bengali: "অতঃপর তিনি তাদেরকে ভক্ষিত তৃণের মত করে দিলেন", audioUrl: getVerseAudioUrl(105, 5) }
    ]
  },
  {
    surahNumber: 106,
    verses: [
      { number: 1, arabic: "لِإِيلَافِ قُرَيْشٍ", transliteration: "Li-eelaafi Quraysh", english: "For the accustomed security of the Quraysh", bengali: "কুরাইশের সুরক্ষার জন্য", audioUrl: getVerseAudioUrl(106, 1) },
      { number: 2, arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", transliteration: "Eelaafihim rihlatash-shitaa'i was-sayf", english: "Their accustomed security in the caravan of winter and summer", bengali: "তাদের শীত ও গ্রীষ্মকালীন ভ্রমণের সুরক্ষা", audioUrl: getVerseAudioUrl(106, 2) },
      { number: 3, arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", transliteration: "Falya'budoo rabba haazal-bayt", english: "Let them worship the Lord of this House", bengali: "সুতরাং তারা যেন এই ঘরের প্রভুর ইবাদত করে", audioUrl: getVerseAudioUrl(106, 3) },
      { number: 4, arabic: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", transliteration: "Allazeee at'amahum min joo'in wa aamanahum min khawf", english: "Who has fed them against hunger and made them safe from fear", bengali: "যিনি তাদেরকে ক্ষুধায় অন্ন দিয়েছেন এবং ভয় থেকে নিরাপত্তা দিয়েছেন", audioUrl: getVerseAudioUrl(106, 4) }
    ]
  },
  {
    surahNumber: 107,
    verses: [
      { number: 1, arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", transliteration: "Ara'aytal-lazee yukaz-zibu bid-deen", english: "Have you seen the one who denies the Recompense?", bengali: "তুমি কি তাকে দেখেছ যে দ্বীনকে অস্বীকার করে?", audioUrl: getVerseAudioUrl(107, 1) },
      { number: 2, arabic: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", transliteration: "Fazaalikal-lazee yadu'-'ul-yateem", english: "For that is the one who drives away the orphan", bengali: "সে সেই ব্যক্তি যে এতিমকে ধাক্কা দেয়", audioUrl: getVerseAudioUrl(107, 2) },
      { number: 3, arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", transliteration: "Wa laa yahuddu 'alaa ta'aamil-miskeen", english: "And does not encourage the feeding of the poor", bengali: "এবং মিসকীনকে খাওয়ানোর জন্য উৎসাহিত করে না", audioUrl: getVerseAudioUrl(107, 3) },
      { number: 4, arabic: "فَوَيْلٌ لِلْمُصَلِّينَ", transliteration: "Fa waylul-lil-musalleen", english: "So woe to those who pray", bengali: "সুতরাং ধ্বংস সেই নামাজীদের জন্য", audioUrl: getVerseAudioUrl(107, 4) },
      { number: 5, arabic: "الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ", transliteration: "Allazeena hum 'an salaatihim saahuun", english: "Who are heedless of their prayer", bengali: "যারা তাদের নামাজ সম্পর্কে উদাসীন", audioUrl: getVerseAudioUrl(107, 5) },
      { number: 6, arabic: "الَّذِينَ هُمْ يُرَاءُونَ", transliteration: "Allazeena hum yuraa'uun", english: "Those who make show of their deeds", bengali: "যারা লোক দেখানোর জন্য কাজ করে", audioUrl: getVerseAudioUrl(107, 6) },
      { number: 7, arabic: "وَيَمْنَعُونَ الْمَاعُونَ", transliteration: "Wa yamna'uunal-maa'uun", english: "And withhold simple assistance", bengali: "এবং সামান্য সাহায্য দানেও বিরত থাকে", audioUrl: getVerseAudioUrl(107, 7) }
    ]
  },
  {
    surahNumber: 108,
    verses: [
      { number: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", transliteration: "Innaa a'taynakal kawthar", english: "Indeed, We have granted you al-Kawthar", bengali: "নিশ্চয়ই আমি আপনাকে কাওসার দান করেছি", audioUrl: getVerseAudioUrl(108, 1) },
      { number: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", transliteration: "Fasalli li rabbika wanhar", english: "So pray to your Lord and sacrifice", bengali: "অতএব আপনার প্রভুর জন্য নামাজ পড়ুন এবং কুরবানি করুন", audioUrl: getVerseAudioUrl(108, 2) },
      { number: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", transliteration: "Inna shaani-aka huwal abtar", english: "Indeed, your enemy is the one cut off", bengali: "নিশ্চয়ই আপনার শত্রুই নির্বংশ", audioUrl: getVerseAudioUrl(108, 3) }
    ]
  },
  {
    surahNumber: 109,
    verses: [
      { number: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", transliteration: "Qul yaa ayyuhal-kaafiruun", english: "Say, O disbelievers", bengali: "বলুন, হে কাফিরগণ", audioUrl: getVerseAudioUrl(109, 1) },
      { number: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", transliteration: "Laa a'budu maa ta'buduun", english: "I do not worship what you worship", bengali: "আমি তার ইবাদত করি না যার ইবাদত তোমরা কর", audioUrl: getVerseAudioUrl(109, 2) },
      { number: 3, arabic: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa laa antum 'aabiduuna maa a'bud", english: "Nor are you worshippers of what I worship", bengali: "এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি", audioUrl: getVerseAudioUrl(109, 3) },
      { number: 4, arabic: "وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ", transliteration: "Wa laa ana 'aabidun maa 'abadtum", english: "Nor will I be a worshipper of what you worship", bengali: "এবং আমি ইবাদতকারী নই তার যার ইবাদত তোমরা কর", audioUrl: getVerseAudioUrl(109, 4) },
      { number: 5, arabic: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa laa antum 'aabiduuna maa a'bud", english: "Nor will you be worshippers of what I worship", bengali: "এবং তোমরা ইবাদতকারী নও তাঁর যাঁর ইবাদত আমি করি", audioUrl: getVerseAudioUrl(109, 5) },
      { number: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", transliteration: "Lakum deenukum wa liya deen", english: "For you is your religion, and for me is my religion", bengali: "তোমাদের জন্য তোমাদের ধর্ম এবং আমার জন্য আমার ধর্ম", audioUrl: getVerseAudioUrl(109, 6) }
    ]
  },
  {
    surahNumber: 110,
    verses: [
      { number: 1, arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", transliteration: "Iza jaa'a nasrul-laahi wal-fath", english: "When the victory of Allah has come and the conquest", bengali: "যখন আল্লাহর সাহায্য ও বিজয় আসবে", audioUrl: getVerseAudioUrl(110, 1) },
      { number: 2, arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", transliteration: "Wa ra-aytan naasa yadkhuloona fee deenil-laahi afwaaja", english: "And you see the people entering into the religion of Allah in multitudes", bengali: "এবং তুমি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবে", audioUrl: getVerseAudioUrl(110, 2) },
      { number: 3, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", transliteration: "Fasabbih bihamdi rabbika wastaghfirh, innahu kaana tawwaaba", english: "Then exalt with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance", bengali: "তখন তোমার প্রভুর প্রশংসাসহ তাঁর পবিত্রতা ঘোষণা কর এবং তাঁর কাছে ক্ষমা প্রার্থনা কর। নিশ্চয়ই তিনি অত্যন্ত তওবা কবুলকারী", audioUrl: getVerseAudioUrl(110, 3) }
    ]
  },
  {
    surahNumber: 111,
    verses: [
      { number: 1, arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", transliteration: "Tabbat yadaa abee lahabin wa tabb", english: "May the hands of Abu Lahab be ruined, and ruined is he", bengali: "আবু লাহাবের দুই হাত ধ্বংস হোক এবং সে ধ্বংস হোক", audioUrl: getVerseAudioUrl(111, 1) },
      { number: 2, arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", transliteration: "Maa aghnaa 'anhu maaluhu wa maa kasab", english: "His wealth will not avail him or that which he gained", bengali: "তার সম্পদ ও তার উপার্জন তার কোন কাজে আসেনি", audioUrl: getVerseAudioUrl(111, 2) },
      { number: 3, arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", transliteration: "Sayaslaa naaran zaata lahab", english: "He will burn in a Fire of blazing flame", bengali: "সে অচিরেই লেলিহান আগুনে প্রবেশ করবে", audioUrl: getVerseAudioUrl(111, 3) },
      { number: 4, arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", transliteration: "Wamra-atuhu hammaalatal-hatab", english: "And his wife, the carrier of firewood", bengali: "এবং তার স্ত্রীও, যে কাঠ বহনকারী", audioUrl: getVerseAudioUrl(111, 4) },
      { number: 5, arabic: "فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ", transliteration: "Fee jeediha hablum mim-masad", english: "Around her neck is a rope of palm fiber", bengali: "তার গলায় থাকবে খেজুরের আঁশের রশি", audioUrl: getVerseAudioUrl(111, 5) }
    ]
  },
  {
    surahNumber: 112,
    verses: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwal laahu ahad", english: "Say, He is Allah, the One", bengali: "বলুন, তিনি আল্লাহ, এক", audioUrl: getVerseAudioUrl(112, 1) },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allahus-samad", english: "Allah, the Eternal Refuge", bengali: "আল্লাহ অমুখাপেক্ষী", audioUrl: getVerseAudioUrl(112, 2) },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yoolad", english: "He neither begets nor is born", bengali: "তিনি কাউকে জন্ম দেননি এবং কেউ তাঁকে জন্ম দেয়নি", audioUrl: getVerseAudioUrl(112, 3) },
      { number: 4, arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahu kufuwan ahad", english: "Nor is there to Him any equivalent", bengali: "এবং তাঁর সমতুল্য কেউ নেই", audioUrl: getVerseAudioUrl(112, 4) }
    ]
  },
  {
    surahNumber: 113,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'oozu bi rabbil-falaq", english: "Say, I seek refuge in the Lord of daybreak", bengali: "বলুন, আমি আশ্রয় চাই ভোরের প্রভুর", audioUrl: getVerseAudioUrl(113, 1) },
      { number: 2, arabic: "مِنْ شَرِّ مَا خَلَقَ", transliteration: "Min sharri ma khalaq", english: "From the evil of that which He created", bengali: "তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে", audioUrl: getVerseAudioUrl(113, 2) },
      { number: 3, arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min sharri ghasiqin iza waqab", english: "And from the evil of darkness when it settles", bengali: "এবং অন্ধকার রাতের অনিষ্ট থেকে যখন তা গভীর হয়", audioUrl: getVerseAudioUrl(113, 3) },
      { number: 4, arabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min sharrin-naffaasaati fil 'uqad", english: "And from the evil of the blowers in knots", bengali: "এবং গিরায় ফুঁক দেওয়া জাদুকরদের অনিষ্ট থেকে", audioUrl: getVerseAudioUrl(113, 4) },
      { number: 5, arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min sharri haasidin iza hasad", english: "And from the evil of an envier when he envies", bengali: "এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে", audioUrl: getVerseAudioUrl(113, 5) }
    ]
  },
  {
    surahNumber: 114,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'oozu bi rabbin-naas", english: "Say, I seek refuge in the Lord of mankind", bengali: "বলুন, আমি আশ্রয় চাই মানুষের প্রভুর", audioUrl: getVerseAudioUrl(114, 1) },
      { number: 2, arabic: "مَلِكِ النَّاسِ", transliteration: "Malikin-naas", english: "The Sovereign of mankind", bengali: "মানুষের অধিপতির", audioUrl: getVerseAudioUrl(114, 2) },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilaahin-naas", english: "The God of mankind", bengali: "মানুষের মা'বুদের", audioUrl: getVerseAudioUrl(114, 3) },
      { number: 4, arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min sharril waswaasil khannaas", english: "From the evil of the retreating whisperer", bengali: "কুমন্ত্রণাদাতা পিছু হটে যাওয়া শয়তানের অনিষ্ট থেকে", audioUrl: getVerseAudioUrl(114, 4) },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Allazee yuwaswisu fee sudoorin-naas", english: "Who whispers in the breasts of mankind", bengali: "যে মানুষের অন্তরে কুমন্ত্রণা দেয়", audioUrl: getVerseAudioUrl(114, 5) },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal-jinnati wannaas", english: "From among the jinn and mankind", bengali: "জ্বিন ও মানুষের মধ্য থেকে", audioUrl: getVerseAudioUrl(114, 6) }
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
