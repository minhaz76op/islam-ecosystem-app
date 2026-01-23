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
import { NAMES_OF_ALLAH, NameOfAllah } from "@/data/names-of-allah";

export default function NamesOfAllahScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNames = NAMES_OF_ALLAH.filter(
    (name) =>
      name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.bengali.includes(searchQuery)
  );

  const handleExpand = async (id: number) => {
    await Haptics.selectionAsync();
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item, index }: { item: NameOfAllah; index: number }) => (
    <Animated.View entering={FadeInDown.delay(50 + index * 20).duration(400)}>
      <Pressable
        onPress={() => handleExpand(item.number)}
        style={[
          styles.nameCard,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: expandedId === item.number ? theme.primary : theme.cardBorder,
          },
        ]}
      >
        <View style={styles.nameHeader}>
          <View style={[styles.numberBadge, { backgroundColor: theme.primary }]}>
            <ThemedText style={styles.numberText}>{item.number}</ThemedText>
          </View>
          <View style={styles.nameContent}>
            <ThemedText style={styles.arabicText}>{item.arabic}</ThemedText>
            <ThemedText style={styles.transliteration}>{item.transliteration}</ThemedText>
          </View>
          <Feather
            name={expandedId === item.number ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.textSecondary}
          />
        </View>

        {expandedId === item.number ? (
          <View style={styles.expandedContent}>
            <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.meaningSection}>
              <ThemedText style={[styles.meaningLabel, { color: theme.primary }]}>
                English:
              </ThemedText>
              <ThemedText style={styles.meaningText}>{item.english}</ThemedText>
            </View>
            <View style={styles.meaningSection}>
              <ThemedText style={[styles.meaningLabel, { color: theme.primary }]}>
                বাংলা:
              </ThemedText>
              <ThemedText style={styles.meaningText}>{item.bengali}</ThemedText>
            </View>
            <View style={[styles.detailBox, { backgroundColor: theme.backgroundSecondary }]}>
              <ThemedText style={[styles.detailText, { color: theme.textSecondary }]}>
                {item.meaning}
              </ThemedText>
            </View>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.searchContainer, { paddingTop: headerHeight + Spacing.md }]}>
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
      </View>

      <FlatList
        data={filteredNames}
        renderItem={renderItem}
        keyExtractor={(item) => item.number.toString()}
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
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
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
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  nameContent: {
    flex: 1,
  },
  arabicText: {
    fontSize: 24,
    textAlign: "right",
    marginBottom: Spacing.xs,
  },
  transliteration: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
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
  detailBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  detailText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
