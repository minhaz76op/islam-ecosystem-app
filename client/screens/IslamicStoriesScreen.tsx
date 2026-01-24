import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, AppColors } from "@/constants/theme";
import {
  ISLAMIC_STORIES,
  STORY_CATEGORIES,
  IslamicStory,
  StoryCategory,
  getStoriesByCategory,
  searchStories,
} from "@/data/islamic-stories";

interface CategoryCardProps {
  category: StoryCategory;
  theme: any;
  onPress: () => void;
  storyCount: number;
  index: number;
}

function CategoryCard({ category, theme, onPress, storyCount, index }: CategoryCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <Pressable
        onPress={onPress}
        style={[
          styles.categoryCard,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
        ]}
      >
        <View style={[styles.categoryIconBg, { backgroundColor: theme.primary + "15" }]}>
          <Feather name={category.icon as any} size={28} color={theme.primary} />
        </View>
        <View style={styles.categoryInfo}>
          <ThemedText style={[styles.categoryName, { color: theme.text }]}>
            {category.name}
          </ThemedText>
          <ThemedText style={[styles.categoryNameArabic, { color: theme.textSecondary }]}>
            {category.nameArabic}
          </ThemedText>
          <ThemedText
            style={[styles.categoryDescription, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {category.description}
          </ThemedText>
        </View>
        <View style={styles.categoryMeta}>
          <View style={[styles.storyCountBadge, { backgroundColor: theme.primary + "15" }]}>
            <ThemedText style={[styles.storyCountText, { color: theme.primary }]}>
              {storyCount}
            </ThemedText>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

interface StoryCardProps {
  story: IslamicStory;
  theme: any;
  onPress: () => void;
  index: number;
}

function StoryCard({ story, theme, onPress, index }: StoryCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <Pressable
        onPress={onPress}
        style={[
          styles.storyCard,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
        ]}
      >
        <View style={[styles.storyIconBg, { backgroundColor: theme.primary + "15" }]}>
          <Feather name="book-open" size={24} color={theme.primary} />
        </View>
        <View style={styles.storyInfo}>
          <ThemedText style={[styles.storyTitle, { color: theme.text }]} numberOfLines={2}>
            {story.title}
          </ThemedText>
          <ThemedText style={[styles.storyTitleArabic, { color: theme.textSecondary }]}>
            {story.titleArabic}
          </ThemedText>
          <ThemedText
            style={[styles.storySummary, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {story.summary}
          </ThemedText>
        </View>
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </Pressable>
    </Animated.View>
  );
}

interface StoryDetailProps {
  story: IslamicStory;
  theme: any;
  onBack: () => void;
}

function StoryDetail({ story, theme, onBack }: StoryDetailProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const paragraphs = story.content.split("\n\n");

  return (
    <ScrollView
      style={styles.detailContainer}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: insets.bottom + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={onBack} style={styles.backButton}>
        <Feather name="arrow-left" size={20} color={theme.primary} />
        <ThemedText style={[styles.backText, { color: theme.primary }]}>Back</ThemedText>
      </Pressable>

      <View style={[styles.detailHeader, { backgroundColor: theme.primary + "10" }]}>
        <ThemedText style={[styles.detailTitle, { color: theme.text }]}>
          {story.title}
        </ThemedText>
        <ThemedText style={[styles.detailTitleArabic, { color: theme.textSecondary }]}>
          {story.titleArabic}
        </ThemedText>
      </View>

      <View style={styles.detailSection}>
        <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
          The Story
        </ThemedText>
        {paragraphs.map((para, index) => (
          <ThemedText
            key={index}
            style={[styles.detailText, { color: theme.textSecondary }]}
          >
            {para}
          </ThemedText>
        ))}
      </View>

      <View
        style={[
          styles.lessonsBox,
          { backgroundColor: AppColors.gold + "15", borderColor: AppColors.gold + "30" },
        ]}
      >
        <View style={styles.lessonsHeader}>
          <Feather name="award" size={18} color={AppColors.gold} />
          <ThemedText style={[styles.lessonsTitle, { color: AppColors.gold }]}>
            Lessons & Wisdom
          </ThemedText>
        </View>
        {story.lessons.map((lesson, index) => (
          <View key={index} style={styles.lessonItem}>
            <View style={[styles.lessonBullet, { backgroundColor: AppColors.gold }]} />
            <ThemedText style={[styles.lessonText, { color: theme.text }]}>
              {lesson}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.referencesSection}>
        <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
          References
        </ThemedText>
        <View style={styles.referencesContainer}>
          {story.references.map((ref, index) => (
            <View
              key={index}
              style={[styles.referenceChip, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Feather name="book" size={14} color={theme.primary} />
              <ThemedText style={[styles.referenceText, { color: theme.text }]}>
                {ref}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default function IslamicStoriesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | null>(null);
  const [selectedStory, setSelectedStory] = useState<IslamicStory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryPress = useCallback((category: StoryCategory) => {
    setSelectedCategory(category);
  }, []);

  const handleStoryPress = useCallback((story: IslamicStory) => {
    setSelectedStory(story);
  }, []);

  const handleBack = useCallback(() => {
    if (selectedStory) {
      setSelectedStory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  }, [selectedStory, selectedCategory]);

  const filteredStories = searchQuery
    ? searchStories(searchQuery)
    : selectedCategory
    ? getStoriesByCategory(selectedCategory.id)
    : [];

  if (selectedStory) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <StoryDetail story={selectedStory} theme={theme} onBack={handleBack} />
      </View>
    );
  }

  if (selectedCategory || searchQuery) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <FlatList
          data={filteredStories}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <StoryCard
              story={item}
              theme={theme}
              onPress={() => handleStoryPress(item)}
              index={index}
            />
          )}
          contentContainerStyle={{
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: insets.bottom + Spacing.xl,
            paddingHorizontal: Spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {!searchQuery ? (
                <Pressable onPress={handleBack} style={styles.backButton}>
                  <Feather name="arrow-left" size={20} color={theme.primary} />
                  <ThemedText style={[styles.backText, { color: theme.primary }]}>
                    Back to Categories
                  </ThemedText>
                </Pressable>
              ) : null}
              <TextInput
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: theme.backgroundSecondary,
                    color: theme.text,
                    borderColor: theme.cardBorder,
                  },
                ]}
                placeholder="Search stories..."
                placeholderTextColor={theme.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {selectedCategory && !searchQuery ? (
                <View style={styles.categoryTitle}>
                  <ThemedText style={[styles.categoryTitleText, { color: theme.text }]}>
                    {selectedCategory.name}
                  </ThemedText>
                  <ThemedText style={[styles.categoryTitleArabic, { color: theme.textSecondary }]}>
                    {selectedCategory.nameArabic}
                  </ThemedText>
                </View>
              ) : null}
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name="search" size={48} color={theme.textSecondary} />
              <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
                No stories found
              </ThemedText>
            </View>
          }
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={STORY_CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CategoryCard
            category={item}
            theme={theme}
            onPress={() => handleCategoryPress(item)}
            storyCount={getStoriesByCategory(item.id).length}
            index={index}
          />
        )}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: insets.bottom + Spacing.xl,
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <ThemedText style={[styles.title, { color: theme.text }]}>
                Islamic Stories
              </ThemedText>
              <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                Stories of prophets, companions, and moral lessons from Islamic tradition
              </ThemedText>
            </View>
            <TextInput
              style={[
                styles.searchInput,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                  borderColor: theme.cardBorder,
                },
              ]}
              placeholder="Search all stories..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.statsRow}>
              <View style={[styles.statBadge, { backgroundColor: theme.primary + "15" }]}>
                <Feather name="book" size={16} color={theme.primary} />
                <ThemedText style={[styles.statText, { color: theme.primary }]}>
                  {ISLAMIC_STORIES.length} Stories
                </ThemedText>
              </View>
              <View style={[styles.statBadge, { backgroundColor: theme.primary + "15" }]}>
                <Feather name="folder" size={16} color={theme.primary} />
                <ThemedText style={[styles.statText, { color: theme.primary }]}>
                  {STORY_CATEGORIES.length} Categories
                </ThemedText>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  searchInput: {
    height: 48,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  statText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  categoryIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  categoryNameArabic: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    lineHeight: 18,
  },
  categoryMeta: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  storyCountBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  storyCountText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  backText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  categoryTitle: {
    marginBottom: Spacing.lg,
  },
  categoryTitleText: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
  categoryTitleArabic: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  storyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  storyIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  storyInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  storyTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  storyTitleArabic: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.xs,
  },
  storySummary: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    lineHeight: 18,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing["4xl"],
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.md,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
  },
  detailTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  detailTitleArabic: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  detailSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  detailText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  lessonsBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  lessonsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  lessonsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  lessonBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: Spacing.md,
  },
  lessonText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  referencesSection: {
    marginBottom: Spacing.xl,
  },
  referencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  referenceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  referenceText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
});
