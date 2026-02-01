import React, { useState } from "react";
import { View, StyleSheet, Pressable, FlatList, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { ISLAMIC_NAMES, IslamicName, searchNames } from "@/data/islamic-names";

export default function IslamicNamesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [selectedGender, setSelectedGender] = useState<"all" | "male" | "female">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredNames = ISLAMIC_NAMES.filter((name) => {
    const matchesGender = selectedGender === "all" || name.gender === selectedGender;
    const matchesSearch =
      searchQuery === "" ||
      name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (name.meaningBengali && name.meaningBengali.includes(searchQuery));
    return matchesGender && matchesSearch;
  });

  const handleExpand = async (id: string) => {
    await Haptics.selectionAsync();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleGenderSelect = async (gender: "all" | "male" | "female") => {
    await Haptics.selectionAsync();
    setSelectedGender(gender);
  };

  const renderItem = ({ item, index }: { item: IslamicName; index: number }) => (
    <Animated.View entering={FadeInDown.delay(50 + index * 15).duration(400)}>
      <Pressable
        onPress={() => handleExpand(item.id)}
        style={[
          styles.nameCard,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: expandedId === item.id ? theme.primary : theme.cardBorder,
          },
        ]}
      >
        <View style={styles.nameHeader}>
          <View
            style={[
              styles.genderIcon,
              { backgroundColor: item.gender === "male" ? "#3B82F6" + "20" : "#EC4899" + "20" },
            ]}
          >
            <Feather
              name={item.gender === "male" ? "user" : "user"}
              size={18}
              color={item.gender === "male" ? "#3B82F6" : "#EC4899"}
            />
          </View>
          <View style={styles.nameContent}>
            <ThemedText style={styles.nameText}>{item.name}</ThemedText>
            <ThemedText style={styles.arabicText}>{item.arabic}</ThemedText>
          </View>
          <Feather
            name={expandedId === item.id ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.textSecondary}
          />
        </View>

        {expandedId === item.id ? (
          <View style={styles.expandedContent}>
            <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.meaningSection}>
              <ThemedText style={[styles.meaningLabel, { color: theme.primary }]}>
                Meaning (English):
              </ThemedText>
              <ThemedText style={styles.meaningText}>{item.meaning}</ThemedText>
            </View>
            <View style={styles.meaningSection}>
              <ThemedText style={[styles.meaningLabel, { color: theme.primary }]}>
                অর্থ (বাংলা):
              </ThemedText>
              <ThemedText style={styles.meaningText}>{item.meaningBengali}</ThemedText>
            </View>
            <View style={[styles.originBadge, { backgroundColor: theme.backgroundSecondary }]}>
              <ThemedText style={[styles.originText, { color: theme.textSecondary }]}>
                Origin: {item.origin}
              </ThemedText>
            </View>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.headerSection, { paddingTop: headerHeight + Spacing.md }]}>
        <View style={[styles.searchBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search names..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          {(["all", "male", "female"] as const).map((gender) => (
            <Pressable
              key={gender}
              onPress={() => handleGenderSelect(gender)}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedGender === gender ? theme.primary : theme.backgroundDefault,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  { color: selectedGender === gender ? "#FFFFFF" : theme.text },
                ]}
              >
                {gender === "all" ? "All" : gender === "male" ? "Boys" : "Girls"}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredNames}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: insets.bottom + Spacing["2xl"],
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
  filterRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  nameCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    ...Shadows.sm,
  },
  nameHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  genderIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  nameContent: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  arabicText: {
    fontSize: 16,
    color: "#6B7280",
  },
  expandedContent: {
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.md,
  },
  meaningSection: {
    marginBottom: Spacing.md,
  },
  meaningLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  meaningText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  originBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  originText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
});
