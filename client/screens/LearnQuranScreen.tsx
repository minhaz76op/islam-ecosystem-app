import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const { width } = Dimensions.get("window");

const ALPHABETS = [
  { ar: "ا", tr: "Alif" }, { ar: "ب", tr: "Ba" }, { ar: "ت", tr: "Ta" }, { ar: "ث", tr: "Tha" },
  { ar: "ج", tr: "Jim" }, { ar: "ح", tr: "Ha" }, { ar: "خ", tr: "Kha" }, { ar: "د", tr: "Dal" },
  { ar: "ذ", tr: "Dhal" }, { ar: "ر", tr: "Ra" }, { ar: "ز", tr: "Zay" }, { ar: "س", tr: "Sin" },
  { ar: "ش", tr: "Shin" }, { ar: "ص", tr: "Sad" }, { ar: "ض", tr: "Dad" }, { ar: "ط", tr: "Ta" },
  { ar: "ظ", tr: "Za" }, { ar: "ع", tr: "Ain" }, { ar: "غ", tr: "Ghain" }, { ar: "ف", tr: "Fa" },
  { ar: "ق", tr: "Qaf" }, { ar: "ك", tr: "Kaf" }, { ar: "ل", tr: "Lam" }, { ar: "م", tr: "Mim" },
  { ar: "ن", tr: "Nun" }, { ar: "ه", tr: "Ha" }, { ar: "و", tr: "Waw" }, { ar: "ي", tr: "Ya" }
];

const AMPARA_LESSONS = [
  { id: 1, title: "Lesson 1: Individual Letters", description: "Learn the basic Arabic alphabets", ar: "ا ب ت ث" },
  { id: 2, title: "Lesson 2: Compound Letters", description: "How letters join together", ar: "لا با تا ثا" },
  { id: 3, title: "Lesson 3: Harakat (Vowels)", description: "Fatha, Kasra, and Damma", ar: "اَ اِ اُ" },
  { id: 4, title: "Lesson 4: Tanween", description: "Double vowels", ar: "اً اٍ اٌ" },
  { id: 5, title: "Lesson 5: Madd Letters", description: "Long vowels", ar: "بَا بِى بُو" },
  { id: 6, title: "Lesson 6: Sukoon", description: "Resting sign", ar: "اَبْ اِبْ اُبْ" },
  { id: 7, title: "Lesson 7: Tashdeed", description: "Emphasis sign", ar: "اَبَّ اِبِّ اُبُّ" },
  { id: 8, title: "Lesson 8: Huroof-ul-Muqatta'at", description: "Disconnected letters", ar: "الٓمّٓ الٓمّٓصٓ" },
  { id: 9, title: "Lesson 9: Vertical Harakat", description: "Khadra Fatha/Kasra/Damma", ar: "بٰ بِٖ بُٗ" },
  { id: 10, title: "Lesson 10: Leen Letters", description: "Soft vowels", ar: "بَوْ بَيْ" },
  { id: 11, title: "Lesson 11: Rules of Noon Sakinah", description: "Izhar, Idgham, Iqlab, Ikhfa", ar: "مَنْ اَنْ" },
  { id: 12, title: "Lesson 12: Rules of Meem Sakinah", description: "Idgham, Ikhfa, Izhar", ar: "اَمْ هُمْ" },
  { id: 13, title: "Lesson 13: Rules of Ra", description: "Bold and thin Ra", ar: "رَ رِ رُ" },
  { id: 14, title: "Lesson 14: Rules of Laam", description: "Allah's name pronunciation", ar: "اللّٰه لِلّٰه" },
  { id: 15, title: "Lesson 15: Qalqalah Letters", description: "Bouncing sounds", ar: "ق ط ب ج د" },
  { id: 16, title: "Lesson 16: Madd Rules", description: "Types of elongation", ar: "سُوٓءَ جِيٓءَ" },
  { id: 17, title: "Lesson 17: Stop Signs (Waqf)", description: "How to stop in Quran", ar: "ط ج ز ص ق" },
  { id: 18, title: "Lesson 18: Small Letters", description: "Extra small notations", ar: "ن۠ سۣ" },
  { id: 19, title: "Lesson 19: Noon Qutni", description: "Small Noon joining", ar: "اَنِِ اللّٰه" },
  { id: 20, title: "Lesson 20: Sijdah-e-Tilawat", description: "Prostration marks", ar: "۩" },
  { id: 21, title: "Lesson 21: Review Part 1", description: "Basic review", ar: "قُلْ هُوَ اللّٰهُ اَحَدٌ" },
  { id: 22, title: "Lesson 22: Review Part 2", description: "Intermediate review", ar: "فِي دِينِ اللّٰهِ أَفْوَاجًا" },
  { id: 23, title: "Lesson 23: Review Part 3", description: "Advanced review", ar: "تَبَّتْ يَدَا أَبِي لَهَبٍ" },
  { id: 24, title: "Lesson 24: Short Surahs 1", description: "Surah Al-Ikhlas", ar: "قُلْ هُوَ اللّٰهُ اَحَدٌ" },
  { id: 25, title: "Lesson 25: Short Surahs 2", description: "Surah Al-Falaq", ar: "قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ" },
  { id: 26, title: "Lesson 26: Short Surahs 3", description: "Surah An-Nas", ar: "قُلْ اَعُوذُ بِرَبِّ النَّاسِ" },
  { id: 27, title: "Lesson 27: Short Surahs 4", description: "Surah Al-Kafirun", ar: "قُلْ يَا أَيُّهَا الْكَافِرُونَ" },
  { id: 28, title: "Lesson 28: Short Surahs 5", description: "Surah Al-Asr", ar: "وَالْعَصْرِ اِنَّ الْاِنْسَانَ" },
  { id: 29, title: "Lesson 29: Final Exam Prep", description: "Complete review", ar: "الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْن" },
  { id: 30, title: "Lesson 30: Completion", description: "Next steps to Quran", ar: "صدق الله العظيم" }
];

