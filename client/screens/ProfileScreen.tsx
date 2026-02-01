import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, TextInput, Alert, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getUserProfile, saveUserProfile, UserProfile } from "@/lib/storage";
import { getAuthUser, updateAuthUser } from "@/lib/auth";
import { getApiUrl } from "@/lib/query-client";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [authUser, setAuthUser] = useState<any>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: undefined,
    nationality: "",
    gender: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = await getAuthUser();
    setAuthUser(user);
    if (user) {
      setProfile({
        name: user.displayName || user.username || "",
        avatarUri: user.avatarUrl || "",
      });
    }
    const saved = await getUserProfile();
    if (saved) {
      setProfile(prev => ({ ...prev, ...saved }));
    }
  };

  const handleSave = async () => {
    try {
      const authUser = await getAuthUser();
      if (!authUser) return;

      const identifier = authUser.uniqueId || authUser.email;
      const response = await fetch(new URL(`/api/users/${identifier}`, getApiUrl()).toString(), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: profile.name,
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedUser = await response.json();
      await updateAuthUser(updatedUser);
      await saveUserProfile(profile);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
    >
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.avatarSection}
      >
        <Pressable 
          onPress={() => isEditing && Alert.alert("Profile Picture", "Upload from gallery coming soon!")}
          style={[styles.avatar, { backgroundColor: theme.primary, overflow: 'hidden' }]}
        >
          {profile.avatarUri ? (
            <Image source={{ uri: profile.avatarUri }} style={styles.avatarImage} />
          ) : (
            <Feather name="user" size={48} color="#FFFFFF" />
          )}
          {isEditing && (
            <View style={styles.avatarEditOverlay}>
              <Feather name="camera" size={20} color="#FFFFFF" />
            </View>
          )}
        </Pressable>
        <ThemedText style={styles.userName}>
          {profile.name || "Set Your Name"}
        </ThemedText>
        <ThemedText style={[styles.userGreeting, { color: theme.textSecondary }]}>
          As-salamu alaykum
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[
          styles.formCard,
          { backgroundColor: theme.backgroundDefault },
        ]}
      >
        <View style={styles.formHeader}>
          <ThemedText style={styles.formTitle}>Profile Information</ThemedText>
          <Pressable
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}
          >
            <Feather
              name={isEditing ? "x" : "edit-2"}
              size={18}
              color={theme.primary}
            />
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Name
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: isEditing ? theme.primary : "transparent",
              },
            ]}
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Phone Number
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: "transparent",
              },
            ]}
            value={authUser?.phoneNumber || ""}
            placeholder="No phone number"
            placeholderTextColor={theme.textSecondary}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Age
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: isEditing ? theme.primary : "transparent",
              },
            ]}
            value={profile.age?.toString() || ""}
            onChangeText={(text) =>
              setProfile({ ...profile, age: text ? parseInt(text, 10) : undefined })
            }
            placeholder="Enter your age"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Nationality
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: isEditing ? theme.primary : "transparent",
              },
            ]}
            value={profile.nationality}
            onChangeText={(text) => setProfile({ ...profile, nationality: text })}
            placeholder="Enter your nationality"
            placeholderTextColor={theme.textSecondary}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Gender
          </ThemedText>
          <View style={styles.genderRow}>
            {["Male", "Female"].map((gender) => (
              <Pressable
                key={gender}
                onPress={() => isEditing && setProfile({ ...profile, gender })}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor:
                      profile.gender === gender
                        ? theme.primary
                        : theme.backgroundSecondary,
                    borderColor:
                      profile.gender === gender ? theme.primary : "transparent",
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.genderText,
                    { color: profile.gender === gender ? "#FFFFFF" : theme.text },
                  ]}
                >
                  {gender}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {isEditing ? (
          <Button onPress={handleSave} style={styles.saveButton}>
            Save Changes
          </Button>
        ) : null}
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(500)}
        style={[
          styles.statsCard,
          { backgroundColor: AppColors.gold + "15", borderColor: AppColors.gold + "30" },
        ]}
      >
        <View style={styles.statsHeader}>
          <Feather name="award" size={20} color={AppColors.gold} />
          <ThemedText style={styles.statsTitle}>Your Journey</ThemedText>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statValue, { color: theme.primary }]}>
              0
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Days Active
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statValue, { color: theme.primary }]}>
              0
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Prayers Logged
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statValue, { color: theme.primary }]}>
              0
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Tasbih Count
            </ThemedText>
          </View>
        </View>
      </Animated.View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarEditOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  userGreeting: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  formCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  editButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
  },
  genderRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  genderButton: {
    flex: 1,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  genderText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
  statsCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
