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
    surahNumber: 32,
    verses: [
      { number: 1, arabic: "الم", transliteration: "Alif-Laam-Meem", english: "Alif, Lam, Meem", bengali: "আলিফ লাম মীম", audioUrl: getVerseAudioUrl(32, 1) },
      { number: 2, arabic: "تَنزِيلُ الْكِتَابِ لَا رَيْبَ فِيهِ مِن رَّبِّ الْعَالَمِينَ", transliteration: "Tanzeelul Kitaabi laa raiba feehi mir Rabbil 'aalameen", english: "The revelation of the Book about which there is no doubt is from the Lord of the worlds", bengali: "এই কিতাবের অবতরণ বিশ্বজগতের প্রভুর পক্ষ থেকে, এতে কোন সন্দেহ নেই", audioUrl: getVerseAudioUrl(32, 2) },
      { number: 3, arabic: "أَمْ يَقُولُونَ افْتَرَاهُ ۚ بَلْ هُوَ الْحَقُّ مِن رَّبِّكَ لِتُنذِرَ قَوْمًا مَّا أَتَاهُم مِّن نَّذِيرٍ مِّن قَبْلِكَ لَعَلَّهُمْ يَهْتَدُونَ", transliteration: "Am yaqooloonaf taraah, bal huwal haqqu mir Rabbika litunzira qawmam maaa ataahum min nazeerim min qablika la'allahum yahtadoon", english: "Or do they say, He invented it? Rather, it is the truth from your Lord, that you may warn a people to whom no warner has come before you that they might be guided", bengali: "তারা কি বলে যে, সে এটা বানিয়েছে? বরং এটা তোমার প্রভুর পক্ষ থেকে সত্য, যাতে তুমি এমন এক জাতিকে সতর্ক কর যাদের কাছে তোমার আগে কোন সতর্ককারী আসেনি, যাতে তারা সৎপথ পায়", audioUrl: getVerseAudioUrl(32, 3) }
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
