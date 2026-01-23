import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calculateQiblaDirection(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

  const deltaLng = kaabaLngRad - lngRad;

  const x = Math.sin(deltaLng);
  const y = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(deltaLng);

  let qibla = Math.atan2(x, y) * (180 / Math.PI);
  qibla = (qibla + 360) % 360;

  return qibla;
}

export default function QiblaDirectionScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const rotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Location permission is required to find Qibla direction");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        const qibla = calculateQiblaDirection(loc.coords.latitude, loc.coords.longitude);
        setQiblaDirection(qibla);
        setLoading(false);

        if (Platform.OS !== "web") {
          Location.watchHeadingAsync((headingData) => {
            setHeading(headingData.trueHeading || headingData.magHeading);
          });
        }
      } catch (error) {
        setErrorMsg("Unable to get location");
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (qiblaDirection !== null) {
      const needleRotation = qiblaDirection - heading;
      rotation.value = withSpring(needleRotation, { damping: 15 });
    }
  }, [heading, qiblaDirection]);

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleRefresh = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    try {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      const qibla = calculateQiblaDirection(loc.coords.latitude, loc.coords.longitude);
      setQiblaDirection(qibla);
    } catch (error) {
      setErrorMsg("Unable to refresh location");
    }
    setLoading(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundRoot, paddingTop: headerHeight },
      ]}
    >
      <View style={styles.content}>
        <View style={[styles.compassContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Animated.View style={pulseStyle}>
            <View style={[styles.compassOuter, { borderColor: theme.primary + "30" }]}>
              <Animated.View style={[styles.compassInner, compassStyle]}>
                <View style={[styles.needle, { backgroundColor: theme.primary }]} />
                <View style={[styles.needleBottom, { backgroundColor: theme.textSecondary }]} />
                <View style={[styles.centerDot, { backgroundColor: theme.primary }]} />
              </Animated.View>

              <View style={styles.directions}>
                <ThemedText style={[styles.directionText, styles.north, { color: theme.primary }]}>
                  N
                </ThemedText>
                <ThemedText style={[styles.directionText, styles.east, { color: theme.textSecondary }]}>
                  E
                </ThemedText>
                <ThemedText style={[styles.directionText, styles.south, { color: theme.textSecondary }]}>
                  S
                </ThemedText>
                <ThemedText style={[styles.directionText, styles.west, { color: theme.textSecondary }]}>
                  W
                </ThemedText>
              </View>
            </View>
          </Animated.View>

          <View style={[styles.kaabaIcon, { backgroundColor: theme.gold }]}>
            <Feather name="navigation" size={24} color="#FFFFFF" />
          </View>
        </View>

        {loading ? (
          <View style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="loader" size={24} color={theme.primary} />
            <ThemedText style={styles.infoText}>Finding Qibla direction...</ThemedText>
          </View>
        ) : errorMsg ? (
          <View style={[styles.infoCard, { backgroundColor: theme.error + "15" }]}>
            <Feather name="alert-circle" size={24} color={theme.error} />
            <ThemedText style={[styles.infoText, { color: theme.error }]}>{errorMsg}</ThemedText>
          </View>
        ) : (
          <View style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="compass" size={20} color={theme.primary} />
                <ThemedText style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  Qibla Direction
                </ThemedText>
                <ThemedText style={styles.infoValue}>
                  {qiblaDirection?.toFixed(1)}°
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <Feather name="navigation" size={20} color={theme.primary} />
                <ThemedText style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  Current Heading
                </ThemedText>
                <ThemedText style={styles.infoValue}>
                  {heading.toFixed(1)}°
                </ThemedText>
              </View>
            </View>

            {location ? (
              <View style={[styles.locationBox, { backgroundColor: theme.backgroundSecondary }]}>
                <Feather name="map-pin" size={16} color={theme.textSecondary} />
                <ThemedText style={[styles.locationText, { color: theme.textSecondary }]}>
                  {location.coords.latitude.toFixed(4)}°, {location.coords.longitude.toFixed(4)}°
                </ThemedText>
              </View>
            ) : null}
          </View>
        )}

        <Pressable
          onPress={handleRefresh}
          style={[styles.refreshButton, { backgroundColor: theme.primary }]}
        >
          <Feather name="refresh-cw" size={20} color="#FFFFFF" />
          <ThemedText style={styles.refreshText}>Refresh Location</ThemedText>
        </Pressable>

        <View style={[styles.tipCard, { backgroundColor: theme.primary + "10" }]}>
          <Feather name="info" size={18} color={theme.primary} />
          <ThemedText style={[styles.tipText, { color: theme.textSecondary }]}>
            Point your phone towards the Qibla direction. The arrow will guide you to the Kaaba in Makkah.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  compassContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing["2xl"],
    ...Shadows.lg,
  },
  compassOuter: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  compassInner: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  needle: {
    position: "absolute",
    width: 8,
    height: 80,
    borderRadius: 4,
    top: 20,
  },
  needleBottom: {
    position: "absolute",
    width: 6,
    height: 60,
    borderRadius: 3,
    bottom: 40,
  },
  centerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  directions: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  directionText: {
    position: "absolute",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  north: {
    top: 10,
    alignSelf: "center",
    left: "46%",
  },
  east: {
    right: 10,
    top: "44%",
  },
  south: {
    bottom: 10,
    alignSelf: "center",
    left: "46%",
  },
  west: {
    left: 10,
    top: "44%",
  },
  kaabaIcon: {
    position: "absolute",
    bottom: -20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.md,
  },
  infoCard: {
    width: "100%",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.lg,
  },
  infoItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
  },
  infoValue: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginLeft: Spacing.sm,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  locationText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  refreshText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  tipCard: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    alignItems: "flex-start",
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
