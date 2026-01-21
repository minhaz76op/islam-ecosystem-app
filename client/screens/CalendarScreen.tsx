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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhul Qa'dah",
  "Dhul Hijjah",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface IslamicEvent {
  name: string;
  arabicName: string;
  date: string;
  description: string;
}

const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    name: "Islamic New Year",
    arabicName: "رأس السنة الهجرية",
    date: "2024-07-07",
    description: "Beginning of Muharram and the new Islamic year",
  },
  {
    name: "Day of Ashura",
    arabicName: "يوم عاشوراء",
    date: "2024-07-17",
    description: "10th of Muharram - Day of fasting and remembrance",
  },
  {
    name: "Mawlid al-Nabi",
    arabicName: "المولد النبوي",
    date: "2024-09-15",
    description: "Birthday of Prophet Muhammad (PBUH)",
  },
  {
    name: "Ramadan Begins",
    arabicName: "رمضان",
    date: "2025-02-28",
    description: "Beginning of the holy month of fasting",
  },
  {
    name: "Laylat al-Qadr",
    arabicName: "ليلة القدر",
    date: "2025-03-26",
    description: "Night of Power - Better than a thousand months",
  },
  {
    name: "Eid al-Fitr",
    arabicName: "عيد الفطر",
    date: "2025-03-30",
    description: "Festival of Breaking the Fast",
  },
  {
    name: "Day of Arafah",
    arabicName: "يوم عرفة",
    date: "2025-06-05",
    description: "9th of Dhul Hijjah - Day of Hajj",
  },
  {
    name: "Eid al-Adha",
    arabicName: "عيد الأضحى",
    date: "2025-06-06",
    description: "Festival of Sacrifice",
  },
];

function getHijriDate(gregorianDate: Date): { day: number; month: string; year: number } {
  const jd = Math.floor((gregorianDate.getTime() - new Date(1970, 0, 1).getTime()) / 86400000) + 2440588;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + 
            Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - 
             Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return {
    day,
    month: HIJRI_MONTHS[month - 1] || HIJRI_MONTHS[0],
    year,
  };
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const hijriDate = useMemo(
    () => getHijriDate(selectedDate || today),
    [selectedDate]
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [daysInMonth, firstDayOfMonth]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return ISLAMIC_EVENTS.filter((event) => new Date(event.date) >= now)
      .slice(0, 3);
  }, []);

  const handlePrevMonth = async () => {
    await Haptics.selectionAsync();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = async () => {
    await Haptics.selectionAsync();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayPress = async (day: number) => {
    await Haptics.selectionAsync();
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const isFriday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 5;
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
        style={[
          styles.hijriCard,
          { backgroundColor: theme.primary },
        ]}
      >
        <ThemedText style={styles.hijriLabel}>Hijri Date</ThemedText>
        <ThemedText style={styles.hijriDay}>{hijriDate.day}</ThemedText>
        <ThemedText style={styles.hijriMonth}>
          {hijriDate.month} {hijriDate.year} AH
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[
          styles.calendarCard,
          { backgroundColor: theme.backgroundDefault },
        ]}
      >
        <View style={styles.calendarHeader}>
          <Pressable onPress={handlePrevMonth} style={styles.navButton}>
            <Feather name="chevron-left" size={24} color={theme.text} />
          </Pressable>
          <ThemedText style={styles.monthYear}>
            {MONTHS[currentMonth]} {currentYear}
          </ThemedText>
          <Pressable onPress={handleNextMonth} style={styles.navButton}>
            <Feather name="chevron-right" size={24} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.weekdaysRow}>
          {WEEKDAYS.map((day, index) => (
            <ThemedText
              key={day}
              style={[
                styles.weekday,
                { color: index === 5 ? theme.primary : theme.textSecondary },
              ]}
            >
              {day}
            </ThemedText>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {calendarDays.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => (day ? handleDayPress(day) : null)}
              disabled={!day}
              style={[
                styles.dayCell,
                isSelected(day || 0) && [
                  styles.selectedDay,
                  { backgroundColor: theme.primary },
                ],
                isToday(day || 0) &&
                  !isSelected(day || 0) && [
                    styles.todayDay,
                    { borderColor: theme.primary },
                  ],
              ]}
            >
              {day ? (
                <ThemedText
                  style={[
                    styles.dayText,
                    isSelected(day) && styles.selectedDayText,
                    isFriday(day) &&
                      !isSelected(day) && { color: theme.primary },
                  ]}
                >
                  {day}
                </ThemedText>
              ) : null}
            </Pressable>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>

        {upcomingEvents.map((event, index) => (
          <View
            key={event.name}
            style={[
              styles.eventCard,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.eventDateBadge,
                { backgroundColor: AppColors.gold + "20" },
              ]}
            >
              <ThemedText style={[styles.eventDateText, { color: AppColors.gold }]}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </ThemedText>
            </View>
            <View style={styles.eventContent}>
              <ThemedText style={styles.eventName}>{event.name}</ThemedText>
              <ThemedText style={styles.eventArabic}>
                {event.arabicName}
              </ThemedText>
              <ThemedText
                style={[styles.eventDescription, { color: theme.textSecondary }]}
              >
                {event.description}
              </ThemedText>
            </View>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hijriCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing["2xl"],
    ...Shadows.lg,
  },
  hijriLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
  },
  hijriDay: {
    fontSize: 56,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  hijriMonth: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.9)",
  },
  calendarCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing["2xl"],
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
  monthYear: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  weekdaysRow: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
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
    borderRadius: BorderRadius.full,
  },
  dayText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  selectedDay: {
    borderRadius: BorderRadius.full,
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
  },
  todayDay: {
    borderWidth: 2,
    borderRadius: BorderRadius.full,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.lg,
  },
  eventCard: {
    flexDirection: "row",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    ...Shadows.sm,
  },
  eventDateBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
    marginRight: Spacing.lg,
  },
  eventDateText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  eventContent: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  eventArabic: {
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
  eventDescription: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
