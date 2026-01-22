import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

function generateRamadanTimetable() {
  const timetable = [];
  const baseDate = new Date(2025, 2, 1);

  for (let i = 1; i <= 30; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i - 1);

    const sehriHour = 4 + Math.floor(i / 15);
    const sehriMin = 20 + Math.floor(Math.random() * 20);
    const iftarHour = 18 + Math.floor(i / 20);
    const iftarMin = Math.floor(Math.random() * 30);

    timetable.push({
      day: i,
      date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      sehri: `${sehriHour}:${sehriMin.toString().padStart(2, "0")} AM`,
      iftar: `${iftarHour > 12 ? iftarHour - 12 : iftarHour}:${iftarMin.toString().padStart(2, "0")} PM`,
    });
  }

  return timetable;
}

export default function RozaTimetableScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [timetable] = useState(generateRamadanTimetable);
  const today = new Date();

  const getCurrentRamadanDay = () => {
    return 15;
  };

  const currentDay = getCurrentRamadanDay();

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
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.title}>{t("rozaTimetable")}</ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Ramadan 2025 | {t("sehri")} & {t("iftar")} Times
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[styles.todayCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.todayHeader}>
          <ThemedText style={styles.todayLabel}>Today - Day {currentDay}</ThemedText>
          <View style={styles.todayBadge}>
            <Feather name="moon" size={14} color={theme.primary} />
          </View>
        </View>

        <View style={styles.todayTimes}>
          <View style={styles.timeBlock}>
            <View style={styles.timeIconContainer}>
              <Feather name="sunrise" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.timeLabel}>{t("sehri")}</ThemedText>
            <ThemedText style={styles.timeValue}>
              {timetable[currentDay - 1]?.sehri || "4:30 AM"}
            </ThemedText>
          </View>

          <View style={[styles.timeDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />

          <View style={styles.timeBlock}>
            <View style={styles.timeIconContainer}>
              <Feather name="sunset" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.timeLabel}>{t("iftar")}</ThemedText>
            <ThemedText style={styles.timeValue}>
              {timetable[currentDay - 1]?.iftar || "6:15 PM"}
            </ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Full Timetable</ThemedText>

        <View style={[styles.tableHeader, { backgroundColor: theme.backgroundSecondary }]}>
          <ThemedText style={[styles.headerCell, styles.dayCell]}>Day</ThemedText>
          <ThemedText style={[styles.headerCell, styles.dateCell]}>Date</ThemedText>
          <ThemedText style={[styles.headerCell, styles.timeCell]}>{t("sehri")}</ThemedText>
          <ThemedText style={[styles.headerCell, styles.timeCell]}>{t("iftar")}</ThemedText>
        </View>

        {timetable.map((day, index) => (
          <Animated.View
            key={day.day}
            entering={FadeInDown.delay(400 + index * 20).duration(400)}
          >
            <View
              style={[
                styles.tableRow,
                {
                  backgroundColor:
                    day.day === currentDay
                      ? theme.primary + "15"
                      : index % 2 === 0
                      ? theme.backgroundDefault
                      : theme.backgroundSecondary,
                  borderColor: day.day === currentDay ? theme.primary : "transparent",
                },
              ]}
            >
              <View style={styles.dayCell}>
                <View
                  style={[
                    styles.dayBadge,
                    {
                      backgroundColor:
                        day.day === currentDay ? theme.primary : theme.backgroundTertiary,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.dayText,
                      { color: day.day === currentDay ? "#FFFFFF" : theme.text },
                    ]}
                  >
                    {day.day}
                  </ThemedText>
                </View>
              </View>
              <ThemedText
                style={[styles.dateText, { color: theme.textSecondary }]}
                numberOfLines={1}
              >
                {day.date}
              </ThemedText>
              <ThemedText style={[styles.timeText, { color: AppColors.primary }]}>
                {day.sehri}
              </ThemedText>
              <ThemedText style={[styles.timeText, { color: "#EC4899" }]}>
                {day.iftar}
              </ThemedText>
            </View>
          </Animated.View>
        ))}
      </Animated.View>

      <View style={[styles.infoBox, { backgroundColor: theme.backgroundSecondary }]}>
        <Feather name="info" size={18} color={theme.textSecondary} />
        <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
          Times are approximate and based on your location. Please verify with your local mosque for accurate timings.
        </ThemedText>
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
    marginBottom: Spacing["2xl"],
  },
  todayCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.lg,
  },
  todayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  todayLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  todayBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  todayTimes: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBlock: {
    flex: 1,
    alignItems: "center",
  },
  timeIconContainer: {
    marginBottom: Spacing.sm,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
    marginBottom: Spacing.xs,
  },
  timeValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  timeDivider: {
    width: 1,
    height: 60,
    marginHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.lg,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  headerCell: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  dayCell: {
    width: 44,
    alignItems: "center",
  },
  dateCell: {
    flex: 1,
    textAlign: "left",
    paddingLeft: Spacing.sm,
  },
  timeCell: {
    width: 72,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: 2,
  },
  dayBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  dateText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    paddingLeft: Spacing.sm,
  },
  timeText: {
    width: 72,
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing["2xl"],
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
