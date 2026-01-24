export interface HistoricalEvent {
  id: string;
  year: string;
  yearHijri?: string;
  title: string;
  titleArabic?: string;
  description: string;
  significance: string;
  category: 'pre-islamic' | 'prophetic-era' | 'rashidun' | 'umayyad' | 'abbasid' | 'later-periods' | 'modern';
}

export interface HistoricalPeriod {
  id: string;
  name: string;
  nameArabic: string;
  startYear: string;
  endYear: string;
  description: string;
  events: HistoricalEvent[];
}

export const ISLAMIC_HISTORY: HistoricalPeriod[] = [
  {
    id: 'pre-islamic',
    name: 'Pre-Islamic Arabia',
    nameArabic: 'الجاهلية',
    startYear: '500 CE',
    endYear: '610 CE',
    description: 'The period before the revelation of Islam, known as Jahiliyyah (Age of Ignorance)',
    events: [
      {
        id: 'pre-1',
        year: '570 CE',
        title: 'Birth of Prophet Muhammad',
        titleArabic: 'مولد النبي محمد',
        description: 'Prophet Muhammad (PBUH) was born in Makkah in the Year of the Elephant. His father Abdullah had passed away before his birth, and his mother Aminah would pass when he was six years old.',
        significance: 'The birth of the final messenger of Allah, who would bring the message of Islam to humanity.',
        category: 'pre-islamic'
      },
      {
        id: 'pre-2',
        year: '570 CE',
        title: 'Year of the Elephant',
        titleArabic: 'عام الفيل',
        description: 'Abraha, the Abyssinian ruler of Yemen, marched with a large army including elephants to destroy the Kaaba. Allah sent flocks of birds (Ababil) that pelted them with stones, destroying the army.',
        significance: 'Allah\'s protection of the Kaaba, mentioned in Surah Al-Fil (105).',
        category: 'pre-islamic'
      },
      {
        id: 'pre-3',
        year: '576 CE',
        title: 'Death of Aminah',
        titleArabic: 'وفاة آمنة',
        description: 'The mother of Prophet Muhammad (PBUH) passed away when he was about six years old. He was then cared for by his grandfather Abdul Muttalib.',
        significance: 'The Prophet became an orphan, shaping his compassionate character.',
        category: 'pre-islamic'
      },
      {
        id: 'pre-4',
        year: '578 CE',
        title: 'Death of Abdul Muttalib',
        titleArabic: 'وفاة عبد المطلب',
        description: 'The Prophet\'s grandfather passed away when Muhammad (PBUH) was eight years old. His uncle Abu Talib then became his guardian.',
        significance: 'Abu Talib would become a crucial protector of the Prophet during his mission.',
        category: 'pre-islamic'
      },
      {
        id: 'pre-5',
        year: '595 CE',
        title: 'Marriage to Khadijah',
        titleArabic: 'زواج خديجة',
        description: 'Prophet Muhammad (PBUH) married Khadijah bint Khuwaylid, a successful businesswoman 15 years his senior. She was the first to believe in his prophethood.',
        significance: 'Khadijah became the first Muslim and greatest supporter of the Prophet.',
        category: 'pre-islamic'
      },
      {
        id: 'pre-6',
        year: '605 CE',
        title: 'Rebuilding of the Kaaba',
        titleArabic: 'إعادة بناء الكعبة',
        description: 'The Quraysh rebuilt the Kaaba after a flood. A dispute arose about who would place the Black Stone. Muhammad (PBUH) resolved it by having representatives from each tribe hold a cloth while he placed the stone.',
        significance: 'Demonstrated the Prophet\'s wisdom and peacemaking abilities before prophethood.',
        category: 'pre-islamic'
      }
    ]
  },
  {
    id: 'prophetic-era',
    name: 'The Prophetic Era',
    nameArabic: 'العهد النبوي',
    startYear: '610 CE',
    endYear: '632 CE',
    description: 'The period of Prophet Muhammad\'s (PBUH) prophethood, from the first revelation to his passing',
    events: [
      {
        id: 'prop-1',
        year: '610 CE',
        yearHijri: '13 BH',
        title: 'First Revelation',
        titleArabic: 'نزول الوحي',
        description: 'Angel Jibreel (Gabriel) appeared to Prophet Muhammad (PBUH) in the Cave of Hira and revealed the first verses of Surah Al-Alaq: "Read in the name of your Lord who created."',
        significance: 'The beginning of the Quran\'s revelation and Muhammad\'s prophethood.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-2',
        year: '610 CE',
        yearHijri: '13 BH',
        title: 'Khadijah Accepts Islam',
        titleArabic: 'إسلام خديجة',
        description: 'Khadijah (RA) became the first person to accept Islam, supporting her husband through his initial fear and confusion after the first revelation.',
        significance: 'The first Muslim and the Prophet\'s greatest supporter.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-3',
        year: '613 CE',
        yearHijri: '10 BH',
        title: 'Public Preaching Begins',
        titleArabic: 'الدعوة الجهرية',
        description: 'After three years of secret preaching, Allah commanded the Prophet to preach openly. He climbed Mount Safa and called the Quraysh to Islam.',
        significance: 'The beginning of open Islamic dawah and subsequent persecution.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-4',
        year: '615 CE',
        yearHijri: '8 BH',
        title: 'First Migration to Abyssinia',
        titleArabic: 'الهجرة إلى الحبشة',
        description: 'Due to persecution, the Prophet sent a group of Muslims to seek refuge with the Christian king Negus (An-Najashi) of Abyssinia (Ethiopia).',
        significance: 'First migration in Islam and recognition of Islam by a Christian ruler.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-5',
        year: '616 CE',
        yearHijri: '7 BH',
        title: 'Hamza and Umar Accept Islam',
        titleArabic: 'إسلام حمزة وعمر',
        description: 'Two powerful Qurayshi men, Hamza ibn Abdul Muttalib and Umar ibn al-Khattab, converted to Islam, greatly strengthening the Muslim community.',
        significance: 'Strengthened the Muslim community and allowed more open worship.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-6',
        year: '617 CE',
        yearHijri: '6 BH',
        title: 'Boycott of Banu Hashim',
        titleArabic: 'حصار شعب أبي طالب',
        description: 'The Quraysh imposed a complete social and economic boycott on Banu Hashim and Banu Muttalib, confining them to a valley for three years.',
        significance: 'A severe test for early Muslims, demonstrating their steadfastness.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-7',
        year: '619 CE',
        yearHijri: '4 BH',
        title: 'Year of Sorrow',
        titleArabic: 'عام الحزن',
        description: 'Both Khadijah (RA), the Prophet\'s beloved wife, and Abu Talib, his protective uncle, passed away within a short period.',
        significance: 'The Prophet lost his greatest personal and tribal supporters.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-8',
        year: '619 CE',
        yearHijri: '4 BH',
        title: 'Journey to Taif',
        titleArabic: 'رحلة الطائف',
        description: 'The Prophet traveled to Taif to seek support but was rejected and stoned by the people. Angels offered to destroy the city, but he prayed for their guidance instead.',
        significance: 'Demonstrated the Prophet\'s mercy and patience in adversity.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-9',
        year: '620 CE',
        yearHijri: '3 BH',
        title: 'Isra and Miraj',
        titleArabic: 'الإسراء والمعراج',
        description: 'The miraculous night journey from Makkah to Jerusalem (Isra) and ascension through the heavens (Miraj) where the five daily prayers were prescribed.',
        significance: 'Affirmation of the Prophet\'s status and prescription of daily prayers.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-10',
        year: '622 CE',
        yearHijri: '1 AH',
        title: 'The Hijra to Madinah',
        titleArabic: 'الهجرة إلى المدينة',
        description: 'The Prophet and the Muslims migrated from Makkah to Madinah after receiving death threats. This marks the beginning of the Islamic calendar.',
        significance: 'Establishment of the first Islamic state and beginning of the Hijri calendar.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-11',
        year: '622 CE',
        yearHijri: '1 AH',
        title: 'Constitution of Madinah',
        titleArabic: 'صحيفة المدينة',
        description: 'The Prophet established a charter governing relations between Muslims, Jews, and other tribes in Madinah, creating a unified political entity.',
        significance: 'First written constitution in history establishing religious pluralism.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-12',
        year: '622 CE',
        yearHijri: '1 AH',
        title: 'Building of Masjid Nabawi',
        titleArabic: 'بناء المسجد النبوي',
        description: 'The Prophet\'s Mosque was built in Madinah, becoming the center of the Muslim community for worship, education, and governance.',
        significance: 'Second holiest mosque in Islam, established the model for Islamic community centers.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-13',
        year: '624 CE',
        yearHijri: '2 AH',
        title: 'Battle of Badr',
        titleArabic: 'غزوة بدر',
        description: 'The first major battle between Muslims and the Quraysh. Despite being outnumbered 3 to 1, the Muslims achieved a decisive victory with divine assistance.',
        significance: 'First military victory of Islam, mentioned in Quran as "Yawm al-Furqan" (Day of Criterion).',
        category: 'prophetic-era'
      },
      {
        id: 'prop-14',
        year: '624 CE',
        yearHijri: '2 AH',
        title: 'Change of Qibla',
        titleArabic: 'تحويل القبلة',
        description: 'The direction of prayer was changed from Jerusalem to the Kaaba in Makkah during a prayer, as commanded by Allah in Surah Al-Baqarah.',
        significance: 'Established Makkah as the central point of Islamic worship.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-15',
        year: '625 CE',
        yearHijri: '3 AH',
        title: 'Battle of Uhud',
        titleArabic: 'غزوة أحد',
        description: 'The second major battle near Mount Uhud. Initial Muslim success turned to setback when archers left their positions. Hamza (RA) was martyred.',
        significance: 'A lesson in obedience and the consequences of disobeying the Prophet\'s commands.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-16',
        year: '627 CE',
        yearHijri: '5 AH',
        title: 'Battle of the Trench (Khandaq)',
        titleArabic: 'غزوة الخندق',
        description: 'A coalition of 10,000 enemies besieged Madinah. The Muslims dug a trench around the city on Salman al-Farisi\'s suggestion, and Allah sent winds to defeat the enemy.',
        significance: 'Divine intervention saved the Muslims; marked the end of Meccan aggression.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-17',
        year: '628 CE',
        yearHijri: '6 AH',
        title: 'Treaty of Hudaybiyyah',
        titleArabic: 'صلح الحديبية',
        description: 'A peace treaty was signed between Muslims and the Quraysh, allowing Muslims to return for Umrah the following year. It seemed unfavorable but led to great victories.',
        significance: 'Described as a "clear victory" in the Quran; allowed Islam to spread peacefully.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-18',
        year: '628 CE',
        yearHijri: '7 AH',
        title: 'Conquest of Khaybar',
        titleArabic: 'فتح خيبر',
        description: 'The Jewish fortress of Khaybar was conquered after its inhabitants broke their treaty with the Muslims and conspired against them.',
        significance: 'Secured the northern frontier and demonstrated Muslim military strength.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-19',
        year: '629 CE',
        yearHijri: '7 AH',
        title: 'Letters to World Leaders',
        titleArabic: 'رسائل إلى الملوك',
        description: 'The Prophet sent letters inviting the rulers of Persia, Rome, Egypt, and Abyssinia to Islam, establishing Islam as a universal message.',
        significance: 'Islam declared as a message for all humanity, not just Arabs.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-20',
        year: '630 CE',
        yearHijri: '8 AH',
        title: 'Conquest of Makkah',
        titleArabic: 'فتح مكة',
        description: 'The Prophet peacefully conquered Makkah with 10,000 Muslims. He destroyed the idols in the Kaaba and declared general amnesty for his former persecutors.',
        significance: 'The Kaaba was cleansed of idols and restored to monotheistic worship.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-21',
        year: '630 CE',
        yearHijri: '8 AH',
        title: 'Battle of Hunayn',
        titleArabic: 'غزوة حنين',
        description: 'Shortly after conquering Makkah, Muslims faced the tribes of Hawazin and Thaqif. Initial overconfidence led to setback, but victory came through steadfastness.',
        significance: 'Lesson that victory comes from Allah, not from numbers or strength.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-22',
        year: '630 CE',
        yearHijri: '9 AH',
        title: 'Expedition to Tabuk',
        titleArabic: 'غزوة تبوك',
        description: 'The Prophet led a large army to Tabuk near the Byzantine border. Though no battle occurred, it demonstrated Muslim military reach and exposed hypocrites.',
        significance: 'The last military expedition led by the Prophet; tested the faith of Muslims.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-23',
        year: '632 CE',
        yearHijri: '10 AH',
        title: 'Farewell Pilgrimage',
        titleArabic: 'حجة الوداع',
        description: 'The Prophet performed his only Hajj and delivered the Farewell Sermon at Arafat, establishing fundamental Islamic principles and human rights.',
        significance: 'The Prophet\'s final major address, establishing equality and rights in Islam.',
        category: 'prophetic-era'
      },
      {
        id: 'prop-24',
        year: '632 CE',
        yearHijri: '11 AH',
        title: 'Passing of Prophet Muhammad',
        titleArabic: 'وفاة الرسول',
        description: 'Prophet Muhammad (PBUH) passed away in Madinah at age 63, having completed his mission. He was buried in the chamber of Aisha (RA), now part of Masjid Nabawi.',
        significance: 'The end of prophethood; Islam was complete as stated in Quran 5:3.',
        category: 'prophetic-era'
      }
    ]
  },
  {
    id: 'rashidun',
    name: 'The Rashidun Caliphate',
    nameArabic: 'الخلافة الراشدة',
    startYear: '632 CE',
    endYear: '661 CE',
    description: 'The era of the four rightly guided caliphs: Abu Bakr, Umar, Uthman, and Ali',
    events: [
      {
        id: 'rash-1',
        year: '632 CE',
        yearHijri: '11 AH',
        title: 'Abu Bakr Becomes Caliph',
        titleArabic: 'خلافة أبي بكر',
        description: 'Abu Bakr al-Siddiq was chosen as the first Caliph at Saqifah Bani Saidah. He was the Prophet\'s closest companion and father-in-law.',
        significance: 'Established the precedent of selecting leaders through consultation (Shura).',
        category: 'rashidun'
      },
      {
        id: 'rash-2',
        year: '632-633 CE',
        yearHijri: '11-12 AH',
        title: 'Ridda Wars',
        titleArabic: 'حروب الردة',
        description: 'Abu Bakr fought against tribes that refused to pay Zakat or followed false prophets after the Prophet\'s death, reunifying Arabia under Islam.',
        significance: 'Preserved the unity of the Muslim ummah and the integrity of Islamic law.',
        category: 'rashidun'
      },
      {
        id: 'rash-3',
        year: '633 CE',
        yearHijri: '12 AH',
        title: 'Compilation of the Quran',
        titleArabic: 'جمع القرآن',
        description: 'Abu Bakr ordered Zayd ibn Thabit to compile the Quran into a single book after many huffaz (memorizers) died in battles.',
        significance: 'First complete written compilation of the Holy Quran.',
        category: 'rashidun'
      },
      {
        id: 'rash-4',
        year: '634 CE',
        yearHijri: '13 AH',
        title: 'Umar Becomes Caliph',
        titleArabic: 'خلافة عمر',
        description: 'Umar ibn al-Khattab became the second Caliph after Abu Bakr nominated him on his deathbed. His reign would see massive Islamic expansion.',
        significance: 'One of the greatest expansions of Islamic territory in history.',
        category: 'rashidun'
      },
      {
        id: 'rash-5',
        year: '636 CE',
        yearHijri: '15 AH',
        title: 'Battle of Yarmouk',
        titleArabic: 'معركة اليرموك',
        description: 'A decisive battle where Muslim forces under Khalid ibn al-Walid defeated the Byzantine Empire, opening the way to Syria and Palestine.',
        significance: 'Ended Byzantine rule in Syria and opened the Levant to Islam.',
        category: 'rashidun'
      },
      {
        id: 'rash-6',
        year: '636 CE',
        yearHijri: '15 AH',
        title: 'Battle of Qadisiyyah',
        titleArabic: 'معركة القادسية',
        description: 'Muslim forces under Saad ibn Abi Waqqas defeated the Persian Sassanid Empire, leading to the conquest of Iraq and eventually Persia.',
        significance: 'Ended the Sassanid Empire and brought Persia into the Islamic world.',
        category: 'rashidun'
      },
      {
        id: 'rash-7',
        year: '637 CE',
        yearHijri: '16 AH',
        title: 'Conquest of Jerusalem',
        titleArabic: 'فتح القدس',
        description: 'Umar personally traveled to Jerusalem to accept its surrender. He prayed near the Church of the Holy Sepulchre but outside it, to protect Christian rights.',
        significance: 'Jerusalem came under Muslim rule with protection for all religious communities.',
        category: 'rashidun'
      },
      {
        id: 'rash-8',
        year: '639-642 CE',
        yearHijri: '18-21 AH',
        title: 'Conquest of Egypt',
        titleArabic: 'فتح مصر',
        description: 'Amr ibn al-As led the conquest of Egypt, freeing Coptic Christians from Byzantine persecution. He founded Fustat, which would become Cairo.',
        significance: 'Egypt became a major center of Islamic civilization.',
        category: 'rashidun'
      },
      {
        id: 'rash-9',
        year: '644 CE',
        yearHijri: '23 AH',
        title: 'Uthman Becomes Caliph',
        titleArabic: 'خلافة عثمان',
        description: 'Uthman ibn Affan was selected as the third Caliph by a council of six companions appointed by Umar before his assassination.',
        significance: 'Continued expansion and standardized the Quranic text.',
        category: 'rashidun'
      },
      {
        id: 'rash-10',
        year: '651 CE',
        yearHijri: '31 AH',
        title: 'Standardization of the Quran',
        titleArabic: 'توحيد المصاحف',
        description: 'Uthman ordered the compilation of a standard Quran codex and distributed copies to major cities, burning variant collections to preserve unity.',
        significance: 'Ensured the Quran\'s preservation in its original form for all time.',
        category: 'rashidun'
      },
      {
        id: 'rash-11',
        year: '656 CE',
        yearHijri: '35 AH',
        title: 'Martyrdom of Uthman',
        titleArabic: 'استشهاد عثمان',
        description: 'Uthman was assassinated by rebels while reading the Quran. His blood stained the pages of his mushaf.',
        significance: 'Marked the beginning of the first fitna (civil strife) in Islamic history.',
        category: 'rashidun'
      },
      {
        id: 'rash-12',
        year: '656 CE',
        yearHijri: '35 AH',
        title: 'Ali Becomes Caliph',
        titleArabic: 'خلافة علي',
        description: 'Ali ibn Abi Talib, the Prophet\'s cousin and son-in-law, became the fourth Caliph. He faced immediate challenges from those seeking justice for Uthman.',
        significance: 'Known for his justice, knowledge, and bravery.',
        category: 'rashidun'
      },
      {
        id: 'rash-13',
        year: '656 CE',
        yearHijri: '36 AH',
        title: 'Battle of the Camel',
        titleArabic: 'موقعة الجمل',
        description: 'A battle between Ali\'s forces and those of Aisha, Talha, and Zubayr near Basra. It ended with Ali\'s victory and reconciliation with Aisha.',
        significance: 'First military conflict between Muslims; highlighted the need for unity.',
        category: 'rashidun'
      },
      {
        id: 'rash-14',
        year: '657 CE',
        yearHijri: '37 AH',
        title: 'Battle of Siffin',
        titleArabic: 'معركة صفين',
        description: 'A prolonged battle between Ali and Muawiyah in Syria. It ended in arbitration after Muawiyah\'s soldiers raised Qurans on their spears.',
        significance: 'Led to the emergence of the Kharijites and prolonged political division.',
        category: 'rashidun'
      },
      {
        id: 'rash-15',
        year: '661 CE',
        yearHijri: '40 AH',
        title: 'Martyrdom of Ali',
        titleArabic: 'استشهاد علي',
        description: 'Ali was assassinated by a Kharijite named Ibn Muljam while praying Fajr in the mosque of Kufa.',
        significance: 'End of the Rashidun Caliphate; beginning of the Umayyad dynasty.',
        category: 'rashidun'
      }
    ]
  },
  {
    id: 'umayyad',
    name: 'The Umayyad Caliphate',
    nameArabic: 'الخلافة الأموية',
    startYear: '661 CE',
    endYear: '750 CE',
    description: 'The first hereditary dynasty of Islam, ruling from Damascus',
    events: [
      {
        id: 'uma-1',
        year: '661 CE',
        yearHijri: '41 AH',
        title: 'Muawiyah Becomes Caliph',
        titleArabic: 'خلافة معاوية',
        description: 'Muawiyah ibn Abi Sufyan became Caliph after Hasan ibn Ali ceded power to prevent further bloodshed. Damascus became the new capital.',
        significance: 'Established the Umayyad dynasty and moved the capital to Damascus.',
        category: 'umayyad'
      },
      {
        id: 'uma-2',
        year: '680 CE',
        yearHijri: '61 AH',
        title: 'Tragedy of Karbala',
        titleArabic: 'مأساة كربلاء',
        description: 'Husayn ibn Ali, grandson of the Prophet, was martyred along with 72 companions at Karbala by Yazid\'s army on the 10th of Muharram.',
        significance: 'A defining moment in Islamic history; commemorated annually as Ashura.',
        category: 'umayyad'
      },
      {
        id: 'uma-3',
        year: '685-705 CE',
        yearHijri: '65-86 AH',
        title: 'Reign of Abdul Malik',
        titleArabic: 'خلافة عبد الملك',
        description: 'Abdul Malik ibn Marwan consolidated Umayyad rule, Arabized the administration, minted Islamic coins, and built the Dome of the Rock.',
        significance: 'Strengthened the Islamic state and Arabic became the administrative language.',
        category: 'umayyad'
      },
      {
        id: 'uma-4',
        year: '691 CE',
        yearHijri: '72 AH',
        title: 'Dome of the Rock Built',
        titleArabic: 'بناء قبة الصخرة',
        description: 'Abdul Malik completed the Dome of the Rock in Jerusalem, one of the oldest surviving works of Islamic architecture.',
        significance: 'Iconic symbol of Jerusalem and Islamic architectural achievement.',
        category: 'umayyad'
      },
      {
        id: 'uma-5',
        year: '711 CE',
        yearHijri: '92 AH',
        title: 'Conquest of Spain',
        titleArabic: 'فتح الأندلس',
        description: 'Tariq ibn Ziyad crossed into Spain (Al-Andalus) and defeated the Visigoths. The strait was named after him (Gibraltar = Jabal Tariq).',
        significance: 'Beginning of nearly 800 years of Islamic civilization in Spain.',
        category: 'umayyad'
      },
      {
        id: 'uma-6',
        year: '711-713 CE',
        yearHijri: '92-94 AH',
        title: 'Conquest of Sindh',
        titleArabic: 'فتح السند',
        description: 'Muhammad ibn Qasim conquered Sindh (modern Pakistan), introducing Islam to the Indian subcontinent.',
        significance: 'Beginning of Islam in South Asia.',
        category: 'umayyad'
      },
      {
        id: 'uma-7',
        year: '717-720 CE',
        yearHijri: '99-101 AH',
        title: 'Reign of Umar II',
        titleArabic: 'خلافة عمر بن عبد العزيز',
        description: 'Umar ibn Abdul Aziz, known as the fifth Rashidun Caliph for his piety, reformed taxes, promoted justice, and encouraged conversion to Islam.',
        significance: 'Considered the most pious Umayyad caliph; major spiritual revival.',
        category: 'umayyad'
      },
      {
        id: 'uma-8',
        year: '732 CE',
        yearHijri: '114 AH',
        title: 'Battle of Tours',
        titleArabic: 'معركة بلاط الشهداء',
        description: 'Muslim forces were defeated by Charles Martel in France, marking the furthest extent of Islamic expansion into Western Europe.',
        significance: 'Defined the boundary between Islamic and Christian Europe.',
        category: 'umayyad'
      },
      {
        id: 'uma-9',
        year: '750 CE',
        yearHijri: '132 AH',
        title: 'Fall of the Umayyads',
        titleArabic: 'سقوط الأمويين',
        description: 'The Abbasid revolution overthrew the Umayyads. Most of the Umayyad family was killed, but Abd al-Rahman escaped to Spain.',
        significance: 'End of Umayyad rule in the East; continuation in Al-Andalus.',
        category: 'umayyad'
      }
    ]
  },
  {
    id: 'abbasid',
    name: 'The Abbasid Caliphate',
    nameArabic: 'الخلافة العباسية',
    startYear: '750 CE',
    endYear: '1258 CE',
    description: 'The golden age of Islamic civilization, ruling from Baghdad',
    events: [
      {
        id: 'abb-1',
        year: '750 CE',
        yearHijri: '132 AH',
        title: 'Establishment of Abbasid Rule',
        titleArabic: 'قيام الخلافة العباسية',
        description: 'Abu al-Abbas al-Saffah became the first Abbasid Caliph after defeating the Umayyads at the Battle of the Zab.',
        significance: 'Shifted power from Arab aristocracy to a more inclusive Islamic state.',
        category: 'abbasid'
      },
      {
        id: 'abb-2',
        year: '762 CE',
        yearHijri: '145 AH',
        title: 'Foundation of Baghdad',
        titleArabic: 'تأسيس بغداد',
        description: 'Caliph al-Mansur founded Baghdad as the new capital, calling it Madinat al-Salam (City of Peace). It became the center of the Islamic world.',
        significance: 'Baghdad became the largest and most prosperous city in the world.',
        category: 'abbasid'
      },
      {
        id: 'abb-3',
        year: '786-809 CE',
        yearHijri: '170-193 AH',
        title: 'Reign of Harun al-Rashid',
        titleArabic: 'خلافة هارون الرشيد',
        description: 'The reign of Harun al-Rashid represented the peak of Abbasid power and culture. He is famous in the Thousand and One Nights stories.',
        significance: 'Golden age of Islamic arts, science, and culture.',
        category: 'abbasid'
      },
      {
        id: 'abb-4',
        year: '813-833 CE',
        yearHijri: '198-218 AH',
        title: 'Reign of al-Mamun',
        titleArabic: 'خلافة المأمون',
        description: 'Al-Mamun established the House of Wisdom (Bayt al-Hikma), a major intellectual center that translated Greek works and advanced sciences.',
        significance: 'Peak of the Islamic golden age; major advances in science and philosophy.',
        category: 'abbasid'
      },
      {
        id: 'abb-5',
        year: '830 CE',
        yearHijri: '215 AH',
        title: 'House of Wisdom',
        titleArabic: 'بيت الحكمة',
        description: 'The House of Wisdom in Baghdad became the world\'s greatest center of learning, translating works from Greek, Persian, and Indian languages.',
        significance: 'Preserved and advanced human knowledge during the European Dark Ages.',
        category: 'abbasid'
      },
      {
        id: 'abb-6',
        year: '850 CE',
        yearHijri: '236 AH',
        title: 'Compilation of Hadith',
        titleArabic: 'تدوين الحديث',
        description: 'The major hadith collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah) were compiled during this period.',
        significance: 'Preservation of the Prophet\'s teachings for all future generations.',
        category: 'abbasid'
      },
      {
        id: 'abb-7',
        year: '945 CE',
        yearHijri: '334 AH',
        title: 'Buyid Control of Baghdad',
        titleArabic: 'سيطرة البويهيين',
        description: 'The Buyid dynasty from Persia took control of Baghdad, reducing the Abbasid caliphs to figureheads.',
        significance: 'Beginning of Abbasid decline as political power shifted.',
        category: 'abbasid'
      },
      {
        id: 'abb-8',
        year: '1055 CE',
        yearHijri: '447 AH',
        title: 'Seljuk Turks Take Baghdad',
        titleArabic: 'دخول السلاجقة بغداد',
        description: 'The Seljuk Turks under Tughril Beg took Baghdad, becoming protectors of the Abbasid Caliphate against the Shia Buyids.',
        significance: 'Sunni Turkish rule restored; beginning of Turkish influence in Islam.',
        category: 'abbasid'
      },
      {
        id: 'abb-9',
        year: '1258 CE',
        yearHijri: '656 AH',
        title: 'Fall of Baghdad',
        titleArabic: 'سقوط بغداد',
        description: 'The Mongols under Hulagu Khan sacked Baghdad, killing the last Abbasid Caliph and destroying much of the city\'s heritage.',
        significance: 'End of the Abbasid Caliphate; devastating blow to Islamic civilization.',
        category: 'abbasid'
      }
    ]
  },
  {
    id: 'later-periods',
    name: 'Later Islamic Empires',
    nameArabic: 'الإمبراطوريات الإسلامية اللاحقة',
    startYear: '1258 CE',
    endYear: '1924 CE',
    description: 'Major Islamic empires after the fall of Baghdad: Mamluks, Ottomans, Safavids, and Mughals',
    events: [
      {
        id: 'later-1',
        year: '1260 CE',
        yearHijri: '658 AH',
        title: 'Battle of Ain Jalut',
        titleArabic: 'معركة عين جالوت',
        description: 'The Mamluk Sultanate of Egypt defeated the Mongols in Palestine, halting their westward expansion and saving Islam.',
        significance: 'First major Mongol defeat; saved the Muslim world from destruction.',
        category: 'later-periods'
      },
      {
        id: 'later-2',
        year: '1299 CE',
        yearHijri: '698 AH',
        title: 'Rise of the Ottoman Empire',
        titleArabic: 'قيام الدولة العثمانية',
        description: 'Osman I founded the Ottoman dynasty in Anatolia, which would grow into one of the largest empires in history.',
        significance: 'Beginning of an empire that would last over 600 years.',
        category: 'later-periods'
      },
      {
        id: 'later-3',
        year: '1453 CE',
        yearHijri: '857 AH',
        title: 'Conquest of Constantinople',
        titleArabic: 'فتح القسطنطينية',
        description: 'Sultan Mehmed II conquered Constantinople, ending the Byzantine Empire. The city was renamed Istanbul and became the Ottoman capital.',
        significance: 'Fulfilled the Prophet\'s prophecy about the conquest of Constantinople.',
        category: 'later-periods'
      },
      {
        id: 'later-4',
        year: '1492 CE',
        yearHijri: '897 AH',
        title: 'Fall of Granada',
        titleArabic: 'سقوط غرناطة',
        description: 'The last Muslim kingdom in Spain fell to Ferdinand and Isabella, ending nearly 800 years of Islamic presence in Iberia.',
        significance: 'End of Al-Andalus; beginning of the Spanish Inquisition.',
        category: 'later-periods'
      },
      {
        id: 'later-5',
        year: '1501 CE',
        yearHijri: '907 AH',
        title: 'Rise of the Safavid Empire',
        titleArabic: 'قيام الدولة الصفوية',
        description: 'Shah Ismail I established the Safavid Empire in Persia, making Twelver Shia Islam the state religion.',
        significance: 'Established Shia Islam as the dominant faith in Iran.',
        category: 'later-periods'
      },
      {
        id: 'later-6',
        year: '1517 CE',
        yearHijri: '923 AH',
        title: 'Ottoman Conquest of Egypt',
        titleArabic: 'الفتح العثماني لمصر',
        description: 'Sultan Selim I conquered Egypt, ending the Mamluk Sultanate. The Ottomans became protectors of the Holy Cities.',
        significance: 'Ottomans became the leading power in the Muslim world.',
        category: 'later-periods'
      },
      {
        id: 'later-7',
        year: '1526 CE',
        yearHijri: '932 AH',
        title: 'Foundation of Mughal Empire',
        titleArabic: 'تأسيس الإمبراطورية المغولية',
        description: 'Babur defeated the Delhi Sultanate and established the Mughal Empire in India, which would create the Taj Mahal and other masterpieces.',
        significance: 'Beginning of a golden age of Islamic culture in South Asia.',
        category: 'later-periods'
      },
      {
        id: 'later-8',
        year: '1529 CE',
        yearHijri: '935 AH',
        title: 'Siege of Vienna',
        titleArabic: 'حصار فيينا',
        description: 'The Ottomans under Suleiman the Magnificent besieged Vienna but failed to capture it, marking the limit of Ottoman expansion in Europe.',
        significance: 'Defined the boundary of Ottoman expansion into Central Europe.',
        category: 'later-periods'
      },
      {
        id: 'later-9',
        year: '1556-1605 CE',
        yearHijri: '963-1014 AH',
        title: 'Reign of Akbar',
        titleArabic: 'حكم أكبر',
        description: 'Mughal Emperor Akbar expanded the empire and promoted religious tolerance, creating a unique Indo-Islamic culture.',
        significance: 'Peak of Mughal power and cultural synthesis.',
        category: 'later-periods'
      },
      {
        id: 'later-10',
        year: '1632-1653 CE',
        yearHijri: '1042-1063 AH',
        title: 'Construction of Taj Mahal',
        titleArabic: 'بناء تاج محل',
        description: 'Shah Jahan built the Taj Mahal as a mausoleum for his wife Mumtaz Mahal, creating one of the world\'s most beautiful buildings.',
        significance: 'Masterpiece of Islamic architecture and symbol of eternal love.',
        category: 'later-periods'
      },
      {
        id: 'later-11',
        year: '1924 CE',
        yearHijri: '1342 AH',
        title: 'Abolition of the Caliphate',
        titleArabic: 'إلغاء الخلافة',
        description: 'Mustafa Kemal Ataturk abolished the Ottoman Caliphate, ending the last major Islamic caliphate after over 1,300 years.',
        significance: 'End of the traditional Islamic political order.',
        category: 'later-periods'
      }
    ]
  },
  {
    id: 'modern',
    name: 'Modern Era',
    nameArabic: 'العصر الحديث',
    startYear: '1924 CE',
    endYear: 'Present',
    description: 'The contemporary period of Islamic history',
    events: [
      {
        id: 'mod-1',
        year: '1932 CE',
        yearHijri: '1351 AH',
        title: 'Foundation of Saudi Arabia',
        titleArabic: 'تأسيس المملكة العربية السعودية',
        description: 'King Abdulaziz ibn Saud unified the Arabian Peninsula and established the Kingdom of Saudi Arabia, guardian of the Two Holy Mosques.',
        significance: 'Modern Saudi state became custodian of Makkah and Madinah.',
        category: 'modern'
      },
      {
        id: 'mod-2',
        year: '1947 CE',
        yearHijri: '1366 AH',
        title: 'Creation of Pakistan',
        titleArabic: 'إنشاء باكستان',
        description: 'Pakistan was created as a homeland for Muslims of the Indian subcontinent during the partition of British India.',
        significance: 'Largest Muslim-majority country created in modern times.',
        category: 'modern'
      },
      {
        id: 'mod-3',
        year: '1948 CE',
        yearHijri: '1367 AH',
        title: 'Creation of Israel',
        titleArabic: 'إنشاء إسرائيل',
        description: 'The State of Israel was established, leading to the displacement of Palestinians and ongoing conflict over Jerusalem and the holy sites.',
        significance: 'Beginning of the Palestinian-Israeli conflict affecting Al-Aqsa.',
        category: 'modern'
      },
      {
        id: 'mod-4',
        year: '1969 CE',
        yearHijri: '1389 AH',
        title: 'Al-Aqsa Fire',
        titleArabic: 'حريق المسجد الأقصى',
        description: 'A fire damaged the Al-Aqsa Mosque in Jerusalem, leading to the formation of the Organisation of Islamic Cooperation (OIC).',
        significance: 'United Muslim nations in protecting Islamic holy sites.',
        category: 'modern'
      },
      {
        id: 'mod-5',
        year: '1979 CE',
        yearHijri: '1399 AH',
        title: 'Iranian Revolution',
        titleArabic: 'الثورة الإيرانية',
        description: 'Ayatollah Khomeini led an Islamic revolution in Iran, establishing an Islamic Republic and changing the Middle East\'s political landscape.',
        significance: 'First modern Islamic revolution; major shift in regional politics.',
        category: 'modern'
      },
      {
        id: 'mod-6',
        year: '1979 CE',
        yearHijri: '1400 AH',
        title: 'Siege of Makkah',
        titleArabic: 'حصار مكة',
        description: 'Armed militants seized the Grand Mosque in Makkah, holding it for two weeks before being defeated by Saudi forces.',
        significance: 'Major security challenge to the Muslim holy sites.',
        category: 'modern'
      },
      {
        id: 'mod-7',
        year: '2010s',
        yearHijri: '1430s AH',
        title: 'Expansion of the Two Holy Mosques',
        titleArabic: 'توسعة الحرمين',
        description: 'Major expansions of Masjid al-Haram and Masjid an-Nabawi to accommodate millions of pilgrims annually.',
        significance: 'Enabling more Muslims to perform Hajj and Umrah.',
        category: 'modern'
      }
    ]
  }
];

export function getEventsByCategory(category: string): HistoricalEvent[] {
  const period = ISLAMIC_HISTORY.find(p => p.id === category);
  return period ? period.events : [];
}

export function getAllEvents(): HistoricalEvent[] {
  return ISLAMIC_HISTORY.flatMap(period => period.events);
}

export function searchHistory(query: string): HistoricalEvent[] {
  const lowerQuery = query.toLowerCase();
  return getAllEvents().filter(event =>
    event.title.toLowerCase().includes(lowerQuery) ||
    event.description.toLowerCase().includes(lowerQuery) ||
    event.year.toLowerCase().includes(lowerQuery)
  );
}
