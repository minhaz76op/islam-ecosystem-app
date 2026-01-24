export interface IslamicStory {
  id: string;
  title: string;
  titleArabic: string;
  category: 'prophets' | 'companions' | 'scholars' | 'miracles' | 'moral-stories';
  summary: string;
  content: string;
  lessons: string[];
  references: string[];
}

export interface StoryCategory {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  icon: string;
}

export const STORY_CATEGORIES: StoryCategory[] = [
  {
    id: 'prophets',
    name: 'Stories of the Prophets',
    nameArabic: 'قصص الأنبياء',
    description: 'Stories of the messengers sent by Allah to guide humanity',
    icon: 'star'
  },
  {
    id: 'companions',
    name: 'Stories of the Companions',
    nameArabic: 'قصص الصحابة',
    description: 'Stories of the noble companions of Prophet Muhammad (PBUH)',
    icon: 'users'
  },
  {
    id: 'scholars',
    name: 'Stories of the Scholars',
    nameArabic: 'قصص العلماء',
    description: 'Stories of great Islamic scholars and their wisdom',
    icon: 'book'
  },
  {
    id: 'miracles',
    name: 'Miracles and Signs',
    nameArabic: 'المعجزات والآيات',
    description: 'Stories of miracles and divine signs',
    icon: 'zap'
  },
  {
    id: 'moral-stories',
    name: 'Moral Stories',
    nameArabic: 'قصص أخلاقية',
    description: 'Stories with important moral lessons from Islamic tradition',
    icon: 'heart'
  }
];

