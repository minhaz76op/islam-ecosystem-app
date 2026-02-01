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
  const [activeTab, setActiveTab] = useState<"alphabets" | "words" | "lines">("alphabets");

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
          {(["alphabets", "words", "lines"] as const).map((tab) => (
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
});
