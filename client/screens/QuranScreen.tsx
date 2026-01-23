import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { SURAHS } from "@/data/quran-surahs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const SURAH_AL_FATIHA = [
  {
    verse: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    bengali: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে।",
  },
  {
    verse: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    english: "All praise is due to Allah, Lord of the worlds.",
    bengali: "সকল প্রশংসা আল্লাহর জন্য, যিনি জগতসমূহের প্রতিপালক।",
  },
  {
    verse: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    english: "The Entirely Merciful, the Especially Merciful.",
    bengali: "যিনি পরম করুণাময়, অসীম দয়ালু।",
  },
  {
    verse: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    english: "Sovereign of the Day of Recompense.",
    bengali: "প্রতিদান দিবসের মালিক।",
  },
  {
    verse: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    english: "It is You we worship and You we ask for help.",
    bengali: "আমরা শুধু তোমারই ইবাদত করি এবং শুধু তোমারই কাছে সাহায্য প্রার্থনা করি।",
  },
  {
    verse: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    english: "Guide us to the straight path.",
    bengali: "আমাদের সরল পথ প্রদর্শন করুন।",
  },
  {
    verse: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
    bengali: "তাদের পথ, যাদের প্রতি তুমি অনুগ্রহ করেছ। তাদের পথ নয়, যাদের প্রতি তোমার গজব নাযিল হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।",
  },
];

export default function QuranScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const { isPlaying, isLoading, currentId, playAudio } = useAudioPlayer();

  const handleSelectSurah = async (number: number) => {
    await Haptics.selectionAsync();
    setSelectedSurah(number === 1 ? 1 : null);
  };

  const handlePlayVerse = async (surahNum: number, verseNum: number, e: any) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const paddedSurah = String(surahNum).padStart(3, "0");
    const paddedVerse = String(verseNum).padStart(3, "0");
    const audioUrl = `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${paddedSurah}${paddedVerse}.mp3`;
    await playAudio(`${surahNum}-${verseNum}`, audioUrl);
  };

  if (selectedSurah === 1) {
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
        <Pressable
          onPress={() => setSelectedSurah(null)}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={20} color={theme.primary} />
          <ThemedText style={[styles.backText, { color: theme.primary }]}>
            Back to Surahs
          </ThemedText>
        </Pressable>

        <View style={[styles.surahHeader, { backgroundColor: theme.primary }]}>
          <ThemedText style={styles.surahHeaderArabic}>الفاتحة</ThemedText>
          <ThemedText style={styles.surahHeaderName}>Al-Fatihah</ThemedText>
          <ThemedText style={styles.surahHeaderInfo}>
            7 Verses | Meccan
          </ThemedText>
        </View>

        {SURAH_AL_FATIHA.map((verse, index) => (
          <Animated.View
            key={verse.verse}
            entering={FadeInDown.delay(100 + index * 50).duration(500)}
          >
            <View
              style={[
                styles.verseCard,
                { backgroundColor: theme.backgroundDefault },
              ]}
            >
              <View style={styles.verseNumberContainer}>
                <View
                  style={[
                    styles.verseNumber,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <ThemedText style={styles.verseNumberText}>
                    {verse.verse}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={(e) => handlePlayVerse(1, verse.verse, e)}
                  style={[styles.playBtn, { backgroundColor: theme.primary + "15" }]}
                >
                  {isLoading && currentId === `1-${verse.verse}` ? (
                    <ActivityIndicator size="small" color={theme.primary} />
                  ) : (
                    <Feather
                      name={isPlaying && currentId === `1-${verse.verse}` ? "pause" : "play"}
                      size={16}
                      color={theme.primary}
                    />
                  )}
                </Pressable>
              </View>

              <ThemedText style={styles.verseArabic}>{verse.arabic}</ThemedText>
              
              <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
              
              <ThemedText style={[styles.verseEnglish, { color: theme.textSecondary }]}>
                {verse.english}
              </ThemedText>
              
              <ThemedText style={[styles.verseBengali, { color: theme.primary }]}>
                {verse.bengali}
              </ThemedText>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    );
  }

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
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.title}>Holy Quran</ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Read with Arabic, English & Bengali translations
        </ThemedText>
      </Animated.View>

      <View style={styles.surahList}>
        {SURAHS.map((surah, index) => (
          <Animated.View
            key={surah.number}
            entering={FadeInDown.delay(200 + index * 50).duration(500)}
          >
            <Pressable
              onPress={() => handleSelectSurah(surah.number)}
              style={[
                styles.surahItem,
                { backgroundColor: theme.backgroundDefault },
              ]}
            >
              <View
                style={[
                  styles.surahNumberBadge,
                  { backgroundColor: theme.primary },
                ]}
              >
                <ThemedText style={styles.surahNumberText}>
                  {surah.number}
                </ThemedText>
              </View>

              <View style={styles.surahInfo}>
                <View style={styles.surahNameRow}>
                  <ThemedText style={styles.surahName}>{surah.name}</ThemedText>
                  <ThemedText style={styles.surahArabic}>{surah.arabic}</ThemedText>
                </View>
                <View style={styles.surahMeta}>
                  <ThemedText style={[styles.surahTranslation, { color: theme.textSecondary }]}>
                    {surah.translation}
                  </ThemedText>
                  <ThemedText style={[styles.surahVerses, { color: theme.textSecondary }]}>
                    {surah.verses} verses
                  </ThemedText>
                </View>
              </View>

              <Feather name="chevron-right" size={20} color={theme.textSecondary} />
            </Pressable>
          </Animated.View>
        ))}
      </View>

      <View style={[styles.infoBox, { backgroundColor: theme.backgroundSecondary }]}>
        <Feather name="info" size={18} color={theme.textSecondary} />
        <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
          Full Quran with all 114 Surahs coming soon. Currently showing sample Surahs.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  backText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing["2xl"],
  },
  surahList: {
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  surahNumberBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  surahNumberText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  surahInfo: {
    flex: 1,
  },
  surahNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  surahName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  surahArabic: {
    fontSize: 18,
  },
  surahMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  surahTranslation: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  surahVerses: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  surahHeader: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  surahHeaderArabic: {
    fontSize: 36,
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  surahHeaderName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  surahHeaderInfo: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  verseCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  verseNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  verseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  verseNumberText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  verseArabic: {
    fontSize: 26,
    lineHeight: 44,
    textAlign: "right",
    marginBottom: Spacing.lg,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.lg,
  },
  verseEnglish: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  verseBengali: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
