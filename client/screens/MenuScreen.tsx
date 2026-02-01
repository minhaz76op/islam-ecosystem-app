import React from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
  delay: number;
  theme: any;
}

function MenuItem({ icon, title, subtitle, color, onPress, delay, theme }: MenuItemProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <Pressable
        onPress={onPress}
        style={[styles.menuItem, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={[styles.menuIcon, { backgroundColor: color + "15" }]}>
          <Feather name={icon as any} size={24} color={color} />
        </View>
        <View style={styles.menuContent}>
          <ThemedText style={styles.menuTitle}>{title}</ThemedText>
          <ThemedText style={[styles.menuSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </ThemedText>
        </View>
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </Pressable>
    </Animated.View>
  );
}

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();

  const menuItems = [
    {
      icon: "book-open",
      title: t("learnQuran"),
      subtitle: "From alphabets to verses",
      color: "#059669",
      screen: "LearnQuran",
    },
    {
      icon: "heart",
      title: t("duas"),
      subtitle: "Collection of beautiful duas",
      color: AppColors.primary,
      screen: "DuaList",
    },
    {
      icon: "book-open",
      title: t("quran"),
      subtitle: "Read with translations",
      color: "#8B5CF6",
      screen: "Quran",
    },
    {
      icon: "star",
      title: "99 Names of Allah",
      subtitle: "Asma-ul-Husna",
      color: "#F59E0B",
      screen: "NamesOfAllah",
    },
    {
      icon: "users",
      title: "Islamic Names",
      subtitle: "Baby names with meanings",
      color: "#EC4899",
      screen: "IslamicNames",
    },
    {
      icon: "compass",
      title: "Qibla Direction",
      subtitle: "Find Makkah direction",
      color: "#10B981",
      screen: "QiblaDirection",
    },
    {
      icon: "shopping-cart",
      title: "Zakat Calculator",
      subtitle: "Calculate your Zakat",
      color: "#6366F1",
      screen: "ZakatCalculator",
    },
    {
      icon: "gift",
      title: "Charity Reminder",
      subtitle: "Track your donations",
      color: "#14B8A6",
      screen: "CharityReminder",
    },
    {
      icon: "file-text",
      title: t("articles"),
      subtitle: "Learn about Islam",
      color: "#3B82F6",
      screen: "Articles",
    },
    {
      icon: "help-circle",
      title: t("quiz"),
      subtitle: "Test your knowledge",
      color: "#F97316",
      screen: "Quiz",
    },
    {
      icon: "map-pin",
      title: t("mosqueLocator"),
      subtitle: "Find nearby mosques",
      color: "#22C55E",
      screen: "MosqueLocator",
    },
    {
      icon: "sunrise",
      title: t("rozaTimetable"),
      subtitle: "Sehri & Iftar times",
      color: "#A855F7",
      screen: "RozaTimetable",
    },
    {
      icon: "clock",
      title: "Missed Prayer Tracker",
      subtitle: "Track Qada prayers",
      color: "#EF4444",
      screen: "MissedPrayer",
    },
    {
      icon: "shield",
      title: "Ruqyah",
      subtitle: "Islamic healing & protection",
      color: "#0EA5E9",
      screen: "Ruqyah",
    },
    {
      icon: "clock",
      title: "History of Islam",
      subtitle: "Major events & periods",
      color: "#8B5CF6",
      screen: "IslamicHistory",
    },
    {
      icon: "book",
      title: "Islamic Stories",
      subtitle: "Prophets & companions",
      color: "#F59E0B",
      screen: "IslamicStories",
    },
    {
      icon: "check-circle",
      title: "Namaj",
      subtitle: "Jumma, Eid & Janajah",
      color: "#0EA5E9",
      screen: "Namaj",
    },
  ];

  const handlePress = async (screen: string) => {
    await Haptics.selectionAsync();
    navigation.navigate(screen);
  };

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
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: tabBarHeight + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <ThemedText style={styles.headerTitle}>{t("menu")}</ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Explore Islamic resources
          </ThemedText>
        </Animated.View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.screen + index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              color={item.color}
              onPress={() => handlePress(item.screen)}
              delay={200 + index * 100}
              theme={theme}
            />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing["2xl"],
  },
  menuGrid: {
    gap: Spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  menuIcon: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
});
