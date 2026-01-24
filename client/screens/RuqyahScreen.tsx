import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

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
}

const RUQYAH_COLLECTION: RuqyahItem[] = [
  {
    id: "1",
    title: "Surah Al-Fatiha",
    arabicTitle: "سورة الفاتحة",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    transliteration: "Bismillahir Rahmanir Raheem. Alhamdu lillahi Rabbil 'aalameen. Ar-Rahmanir Raheem. Maaliki yawmid Deen. Iyyaaka na'budu wa iyyaaka nasta'een. Ihdinas siraatal mustaqeem. Siraatal lazeena an'amta 'alaihim ghairil maghdoobi 'alaihim wa lad daaalleen.",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.",
    benefit: "The greatest Surah in the Quran. Used for healing and protection from all types of harm.",
    repetitions: 7,
  },
  {
    id: "2",
    title: "Ayatul Kursi",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khuzuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man zal-lazi yashfa'u 'indahu illa bi-iznihi. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi shai'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma. Wa Huwal-'Aliyyul-'Azim.",
    translation: "Allah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before them and what is behind them. Nor shall they compass anything of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. For He is the Most High, the Supreme.",
    benefit: "The greatest verse in the Quran. Provides powerful protection from evil and harm.",
    repetitions: 3,
  },
  {
    id: "3",
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾",
    transliteration: "Qul Huwa Allahu Ahad. Allahu As-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say: He is Allah, the One. Allah, the Eternal, Absolute. He begets not, nor is He begotten. And there is none comparable to Him.",
    benefit: "Equal to one-third of the Quran. Recited for protection and blessings.",
    repetitions: 3,
  },
  {
    id: "4",
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾",
    transliteration: "Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin iza waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin iza hasad.",
    translation: "Say: I seek refuge with the Lord of the Dawn. From the mischief of created things. From the mischief of darkness as it overspreads. From the mischief of those who practice secret arts. And from the mischief of the envious one as he practices envy.",
    benefit: "Protection from evil, black magic, and envy. Part of Al-Mu'awwidhatayn.",
    repetitions: 3,
  },
  {
    id: "5",
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
    transliteration: "Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Allazi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say: I seek refuge with the Lord of mankind. The King of mankind. The God of mankind. From the evil of the sneaking whisperer. Who whispers in the hearts of mankind. Among jinn and among mankind.",
    benefit: "Protection from evil whispers and Satan. Part of Al-Mu'awwidhatayn.",
    repetitions: 3,
  },
  {
    id: "6",
    title: "Dua for Protection",
    arabicTitle: "دعاء للحفظ",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-lazi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: "In the name of Allah, with Whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
    benefit: "Recite 3 times morning and evening for complete protection from harm.",
    repetitions: 3,
  },
  {
    id: "7",
    title: "Dua for Healing",
    arabicTitle: "دعاء للشفاء",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma Rabban-nas, azhibil-ba's, ishfi antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama.",
    translation: "O Allah, Lord of mankind, remove the affliction. Heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
    benefit: "Prophetic dua for healing from all types of illness.",
    repetitions: 7,
  },
  {
    id: "8",
    title: "Protection from Evil Eye",
    arabicTitle: "الحماية من العين",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bi kalimatil-lahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.",
    translation: "I seek refuge in the perfect words of Allah from every devil and every poisonous creature, and from every evil eye.",
    benefit: "Prophetic protection from evil eye, jinn, and harmful creatures.",
    repetitions: 3,
  },
];

interface RuqyahCardProps {
  item: RuqyahItem;
  theme: any;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function RuqyahCard({ item, theme, isExpanded, onToggle, index }: RuqyahCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <Pressable
        onPress={async () => {
          await Haptics.selectionAsync();
          onToggle();
        }}
        style={[styles.card, { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder }]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.numberBadge, { backgroundColor: AppColors.accent + "20" }]}>
            <ThemedText style={[styles.numberText, { color: AppColors.accent }]}>
              {item.repetitions}x
            </ThemedText>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
            <ThemedText style={[styles.arabicTitle, { color: AppColors.primary }]}>
              {item.arabicTitle}
            </ThemedText>
          </View>
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.textSecondary}
          />
        </View>

        {isExpanded ? (
          <View style={styles.expandedContent}>
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

            <View style={[styles.benefitBox, { backgroundColor: AppColors.accent + "10" }]}>
              <Feather name="info" size={16} color={AppColors.accent} />
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
            <ThemedText style={styles.introTitle}>Islamic Ruqyah</ThemedText>
            <ThemedText style={[styles.introText, { color: theme.textSecondary }]}>
              Ruqyah is the practice of reciting Quran and authentic duas for protection and healing. These are from the Sunnah of Prophet Muhammad (PBUH).
            </ThemedText>
          </View>
        </Animated.View>

        <View style={styles.cardList}>
          {RUQYAH_COLLECTION.map((item, index) => (
            <RuqyahCard
              key={item.id}
              item={item}
              theme={theme}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              index={index}
            />
          ))}
        </View>

        <View style={[styles.tipCard, { backgroundColor: AppColors.primary + "10" }]}>
          <Feather name="book-open" size={20} color={AppColors.primary} />
          <ThemedText style={[styles.tipText, { color: theme.text }]}>
            Recite with sincerity and faith in Allah's power to heal and protect. Maintain wudu and face the Qibla when possible.
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
    marginBottom: Spacing.xl,
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
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  arabicTitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  expandedContent: {
    padding: Spacing.lg,
    paddingTop: 0,
    gap: Spacing.lg,
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
