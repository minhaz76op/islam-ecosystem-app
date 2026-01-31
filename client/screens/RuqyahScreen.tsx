import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, AppColors, Shadows } from "@/constants/theme";

interface RuqyahItem {
  id: string;
  title: string;
  arabicTitle: string;
  arabic: string;
  transliteration: string;
  translation: string;
  benefit: string;
  repetitions: number;
  audioUrl: string;
  category: "quran" | "dua";
}

const RUQYAH_COLLECTION: RuqyahItem[] = [
  {
    id: "1",
    title: "Surah Al-Fatiha (Complete)",
    arabicTitle: "سورة الفاتحة",
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾
الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾
مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾
اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾
صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾`,
    transliteration: "Bismillahir Rahmanir Raheem (1) Alhamdu lillahi Rabbil 'aalameen (2) Ar-Rahmanir Raheem (3) Maaliki yawmid-Deen (4) Iyyaaka na'budu wa iyyaaka nasta'een (5) Ihdinas-siraatal-mustaqeem (6) Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daalleen (7)",
    translation: "(1) In the name of Allah, the Most Gracious, the Most Merciful. (2) All praise is due to Allah, Lord of the worlds. (3) The Most Gracious, the Most Merciful. (4) Master of the Day of Judgment. (5) You alone we worship, and You alone we ask for help. (6) Guide us to the straight path. (7) The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.",
    benefit: "The greatest Surah in the Quran. The Prophet (PBUH) said: 'By the One in Whose Hand is my soul, nothing like it has been revealed in the Torah, the Gospel, the Zabur, or the Quran, and it is the seven oft-repeated verses.' Used for healing and protection from all types of harm.",
    repetitions: 7,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3",
    category: "quran",
  },
  {
    id: "2",
    title: "Ayatul Kursi (Al-Baqarah 255)",
    arabicTitle: "آية الكرسي",
    arabic: `اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ
لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ
لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ
مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ
يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ
وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ
وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ
وَلَا يَئُودُهُ حِفْظُهُمَا ۚ
وَهُوَ الْعَلِيُّ الْعَظِيمُ`,
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khuzuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man zal-lazi yashfa'u 'indahu illa bi-iznihi. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi shay'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma. Wa Huwal-'Aliyyul-'Azim.",
    translation: "Allah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before them and what is behind them. Nor shall they compass anything of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. For He is the Most High, the Supreme.",
    benefit: "The greatest verse in the Quran. The Prophet (PBUH) said: 'Whoever recites Ayatul Kursi after every obligatory prayer, nothing prevents them from entering Paradise except death.' Provides powerful protection from evil, jinn, and harm.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/ayah/mishaari_raashid_al_3afaasee/2_255.mp3",
    category: "quran",
  },
  {
    id: "3",
    title: "Last 2 Verses of Al-Baqarah (285-286)",
    arabicTitle: "خواتيم سورة البقرة",
    arabic: `آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ﴿٢٨٥﴾

لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ﴿٢٨٦﴾`,
    transliteration: "Aamanar-Rasulu bima unzila ilayhi mir-Rabbihi wal-mu'minun. Kullun aamana billahi wa mala'ikatihi wa kutubihi wa rusulihi la nufarriqu bayna ahadim-mir-rusulih. Wa qalu sami'na wa ata'na ghufranaka Rabbana wa ilaykal-masir (285). La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha mak-tasabat. Rabbana la tu'akhizna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-lazeena min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna. Anta Mawlana fansurna 'alal-qawmil-kafireen (286).",
    translation: "(285) The Messenger believes in what has been revealed to him from his Lord, as do the believers. They all believe in Allah, His angels, His books, and His messengers. We make no distinction between any of His messengers. And they say: We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the return. (286) Allah does not burden a soul beyond its capacity. It gets what it earns, and is responsible for what it earns. Our Lord! Do not hold us accountable if we forget or make a mistake. Our Lord! Do not place on us a burden like that which You placed on those before us. Our Lord! Do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy on us. You are our Protector, so help us against the disbelieving people.",
    benefit: "The Prophet (PBUH) said: 'Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him' - meaning they will protect him from all evil and harm throughout the night. These verses are a treasure from beneath the Throne of Allah.",
    repetitions: 1,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/002.mp3",
    category: "quran",
  },
  {
    id: "4",
    title: "Surah Al-Ikhlas (Complete)",
    arabicTitle: "سورة الإخلاص",
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾
اللَّهُ الصَّمَدُ ﴿٢﴾
لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾
وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾`,
    transliteration: "Bismillahir Rahmanir Raheem. Qul Huwa Allahu Ahad (1). Allahus-Samad (2). Lam yalid wa lam yulad (3). Wa lam yakun lahu kufuwan ahad (4).",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. (1) Say: He is Allah, the One. (2) Allah, the Eternal, Absolute. (3) He begets not, nor is He begotten. (4) And there is none comparable to Him.",
    benefit: "The Prophet (PBUH) said this Surah is equal to one-third of the Quran. Whoever recites it 10 times, Allah will build a palace for them in Paradise. Recite it 3 times morning and evening for complete protection.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/112.mp3",
    category: "quran",
  },
  {
    id: "5",
    title: "Surah Al-Falaq (Complete)",
    arabicTitle: "سورة الفلق",
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾
مِن شَرِّ مَا خَلَقَ ﴿٢﴾
وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾
وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾
وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾`,
    transliteration: "Bismillahir Rahmanir Raheem. Qul a'udhu bi Rabbil-falaq (1). Min sharri ma khalaq (2). Wa min sharri ghasiqin iza waqab (3). Wa min sharrin-naffathati fil-'uqad (4). Wa min sharri hasidin iza hasad (5).",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. (1) Say: I seek refuge with the Lord of the Dawn. (2) From the evil of what He has created. (3) And from the evil of darkness when it settles. (4) And from the evil of those who blow on knots (witchcraft). (5) And from the evil of an envier when he envies.",
    benefit: "Part of Al-Mu'awwidhatayn. The Prophet (PBUH) said: 'Recite Al-Falaq and An-Nas, for you will never recite anything like them.' This Surah specifically protects against black magic, witchcraft, evil eye, and envy. The Prophet (PBUH) would recite it before sleep.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/113.mp3",
    category: "quran",
  },
  {
    id: "6",
    title: "Surah An-Nas (Complete)",
    arabicTitle: "سورة الناس",
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾
مَلِكِ النَّاسِ ﴿٢﴾
إِلَٰهِ النَّاسِ ﴿٣﴾
مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾
الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾
مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾`,
    transliteration: "Bismillahir Rahmanir Raheem. Qul a'udhu bi Rabbin-nas (1). Malikin-nas (2). Ilahin-nas (3). Min sharril-waswasil-khannas (4). Allazi yuwaswisu fi sudurin-nas (5). Minal-jinnati wan-nas (6).",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. (1) Say: I seek refuge with the Lord of mankind. (2) The King of mankind. (3) The God of mankind. (4) From the evil of the retreating whisperer. (5) Who whispers in the hearts of mankind. (6) From among the jinn and mankind.",
    benefit: "Part of Al-Mu'awwidhatayn. This Surah provides protection from the whispers of Satan (waswas) and evil jinn. The Prophet (PBUH) was affected by magic and Jibreel came and cured him by reciting Al-Falaq and An-Nas. Recite 3 times morning and evening.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/114.mp3",
    category: "quran",
  },
  {
    id: "7",
    title: "Surah Al-Kafirun (Complete)",
    arabicTitle: "سورة الكافرون",
    arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾
لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾
وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٣﴾
وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ﴿٤﴾
وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٥﴾
لَكُمْ دِينُكُمْ وَلِيَ دِينِ ﴿٦﴾`,
    transliteration: "Bismillahir Rahmanir Raheem. Qul ya ayyuhal-kafirun (1). La a'budu ma ta'budun (2). Wa la antum 'abiduna ma a'bud (3). Wa la ana 'abidum-ma 'abadtum (4). Wa la antum 'abiduna ma a'bud (5). Lakum dinukum wa liya din (6).",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. (1) Say: O disbelievers! (2) I do not worship what you worship. (3) Nor do you worship what I worship. (4) Nor will I worship what you worship. (5) Nor will you worship what I worship. (6) To you your religion, and to me my religion.",
    benefit: "The Prophet (PBUH) would recite Al-Kafirun and Al-Ikhlas before sleep. This Surah is a declaration of freedom from shirk (associating partners with Allah) and provides immunity from disbelief. It equals one-fourth of the Quran.",
    repetitions: 1,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/109.mp3",
    category: "quran",
  },
  {
    id: "8",
    title: "Verses Against Magic (Al-A'raf 117-122)",
    arabicTitle: "آيات إبطال السحر - الأعراف",
    arabic: `وَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنْ أَلْقِ عَصَاكَ ۖ فَإِذَا هِيَ تَلْقَفُ مَا يَأْفِكُونَ ﴿١١٧﴾
فَوَقَعَ الْحَقُّ وَبَطَلَ مَا كَانُوا يَعْمَلُونَ ﴿١١٨﴾
فَغُلِبُوا هُنَالِكَ وَانقَلَبُوا صَاغِرِينَ ﴿١١٩﴾
وَأُلْقِيَ السَّحَرَةُ سَاجِدِينَ ﴿١٢٠﴾
قَالُوا آمَنَّا بِرَبِّ الْعَالَمِينَ ﴿١٢١﴾
رَبِّ مُوسَىٰ وَهَارُونَ ﴿١٢٢﴾`,
    transliteration: "Wa awhaina ila Musa an alqi 'asak. Fa-iza hiya talqafu ma ya'fikun (117). Fawaqa'al-haqqu wa batala ma kanu ya'malun (118). Faghulibo hunalika wan-qalabu saghirin (119). Wa ulqiyas-saharatu sajidin (120). Qalu aamanna bi Rabbil-'alamin (121). Rabbi Musa wa Harun (122).",
    translation: "(117) And We inspired Moses: Throw your staff. And behold! It swallowed up what they had faked. (118) So the truth was established, and what they used to do was nullified. (119) So they were defeated there and returned humiliated. (120) And the magicians fell down prostrating. (121) They said: We believe in the Lord of the worlds. (122) The Lord of Moses and Aaron.",
    benefit: "These verses describe how Allah destroyed the magic of Pharaoh's sorcerers through Prophet Musa (AS). They are extremely powerful for breaking magic, sorcery, and witchcraft. Recite them with conviction for protection and cure from magic.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/007.mp3",
    category: "quran",
  },
  {
    id: "9",
    title: "Verses Against Magic (Yunus 79-82)",
    arabicTitle: "آيات إبطال السحر - يونس",
    arabic: `وَقَالَ فِرْعَوْنُ ائْتُونِي بِكُلِّ سَاحِرٍ عَلِيمٍ ﴿٧٩﴾
فَلَمَّا جَاءَ السَّحَرَةُ قَالَ لَهُم مُّوسَىٰ أَلْقُوا مَا أَنتُم مُّلْقُونَ ﴿٨٠﴾
فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ ﴿٨١﴾
وَيُحِقُّ اللَّهُ الْحَقَّ بِكَلِمَاتِهِ وَلَوْ كَرِهَ الْمُجْرِمُونَ ﴿٨٢﴾`,
    transliteration: "Wa qala Fir'awnu'-tuni bi kulli sahirin 'alim (79). Falamma ja'as-saharatu qala lahum Musa alqu ma antum mulqun (80). Falamma alqaw qala Musa ma ji'tum bihis-sihr. Innallaha sayubtiluh. Innallaha la yuslihu 'amalal-mufsidin (81). Wa yuhiqqullahul-haqqa bi-kalimatihi wa law karihal-mujrimun (82).",
    translation: "(79) Pharaoh said: Bring me every learned magician. (80) When the magicians came, Moses said to them: Cast whatever you are going to cast. (81) When they had cast, Moses said: What you have brought is magic. Indeed, Allah will make it worthless. Indeed, Allah does not set right the work of corrupters. (82) And Allah establishes the truth by His words, even if the criminals hate it.",
    benefit: "Allah's promise that He will nullify magic and never allow the work of those who spread corruption to succeed. These verses give certainty that all magic will be destroyed by Allah's will. Powerful for breaking all types of sorcery.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/010.mp3",
    category: "quran",
  },
  {
    id: "10",
    title: "Verses Against Magic (Ta-Ha 65-69)",
    arabicTitle: "آيات إبطال السحر - طه",
    arabic: `قَالُوا يَا مُوسَىٰ إِمَّا أَن تُلْقِيَ وَإِمَّا أَن نَّكُونَ أَوَّلَ مَنْ أَلْقَىٰ ﴿٦٥﴾
قَالَ بَلْ أَلْقُوا ۖ فَإِذَا حِبَالُهُمْ وَعِصِيُّهُمْ يُخَيَّلُ إِلَيْهِ مِن سِحْرِهِمْ أَنَّهَا تَسْعَىٰ ﴿٦٦﴾
فَأَوْجَسَ فِي نَفْسِهِ خِيفَةً مُّوسَىٰ ﴿٦٧﴾
قُلْنَا لَا تَخَفْ إِنَّكَ أَنتَ الْأَعْلَىٰ ﴿٦٨﴾
وَأَلْقِ مَا فِي يَمِينِكَ تَلْقَفْ مَا صَنَعُوا ۖ إِنَّمَا صَنَعُوا كَيْدُ سَاحِرٍ ۖ وَلَا يُفْلِحُ السَّاحِرُ حَيْثُ أَتَىٰ ﴿٦٩﴾`,
    transliteration: "Qalu ya Musa imma an tulqiya wa imma an nakuna awwala man alqa (65). Qala bal alqu. Fa-iza hibaluhum wa 'isiyyuhum yukhayyalu ilayhi min sihrihim annaha tas'a (66). Fa-awjasa fi nafsihi khifatam-Musa (67). Qulna la takhaf innaka antal-a'la (68). Wa alqi ma fi yaminika talqaf ma sana'u. Innama sana'u kaydu sahir. Wa la yuflihus-sahiru haythu ata (69).",
    translation: "(65) They said: O Moses! Either you throw, or we will be the first to throw. (66) He said: Rather, you throw. And suddenly their ropes and staffs appeared to him, because of their magic, as if they were moving. (67) So Moses felt fear within himself. (68) We said: Fear not! Indeed, you are the superior. (69) And throw what is in your right hand; it will swallow up what they have made. What they have made is only the trick of a magician, and the magician will never succeed wherever he is.",
    benefit: "Allah's declaration that magicians will NEVER succeed. This is a divine promise. The verse 'wa la yuflihus-sahiru haythu ata' (the magician will never succeed wherever he is) is one of the most powerful against magic. Recite with firm belief.",
    repetitions: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/020.mp3",
    category: "quran",
  },
  {
    id: "11",
    title: "Dua for Protection (Morning & Evening)",
    arabicTitle: "دعاء الحفظ صباحاً ومساءً",
    arabic: `بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ`,
    transliteration: "Bismillahil-lazi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: "In the name of Allah, with Whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
    benefit: "The Prophet (PBUH) said: 'Whoever says this three times in the morning and three times in the evening, nothing will harm him.' (Abu Dawud 5088, Tirmidhi 3388) - Saheeh. This is one of the most powerful morning and evening adhkar for protection.",
    repetitions: 3,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/005.mp3",
    category: "dua",
  },
  {
    id: "12",
    title: "Dua for Healing (Hand on Pain)",
    arabicTitle: "دعاء الشفاء - اليد على موضع الألم",
    arabic: `اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا`,
    transliteration: "Allahumma Rabban-nas, azhibil-ba's, ishfi antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama.",
    translation: "O Allah, Lord of mankind, remove the affliction. Heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
    benefit: "The Prophet (PBUH) would visit the sick, place his right hand on the area of pain, and recite this dua. (Bukhari 5743, Muslim 2191) Recite 7 times while placing your hand on the area of pain or over the sick person.",
    repetitions: 7,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/011.mp3",
    category: "dua",
  },
  {
    id: "13",
    title: "Protection for Children from Evil Eye",
    arabicTitle: "تعويذ الأطفال من العين",
    arabic: `أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ`,
    transliteration: "U'idhukuma bi kalimatil-lahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.",
    translation: "I seek refuge for you both in the perfect words of Allah from every devil and every poisonous creature, and from every evil eye.",
    benefit: "The Prophet (PBUH) used to seek protection for Al-Hasan and Al-Husayn with this dua and said: 'Your father (Ibrahim) used to seek protection with these words for Ismail and Ishaq.' (Bukhari 3371) Say it over your children daily.",
    repetitions: 3,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/018.mp3",
    category: "dua",
  },
  {
    id: "14",
    title: "Complete Protection from All Evil",
    arabicTitle: "الحماية من كل شر",
    arabic: `أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ`,
    transliteration: "A'udhu bi kalimatil-lahit-tammati min sharri ma khalaq.",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    benefit: "The Prophet (PBUH) said: 'Whoever stops at a place and says this, nothing will harm him until he leaves that place.' (Muslim 2708) Say it when entering a new place, before sleeping, or anytime you seek protection.",
    repetitions: 3,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/020.mp3",
    category: "dua",
  },
  {
    id: "15",
    title: "Dua in Times of Distress",
    arabicTitle: "دعاء الكرب والهم",
    arabic: `لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ`,
    transliteration: "La ilaha illallahul-'Azimul-Halim. La ilaha illallahu Rabbul-'Arshil-'Azim. La ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim.",
    translation: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Magnificent Throne. There is no god but Allah, Lord of the heavens and Lord of the earth and Lord of the Noble Throne.",
    benefit: "The Prophet (PBUH) would say this dua in times of distress, difficulty, and anxiety. (Bukhari 6346, Muslim 2730) It brings relief from worry, grief, and hardship. Recite it whenever you feel overwhelmed.",
    repetitions: 7,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/025.mp3",
    category: "dua",
  },
  {
    id: "16",
    title: "Dua of Prophet Yunus (AS)",
    arabicTitle: "دعاء يونس عليه السلام",
    arabic: `لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ`,
    transliteration: "La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimin.",
    translation: "There is no god but You. Glory be to You! Indeed, I have been among the wrongdoers.",
    benefit: "The Prophet (PBUH) said: 'The supplication of Dhun-Nun (Prophet Yunus) when he was in the belly of the whale: No Muslim ever prays to his Lord with these words for anything, but He will answer his prayer.' (Tirmidhi 3505) Extremely powerful for removing any difficulty.",
    repetitions: 7,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/027.mp3",
    category: "dua",
  },
  {
    id: "17",
    title: "Seeking Refuge from Satan",
    arabicTitle: "الاستعاذة من الشيطان",
    arabic: `أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ`,
    transliteration: "A'udhu billahi minash-Shaytanir-rajim.",
    translation: "I seek refuge in Allah from Satan, the accursed.",
    benefit: "The basic and essential formula for seeking Allah's protection from Satan. Say it before reciting Quran, when angry, when having bad thoughts, and whenever you feel the whispers of Shaytan. It drives Satan away immediately.",
    repetitions: 3,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/030.mp3",
    category: "dua",
  },
  {
    id: "18",
    title: "Dua When Visiting the Sick",
    arabicTitle: "دعاء عيادة المريض",
    arabic: `أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ`,
    transliteration: "As'alullaha al-'Azima Rabbal-'Arshil-'Azimi an yashfiyak.",
    translation: "I ask Allah the Almighty, Lord of the Magnificent Throne, to heal you.",
    benefit: "The Prophet (PBUH) said: 'Whoever visits a sick person whose time of death has not come and says this seven times, Allah will heal him from that illness.' (Abu Dawud 3106, Tirmidhi 2083) Recite 7 times over the sick person.",
    repetitions: 7,
    audioUrl: "https://ia801309.us.archive.org/22/items/AthkarAlSabahWaAlMasaa/032.mp3",
    category: "dua",
  },
];

interface AudioPlayerProps {
  audioUrl: string;
  theme: any;
  itemId: string;
  currentPlayingId: string | null;
  onPlay: (id: string) => void;
}

function AudioPlayer({ audioUrl, theme, itemId, currentPlayingId, onPlay }: AudioPlayerProps) {
  const player = useAudioPlayer(audioUrl || undefined);
  const status = useAudioPlayerStatus(player);
  const isThisPlaying = currentPlayingId === itemId;

  useEffect(() => {
    if (!isThisPlaying && status.playing) {
      player.pause();
    }
  }, [currentPlayingId, isThisPlaying]);

  const handlePlayPause = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (status.playing) {
      player.pause();
    } else {
      onPlay(itemId);
      player.play();
    }
  };

  const handleReplay = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    player.seekTo(0);
    onPlay(itemId);
    player.play();
  };

  if (!audioUrl) {
    return null;
  }

  const progress = status.duration > 0 ? (status.currentTime / status.duration) * 100 : 0;

  return (
    <View style={[styles.audioContainer, { backgroundColor: theme.backgroundSecondary }]}>
      <View style={styles.audioControls}>
        <Pressable
          onPress={handlePlayPause}
          style={[styles.playButton, { backgroundColor: AppColors.accent }]}
        >
          {status.isBuffering ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Feather
              name={status.playing ? "pause" : "play"}
              size={18}
              color="#FFFFFF"
            />
          )}
        </Pressable>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.cardBorder }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: AppColors.accent, width: `${progress}%` },
              ]}
            />
          </View>
          <ThemedText style={[styles.timeText, { color: theme.textSecondary }]}>
            {formatTime(status.currentTime)} / {formatTime(status.duration)}
          </ThemedText>
        </View>

        <Pressable onPress={handleReplay} style={styles.replayButton}>
          <Feather name="rotate-ccw" size={18} color={theme.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface RuqyahCardProps {
  item: RuqyahItem;
  theme: any;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
  currentPlayingId: string | null;
  onPlay: (id: string) => void;
}

function RuqyahCard({ item, theme, isExpanded, onToggle, index, currentPlayingId, onPlay }: RuqyahCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
      <Pressable
        onPress={async () => {
          await Haptics.selectionAsync();
          onToggle();
        }}
        style={[styles.card, { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder }]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.numberBadge, { backgroundColor: item.category === "quran" ? AppColors.primary + "20" : AppColors.accent + "20" }]}>
            <ThemedText style={[styles.numberText, { color: item.category === "quran" ? AppColors.primary : AppColors.accent }]}>
              {item.repetitions}x
            </ThemedText>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
            <ThemedText style={[styles.arabicTitle, { color: item.category === "quran" ? AppColors.primary : AppColors.accent }]}>
              {item.arabicTitle}
            </ThemedText>
          </View>
          <View style={styles.headerIcons}>
            {item.audioUrl ? (
              <Feather name="volume-2" size={16} color={AppColors.accent} style={{ marginRight: 8 }} />
            ) : null}
            <Feather
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color={theme.textSecondary}
            />
          </View>
        </View>

        {isExpanded ? (
          <View style={styles.expandedContent}>
            <AudioPlayer
              audioUrl={item.audioUrl}
              theme={theme}
              itemId={item.id}
              currentPlayingId={currentPlayingId}
              onPlay={onPlay}
            />

            <View style={[styles.arabicBox, { backgroundColor: AppColors.gold + "10", borderColor: AppColors.gold + "30" }]}>
              <ThemedText style={[styles.arabicText, { color: theme.text }]}>
                {item.arabic}
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={[styles.sectionLabel, { color: theme.textSecondary }]}>
                Transliteration
              </ThemedText>
              <ThemedText style={[styles.transliteration, { color: theme.text }]}>
                {item.transliteration}
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={[styles.sectionLabel, { color: theme.textSecondary }]}>
                Translation
              </ThemedText>
              <ThemedText style={[styles.translation, { color: theme.text }]}>
                {item.translation}
              </ThemedText>
            </View>

            <View style={[styles.benefitBox, { backgroundColor: item.category === "quran" ? AppColors.primary + "10" : AppColors.accent + "10" }]}>
              <Feather name="info" size={16} color={item.category === "quran" ? AppColors.primary : AppColors.accent} />
              <ThemedText style={[styles.benefitText, { color: theme.text }]}>
                {item.benefit}
              </ThemedText>
            </View>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

export default function RuqyahScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme, isDark } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "quran" | "dua">("all");

  const filteredItems = filter === "all" 
    ? RUQYAH_COLLECTION 
    : RUQYAH_COLLECTION.filter(item => item.category === filter);

  const quranCount = RUQYAH_COLLECTION.filter(i => i.category === "quran").length;
  const duaCount = RUQYAH_COLLECTION.filter(i => i.category === "dua").length;

  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0F172A", "#1E293B", "#0F172A"]
          : [AppColors.background, "#E0F2FE", AppColors.background]
      }
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <View style={[styles.introCard, { backgroundColor: theme.backgroundDefault }]}>
            <View style={[styles.introIconBg, { backgroundColor: AppColors.accent + "15" }]}>
              <Feather name="shield" size={32} color={AppColors.accent} />
            </View>
            <ThemedText style={styles.introTitle}>Complete Ruqyah</ThemedText>
            <ThemedText style={[styles.introText, { color: theme.textSecondary }]}>
              {quranCount} Quranic verses and {duaCount} Prophetic duas for healing and protection. All with audio recitation.
            </ThemedText>
          </View>
        </Animated.View>

        <View style={styles.filterContainer}>
          {(["all", "quran", "dua"] as const).map((f) => (
            <Pressable
              key={f}
              onPress={async () => {
                await Haptics.selectionAsync();
                setFilter(f);
              }}
              style={[
                styles.filterButton,
                {
                  backgroundColor: filter === f ? AppColors.primary : theme.backgroundDefault,
                  borderColor: filter === f ? AppColors.primary : theme.cardBorder,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  { color: filter === f ? "#FFFFFF" : theme.text },
                ]}
              >
                {f === "all" ? `All (${RUQYAH_COLLECTION.length})` : f === "quran" ? `Quran (${quranCount})` : `Duas (${duaCount})`}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.cardList}>
          {filteredItems.map((item, index) => (
            <RuqyahCard
              key={item.id}
              item={item}
              theme={theme}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              index={index}
              currentPlayingId={currentPlayingId}
              onPlay={setCurrentPlayingId}
            />
          ))}
        </View>

        <View style={[styles.tipCard, { backgroundColor: AppColors.primary + "10" }]}>
          <Feather name="heart" size={20} color={AppColors.primary} />
          <ThemedText style={[styles.tipText, { color: theme.text }]}>
            Ruqyah is most effective with complete trust in Allah (Tawakkul), sincerity (Ikhlas), and a pure heart. Maintain wudu, face the Qibla, and recite with conviction. May Allah grant you complete healing and protection.
          </ThemedText>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  introIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  introTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.sm,
  },
  introText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  cardList: {
    gap: Spacing.md,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  numberText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  arabicTitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  expandedContent: {
    padding: Spacing.lg,
    paddingTop: 0,
    gap: Spacing.lg,
  },
  audioContainer: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  audioControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  timeText: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  replayButton: {
    padding: Spacing.sm,
  },
  arabicBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  arabicText: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "right",
    lineHeight: 36,
  },
  section: {
    gap: Spacing.xs,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  transliteration: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    lineHeight: 22,
  },
  translation: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  benefitBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  benefitText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