const WORDS = [
  { ar: "كَتَبَ", tr: "Kataba", meaning: "He wrote" },
  { ar: "رَزَقَ", tr: "Razaqa", meaning: "He provided" },
  { ar: "خَلَقَ", tr: "Khalaqa", meaning: "He created" },
  { ar: "عَلِمَ", tr: "Alima", meaning: "He knew" }
];

const LINES = [
  { ar: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", tr: "Bismillahir Rahmanir Rahim", meaning: "In the name of Allah, the Most Gracious, the Most Merciful" },
  { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "Alhamdu lillahi Rabbil 'alamin", meaning: "All praise is due to Allah, Lord of the worlds" }
];

export default function LearnQuranScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"alphabets" | "ampara" | "words" | "lines">("ampara");

  const handlePress = () => {
    Haptics.selectionAsync();
  };

  return (
    <LinearGradient
      colors={isDark ? ["#0F172A", "#1E293B"] : [AppColors.background, "#F0FDFA"]}
      style={styles.container}
    >
      <View style={[styles.header, { paddingTop: headerHeight + Spacing.md }]}>
        <View style={styles.tabContainer}>
          {(["ampara", "alphabets", "words", "lines"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => {
                handlePress();
                setActiveTab(tab);
              }}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: AppColors.primary },
              ]}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === tab && { color: "#FFF", fontFamily: "Poppins_600SemiBold" },
                ]}
              >
                {tab === "ampara" ? "Ampara" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "ampara" && (
          <View style={styles.list}>
            {AMPARA_LESSONS.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 50).duration(500)}
                style={[styles.lessonCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={styles.lessonHeader}>
                  <View style={[styles.lessonBadge, { backgroundColor: AppColors.primary + "15" }]}>
                    <ThemedText style={[styles.lessonBadgeText, { color: AppColors.primary }]}>{item.id}</ThemedText>
                  </View>
                  <View style={styles.lessonInfo}>
                    <ThemedText style={styles.lessonTitle}>{item.title}</ThemedText>
                    <ThemedText style={[styles.lessonDesc, { color: theme.textSecondary }]}>{item.description}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.lessonArabic}>{item.ar}</ThemedText>
              </Animated.View>
            ))}
          </View>
        )}

        {activeTab === "alphabets" && (
          <View style={styles.grid}>
            {ALPHABETS.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 20).duration(400)}
                style={[styles.card, { backgroundColor: theme.backgroundDefault }]}
              >
                <ThemedText style={styles.arabicMain}>{item.ar}</ThemedText>
                <ThemedText style={[styles.transliteration, { color: theme.textSecondary }]}>
                  {item.tr}
                </ThemedText>
              </Animated.View>
            ))}
          </View>
        )}

        {activeTab === "words" && (
          <View style={styles.list}>
            {WORDS.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInRight.delay(index * 100).duration(500)}
                style={[styles.longCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <ThemedText style={styles.arabicWord}>{item.ar}</ThemedText>
                <View>
                  <ThemedText style={styles.transliteration}>{item.tr}</ThemedText>
                  <ThemedText style={[styles.meaning, { color: theme.textSecondary }]}>
                    {item.meaning}
                  </ThemedText>
                </View>
              </Animated.View>
            ))}
          </View>
        )}

        {activeTab === "lines" && (
          <View style={styles.list}>
            {LINES.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 150).duration(600)}
                style={[styles.lineCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <ThemedText style={styles.arabicLine}>{item.ar}</ThemedText>
                <ThemedText style={styles.transliterationLine}>{item.tr}</ThemedText>
                <ThemedText style={[styles.meaningLine, { color: theme.textSecondary }]}>
                  {item.meaning}
                </ThemedText>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  tabText: { fontSize: 14, fontFamily: "Poppins_400Regular" },
  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  card: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2) / 3,
    aspectRatio: 1,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  arabicMain: {
    fontSize: 40,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  transliteration: { fontSize: 14, fontFamily: "Poppins_500Medium" },
  list: { gap: Spacing.md },
  longCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  arabicWord: { fontSize: 36, fontFamily: "Poppins_600SemiBold" },
  meaning: { fontSize: 13, fontFamily: "Poppins_400Regular" },
  lineCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
    alignItems: "center",
  },
  arabicLine: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: 45,
  },
  transliterationLine: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginBottom: 4,
  },
  meaningLine: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  lessonCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
    marginBottom: Spacing.sm,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  lessonBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  lessonBadgeText: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  lessonDesc: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  lessonArabic: {
    fontSize: 32,
    textAlign: "right",
    lineHeight: 48,
  },
});
