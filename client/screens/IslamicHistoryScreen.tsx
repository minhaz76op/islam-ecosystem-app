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
  ISLAMIC_HISTORY,
  HistoricalPeriod,
  HistoricalEvent,
  searchHistory,
} from "@/data/islamic-history";

interface PeriodCardProps {
  period: HistoricalPeriod;
  theme: any;
  onPress: () => void;
  index: number;
}

function PeriodCard({ period, theme, onPress, index }: PeriodCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <Pressable
        onPress={onPress}
        style={[
          styles.periodCard,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.periodHeader}>
          <View style={[styles.periodIconBg, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="clock" size={24} color={theme.primary} />
          </View>
          <View style={styles.periodInfo}>
            <ThemedText style={[styles.periodName, { color: theme.text }]}>
              {period.name}
            </ThemedText>
            <ThemedText style={[styles.periodNameArabic, { color: theme.textSecondary }]}>
              {period.nameArabic}
            </ThemedText>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </View>
        <ThemedText style={[styles.periodDates, { color: theme.primary }]}>
          {period.startYear} - {period.endYear}
        </ThemedText>
        <ThemedText
          style={[styles.periodDescription, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {period.description}
        </ThemedText>
        <View style={[styles.eventsBadge, { backgroundColor: theme.primary + "15" }]}>
          <ThemedText style={[styles.eventsBadgeText, { color: theme.primary }]}>
            {period.events.length} Events
          </ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

interface EventCardProps {
  event: HistoricalEvent;
  theme: any;
  onPress: () => void;
  index: number;
}

function EventCard({ event, theme, onPress, index }: EventCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <Pressable
        onPress={onPress}
        style={[
          styles.eventCard,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.eventTimeline}>
          <View style={[styles.timelineDot, { backgroundColor: theme.primary }]} />
          <View style={[styles.timelineLine, { backgroundColor: theme.primary + "30" }]} />
        </View>
        <View style={styles.eventContent}>
          <ThemedText style={[styles.eventYear, { color: theme.primary }]}>
            {event.year}
            {event.yearHijri ? ` (${event.yearHijri})` : ""}
          </ThemedText>
          <ThemedText style={[styles.eventTitle, { color: theme.text }]}>
            {event.title}
          </ThemedText>
          {event.titleArabic ? (
            <ThemedText style={[styles.eventTitleArabic, { color: theme.textSecondary }]}>
              {event.titleArabic}
            </ThemedText>
          ) : null}
          <ThemedText
            style={[styles.eventDescription, { color: theme.textSecondary }]}
            numberOfLines={3}
          >
            {event.description}
          </ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

interface EventDetailProps {
  event: HistoricalEvent;
  theme: any;
  onBack: () => void;
}

function EventDetail({ event, theme, onBack }: EventDetailProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

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
        <ThemedText style={[styles.detailYear, { color: theme.primary }]}>
          {event.year}
          {event.yearHijri ? ` (${event.yearHijri})` : ""}
        </ThemedText>
        <ThemedText style={[styles.detailTitle, { color: theme.text }]}>
          {event.title}
        </ThemedText>
        {event.titleArabic ? (
          <ThemedText style={[styles.detailTitleArabic, { color: theme.textSecondary }]}>
            {event.titleArabic}
          </ThemedText>
        ) : null}
      </View>

      <View style={styles.detailSection}>
        <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
          What Happened
        </ThemedText>
        <ThemedText style={[styles.detailText, { color: theme.textSecondary }]}>
          {event.description}
        </ThemedText>
      </View>

      <View
        style={[
          styles.significanceBox,
          { backgroundColor: AppColors.gold + "15", borderColor: AppColors.gold + "30" },
        ]}
      >
        <View style={styles.significanceHeader}>
          <Feather name="star" size={18} color={AppColors.gold} />
          <ThemedText style={[styles.significanceTitle, { color: AppColors.gold }]}>
            Significance
          </ThemedText>
        </View>
        <ThemedText style={[styles.significanceText, { color: theme.text }]}>
          {event.significance}
        </ThemedText>
      </View>
    </ScrollView>
  );
}

export default function IslamicHistoryScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePeriodPress = useCallback((period: HistoricalPeriod) => {
    setSelectedPeriod(period);
  }, []);

  const handleEventPress = useCallback((event: HistoricalEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleBack = useCallback(() => {
    if (selectedEvent) {
      setSelectedEvent(null);
    } else if (selectedPeriod) {
      setSelectedPeriod(null);
    }
  }, [selectedEvent, selectedPeriod]);

  const filteredEvents = searchQuery
    ? searchHistory(searchQuery)
    : selectedPeriod?.events || [];

  if (selectedEvent) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <EventDetail event={selectedEvent} theme={theme} onBack={handleBack} />
      </View>
    );
  }

  if (selectedPeriod || searchQuery) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <EventCard
              event={item}
              theme={theme}
              onPress={() => handleEventPress(item)}
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
                    Back to Periods
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
                placeholder="Search events..."
                placeholderTextColor={theme.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {selectedPeriod && !searchQuery ? (
                <View style={styles.periodTitle}>
                  <ThemedText style={[styles.periodTitleText, { color: theme.text }]}>
                    {selectedPeriod.name}
                  </ThemedText>
                  <ThemedText style={[styles.periodTitleArabic, { color: theme.textSecondary }]}>
                    {selectedPeriod.nameArabic}
                  </ThemedText>
                </View>
              ) : null}
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name="search" size={48} color={theme.textSecondary} />
              <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
                No events found
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
        data={ISLAMIC_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PeriodCard
            period={item}
            theme={theme}
            onPress={() => handlePeriodPress(item)}
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
                History of Islam
              </ThemedText>
              <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                Explore the major events and periods that shaped Islamic civilization
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
              placeholder="Search all events..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
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
  periodCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  periodHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  periodIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  periodInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  periodName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  periodNameArabic: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  periodDates: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  periodDescription: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  eventsBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  eventsBadgeText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
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
  periodTitle: {
    marginBottom: Spacing.lg,
  },
  periodTitleText: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
  periodTitleArabic: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  eventCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  eventTimeline: {
    alignItems: "center",
    marginRight: Spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: Spacing.xs,
  },
  eventContent: {
    flex: 1,
  },
  eventYear: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  eventTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  eventTitleArabic: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.sm,
  },
  eventDescription: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
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
  detailYear: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.sm,
  },
  detailTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  detailTitleArabic: {
    fontSize: 18,
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
  },
  significanceBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  significanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  significanceTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  significanceText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
});
