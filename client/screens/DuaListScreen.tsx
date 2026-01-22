import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const DUAS = [
  {
    id: "1",
    category: "Morning",
    title: "Morning Dua",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah",
    english: "We have reached the morning and the kingdom belongs to Allah",
    bengali: "আমরা সকাল করেছি এবং রাজত্ব আল্লাহর জন্য",
    reference: "Abu Dawud",
  },
  {
    id: "2",
    category: "Evening",
    title: "Evening Dua",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillah",
    english: "We have reached the evening and the kingdom belongs to Allah",
    bengali: "আমরা সন্ধ্যায় পৌঁছেছি এবং রাজত্ব আল্লাহর জন্য",
    reference: "Abu Dawud",
  },
  {
    id: "3",
    category: "Before Sleep",
    title: "Sleep Dua",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    english: "In Your name, O Allah, I die and I live",
    bengali: "তোমার নামে, হে আল্লাহ, আমি মরি এবং বাঁচি",
    reference: "Bukhari",
  },
  {
    id: "4",
    category: "Waking Up",
    title: "Waking Up Dua",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection",
    bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের মৃত্যুর পর জীবিত করেছেন এবং তাঁর কাছেই আমাদের পুনরুত্থান",
    reference: "Bukhari",
  },
  {
    id: "5",
    category: "Eating",
    title: "Before Eating",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barkatillah",
    english: "In the name of Allah and with the blessings of Allah",
    bengali: "আল্লাহর নামে এবং আল্লাহর বরকতে",
    reference: "Abu Dawud",
  },
  {
    id: "6",
    category: "Eating",
    title: "After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
    transliteration: "Alhamdulillahil-ladhi at'amana wa saqana",
    english: "All praise is for Allah who fed us and gave us drink",
    bengali: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের খাওয়ালেন এবং পান করালেন",
    reference: "Abu Dawud",
  },
  {
    id: "7",
    category: "Travel",
    title: "Travel Dua",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
    english: "Glory to Him who has subjected this to us, and we could never have it",
    bengali: "পবিত্র তিনি যিনি এটিকে আমাদের অধীন করেছেন, অথচ আমরা এটিকে বশ করতে সক্ষম ছিলাম না",
    reference: "Quran 43:13",
  },
  {
    id: "8",
    category: "Protection",
    title: "Ayatul Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration: "Allahu la ilaha illa huwal-Hayyul-Qayyum, la ta'khudhuhu sinatun wa la nawm",
    english: "Allah! There is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep",
    bengali: "আল্লাহ, তিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তন্দ্রা বা নিদ্রা তাঁকে স্পর্শ করে না",
    reference: "Quran 2:255",
  },
];

export default function DuaListScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme, isDark } = useTheme();
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = async (id: string) => {
    await Haptics.selectionAsync();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {DUAS.map((dua, index) => (
        <Animated.View
          key={dua.id}
          entering={FadeInDown.delay(100 + index * 50).duration(500)}
        >
          <Pressable
            onPress={() => handleExpand(dua.id)}
            style={[
              styles.duaCard,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: expandedId === dua.id ? theme.primary : theme.cardBorder,
              },
            ]}
          >
            <View style={styles.duaHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: theme.primary + "15" }]}>
                <ThemedText style={[styles.categoryText, { color: theme.primary }]}>
                  {dua.category}
                </ThemedText>
              </View>
              <Feather
                name={expandedId === dua.id ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.textSecondary}
              />
            </View>

            <ThemedText style={styles.duaTitle}>{dua.title}</ThemedText>
            <ThemedText style={styles.arabicText}>{dua.arabic}</ThemedText>

            {expandedId === dua.id ? (
              <View style={styles.expandedContent}>
                <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
                
                <ThemedText style={[styles.transliteration, { color: theme.textSecondary }]}>
                  {dua.transliteration}
                </ThemedText>

                <View style={styles.translationSection}>
                  <ThemedText style={[styles.translationLabel, { color: theme.primary }]}>
                    English:
                  </ThemedText>
                  <ThemedText style={styles.translationText}>
                    {dua.english}
                  </ThemedText>
                </View>

                <View style={styles.translationSection}>
                  <ThemedText style={[styles.translationLabel, { color: theme.primary }]}>
                    বাংলা:
                  </ThemedText>
                  <ThemedText style={styles.translationText}>
                    {dua.bengali}
                  </ThemedText>
                </View>

                <View style={[styles.referenceBox, { backgroundColor: theme.backgroundSecondary }]}>
                  <Feather name="book" size={14} color={theme.textSecondary} />
                  <ThemedText style={[styles.referenceText, { color: theme.textSecondary }]}>
                    {dua.reference}
                  </ThemedText>
                </View>
              </View>
            ) : null}
          </Pressable>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  duaCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    ...Shadows.sm,
  },
  duaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  duaTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 36,
    textAlign: "right",
    marginBottom: Spacing.sm,
  },
  expandedContent: {
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.lg,
  },
  transliteration: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    marginBottom: Spacing.lg,
  },
  translationSection: {
    marginBottom: Spacing.md,
  },
  translationLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  translationText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  referenceBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  referenceText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
});
