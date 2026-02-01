import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, AppColors } from "@/constants/theme";
import { SURAHS, Surah } from "@/data/quran-surahs";
import { getVersesBySurah, hasVerses, Verse } from "@/data/quran-verses";

interface SurahAudioPlayerProps {
  surah: Surah;
  theme: any;
}

function SurahAudioPlayer({ surah, theme }: SurahAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const player = useAudioPlayer(surah.audioUrl);
  const status = useAudioPlayerStatus(player);

  const handlePlayPause = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHasError(false);
    
    try {
      if (status.playing) {
        player.pause();
      } else {
        setIsLoading(true);
        await player.play();
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Audio playback error:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleReplay = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHasError(false);
    
    try {
      player.seekTo(0);
      await player.play();
    } catch (error) {
      console.log("Audio replay error:", error);
      setHasError(true);
    }
  };

  const progress = status.duration > 0 ? (status.currentTime / status.duration) * 100 : 0;
  const showLoading = isLoading || status.isBuffering;

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={[styles.audioContainer, { backgroundColor: theme.backgroundSecondary }]}>
      <View style={styles.audioHeader}>
        <Feather name="headphones" size={16} color={AppColors.primary} />
        <ThemedText style={[styles.audioTitle, { color: theme.text }]}>
          Listen to Full Surah
        </ThemedText>
        <ThemedText style={[styles.reciterText, { color: theme.textSecondary }]}>
          Sheikh Mishary Alafasy
        </ThemedText>
      </View>
      {hasError ? (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={16} color="#EF4444" />
          <ThemedText style={[styles.errorText, { color: "#EF4444" }]}>
            Unable to load audio. Tap play to retry.
          </ThemedText>
        </View>
      ) : null}
      <View style={styles.audioControls}>
        <Pressable
          onPress={handlePlayPause}
          style={[styles.playButton, { backgroundColor: AppColors.primary }]}
        >
          {showLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Feather
              name={status.playing ? "pause" : "play"}
              size={20}
              color="#FFFFFF"
            />
          )}
        </Pressable>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.cardBorder }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: AppColors.primary, width: `${progress}%` },
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

interface VerseAudioPlayerProps {
  audioUrl: string;
  theme: any;
}

function VerseAudioPlayer({ audioUrl, theme }: VerseAudioPlayerProps) {
  const player = useAudioPlayer(audioUrl);
  const status = useAudioPlayerStatus(player);

  const handlePlayPause = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <Pressable
      onPress={handlePlayPause}
      style={[styles.versePlayButton, { backgroundColor: AppColors.primary + "15" }]}
    >
      {status.isBuffering ? (
        <ActivityIndicator size="small" color={AppColors.primary} />
      ) : (
        <Feather
          name={status.playing ? "pause" : "play"}
          size={16}
          color={AppColors.primary}
        />
      )}
    </Pressable>
  );
}

interface VerseCardProps {
  verse: Verse;
  theme: any;
  index: number;
}

function VerseCard({ verse, theme, index }: VerseCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(100 + index * 50).duration(400)}>
      <View style={[styles.verseCard, { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder }]}>
        <View style={styles.verseHeader}>
          <View style={[styles.verseNumberBadge, { backgroundColor: AppColors.primary }]}>
            <ThemedText style={styles.verseNumberText}>{verse.number}</ThemedText>
          </View>
          <VerseAudioPlayer audioUrl={verse.audioUrl} theme={theme} />
        </View>

        <ThemedText style={[styles.verseArabic, { color: theme.text }]}>
          {verse.arabic}
        </ThemedText>

        <View style={[styles.verseDivider, { backgroundColor: theme.cardBorder }]} />

        <View style={styles.transliterationSection}>
          <ThemedText style={[styles.sectionLabel, { color: AppColors.primary }]}>
            Transliteration
          </ThemedText>
          <ThemedText style={[styles.transliterationVerse, { color: theme.textSecondary }]}>
            {verse.transliteration}
          </ThemedText>
        </View>

        <View style={styles.translationSection}>
          <ThemedText style={[styles.sectionLabel, { color: AppColors.primary }]}>
            English
          </ThemedText>
          <ThemedText style={[styles.translationText, { color: theme.text }]}>
            {verse.english}
          </ThemedText>
        </View>

        <View style={styles.translationSection}>
          <ThemedText style={[styles.sectionLabel, { color: AppColors.primary }]}>
            বাংলা
          </ThemedText>
          <ThemedText style={[styles.translationText, { color: theme.text }]}>
            {verse.bengali}
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

