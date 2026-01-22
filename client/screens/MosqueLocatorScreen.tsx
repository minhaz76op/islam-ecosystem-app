import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const SAMPLE_MOSQUES = [
  { id: "1", name: "Baitul Mukarram", distance: "0.5 km", address: "Dhaka, Bangladesh" },
  { id: "2", name: "Islamic Center", distance: "1.2 km", address: "Main Street" },
  { id: "3", name: "Masjid Al-Rahman", distance: "2.0 km", address: "Downtown Area" },
  { id: "4", name: "Central Mosque", distance: "2.5 km", address: "City Center" },
];

export default function MosqueLocatorScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permission?.granted) {
      getLocation();
    }
  }, [permission]);

  const getLocation = async () => {
    setLoading(true);
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc);
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMaps = async (mosque: typeof SAMPLE_MOSQUES[0]) => {
    await Haptics.selectionAsync();
    const query = encodeURIComponent(`${mosque.name} ${mosque.address}`);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`,
    });
    Linking.openURL(url);
  };

  const handleOpenSettings = async () => {
    await Haptics.selectionAsync();
    if (Platform.OS !== "web") {
      try {
        await Linking.openSettings();
      } catch (error) {
        console.error("Cannot open settings");
      }
    }
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <View style={styles.loadingContainer}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.backgroundRoot, paddingTop: headerHeight },
        ]}
      >
        <View style={styles.permissionContainer}>
          <View style={[styles.permissionIcon, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="map-pin" size={48} color={theme.primary} />
          </View>
          <ThemedText style={styles.permissionTitle}>Location Access Needed</ThemedText>
          <ThemedText style={[styles.permissionText, { color: theme.textSecondary }]}>
            To find mosques near you, we need access to your location.
          </ThemedText>

          {permission.status === "denied" && !permission.canAskAgain ? (
            <>
              <ThemedText style={[styles.permissionNote, { color: theme.error }]}>
                Permission was denied. Please enable location access in Settings.
              </ThemedText>
              {Platform.OS !== "web" ? (
                <Pressable
                  onPress={handleOpenSettings}
                  style={[styles.permissionButton, { backgroundColor: theme.primary }]}
                >
                  <Feather name="settings" size={20} color="#FFFFFF" />
                  <ThemedText style={styles.permissionButtonText}>Open Settings</ThemedText>
                </Pressable>
              ) : null}
            </>
          ) : (
            <Pressable
              onPress={requestPermission}
              style={[styles.permissionButton, { backgroundColor: theme.primary }]}
            >
              <Feather name="navigation" size={20} color="#FFFFFF" />
              <ThemedText style={styles.permissionButtonText}>Enable Location</ThemedText>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundRoot, paddingTop: headerHeight + Spacing.xl },
      ]}
    >
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <ThemedText style={styles.title}>Mosque Locator</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            Find mosques near your location
          </ThemedText>
        </Animated.View>

        {location ? (
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            style={[styles.locationCard, { backgroundColor: theme.primary + "10" }]}
          >
            <Feather name="navigation" size={18} color={theme.primary} />
            <View style={styles.locationInfo}>
              <ThemedText style={[styles.locationLabel, { color: theme.textSecondary }]}>
                Your Location
              </ThemedText>
              <ThemedText style={styles.locationCoords}>
                {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
              </ThemedText>
            </View>
            <Pressable
              onPress={getLocation}
              style={[styles.refreshButton, { backgroundColor: theme.primary }]}
            >
              <Feather name="refresh-cw" size={16} color="#FFFFFF" />
            </Pressable>
          </Animated.View>
        ) : loading ? (
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            style={[styles.locationCard, { backgroundColor: theme.backgroundSecondary }]}
          >
            <ThemedText style={{ color: theme.textSecondary }}>
              Getting your location...
            </ThemedText>
          </Animated.View>
        ) : null}

        <ThemedText style={[styles.sectionTitle, { marginTop: Spacing["2xl"] }]}>
          Nearby Mosques
        </ThemedText>

        <View style={styles.mosqueList}>
          {SAMPLE_MOSQUES.map((mosque, index) => (
            <Animated.View
              key={mosque.id}
              entering={FadeInDown.delay(300 + index * 100).duration(500)}
            >
              <Pressable
                onPress={() => handleOpenMaps(mosque)}
                style={[styles.mosqueCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={[styles.mosqueIcon, { backgroundColor: theme.primary + "15" }]}>
                  <Feather name="home" size={24} color={theme.primary} />
                </View>
                <View style={styles.mosqueInfo}>
                  <ThemedText style={styles.mosqueName}>{mosque.name}</ThemedText>
                  <ThemedText style={[styles.mosqueAddress, { color: theme.textSecondary }]}>
                    {mosque.address}
                  </ThemedText>
                </View>
                <View style={styles.mosqueDistance}>
                  <ThemedText style={[styles.distanceText, { color: theme.primary }]}>
                    {mosque.distance}
                  </ThemedText>
                  <Feather name="external-link" size={16} color={theme.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="info" size={18} color={theme.textSecondary} />
          <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
            Tap on a mosque to open directions in Maps. Real mosque data requires internet connection.
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  permissionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing["2xl"],
  },
  permissionTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: Spacing["2xl"],
    lineHeight: 24,
  },
  permissionNote: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  permissionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.full,
    ...Shadows.md,
  },
  permissionButtonText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.xl,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  locationCoords: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.lg,
  },
  mosqueList: {
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  mosqueCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  mosqueIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  mosqueInfo: {
    flex: 1,
  },
  mosqueName: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  mosqueAddress: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  mosqueDistance: {
    alignItems: "flex-end",
    gap: Spacing.xs,
  },
  distanceText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
