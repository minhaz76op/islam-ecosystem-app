import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  gregorianToIslamic,
  getHolidaysForIslamicDate,
  formatIslamicDate,
  getUpcomingHolidays,
  IslamicDate,
  IslamicHoliday,
} from "@/lib/islamic-calendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const todayIslamic = useMemo(() => gregorianToIslamic(new Date()), []);
  const selectedIslamic = useMemo(
    () => (selectedDate ? gregorianToIslamic(selectedDate) : null),
    [selectedDate]
  );

  const upcomingHolidays = useMemo(() => getUpcomingHolidays(5), []);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: Date; islamicDate: IslamicDate; isCurrentMonth: boolean }[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        islamicDate: gregorianToIslamic(date),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        islamicDate: gregorianToIslamic(date),
        isCurrentMonth: true,
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        islamicDate: gregorianToIslamic(date),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const handlePrevMonth = async () => {
    await Haptics.selectionAsync();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = async () => {
    await Haptics.selectionAsync();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = async (date: Date) => {
    await Haptics.selectionAsync();
    setSelectedDate(date);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const selectedHolidays = useMemo(() => {
    if (!selectedIslamic) return [];
    return getHolidaysForIslamicDate(selectedIslamic);
  }, [selectedIslamic]);

  const getHolidayTypeColor = (type: string): string => {
    switch (type) {
      case "major":
        return AppColors.primary;
      case "fasting":
        return AppColors.gold;
      default:
        return AppColors.accent;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={[styles.todayCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.todayContent}>
          <View>
            <ThemedText style={styles.todayLabel}>Today</ThemedText>
            <ThemedText style={styles.todayDate}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </ThemedText>
          </View>
          <View style={styles.islamicDateBadge}>
            <ThemedText style={styles.islamicDay}>{todayIslamic.day}</ThemedText>
            <ThemedText style={styles.islamicMonth}>{todayIslamic.monthName}</ThemedText>
            <ThemedText style={styles.islamicYear}>{todayIslamic.year} AH</ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[styles.calendarCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={styles.calendarHeader}>
          <Pressable onPress={handlePrevMonth} style={styles.navButton}>
            <Feather name="chevron-left" size={24} color={theme.text} />
          </Pressable>
          <ThemedText style={styles.monthTitle}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </ThemedText>
          <Pressable onPress={handleNextMonth} style={styles.navButton}>
            <Feather name="chevron-right" size={24} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.weekdaysRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <ThemedText style={[styles.weekdayText, { color: theme.textSecondary }]}>
                {day}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {calendarDays.map((item, index) => {
            const holidays = getHolidaysForIslamicDate(item.islamicDate);
            const hasHoliday = holidays.length > 0;

            return (
              <Pressable
                key={index}
                onPress={() => handleDateSelect(item.date)}
                style={[
                  styles.dayCell,
                  isSelected(item.date) && { backgroundColor: theme.primary },
                  isToday(item.date) && !isSelected(item.date) && {
                    borderWidth: 2,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.dayNumber,
                    !item.isCurrentMonth && { opacity: 0.3 },
                    isSelected(item.date) && { color: "#FFFFFF" },
                  ]}
                >
                  {item.date.getDate()}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.islamicDayNumber,
                    { color: theme.textSecondary },
                    !item.isCurrentMonth && { opacity: 0.3 },
                    isSelected(item.date) && { color: "rgba(255,255,255,0.7)" },
                  ]}
                >
                  {item.islamicDate.day}
                </ThemedText>
                {hasHoliday ? (
                  <View
                    style={[
                      styles.holidayDot,
                      { backgroundColor: getHolidayTypeColor(holidays[0].type) },
                    ]}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      {selectedDate && selectedIslamic ? (
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={[styles.selectedCard, { backgroundColor: theme.backgroundDefault }]}
        >
          <View style={styles.selectedHeader}>
            <View>
              <ThemedText style={styles.selectedGregorian}>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </ThemedText>
              <ThemedText style={[styles.selectedIslamic, { color: theme.primary }]}>
                {formatIslamicDate(selectedIslamic)}
              </ThemedText>
              <ThemedText style={[styles.islamicArabic, { color: theme.textSecondary }]}>
                {selectedIslamic.day} {selectedIslamic.monthNameArabic} {selectedIslamic.year} هـ
              </ThemedText>
            </View>
          </View>

          {selectedHolidays.length > 0 ? (
            <View style={styles.holidaysList}>
              {selectedHolidays.map((holiday, index) => (
                <View
                  key={index}
                  style={[
                    styles.holidayItem,
                    { borderLeftColor: getHolidayTypeColor(holiday.type) },
                  ]}
                >
                  <ThemedText style={styles.holidayName}>{holiday.name}</ThemedText>
                  <ThemedText style={[styles.holidayArabic, { color: theme.primary }]}>
                    {holiday.nameArabic}
                  </ThemedText>
                  <ThemedText style={[styles.holidayDesc, { color: theme.textSecondary }]}>
                    {holiday.description}
                  </ThemedText>
                </View>
              ))}
            </View>
          ) : (
            <ThemedText style={[styles.noHolidays, { color: theme.textSecondary }]}>
              No Islamic holidays on this date
            </ThemedText>
          )}
        </Animated.View>
      ) : null}

      <Animated.View entering={FadeInDown.delay(400).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Upcoming Islamic Events</ThemedText>
        <View style={styles.upcomingList}>
          {upcomingHolidays.map(({ holiday, gregorianDate }, index) => (
            <Pressable
              key={index}
              onPress={() => handleDateSelect(gregorianDate)}
              style={[styles.upcomingCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View
                style={[
                  styles.upcomingIcon,
                  { backgroundColor: getHolidayTypeColor(holiday.type) + "20" },
                ]}
              >
                <Feather
                  name={holiday.type === "fasting" ? "moon" : "star"}
                  size={20}
                  color={getHolidayTypeColor(holiday.type)}
                />
              </View>
              <View style={styles.upcomingContent}>
                <ThemedText style={styles.upcomingName}>{holiday.name}</ThemedText>
                <ThemedText style={[styles.upcomingDate, { color: theme.textSecondary }]}>
                  {gregorianDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </ThemedText>
              </View>
              <Feather name="chevron-right" size={20} color={theme.textSecondary} />
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todayCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  todayContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todayLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
  },
  todayDate: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  islamicDateBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  islamicDay: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  islamicMonth: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.9)",
  },
  islamicYear: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.7)",
  },
  calendarCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  navButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  weekdaysRow: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    position: "relative",
  },
  dayNumber: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  islamicDayNumber: {
    fontSize: 9,
    fontFamily: "Poppins_400Regular",
  },
  holidayDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  selectedCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  selectedHeader: {
    marginBottom: Spacing.lg,
  },
  selectedGregorian: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  selectedIslamic: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.xs,
  },
  islamicArabic: {
    fontSize: 16,
    textAlign: "right",
  },
  holidaysList: {
    gap: Spacing.md,
  },
  holidayItem: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  holidayName: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  holidayArabic: {
    fontSize: 14,
    marginVertical: Spacing.xs,
  },
  holidayDesc: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
  noHolidays: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  upcomingList: {
    gap: Spacing.md,
  },
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  upcomingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  upcomingDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
});