export default function QuranScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = searchQuery
    ? SURAHS.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.arabic.includes(searchQuery) ||
        s.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.bengali.includes(searchQuery) ||
        s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(s.number).includes(searchQuery)
      )
    : SURAHS;

  const handleSelectSurah = async (surah: Surah) => {
    await Haptics.selectionAsync();
    setSelectedSurah(surah);
  };

  if (selectedSurah) {
    const verses = getVersesBySurah(selectedSurah.number);
    const surahHasVerses = hasVerses(selectedSurah.number);

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: insets.bottom + tabBarHeight + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => setSelectedSurah(null)}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={20} color={AppColors.primary} />
          <ThemedText style={[styles.backText, { color: AppColors.primary }]}>
            Back to Surahs
          </ThemedText>
        </Pressable>

        <Animated.View entering={FadeInDown.duration(400)}>
          <View style={[styles.surahDetailCard, { backgroundColor: theme.backgroundDefault }]}>
            <View style={[styles.surahNumberBadge, { backgroundColor: AppColors.primary }]}>
              <ThemedText style={styles.surahNumberText}>{selectedSurah.number}</ThemedText>
            </View>

            <ThemedText style={[styles.surahDetailArabic, { color: AppColors.primary }]}>
              {selectedSurah.arabic}
            </ThemedText>

            <ThemedText style={styles.surahDetailName}>{selectedSurah.name}</ThemedText>

            <View style={styles.transliterationRow}>
              <ThemedText style={[styles.transliterationLabel, { color: theme.textSecondary }]}>
                Transliteration:
              </ThemedText>
              <ThemedText style={[styles.transliterationText, { color: theme.text }]}>
                {selectedSurah.transliteration}
              </ThemedText>
            </View>

            <View style={styles.transliterationRow}>
              <ThemedText style={[styles.transliterationLabel, { color: theme.textSecondary }]}>
                বাংলা উচ্চারণ:
              </ThemedText>
              <ThemedText style={[styles.transliterationText, { color: theme.text }]}>
                {selectedSurah.transliterationBengali}
              </ThemedText>
            </View>

            <View style={styles.meaningRow}>
              <View style={styles.meaningItem}>
                <ThemedText style={[styles.meaningLabel, { color: theme.textSecondary }]}>
                  English
                </ThemedText>
                <ThemedText style={[styles.meaningValue, { color: theme.text }]}>
                  {selectedSurah.translation}
                </ThemedText>
              </View>
              <View style={styles.meaningItem}>
                <ThemedText style={[styles.meaningLabel, { color: theme.textSecondary }]}>
                  বাংলা
                </ThemedText>
                <ThemedText style={[styles.meaningValue, { color: theme.text }]}>
                  {selectedSurah.bengali}
                </ThemedText>
              </View>
            </View>

            <View style={styles.surahInfoRow}>
              <View style={[styles.infoBadge, { backgroundColor: selectedSurah.revelation === "Meccan" ? "#10B981" + "20" : "#3B82F6" + "20" }]}>
                <ThemedText style={[styles.infoBadgeText, { color: selectedSurah.revelation === "Meccan" ? "#10B981" : "#3B82F6" }]}>
                  {selectedSurah.revelation}
                </ThemedText>
              </View>
              <View style={[styles.infoBadge, { backgroundColor: theme.backgroundSecondary }]}>
                <ThemedText style={[styles.infoBadgeText, { color: theme.textSecondary }]}>
                  {selectedSurah.verses} Verses
                </ThemedText>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <SurahAudioPlayer surah={selectedSurah} theme={theme} />
        </Animated.View>

        {surahHasVerses && verses ? (
          <>
            <Animated.View entering={FadeInDown.delay(150).duration(400)}>
              <View style={styles.versesHeader}>
                <Feather name="book-open" size={18} color={AppColors.primary} />
                <ThemedText style={[styles.versesTitle, { color: theme.text }]}>
                  Verses ({verses.length})
                </ThemedText>
              </View>
            </Animated.View>

            {verses.map((verse, index) => (
              <VerseCard key={verse.number} verse={verse} theme={theme} index={index} />
            ))}
          </>
        ) : (
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <View style={[styles.tipCard, { backgroundColor: AppColors.primary + "10" }]}>
              <Feather name="book-open" size={20} color={AppColors.primary} />
              <ThemedText style={[styles.tipText, { color: theme.text }]}>
                Listen to the beautiful recitation by Sheikh Mishary Rashid Alafasy. Follow along with the Quran to improve your Tajweed.
              </ThemedText>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    );
  }

  const renderSurahItem = ({ item, index }: { item: Surah; index: number }) => {
    const surahHasVerses = hasVerses(item.number);
    
    return (
      <Animated.View entering={FadeInDown.delay(50 + index * 20).duration(400)}>
        <Pressable
          onPress={() => handleSelectSurah(item)}
          style={[styles.surahCard, { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder }]}
        >
          <View style={[styles.surahNumber, { backgroundColor: AppColors.primary + "15" }]}>
            <ThemedText style={[styles.numberText, { color: AppColors.primary }]}>
              {item.number}
            </ThemedText>
          </View>

          <View style={styles.surahInfo}>
            <View style={styles.surahNameRow}>
              <View style={styles.surahNameWithBadge}>
                <ThemedText style={styles.surahName}>{item.name}</ThemedText>
                {surahHasVerses ? (
                  <View style={[styles.versesBadge, { backgroundColor: "#10B981" + "20" }]}>
                    <ThemedText style={[styles.versesBadgeText, { color: "#10B981" }]}>
                      Verses
                    </ThemedText>
                  </View>
                ) : null}
              </View>
              <ThemedText style={[styles.surahArabic, { color: AppColors.primary }]}>
                {item.arabic}
              </ThemedText>
            </View>
            <View style={styles.surahMeta}>
              <ThemedText style={[styles.translitSmall, { color: theme.textSecondary }]}>
                {item.transliteration} • {item.transliterationBengali}
              </ThemedText>
            </View>
            <View style={styles.surahMeta}>
              <ThemedText style={[styles.metaText, { color: theme.textSecondary }]}>
                {item.translation} • {item.bengali}
              </ThemedText>
            </View>
            <View style={styles.surahMeta}>
              <ThemedText style={[styles.metaSmall, { color: theme.textSecondary }]}>
                {item.verses} verses • {item.revelation}
              </ThemedText>
            </View>
          </View>

          <View style={styles.playIconContainer}>
            <Feather name="play-circle" size={24} color={AppColors.primary} />
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.headerSection, { paddingTop: headerHeight + Spacing.md }]}>
        <View style={[styles.searchBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search surahs..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery("")}>
              <Feather name="x" size={18} color={theme.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBadge, { backgroundColor: AppColors.primary + "15" }]}>
            <ThemedText style={[styles.statText, { color: AppColors.primary }]}>
              114 Surahs
            </ThemedText>
          </View>
          <View style={[styles.statBadge, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="headphones" size={14} color={theme.textSecondary} />
            <ThemedText style={[styles.statText, { color: theme.textSecondary }]}>
              Full Audio
            </ThemedText>
          </View>
        </View>
      </View>

      <FlatList
        data={filteredSurahs}
        renderItem={renderSurahItem}
        keyExtractor={(item) => String(item.number)}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: insets.bottom + tabBarHeight + Spacing["2xl"],
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  statText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  surahCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  surahNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  surahInfo: {
    flex: 1,
  },
  surahNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  surahNameWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  surahName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  versesBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  versesBadgeText: {
    fontSize: 9,
    fontFamily: "Poppins_600SemiBold",
  },
  surahArabic: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  surahMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  translitSmall: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    fontStyle: "italic",
  },
  metaText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  metaSmall: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  playIconContainer: {
    padding: Spacing.xs,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  backText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  surahDetailCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  surahNumberBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  surahNumberText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  surahDetailArabic: {
    fontSize: 36,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.sm,
  },
  surahDetailName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.md,
  },
  transliterationRow: {
    width: "100%",
    marginBottom: Spacing.sm,
  },
  transliterationLabel: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  transliterationText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    fontStyle: "italic",
  },
  meaningRow: {
    flexDirection: "row",
    width: "100%",
    gap: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  meaningItem: {
    flex: 1,
  },
  meaningLabel: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  meaningValue: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  surahInfoRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  infoBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  infoBadgeText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  audioContainer: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  audioHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  audioTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    flex: 1,
  },
  reciterText: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  audioControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  timeText: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  replayButton: {
    padding: Spacing.sm,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: "#FEE2E2",
    borderRadius: BorderRadius.md,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
  versesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  versesTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  verseCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  verseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  verseNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  versePlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  verseNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  verseArabic: {
    fontSize: 24,
    fontFamily: "Poppins_400Regular",
    textAlign: "right",
    lineHeight: 40,
    marginBottom: Spacing.md,
  },
  verseDivider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  transliterationSection: {
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  transliterationVerse: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    fontStyle: "italic",
    lineHeight: 22,
  },
  translationSection: {
    marginBottom: Spacing.md,
  },
  translationText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
});