export const ISLAMIC_STORIES: IslamicStory[] = [
  // Prophet Stories
  {
    id: 'adam',
    title: 'Prophet Adam - The First Human',
    titleArabic: 'النبي آدم عليه السلام',
    category: 'prophets',
    summary: 'The story of the first human being and prophet, created by Allah from clay.',
    content: `Allah created Adam (peace be upon him) from clay, fashioning him with His own Hands. He breathed His spirit into Adam and taught him the names of all things. Allah then commanded the angels to prostrate before Adam, and all obeyed except Iblis (Satan), who refused out of arrogance.

Adam was placed in Paradise (Jannah) and Allah created Hawwa (Eve) as his companion. They were permitted to enjoy all the blessings of Paradise except for one tree, which they were forbidden to approach.

However, Iblis, jealous and vengeful, whispered to them and deceived them into eating from the forbidden tree. When they realized their mistake, Adam and Hawwa immediately sought Allah's forgiveness, saying: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers." (Quran 7:23)

Allah, the Most Merciful, accepted their repentance and sent them to Earth as His vicegerents (khalifah). Adam became the first prophet, teaching his descendants about Allah, the purpose of life, and how to worship properly.

Adam lived for approximately 1,000 years and is buried according to Islamic tradition in either the Cave of Treasures near Mecca or in Jerusalem. He had many children, including Cain (Qabil), Abel (Habil), and Seth (Shith), who continued his prophetic lineage.`,
    lessons: [
      'Allah honors human beings above other creations',
      'Arrogance leads to downfall, as seen with Iblis',
      'Sincere repentance is always accepted by Allah',
      'Humans are appointed as caretakers of the Earth',
      'Following divine guidance leads to success'
    ],
    references: ['Quran 2:30-39', 'Quran 7:11-25', 'Quran 15:26-44', 'Quran 20:115-123']
  },
  {
    id: 'nuh',
    title: 'Prophet Nuh (Noah) - The Ark',
    titleArabic: 'النبي نوح عليه السلام',
    category: 'prophets',
    summary: 'The story of Prophet Nuh and the great flood that destroyed the disbelievers.',
    content: `Prophet Nuh (Noah), peace be upon him, was sent to a people who had strayed from the worship of Allah and turned to idol worship. For 950 years, he patiently called his people to the truth, but only a small number believed.

Despite facing mockery, rejection, and even threats from his people, Nuh continued his mission with unwavering faith. Allah revealed to him that no more people would believe, and commanded him to build an ark.

Nuh built the ark on dry land, far from any sea, causing his people to mock him even more. But he persevered, and when the ark was complete, Allah commanded him to take aboard a pair of every species and the believers.

When the time came, water gushed forth from the earth and poured down from the sky. The entire earth was flooded, and all the disbelievers perished, including Nuh's own son who refused to board the ark despite his father's pleas.

After the flood subsided, the ark came to rest on Mount Judi. Nuh and the believers descended and began life anew, worshipping Allah alone. Nuh is considered the second father of humanity, as all humans today are descended from those who survived the flood.`,
    lessons: [
      'Patience and perseverance in calling to Allah',
      'Faith in Allah even when it seems illogical to others',
      'Family ties do not guarantee salvation without faith',
      'Allah always protects the believers',
      'Mockery from disbelievers should not discourage the truth'
    ],
    references: ['Quran 11:25-49', 'Quran 23:23-30', 'Quran 26:105-122', 'Quran 71:1-28']
  },
  {
    id: 'ibrahim',
    title: 'Prophet Ibrahim - The Friend of Allah',
    titleArabic: 'النبي إبراهيم عليه السلام',
    category: 'prophets',
    summary: 'The story of Ibrahim, known as Khalilullah (the Friend of Allah), who built the Kaaba.',
    content: `Prophet Ibrahim (Abraham), peace be upon him, is one of the greatest prophets and is called Khalilullah - the Friend of Allah. From a young age, Ibrahim questioned the idol worship of his people and his own father, Azar.

Through logical reasoning, Ibrahim rejected the worship of stars, moon, and sun, realizing that only the Creator of all things deserves worship. When he declared his faith publicly and destroyed his people's idols, they threw him into a massive fire as punishment. But Allah commanded: "O fire, be coolness and safety upon Ibrahim." (Quran 21:69)

Allah tested Ibrahim repeatedly throughout his life. He was commanded to leave his wife Hajar and infant son Ismail in the barren desert of Mecca with only water and dates. When the water ran out and Hajar desperately searched for water, running between Safa and Marwa, Allah caused the spring of Zamzam to gush forth.

The greatest test came when Ibrahim was commanded to sacrifice his beloved son Ismail. Both father and son submitted to Allah's command completely. Just as Ibrahim was about to sacrifice Ismail, Allah replaced him with a ram and declared Ibrahim had passed the test.

Ibrahim and Ismail together built the Kaaba, the first house of worship for Allah, and prayed that Allah send a messenger from their descendants - a prayer answered with Prophet Muhammad (PBUH).`,
    lessons: [
      'Use reason to find the truth about Allah',
      'Complete submission (Islam) to Allah\'s will',
      'Trust in Allah during the most difficult trials',
      'The importance of the Kaaba and Hajj rituals',
      'Legacy of faith passed through generations'
    ],
    references: ['Quran 2:124-141', 'Quran 6:74-83', 'Quran 21:51-73', 'Quran 37:83-113']
  },
  {
    id: 'yusuf',
    title: 'Prophet Yusuf - The Most Beautiful Story',
    titleArabic: 'النبي يوسف عليه السلام',
    category: 'prophets',
    summary: 'The story of Yusuf, described by Allah as the best of stories.',
    content: `Prophet Yusuf (Joseph), peace be upon him, was blessed with exceptional beauty and wisdom. His story, called "the best of stories" by Allah in the Quran, teaches patience, forgiveness, and trust in Allah's plan.

As a young boy, Yusuf dreamed of eleven stars, the sun, and the moon prostrating to him. His father Yaqub (Jacob), also a prophet, understood this meant greatness awaited Yusuf and warned him not to tell his brothers.

Yusuf's brothers, jealous of their father's love for him, threw him into a well and told their father he was killed by a wolf. Yusuf was found by a caravan and sold into slavery in Egypt to a nobleman named Aziz.

Yusuf grew into a handsome young man, and Aziz's wife attempted to seduce him. When Yusuf refused, saying "I seek refuge in Allah," she falsely accused him, and he was imprisoned unjustly.

In prison, Yusuf interpreted dreams for fellow prisoners and eventually for the King of Egypt, who dreamed of seven fat cows eaten by seven lean cows. Yusuf explained this meant seven years of abundance followed by seven years of famine.

Impressed by his wisdom, the King appointed Yusuf as treasurer of Egypt. During the famine, Yusuf's brothers came seeking grain, not recognizing him. Eventually, Yusuf revealed himself and forgave them, saying: "No blame will there be upon you today. Allah will forgive you." (Quran 12:92)

His family, including his father Yaqub, moved to Egypt, and Yusuf's childhood dream was fulfilled when they all prostrated in respect before him.`,
    lessons: [
      'Patience through unjust treatment',
      'Maintaining chastity and moral integrity',
      'Trust in Allah\'s plan even in hardship',
      'The power of forgiveness over revenge',
      'Every hardship leads to ease with Allah\'s will'
    ],
    references: ['Quran 12:1-111 (Surah Yusuf - the entire chapter)']
  },
  {
    id: 'musa',
    title: 'Prophet Musa - The Kalimullah',
    titleArabic: 'النبي موسى عليه السلام',
    category: 'prophets',
    summary: 'The story of Musa, who spoke directly with Allah and led the Israelites.',
    content: `Prophet Musa (Moses), peace be upon him, is one of the most mentioned prophets in the Quran. He is called Kalimullah - the one who spoke directly with Allah.

Musa was born during a time when Pharaoh was killing all male Israelite babies. His mother, inspired by Allah, placed him in a basket in the Nile River. Remarkably, the basket was found by Pharaoh's own household, and Musa was raised in the palace.

As an adult, Musa accidentally killed an Egyptian while defending an Israelite and fled to Midian. There, he married and lived as a shepherd for years. At Mount Tur, Allah spoke to him from a burning bush and commissioned him as a prophet to confront Pharaoh.

Allah gave Musa two great miracles: his staff that could transform into a serpent and his hand that would glow with white light. With his brother Harun (Aaron) as his helper, Musa confronted Pharaoh with Allah's message: "Let the Children of Israel go."

Pharaoh refused despite witnessing numerous signs and plagues. Finally, Musa led the Israelites out of Egypt. When Pharaoh's army pursued them to the Red Sea, Allah commanded Musa to strike the sea with his staff. The waters parted, allowing the Israelites to cross, then closed upon Pharaoh and his army.

At Mount Sinai, Musa received the Torah from Allah and the Israelites were given divine law. Despite many trials, including the golden calf incident, Musa continued guiding his people with patience and dedication.`,
    lessons: [
      'Allah protects those He chooses even in hostile environments',
      'Courage to stand for truth against tyranny',
      'The importance of sincere supplication (dua)',
      'Patience with people who repeatedly err',
      'Divine support comes in unexpected ways'
    ],
    references: ['Quran 20:9-99', 'Quran 26:10-68', 'Quran 28:3-43', 'Quran 7:103-162']
  },
  {
    id: 'isa',
    title: 'Prophet Isa - The Messiah',
    titleArabic: 'النبي عيسى عليه السلام',
    category: 'prophets',
    summary: 'The story of Isa, born miraculously to Maryam, and his message to the Israelites.',
    content: `Prophet Isa (Jesus), peace be upon him, holds a special place in Islam as the Messiah (Al-Masih) and a great prophet. He was born miraculously to Maryam (Mary), peace be upon her, without a father, by Allah's command "Be, and it is."

When the angel Jibreel (Gabriel) announced to Maryam that she would have a son, she was amazed, asking how this could be when no man had touched her. The angel explained that Allah creates what He wills.

Maryam gave birth to Isa under a palm tree in a remote place. When she returned to her people carrying the baby, they accused her of wrongdoing. The infant Isa miraculously spoke from the cradle, declaring: "Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet." (Quran 19:30)

Allah gave Isa many miracles: he healed the blind and the leper, gave life to the dead by Allah's permission, and created birds from clay that flew when he breathed into them. He was given the Injeel (Gospel) and called the Children of Israel back to the worship of Allah alone.

Despite his miracles, most of his people rejected him. When they planned to kill him, Allah raised Isa to the heavens alive. The Quran states clearly that Isa was not crucified: "They did not kill him, nor did they crucify him; but it was made to appear so to them." (Quran 4:157)

Muslims believe Isa will return before the Day of Judgment to defeat the Dajjal (Antichrist), establish justice, and live as a follower of Prophet Muhammad's message before dying a natural death.`,
    lessons: [
      'Allah\'s power to create without normal means',
      'The importance of defending the innocent (Maryam)',
      'Miracles are granted by Allah alone',
      'Isa was a servant and prophet, not divine',
      'The promise of Isa\'s return gives hope'
    ],
    references: ['Quran 3:42-63', 'Quran 5:110-120', 'Quran 19:16-40', 'Quran 4:156-159']
  },
  {
    id: 'muhammad',
    title: 'Prophet Muhammad - The Final Messenger',
    titleArabic: 'النبي محمد ﷺ',
    category: 'prophets',
    summary: 'The story of the final prophet, sent as a mercy to all of humanity.',
    content: `Prophet Muhammad (peace be upon him) is the final messenger of Allah, sent as a mercy to all of humanity. Born in Makkah in 570 CE in the Year of the Elephant, he was known even before prophethood as Al-Amin (the Trustworthy) and Al-Sadiq (the Truthful).

Orphaned at a young age, Muhammad (PBUH) was raised by his grandfather Abdul Muttalib and then his uncle Abu Talib. He worked as a shepherd and later as a merchant, known for his honesty and integrity.

At age 40, while meditating in the Cave of Hira, the angel Jibreel appeared and commanded him to "Read!" The first verses of Surah Al-Alaq were revealed, marking the beginning of prophethood. His wife Khadijah was the first to believe, followed by Ali, Abu Bakr, and Zayd.

For 13 years in Makkah, the Prophet (PBUH) faced severe persecution but continued calling to Islam. The miraculous night journey of Isra and Miraj occurred during this period, where he traveled to Jerusalem and ascended through the heavens.

The migration (Hijra) to Madinah marked a new era. There, he established the first Islamic state, built the Prophet's Mosque, and created a just society. Despite numerous battles and challenges, the Muslim community grew and Makkah was eventually conquered peacefully in 630 CE.

The Prophet (PBUH) performed his Farewell Pilgrimage in 632 CE, delivering his famous final sermon that established human rights and equality. He passed away shortly after, having completed his mission of delivering Islam to humanity.`,
    lessons: [
      'Truthfulness and trustworthiness are foundations of character',
      'Patience and perseverance in the face of persecution',
      'The importance of gradual change and wisdom in dawah',
      'Justice and mercy should guide leadership',
      'The Quran and Sunnah are guides until the Day of Judgment'
    ],
    references: ['Quran 33:40', 'Quran 21:107', 'Quran 68:4', 'Sahih Bukhari', 'Sahih Muslim']
  },
  
  // Companion Stories
  {
    id: 'abu-bakr',
    title: 'Abu Bakr Al-Siddiq - The Truthful',
    titleArabic: 'أبو بكر الصديق',
    category: 'companions',
    summary: 'The story of the Prophet\'s closest companion and first Caliph.',
    content: `Abu Bakr al-Siddiq (may Allah be pleased with him) was the Prophet Muhammad's closest companion and the first adult male to accept Islam. His title "Al-Siddiq" (The Truthful) was given because he immediately believed the Prophet's account of the night journey (Isra and Miraj) when others doubted.

A successful merchant before Islam, Abu Bakr spent his entire wealth in the service of Islam. He purchased and freed many Muslim slaves who were being tortured, including Bilal ibn Rabah, the first muezzin.

Abu Bakr accompanied the Prophet during the dangerous migration to Madinah, hiding with him in the Cave of Thawr. When Abu Bakr feared for the Prophet's safety, he received the comforting words: "Do not grieve; indeed Allah is with us." (Quran 9:40)

After the Prophet's death, when many were in shock and some claimed Muhammad was not dead, Abu Bakr addressed the people: "Whoever worshipped Muhammad, know that Muhammad has died. But whoever worships Allah, know that Allah is Ever-Living and never dies." He then recited the verse confirming the mortality of the Prophet.

As the first Caliph, Abu Bakr united the Muslim ummah, fought the wars of apostasy (Ridda), began the compilation of the Quran, and initiated the expansion of Islam. He ruled for only two years but his impact was immense. He died in 634 CE and was buried next to the Prophet.`,
    lessons: [
      'True friendship is based on faith and truth',
      'Wealth should be used in the service of Allah',
      'Trust in Allah removes all fear',
      'Leadership requires wisdom and swift action',
      'Devotion to the Prophet should not exceed devotion to Allah'
    ],
    references: ['Quran 9:40', 'Sahih Bukhari', 'Sahih Muslim', 'Al-Bidaya wa al-Nihaya']
  },
  {
    id: 'umar',
    title: 'Umar ibn Al-Khattab - The Just',
    titleArabic: 'عمر بن الخطاب',
    category: 'companions',
    summary: 'The story of the powerful leader who became a pillar of Islam.',
    content: `Umar ibn al-Khattab (may Allah be pleased with him) was initially one of the fiercest opponents of Islam in Makkah. Tall, strong, and intimidating, he set out one day to kill the Prophet Muhammad (PBUH).

On his way, Umar learned that his own sister Fatimah and her husband had secretly accepted Islam. Enraged, he went to their house and struck his sister, causing her to bleed. Seeing her blood and her steadfastness, Umar calmed down and asked to see what they were reading. He read verses from Surah Ta-Ha and his heart softened.

Umar immediately went to the Prophet and declared his Islam. His conversion was so significant that the Prophet said it was an answer to his prayer for Allah to strengthen Islam with either Umar or Abu Jahl - and Allah chose Umar.

After his conversion, Umar openly declared his faith, and the Muslims were able to pray at the Kaaba for the first time publicly. His strength became a shield for the Muslim community.

As the second Caliph, Umar established numerous institutions: the Islamic calendar (Hijri), the Bayt al-Mal (public treasury), courts of justice, and provincial administration. During his ten-year rule, the Islamic empire expanded dramatically to include Syria, Iraq, Persia, and Egypt.

Despite ruling a vast empire, Umar lived simply. He would patrol the streets at night to check on his people's welfare. He famously said: "If a dog dies hungry on the banks of the Euphrates, I would be responsible." Umar was assassinated in 644 CE while leading Fajr prayer.`,
    lessons: [
      'Hearts can change dramatically with Allah\'s guidance',
      'Justice and accountability are fundamental to leadership',
      'Simplicity and humility despite power',
      'Responsibility for every member of society',
      'Courage to speak truth and act upon it'
    ],
    references: ['Sahih Bukhari', 'Sahih Muslim', 'History of al-Tabari']
  },
  {
    id: 'khadijah',
    title: 'Khadijah bint Khuwaylid - Mother of the Believers',
    titleArabic: 'خديجة بنت خويلد',
    category: 'companions',
    summary: 'The story of the Prophet\'s first wife and the first Muslim.',
    content: `Khadijah bint Khuwaylid (may Allah be pleased with her) was a successful businesswoman in Makkah, known for her intelligence, noble character, and wealth. She had been married twice before and had turned down many suitors from Quraysh nobility.

When Muhammad (PBUH) was 25, Khadijah hired him to lead her trade caravan to Syria. Impressed by his honesty and the exceptional profits he brought, and having heard from her servant Maysarah about his noble character, Khadijah proposed marriage. Despite the age difference - she was 40 and he was 25 - their marriage was blessed and happy.

When Muhammad (PBUH) received the first revelation in the Cave of Hira and returned home frightened, it was Khadijah who comforted him with her famous words: "Never! By Allah, Allah will never disgrace you. You keep good relations with your kin, you help the poor, you serve your guests generously, and you assist those who are stricken by calamity."

Khadijah was the first person to accept Islam. For the next 25 years, she stood by the Prophet through every hardship. She spent her entire wealth supporting the Muslim cause. During the three-year boycott in the Valley of Abu Talib, she endured alongside the other Muslims despite her age and declining health.

Khadijah passed away in 619 CE, the "Year of Sorrow," and the Prophet (PBUH) never forgot her. Years later, he would say: "The best of the women of Paradise are Khadijah, Fatimah, Maryam, and Asiya." He continued to honor her friends and speak of her with love until his death.`,
    lessons: [
      'Women can be successful leaders and businesspersons',
      'Supporting one\'s spouse through difficulties',
      'Recognizing good character over status or wealth',
      'Being the first to respond to truth',
      'Sacrifice for the sake of faith'
    ],
    references: ['Sahih Bukhari', 'Sahih Muslim', 'Seerah of Ibn Hisham']
  },
  {
    id: 'bilal',
    title: 'Bilal ibn Rabah - Voice of Islam',
    titleArabic: 'بلال بن رباح',
    category: 'companions',
    summary: 'The story of the first muezzin, who endured torture for his faith.',
    content: `Bilal ibn Rabah (may Allah be pleased with him) was an Abyssinian slave in Makkah who was among the earliest to embrace Islam. His conversion enraged his master, Umayyah ibn Khalaf, who subjected him to horrific torture.

Bilal would be dragged through the streets and forced to lie on the burning sand with heavy rocks placed on his chest. Umayyah would demand he renounce Islam and worship the idols. But Bilal, with unshakeable faith, would only repeat: "Ahad, Ahad!" (One, One!) - declaring the Oneness of Allah.

Abu Bakr al-Siddiq, moved by Bilal's suffering and steadfastness, purchased and freed him. From then on, Bilal dedicated his life to Islam and became one of the Prophet's closest companions.

When the Muslims migrated to Madinah and the first mosque was built, the question arose of how to call people to prayer. The Prophet chose Bilal for this honor, making him the first muezzin in Islamic history. His beautiful, powerful voice would echo through Madinah, calling the believers to prayer.

After the conquest of Makkah, Bilal was given the ultimate honor of climbing atop the Kaaba itself to make the adhan, while the Quraysh who had persecuted him watched below.

After the Prophet's death, Bilal found it too painful to make the adhan without his beloved Prophet to pray behind. He moved to Syria, where he died. According to some reports, he returned once to Madinah, and when he made the adhan, the entire city wept, remembering the Prophet's era.`,
    lessons: [
      'Faith can sustain a person through the worst torture',
      'Allah elevates the humble and oppressed',
      'Racism and tribalism have no place in Islam',
      'True honor comes from faith, not lineage',
      'Love for the Prophet and the ummah'
    ],
    references: ['Sahih Bukhari', 'Sahih Muslim', 'Seerah of Ibn Ishaq']
  },
  
  // Scholar Stories
  {
    id: 'imam-bukhari',
    title: 'Imam Al-Bukhari - Master of Hadith',
    titleArabic: 'الإمام البخاري',
    category: 'scholars',
    summary: 'The story of the compiler of the most authentic hadith collection.',
    content: `Imam Muhammad ibn Ismail al-Bukhari (810-870 CE) was one of the greatest hadith scholars in Islamic history. His collection, Sahih al-Bukhari, is considered the most authentic book after the Quran.

Born in Bukhara (in present-day Uzbekistan), Bukhari showed exceptional memory from childhood. He memorized the Quran and began studying hadith at age ten. It is said that by sixteen, he had memorized 70,000 hadith with their chains of narration.

Bukhari traveled extensively throughout the Islamic world - to Makkah, Madinah, Egypt, Syria, Iraq, and beyond - seeking hadith from over 1,000 scholars. He would verify each hadith meticulously, examining the character and memory of every narrator in the chain.

For his Sahih collection, Bukhari applied the strictest criteria. He would pray two rakats of istikharah before including each hadith. From the approximately 600,000 hadith he had memorized, he selected only about 7,275 (with repetitions) or 2,602 (without repetitions) for his Sahih.

His dedication was legendary. He would often wake up multiple times during the night to write down a hadith that came to mind. Despite his immense knowledge, he remained humble and would never speak ill of anyone.

Bukhari faced opposition near the end of his life and was expelled from his hometown due to political intrigues. He died in a village near Samarkand, but his legacy lives on. Today, millions of Muslims around the world study and rely on Sahih al-Bukhari for authentic knowledge of the Prophet's teachings.`,
    lessons: [
      'Dedication and hard work in seeking knowledge',
      'Verification and authenticity are paramount',
      'Humility despite great scholarship',
      'Patience in the face of opposition',
      'Leaving a lasting legacy through beneficial knowledge'
    ],
    references: ['Tarikh Baghdad', 'Siyar A\'lam al-Nubala', 'Al-Wafi bil-Wafayat']
  },
  
  // Miracle Stories
  {
    id: 'cave-spider',
    title: 'The Spider of the Cave',
    titleArabic: 'عنكبوت الغار',
    category: 'miracles',
    summary: 'How Allah protected the Prophet and Abu Bakr during the migration.',
    content: `When Prophet Muhammad (PBUH) and Abu Bakr were migrating from Makkah to Madinah, the Quraysh placed a bounty of 100 camels on each of their heads. Armed men searched everywhere for them.

The Prophet and Abu Bakr took refuge in the Cave of Thawr, south of Makkah. They stayed hidden there for three days while the search parties looked for them.

At one point, the Quraysh trackers came so close to the cave that Abu Bakr could see their feet. Abu Bakr was terrified, not for himself, but for the Prophet. He whispered anxiously to the Prophet.

The Prophet (PBUH) calmly reassured him: "What do you think of two, the third of whom is Allah?" He said, "Do not grieve; indeed Allah is with us." (Quran 9:40)

According to the tradition, Allah caused a spider to weave its web across the entrance of the cave, and a pair of doves built their nest there and laid eggs. When the trackers reached the cave and saw the undisturbed spider web and the nesting birds, they concluded no one could have entered recently and left.

This miracle demonstrates Allah's ability to protect His servants through the smallest of His creations. A tiny spider became an instrument of divine protection for the one who would change the course of human history.`,
    lessons: [
      'Allah\'s protection comes in unexpected ways',
      'Trust in Allah removes all fear',
      'Even the smallest creatures serve Allah\'s purpose',
      'Companionship during trials is a blessing',
      'Divine help requires human effort (they still hid)'
    ],
    references: ['Quran 9:40', 'Seerah of Ibn Hisham', 'Sahih Bukhari']
  },
  {
    id: 'splitting-moon',
    title: 'The Splitting of the Moon',
    titleArabic: 'انشقاق القمر',
    category: 'miracles',
    summary: 'The miraculous splitting of the moon witnessed by the people of Makkah.',
    content: `One of the most remarkable miracles of Prophet Muhammad (PBUH) was the splitting of the moon, which occurred in Makkah before the Hijra.

The leaders of Quraysh challenged the Prophet to show them a miracle. They pointed to the moon and asked him to split it in two. The Prophet (PBUH) prayed to Allah, and by Allah's permission, the moon split into two halves.

One half of the moon was seen over Mount Hira, and the other half on the opposite side. The people of Makkah witnessed this miracle clearly. The Prophet called out to them: "Bear witness!" and "Look!"

Despite witnessing this miracle with their own eyes, many of the disbelievers refused to accept Islam. They called it magic and demanded yet more signs. Allah revealed about this incident: "The Hour has come near, and the moon has split. And if they see a sign, they turn away and say, 'Passing magic.'" (Quran 54:1-2)

This miracle was witnessed not only in Makkah but reportedly by travelers in other lands as well. Some historical accounts mention travelers from India confirming they too witnessed this event.

The splitting of the moon stands as one of the great miracles of Prophet Muhammad (PBUH), demonstrating his prophethood and Allah's power over all creation. Yet it also shows that miracles alone do not compel belief - that requires the willingness of the heart.`,
    lessons: [
      'Allah has power over all creation',
      'Miracles confirm prophethood',
      'Seeing miracles does not guarantee faith',
      'Pride can prevent accepting truth',
      'The Quran preserves these miraculous events'
    ],
    references: ['Quran 54:1-2', 'Sahih Bukhari', 'Sahih Muslim']
  },
  
  // Moral Stories
  {
    id: 'three-cave',
    title: 'The Three Trapped in the Cave',
    titleArabic: 'أصحاب الغار الثلاثة',
    category: 'moral-stories',
    summary: 'Three men trapped by a boulder were saved by their sincere good deeds.',
    content: `Prophet Muhammad (PBUH) narrated the story of three men from among the nations before us who were traveling when they were caught in a rainstorm. They took shelter in a cave, but a huge boulder rolled down the mountain and blocked the entrance, trapping them inside.

Unable to move the boulder themselves, they realized only Allah could save them. One of them suggested: "Nothing can rescue you except invoking Allah by mentioning righteous deeds you have done for His sake."

The first man prayed: "O Allah! I had elderly parents and young children. One evening, I brought milk for my parents but found them asleep. I did not want to wake them or feed my children before them, so I stood waiting with the cup in my hand until dawn. O Allah, if I did this seeking Your pleasure, relieve us of our distress!" The boulder moved slightly.

The second man prayed: "O Allah! I had a cousin whom I loved deeply. I tried to seduce her but she refused unless I paid her. When I finally obtained the money and was about to commit the sin, she said, 'Fear Allah and do not break the seal unlawfully.' I left her even though I desired her most. O Allah, if I did this seeking Your pleasure, relieve us!" The boulder moved more.

The third man prayed: "O Allah! I hired workers and paid them all except one who left without taking his wages. I invested his money until it multiplied greatly. He returned after many years and I gave him all of it - not just his original wage. O Allah, if I did this seeking Your pleasure, relieve us!" The boulder rolled away completely, and they walked out free.`,
    lessons: [
      'Sincere good deeds done for Allah\'s sake are powerful',
      'Honoring and respecting parents',
      'Resisting temptation despite opportunity',
      'Honesty in financial dealings',
      'Turn to Allah through righteous deeds in times of distress'
    ],
    references: ['Sahih Bukhari', 'Sahih Muslim']
  },
  {
    id: 'generous-woman',
    title: 'The Woman Who Fed the Dog',
    titleArabic: 'المرأة التي سقت الكلب',
    category: 'moral-stories',
    summary: 'A sinful woman was forgiven for her one act of kindness to a thirsty dog.',
    content: `Prophet Muhammad (PBUH) told his companions about a woman from the Children of Israel who was known for her sinful lifestyle. Her profession was immoral and she had committed many sins throughout her life.

One extremely hot day, this woman was walking when she came across a well. Parched with thirst, she climbed down into the well and drank to quench her thirst. When she climbed out, she saw a dog panting heavily with thirst, licking the moist dirt around the well, desperately seeking water.

The woman thought to herself, "This dog is suffering from thirst just as I was suffering." Despite her own difficulties, she went back down into the well, filled her shoe with water, held it in her mouth, climbed back up, and gave the water to the dog.

For this single act of mercy and compassion, Allah forgave all her sins. The Prophet (PBUH) said: "Allah thanked her for that and forgave her." The companions asked in amazement, "O Messenger of Allah, is there a reward for us in serving animals?" The Prophet replied, "There is a reward in serving every living being."

This profound hadith shows that Allah's mercy is vast and that sincere compassion - even toward animals - can lead to forgiveness and Paradise. It also teaches that no one should despair of Allah's mercy, no matter how many sins they have committed.`,
    lessons: [
      'Kindness to animals is rewarded by Allah',
      'No one should despair of Allah\'s mercy',
      'A single sincere good deed can change everything',
      'Compassion is valued regardless of one\'s past',
      'All living creatures deserve mercy'
    ],
    references: ['Sahih Bukhari', 'Sahih Muslim']
  },
  {
    id: 'mans-son',
    title: 'The Man and His Ungrateful Son',
    titleArabic: 'الرجل وابنه العاق',
    category: 'moral-stories',
    summary: 'A story about the consequences of being ungrateful to parents.',
    content: `There was once an old man who had spent his entire life raising his son with love and care. He worked hard to provide everything for his child, sacrificing his own comfort for his son's happiness and education.

When the son grew up and became successful, he married a beautiful wife. The young wife began to find the old father burdensome. She complained to her husband about having to take care of his elderly father, saying he was in the way and should be sent away.

The son, influenced by his wife's constant complaints, decided to abandon his father. He told his young son to take his grandfather up to the mountain and leave him there with only a blanket.

The grandson took his grandfather up the mountain as commanded. Before leaving, the old man asked his grandson for the blanket. But the boy tore the blanket in half and gave only half to his grandfather.

When the grandson returned home, his father asked, "Why did you bring half the blanket back?" The boy replied, "I'm saving it for you, father, for when you become old and I take you to the mountain."

The father was struck by the truth of what he was doing. He realized that his own son would treat him exactly as he was treating his own father. He immediately went to the mountain, brought his father back home, and cared for him with love and respect until the old man passed away peacefully.`,
    lessons: [
      'How you treat your parents is how you will be treated',
      'Children learn from watching their parents',
      'Honoring parents is a fundamental duty in Islam',
      'The influence of others should not override family duty',
      'It is never too late to correct a wrong'
    ],
    references: ['Islamic moral traditions', 'Teaching of respecting parents (Quran 17:23-24)']
  },
  {
    id: 'trust-allah',
    title: 'The Bedouin and His Camel',
    titleArabic: 'الأعرابي وناقته',
    category: 'moral-stories',
    summary: 'The balance between trust in Allah and taking practical measures.',
    content: `A Bedouin man came to Prophet Muhammad (PBUH) and asked, "O Messenger of Allah, should I tie my camel and trust in Allah, or should I leave it untied and trust in Allah?"

The Prophet (PBUH) replied with wisdom that has guided Muslims for centuries: "Tie your camel, then trust in Allah."

This short exchange contains profound wisdom about the Islamic concept of tawakkul (trust in Allah). True trust in Allah does not mean abandoning practical efforts or being careless. Rather, it means doing everything within our power and capability, and then leaving the results to Allah.

The camel represents our worldly efforts - our work, our planning, our precautions. Tying it represents taking all reasonable measures to achieve our goals or protect ourselves. But after doing our part, we should not be anxious about results; we should trust that Allah's decree is always for the best.

This teaching applies to every aspect of life. A student should study hard (tie the camel) and then trust Allah for the results. A farmer should plant properly and irrigate (tie the camel), then trust Allah for the harvest. A sick person should take medicine (tie the camel), then trust Allah for healing.

True tawakkul combines human effort with complete faith that ultimately all outcomes are in Allah's hands. Neither extreme - blind passivity or thinking we control everything - reflects Islamic teaching.`,
    lessons: [
      'Tawakkul requires both effort and faith',
      'Taking precautions is part of trusting Allah',
      'Balance between action and reliance on Allah',
      'Practical wisdom in Islamic teaching',
      'We do our part; Allah determines the outcome'
    ],
    references: ['Sunan al-Tirmidhi', 'Islamic scholars\' explanations of tawakkul']
  }
];

export function getStoriesByCategory(category: string): IslamicStory[] {
  return ISLAMIC_STORIES.filter(story => story.category === category);
}

export function searchStories(query: string): IslamicStory[] {
  const lowerQuery = query.toLowerCase();
  return ISLAMIC_STORIES.filter(story =>
    story.title.toLowerCase().includes(lowerQuery) ||
    story.summary.toLowerCase().includes(lowerQuery) ||
    story.content.toLowerCase().includes(lowerQuery)
  );
}

export function getStoryById(id: string): IslamicStory | undefined {
  return ISLAMIC_STORIES.find(story => story.id === id);
}
