import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, AppColors } from "@/constants/theme";

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
    title: "Surah Al-Fatiha",
    arabicTitle: "سورة الفاتحة",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    transliteration: "Bismillahir Rahmanir Raheem. Alhamdu lillahi Rabbil 'aalameen. Ar-Rahmanir Raheem. Maaliki yawmid Deen. Iyyaaka na'budu wa iyyaaka nasta'een. Ihdinas siraatal mustaqeem. Siraatal lazeena an'amta 'alaihim ghairil maghdoobi 'alaihim wa lad daaalleen.",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.",
    benefit: "The greatest Surah in the Quran. The Prophet (PBUH) said it is a cure for every disease. Used for healing and protection.",
    repetitions: 7,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
    category: "quran",
  },
  {
    id: "2",
    title: "Ayatul Kursi (Al-Baqarah 255)",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khuzuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man zal-lazi yashfa'u 'indahu illa bi-iznihi. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi shai'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma. Wa Huwal-'Aliyyul-'Azim.",
    translation: "Allah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before them and what is behind them. Nor shall they compass anything of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. For He is the Most High, the Supreme.",
    benefit: "The greatest verse in the Quran. Whoever recites it after each prayer, nothing prevents them from entering Paradise except death.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3",
    category: "quran",
  },
  {
    id: "3",
    title: "Last 2 Verses of Al-Baqarah",
    arabicTitle: "آخر آيتين من سورة البقرة",
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ﴿٢٨٥﴾ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ﴿٢٨٦﴾",
    transliteration: "Aamanar-Rasulu bima unzila ilayhi mir-Rabbihi wal-mu'minun. Kullun aamana billahi wa mala'ikatihi wa kutubihi wa rusulihi la nufarriqu bayna ahadim-mir-rusulih. Wa qalu sami'na wa ata'na ghufranaka Rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha mak-tasabat. Rabbana la tu'akhizna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-lazeena min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna. Anta Mawlana fansurna 'alal-qawmil-kafireen.",
    translation: "The Messenger believes in what has been revealed to him from his Lord, as do the believers. They all believe in Allah, His angels, His books, and His messengers. We make no distinction between any of His messengers. And they say: We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the return. Allah does not burden a soul beyond its capacity. It gets what it earns, and is responsible for what it earns. Our Lord! Do not hold us accountable if we forget or make a mistake. Our Lord! Do not place on us a burden like that which You placed on those before us. Our Lord! Do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy on us. You are our Protector, so help us against the disbelieving people.",
    benefit: "The Prophet (PBUH) said: Whoever recites these two verses at night, they will suffice him (protect him from all harm).",
    repetitions: 1,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/285.mp3",
    category: "quran",
  },
  {
    id: "4",
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾",
    transliteration: "Qul Huwa Allahu Ahad. Allahu As-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say: He is Allah, the One. Allah, the Eternal, Absolute. He begets not, nor is He begotten. And there is none comparable to Him.",
    benefit: "Equal to one-third of the Quran. Recited for protection, blessings, and as part of morning/evening adhkar.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3",
    category: "quran",
  },
  {
    id: "5",
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾",
    transliteration: "Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin iza waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin iza hasad.",
    translation: "Say: I seek refuge with the Lord of the Dawn. From the mischief of created things. From the mischief of darkness as it overspreads. From the mischief of those who practice secret arts. And from the mischief of the envious one as he practices envy.",
    benefit: "Protection from evil, black magic, witchcraft, and envy. Part of Al-Mu'awwidhatayn that the Prophet (PBUH) used for protection.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3",
    category: "quran",
  },
  {
    id: "6",
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
    transliteration: "Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Allazi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say: I seek refuge with the Lord of mankind. The King of mankind. The God of mankind. From the evil of the sneaking whisperer. Who whispers in the hearts of mankind. Among jinn and among mankind.",
    benefit: "Protection from evil whispers of Satan and jinn. Part of Al-Mu'awwidhatayn. The Prophet (PBUH) would recite this before sleep.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3",
    category: "quran",
  },
  {
    id: "7",
    title: "Surah Al-Kafirun",
    arabicTitle: "سورة الكافرون",
    arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾ لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٣﴾ وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ﴿٤﴾ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٥﴾ لَكُمْ دِينُكُمْ وَلِيَ دِينِ ﴿٦﴾",
    transliteration: "Qul ya ayyuhal-kafirun. La a'budu ma ta'budun. Wa la antum 'abiduna ma a'bud. Wa la ana 'abidum-ma 'abadtum. Wa la antum 'abiduna ma a'bud. Lakum dinukum wa liya din.",
    translation: "Say: O disbelievers! I do not worship what you worship. Nor do you worship what I worship. Nor will I worship what you worship. Nor will you worship what I worship. To you your religion, and to me my religion.",
    benefit: "Immunity from shirk. The Prophet (PBUH) would recite this and Al-Ikhlas before sleep. It is a protection from disbelief.",
    repetitions: 1,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6207.mp3",
    category: "quran",
  },
  {
    id: "8",
    title: "Verses 117-118 of Surah Al-A'raf",
    arabicTitle: "الأعراف ١١٧-١١٨",
    arabic: "وَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنْ أَلْقِ عَصَاكَ ۖ فَإِذَا هِيَ تَلْقَفُ مَا يَأْفِكُونَ ﴿١١٧﴾ فَوَقَعَ الْحَقُّ وَبَطَلَ مَا كَانُوا يَعْمَلُونَ ﴿١١٨﴾",
    transliteration: "Wa awhaina ila Musa an alqi 'asak. Fa-iza hiya talqafu ma ya'fikun. Fawaqa'al-haqqu wa batala ma kanu ya'malun.",
    translation: "And We inspired Moses: Throw your staff. And behold! It swallowed up what they had faked. So the truth was established, and what they used to do was nullified.",
    benefit: "These verses are specifically for breaking magic and sorcery, as they describe how Allah nullified the magic of Pharaoh's sorcerers.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1164.mp3",
    category: "quran",
  },
  {
    id: "9",
    title: "Verses 81-82 of Surah Yunus",
    arabicTitle: "يونس ٨١-٨٢",
    arabic: "فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ ﴿٨١﴾ وَيُحِقُّ اللَّهُ الْحَقَّ بِكَلِمَاتِهِ وَلَوْ كَرِهَ الْمُجْرِمُونَ ﴿٨٢﴾",
    transliteration: "Falamma alqaw qala Musa ma ji'tum bihis-sihr. Innallaha sayubtiluh. Innallaha la yuslihu 'amalal-mufsidin. Wa yuhiqqullahul-haqqa bi-kalimatihi wa law karihal-mujrimun.",
    translation: "When they had cast, Moses said: What you have brought is magic. Indeed, Allah will make it worthless. Indeed, Allah does not set right the work of corrupters. And Allah establishes the truth by His words, even if the criminals hate it.",
    benefit: "Powerful verses for nullifying magic and sorcery. Allah's promise to destroy the works of those who spread corruption.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1412.mp3",
    category: "quran",
  },
  {
    id: "10",
    title: "Verses 68-69 of Surah Ta-Ha",
    arabicTitle: "طه ٦٨-٦٩",
    arabic: "قُلْنَا لَا تَخَفْ إِنَّكَ أَنتَ الْأَعْلَىٰ ﴿٦٨﴾ وَأَلْقِ مَا فِي يَمِينِكَ تَلْقَفْ مَا صَنَعُوا ۖ إِنَّمَا صَنَعُوا كَيْدُ سَاحِرٍ ۖ وَلَا يُفْلِحُ السَّاحِرُ حَيْثُ أَتَىٰ ﴿٦٩﴾",
    transliteration: "Qulna la takhaf innaka antal-a'la. Wa alqi ma fi yaminika talqaf ma sana'u. Innama sana'u kaydu sahir. Wa la yuflihus-sahiru haythu ata.",
    translation: "We said: Fear not! Indeed, you are the superior. And throw what is in your right hand; it will swallow up what they have made. What they have made is but the trick of a magician, and the magician will not succeed wherever he is.",
    benefit: "Key verses against magic. Allah declares that magicians will never succeed. Recite with conviction for protection from sorcery.",
    repetitions: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2137.mp3",
    category: "quran",
  },
  {
    id: "11",
    title: "Dua for Protection (Morning/Evening)",
    arabicTitle: "دعاء الحماية",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-lazi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: "In the name of Allah, with Whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
    benefit: "The Prophet (PBUH) said: Whoever recites this 3 times in the morning and evening, nothing will harm him. (Abu Dawud, Tirmidhi)",
    repetitions: 3,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/071.mp3",
    category: "dua",
  },
  {
    id: "12",
    title: "Dua for Healing",
    arabicTitle: "دعاء الشفاء",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma Rabban-nas, azhibil-ba's, ishfi antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama.",
    translation: "O Allah, Lord of mankind, remove the affliction. Heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
    benefit: "The Prophet (PBUH) would recite this when visiting the sick and place his right hand on the area of pain. (Bukhari, Muslim)",
    repetitions: 7,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/074.mp3",
    category: "dua",
  },
  {
    id: "13",
    title: "Protection from Evil Eye & Jinn",
    arabicTitle: "الحماية من العين والجن",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bi kalimatil-lahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.",
    translation: "I seek refuge in the perfect words of Allah from every devil and every poisonous creature, and from every evil eye.",
    benefit: "The Prophet (PBUH) used to seek protection for Hasan and Husain with this dua. Parents should recite it for their children.",
    repetitions: 3,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/062.mp3",
    category: "dua",
  },
  {
    id: "14",
    title: "Complete Protection Dua",
    arabicTitle: "دعاء الحماية الكاملة",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi kalimatil-lahit-tammati min sharri ma khalaq.",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    benefit: "The Prophet (PBUH) said: Whoever says this when stopping at a place, nothing will harm him until he leaves. (Muslim)",
    repetitions: 3,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/055.mp3",
    category: "dua",
  },
  {
    id: "15",
    title: "Dua When in Distress",
    arabicTitle: "دعاء الكرب",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    transliteration: "La ilaha illallahul-'Azimul-Halim. La ilaha illallahu Rabbul-'Arshil-'Azim. La ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim.",
    translation: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Magnificent Throne. There is no god but Allah, Lord of the heavens and Lord of the earth and Lord of the Noble Throne.",
    benefit: "The Prophet (PBUH) would recite this dua in times of distress and difficulty. It brings relief from anxiety and hardship.",
    repetitions: 7,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/089.mp3",
    category: "dua",
  },
  {
    id: "16",
    title: "Dua of Prophet Yunus (AS)",
    arabicTitle: "دعاء يونس عليه السلام",
    arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimin.",
    translation: "There is no god but You. Glory be to You! Indeed, I have been among the wrongdoers.",
    benefit: "The Prophet (PBUH) said: No Muslim supplicates with this except that Allah answers him. (Tirmidhi) Powerful for removing difficulties.",
    repetitions: 7,
    audioUrl: "https://server8.mp3quran.net/afs/Athkar/090.mp3",
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
    return (
      <View style={[styles.audioDisabled, { backgroundColor: theme.backgroundSecondary }]}>
        <Feather name="volume-x" size={16} color={theme.textSecondary} />
        <ThemedText style={[styles.audioDisabledText, { color: theme.textSecondary }]}>
          Audio coming soon
        </ThemedText>
      </View>
    );
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
    <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
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
              Authentic Quranic verses and Prophetic duas for healing and protection. Listen and recite with sincerity and faith in Allah.
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
                {f === "all" ? "All" : f === "quran" ? "Quran" : "Duas"}
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
            Ruqyah is most effective when done with complete trust in Allah (Tawakkul), sincerity, and a pure heart. Maintain wudu and face the Qibla when possible.
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
    fontSize: 14,
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
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  arabicTitle: {
    fontSize: 13,
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
  audioDisabled: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  audioDisabledText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  arabicBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  arabicText: {
    fontSize: 22,
    fontFamily: "Poppins_400Regular",
    textAlign: "right",
    lineHeight: 40,
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
