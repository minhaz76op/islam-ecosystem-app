import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { DUAS, getDuasByCategory, Dua } from "@/data/duas";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function DuaListScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useTheme();
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isPlaying, isLoading, currentId, playAudio } = useAudioPlayer();

  const categories = useMemo(() => {
    const cats = [...new Set(DUAS.map((d) => d.category))];
    return cats.sort();
  }, []);

  const filteredDuas = useMemo(() => {
    return DUAS.filter((dua) => {
      const matchesSearch =
        searchQuery === "" ||
        dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.arabic.includes(searchQuery) ||
        dua.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.bengali.includes(searchQuery) ||
        dua.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || dua.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleExpand = async (id: string) => {
    await Haptics.selectionAsync();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCategorySelect = async (category: string | null) => {
    await Haptics.selectionAsync();
    setSelectedCategory(category);
  };

  const handlePlayAudio = async (dua: Dua, e: any) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // For duas without explicit audioUrl, we'll use a placeholder or generic recited audio
    // In a real app, each dua would have its own specific audio URL
    const audioUrl = (dua as any).audioUrl || `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/001001.mp3`;
    await playAudio(dua.id, audioUrl);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + tabBarHeight + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search duas..."
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        <Pressable
          onPress={() => handleCategorySelect(null)}
          style={[
            styles.categoryChip,
            {
              backgroundColor: !selectedCategory ? theme.primary : theme.backgroundDefault,
            },
          ]}
        >
          <ThemedText
            style={[styles.categoryChipText, { color: !selectedCategory ? "#FFFFFF" : theme.text }]}
          >
            All
          </ThemedText>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => handleCategorySelect(cat)}
            style={[
              styles.categoryChip,
              {
                backgroundColor: selectedCategory === cat ? theme.primary : theme.backgroundDefault,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.categoryChipText,
                { color: selectedCategory === cat ? "#FFFFFF" : theme.text },
              ]}
            >
              {cat}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      <ThemedText style={[styles.resultCount, { color: theme.textSecondary }]}>
        {filteredDuas.length} duas found
      </ThemedText>

      {filteredDuas.map((dua, index) => (
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
              <View style={styles.headerActions}>
                <Pressable
                  onPress={(e) => handlePlayAudio(dua, e)}
                  style={[styles.playBtn, { backgroundColor: theme.primary + "15" }]}
                >
                  {isLoading && currentId === dua.id ? (
                    <ActivityIndicator size="small" color={theme.primary} />
                  ) : (
                    <Feather
                      name={isPlaying && currentId === dua.id ? "pause" : "play"}
                      size={16}
                      color={theme.primary}
                    />
                  )}
                </Pressable>
                <Feather
                  name={expandedId === dua.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={theme.textSecondary}
                />
              </View>
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
                    {dua.source}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  categoryScroll: {
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  categoryChipText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  resultCount: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.md,
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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
