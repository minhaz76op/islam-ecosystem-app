import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, RefreshControl, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { calculatePrayerTimesForLocation, formatTime, getTimeUntil, getNextPrayerFromTimes, PrayerTimesResult } from "@/lib/prayer-calculator";
import { saveUserLocation, getUserLocation, UserLocation, getCompletedPrayers, saveCompletedPrayer, CompletedPrayer } from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export default function DailySalahScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useTheme();

  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesResult | null>(null);
  const [completedPrayers, setCompletedPrayers] = useState<CompletedPrayer | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeUntil, setTimeUntil] = useState("");

  const pulseScale = useSharedValue(1);

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const completed = await getCompletedPrayers(today);
    setCompletedPrayers(completed);

    const savedLocation = await getUserLocation();
    if (savedLocation) {
      setLocation(savedLocation);
      const times = calculatePrayerTimesForLocation(savedLocation.latitude, savedLocation.longitude);
      setPrayerTimes(times);

      const next = getNextPrayerFromTimes(times);
      if (next) {
        setTimeUntil(getTimeUntil(next.time));
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();

    pulseScale.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 10 }),
        withSpring(1, { damping: 10 })
      ),
      -1,
      true
    );

    const interval = setInterval(() => {
      if (prayerTimes) {
        const next = getNextPrayerFromTimes(prayerTimes);
        if (next) {
          setTimeUntil(getTimeUntil(next.time));
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchLocation = async () => {
    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      let city = "";
      let country = "";

      try {
        const [geocode] = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        if (geocode) {
          city = geocode.city || geocode.subregion || "";
          country = geocode.country || "";
        }
      } catch (e) {
        console.log("Geocoding failed:", e);
      }

      const userLocation: UserLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        city,
        country,
        timestamp: Date.now(),
      };

      await saveUserLocation(userLocation);
      setLocation(userLocation);

      const times = calculatePrayerTimesForLocation(coords.latitude, coords.longitude);
      setPrayerTimes(times);

      const next = getNextPrayerFromTimes(times);
      if (next) {
        setTimeUntil(getTimeUntil(next.time));
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Location error:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await requestPermission();
    if (result.granted) {
      await fetchLocation();
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (permission?.granted) {
      await fetchLocation();
    }
    await loadData();
    setRefreshing(false);
  }, [permission, loadData]);

  const handlePrayerComplete = async (prayerKey: keyof Omit<CompletedPrayer, "date">) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const today = getTodayDate();
    const isCompleted = completedPrayers?.[prayerKey] || false;
    await saveCompletedPrayer(today, prayerKey, !isCompleted);
    const updated = await getCompletedPrayers(today);
    setCompletedPrayers(updated);
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const nextPrayer = prayerTimes ? getNextPrayerFromTimes(prayerTimes) : null;

  const prayers = prayerTimes ? [
    { key: "fajr" as const, name: "Fajr", arabicName: "الفجر", time: prayerTimes.fajr, icon: "sunrise" },
    { key: "dhuhr" as const, name: "Dhuhr", arabicName: "الظهر", time: prayerTimes.dhuhr, icon: "sun" },
    { key: "asr" as const, name: "Asr", arabicName: "العصر", time: prayerTimes.asr, icon: "cloud" },
    { key: "maghrib" as const, name: "Maghrib", arabicName: "المغرب", time: prayerTimes.maghrib, icon: "sunset" },
    { key: "isha" as const, name: "Isha", arabicName: "العشاء", time: prayerTimes.isha, icon: "moon" },
  ] : [];

  const prayerKeys: (keyof Omit<CompletedPrayer, "date">)[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  const completedCount = prayerKeys.filter((key) => completedPrayers?.[key]).length;

  if (!permission) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <View style={[styles.permissionCard, { marginTop: headerHeight + Spacing["3xl"] }]}>
          <View style={[styles.permissionIcon, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="map-pin" size={48} color={theme.primary} />
          </View>
          <ThemedText style={styles.permissionTitle}>
            Location Required
          </ThemedText>
          <ThemedText style={[styles.permissionDesc, { color: theme.textSecondary }]}>
            To calculate accurate prayer times and Azan timings for your location, 
            please allow access to your device's location.
          </ThemedText>
          
          {permission.status === "denied" && !permission.canAskAgain ? (
            <>
              <ThemedText style={[styles.deniedText, { color: theme.error }]}>
                Location permission was denied. Please enable it in settings.
              </ThemedText>
              {Platform.OS !== "web" ? (
                <Button
                  onPress={async () => {
                    try {
                      await Linking.openSettings();
                    } catch (error) {
                      console.error("Could not open settings:", error);
                    }
                  }}
                  style={styles.permissionButton}
                >
                  Open Settings
                </Button>
              ) : null}
            </>
          ) : (
            <Button onPress={handleRequestPermission} style={styles.permissionButton}>
              Enable Location
            </Button>
          )}
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={isDark ? ["#0F1419", "#1A1F26", "#0F1419"] : [AppColors.background, "#E8F5E9", AppColors.background]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: tabBarHeight + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {location ? (
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={[styles.locationCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={[styles.locationIcon, { backgroundColor: theme.primary + "15" }]}>
              <Feather name="map-pin" size={20} color={theme.primary} />
            </View>
            <View style={styles.locationInfo}>
              <ThemedText style={styles.locationCity}>
                {location.city || "Your Location"}
              </ThemedText>
              <ThemedText style={[styles.locationCountry, { color: theme.textSecondary }]}>
                {location.country || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              </ThemedText>
            </View>
            <Pressable onPress={fetchLocation} style={styles.refreshBtn}>
              <Feather name="refresh-cw" size={18} color={theme.primary} />
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={[styles.locationCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <Button onPress={fetchLocation} style={{ flex: 1 }}>
              {isLoading ? "Getting Location..." : "Get My Location"}
            </Button>
          </Animated.View>
        )}

        {nextPrayer ? (
          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <Pressable style={[styles.nextPrayerCard, { backgroundColor: theme.primary }]}>
              <Animated.View style={[styles.prayerGlow, pulseStyle]}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.2)", "transparent"]}
                  style={styles.glowGradient}
                />
              </Animated.View>
              <View style={styles.prayerCardContent}>
                <View>
                  <ThemedText style={styles.nextPrayerLabel}>Next Prayer</ThemedText>
                  <ThemedText style={styles.nextPrayerName}>{nextPrayer.name}</ThemedText>
                  <ThemedText style={styles.nextPrayerArabic}>{nextPrayer.arabicName}</ThemedText>
                </View>
                <View style={styles.prayerTimeContainer}>
                  <ThemedText style={styles.prayerTime}>{formatTime(nextPrayer.time)}</ThemedText>
                  <ThemedText style={styles.timeUntilText}>in {timeUntil}</ThemedText>
                </View>
              </View>
              <View style={styles.azanBadge}>
                <Feather name="volume-2" size={14} color={AppColors.gold} />
                <ThemedText style={styles.azanText}>Azan</ThemedText>
              </View>
            </Pressable>
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <View style={styles.salahHeader}>
            <ThemedText style={styles.sectionTitle}>Today's Prayer Times</ThemedText>
            <ThemedText style={[styles.completedText, { color: theme.textSecondary }]}>
              {completedCount}/5 completed
            </ThemedText>
          </View>

          <View style={[styles.prayersList, { backgroundColor: theme.backgroundDefault }]}>
            {prayers.map((prayer, index) => {
              const isCompleted = completedPrayers?.[prayer.key] || false;
              const isNext = nextPrayer?.name === prayer.name;

              return (
                <Pressable
                  key={prayer.key}
                  onPress={() => handlePrayerComplete(prayer.key)}
                  style={[
                    styles.prayerRow,
                    index < prayers.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.cardBorder },
                    isNext && { backgroundColor: theme.primary + "08" },
                  ]}
                >
                  <View
                    style={[
                      styles.prayerIcon,
                      { backgroundColor: isCompleted ? theme.primary : theme.primary + "15" },
                    ]}
                  >
                    {isCompleted ? (
                      <Feather name="check" size={20} color="#FFFFFF" />
                    ) : (
                      <Feather name={prayer.icon as any} size={20} color={theme.primary} />
                    )}
                  </View>
                  <View style={styles.prayerInfo}>
                    <View style={styles.prayerNames}>
                      <ThemedText
                        style={[styles.prayerName, isCompleted && { textDecorationLine: "line-through", opacity: 0.6 }]}
                      >
                        {prayer.name}
                      </ThemedText>
                      <ThemedText style={[styles.prayerArabic, { color: theme.textSecondary }]}>
                        {prayer.arabicName}
                      </ThemedText>
                    </View>
                    <View style={styles.prayerRight}>
                      <ThemedText style={styles.prayerTimeText}>{formatTime(prayer.time)}</ThemedText>
                      {isNext ? (
                        <View style={[styles.nextBadge, { backgroundColor: theme.primary }]}>
                          <ThemedText style={styles.nextBadgeText}>NEXT</ThemedText>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {prayerTimes ? (
          <Animated.View entering={FadeInDown.delay(400).duration(500)}>
            <View style={[styles.sunriseCard, { backgroundColor: theme.backgroundDefault }]}>
              <View style={styles.sunriseRow}>
                <View style={[styles.sunriseIcon, { backgroundColor: AppColors.gold + "20" }]}>
                  <Feather name="sunrise" size={20} color={AppColors.gold} />
                </View>
                <View style={styles.sunriseInfo}>
                  <ThemedText style={styles.sunriseLabel}>Sunrise</ThemedText>
                  <ThemedText style={[styles.sunriseTime, { color: theme.textSecondary }]}>
                    {formatTime(prayerTimes.sunrise)}
                  </ThemedText>
                </View>
              </View>
            </View>
          </Animated.View>
        ) : null}

        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}
        >
          <View style={[styles.infoIcon, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="info" size={18} color={theme.primary} />
          </View>
          <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
            Prayer times are calculated using the Karachi method based on your current GPS location. 
            Tap on a prayer to mark it as completed.
          </ThemedText>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  permissionCard: {
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  permissionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  permissionDesc: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  deniedText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  permissionButton: {
    width: "100%",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  locationInfo: {
    flex: 1,
  },
  locationCity: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  locationCountry: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  refreshBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  nextPrayerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    overflow: "hidden",
    ...Shadows.lg,
  },
  prayerGlow: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.5,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 75,
  },
  prayerCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextPrayerLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
  },
  nextPrayerName: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  nextPrayerArabic: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.xs,
  },
  prayerTimeContainer: {
    alignItems: "flex-end",
  },
  prayerTime: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  timeUntilText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginTop: Spacing.xs,
  },
  azanBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.lg,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },
  azanText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: AppColors.gold,
  },
  salahHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  completedText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  prayersList: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  prayerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  prayerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  prayerNames: {
    gap: 2,
  },
  prayerName: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  prayerArabic: {
    fontSize: 13,
  },
  prayerRight: {
    alignItems: "flex-end",
    gap: Spacing.xs,
  },
  prayerTimeText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  nextBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  nextBadgeText: {
    fontSize: 9,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  sunriseCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  sunriseRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sunriseIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  sunriseInfo: {
    flex: 1,
  },
  sunriseLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  sunriseTime: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  infoCard: {
    flexDirection: "row",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    lineHeight: 18,
  },
});
