import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { DUAS, getDuasByCategory, Dua } from "@/data/duas";

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
