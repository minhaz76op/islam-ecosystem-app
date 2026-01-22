import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const ARTICLES = [
  {
    id: "1",
    title: "The Importance of Salah in Islam",
    excerpt: "Salah is the second pillar of Islam and one of the most important acts of worship...",
    category: "Prayer",
    readTime: "5 min",
    image: "prayer",
  },
  {
    id: "2",
    title: "Understanding the Five Pillars of Islam",
    excerpt: "The Five Pillars are the foundation upon which the Muslim faith is built...",
    category: "Basics",
    readTime: "8 min",
    image: "pillars",
  },
  {
    id: "3",
    title: "Benefits of Fasting in Ramadan",
    excerpt: "Fasting during Ramadan brings numerous spiritual, physical, and social benefits...",
    category: "Ramadan",
    readTime: "6 min",
    image: "ramadan",
  },
  {
    id: "4",
    title: "The Significance of Zakat",
    excerpt: "Zakat purifies wealth and helps in the redistribution of resources in society...",
    category: "Charity",
    readTime: "4 min",
    image: "zakat",
  },
  {
    id: "5",
    title: "Etiquettes of Making Dua",
    excerpt: "Learn the proper way to make dua and increase the chances of acceptance...",
    category: "Worship",
    readTime: "5 min",
    image: "dua",
  },
  {
    id: "6",
    title: "The Night of Power (Laylatul Qadr)",
    excerpt: "The most blessed night in the Islamic calendar, better than a thousand months...",
    category: "Ramadan",
    readTime: "7 min",
    image: "laylat",
  },
];

export default function ArticlesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Prayer", "Basics", "Ramadan", "Charity", "Worship"];

  const filteredArticles = selectedCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

  const handleArticlePress = async () => {
    await Haptics.selectionAsync();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Prayer: AppColors.primary,
      Basics: "#8B5CF6",
      Ramadan: "#EC4899",
      Charity: "#10B981",
      Worship: "#F59E0B",
    };
    return colors[category] || AppColors.primary;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <ThemedText style={styles.title}>Islamic Articles</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            Learn and grow in your faith
          </ThemedText>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={async () => {
                await Haptics.selectionAsync();
                setSelectedCategory(category);
              }}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category
                      ? theme.primary
                      : theme.backgroundDefault,
                  borderColor:
                    selectedCategory === category
                      ? theme.primary
                      : theme.cardBorder,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryChipText,
                  {
                    color:
                      selectedCategory === category ? "#FFFFFF" : theme.text,
                  },
                ]}
              >
                {category}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={[styles.articleList, { paddingHorizontal: Spacing.lg }]}>
        {filteredArticles.map((article, index) => (
          <Animated.View
            key={article.id}
            entering={FadeInDown.delay(300 + index * 100).duration(500)}
          >
            <Pressable
              onPress={handleArticlePress}
              style={[
                styles.articleCard,
                { backgroundColor: theme.backgroundDefault },
              ]}
            >
              <View
                style={[
                  styles.articleImage,
                  { backgroundColor: getCategoryColor(article.category) + "20" },
                ]}
              >
                <Feather
                  name="file-text"
                  size={32}
                  color={getCategoryColor(article.category)}
                />
              </View>

              <View style={styles.articleContent}>
                <View style={styles.articleMeta}>
                  <View
                    style={[
                      styles.articleCategoryBadge,
                      { backgroundColor: getCategoryColor(article.category) + "15" },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.articleCategoryText,
                        { color: getCategoryColor(article.category) },
                      ]}
                    >
                      {article.category}
                    </ThemedText>
                  </View>
                  <View style={styles.readTimeContainer}>
                    <Feather name="clock" size={12} color={theme.textSecondary} />
                    <ThemedText
                      style={[styles.readTimeText, { color: theme.textSecondary }]}
                    >
                      {article.readTime}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.articleTitle}>{article.title}</ThemedText>
                <ThemedText
                  style={[styles.articleExcerpt, { color: theme.textSecondary }]}
                  numberOfLines={2}
                >
                  {article.excerpt}
                </ThemedText>

                <View style={styles.readMoreRow}>
                  <ThemedText style={[styles.readMoreText, { color: theme.primary }]}>
                    Read More
                  </ThemedText>
                  <Feather name="arrow-right" size={16} color={theme.primary} />
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.xl,
  },
  categoryContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing["2xl"],
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  articleList: {
    gap: Spacing.lg,
  },
  articleCard: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    ...Shadows.sm,
  },
  articleImage: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  articleContent: {
    padding: Spacing.lg,
  },
  articleMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  articleCategoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  articleCategoryText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  readTimeText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  articleTitle: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.sm,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  readMoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
});
